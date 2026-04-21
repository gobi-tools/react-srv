import * as esbuild from "esbuild";
import fs from "fs";
import { rm, cp } from "fs/promises";
import path from "path";
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import serialize from "serialize-javascript";
import { fileURLToPath } from "url";

type TReactSrvConfig = {
  reactVersion?: string;
  reactLocation?: string;
  folder?: string;
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
  folder: '.',
  Document: DefaultDocument
};

export default class ReactSrv2 {
  private readonly config: TReactSrvConfig;

  constructor(readonly userConfig: TReactSrvConfig) {
    this.config = {
      ...DefaultReactSrvConfig,
      ...userConfig,
    };
  }

  private inlineHydrationBundle(params: { pageName: string; rootId: string }): string {
    const { pageName, rootId } = params;

    // const fileName = `${pageName}.tsx`;
    // const entryPath = this.findFileRecursive(this.config.folder, fileName);
    // const entryPath = this.resolvePageEntry(fileName);
    const entryPath = this.resolvePageEntry(pageName);
    const entryDir = path.dirname(entryPath);
    const entryBase = path.basename(entryPath);

    console.log('LOG HERE 1', entryPath, entryBase);
    
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

  render(Component: React.FC<any>, props: any): string {
    const rootId = "root";
    const safeProps = serialize(props, { isJSON: true });

    const pageName = Component.name;
    if (!pageName) {
      throw new Error(
        "react-srv: Component.name is empty. Please use a named component export."
      );
    }

    const page = (
      <this.config.Document {...props}>
        <div id={rootId}>
          <Component {...props} />
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `globalThis.__INITIAL_PROPS__ = ${safeProps};`,
          }}
        />

        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: this.inlineHydrationBundle({
              pageName,
              rootId,
            }),
          }}
        />
      </this.config.Document>
    );

    return `<!DOCTYPE html>\n${renderToString(page)}`;
  }

  async prerender(source: string, pub: string, dest: string) {
    const sourceInfo = fs.lstatSync(source);
    if (!sourceInfo || !sourceInfo.isDirectory()) {
      throw new Error(`Source dir ${source} must be a folder`);
    }
    const destInfo = fs.lstatSync(dest);
    if (!destInfo || !destInfo.isDirectory()) {
      throw new Error(`Dest dir ${dest} must be a folder`);
    }

    await this.clearFolder(dest);
    console.log(`✅ Cleared ${dest} folder.`);

    const extension = '.tsx';
    const pages = fs.readdirSync(source).filter(f => f.endsWith(extension));
    for (const page of pages) {
      const pageName = this.toKebabCase(page.replaceAll(extension, ''));

      const result = esbuild.buildSync({
        entryPoints: [path.join(source, page)],
        bundle: true,
        platform: "node",
        format: "esm",
        write: false,
        external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
      });

      const js = result.outputFiles[0].text;

      /* re-create __dirname */
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      // 2️⃣ Load the compiled module dynamically
      const tempFile = path.join(__dirname, `temp-${pageName}.mjs`);
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
        </this.config.Document>
      );
      const html = renderToStaticMarkup(document);

      // 4️⃣ Wrap in <!DOCTYPE html> and save to disk
      const fullHtml = "<!DOCTYPE html>" + html;
      fs.writeFileSync(`${dest}/${pageName}.html`, fullHtml);

      console.log(`✅ Built ${dest}/${pageName}.html`);
    }

    await this.copyFolderContents(pub, dest);
    console.log(`✅ Copied public asset folder ${pub}`);
  }

  private resolvePageEntry(pageName: string): string {
    const candidates =
      process.env.NODE_ENV === "production"
        ? [`${pageName}.js`, `${pageName}.mjs`, `${pageName}.tsx`, `${pageName}.jsx`]
        : [`${pageName}.tsx`, `${pageName}.jsx`, `${pageName}.js`, `${pageName}.mjs`];

    for (const candidate of candidates) {
      const found = this.findFileRecursive(this.config.folder, candidate);
      if (found) return found;
    }

    throw new Error(`react-srv: Could not find page file for ${pageName}`);
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

  private toKebabCase(str: string): string {
    return str
      // insert a hyphen before any uppercase letter (except at the start)
      .replace(/([a-z0-9])([A-Z])/g, '$1)$2')
      // convert the whole thing to lowercase
      .toLowerCase();
  }

  private async clearFolder(path: string) {
    await rm(path, { recursive: true, force: true });
    fs.mkdirSync(path);
  }

  private async copyFolderContents(src: string, dest: string) {
    await cp(src, dest, { recursive: true });
  }
}