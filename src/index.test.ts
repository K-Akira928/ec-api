import { hello } from "./index.ts";

describe("hello", () => {
  it("returns hello world!!", () => {
    expect(hello()).toBe("hello world!!");
  });
});
