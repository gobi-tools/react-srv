import { describe, expect, it } from "vitest";
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
});
