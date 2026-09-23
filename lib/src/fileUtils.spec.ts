import fs from "fs";
import os from "os";
import path from "path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { FileUtils } from "./index.js";

describe("FileUtils", () => {
  describe("normaliseName", () => {
    it("returns an already-lowercase word unchanged", () => {
      expect(FileUtils.normaliseName("home")).toBe("home");
    });

    it("lowercases a leading capital", () => {
      expect(FileUtils.normaliseName("Home")).toBe("home");
    });

    it("lowercases an all-caps word", () => {
      expect(FileUtils.normaliseName("HOME")).toBe("home");
    });

    it("handles an empty string", () => {
      expect(FileUtils.normaliseName("")).toBe("");
    });

    it("splits camelCase transitions with an underscore", () => {
      expect(FileUtils.normaliseName("homePage")).toBe("home_page");
    });

    it("splits PascalCase transitions with an underscore", () => {
      expect(FileUtils.normaliseName("HomePage")).toBe("home_page");
    });

    it("handles component names like HomeIco", () => {
      expect(FileUtils.normaliseName("HomeIco")).toBe("home_ico");
    });

    it("splits when a digit precedes a capital", () => {
      expect(FileUtils.normaliseName("index2Page")).toBe("index2_page");
    });

    it("splits every transition", () => {
      expect(FileUtils.normaliseName("myHomePage")).toBe("my_home_page");
    });
  });

  describe("dirExists", () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "react-srv-spec-"));

    afterAll(() => {
      fs.rmSync(tmpRoot, { recursive: true, force: true });
    });

    it("returns true for an existing directory", () => {
      expect(FileUtils.dirExists(tmpRoot)).toBe(true);
    });

    it("returns false when the path does not exist (ENOENT)", () => {
      const missing = path.join(tmpRoot, "does-not-exist");
      const result = FileUtils.dirExists(missing);
      expect(result).toBe(false);
    });

    it("returns false when the path is a file, not a directory", () => {
      const filePath = path.join(tmpRoot, "a-file.txt");
      fs.writeFileSync(filePath, "hello");
      expect(FileUtils.dirExists(filePath)).toBe(false);
    });

    it("rethrows unexpected (non-ENOENT) errors", () => {
      const eaccsError = Object.assign(new Error("EACCES: permission denied"), {
        code: "EACCES",
      });
      const spy = vi
        .spyOn(fs, "lstatSync")
        .mockImplementation(() => {
          throw eaccsError;
        });

      try {
        expect(() => FileUtils.dirExists(tmpRoot)).toThrow(eaccsError);
      } finally {
        spy.mockRestore();
      }
    });
  });

  describe("validateDir", () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "react-srv-validate-"));

    afterAll(() => {
      fs.rmSync(tmpRoot, { recursive: true, force: true });
    });

    it("returns true for an existing directory", () => {
      const result = FileUtils.validateDir(tmpRoot);
      expect(result).toBe(true);
    });

    it("throws with the exact message when the directory does not exist", () => {
      const missing = path.join(tmpRoot, "does-not-exist");
      expect(() => FileUtils.validateDir(missing)).toThrow(
        new Error(`${missing} must be a folder`),
      );
    });

    it("throws when the path is a file, not a directory", () => {
      const filePath = path.join(tmpRoot, "not-a-dir.txt");
      fs.writeFileSync(filePath, "hello");
      expect(() => FileUtils.validateDir(filePath)).toThrow(
        new Error(`${filePath} must be a folder`),
      );
    });

    it("includes the offending path in the error message", () => {
      const missing = path.join(tmpRoot, "nope");
      let message = "";
      try {
        FileUtils.validateDir(missing);
      } catch (e) {
        message = e.message;
      }
      expect(message).toContain(missing);
    });
  });

  describe("findFileRecursive", () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "react-srv-find-"));
    const srcDir = path.join(tmpRoot, "src");
    const homeFile = path.join(srcDir, "Home.tsx");
    const buttonFile = path.join(srcDir, "components", "Button.tsx");
    const pageFile = path.join(srcDir, "deep", "nested", "Page.tsx");
    const emptyDir = path.join(tmpRoot, "empty");

    beforeAll(() => {
      fs.mkdirSync(path.dirname(buttonFile), { recursive: true });
      fs.mkdirSync(path.dirname(pageFile), { recursive: true });
      fs.mkdirSync(emptyDir, { recursive: true });
      fs.writeFileSync(homeFile, "// Home");
      fs.writeFileSync(buttonFile, "// Button");
      fs.writeFileSync(pageFile, "// Page");
    });

    afterAll(() => {
      fs.rmSync(tmpRoot, { recursive: true, force: true });
    });

    it("finds a file in the root of the search directory", () => {
      expect(FileUtils.findFileRecursive(srcDir, "Home.tsx")).toBe(homeFile);
    });

    it("finds a file nested one level deep", () => {
      expect(FileUtils.findFileRecursive(srcDir, "Button.tsx")).toBe(buttonFile);
    });

    it("finds a file nested several levels deep", () => {
      expect(FileUtils.findFileRecursive(srcDir, "Page.tsx")).toBe(pageFile);
    });

    it("returns null (not undefined) when the file does not exist", () => {
      const result = FileUtils.findFileRecursive(srcDir, "DoesNotExist.tsx");
      expect(result).toBeNull();
    });

    it("returns null in an empty directory", () => {
      expect(FileUtils.findFileRecursive(emptyDir, "Home.tsx")).toBeNull();
    });

    it("matches the filename exactly: extension must match", () => {
      expect(FileUtils.findFileRecursive(srcDir, "Home.jsx")).toBeNull();
    });

    it("matches the filename exactly: case must match", () => {
      expect(FileUtils.findFileRecursive(srcDir, "home.tsx")).toBeNull();
    });
  });

  describe("formOutputFiles", () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "react-srv-form-"));
    const srcDir = path.join(tmpRoot, "src");
    const dupDir = path.join(tmpRoot, "dup-src");
    const emptyDir = path.join(tmpRoot, "empty-src");
    const outPath = "./public/hydrate";

    beforeAll(() => {
      fs.mkdirSync(path.join(srcDir, "components"), { recursive: true });
      fs.mkdirSync(path.join(srcDir, "deep", "nested"), { recursive: true });
      fs.mkdirSync(path.join(dupDir, "app"), { recursive: true });
      fs.mkdirSync(path.join(dupDir, "admin"), { recursive: true });
      fs.mkdirSync(emptyDir, { recursive: true });

      fs.writeFileSync(path.join(srcDir, "Home.tsx"), "// Home");
      fs.writeFileSync(path.join(srcDir, "HomePage.jsx"), "// HomePage");
      fs.writeFileSync(path.join(srcDir, "README.md"), "# ignored");
      fs.writeFileSync(path.join(srcDir, "components", "Button.tsx"), "// Button");
      fs.writeFileSync(path.join(srcDir, "deep", "nested", "Page.tsx"), "// Page");

      // two components with the same name in different folders
      fs.writeFileSync(path.join(dupDir, "app", "Home.tsx"), "// app/Home");
      fs.writeFileSync(path.join(dupDir, "admin", "Home.tsx"), "// admin/Home");
    });

    afterAll(() => {
      fs.rmSync(tmpRoot, { recursive: true, force: true });
    });

    it("picks up only .tsx/.jsx files", () => {
      const files = FileUtils.formOutputFiles(srcDir, outPath);
      const components = files.map((f) => f.component);
      expect(components).toHaveLength(4);
      expect(components).not.toContain("README");
    });

    it("returns absolute paths", () => {
      const files = FileUtils.formOutputFiles(srcDir, outPath);
      for (const file of files) {
        expect(path.isAbsolute(file.absPath)).toBe(true);
      }
    });

    it("sets component to the basename without extension", () => {
      const files = FileUtils.formOutputFiles(srcDir, outPath);
      const button = files.find((f) => f.component === "Button");
      expect(button).toBeDefined();
    });

    it("normalises the js/html/mjs output names", () => {
      const files = FileUtils.formOutputFiles(srcDir, outPath);
      const homePage = files.find((f) => f.component === "HomePage");
      const hash = FileUtils.pathHash("HomePage.jsx");
      expect(homePage?.name).toEqual({
        js: `home_page.${hash}.js`,
        html: "home_page.html",
        mjs: `home_page.${hash}.mjs`,
      });
    });

    it("keeps top-level files directly at outPath (flatten=false)", () => {
      const files = FileUtils.formOutputFiles(srcDir, outPath);
      const home = files.find((f) => f.component === "Home");
      expect(home?.writePath).toBe(outPath);
    });

    it("preserves folder structure for nested files (flatten=false)", () => {
      const files = FileUtils.formOutputFiles(srcDir, outPath);
      const button = files.find((f) => f.component === "Button");
      const page = files.find((f) => f.component === "Page");
      expect(button?.writePath).toBe(path.join(outPath, "components"));
      expect(page?.writePath).toBe(path.join(outPath, "deep", "nested"));
    });

    it("flattens every writePath into outPath when flatten=true", () => {
      const files = FileUtils.formOutputFiles(srcDir, outPath, true);
      expect(files.length).toBeGreaterThan(0);
      for (const file of files) {
        expect(file.writePath).toBe(outPath);
      }
    });

    it("reports relPath as the relative directory", () => {
      const files = FileUtils.formOutputFiles(srcDir, outPath);
      const home = files.find((f) => f.component === "Home");
      const button = files.find((f) => f.component === "Button");
      expect(home?.relPath).toBe(".");
      expect(button?.relPath).toBe("components");
    });

    it("returns an empty array for an empty source dir", () => {
      expect(FileUtils.formOutputFiles(emptyDir, outPath)).toEqual([]);
    });

    it("keeps duplicate component names apart when flatten=false", () => {
      const files = FileUtils.formOutputFiles(dupDir, outPath);
      const outputs = files.map((f) => path.join(f.writePath, f.name.js));
      expect(outputs).toHaveLength(2);
      expect(new Set(outputs).size).toBe(2);
    });

    // Known issue #8: prebundle() flattens, so same-named components in
    // different folders produce identical output paths and overwrite
    // each other. Expected to FAIL until #8 is fixed.
    it("keeps duplicate component names apart when flatten=true (issue #8)", () => {
      const files = FileUtils.formOutputFiles(dupDir, outPath, true);
      const outputs = files.map((f) => path.join(f.writePath, f.name.js));
      expect(outputs).toHaveLength(2);
      expect(new Set(outputs).size).toBe(2);
    });

    it("produces identical output names across calls (deterministic nonces)", () => {
      const run = () =>
        FileUtils.formOutputFiles(dupDir, outPath, true)
          .map((f) => path.join(f.writePath, f.name.js))
          .sort();
      const [first, second] = [run(), run()];
      expect(first).toEqual(second);
      expect(new Set(first).size).toBe(2);
    });
  });
});
