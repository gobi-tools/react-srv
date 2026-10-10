import fs from "fs";
import os from "os";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import React from "react";
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ReactSrv, { DefaultReactSrvConfig, FileUtils } from "./index.js";

// The React version actually installed for this package. Builds must emit CDN
// URLs pinned to *this* version, which is what keeps the markup the server
// rendered and the markup the browser hydrates on the same React build.
const installedReactVersion: string = JSON.parse(
  fs.readFileSync(createRequire(import.meta.url).resolve("react/package.json"), "utf8")
).version;

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

      it("rewrites bare react imports to esm.sh URLs pinned to the installed React", () => {
        writeComponent("Home.tsx");
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        const code = readOutFile(hashedJs("Home.tsx"));
        expect(code).toContain(`from "https://esm.sh/react@${installedReactVersion}"`);
        expect(code).toContain(`from "https://esm.sh/react-dom@${installedReactVersion}/client"`);
        expect(code).toContain(`from "https://esm.sh/react@${installedReactVersion}/jsx-runtime"`);
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
        expect(code).toContain(`from "https://esm.sh/react-dom@${installedReactVersion}"`);
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

      it("minifies the shipped hydration script (issue #15)", () => {
        // a distinctive local identifier survives unminified output verbatim;
        // minification renames it to a short symbol. The marker string is
        // asserted present so the test cannot pass by the code merely vanishing.
        fs.writeFileSync(
          path.join(srcPath, "Home.tsx"),
          `export default function Home() {\n` +
            `  const definitelyNotMinifiedPlaceholder = "used-content-marker";\n` +
            `  return <div>{definitelyNotMinifiedPlaceholder}</div>;\n` +
            `}\n`,
          "utf8"
        );
        const srv = new ReactSrv({ srcPath, outPath, minify: true });
        srv.prebundle();
        const code = readOutFile(hashedJs("Home.tsx"));
        expect(code).not.toContain("definitelyNotMinifiedPlaceholder");
        expect(code).toContain("used-content-marker");
      });

      it("extracts code shared between entries into a common chunk (issue #16)", () => {
        // three entries: Home and About both import the shared module, so its
        // code must be lifted into a chunk both reference instead of being
        // copied into every entry
        fs.writeFileSync(
          path.join(srcPath, "shared.tsx"),
          `export default function Shared() {\n  return <div>shared-module-marker-xyz</div>;\n}\n`,
          "utf8"
        );
        for (const name of ["Home", "About"]) {
          fs.writeFileSync(
            path.join(srcPath, `${name}.tsx`),
            `import Shared from "./shared";\nexport default function ${name}() {\n  return <div><Shared /></div>;\n}\n`,
            "utf8"
          );
        }
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();

        const jsFiles = readOutFiles().filter((f) => f.endsWith(".js"));
        // 3 hydration entries + at least one shared chunk
        expect(jsFiles.length).toBeGreaterThanOrEqual(4);

        const chunks = jsFiles.filter((f) => path.basename(f).startsWith("chunk-"));
        expect(chunks.length).toBeGreaterThan(0);

        // the shared module's code lives in a chunk
        const chunk = chunks.find((f) => readOutFile(f).includes("shared-module-marker-xyz"));
        expect(chunk).toBeDefined();

        // every entry references that chunk instead of carrying the code itself,
        // and the reference resolves to a file that actually exists
        const entries = jsFiles.filter((f) => !path.basename(f).startsWith("chunk-"));
        expect(entries).toHaveLength(3);
        for (const entry of entries) {
          const code = readOutFile(entry);
          expect(code).not.toContain("shared-module-marker-xyz");
          const spec = code.match(/["'](\.{1,2}\/[^"']*chunk-[^"']*)["']/)?.[1];
          expect(spec).toBeTruthy();
          expect(fs.existsSync(path.join(outPath, spec!))).toBe(true);
        }

        // the temp wrappers that drove the build are cleaned up afterwards
        const tempRoot = path.join(os.tmpdir(), "react-srv", String(process.pid));
        const leftovers = fs.existsSync(tempRoot)
          ? fs.readdirSync(tempRoot).filter((d) => d.startsWith("wrappers"))
          : [];
        expect(leftovers).toEqual([]);
      });

      it("emits no shared chunks when splitting is disabled", () => {
        // same shared-module setup as the issue #16 test, but with the opt-out:
        // entries must be self-contained and no chunk-* file may exist
        fs.writeFileSync(
          path.join(srcPath, "shared.tsx"),
          `export default function Shared() {\n  return <div>shared-module-marker-xyz</div>;\n}\n`,
          "utf8"
        );
        for (const name of ["Home", "About"]) {
          fs.writeFileSync(
            path.join(srcPath, `${name}.tsx`),
            `import Shared from "./shared";\nexport default function ${name}() {\n  return <div><Shared /></div>;\n}\n`,
            "utf8"
          );
        }
        const srv = new ReactSrv({ srcPath, outPath, splitting: false });
        srv.prebundle();

        const jsFiles = readOutFiles().filter((f) => f.endsWith(".js"));
        const chunks = jsFiles.filter((f) => path.basename(f).startsWith("chunk-"));
        expect(chunks).toHaveLength(0);

        // exactly the entries, each carrying its own copy of the shared code
        expect(jsFiles).toHaveLength(3);
        for (const entry of jsFiles) {
          const code = readOutFile(entry);
          expect(code).not.toMatch(/["']\.{1,2}\/[^"']*chunk-[^"']*["']/);
        }
        expect(readOutFile(hashedJs("Home.tsx"))).toContain("shared-module-marker-xyz");
        expect(readOutFile(hashedJs("About.tsx"))).toContain("shared-module-marker-xyz");
      });

      it("does not write chunks that no entry imports (issue: unreferenced dynamic import targets)", async () => {
        // a package whose entry re-exports an async variant: the re-export is
        // unused and gets tree-shaken, but esbuild still emits a chunk for the
        // variant's dynamic import() target — referenced by nothing
        const pkgDir = path.join(tmpRoot, "node_modules", "fake-hljs");
        fs.mkdirSync(pkgDir, { recursive: true });
        fs.writeFileSync(
          path.join(pkgDir, "package.json"),
          JSON.stringify({ name: "fake-hljs", version: "1.0.0", main: "index.js", sideEffects: false }),
          "utf8"
        );
        fs.writeFileSync(path.join(pkgDir, "index.js"), `export { default as Async } from "./async.js";\nexport { default } from "./sync.js";\n`, "utf8");
        fs.writeFileSync(path.join(pkgDir, "sync.js"), `export default "SYNC-MARKER";\n`, "utf8");
        fs.writeFileSync(path.join(pkgDir, "async.js"), `export default function Async(lang) {\n  return import("./lang.js");\n}\n`, "utf8");
        fs.writeFileSync(path.join(pkgDir, "lang.js"), `export default "LANG-MARKER";\n`, "utf8");
        fs.writeFileSync(
          path.join(srcPath, "Home.tsx"),
          `import HL from "fake-hljs";\nexport default function Home() {\n  return <div>{String(HL)}</div>;\n}\n`,
          "utf8"
        );

        const logSpy = vi.spyOn(console, "log");
        const srv = new ReactSrv({ srcPath, outPath });
        await srv.prebundle();

        // the code the entry actually uses ships as usual
        expect(readOutFile(hashedJs("Home.tsx"))).toContain("SYNC-MARKER");

        // the dead module's import() was dropped by the second pass, so the
        // target stops asking for a chunk of its own
        expect(
          logSpy.mock.calls.some(([msg]) => typeof msg === "string" && /dead dynamic import\(\) call/.test(msg))
        ).toBe(true);

        // the dead dynamic import() target is skipped instead of written
        const chunks = readOutFiles().filter((f) => path.basename(f).startsWith("chunk-"));
        expect(chunks).toEqual([]);
        expect(readOutFiles().some((f) => readOutFile(f).includes("LANG-MARKER"))).toBe(false);
        expect(
          logSpy.mock.calls.some(([msg]) => typeof msg === "string" && /Skipped \d+ unreferenced chunk/.test(msg))
        ).toBe(true);
      });

      it("merges code that one-chunk-per-target splitting had torn apart (dead import() calls)", async () => {
        // mirrors react-syntax-highlighter: a package entry re-exports an async
        // variant nobody imports, and that variant holds one import() per
        // language, so esbuild isolates every target in a chunk of its own —
        // even though the very same modules are also required (statically) by
        // the sync half of the package that the app does use
        const pkgDir = path.join(tmpRoot, "node_modules", "fake-langs");
        fs.mkdirSync(pkgDir, { recursive: true });
        fs.writeFileSync(
          path.join(pkgDir, "package.json"),
          JSON.stringify({ name: "fake-langs", version: "1.0.0", main: "entry.js", sideEffects: false }),
          "utf8"
        );

        const LANGS = 6;
        for (let i = 0; i < LANGS; i++) {
          fs.writeFileSync(path.join(pkgDir, `lang${i}.js`), `module.exports = "LANG-${i}-MARKER";\n`, "utf8");
        }
        fs.writeFileSync(
          path.join(pkgDir, "index.js"),
          Array.from({ length: LANGS }, (_, i) => `const l${i} = require("./lang${i}.js");`).join("\n") +
            `\nmodule.exports = "SYNC-MARKER " + [${Array.from({ length: LANGS }, (_, i) => `l${i}`).join(",")}].join(" ");\n`,
          "utf8"
        );
        fs.writeFileSync(
          path.join(pkgDir, "async.js"),
          `export default {\n` +
            Array.from({ length: LANGS }, (_, i) => `  l${i}: () => import("./lang${i}.js"),`).join("\n") +
            `\n};\n`,
          "utf8"
        );
        fs.writeFileSync(
          path.join(pkgDir, "entry.js"),
          `export { default as Async } from "./async.js";\nexport { default } from "./index.js";\n`,
          "utf8"
        );
        for (const name of ["Home", "About"]) {
          fs.writeFileSync(
            path.join(srcPath, `${name}.tsx`),
            `import HL from "fake-langs";\nexport default function ${name}() {\n  return <div>{String(HL)}</div>;\n}\n`,
            "utf8"
          );
        }

        const logSpy = vi.spyOn(console, "log");
        await new ReactSrv({ srcPath, outPath }).prebundle();

        // pass 2 ran: the dead import() calls were dropped before chunking
        expect(
          logSpy.mock.calls.some(([msg]) => typeof msg === "string" && /dead dynamic import\(\) call/.test(msg))
        ).toBe(true);

        const jsFiles = readOutFiles().filter((f) => f.endsWith(".js"));
        const chunks = jsFiles.filter((f) => path.basename(f).startsWith("chunk-"));
        // the first pass alone isolates each dynamic target: one chunk per
        // language; after the consolidation the languages share a single chunk
        expect(chunks.length).toBeLessThan(LANGS);

        // nothing was lost by rebuilding: every language still ships
        const all = jsFiles.map((f) => readOutFile(f)).join("\n");
        expect(all).toContain("SYNC-MARKER");
        for (let i = 0; i < LANGS; i++) {
          expect(all).toContain(`LANG-${i}-MARKER`);
        }

        // and every reference between the shipped files resolves
        const spec = /["'](\.{1,2}\/[^"']*chunk-[^"']*)["']/g;
        for (const entry of jsFiles.filter((f) => !path.basename(f).startsWith("chunk-"))) {
          for (const [, rel] of readOutFile(entry).matchAll(spec)) {
            expect(fs.existsSync(path.join(path.dirname(path.join(outPath, entry)), rel!))).toBe(true);
          }
        }
      });

      it("still chunks an import() the app really performs, while pass 2 runs", async () => {
        // pass 2 only rewrites import() calls that sit in modules the first
        // pass proved dead; a live one must keep its own chunk, or lazy
        // loading would silently stop code splitting
        const pkgDir = path.join(tmpRoot, "node_modules", "fake-langs");
        fs.mkdirSync(pkgDir, { recursive: true });
        fs.writeFileSync(
          path.join(pkgDir, "package.json"),
          JSON.stringify({ name: "fake-langs", version: "1.0.0", main: "entry.js", sideEffects: false }),
          "utf8"
        );
        fs.writeFileSync(path.join(pkgDir, "index.js"), `module.exports = "SYNC-MARKER";\n`, "utf8");
        fs.writeFileSync(path.join(pkgDir, "async.js"), `export default () => import("./unused.js");\n`, "utf8");
        fs.writeFileSync(path.join(pkgDir, "unused.js"), `module.exports = "UNUSED-MARKER";\n`, "utf8");
        fs.writeFileSync(
          path.join(pkgDir, "entry.js"),
          `export { default as Async } from "./async.js";\nexport { default } from "./index.js";\n`,
          "utf8"
        );

        // outside srcPath on purpose: pages under src are entries of their own,
        // this one can only reach the browser as a dynamic import target
        const lazyDir = path.join(tmpRoot, "extra");
        fs.mkdirSync(lazyDir, { recursive: true });
        fs.writeFileSync(path.join(lazyDir, "Lazy.jsx"), `export default function Lazy() {\n  return <div>LAZY-MARKER</div>;\n}\n`, "utf8");
        fs.writeFileSync(
          path.join(srcPath, "Home.tsx"),
          `import HL from "fake-langs";\n` +
            `export default function Home() {\n` +
            `  const load = () => import("../extra/Lazy");\n` +
            `  return <div onClick={load}>{String(HL)}</div>;\n` +
            `}\n`,
          "utf8"
        );

        const logSpy = vi.spyOn(console, "log");
        await new ReactSrv({ srcPath, outPath }).prebundle();
        expect(
          logSpy.mock.calls.some(([msg]) => typeof msg === "string" && /dead dynamic import\(\) call/.test(msg))
        ).toBe(true);

        const entry = readOutFile(hashedJs("Home.tsx"));
        expect(entry).toContain("SYNC-MARKER");

        // the dead chain's target is gone...
        expect(readOutFiles().some((f) => readOutFile(f).includes("UNUSED-MARKER"))).toBe(false);

        // ...but the live import() still resolves to a shipped chunk
        const chunks = readOutFiles().filter((f) => path.basename(f).startsWith("chunk-"));
        const lazyChunk = chunks.find((f) => readOutFile(f).includes("LAZY-MARKER"));
        expect(lazyChunk).toBeDefined();
        expect(entry).toContain(path.basename(lazyChunk!));
      });

      it("preserves component function names when minifying, by default", () => {
        // minification renames declarations, so user code that reflects on
        // Function.prototype.name (e.g. deriving route slugs from components)
        // breaks unless keepNames restores the original name at runtime —
        // which is why keepNames defaults to true
        fs.writeFileSync(
          path.join(srcPath, "Home.tsx"),
          `export default function PreservedNameMarkerComponent() {\n` +
            `  return <div>used-content-marker</div>;\n` +
            `}\n`,
          "utf8"
        );

        // default: the original name survives minification
        const defaultSrv = new ReactSrv({ srcPath, outPath, minify: true });
        defaultSrv.prebundle();
        expect(readOutFile(hashedJs("Home.tsx"))).toContain("PreservedNameMarkerComponent");

        // explicit opt-out: the name is mangled away
        const optOutSrv = new ReactSrv({ srcPath, outPath, minify: true, keepNames: false });
        optOutSrv.prebundle();
        expect(readOutFile(hashedJs("Home.tsx"))).not.toContain("PreservedNameMarkerComponent");
      });

      it("does not inject the keepNames helper into unminified bundles", () => {
        // keepNames is only meaningful under minification; when minify is off
        // esbuild would still emit a __name helper that can never do anything,
        // so the option must not apply to unminified output
        fs.writeFileSync(
          path.join(srcPath, "Home.tsx"),
          `export default function Home() {\n  return <div>used-content-marker</div>;\n}\n`,
          "utf8"
        );
        const srv = new ReactSrv({ srcPath, outPath });
        srv.prebundle();
        expect(readOutFile(hashedJs("Home.tsx"))).not.toContain("__name");
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

      it("resolves shared chunks from nested hydration entries (issue #16)", async () => {
        // two nested pages share one module — if the chunk sits outside their
        // folder, their relative import must still resolve from the entry's
        // own directory (React import mirrors the writePage convention: the
        // prerender node build uses the classic JSX transform)
        fs.writeFileSync(
          path.join(srcPath, "shared.tsx"),
          `import React from "react";\nexport default function Shared() {\n  return <div>shared-module-marker-xyz</div>;\n}\n`,
          "utf8"
        );
        for (const name of ["Home", "About"]) {
          const fp = path.join(srcPath, "pages", `${name}.tsx`);
          fs.mkdirSync(path.dirname(fp), { recursive: true });
          fs.writeFileSync(
            fp,
            `import React from "react";\nimport Shared from "../shared";\nexport default function ${name}() {\n  return <div><Shared /></div>;\n}\n`,
            "utf8"
          );
        }
        const srv = new ReactSrv({ srcPath, outPath });
        await srv.prerender();

        const entries = [
          path.join("pages", hashedJs("pages/Home.tsx")),
          path.join("pages", hashedJs("pages/About.tsx")),
        ];
        for (const entry of entries) {
          const code = readOutFile(entry);
          expect(code).not.toContain("shared-module-marker-xyz");
          const spec = code.match(/["'](\.{1,2}\/[^"']*chunk-[^"']*)["']/)?.[1];
          expect(spec).toBeTruthy();
          // resolve the specifier relative to the entry's own directory
          expect(fs.existsSync(path.resolve(outPath, path.dirname(entry), spec!))).toBe(true);
        }

        // ...and the shared code really does live in a chunk
        const chunkWithCode = readOutFiles()
          .filter((f) => path.basename(f).startsWith("chunk-"))
          .find((f) => readOutFile(f).includes("shared-module-marker-xyz"));
        expect(chunkWithCode).toBeDefined();
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
        expect(html).toContain(`https://esm.sh/react@${installedReactVersion}`);
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

describe("FileUtils.reachableOutputs", () => {
  it("returns null when none of the expected entry outputs are in the metafile", () => {
    // without a known root there is nothing to compute reachability from, so
    // pruning must fall back to writing everything instead of pruning it all
    const metafile = {
      outputs: {
        "chunk-a.js": { entryPoint: "node_modules/pkg/lang.js", imports: [], bytes: 0 },
      },
    } as any;
    expect(FileUtils.reachableOutputs(metafile, ["/tmp/wrappers/Home.js"])).toBeNull();
  });

  it("follows the import graph from the build's entries and ignores externals", () => {
    const entry = path.join(os.tmpdir(), "react-srv-wrapper.js");
    const metafile = {
      outputs: {
        [entry]: {
          entryPoint: entry,
          imports: [
            { path: "chunk-live.js", kind: "import-statement" },
            { path: "https://esm.sh/react@19.3.0", kind: "import-statement", external: true },
          ],
        },
        "chunk-live.js": { imports: [{ path: "chunk-deep.js", kind: "import-statement" }] },
        "chunk-deep.js": { imports: [] },
        "chunk-dead.js": { entryPoint: "node_modules/pkg/lang.js", imports: [] },
      },
    } as any;

    const reachable = FileUtils.reachableOutputs(metafile, [entry])!;
    expect(reachable.has(path.resolve(entry))).toBe(true);
    expect(reachable.has(path.resolve("chunk-live.js"))).toBe(true);
    expect(reachable.has(path.resolve("chunk-deep.js"))).toBe(true);
    // only reachable from a dynamic target nobody imports anymore
    expect(reachable.has(path.resolve("chunk-dead.js"))).toBe(false);
  });
});

describe("FileUtils.deadDynamicImporters", () => {
  it("returns the inputs that produced no output and hold a dynamic import()", () => {
    const metafile = {
      inputs: {
        // used, but no import() to give away
        "node_modules/pkg/index.js": { bytes: 1, imports: [{ path: "node_modules/pkg/lang.js", kind: "require-call" }] },
        // used, and does lazy-load: pass 2 must leave it alone
        "node_modules/pkg/live.js": { bytes: 1, imports: [{ path: "node_modules/pkg/heavy.js", kind: "dynamic-import" }] },
        // dead, and its import() is what forces a chunk per target
        "node_modules/pkg/async.js": { bytes: 1, imports: [{ path: "node_modules/pkg/lang.js", kind: "dynamic-import" }] },
        // dead, but static: it never asked esbuild for a chunk, so it is
        // irrelevant to pass 2 even though it is dead
        "node_modules/pkg/unused.js": { bytes: 1, imports: [] },
      },
      outputs: {
        "entry.js": { bytes: 1, inputs: { "node_modules/pkg/index.js": { bytesInOutput: 1 }, "node_modules/pkg/live.js": { bytesInOutput: 1 } } },
      },
    } as any;

    expect(FileUtils.deadDynamicImporters(metafile, "/app")).toEqual([
      path.resolve("/app", "node_modules/pkg/async.js"),
    ]);
  });

  it("falls back to a single pass when the build produced no metafile", () => {
    expect(FileUtils.deadDynamicImporters(undefined, "/app")).toEqual([]);
  });
});

describe("DefaultReactSrvConfig.reactVersion", () => {
  // Pinning the CDN to the installed version is what keeps the server-rendered
  // markup and the browser's hydration on the same React build, and keeps the
  // CDN URLs immutable so they can be cached indefinitely.
  it("defaults to the locally installed React version, not 'latest'", () => {
    expect(DefaultReactSrvConfig.reactVersion).toBe(installedReactVersion);
    expect(DefaultReactSrvConfig.reactVersion).not.toBe("latest");
  });

  it("still honours an explicit override", () => {
    const srv = new ReactSrv({
      srcPath: path.dirname(fileURLToPath(import.meta.url)),
      reactVersion: "18.3.0",
    });
    expect((srv as any).config.reactVersion).toBe("18.3.0");
  });
});
