import type * as esbuild from "esbuild";
import { requireFromLib, resolveInstalledPackageVersion } from "./shared.js";
import type { TFrameworkAdapter, TFrameworkRuntime } from "./types.js";

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

// Everything resolved to these is externalized to an absolute path so the
// bundled page and the library share ONE framework instance. Their dist
// files are statically analyzable, so Node can link their named ESM imports.
const sharedInstance = new Set([
  "preact",
  "preact/hooks",
  "preact/jsx-runtime",
  "preact/jsx-dev-runtime",
]);

/**
 * @returns a plugin that maps framework specifiers for server bundles the
 * library compiles itself (prerender pages, CLI config loading).
 *
 * Preact mode splits specifiers in two:
 * - preact core/hooks/jsx-runtime are externalized to absolute paths (see
 *   sharedInstance above).
 * - preact/compat and preact-render-to-string are BUNDLED instead: their
 *   dist files export via dynamic Object.defineProperty loops that Node's
 *   cjs-module-lexer cannot see, which would crash `import { ... }` at
 *   runtime; esbuild resolves CJS named exports at the use site instead.
 *   Their internal requires of the core hit the first case above.
 *
 * Unmapped react* paths fall through to their real package (usually a rare
 * cjs subpath); if that package isn't installed the build fails loudly with
 * the missing path named.
 */
function preactFrameworkPathsPlugin(): esbuild.Plugin {
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

// Server bundles pin the JSX runtime explicitly instead of trusting the
// project's tsconfig: the server build must emit preact vnodes. The banner
// gives the temp module a `require` of its own, needed by the bundled
// compat/rts code to load the shared preact core (Node ESM has no require;
// the externals are absolute, so location is irrelevant).
const preactServerBuild: Partial<esbuild.BuildOptions> = {
  plugins: [preactFrameworkPathsPlugin()],
  jsx: "automatic",
  jsxImportSource: "preact",
  banner: {
    js: 'import { createRequire } from "node:module";\nconst require = createRequire(import.meta.url);',
  },
};

export const PreactAdapter: TFrameworkAdapter = {
  libPackage: "preact",

  runtime(): TFrameworkRuntime {
    try {
      const preact = requireFromLib("preact");
      const rts = requireFromLib("preact-render-to-string");
      return {
        h: preact.h,
        renderToString: rts.renderToString,
        renderToStaticMarkup: rts.renderToStaticMarkup,
      };
    } catch (cause) {
      const detail = cause instanceof Error ? ` (${cause.message})` : "";
      throw new Error(
        `react-srv: framework "preact" requires "preact" and "preact-render-to-string" to be installed${detail}`
      );
    }
  },

  installedVersion: () => resolveInstalledPackageVersion("preact"),

  serverBuild: () => preactServerBuild,

  // Configs load through the same mapping so a custom Document shares the
  // library's preact instance (loadConfig's second pass).
  configBundleOptions: preactServerBuild,

  // The browser build serves preact-native source (`preact`, `preact/hooks`,
  // ...) straight from the CDN — the bare "preact" key prefix-covers subpaths
  // like preact/jsx-runtime — while react* imports (first-party React-API
  // code and third-party libs) go through preact/compat. React subpath keys
  // must stay explicit: esbuild prefix-joins subpaths, which would otherwise
  // turn `react/jsx-runtime` into `.../compat/jsx-runtime` (a 404).
  browserAliases: (libLocation, libVersion) => ({
    "preact": `${libLocation}/preact@${libVersion}`,
    "react": `${libLocation}/preact@${libVersion}/compat`,
    "react/jsx-runtime": `${libLocation}/preact@${libVersion}/jsx-runtime`,
    "react/jsx-dev-runtime": `${libLocation}/preact@${libVersion}/jsx-dev-runtime`,
    "react-dom": `${libLocation}/preact@${libVersion}/compat`,
    "react-dom/client": `${libLocation}/preact@${libVersion}/compat/client`,
  }),

  jsxImportSource: "preact",
};
