import type * as esbuild from "esbuild";
import { requireFromLib, resolveInstalledPackageVersion } from "./shared.js";
import type { TFrameworkAdapter, TFrameworkRuntime } from "./types.js";

/**
 * @returns a plugin that resolves react* packages to absolute paths via the
 * library's own location so the bundled page renders with the same React
 * instance the library itself loaded.
 */
function reactFrameworkPathsPlugin(): esbuild.Plugin {
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

const reactServerBuild: Partial<esbuild.BuildOptions> = {
  plugins: [reactFrameworkPathsPlugin()],
};

export const ReactAdapter: TFrameworkAdapter = {
  libPackage: "react",

  runtime(): TFrameworkRuntime {
    try {
      const react = requireFromLib("react");
      const { renderToString, renderToStaticMarkup } = requireFromLib("react-dom/server");
      return {
        h: react.createElement,
        renderToString,
        renderToStaticMarkup,
      };
    } catch (cause) {
      const detail = cause instanceof Error ? ` (${cause.message})` : "";
      throw new Error(
        `react-srv: framework "react" requires "react" and "react-dom" to be installed${detail}`
      );
    }
  },

  installedVersion: () => resolveInstalledPackageVersion("react"),

  serverBuild: () => reactServerBuild,

  // No configBundleOptions: react projects resolve their own react, so the
  // config loads in a single plain pass.

  browserAliases: (libLocation, libVersion) => ({
    "react": `${libLocation}/react@${libVersion}`,
    "react-dom": `${libLocation}/react-dom@${libVersion}`,
    "react-dom/client": `${libLocation}/react-dom@${libVersion}/client`,
    "react/jsx-runtime": `${libLocation}/react@${libVersion}/jsx-runtime`,
    "react/jsx-dev-runtime": `${libLocation}/react@${libVersion}/jsx-dev-runtime`,
  }),

  jsxImportSource: "react",
};
