#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import fs from "fs";
import os from "os";
import { createHash } from "crypto";
import * as esbuild from "esbuild";
import ReactSrv, { DefaultReactSrvConfig } from "../index.js";

async function bundleConfig(file: string, extra: Partial<esbuild.BuildOptions> = {}) {
  const result = await esbuild.build({
    entryPoints: [file],
    bundle: true,
    platform: "node",
    format: "esm",
    write: false,
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
  const mod = await import(`file://${tempFile}`);
  return mod.default ?? mod;
}

export async function loadConfig(file: string) {
  // Pass 1: bundle the config as-is. Covers react projects and preact-native
  // ones alike (their framework imports resolve from the project and get
  // bundled in, same as before).
  try {
    const config = await importBundle(await bundleConfig(file));
    if (config?.framework !== "preact") return config;
  } catch {
    // A preact project whose config uses the React API can't resolve "react"
    // here; the preact pass below maps it. Any other failure resurfaces
    // there with an equivalent error.
  }
  // Pass 2: re-bundle with the react* -> preact mapping and the framework
  // externalized to the library's own copy, so a custom Document shares the
  // same preact instance the shell renders with (hooks state and the options
  // patching compat does at module load depend on it). The config module
  // executes a second time here — configs are declarative objects, so the
  // duplicated side effects are negligible.
  const code = await bundleConfig(file, {
    plugins: [ReactSrv.rewriteFrameworkPathsPlugin("preact")],
    jsx: "automatic",
    jsxImportSource: "preact",
    banner: {
      // Bundled compat code still calls require() for the shared preact
      // core; Node ESM has no require (the externals are absolute, so the
      // temp file's location is irrelevant).
      js: 'import { createRequire } from "node:module";\nconst require = createRequire(import.meta.url);',
    },
  });
  return importBundle(code);
}

const program = new Command();

program.name("react-srv");

function resolveConfig(file: string) {
  return path.resolve(process.cwd(), file);
}

async function createSrv(file?: string) {
  const config = !!file ? await loadConfig(resolveConfig(file)) : DefaultReactSrvConfig;

  if (!config || typeof config !== "object") {
    throw new Error("Invalid config export");
  }

  return new ReactSrv(config);
}

// --- bundle ---
program
  .command("bundle")
  .description("Bundle the project")
  .option("-f, --file <path>", "Config file")
  .action(async (opts) => {
    const srv = await createSrv(opts.file);
    await srv.prebundle();
  });

// --- render ---
program
  .command("render")
  .description("Prerender static output")
  .option("-f, --file <path>", "Config file")
  .action(async (opts) => {
    const srv = await createSrv(opts.file);
    await srv.prerender();
  });

program.parse();