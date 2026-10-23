import path from "path";
import fs from "fs";
import os from "os";
import { createHash } from "crypto";
import * as esbuild from "esbuild";
import { frameworkAdapters, getFrameworkAdapter, type TReactSrvConfig } from "../index.js";
import type { FrameworkAdapter } from "../frameworks/framework.js";

/**
 * @param file the project's config module (TS/JS, default export)
 * @returns the config; its `framework` is verified to name a supported
 * adapter
 * @throws when no pass can run the config, or the framework is unknown
 */
export async function loadConfig(file: string): Promise<Partial<TReactSrvConfig>> {
  // The config declares the framework it needs, and only running it reveals
  // which one: pass 1 bundles it plainly to discover `framework`.
  let discovered: Partial<TReactSrvConfig> | undefined;
  try {
    discovered = await importBundle(await bundleConfig(file));
  } catch {
    discovered = undefined;
  }
  if (discovered !== undefined) {
    // Pass 2 only when a framework was declared: rebundle through its server
    // mapping, so the config's imports (and a custom Document) share the
    // library's own framework instance — the same mapping prerendered pages
    // get. Configs are declarative objects, so the module executing twice
    // has negligible side effects.
    return discovered.framework
      ? loadWith(file, getFrameworkAdapter(discovered.framework))
      : discovered;
  }
  // Pass 1 couldn't run the config at all: the project can't resolve its own
  // framework imports (e.g. a preact-only project using the React API). Try
  // each framework's mapping; whichever runs reveals the declared framework,
  // and that one gets the final say over the mapping used (a react mapping
  // can run a preact config and vice versa).
  let lastError: unknown;
  for (const adapter of frameworkAdapters()) {
    try {
      const config = await loadWith(file, adapter);
      return config.framework ? loadWith(file, getFrameworkAdapter(config.framework)) : config;
    } catch (cause) {
      lastError = cause;
    }
  }
  throw lastError;
}

/** @returns the config module's default export, read as {@link TReactSrvConfig} */
async function importBundle(code: string): Promise<Partial<TReactSrvConfig>> {
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
  return (mod.default ?? mod) as Partial<TReactSrvConfig>;
}

async function bundleConfig(
  file: string,
  extra: Partial<esbuild.BuildOptions> = {}
): Promise<string> {
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

/** Bundle + import the config through one framework's server mapping. */
async function loadWith(
  file: string,
  adapter: FrameworkAdapter
): Promise<Partial<TReactSrvConfig>> {
  return importBundle(await bundleConfig(file, adapter.serverBuildOptions));
}


