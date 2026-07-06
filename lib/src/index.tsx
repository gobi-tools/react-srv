// note/system imports
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// react imports
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
// 3rd party dependencies
import * as esbuild from "esbuild";
import serialize from "serialize-javascript";
import fg from "fast-glob";

type TReactSrvConfig = {
  reactVersion?: string;
  reactLocation?: string;
  srcPath?: string;
  outPath?: string,
  hydrate?: boolean;
  isProd?: boolean,
  mainFields?: string[],
  Document?: React.FC<any>,
  initProps?: any,
};

export function DefaultDocument({ children }) {
  return (
    <html>
      <head></head>
      <body>
        {children}
      </body>
    </html>
  );
};

export const DefaultReactSrvConfig: TReactSrvConfig = {
  reactVersion: '19.2.0',
  reactLocation: 'https://esm.sh',
  srcPath: './src',
  outPath: './public/hydrate',
  hydrate: true,
  isProd: false,
  Document: DefaultDocument,
  initProps: {},
  mainFields: ["module", "main"],
};

export default class ReactSrv {
  private readonly config: TReactSrvConfig;

  constructor(readonly userConfig: TReactSrvConfig = DefaultReactSrvConfig) {
    this.config = {
      ...DefaultReactSrvConfig,
      ...userConfig,
    };
    FileUtils.validateDir(this.config.srcPath);
  }

  prebundle() {
    if (!this.config.hydrate) {
      console.log(`Skipping pre-bundiling hydration scripts synce hydrate === ${this.config.hydrate}`);
      return;
    }

    const files = FileUtils.formOutputFiles(this.config.srcPath, this.config.outPath, true);
    this.prepbundle(files);
  }

  private prepbundle(files: TOutputFile[]) {
    for (const file of files) {
      const pageName = file.component;
      const rootId = 'root';
      const code = this.bundle({ pageName, rootId });
      const path = file.writePath;
      const fp = `${path}/${file.name.js}`;
      fs.mkdirSync(path, { recursive: true });
      fs.writeFileSync(fp, code, 'utf8');
      console.log('✅ Wrote', fp);
    }
  }

