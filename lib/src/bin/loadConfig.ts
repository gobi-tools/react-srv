import path from "path";
import fs from "fs";
import os from "os";
import { createHash } from "crypto";
import * as esbuild from "esbuild";
import { type TReactSrvConfig } from "../index.js";
import { type FrameworkAdapter } from "../frameworks/framework.js";
import { FALLBACK_FRAMEWORK, FRAMEWORK_ADAPTERS, type TSupportedFramework } from "../frameworks/index.js";

/**
 * @param fpath a filepath for the project's config
 * @returns the config object, after it's been converted to valid JS/TS
 * @throws when the framework name is unsupported, or the config can't be read, bundled or run
 */
export async function loadConfig(fpath: string): Promise<Partial<TReactSrvConfig>> {
  const code = fs.readFileSync(fpath, "utf8");
  const framework = peekFramework(code);
  return await loadWith(fpath, FRAMEWORK_ADAPTERS[framework]);
}

/**
 * 
 * @param source the source code of the project's config
 * @returns the type of framework (react, preact, etc)
 */
function peekFramework(source: string): TSupportedFramework {
  const FRAMEWORK_REGEX = /\bframework\s*:\s*["'`]([^"'`]+)["'`]/;
  return (FRAMEWORK_REGEX.exec(source)?.[1] ?? FALLBACK_FRAMEWORK) as TSupportedFramework;
}

/**
 * 
 * @param fpath the filepath for the  project's config
 * @param adapter the correct framework adapter
 * @returns the config object, after it's been converted to valid JS/TS
 */
async function loadWith(
  fpath: string,
  adapter: FrameworkAdapter
): Promise<Partial<TReactSrvConfig>> {
  const result = await esbuild.build({
    entryPoints: [fpath],
    bundle: true,
    platform: "node",
    format: "esm",
    write: false,
    ...adapter.serverBuildOptions,
  });
  return importBundle(result.outputFiles[0].text);
}

/**
 * 
 * @param code the compiled JS/TS code  
 * @returns the config module's default export, read as {@link TReactSrvConfig}
 */
async function importBundle(code: string): Promise<Partial<TReactSrvConfig>> {
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