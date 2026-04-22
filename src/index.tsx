import * as esbuild from "esbuild";
import fs, { truncate } from "fs";
import { rm } from "fs/promises";
import path from "path";
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import serialize from "serialize-javascript";
import { fileURLToPath } from "url";
import fg from "fast-glob";

type TReactSrvConfig = {
  reactVersion?: string;
  reactLocation?: string;
  srcPath?: string;
  outPath?: string,
  outDir?: string,
  Document?: React.FC<any>,
  isProd?: boolean,
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
    FileUtils.validateDir(this.config.outPath);
  }

  async prebundle() {
    const bundleFolder = this.getBundleFolderPath();
    await FileUtils.recreateFolder(bundleFolder);
    
    const files = await FileUtils.getTSXTiles(this.config.srcPath);
    for (const file of files) {
      const pageName = FileUtils.getTSXName(file);
      const rootId = 'root';
      const code = this.bundle({ pageName, rootId });
      const bundlePath = this.getBundleFilePath(pageName);
      fs.writeFileSync(bundlePath, code, 'utf8');
      console.log('Wrote', bundlePath);
    }
  }

  private bundle(params: { pageName: string; rootId: string }): string {
    const { pageName, rootId } = params;

    const fileName = `${pageName}.tsx`;
    const entryPath = this.findFileRecursive(this.config.srcPath, fileName);
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
        sourcefile: `react-srv-hydrate-${pageName}.tsx`,
        loader: "tsx",
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
    const isProd = this.config.isProd === true;

    const page = (
      <this.config.Document {...props}>
        <div id={rootId}>
          <Component {...props} />
        </div>
        <script defer dangerouslySetInnerHTML={{ __html: `globalThis.__INITIAL_PROPS__ = ${safeProps};` }} />
        {isProd === true && <script defer type="module" src={this.getRelativeBundleFilePath(pageName)}></script>}
        {!isProd && <script type="module" dangerouslySetInnerHTML={{ __html: this.bundle({ pageName, rootId }) }} />}
      </this.config.Document>
    );

    return `<!DOCTYPE html>\n${renderToString(page)}`;
  }

  async prerender(params: { hydrate: boolean } = { hydrate: true }) {
    if (params.hydrate) {
      await this.prebundle();
    }

    const { srcPath: source, outPath: dest } = this.config;

    const files = await FileUtils.getTSXTiles(source);
    for (const file of files) {
      const pageName = FileUtils.getTSXName(file);
      const outName = FileUtils.toKebabCase(pageName);

      const result = esbuild.buildSync({
        entryPoints: [file],
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
          {params.hydrate && <script defer type="module" src={this.getRelativeBundleFilePath(pageName)}></script>}
        </this.config.Document>
      );
      const html = params.hydrate ? renderToString(document) : renderToStaticMarkup(document);

      // 4️⃣ Wrap in <!DOCTYPE html> and save to disk
      const fullHtml = "<!DOCTYPE html>" + html;
      fs.writeFileSync(`${dest}/${outName}.html`, fullHtml);

      console.log(`✅ Built ${dest}/${outName}.html`);
    }
  }

  private findFileRecursive(dir: string, fileName: string): string | null {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const result = this.findFileRecursive(fullPath, fileName);
        if (result) return result;
      } else if (entry.isFile() && entry.name === fileName) {
        return fullPath;
      }
    }

    return null;
  }

  private getBundleFolderPath(): string {
    return path.join(this.config.outPath, this.config.outDir);
  }

  private getBundleFilePath(page: string): string {
    const folder = this.getBundleFolderPath();
    const fp = FileUtils.toKebabCase(`${page}.js`);
    return path.join(folder, fp);
  }

  private getRelativeBundleFilePath(page: string): string {
    const folder = this.config.outDir;
    const fp = FileUtils.toKebabCase(`${page}.js`);
    return `./${folder}/${fp}`;
  }
}

class FileUtils {
  static validateDir(dir: string): boolean {
    const sourceInfo = fs.lstatSync(dir);
    if (!sourceInfo || !sourceInfo.isDirectory()) {
      throw new Error(`D ${dir} must be a folder`);
    }

    return true;
  }

  static async getTSXTiles(dir: string): Promise<string[]> {
    return await fg(`${dir}/**/*.tsx`);
  }

  static getTSXName(file: string): string {
    return file.split('/').pop().replace('.tsx', '');
  }

  static toKebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1)$2').toLowerCase();
  }

  static async recreateFolder(path: string) {
    await rm(path, { recursive: true, force: true });
    fs.mkdirSync(path);
  }
};