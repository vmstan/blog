import assert from "node:assert/strict";
import test from "node:test";

import { loadCertifications } from "./credly.ts";

// Runs in its own process (like every test file under node --test), so the
// module-level cache starts pristine here. The fallback path lives in
// credly.test.ts for the same reason: one cache lifecycle per file.
function badge(id: string) {
  return {
    id,
    issued_at_date: "2026-01-01",
    expires_at_date: null,
    badge_template: {
      name: `VMware Certified Professional - ${id}`,
      issuer: { entities: [{ entity: { name: "Broadcom" } }] },
    },
  };
}

test("loadCertifications uses live badges and fetches only once", async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return Response.json({
      data: [badge("live-badge")],
      metadata: { total_pages: 1 },
    });
  }) as typeof fetch;

  try {
    const first = await loadCertifications("vmstan", []);
    const second = await loadCertifications("vmstan", []);

    assert.equal(calls, 1);
    assert.equal(first.source, "credly");
    assert.equal(second, first);
    assert.equal(
      first.active[0]?.badgeUrl,
      "https://www.credly.com/badges/live-badge",
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
