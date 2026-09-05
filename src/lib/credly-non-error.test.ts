import assert from "node:assert/strict";
import test from "node:test";

import { loadCertifications } from "./credly.ts";

test("loadCertifications reports non-Error failures before using the snapshot", async () => {
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  let warned = "";

  globalThis.fetch = (async () => Promise.reject("connection closed")) as typeof fetch;
  console.warn = ((message: unknown) => {
    warned = String(message);
  }) as typeof console.warn;

  try {
    const groups = await loadCertifications("vmstan", []);
    assert.equal(groups.source, "snapshot");
    assert.match(warned, /connection closed/);
  } finally {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
  }
});
