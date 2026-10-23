import fs from "fs";
import { createRequire } from "module";
import type * as esbuild from "esbuild";

/** The framework functions the server-side shell renders with. */
export type TFrameworkRuntime = {
  h: (type: any, props: any, ...children: any[]) => any;
  renderToString: (vnode: any) => string;
  renderToStaticMarkup: (vnode: any) => string;
};

const FALLBACK_VERSION = "latest";

/**
 * The contract for one supported framework. All framework-specific
 * knowledge (runtimes, CDN aliases, server build options) lives on the
 * concrete adapters; the library's orchestration code only ever talks to
 * this interface. Adding a framework = one adapter file + one registry
 * entry in index.tsx.
 */
export abstract class FrameworkAdapter {
  /** The config name — the registry key and the identity used in errors. */
  abstract readonly name: string;

  /** The package whose installed version pins the CDN URLs. */
  abstract readonly libPackage: string;

  /** Packages listed in the missing-dependency error. */
  abstract readonly requiredPackages: string;

  /** The automatic JSX import source for browser builds. */
  abstract readonly jsxImportSource: string;

  /**
   * esbuild options for every server bundle the library compiles itself —
   * prerendered pages AND project configs (so a config's Document runs on
   * the same framework instance as the shell): externals plugin, JSX pin,
   * banner — whatever the framework needs on top of the common build.
   */
  abstract readonly serverBuildOptions: Partial<esbuild.BuildOptions>;

  /**
   * @returns the browser-build alias map that redirects every framework
   * import (the framework's own packages AND react* compat specifiers) to
   * the CDN, pinned to libVersion.
   */
  abstract browserAliases(libLocation: string, libVersion: string): Record<string, string>;

  /**
   * Resolution rooted at the library's own install. Everything the library
   * compiles (server pages, configs) and the library itself resolves the
   * framework through here so the whole process shares ONE framework
   * instance — hooks state and the options patching compat does at module
   * load depend on it.
   */
  protected readonly requireFromLib = createRequire(import.meta.url);

  /**
   * Framework-specific shell functions (h + server renderers). The base
   * wraps any load failure in the standard missing-dependency error.
   */
  protected abstract loadRuntime(): TFrameworkRuntime;

  runtime(): TFrameworkRuntime {
    try {
      return this.loadRuntime();
    } catch (cause) {
      const detail = cause instanceof Error ? ` (${cause.message})` : "";
      throw new Error(
        `react-srv: framework "${this.name}" requires ${this.requiredPackages} to be installed${detail}`
      );
    }
  }

  /** @returns the locally installed framework version (the CDN pin default) */
  installedVersion(): string {
    try {
      const pkgPath = createRequire(import.meta.url).resolve(`${this.libPackage}/package.json`);
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      const version = typeof pkg.version === "string" ? pkg.version.trim() : "";
      return version === "" ? FALLBACK_VERSION : version;
    } catch {
      return FALLBACK_VERSION;
    }
  }
}