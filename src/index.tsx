import * as esbuild from "esbuild";
import fs from "fs";
import { rm, cp } from "fs/promises";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { renderToString } from "react-dom/server";
import serialize from "serialize-javascript";

type TReactSrvConfig = {
  reactVersion: string;
  reactLocation: string;
  folder: string;
};

export default class ReactSrv {
  constructor(private readonly config: TReactSrvConfig = {
    reactVersion: "19.2.0",
    reactLocation: 'https://esm.sh',
    folder: '.',
  }) { }

  get reactBundlePath(): string {
    return '/_react_runtime.js';
  }

  get pageBundlePath(): string {
    return '/_page_bundle/:pageName.js';
  }

  get bundleType(): string {
    return 'application/javascript';
  }

  reactBundle(): string {
    return `
      import React from "${this.config.reactLocation}/react@${this.config.reactVersion}";
      import { hydrateRoot } from "${this.config.reactLocation}/react-dom@${this.config.reactVersion}/client";

      window.__REACT__ = React;
      window.__HYDRATE_ROOT__ = hydrateRoot;`;
  }

  pageBundle(params: any): string {
    const { pageName } = params;
    const fileName = `${pageName}.tsx`;
    const entryPath = this.findFileRecursive(this.config.folder, fileName);

    const result = esbuild.buildSync({
      entryPoints: [entryPath!],
      bundle: true,
      format: "esm",
      platform: "browser",
      jsx: "automatic",
      write: false,
      external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
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
    const html = renderToString(<Component {...props} />);
    const htmlFooter = '</body></html>';
    const trimmedHtml = html.replaceAll(htmlFooter, '');

    const safeProps = serialize(props, { isJSON: true });
    const safePageName = serialize(Component.name, { isJSON: true });
    const fileName = safePageName.replaceAll("\"", "");

    const doctype = `<!DOCTYPE html>`;
    const htmlProps = `<script>window.__INITIAL_PROPS__ = ${safeProps};</script>`;
    const reactHidrator = `<script type="module" src="${this.reactBundlePath}"></script>`;
    const pageHidrator = `<script type="module">
      import Component from "/_page_bundle/${fileName}.js";
      window.__HYDRATE_ROOT__(
        document.getElementsByTagName('body')[0],
        window.__REACT__.createElement(Component.default || Component, window.__INITIAL_PROPS__)
      );
    </script>`;
    return `${doctype}\n${trimmedHtml}\n${htmlProps}\n${reactHidrator}\n${pageHidrator}\n${htmlFooter}`;
  }

  async buildStatic(source: string, pub: string, dest: string) {
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
      });

      const js = result.outputFiles[0].text;

      // 2️⃣ Load the compiled module dynamically
      const tempFile = path.join(__dirname, `temp-${pageName}.mjs`);
      fs.writeFileSync(tempFile, js);
      const { default: Page } = await import(`file://${tempFile}`);
      fs.unlinkSync(tempFile);

      // 3️⃣ Render to static HTML
      const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Page));

      // 4️⃣ Wrap in <!DOCTYPE html> and save to disk
      const fullHtml = "<!DOCTYPE html>" + html;
      fs.writeFileSync(`${dest}/${pageName}.html`, fullHtml);

      console.log(`✅ Built ${dest}/${pageName}.html`);
    }

    await this.copyFolderContents(pub, dest);
    console.log(`✅ Copied public asset folder ${pub}`);
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

  /**
  * Recursively search for a file inside a folder.
  * @param dir folder to start searching
  * @param fileName file to find, e.g., "Home.tsx"
  * @returns full path if found, or null
  */
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
}