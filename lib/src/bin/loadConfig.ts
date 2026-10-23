import path from "path";
import fs from "fs";
import os from "os";
import { createHash } from "crypto";
import * as esbuild from "esbuild";
import { getFrameworkAdapter, type TReactSrvConfig } from "../index.js";
import type { FrameworkAdapter, TSupportedFramework } from "../frameworks/framework.js";

// A config declares its framework, and that declaration decides how the
// config's own imports get mapped — so it must be known before the module
// can run. Virtually every config writes it as a literal, which a source
// scan finds; a config that computes the value (spread, import, env var)
// doesn't match, falls back to "react", and is corrected by the loaded
// value in loadConfig below.
const FRAMEWORK_RE = /\bframework\s*:\s*["'`]([^"'`]+)["'`]/;

/** @returns the framework `source` declares, or "react" when it isn't a literal */
function peekFramework(source: string): TSupportedFramework {
  return (FRAMEWORK_RE.exec(source)?.[1] ?? "react") as TSupportedFramework;
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

/** Bundle + import the config through one framework's server mapping. */
async function loadWith(
  file: string,
  adapter: FrameworkAdapter
): Promise<Partial<TReactSrvConfig>> {
  const result = await esbuild.build({
    entryPoints: [file],
    bundle: true,
    platform: "node",
    format: "esm",
    write: false,
    // Quiet by default: a failed build is rethrown, and its message already
    // carries esbuild's full formatted diagnostics.
    logLevel: "silent",
    ...adapter.serverBuildOptions,
  });
  return importBundle(result.outputFiles[0].text);
}

/**
 * @param file the project's config module (TS/JS, default export)
 * @returns the config, bundled through its framework's server mapping so the
 * config's imports (and a custom Document) share the library's own framework
 * instance — the same mapping prerendered pages get
 * @throws when the framework name is unsupported, or the config can't be
 * read, bundled or run
 */
export async function loadConfig(file: string): Promise<Partial<TReactSrvConfig>> {
  const framework = peekFramework(fs.readFileSync(file, "utf8"));
  let config = await loadWith(file, getFrameworkAdapter(framework));
  // The scan is a hint, not a guarantee: when a config computes its
  // framework, the loaded value is the truth — redo the load under that
  // framework's mapping. Configs are declarative objects; executing twice
  // has negligible side effects.
  const declared = config.framework ?? "react";
  if (declared !== framework) {
    config = await loadWith(file, getFrameworkAdapter(declared));
  }
  return config;
}
