import type * as esbuild from "esbuild";
import { FrameworkAdapter } from "./framework.js";
import type { TFrameworkRuntime } from "./framework.js";

/**
 * @param requireFromLib library-rooted resolver (see FrameworkAdapter)
 * @returns a plugin that resolves react* packages to absolute paths via the
 * library's own location so the bundled page renders with the same React
 * instance the library itself loaded.
 */
function reactFrameworkPathsPlugin(requireFromLib: NodeRequire): esbuild.Plugin {
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

export class ReactAdapter extends FrameworkAdapter {
  readonly name = "react";
  readonly libPackage = "react";
  readonly requiredPackages = '"react" and "react-dom"';
  readonly jsxImportSource = "react";

  readonly serverBuildOptions: Partial<esbuild.BuildOptions> = {
    plugins: [reactFrameworkPathsPlugin(this.requireFromLib)],
    // No jsx pin: react projects are tsconfig-driven (today's behaviour).
  };

  browserAliases(libLocation: string, libVersion: string): Record<string, string> {
    return {
      "react": `${libLocation}/react@${libVersion}`,
      "react-dom": `${libLocation}/react-dom@${libVersion}`,
      "react-dom/client": `${libLocation}/react-dom@${libVersion}/client`,
      "react/jsx-runtime": `${libLocation}/react@${libVersion}/jsx-runtime`,
      "react/jsx-dev-runtime": `${libLocation}/react@${libVersion}/jsx-dev-runtime`,
    };
  }

  protected loadRuntime(): TFrameworkRuntime {
    const react = this.requireFromLib("react");
    const { renderToString, renderToStaticMarkup } = this.requireFromLib("react-dom/server");
    return {
      h: react.createElement,
      renderToString,
      renderToStaticMarkup,
    };
  }
}
