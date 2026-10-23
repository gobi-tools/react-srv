import type * as esbuild from "esbuild";
import { FrameworkAdapter } from "./framework.js";
import type { TFrameworkRuntime } from "./framework.js";

// react* -> preact mapping for server bundles. esbuild hands plugins the
// ORIGINAL import path — the `alias` option only applies after plugins
// decline to resolve — so this plugin is where react -> preact/compat
// happens. Exact keys only: a bare "react" entry must not swallow
// react/jsx-runtime (compat has no jsx-runtime subpath).
const toPreact: Record<string, string> = {
  "react": "preact/compat",
  "react/jsx-runtime": "preact/jsx-runtime",
  "react/jsx-dev-runtime": "preact/jsx-dev-runtime",
  "react-dom": "preact/compat",
  "react-dom/client": "preact/compat",
  "react-dom/server": "preact-render-to-string",
};

// The stateful core: externalized to absolute paths so the bundled page and
// the library share ONE framework instance — hooks state and the options
// patching compat does at module load depend on it. Their dist files use
// plain `exports.x = ...` assignments, so Node's cjs-module-lexer links
// their named imports fine.
const sharedInstance = new Set(["preact", "preact/hooks"]);

/**
 * @param requireFromLib library-rooted resolver (see FrameworkAdapter)
 * @returns a plugin that maps framework specifiers for server bundles the
 * library compiles itself (prerender pages, CLI config loading).
 *
 * Preact mode splits specifiers in two:
 * - preact core and preact/hooks are externalized to absolute paths (see
 *   sharedInstance above) — the shared, stateful instance.
 * - preact/compat, preact/jsx-runtime, preact/jsx-dev-runtime and
 *   preact-render-to-string are BUNDLED instead: their dist files define
 *   some exports via `Object.defineProperty(... get ...)` (compat and rts
 *   use dynamic export loops, jsx-runtime hides `Fragment` behind a getter),
 *   which Node's cjs-module-lexer cannot see — `import { ... }` in the temp
 *   module would crash — while esbuild resolves CJS named exports at the use
 *   site. Their internal requires of the core hit the first case above, so
 *   the bundled copies still share the one instance.
 *
 * Unmapped react* paths fall through to their real package (usually a rare
 * cjs subpath); if that package isn't installed the build fails loudly with
 * the missing path named.
 */
function preactFrameworkPathsPlugin(requireFromLib: NodeRequire): esbuild.Plugin {
  return {
    name: "externals-to-absolute",
    setup(build) {
      build.onResolve(
        { filter: /^(react(-dom)?|preact|preact-render-to-string)($|\/)/ },
        (args) => {
          const target = toPreact[args.path] ?? args.path;
          const abs = requireFromLib.resolve(target);
          if (!sharedInstance.has(target)) {
            // Bundled: keep the absolute path so resolution does not depend
            // on the importing project's node_modules.
            return { path: abs };
          }
          return { path: abs, external: true };
        }
      );
    },
  };
}

export class PreactAdapter extends FrameworkAdapter {
  readonly name = "preact";
  readonly libPackage = "preact";
  readonly requiredPackages = '"preact" and "preact-render-to-string"';
  readonly jsxImportSource = "preact";

  // Server bundles pin the JSX runtime explicitly instead of trusting the
  // project's tsconfig: the server build must emit preact vnodes. The banner
  // gives the temp module a `require` of its own, needed by the bundled
  // compat/rts code to load the shared preact core (Node ESM has no require;
  // the externals are absolute, so location is irrelevant).
  readonly serverBuildOptions: Partial<esbuild.BuildOptions> = {
    plugins: [preactFrameworkPathsPlugin(this.requireFromLib)],
    jsx: "automatic",
    jsxImportSource: "preact",
    banner: {
      js: 'import { createRequire } from "node:module";\nconst require = createRequire(import.meta.url);',
    },
  };

  // The browser build serves preact-native source (`preact`, `preact/hooks`,
  // ...) straight from the CDN — the bare "preact" key prefix-covers subpaths
  // like preact/jsx-runtime — while react* imports (first-party React-API
  // code and third-party libs) go through preact/compat. React subpath keys
  // must stay explicit: esbuild prefix-joins subpaths, which would otherwise
  // turn `react/jsx-runtime` into `.../compat/jsx-runtime` (a 404).
  browserAliases(libLocation: string, libVersion: string): Record<string, string> {
    return {
      "preact": `${libLocation}/preact@${libVersion}`,
      "react": `${libLocation}/preact@${libVersion}/compat`,
      "react/jsx-runtime": `${libLocation}/preact@${libVersion}/jsx-runtime`,
      "react/jsx-dev-runtime": `${libLocation}/preact@${libVersion}/jsx-dev-runtime`,
      "react-dom": `${libLocation}/preact@${libVersion}/compat`,
      "react-dom/client": `${libLocation}/preact@${libVersion}/compat/client`,
    };
  }

  protected loadRuntime(): TFrameworkRuntime {
    const preact = this.requireFromLib("preact");
    const rts = this.requireFromLib("preact-render-to-string");
    return {
      h: preact.h,
      renderToString: rts.renderToString,
      renderToStaticMarkup: rts.renderToStaticMarkup,
    };
  }
}
