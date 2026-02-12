import { RollbarUtils } from "../src/utils/rollbar";
import { expect } from "chai";

describe("RollbarUtils", () => {
  describe("checkIgnore", () => {
    it("should ignore string messages in ignore list", () => {
      const result = RollbarUtils.checkIgnore(false, ["Script error"], {});
      expect(result).to.be.true;
    });

    it("should ignore object messages that serialize to ignore list strings", () => {
      const result = RollbarUtils.checkIgnore(false, [{ isTrusted: true }], {});
      expect(result).to.be.true;
    });

    it("should ignore error objects with message property in ignore list", () => {
      const result = RollbarUtils.checkIgnore(false, [{ message: "Failed to fetch" }], {});
      expect(result).to.be.true;
    });

    it("should not ignore messages not in the list", () => {
      const result = RollbarUtils.checkIgnore(false, ["Some other error"], {});
      expect(result).to.be.false;
    });

    it("should not ignore objects that don't serialize to ignore list strings", () => {
      const result = RollbarUtils.checkIgnore(false, [{ someField: "value" }], {});
      expect(result).to.be.false;
    });
  });
});
