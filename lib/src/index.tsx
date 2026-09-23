// note/system imports
import fs from "fs";
import path from "path";
import os from "os";
import { createRequire } from "module";
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
      console.log(`Skipping pre-bundling hydration scripts since hydrate === ${this.config.hydrate}`);
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
      const writePath = file.writePath;
      const fp = `${writePath}/${file.name.js}`;
      fs.mkdirSync(writePath, { recursive: true });
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
    if (!entryPath) {
      throw new Error(
        `react-srv: could not find page component "${pageName}.tsx" or "${pageName}.jsx" in ${this.config.srcPath}`
      );
    }
    const entryDir = path.dirname(entryPath);
    const entryBase = path.basename(entryPath);

    const { reactLocation, reactVersion } = this.config;
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
      mainFields: this.config.mainFields ?? [],
      // Resolve react* imports to their CDN URLs at build time (issue #11):
      // alias rewrites the specifier, external keeps it out of the bundle.
      // Unlike the old output-text regexes this catches every import form
      // (side-effect imports, bare react-dom, future minified output) and
      // works in the sync API (esbuild plugins do not).
      alias: {
        "react": `${reactLocation}/react@${reactVersion}`,
        "react-dom": `${reactLocation}/react-dom@${reactVersion}`,
        "react-dom/client": `${reactLocation}/react-dom@${reactVersion}/client`,
        "react/jsx-runtime": `${reactLocation}/react@${reactVersion}/jsx-runtime`,
        "react/jsx-dev-runtime": `${reactLocation}/react@${reactVersion}/jsx-dev-runtime`,
      },
      external: [`${reactLocation}/*`],
    });

    return result.outputFiles[0].text;
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

    // The temp module lives outside the project (OS temp dir), where bare
    // specifiers like "react" cannot be resolved — there is no node_modules
    // above it. Resolve react* to absolute paths instead (via the library's
    // own location, so the same React instance the library renders with is
    // reused) and keep them external so they resolve from anywhere.
    const requireFromLib = createRequire(import.meta.url);
    const externalsToAbsolute: esbuild.Plugin = {
      name: "externals-to-absolute",
      setup(build) {
        build.onResolve({ filter: /^react(-dom)?($|\/)/ }, (args) => ({
          path: requireFromLib.resolve(args.path),
          external: true,
        }));
      },
    };

    for (const file of files) {
      const result = await esbuild.build({
        entryPoints: [file.absPath],
        bundle: true,
        platform: "node",
        format: "esm",
        write: false,
        mainFields: this.config.mainFields ?? [],
        plugins: [externalsToAbsolute],
      });

      const js = result.outputFiles[0].text;

      // 2️⃣ Load the compiled module dynamically
      // under the OS temp dir (not next to the library's dist/), in a
      // per-process folder so concurrent runs can't clobber each other
      const tempDir = path.join(os.tmpdir(), "react-srv", String(process.pid));
      const tempFile = path.join(tempDir, file.name.mjs);
      fs.mkdirSync(tempDir, { recursive: true });
      fs.writeFileSync(tempFile, js);
      let Page: any;
      try {
        ({ default: Page } = await import(`file://${tempFile}`));
      } finally {
        fs.unlinkSync(tempFile);
      }

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
    const urlPath = subpaths.join('/');
    const fp = FileUtils.normaliseName(`${page}.js`);
    const finalPath = urlPath === '' ? '' : `/${urlPath}`;
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

export class FileUtils {
  static validateDir(dir: string): boolean {
    if (!this.dirExists(dir)) {
      throw new Error(`${dir} must be a folder`);
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
      const normalised = FileUtils.normaliseName(component);
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
        return false;
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

  static normaliseName(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  }
};