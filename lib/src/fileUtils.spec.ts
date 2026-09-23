import fs from "fs";
import os from "os";
import path from "path";
import { afterAll, describe, expect, it, vi } from "vitest";
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
});
