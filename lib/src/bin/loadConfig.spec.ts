import fs from "fs";
import os from "os";
import path from "path";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { loadConfig } from "./loadConfig.js";

// The loadConfig bundling is what gives a project's Document the same
// framework instance the shell renders with — see cli.ts. Importing it from
// its own module (not bin/cli.ts) keeps commander's program.parse() side
// effect out of the test process.
describe("loadConfig", () => {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "react-srv-loadconfig-"));

  const writeConfig = (name: string, body: string): string => {
    const fp = path.join(tmpRoot, name);
    fs.writeFileSync(fp, body, "utf8");
    return fp;
  };

  beforeEach(() => {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
    fs.mkdirSync(tmpRoot, { recursive: true });
  });

  afterAll(() => {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  it("loads a react config from the project", async () => {
    // no node_modules in the fixture: the config's react imports come from
    // the library's own install (react's server mapping externalizes them)
    const fp = writeConfig(
      "config.ts",
      `import { createElement } from "react";\n` +
        `export default {\n` +
        `  framework: "react" as const,\n` +
        `  srcPath: "./src",\n` +
        `  Document: (props: any) => createElement("p", null, "react-doc", props.children),\n` +
        `};\n`
    );
    const config = await loadConfig(fp);
    expect(config.framework).toBe("react");
    expect(config.srcPath).toBe("./src");
    // the Document is callable and produces an element
    expect(config.Document({ children: null }).type).toBe("p");
  });

  it("loads a preact config whose source uses the React API (react is mapped)", async () => {
    // no node_modules here: the preact mapping supplies "react" as
    // preact/compat from the library's own install
    const fp = writeConfig(
      "config.ts",
      `import { createElement, useState } from "react";\n` +
        `export default {\n` +
        `  framework: "preact" as const,\n` +
        `  srcPath: "./src",\n` +
        `  Document: (props: any) =>\n` +
        `    createElement("p", null, \`doc-\${useState(5)[0]}\`, props.children),\n` +
        `};\n`
    );
    const config = await loadConfig(fp);
    expect(config.framework).toBe("preact");
    expect(typeof config.Document).toBe("function");
  });

  it("loads a preact-native config (h from preact)", async () => {
    const fp = writeConfig(
      "config.ts",
      `import { h } from "preact";\n` +
        `export default {\n` +
        `  framework: "preact" as const,\n` +
        `  Document: (props: any) => h("p", null, "native-doc", props.children),\n` +
        `};\n`
    );
    const config = await loadConfig(fp);
    expect(config.framework).toBe("preact");
    expect(config.Document({ children: null }).type).toBe("p");
  });

  it("follows a framework computed at runtime (invisible to the source scan)", async () => {
    // The scan finds no literal, so the config first loads under the react
    // default; the loaded `framework` is then the truth and the config is
    // reloaded under the preact mapping — i.e. the module executed twice.
    const g = globalThis as any;
    const fp = writeConfig(
      "config.ts",
      `import { createElement } from "react";\n` +
        `(globalThis as any).__CONFIG_RUNS = ((globalThis as any).__CONFIG_RUNS ?? 0) + 1;\n` +
        `export default {\n` +
        `  framework: ["pre", "act"].join(""),\n` +
        `  Document: (props: any) =>\n` +
        `    createElement("p", null, "computed-doc", props.children),\n` +
        `};\n`
    );
    try {
      const config = await loadConfig(fp);
      expect(config.framework).toBe("preact");
      expect(config.Document({ children: null }).type).toBe("p");
      expect(g.__CONFIG_RUNS).toBe(2);
    } finally {
      delete g.__CONFIG_RUNS;
    }
  });
});
