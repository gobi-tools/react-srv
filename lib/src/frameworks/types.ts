import type * as esbuild from "esbuild";

/** The framework functions the server-side shell renders with. */
export type TFrameworkRuntime = {
  h: (type: any, props: any, ...children: any[]) => any;
  renderToString: (vnode: any) => string;
  renderToStaticMarkup: (vnode: any) => string;
};

/**
 * Everything the library needs to know to speak for one framework. Adding a
 * framework means adding one adapter file and one registry entry — never
 * touching the library's orchestration code.
 */
export type TFrameworkAdapter = {
  /** The package whose installed version pins the CDN URLs. */
  libPackage: string;

  /**
   * @returns the shell runtime (h + server renderers)
   * @throws a `react-srv: framework "..." requires ... to be installed`
   * error when the framework's packages are missing
   */
  runtime(): TFrameworkRuntime;

  /** @returns the locally installed framework version (the CDN pin default) */
  installedVersion(): string;

  /**
   * @returns esbuild options for server bundles the library compiles itself
   * (prerendered pages): whatever externals/JSX/banner specifics the
   * framework needs on top of the common build.
   */
  serverBuild(): Partial<esbuild.BuildOptions>;

  /**
   * @returns esbuild options for bundling a project config, or undefined
   * when configs load fine in a single plain pass (react). loadConfig falls
   * back to these when a project's own imports can't resolve — e.g. a
   * preact-only project writing the React API — and uses them to keep the
   * config's Document on the same framework instance as the shell.
   */
  configBundleOptions?: Partial<esbuild.BuildOptions>;

  /**
   * @returns the browser-build alias map that redirects every framework
   * import (the framework's own packages AND react* compat specifiers) to
   * the CDN, pinned to libVersion.
   */
  browserAliases(libLocation: string, libVersion: string): Record<string, string>;

  /** The automatic JSX import source for browser builds. */
  jsxImportSource: string;
};
