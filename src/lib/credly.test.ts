import assert from "node:assert/strict";
import test from "node:test";

import {
  credlyBadgesUrl,
  fetchCredlyBadges,
  groupByFamily,
  groupCertifications,
  loadCertifications,
  pickCredlyBadges,
  type Certification,
  type CredlyBadge,
  type ManualCertification,
} from "./credly.ts";

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

test("credlyBadgesUrl builds the default first-page URL", () => {
  assert.equal(
    credlyBadgesUrl("vmstan"),
    "https://www.credly.com/users/vmstan/badges?sort=-state_updated_at&page=1",
  );
});

test("credlyBadgesUrl builds a given page URL", () => {
  assert.equal(
    credlyBadgesUrl("vmstan", 3),
    "https://www.credly.com/users/vmstan/badges?sort=-state_updated_at&page=3",
  );
});

test("pickCredlyBadges reduces the API payload to rendered fields", () => {
  assert.deepEqual(pickCredlyBadges({ data: [badge("picked")] }), [
    {
      id: "picked",
      name: "VMware Certified Professional - picked",
      issuer: "Broadcom",
      issuedOn: "2026-01-01",
      expiresOn: null,
    },
  ]);
});

test("pickCredlyBadges tolerates a missing issuer entity", () => {
  const entry = badge("no-issuer");
  entry.badge_template.issuer.entities = [];

  const [picked] = pickCredlyBadges({ data: [entry] });

  assert.equal(picked?.issuer, "");
});

test("pickCredlyBadges rejects a payload without a badge array", () => {
  assert.throws(() => pickCredlyBadges({}), /did not contain a badge array/);
  assert.throws(
    () => pickCredlyBadges({ data: "not-an-array" }),
    /did not contain a badge array/,
  );
});

test("fetchCredlyBadges requests a single page when metadata is absent", async () => {
  const requestedUrls: string[] = [];
  const fetcher = (async (input: unknown) => {
    requestedUrls.push(String(input));
    return Response.json({ data: [badge("only")] });
  }) as typeof fetch;

  const badges = await fetchCredlyBadges("vmstan", fetcher);

  assert.deepEqual(
    badges.map(({ id }) => id),
    ["only"],
  );
  assert.equal(requestedUrls.length, 1);
});

test("fetchCredlyBadges rejects a non-ok response", async () => {
  const fetcher = (async () =>
    new Response("error", { status: 500 })) as typeof fetch;

  await assert.rejects(
    fetchCredlyBadges("vmstan", fetcher),
    /Credly page 1 responded with 500/,
  );
});

test("fetchCredlyBadges rejects every invalid page count shape", async () => {
  for (const total_pages of [0, -1, 1.5, "2", null]) {
    const fetcher = (async () =>
      Response.json({
        data: [badge("bad-pages")],
        metadata: { current_page: 1, total_pages },
      })) as typeof fetch;

    await assert.rejects(
      fetchCredlyBadges("vmstan", fetcher),
      /invalid page count/,
      `total_pages=${JSON.stringify(total_pages)}`,
    );
  }
});

test("fetchCredlyBadges rejects a payload without badges", async () => {
  const fetcher = (async () =>
    Response.json({ metadata: { total_pages: 1 } })) as typeof fetch;

  await assert.rejects(
    fetchCredlyBadges("vmstan", fetcher),
    /did not contain a badge array/,
  );
});

test("fetchCredlyBadges sends a JSON accept header", async () => {
  let headers: unknown;
  const fetcher = (async (_input: unknown, init?: unknown) => {
    headers = (init as { headers?: unknown }).headers;
    return Response.json({ data: [], metadata: { total_pages: 1 } });
  }) as typeof fetch;

  await fetchCredlyBadges("vmstan", fetcher);

  assert.deepEqual(headers, { Accept: "application/json" });
});

function certBadge(overrides: Partial<CredlyBadge> = {}): CredlyBadge {
  return {
    id: "badge-id",
    name: "VMware Certified Professional - Data Center Virtualization",
    issuer: "Broadcom",
    issuedOn: "2024-01-01",
    expiresOn: null,
    ...overrides,
  };
}

const AS_OF = new Date("2026-06-15T12:00:00Z");

function parsed(
  groups: ReturnType<typeof groupCertifications>,
): [string, string | null, string | null, string | null][] {
  return groups.active.map(({ name, track, version, abbreviation }) => [
    name,
    track,
    version,
    abbreviation,
  ]);
}

