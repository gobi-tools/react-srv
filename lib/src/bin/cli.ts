#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import ReactSrv, { DefaultReactSrvConfig } from "../index.js";
import { loadConfig } from "./loadConfig.js";

const program = new Command();
program.name("react-srv");

// --- bundle ---
program
  .command("bundle")
  .description("Bundle the project")
  .option("-f, --file <path>", "Config file path")
  .action(async (opts) => {
    const srv = await createLibInstance(opts.file);
    await srv.prebundle();
  });

// --- render ---
program
  .command("render")
  .description("Prerender static output")
  .option("-f, --file <path>", "Config file")
  .action(async (opts) => {
    const srv = await createLibInstance(opts.file);
    await srv.prerender();
  });

program.parse();

// --- utilities ---

async function createLibInstance(file?: string) {
  const config = !!file ? await loadConfig(resolveAbsPath(file)) : DefaultReactSrvConfig;

  if (!config || typeof config !== "object") {
    throw new Error("Invalid config export");
  }

  return new ReactSrv(config);
}

function resolveAbsPath(file: string): string {
  return path.resolve(process.cwd(), file);
}