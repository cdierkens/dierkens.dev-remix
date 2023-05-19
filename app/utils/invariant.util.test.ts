import { describe, expect, it } from "vitest";
import { invariant } from "./invariant.util";

describe("invariant", () => {
  it("should not throw if the condition is truthy", () => {
    expect(() => invariant(true, "No error")).to.not.throw();
  });

  it("should  throw if the condition is falsy", () => {
    expect(() => invariant(false, "Expected Error")).to.throw("Expected Error");
  });
});
