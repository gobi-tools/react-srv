import { ReactAdapter } from "./react.js";
import { PreactAdapter } from "./preact.js";
import type { TFrameworkAdapter } from "./types.js";

export type { TFrameworkAdapter, TFrameworkRuntime } from "./types.js";
export { requireFromLib, resolveInstalledPackageVersion } from "./shared.js";

/** The frameworks the library can speak for; widen when adding one. */
export type TSupportedFramework = "react" | "preact";

const adapters: Record<TSupportedFramework, TFrameworkAdapter> = {
  react: ReactAdapter,
  preact: PreactAdapter,
};

/**
 * @param framework the configured framework name
 * @returns the adapter that speaks for it
 * @throws a clear error for unknown names (e.g. from an untyped config)
 */
export function getFrameworkAdapter(framework: TSupportedFramework): TFrameworkAdapter {
  const adapter = adapters[framework];
  if (!adapter) {
    throw new Error(
      `react-srv: unknown framework "${framework}" — supported: ${Object.keys(adapters).join(", ")}`
    );
  }
  return adapter;
}

/**
 * @returns the adapters whose configs need their own bundling, i.e. the
 * candidates loadConfig retries through when a config can't load plain
 * (see TFrameworkAdapter.configBundleOptions).
 */
export function configBundleAdapters(): TFrameworkAdapter[] {
  return Object.values(adapters).filter((adapter) => adapter.configBundleOptions);
}