test("groupCertifications keeps only certification badges", () => {
  const groups = groupCertifications(
    [
      certBadge({ id: "vcp", issuer: "VMware" }),
      certBadge({
        id: "ccna",
        name: "Cisco Certified Network Associate - Enterprise",
        issuer: "Cisco",
      }),
      certBadge({ id: "reissue", issuer: "Broadcom" }),
      certBadge({ id: "achievement", name: "Double VCP" }),
      certBadge({ id: "other-issuer", issuer: "Microsoft" }),
      certBadge({ id: "other-name", name: "AWS Certified Pro" }),
    ],
    [],
    "credly",
    AS_OF,
  );

  assert.deepEqual(
    groups.active.map(({ badgeUrl }) => badgeUrl),
    [
      "https://www.credly.com/badges/vcp",
      "https://www.credly.com/badges/ccna",
      "https://www.credly.com/badges/reissue",
    ],
  );
  assert.deepEqual(groups.expired, []);
});

test("groupCertifications splits old-style generations off the family", () => {
  const groups = groupCertifications(
    [
      certBadge({
        name: "VMware Certified Professional 6.5 - Data Center Virtualization",
      }),
    ],
    [],
    "credly",
    AS_OF,
  );

  assert.deepEqual(parsed(groups), [
    [
      "VMware Certified Professional",
      "Data Center Virtualization",
      "6.5",
      "VCP",
    ],
  ]);
});

test("groupCertifications keeps new-style years on the track", () => {
  const groups = groupCertifications(
    [
      certBadge({
        name: "VMware Certified Professional - Data Center Virtualization 2024",
      }),
    ],
    [],
    "credly",
    AS_OF,
  );

  assert.deepEqual(parsed(groups), [
    [
      "VMware Certified Professional",
      "Data Center Virtualization 2024",
      null,
      "VCP",
    ],
  ]);
});

test("groupCertifications strips trailing parentheticals", () => {
  const groups = groupCertifications(
    [
      certBadge({
        name: "VMware Certified Professional - Data Center Virtualization (VCP-DCV)",
      }),
    ],
    [],
    "credly",
    AS_OF,
  );

  assert.deepEqual(parsed(groups), [
    ["VMware Certified Professional", "Data Center Virtualization", null, "VCP"],
  ]);
});

test("groupCertifications splits Cisco run-on names", () => {
  const groups = groupCertifications(
    [
      certBadge({
        name: "Cisco Certified Network Associate Data Center",
        issuer: "Cisco",
      }),
    ],
    [],
    "credly",
    AS_OF,
  );

  assert.deepEqual(parsed(groups), [
    ["Cisco Certified Network Associate", "Data Center", null, "CCNA"],
  ]);
});

test("groupCertifications handles trackless and unknown certifications", () => {
  const groups = groupCertifications(
    [
      certBadge({ name: "VMware Certified Associate" }),
      certBadge({ name: "VMware Certified Specialist - Cloud" }),
      certBadge({
        name: "VMware Certified Professional – Network Virtualization",
      }),
    ],
    [],
    "credly",
    AS_OF,
  );

  assert.deepEqual(parsed(groups), [
    ["VMware Certified Associate", null, null, "VCA"],
    ["VMware Certified Specialist", "Cloud", null, null],
    [
      "VMware Certified Professional",
      "Network Virtualization",
      null,
      "VCP",
    ],
  ]);
});

test("groupCertifications maps every abbreviation tier", () => {
  const groups = groupCertifications(
    [
      certBadge({ name: "VMware Certified Implementation Expert - Design" }),
      certBadge({
        name: "VMware Certified Advanced Professional - Design 2023",
      }),
      certBadge({ name: "VMware Certified Technical Associate - DCV" }),
    ],
    [],
    "credly",
    AS_OF,
  );

  assert.deepEqual(
    groups.active.map(({ abbreviation }) => abbreviation),
    ["VCIX", "VCAP", "VCTA"],
  );
});

test("groupCertifications expires badges at the end of their expiry day", () => {
  const groups = groupCertifications(
    [
      certBadge({ id: "today", expiresOn: "2026-06-15" }),
      certBadge({ id: "yesterday", expiresOn: "2026-06-14" }),
      certBadge({ id: "never", expiresOn: null }),
    ],
    [],
    "credly",
    AS_OF,
  );

  assert.deepEqual(
    groups.active.map(({ badgeUrl }) => badgeUrl),
    [
      "https://www.credly.com/badges/today",
      "https://www.credly.com/badges/never",
    ],
  );
  assert.deepEqual(
    groups.expired.map(({ badgeUrl }) => badgeUrl),
    ["https://www.credly.com/badges/yesterday"],
  );
});

test("groupCertifications sorts active newest-first", () => {
  const groups = groupCertifications(
    [
      certBadge({ id: "old", issuedOn: "2022-01-01" }),
      certBadge({ id: "new", issuedOn: "2024-01-01" }),
    ],
    [],
    "credly",
    AS_OF,
  );

  assert.deepEqual(
    groups.active.map(({ badgeUrl }) => badgeUrl),
    [
      "https://www.credly.com/badges/new",
      "https://www.credly.com/badges/old",
    ],
  );
});

