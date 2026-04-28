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
  outDir?: string,
  hydrate?: boolean;
  isProd?: boolean,
  Document?: React.FC<any>,
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

const DefaultReactSrvConfig: TReactSrvConfig = {
  reactVersion: '19.2.0',
  reactLocation: 'https://esm.sh',
  srcPath: './src',
  outPath: './public',
  outDir: 'react-srv',
  hydrate: true,
  isProd: false,
  Document: DefaultDocument
};

export default class ReactSrv {
  private readonly config: TReactSrvConfig;

  constructor(readonly userConfig: TReactSrvConfig) {
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

    const files = FileUtils.globSrcForHydration(this.config.srcPath, this.config.outPath, this.config.outDir);
    for (const file of files) {
      const pageName = file.pageName;
      const rootId = 'root';
      const code = this.bundle({ pageName, rootId });
      const bundlePath = file.writeFile;
      fs.mkdirSync(file.writePath, { recursive: true });
      fs.writeFileSync(bundlePath, code, 'utf8');
      console.log('Wrote', bundlePath);
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
        <script defer dangerouslySetInnerHTML={{ __html: `globalThis.__INITIAL_PROPS__ = ${safeProps};` }} />
        {isProd && hydrate && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  const path = window.location.pathname;
                  const base = path.split('/')[1];
                  const prefix = base ? base : '';
                  import(\`\${prefix}/${this.getPublicHydrationPath(pageName)}\`);
                `,
              }}
            />
          )}
        {/* {(isProd && hydrate) && <script defer type="module" src={this.getPublicHydrationPath(pageName)}></script>} */}
        {(!isProd && hydrate) && <script defer type="module" dangerouslySetInnerHTML={{ __html: this.bundle({ pageName, rootId }) }} />}
      </this.config.Document>
    );

    const html = hydrate ? renderToString(document) : renderToStaticMarkup(document);

    return `<!DOCTYPE html>\n${html}`;
  }

  async prerender() {
    const hydrate = this.config.hydrate === true;
    if (hydrate) {
      this.prebundle();
    }

    const files = FileUtils.globSrcForHtmlRendering(this.config.srcPath, this.config.outPath);
    for (const file of files) {
      const outName = FileUtils.toKebabCase(file.pageName);

      const result = esbuild.buildSync({
        entryPoints: [file.absPath],
        bundle: true,
        platform: "node",
        format: "esm",
        write: false,
        external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
      });

      const js = result.outputFiles[0].text;

      // 2️⃣ Load the compiled module dynamically
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const tempFile = path.join(__dirname, `temp-${outName}.mjs`);
      fs.writeFileSync(tempFile, js);
      const { default: Page } = await import(`file://${tempFile}`);
      fs.unlinkSync(tempFile);

      // 3️⃣ Render to static HTML
      const rootId = 'root';
      const document = (
        <this.config.Document>
          <div id={rootId}>
            {React.createElement(Page)}
          </div>
          {hydrate && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  const path = window.location.pathname;
                  const base = path.split('/')[1];
                  const prefix = base ? base : '';
                  import(\`\${prefix}/${this.getPublicHydrationPath(file.pageName)}\`);
                `,
              }}
            />
          )}
          {/* {hydrate && <script defer type="module" src={this.getPublicHydrationPath(file.pageName)}></script>} */}
        </this.config.Document>
      );
      const html = hydrate ? renderToString(document) : renderToStaticMarkup(document);
      const fullHtml = `<!DOCTYPE html>\n${html}`;

      fs.mkdirSync(file.outDir, { recursive: true });
      fs.writeFileSync(`${file.outDir}/${outName}.html`, fullHtml);
      console.log(`✅ Built ${file.outDir}/${outName}.html`);
    }
  }

  private getPublicHydrationPath(page: string): string {
    const folder = this.config.outDir;
    const fp = FileUtils.toKebabCase(`${page}.js`);
    return `${folder}/${fp}`;
  }
}

type HTMLFile = {
  absPath: string;
  pageName: string;
  outDir: string;
};

type HydrateFile = {
  writePath: string;
  pageName: string;
  writeFile: string;
};

class FileUtils {
  static validateDir(dir: string): boolean {
    if (!this.dirExists(dir)) {
      throw new Error(`D ${dir} must be a folder`);
    }

    return true;
  }

  static globSrcForHydration(srcPath: string, outPath: string, outDir: string): HydrateFile[] {
    const files = fg.sync("**/*.{tsx,jsx}", {
      cwd: srcPath,
      absolute: true,
      onlyFiles: true,
    });

    return files.map((absPath: string) => {
      const pageName = path.basename(absPath, path.extname(absPath));
      const writePath = path.join(outPath, outDir);
      const writeFile = `${writePath}/${FileUtils.toKebabCase(pageName)}.js`;

      return {
        writePath,
        writeFile,
        pageName,
      };
    })
  }

  static globSrcForHtmlRendering(srcDir: string, outPath: string): HTMLFile[] {
    const files = fg.sync("**/*.{tsx,jsx}", {
      cwd: srcDir,
      absolute: true,
      onlyFiles: true,
    });

    return files.map((absPath) => {
      const relPath = path.relative(srcDir, absPath);
      const relDir = path.dirname(relPath);
      const pageName = path.basename(absPath, path.extname(absPath));

      const pageOutDir =
        relDir === "."
          ? outPath
          : path.join(outPath, relDir);

      return {
        absPath,
        pageName,
        outDir: pageOutDir,
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
    return str.replace(/([a-z0-9])([A-Z])/g, '$1)$2').toLowerCase();
  }
};