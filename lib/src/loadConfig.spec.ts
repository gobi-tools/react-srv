import fs from "fs";
import os from "os";
import path from "path";
import { createRequire } from "module";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { loadConfig } from "./bin/loadConfig.js";

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

  // A react project fixture: pass 1 must resolve "react" from the project.
  const linkReact = () => {
    const reactDir = path.dirname(createRequire(import.meta.url).resolve("react/package.json"));
    const nm = path.join(tmpRoot, "node_modules");
    fs.mkdirSync(nm, { recursive: true });
    fs.symlinkSync(reactDir, path.join(nm, "react"), "dir");
  };

  beforeEach(() => {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
    fs.mkdirSync(tmpRoot, { recursive: true });
  });

  afterAll(() => {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  it("loads a react config from the project in one pass", async () => {
    linkReact();
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
    // no node_modules here: "react" can't resolve from the project, so the
    // config only loads through the react -> preact/compat mapping
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
});
