import fs from "fs";
import { createRequire } from "module";

/**
 * Resolution rooted at the library's own install. Everything the library
 * compiles (server pages, configs) and the library itself must resolve the
 * framework through here so the whole process shares ONE framework instance
 * — hooks state and the options patching compat does at module load depend
 * on it.
 */
export const requireFromLib = createRequire(import.meta.url);

const FALLBACK_VERSION = "latest";

/**
 * @param pkgName package to resolve (e.g. "react", "preact")
 * @returns the locally installed version of `pkgName`, or a CDN-safe fallback
 */
export function resolveInstalledPackageVersion(pkgName: string): string {
  try {
    const pkgPath = requireFromLib.resolve(`${pkgName}/package.json`);
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    const version = typeof pkg.version === "string" ? pkg.version.trim() : "";
    return version === "" ? FALLBACK_VERSION : version;
  } catch {
    return FALLBACK_VERSION;
  }
}
