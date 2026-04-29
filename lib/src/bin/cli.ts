#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import * as esbuild from "esbuild";
import ReactSrv from "../index.js";

export async function loadConfig(file: string) {
  const result = await esbuild.build({
    entryPoints: [file],
    bundle: true,
    platform: "node",
    format: "esm",
    write: false,
  });

  let code = result.outputFiles[0].text;

  const moduleUrl =
    "data:text/javascript;base64," +
    Buffer.from(code).toString("base64");

  const mod = await import(moduleUrl);

  return mod.default ?? mod;
}

const program = new Command();

program.name("react-srv");

function resolveConfig(file: string) {
  return path.resolve(process.cwd(), file);
}

async function createSrv(file: string) {
  const configPath = resolveConfig(file);
  const config = await loadConfig(configPath);

  if (!config || typeof config !== "object") {
    throw new Error("Invalid config export");
  }

  return new ReactSrv(config);
}

// --- bundle ---
program
  .command("bundle")
  .description("Bundle the project")
  .requiredOption("-f, --file <path>", "Config file")
  .action(async (opts) => {
    const srv = await createSrv(opts.file);
    await srv.prebundle();
  });

// --- render ---
program
  .command("render")
  .description("Prerender static output")
  .requiredOption("-f, --file <path>", "Config file")
  .action(async (opts) => {
    const srv = await createSrv(opts.file);
    await srv.prerender();
  });

program.parse();