import { describe, expect, it } from "vitest";
import { add, multiply } from "@/lib/math";

describe("math utils", () => {
  it("adds numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("mutilplies numbers", () => {
    expect(multiply(3, 4)).toBe(12);
  });
});
