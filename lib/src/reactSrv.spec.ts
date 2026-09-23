import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import React from "react";
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ReactSrv, { FileUtils } from "./index.js";

describe("ReactSrv", () => {
  // js/mjs outputs are `<normalised-name>.<6-hex hash of source path>.js`
  // (issue #8); html keeps its plain name
  const hashedJs = (relSrc: string) =>
    `${FileUtils.normaliseName(path.basename(relSrc, path.extname(relSrc)))}.${FileUtils.pathHash(relSrc)}.js`;

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
      vi.restoreAllMocks(); // restores the findFileRecursive spy from the issue #7 test
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
        expect(readOutFiles()).toContain(hashedJs("Home.tsx"));
      });

      it("normalises the output filename (MyHomePage.tsx -> my_home_page.<hash>.js)", () => {
        writeComponent("MyHomePage.tsx");
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        expect(readOutFiles()).toContain(hashedJs("MyHomePage.tsx"));
      });

      it("picks up nested page components as well", () => {
        writeComponent("pages/About.tsx");
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        expect(readOutFiles().some((f) => path.basename(f) === hashedJs("pages/About.tsx"))).toBe(true);
      });

      it("bundles a hydration entry that hydrates the #root element", () => {
        writeComponent("Home.tsx");
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        const code = readOutFile(hashedJs("Home.tsx"));
        expect(code).toContain('document.getElementById("root")');
        expect(code).toContain("hydrateRoot(");
        expect(code).toContain("__REACT_SRV_HYDRATED__");
      });

      it("rewrites bare react imports to esm.sh URLs", () => {
        writeComponent("Home.tsx");
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        const code = readOutFile(hashedJs("Home.tsx"));
        expect(code).toContain('from "https://esm.sh/react@19.2.0"');
        expect(code).toContain('from "https://esm.sh/react-dom@19.2.0/client"');
        expect(code).toContain('from "https://esm.sh/react@19.2.0/jsx-runtime"');
        expect(code).not.toContain('from "react"');
        expect(code).not.toContain('from "react-dom/client"');
        expect(code).not.toContain('from "react/jsx-runtime"');
      });

      it("maps import forms the old rewrites missed to esm.sh (issue #11)", () => {
        // side-effect import (no `from` clause) + bare react-dom (no rewrite rule):
        fs.writeFileSync(
          path.join(srcPath, "Portal.tsx"),
          `import "react";\nimport { createPortal } from "react-dom";\n` +
            `export default function Portal() {\n  return createPortal ? <div>PORTAL-MARKER</div> : <div>none</div>;\n}\n`,
          "utf8"
        );
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        const code = readOutFile(hashedJs("Portal.tsx"));
        // no bare package specifier may survive into the browser bundle:
        expect(code).not.toMatch(/["']react(-dom)?(["'/])/);
        // and bare react-dom must point at esm.sh like everything else:
        expect(code).toContain('from "https://esm.sh/react-dom@19.2.0"');
      });

      it("bundles straight from the scanned source path, without a name re-lookup (issue #7)", () => {
        writeComponent("Home.tsx");
        const spy = vi.spyOn(FileUtils, "findFileRecursive").mockReturnValue(null);
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        // paths come from the fg scan itself — findFileRecursive is never
        // consulted, so there is no name mismatch to produce a bad error
        expect(spy).not.toHaveBeenCalled();
        expect(readOutFiles()).toContain(hashedJs("Home.tsx"));
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

  describe("prerender", () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "react-srv-prerender-"));
    const srcPath = path.join(tmpRoot, "src");
    const outPath = path.join(tmpRoot, "out");

    // prerender writes its temporary .mjs files under the OS temp dir
    // (per-process folder, mirrored from index.tsx)
    const tempDir = path.join(os.tmpdir(), "react-srv", String(process.pid));
    const listDirMjs = (): string[] =>
      fs.existsSync(tempDir)
        ? fs.readdirSync(tempDir).filter((f) => f.endsWith(".mjs"))
        : [];
    const preExistingMjs = new Set(listDirMjs());
    const listTempFiles = (): string[] =>
      listDirMjs().filter((f) => !preExistingMjs.has(f));

    const writePage = (relPath: string, jsxChildren: string) => {
      const fp = path.join(srcPath, relPath);
      fs.mkdirSync(path.dirname(fp), { recursive: true });
      const name = path.basename(relPath, path.extname(relPath));
      fs.writeFileSync(
        fp,
        `import React from "react";\nexport default function ${name}(props) {\n  return <p>${jsxChildren}</p>;\n}\n`,
        "utf8"
      );
    };

    const writeFailingPage = () => {
      fs.writeFileSync(
        path.join(srcPath, "Boom.tsx"),
        `throw new Error("prerender-boom");\nexport default function Boom() {\n  return null;\n}\n`,
        "utf8"
      );
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
      // remove any temp .mjs a test left behind, so the repo stays clean even
      // while the issue #9 cleanup test is failing
      for (const f of listTempFiles()) {
        fs.rmSync(path.join(tempDir, f), { force: true });
      }
    });

    afterAll(() => {
      fs.rmSync(tmpRoot, { recursive: true, force: true });
    });

    describe("hydrate: true", () => {
      it("writes an HTML file and a hydration script per page, preserving folder structure", async () => {
        writePage("Home.tsx", "HOME-MARKER");
        writePage("pages/About.tsx", "ABOUT-MARKER");
        const srv = new ReactSrv({ srcPath, outPath });
        await srv.prerender();
        const files = readOutFiles();
        expect(files).toContain("home.html");
        expect(files).toContain(hashedJs("Home.tsx"));
        expect(files).toContain(path.join("pages", "about.html"));
        expect(files).toContain(path.join("pages", hashedJs("pages/About.tsx")));
      });

      it("renders the page into a full HTML document", async () => {
        writePage("Home.tsx", "HOME-MARKER");
        const srv = new ReactSrv({ srcPath, outPath });
        await srv.prerender();
        const html = readOutFile("home.html");
        expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
        expect(html).toContain('id="root"');
        expect(html).toContain("HOME-MARKER");
      });

      it("embeds the initial props for hydration", async () => {
        // unique component name so the temp module import isn't served from a
        // stale ESM cache entry of an earlier test
        writePage("Greeting.tsx", "{props.name}");
        const srv = new ReactSrv({ srcPath, outPath, initProps: { name: "Ada" } });
        await srv.prerender();
        const html = readOutFile("greeting.html");
        expect(html).toContain("<p>Ada</p>");
        expect(html).toContain("__INITIAL_PROPS__");
        expect(html).toContain('"name":"Ada"');
      });

      it("links the hydration script with a relative module script tag", async () => {
        writePage("Home.tsx", "HOME-MARKER");
        const srv = new ReactSrv({ srcPath, outPath });
        await srv.prerender();
        const html = readOutFile("home.html");
        expect(html).toContain('type="module"');
        expect(html).toContain(`src="./${hashedJs("Home.tsx")}"`);
      });

      it("keeps duplicate component names apart (paths)", async () => {
        writePage("a/Home.tsx", "ALPHA-MARKER");
        writePage("b/Home.tsx", "BETA-MARKER");
        const srv = new ReactSrv({ srcPath, outPath });
        await srv.prerender();
        const files = readOutFiles();
        expect(files).toContain(path.join("a", "home.html"));
        expect(files).toContain(path.join("b", "home.html"));
        expect(files).toContain(path.join("a", hashedJs("a/Home.tsx")));
        expect(files).toContain(path.join("b", hashedJs("b/Home.tsx")));
      });

      it("builds each duplicate page's hydration script from its own source file (issue #7)", async () => {
        // unique component name so this test owns its temp module URL
        writePage("a/Widget.tsx", "ALPHA-MARKER");
        writePage("b/Widget.tsx", "BETA-MARKER");
        const srv = new ReactSrv({ srcPath, outPath });
        await srv.prerender();
        // the hydration script is looked up by component name only, so both
        // files get bundled from whichever Widget.tsx is found first:
        expect(readOutFile(path.join("a", hashedJs("a/Widget.tsx")))).toContain("ALPHA-MARKER");
        expect(readOutFile(path.join("b", hashedJs("b/Widget.tsx")))).toContain("BETA-MARKER");
      });
    });

    describe("hydrate: false", () => {
      it("writes HTML but no hydration scripts", async () => {
        writePage("Home.tsx", "HOME-MARKER");
        const srv = new ReactSrv({ srcPath, outPath, hydrate: false });
        await srv.prerender();
        const files = readOutFiles();
        expect(files).toContain("home.html");
        expect(files.filter((f) => f.endsWith(".js"))).toEqual([]);
      });

      it("does not link a module script in the HTML", async () => {
        writePage("Home.tsx", "HOME-MARKER");
        const srv = new ReactSrv({ srcPath, outPath, hydrate: false });
        await srv.prerender();
        const html = readOutFile("home.html");
        expect(html).not.toContain('type="module"');
        expect(html).not.toContain("./home.js");
      });
    });

    describe("edge cases", () => {
      it("resolves and writes nothing when src has no pages", async () => {
        const srv = new ReactSrv({ srcPath, outPath });
        await srv.prerender();
        expect(readOutFiles()).toEqual([]);
      });

      it("removes its temporary module after a successful run", async () => {
        writePage("Home.tsx", "HOME-MARKER");
        const srv = new ReactSrv({ srcPath, outPath });
        await srv.prerender();
        expect(listTempFiles()).toEqual([]);
      });

      it("writes its temporary module under the OS temp dir, not next to the library", async () => {
        writePage("Home.tsx", "HOME-MARKER");
        const libDir = path.dirname(fileURLToPath(import.meta.url));
        const spy = vi.spyOn(fs, "writeFileSync");
        try {
          const srv = new ReactSrv({ srcPath, outPath });
          await srv.prerender();
          const tempWrites = spy.mock.calls
            .map(([p]) => String(p))
            .filter((p) => p.endsWith(".mjs"));
          expect(tempWrites.length).toBeGreaterThan(0);
          for (const p of tempWrites) {
            expect(p.startsWith(os.tmpdir())).toBe(true);
            expect(path.dirname(p)).not.toBe(libDir);
          }
        } finally {
          spy.mockRestore();
        }
      });

      it("writes external imports as absolute paths so the temp module resolves outside the project", async () => {
        writePage("Home.tsx", "HOME-MARKER");
        const spy = vi.spyOn(fs, "writeFileSync");
        try {
          const srv = new ReactSrv({ srcPath, outPath });
          await srv.prerender();
          const tempWrite = spy.mock.calls.find(([p]) => String(p).endsWith(".mjs"));
          expect(tempWrite).toBeDefined();
          const content = String(tempWrite![1]);
          // bare specifiers like `from "react"` cannot resolve from the OS
          // temp dir (no node_modules above it):
          expect(content).not.toMatch(/["']react(-dom)?(["'/])/);
          // they must be emitted as absolute paths instead:
          expect(content).toMatch(/from "\//);
        } finally {
          spy.mockRestore();
        }
      });

      it("picks up source changes when prerendering again in the same process (temp module cache)", async () => {
        writePage("Home.tsx", "VERSION-ONE");
        await new ReactSrv({ srcPath, outPath }).prerender();
        writePage("Home.tsx", "VERSION-TWO");
        await new ReactSrv({ srcPath, outPath }).prerender();
        expect(readOutFile("home.html")).toContain("VERSION-TWO");
      });

      it("propagates an error thrown while loading a page module", async () => {
        writeFailingPage();
        const srv = new ReactSrv({ srcPath, outPath });
        await expect(srv.prerender()).rejects.toThrow("prerender-boom");
      });

      it("removes its temporary module when loading the page fails (issue #9)", async () => {
        writeFailingPage();
        const srv = new ReactSrv({ srcPath, outPath });
        await expect(srv.prerender()).rejects.toThrow("prerender-boom");
        expect(listTempFiles()).toEqual([]);
      });
    });
  });

  describe("render", () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "react-srv-render-"));
    const srcPath = path.join(tmpRoot, "src");

    // render needs a source file on disk whose name matches the component
    // function, but only in dev mode (hydrate && !isProd)
    const writeSource = (name: string) => {
      fs.writeFileSync(
        path.join(srcPath, `${name}.tsx`),
        `import React from "react";\nexport default function ${name}(props) {\n  return <p>${name} source</p>;\n}\n`,
        "utf8"
      );
    };

    function Home() {
      return React.createElement("p", null, "HOME-CONTENT");
    }
    function Greeting(props: any) {
      return React.createElement("p", null, `Hello ${props.name}`);
    }
    function Ghost() {
      return React.createElement("p", null, "GHOST-CONTENT");
    }
    function Standalone() {
      return React.createElement("p", null, "STANDALONE-CONTENT");
    }

    beforeEach(() => {
      fs.rmSync(srcPath, { recursive: true, force: true });
      fs.mkdirSync(srcPath, { recursive: true });
      writeSource("Home");
      writeSource("Greeting");
    });

    afterAll(() => {
      fs.rmSync(tmpRoot, { recursive: true, force: true });
    });

    describe("default config (hydrate: true, isProd: false)", () => {
      it("returns a full HTML document with the component inside #root", () => {
        const srv = new ReactSrv({ srcPath });
        const html = srv.render(Home);
        expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
        expect(html).toContain('id="root"');
        expect(html).toContain("HOME-CONTENT");
        expect(html).toContain("__INITIAL_PROPS__ = {}");
      });

      it("passes props to the component and embeds them for hydration", () => {
        const srv = new ReactSrv({ srcPath });
        const html = srv.render(Greeting, { name: "Ada" });
        expect(html).toContain("Hello Ada");
        expect(html).toContain('__INITIAL_PROPS__ = {"name":"Ada"}');
      });

      it("inlines the hydration bundle as a module script", () => {
        const srv = new ReactSrv({ srcPath });
        const html = srv.render(Home);
        expect(html).toContain('type="module"');
        expect(html).toContain("hydrateRoot(");
        expect(html).toContain("__REACT_SRV_HYDRATED__");
        expect(html).toContain("https://esm.sh/react@19.2.0");
      });

      it("throws a clear error when the component has no source file", () => {
        const srv = new ReactSrv({ srcPath });
        expect(() => srv.render(Ghost)).toThrow(/could not find page component/i);
      });
    });

    describe("hydrate: false", () => {
      it("renders without a module script, even with no source file on disk", () => {
        const srv = new ReactSrv({ srcPath, hydrate: false });
        const html = srv.render(Standalone);
        expect(html).toContain("STANDALONE-CONTENT");
        expect(html).not.toContain('type="module"');
        expect(html).not.toContain("hydrateRoot(");
      });
    });

    describe("isProd: true", () => {
      it("links the public hydration path instead of inlining the bundle", () => {
        const srv = new ReactSrv({ srcPath, outPath: "./public", isProd: true });
        const html = srv.render(Home);
        expect(html).toContain('type="module"');
        expect(html).toContain(`src="/${hashedJs("Home.tsx")}"`);
        expect(html).not.toContain("hydrateRoot(");
      });
    });

    describe("hydration URL derived from outPath (issue #10)", () => {
      // Contract: outPath is declared relative to the config file and follows
      // `<docroot>/<optional subpath>`; the server mounts docroot at "/".
      // The URL is "/" + subpath + "/" + filename, so the docroot segment
      // (first segment that is not "." or "..") is dropped from the URL.
      const expectSrc = (outPath: string, expected: string) => {
        const srv = new ReactSrv({ srcPath, outPath, isProd: true });
        const html = srv.render(Home);
        expect(html).toContain(`src="${expected}"`);
      };

      it("./public/hydrate -> /hydrate/ (canonical layout)", () => {
        expectSrc("./public/hydrate", `/hydrate/${hashedJs("Home.tsx")}`);
      });

      it("public/hydrate -> /hydrate/ (no ./ prefix)", () => {
        expectSrc("public/hydrate", `/hydrate/${hashedJs("Home.tsx")}`);
      });

      it("public/hydrate/ -> /hydrate/ (trailing slash)", () => {
        expectSrc("public/hydrate/", `/hydrate/${hashedJs("Home.tsx")}`);
      });

      it("./public -> / (outPath is the docroot itself)", () => {
        expectSrc("./public", `/${hashedJs("Home.tsx")}`);
      });

      it("./build -> / (docroot folder name is irrelevant)", () => {
        expectSrc("./build", `/${hashedJs("Home.tsx")}`);
      });

      it("../public/hydrate -> /hydrate/ (leading .. dropped before the docroot)", () => {
        expectSrc("../public/hydrate", `/hydrate/${hashedJs("Home.tsx")}`);
      });

      it("../docs -> / (docs folder mounted at /)", () => {
        expectSrc("../docs", `/${hashedJs("Home.tsx")}`);
      });

      it("public\\hydrate -> /hydrate/ (backslash separators)", () => {
        expectSrc("public\\hydrate", `/hydrate/${hashedJs("Home.tsx")}`);
      });

      it("throws for an absolute outPath (docroot unknowable)", () => {
        const srv = new ReactSrv({ srcPath, outPath: "/var/www/site/public", isProd: true });
        expect(() => srv.render(Home)).toThrow(/outPath must be relative/i);
      });
    });

    describe("errors", () => {
      it("throws for a component with an empty name", () => {
        const srv = new ReactSrv({ srcPath });
        expect(() => srv.render(() => null)).toThrow(/Component.name is empty/);
      });
    });

    describe("custom Document", () => {
      it("renders the page inside the configured Document", () => {
        const CustomDocument = (props: any) =>
          React.createElement(
            "html",
            null,
            React.createElement("head", null, React.createElement("title", null, "Custom Title")),
            React.createElement("body", { "data-custom": "yes" }, props.children)
          );
        const srv = new ReactSrv({ srcPath, Document: CustomDocument });
        const html = srv.render(Home);
        expect(html).toContain("<title>Custom Title</title>");
        expect(html).toContain('data-custom="yes"');
        expect(html).toContain("HOME-CONTENT");
      });
    });
  });
});
