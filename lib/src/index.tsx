// note/system imports
import fs from "fs";
import { createHash } from "crypto";
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
  /** CDN React version. Defaults to the locally installed React version, so the
   * browser hydrates with the same build the server rendered with. */
  reactVersion?: string;
  reactLocation?: string;
  srcPath?: string;
  outPath?: string,
  hydrate?: boolean;
  isProd?: boolean,
  minify?: boolean,
  splitting?: boolean,
  keepNames?: boolean,
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

const FALLBACK_REACT_VERSION = 'latest';

function resolveInstalledReactVersion(): string {
  try {
    const pkgPath = createRequire(import.meta.url).resolve('react/package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const version = typeof pkg.version === 'string' ? pkg.version.trim() : '';
    console.log('gabbox', version);
    return version === '' ? FALLBACK_REACT_VERSION : version;
  } catch {
    return FALLBACK_REACT_VERSION;
  }
}

export const DefaultReactSrvConfig: TReactSrvConfig = {
  reactVersion: resolveInstalledReactVersion(),
  reactLocation: 'https://esm.sh',
  srcPath: './src',
  outPath: './public/hydrate',
  hydrate: true,
  isProd: false,
  minify: false,
  splitting: true,
  keepNames: true,
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

  ////////////////////////////////////////////////
  // Expose to CLI interface (for SSG)
  ////////////////////////////////////////////////

  /**
   * Transforms all JSX/TSX files in config.srcPath to JS & HTML files 
   */
  async prerender() {
    const files = FileUtils.formOutputFiles(this.config.srcPath, this.config.outPath);

    const hydrate = this.config.hydrate === true;
    if (hydrate) {
      await this.prepbundle(files);
    }

    const props = this.config.initProps;
    const safeProps = serialize(props, { isJSON: true });

    for (const file of files) {
      const result = await esbuild.build({
        entryPoints: [file.absPath],
        bundle: true,
        platform: "node",
        format: "esm",
        write: false,
        mainFields: this.config.mainFields ?? [],
        plugins: [ReactSrv.rewriteReactPathsPlugin()],
      });

      const js = result.outputFiles[0].text;

      // Load the compiled module dynamically under the OS temp dir in a
      // per-process folder so concurrent runs can't clobber each other
      const tempDir = path.join(os.tmpdir(), "react-srv", String(process.pid));
      const tempFile = path.join(tempDir, file.name.mjs);
      fs.mkdirSync(tempDir, { recursive: true });
      fs.writeFileSync(tempFile, js);
      // Make sure we import the temp file using a changing content key, so we 
      // don't get stale info by mistake
      const contentKey = createHash("sha1").update(js).digest("hex");
      let Page: any;
      try {
        ({ default: Page } = await import(`file://${tempFile}?v=${contentKey}`));
      } finally {
        fs.unlinkSync(tempFile);
      }

      // Render to static HTML
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

  ////////////////////////////////////////////////
  // Expose to SSR interface
  ////////////////////////////////////////////////

  /**
   * Transforms a React component & associated props into a HTML string that also 
   * references a JS hydration script, either inline (dev mode) or from disk (prod mode).
   *
   * If from disk, then {@link ReactSrv.prebundle} must be called beforehand.
   * 
   * @param Component a React component
   * @param props any props associated with it 
   * @returns a HTML string
   */
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

  /**
   * Transforms all JSX/TSX files in config.srcPath to JS files
   */
  prebundle(): Promise<void> {
    if (!this.config.hydrate) {
      console.log(`Skipping pre-bundling hydration scripts since hydrate === ${this.config.hydrate}`);
      return;
    }

    const files = FileUtils.formOutputFiles(this.config.srcPath, this.config.outPath, true);
    return this.prepbundle(files);
  }

  ////////////////////////////////////////////////
  // Private bundling (hydration) methods
  ////////////////////////////////////////////////

  /**
   * Transforms a series of JSX/TSX files (e.g. a codebase) files into JS hydration scripts
   * in one pass to compile and another to remove dead code, and stores them on disk;
   * 
   * This step is needed by {@link ReactSrv.render} in prod mode as well as {@link ReactSrv.prerender}.
   *
   * @param files an array of {@link TOutputFile}, which stores JSX/TSX source file 
   * absulte path, output paths, relative paths, etc
   */
  private async prepbundle(files: TOutputFile[]): Promise<void> {
    if (files.length === 0) {
      return; // esbuild rejects an empty entryPoints list
    }

    const rootId = 'root';
    const tempRoot = path.join(os.tmpdir(), "react-srv", String(process.pid));
    fs.mkdirSync(tempRoot, { recursive: true });
    const wrapperRoot = fs.mkdtempSync(path.join(tempRoot, "wrappers-"));

    // Bundle every entry in ONE build with code splitting, so any
    // module shared between entries (a big library or a local file) lands in a
    // single content-hashed chunk instead of being copied into each entry.
    // Each entry is driven by a temp wrapper whose basename and folder already
    // match the final output name and writePath, so esbuild's entry
    // naming emits files exactly where the HTML expects them and relative
    // chunk imports are correct as emitted — nothing is renamed or moved.
    try {
      const entryPoints = files.map((file) => {
        const relDir = path.relative(this.config.outPath, file.writePath);
        const wrapperPath = path.join(wrapperRoot, relDir, file.name.js);
        fs.mkdirSync(path.dirname(wrapperPath), { recursive: true });
        fs.writeFileSync(
          wrapperPath,
          [
            `import React from "react";`,
            `import { hydrateRoot } from "react-dom/client";`,
            `import Page from ${JSON.stringify(file.absPath)};`,
            ``,
            `const root = document.getElementById(${JSON.stringify(rootId)});`,
            `if (!root) {`,
            `  throw new Error("react-srv: Could not find hydration root.");`,
            `}`,
            `if (!globalThis.__REACT_SRV_HYDRATED__) {`,
            `  globalThis.__REACT_SRV_HYDRATED__ = true;`,
            `  hydrateRoot(root, React.createElement(Page, globalThis.__INITIAL_PROPS__ || {}));`,
            `}`,
            ``,
          ].join("\n"),
          "utf8"
        );
        return wrapperPath;
      });

      const buildOptions: esbuild.BuildOptions = {
        ...this.browserBuildOptions(),
        // pin working dir so metafile relative paths are resolved
        absWorkingDir: process.cwd(),
        metafile: true,
        entryPoints,
        outbase: wrapperRoot,
        outdir: this.config.outPath,
        entryNames: "[dir]/[name]",
        chunkNames: "chunk-[hash]",
        splitting: this.config.splitting !== false,
        write: false,
      };

      // Pass 1: initial build 
      let result: esbuild.BuildResult = esbuild.buildSync(buildOptions);

      const deadImporters = buildOptions.splitting
        ? FileUtils.deadDynamicImporters(result.metafile, process.cwd())
        : [];
      // Pass 2: remove dead imports
      if (deadImporters.length > 0) {
        console.log(`Rebuilding without ${deadImporters.length} dead dynamic import() call(s)`);
        result = await esbuild.build({
          ...buildOptions,
          plugins: [ReactSrv.dropDeadDynamicImportsPlugin(deadImporters)],
        });
      }

      // Only after dead imports are removed do we chunk, so we can potentially skip more
      const entries = files.map((file) => path.join(file.writePath, file.name.js));
      const reachable = result.metafile ? FileUtils.reachableOutputs(result.metafile, entries) : null;
      let skipped = 0;

      for (const outputFile of result.outputFiles) {
        const isChunk = path.basename(outputFile.path).startsWith("chunk-");
        if (reachable !== null && isChunk && !reachable.has(path.resolve(outputFile.path))) {
          skipped += 1;
          continue;
        }
        fs.mkdirSync(path.dirname(outputFile.path), { recursive: true });
        fs.writeFileSync(outputFile.path, outputFile.text, "utf8");
        console.log('✅ Wrote', path.relative(process.cwd(), outputFile.path));
      }

      if (skipped > 0) {
        console.log(`🗑  Skipped ${skipped} unreferenced chunk(s)`);
      }
    } finally {
      fs.rmSync(wrapperRoot, { recursive: true, force: true });
    }
  }

  /**
   * Transforms a JSX/TSX component (referenced by name) into a JS hydration script.
   * 
   * This is needed by {@link ReactSrv.render} in dev mode.
   * 
   * @param params an object containing pageName, rootId and an optional entry apth
   * @returns a string containing the JS hydration script for the page 
   */
  private bundle(params: { pageName: string; rootId: string; entryPath?: string }): string {
    const { pageName, rootId } = params;

    const entryPath = params.entryPath ?? this.findEntryPath(pageName);
    const entryDir = path.dirname(entryPath);
    const entryBase = path.basename(entryPath);

    const result = esbuild.buildSync({
      ...this.browserBuildOptions(),
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
      write: false,
    });

    return result.outputFiles[0].text;
  }

  ////////////////////////////////////////////////
  // Esbuild plugins
  ////////////////////////////////////////////////

  /**
   * @returns a plugin that dynamically rewrites all react* paths to have absolute paths 
   * via the library's own location so the same React instance the library renders with is reused 
   */
  private static rewriteReactPathsPlugin(): esbuild.Plugin {
    const requireFromLib = createRequire(import.meta.url);
    return {
      name: "externals-to-absolute",
      setup(build) {
        build.onResolve({ filter: /^react(-dom)?($|\/)/ }, (args) => ({
          path: requireFromLib.resolve(args.path),
          external: true,
        }));
      },
    };
  }

  /**
   * @param deadImporters absolute paths of inputs that hold no output and contain a dynamic import()
   * @returns a plugin that replaces dead dynamic imports with placeholders 
   */
  private static dropDeadDynamicImportsPlugin(deadImporters: string[]): esbuild.Plugin {
    const dead = new Set(deadImporters);
    const placeholder = "react-srv:dropped-dynamic-import";

    return {
      name: "react-srv-drop-dead-dynamic-imports",
      setup: (build) => {
        build.onResolve({ filter: /.*/ }, (args) => {
          if (args.kind !== "dynamic-import") return null;
          if (!dead.has(path.resolve(args.importer))) return null;
          return { path: placeholder, namespace: placeholder };
        });
        build.onLoad({ filter: /.*/, namespace: placeholder }, () => ({
          contents: `export default {};`,
          loader: "js",
        }));
      },
    };
  }

  ////////////////////////////////////////////////
  // Other private utility methods
  ////////////////////////////////////////////////

  private browserBuildOptions(): esbuild.BuildOptions {
    const { reactLocation, reactVersion } = this.config;
    return {
      bundle: true,
      format: "esm",
      platform: "browser",
      minify: this.config.minify === true,
      keepNames: this.config.keepNames !== false && this.config.minify === true,
      jsx: "automatic",
      jsxImportSource: "react",
      mainFields: this.config.mainFields ?? [],
      // Resolve react* imports to their CDN URLs at build time
      alias: {
        "react": `${reactLocation}/react@${reactVersion}`,
        "react-dom": `${reactLocation}/react-dom@${reactVersion}`,
        "react-dom/client": `${reactLocation}/react-dom@${reactVersion}/client`,
        "react/jsx-runtime": `${reactLocation}/react@${reactVersion}/jsx-runtime`,
        "react/jsx-dev-runtime": `${reactLocation}/react@${reactVersion}/jsx-dev-runtime`,
      },
      external: [`${reactLocation}/*`],
    };
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

  private findEntryPath(pageName: string): string {
    const tsxPath = FileUtils.findFileRecursive(this.config.srcPath, `${pageName}.tsx`);
    const jsxPath = FileUtils.findFileRecursive(this.config.srcPath, `${pageName}.jsx`);
    const entryPath = tsxPath ?? jsxPath;
    if (!entryPath) {
      throw new Error(
        `react-srv: could not find page component "${pageName}.tsx" or "${pageName}.jsx" in ${this.config.srcPath}`
      );
    }
    return entryPath;
  }

  private getPublicHydrationPath(page: string): string {
    // Mirror formOutputFiles' js naming: normalised name + hash
    // of the source path — resolve the source file to learn that path.
    const entryPath = this.findEntryPath(page);
    const relPath = path.relative(this.config.srcPath, entryPath);
    const hash = FileUtils.pathHash(relPath);

    const fp = `${FileUtils.normaliseName(page)}.${hash}.js`;
    const urlPath = this.getHydrationUrlPrefix();
    const finalPath = urlPath === '' ? '' : `/${urlPath}`;
    const result = `${finalPath}/${fp}`;
    return result;
  }

  /**
   * Issue #10: outPath is declared relative to the config file and follows
   * `<docroot>/<optional subpath>`; the server mounts docroot at "/". So the
   * URL prefix is everything after the docroot segment: normalize
   * separators, drop "." and leading ".." segments, then drop the docroot
   * itself. An absolute outPath has no knowable docroot and is rejected.
   */
  private getHydrationUrlPrefix(): string {
    const outPath = this.config.outPath;
    if (path.isAbsolute(outPath)) {
      throw new Error(
        `react-srv: cannot derive hydration URL: outPath must be relative (from the config file), got absolute path "${outPath}"`
      );
    }
    const segments = path.posix
      .normalize(outPath.replace(/\\/g, "/"))
      .split("/")
      .map((s) => s.trim())
      .filter((s) => s !== "" && s !== ".");
    while (segments[0] === "..") segments.shift();
    segments.shift(); // first remaining segment is the docroot mounted at "/"
    return segments.join("/");
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

  static pathHash(relPath: string): string {
    return createHash("sha1")
      .update(relPath.split(path.sep).join("/"))
      .digest("hex")
      .slice(0, 6);
  }

  /**
   * @returns the absolute paths of files that produced no output yet still contain
   * a dynamic `import()` e.g. dead importers;
   */
  static deadDynamicImporters(metafile: esbuild.Metafile | undefined, cwd: string): string[] {
    if (!metafile) {
      return [];
    }

    const live = new Set<string>();
    for (const node of Object.values(metafile.outputs)) {
      for (const input of Object.keys(node.inputs ?? {})) {
        live.add(input);
      }
    }

    return Object.entries(metafile.inputs)
      .filter(([file, node]) => !live.has(file) && (node.imports ?? []).some((i) => i.kind === "dynamic-import"))
      .map(([file]) => path.resolve(cwd, file));
  }

  /**
   * @returns the absolute paths of every output file reachable from this build's own
   * entries, following the metafile's import graph. `entryOutputs` are the
   * exact output paths the entries are expected to produce.
   */
  static reachableOutputs(metafile: esbuild.Metafile, entryOutputs: string[]): Set<string> | null {
    const outputs = metafile.outputs;
    const roots = new Set(entryOutputs.map((entry) => path.resolve(entry)));
    const reachable = new Set<string>();
    const queue: string[] = [];

    for (const file of Object.keys(outputs)) {
      if (roots.has(path.resolve(file))) {
        reachable.add(file);
        queue.push(file);
      }
    }

    if (queue.length === 0) {
      return null;
    }

    while (queue.length > 0) {
      const current = queue.pop()!;
      // external imports (e.g. CDN URLs) are referenced but have no output
      const node = outputs[current];
      if (!node) {
        continue;
      }
      for (const imported of node.imports ?? []) {
        if (!reachable.has(imported.path)) {
          reachable.add(imported.path);
          queue.push(imported.path);
        }
      }
    }

    return new Set([...reachable].map((file) => path.resolve(file)));
  }

  static formOutputFiles(srcPath: string, outPath: string, flatten: boolean = false): TOutputFile[] {
    const files = fg.sync("**/*.{tsx,jsx}", {
      cwd: srcPath,
      absolute: true,
      onlyFiles: true,
    });

    return files.map((absPath: string) => {
      const component = path.basename(absPath, path.extname(absPath));
      const relPath = path.relative(srcPath, absPath);
      const relDir = path.dirname(relPath);
      const writePath = flatten === true ? outPath : (relDir === "." ? outPath : path.join(outPath, relDir));
      const normalised = FileUtils.normaliseName(component);
      const hash = FileUtils.pathHash(relPath);

      return {
        absPath,
        relPath: relDir,
        component,
        name: {
          js: `${normalised}.${hash}.js`,
          html: `${normalised}.html`,
          mjs: `${normalised}.${hash}.mjs`,
        },
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