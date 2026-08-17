import assert from "node:assert/strict";
import test from "node:test";

import { fetchCredlyBadges } from "./credly.ts";

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

test("fetchCredlyBadges combines every response page", async () => {
  const requestedUrls: string[] = [];
  const fetcher: typeof fetch = async (input) => {
    const url = String(input);
    const page = new URL(url).searchParams.get("page");
    requestedUrls.push(url);

    return Response.json({
      data: [badge(`page-${page}`)],
      metadata: {
        current_page: Number(page),
        total_pages: 2,
      },
    });
  };

  const badges = await fetchCredlyBadges("vmstan", fetcher);

  assert.deepEqual(
    badges.map(({ id }) => id),
    ["page-1", "page-2"],
  );
  assert.deepEqual(requestedUrls, [
    "https://www.credly.com/users/vmstan/badges?sort=-state_updated_at&page=1",
    "https://www.credly.com/users/vmstan/badges?sort=-state_updated_at&page=2",
  ]);
});

test("fetchCredlyBadges rejects an invalid page count", async () => {
  const fetcher: typeof fetch = async () =>
    Response.json({
      data: [badge("invalid-pages")],
      metadata: { current_page: 1, total_pages: 0 },
    });

  await assert.rejects(
    fetchCredlyBadges("vmstan", fetcher),
    /invalid page count/,
  );
});