test("groupCertifications sorts expired by expiry, breaking ties by earned date", () => {
  const groups = groupCertifications(
    [
      certBadge({
        id: "early-earn",
        issuedOn: "2020-01-01",
        expiresOn: "2022-01-01",
      }),
      certBadge({
        id: "late-earn",
        issuedOn: "2021-01-01",
        expiresOn: "2022-01-01",
      }),
      certBadge({
        id: "later-expiry",
        issuedOn: "2019-01-01",
        expiresOn: "2023-01-01",
      }),
    ],
    [],
    "credly",
    AS_OF,
  );

  assert.deepEqual(
    groups.expired.map(({ badgeUrl }) => badgeUrl),
    [
      "https://www.credly.com/badges/later-expiry",
      "https://www.credly.com/badges/late-earn",
      "https://www.credly.com/badges/early-earn",
    ],
  );
});

test("groupCertifications reports the earliest year and source", () => {
  const groups = groupCertifications(
    [
      certBadge({ issuedOn: "2024-05-01" }),
      certBadge({ issuedOn: "2020-03-01" }),
    ],
    [],
    "snapshot",
    AS_OF,
  );

  assert.equal(groups.earliestYear, 2020);
  assert.equal(groups.source, "snapshot");
});

test("groupCertifications leaves manual entries unlinked", () => {
  const manual: ManualCertification[] = [
    {
      name: "VMware Certified Professional - Data Center Virtualization",
      issuedOn: "2015-06-01",
      expiresOn: null,
    },
  ];

  const groups = groupCertifications(
    [certBadge({ id: "live", issuedOn: "2024-01-01" })],
    manual,
    "credly",
    AS_OF,
  );

  assert.equal(groups.active.length, 2);
  assert.equal(
    groups.active[0]?.badgeUrl,
    "https://www.credly.com/badges/live",
  );
  assert.equal(groups.active[1]?.badgeUrl, null);
  assert.equal(groups.active[1]?.name, "VMware Certified Professional");
  assert.equal(groups.earliestYear, 2015);
});

test("groupCertifications handles an empty list", () => {
  const groups = groupCertifications([], [], "snapshot", AS_OF);

  assert.deepEqual(groups.active, []);
  assert.deepEqual(groups.expired, []);
  assert.equal(groups.source, "snapshot");
  assert.equal(groups.earliestYear, Number.POSITIVE_INFINITY);
});

test("groupCertifications uses the current time when asOf is omitted", () => {
  const groups = groupCertifications(
    [certBadge({ expiresOn: "2000-01-01" })],
    [],
    "credly",
  );

  assert.equal(groups.active.length, 0);
  assert.equal(groups.expired.length, 1);
});

function certification(
  name: string,
  abbreviation: string | null,
  id = name,
): Certification {
  return {
    name,
    track: "Data Center Virtualization",
    version: null,
    abbreviation,
    issuedOn: "2024-01-01",
    expiresOn: null,
    badgeUrl: `https://www.credly.com/badges/${id}`,
  };
}

test("groupByFamily collapses generations and orders tiers first", () => {
  const families = groupByFamily([
    certification("VMware Certified Associate", "VCA"),
    certification("VMware Certified Professional", "VCP", "vcp-old"),
    certification("VMware Certified Professional", "VCP", "vcp-new"),
    certification("VMware Certified Implementation Expert", "VCIX"),
    certification("VMware Certified Advanced Professional", "VCAP"),
    certification("VMware Certified Technical Associate", "VCTA"),
    certification("Mystery Certified Thing", null),
  ]);

  assert.deepEqual(
    families.map(({ name }) => name),
    [
      "VMware Certified Implementation Expert",
      "VMware Certified Advanced Professional",
      "VMware Certified Professional",
      "VMware Certified Technical Associate",
      "VMware Certified Associate",
      "Mystery Certified Thing",
    ],
  );

  const vcp = families.find(
    ({ name }) => name === "VMware Certified Professional",
  );
  assert.equal(vcp?.abbreviation, "VCP");
  assert.deepEqual(
    vcp?.editions.map(({ badgeUrl }) => badgeUrl),
    [
      "https://www.credly.com/badges/vcp-old",
      "https://www.credly.com/badges/vcp-new",
    ],
  );
});

// loadCertifications caches per module, and node --test runs each test file
// in its own process, so this file's single load test always sees a pristine
// cache. Keep it that way: a second loadCertifications call in this file
// would reuse the snapshot result below instead of fetching.
test("loadCertifications falls back to the snapshot when Credly fails", async () => {
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  let warned = "";
  globalThis.fetch = (async () => {
    throw new Error("network down");
  }) as typeof fetch;
  console.warn = ((message: unknown) => {
    warned = String(message);
  }) as typeof console.warn;

  try {
    const groups = await loadCertifications("vmstan", []);

    assert.equal(groups.source, "snapshot");
    assert.ok(groups.active.length + groups.expired.length > 0);
    assert.ok(Number.isFinite(groups.earliestYear));
    assert.match(warned, /network down/);
  } finally {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
  }
});
