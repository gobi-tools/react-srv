import fs from "fs";
import os from "os";
import path from "path";
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ReactSrv, { FileUtils } from "./index.js";

describe("ReactSrv", () => {
  describe("prebundle", () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "react-srv-prebundle-"));
    const srcPath = path.join(tmpRoot, "src");
    const outPath = path.join(tmpRoot, "out");

    const componentSource = (name: string) =>
      `export default function ${name}() {\n  return <div>${name}</div>;\n}\n`;

    const writeComponent = (relPath: string) => {
      const fp = path.join(srcPath, relPath);
      fs.mkdirSync(path.dirname(fp), { recursive: true });
      const name = path.basename(relPath, path.extname(relPath));
      fs.writeFileSync(fp, componentSource(name), "utf8");
    };

    const readOutFiles = (): string[] => {
      if (!fs.existsSync(outPath)) return [];
      return fs.readdirSync(outPath, { recursive: true }) as string[];
    };

    const readOutFile = (relPath: string): string =>
      fs.readFileSync(path.join(outPath, relPath), "utf8");

    beforeEach(() => {
      fs.rmSync(srcPath, { recursive: true, force: true });
      fs.rmSync(outPath, { recursive: true, force: true });
      fs.mkdirSync(srcPath, { recursive: true });
    });

    afterEach(() => {
      vi.restoreAllMocks(); // restores the findFileRecursive spy from the issue #6 test
    });

    afterAll(() => {
      fs.rmSync(tmpRoot, { recursive: true, force: true });
    });

    describe("hydrate: false", () => {
      it("does not write any files", () => {
        writeComponent("Home.tsx");
        const srv = new ReactSrv({ srcPath, outPath, hydrate: false });
        srv.prebundle();
        expect(readOutFiles()).toEqual([]);
      });

    });

    describe("hydrate: true", () => {
      it("does nothing when the src folder has no page components", () => {
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        expect(readOutFiles()).toEqual([]);
      });

      it("creates the outPath folder when it does not exist", () => {
        writeComponent("Home.tsx");
        expect(fs.existsSync(outPath)).toBe(false);
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        expect(fs.existsSync(outPath)).toBe(true);
      });

      it("writes a hydration script named after the component", () => {
        writeComponent("Home.tsx");
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        expect(readOutFiles()).toContain("home.js");
      });

      it("normalises the output filename (MyHomePage.tsx -> my_home_page.js)", () => {
        writeComponent("MyHomePage.tsx");
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        expect(readOutFiles()).toContain("my_home_page.js");
      });

      it("picks up nested page components as well", () => {
        writeComponent("pages/About.tsx");
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        expect(readOutFiles().some((f) => path.basename(f) === "about.js")).toBe(true);
      });

      it("bundles a hydration entry that hydrates the #root element", () => {
        writeComponent("Home.tsx");
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        const code = readOutFile("home.js");
        expect(code).toContain('document.getElementById("root")');
        expect(code).toContain("hydrateRoot(");
        expect(code).toContain("__REACT_SRV_HYDRATED__");
      });

      it("rewrites bare react imports to esm.sh URLs", () => {
        writeComponent("Home.tsx");
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        const code = readOutFile("home.js");
        expect(code).toContain('from "https://esm.sh/react@19.2.0"');
        expect(code).toContain('from "https://esm.sh/react-dom@19.2.0/client"');
        expect(code).toContain('from "https://esm.sh/react@19.2.0/jsx-runtime"');
        expect(code).not.toContain('from "react"');
        expect(code).not.toContain('from "react-dom/client"');
        expect(code).not.toContain('from "react/jsx-runtime"');
      });

      it("throws a descriptive error when the page component file cannot be found", () => {
        writeComponent("Home.tsx");
        vi.spyOn(FileUtils, "findFileRecursive").mockReturnValue(null);
        const srv = new ReactSrv({ srcPath, outPath });
        expect(() => srv.prebundle()).toThrow(/could not find page component/i);
      });

      it("keeps hydration scripts for duplicate component names apart (issue #8)", () => {
        writeComponent("a/Home.tsx");
        writeComponent("b/Home.tsx");
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        const jsFiles = readOutFiles().filter((f) => f.endsWith(".js"));
        expect(jsFiles).toHaveLength(2);
      });
    });
  });
});
