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
});
