import { writeFileSync } from "node:fs";

import { fetchCredlyBadges } from "../src/lib/credly.ts";

const handle = process.argv[2] ?? "vmstan";
const target = "src/data/credly-badges.json";

try {
  const badges = await fetchCredlyBadges(handle);

  writeFileSync(
    target,
    `${JSON.stringify(
      { handle, fetchedAt: new Date().toISOString(), badges },
      null,
      2,
    )}\n`,
  );

  console.log(`Wrote ${badges.length} badges for ${handle} to ${target}`);
} catch (error) {
  console.error(`Unable to sync Credly badges: ${error.message}`);
  process.exitCode = 1;
}
