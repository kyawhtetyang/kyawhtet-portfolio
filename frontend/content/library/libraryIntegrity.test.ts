import { describe, expect, it } from "vitest";
import { PHOTO_LINKS } from "./photoLinks";
import { PHOTO_METADATA } from "./photoMetadata";

describe("library registry integrity", () => {
  it("only maps study links to known library items", () => {
    expect(Object.keys(PHOTO_LINKS).every((key) => key in PHOTO_METADATA)).toBe(true);
  });

  it("contains valid HTTP study links", () => {
    expect(Object.values(PHOTO_LINKS).every((url) => /^https?:\/\//.test(url))).toBe(true);
  });
});
