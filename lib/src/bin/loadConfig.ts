import path from "path";
import fs from "fs";
import os from "os";
import { createHash } from "crypto";
import * as esbuild from "esbuild";
import { configBundleAdapters, getFrameworkAdapter } from "../frameworks/index.js";

async function bundleConfig(file: string, extra: Partial<esbuild.BuildOptions> = {}) {
  const result = await esbuild.build({
    entryPoints: [file],
    bundle: true,
    platform: "node",
    format: "esm",
    write: false,
    // Silent because pass 1 below "fails" on purpose for preact projects that
    // use the React API; the thrown error still carries the full formatted
    // message for any caller that reports it.
    logLevel: "silent",
    ...extra,
  });
  return result.outputFiles[0].text;
}

async function importBundle(code: string) {
  // Write under the OS temp dir in a per-process folder (same scheme the
  // prerender shell uses); the content hash in the file name keeps imports
  // of different bundles from hitting Node's module cache.
  const tempDir = path.join(os.tmpdir(), "react-srv", String(process.pid));
  fs.mkdirSync(tempDir, { recursive: true });
  const contentKey = createHash("sha1").update(code).digest("hex");
  const tempFile = path.join(tempDir, `config.${contentKey}.mjs`);
  fs.writeFileSync(tempFile, code);
  let mod: any;
  try {
    mod = await import(`file://${tempFile}`);
  } finally {
    // Same cleanup as the prerender shell: the module is in Node's cache
    // after import, the file itself is only litter.
    fs.rmSync(tempFile, { force: true });
  }
  return mod.default ?? mod;
}

export async function loadConfig(file: string) {
  // Pass 1: bundle the config as-is. Covers every project that can resolve
  // its own framework imports (react projects, preact-native ones).
  let config: any;
  try {
    config = await importBundle(await bundleConfig(file));
  } catch {
    config = undefined; // retried through the framework-mapped candidates below
  }
  if (config !== undefined) {
    // Frameworks that need their own config bundling get a second pass (a
    // custom Document then shares the library's framework instance); the
    // rest are done after pass 1.
    const extras = config?.framework
      ? getFrameworkAdapter(config.framework).configBundleOptions
      : undefined;
    if (!extras) return config;
    return importBundle(await bundleConfig(file, extras));
  }
  // Pass 1 couldn't load the config as-is: the project's own imports don't
  // resolve (e.g. a preact-only project writing the React API). Retry
  // through each framework that declares config bundling until one loads.
  // The config module executes a second time on the rebundle path — configs
  // are declarative objects, so the duplicated side effects are negligible.
  let lastError: unknown;
  for (const adapter of configBundleAdapters()) {
    try {
      return await importBundle(await bundleConfig(file, adapter.configBundleOptions));
    } catch (cause) {
      lastError = cause;
    }
  }
  throw lastError;
}