  private bundle(params: { pageName: string; rootId: string }): string {
    const { pageName, rootId } = params;

    const tsxName = `${pageName}.tsx`;
    const tsxPath = FileUtils.findFileRecursive(this.config.srcPath, tsxName);
    const jsxName = `${pageName}.jsx`;
    const jsxPath = FileUtils.findFileRecursive(this.config.srcPath, jsxName);
    const entryPath = tsxPath ?? jsxPath;
    const entryDir = path.dirname(entryPath);
    const entryBase = path.basename(entryPath);

    const result = esbuild.buildSync({
      stdin: {
        contents: `
        import React from "react";
        import { hydrateRoot } from "react-dom/client";
        import Page from "./${entryBase}";

        const root = document.getElementById(${JSON.stringify(rootId)});
        if (!root) {
          throw new Error("react-srv: Could not find hydration root.");
        }

        if (!globalThis.__REACT_SRV_HYDRATED__) {
          globalThis.__REACT_SRV_HYDRATED__ = true;

          hydrateRoot(
            root,
            React.createElement(Page, globalThis.__INITIAL_PROPS__ || {})
          );
        }
      `,
        resolveDir: entryDir,
        sourcefile: `react-srv-hydrate-${pageName}.jsx`,
        loader: "jsx",
      },
      bundle: true,
      format: "esm",
      platform: "browser",
      write: false,
      jsx: "automatic",
      jsxImportSource: "react",
      external: ["react", "react-dom", "react-dom/client", "react/jsx-runtime", "react/jsx-dev-runtime"],
    });

    let code = result.outputFiles[0].text;

    // Fix imports to use esm.sh
    code = code
      .replace(/from\s+["']react["']/g, `from "${this.config.reactLocation}/react@${this.config.reactVersion}"`)
      .replace(/from\s+["']react-dom\/client["']/g, `from "${this.config.reactLocation}/react-dom@${this.config.reactVersion}/client"`)
      .replace(/from\s+["']react\/jsx-runtime["']/g, `from "${this.config.reactLocation}/react@${this.config.reactVersion}/jsx-runtime"`)
      .replace(/from\s+["']react\/jsx-dev-runtime["']/g, `from "${this.config.reactLocation}/react@${this.config.reactVersion}/jsx-dev-runtime"`);

    return code;
  }

  private resolvePageName(Component: React.FC<any>): string {
    const pageName = Component.name;
    if (!pageName) {
      throw new Error(
        "react-srv: Component.name is empty. Please use a named component export."
      );
    }

    return pageName;
  }

  render(Component: React.FC<any>, props: any = {}): string {
    const rootId = "root";
    const safeProps = serialize(props, { isJSON: true });
    const pageName = this.resolvePageName(Component);
    const hydrate = this.config.hydrate === true;
    const isProd = this.config.isProd === true;

    const document = (
      <this.config.Document {...props}>
        <div id={rootId}>
          <Component {...props} />
        </div>
        <script dangerouslySetInnerHTML={{ __html: `globalThis.__INITIAL_PROPS__ = ${safeProps};` }} />
        {(isProd && hydrate) && <script type="module" src={this.getPublicHydrationPath(pageName)}></script>}
        {(!isProd && hydrate) && <script type="module" dangerouslySetInnerHTML={{ __html: this.bundle({ pageName, rootId }) }} />}
      </this.config.Document>
    );

    const html = hydrate ? renderToString(document) : renderToStaticMarkup(document);

    return `<!DOCTYPE html>\n${html}`;
  }

  async prerender() {
    const files = FileUtils.formOutputFiles(this.config.srcPath, this.config.outPath);
    
    const hydrate = this.config.hydrate === true;
    if (hydrate) {
      this.prepbundle(files);
    }

    const props = this.config.initProps;
    const safeProps = serialize(props, { isJSON: true });

    for (const file of files) {
      const result = esbuild.buildSync({
        entryPoints: [file.absPath],
        bundle: true,
        platform: "node",
        format: "esm",
        write: false,
        mainFields: this.config.mainFields ?? [],
        external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
      });

      const js = result.outputFiles[0].text;

      // 2️⃣ Load the compiled module dynamically
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const tempFile = path.join(__dirname, file.name.mjs);
      fs.writeFileSync(tempFile, js);
      const { default: Page } = await import(`file://${tempFile}`);
      fs.unlinkSync(tempFile);

      // 3️⃣ Render to static HTML
      const rootId = 'root';
      const document = (
        <this.config.Document {...props} >
          <div id={rootId}>
            {React.createElement(Page, props)}
          </div>
          <script dangerouslySetInnerHTML={{ __html: `globalThis.__INITIAL_PROPS__ = ${safeProps};` }} />
          {hydrate && <script type="module" src={this.getRelativeHydrationPath(file.name.js)}></script>}
        </this.config.Document>
      );
      const html = hydrate ? renderToString(document) : renderToStaticMarkup(document);
      const fullHtml = `<!DOCTYPE html>\n${html}`;
      const htmlFp = `${file.writePath}/${file.name.html}`;

      fs.mkdirSync(file.writePath, { recursive: true });
      fs.writeFileSync(htmlFp, fullHtml);
      console.log(`✅ Wrote ${htmlFp}`);
    }
  }

  private getPublicHydrationPath(page: string): string {
    const outPath = this.config.outPath;
    const subpaths = outPath.split('/').map(s => s.trim()).filter(s => s != '' && s != '.');
    subpaths.shift(); // remove first element
    const path = subpaths.join('/');
    const fp = FileUtils.toKebabCase(`${page}.js`);
    const finalPath = path === '' ? '' : `/${path}`;
    const result = `${finalPath}/${fp}`;
    return result;
  }

  private getRelativeHydrationPath(page: string): string {
    return `./${page}`;
  }
}

type TOutputFile = {
  absPath: string;
  relPath: string;
  component: string;
  name: {
    js: string,
    html: string,
    mjs: string,
  },
  writePath: string,
};

class FileUtils {
  static validateDir(dir: string): boolean {
    if (!this.dirExists(dir)) {
      throw new Error(`D ${dir} must be a folder`);
    }

    return true;
  }

  static formOutputFiles(srcPath: string, outPath: string, flatten: boolean = false): TOutputFile[] {
    const files = fg.sync("**/*.{tsx,jsx}", {
      cwd: srcPath,
      absolute: true,
      onlyFiles: true,
    });

    return files.map((absPath: string) => {
      const component = path.basename(absPath, path.extname(absPath));
      const normalised = FileUtils.toKebabCase(component);
      const js = `${normalised}.js`;
      const html = `${normalised}.html`;
      const mjs = `${normalised}.mjs`;

      const relPath = path.relative(srcPath, absPath);
      const relDir = path.dirname(relPath);

      const writePath = flatten === true ? outPath : (relDir === "." ? outPath : path.join(outPath, relDir));

      return {
        absPath,
        relPath: relDir,
        component,
        name: { js, html, mjs },
        writePath,
      };
    });
  }

  static dirExists(dir: string): boolean {
    try {
      const info = fs.lstatSync(dir);
      return !!info && info.isDirectory();
    } catch (e) {
      if (e.code === 'ENOENT') {
        console.log('Folder does not exist');
      } else {
        throw e; // Other unexpected errors
      }
    }
  }

  static findFileRecursive(dir: string, fileName: string): string | null {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const result = FileUtils.findFileRecursive(fullPath, fileName);
        if (result) return result;
      } else if (entry.isFile() && entry.name === fileName) {
        return fullPath;
      }
    }

    return null;
  }

  static toKebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  }
};