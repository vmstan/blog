import assert from "node:assert/strict";
import test from "node:test";

import { calculateAge, updateAge } from "../public/js/whois-age.js";

test("whois age changes exactly on the birthday", () => {
  assert.equal(calculateAge("1983-11-09", new Date(2026, 10, 8)), 42);
  assert.equal(calculateAge("1983-11-09", new Date(2026, 10, 9)), 43);
  assert.equal(calculateAge("1983-11-09", new Date(2026, 11, 1)), 43);
});

test("whois age enhances the server-rendered value when the DOM is present", () => {
  const element = { dataset: { birthDate: "1983-11-09" }, textContent: "server value" };
  updateAge({ querySelector: () => element }, new Date(2026, 10, 9));
  assert.equal(element.textContent, "43");
});

test("whois age preserves the server value when data is absent", () => {
  const element = { dataset: {}, textContent: "server value" };
  updateAge({ querySelector: () => element }, new Date(2026, 0, 1));
  updateAge({ querySelector: () => null }, new Date(2026, 0, 1));
  assert.equal(element.textContent, "server value");
});
