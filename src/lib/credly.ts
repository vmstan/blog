import snapshot from "../data/credly-badges.json" with { type: "json" };

export interface CredlyBadge {
  id: string;
  name: string;
  issuer: string;
  issuedOn: string;
  expiresOn: string | null;
}

/**
 * A certification that predates Credly, or was never issued through it. Named
 * the way Credly names them so the same parsing applies; see whois.ts.
 */
export interface ManualCertification {
  name: string;
  issuedOn: string;
  expiresOn: string | null;
}

export interface Certification {
  name: string;
  track: string | null;
  abbreviation: string | null;
  issuedOn: string;
  expiresOn: string | null;
  // null for manual entries, which have no badge to link to.
  badgeUrl: string | null;
}

export interface CertificationGroups {
  active: Certification[];
  expired: Certification[];
  // Earliest year in the two lists, for the "Since …" note on the whois page.
  earliestYear: number;
  // "credly" when the build reached the API, "snapshot" when it fell back.
  source: "credly" | "snapshot";
}

// Credly reissues the older VMware badges under Broadcom, so both issuers count
// as VMware lineage.
const certificationIssuers = new Set(["VMware", "Broadcom", "Cisco"]);
// Certifications only. Achievement badges ("Double VCP") share the issuer but
// carry no expiration of their own, so they never fit the active/expired split.
const certificationPattern = /^(VMware|Broadcom|Cisco) Certified /i;

const abbreviations: [RegExp, string][] = [
  [/^VMware Certified Implementation Expert/i, "VCIX"],
  [/^VMware Certified Advanced Professional/i, "VCAP"],
  [/^VMware Certified Technical Associate/i, "VCTA"],
  [/^VMware Certified Associate/i, "VCA"],
  [/^VMware Certified Professional/i, "VCP"],
  [/^Cisco Certified Network Associate/i, "CCNA"],
];

export function credlyBadgesUrl(handle: string) {
  return `https://www.credly.com/users/${handle}/badges?sort=-state_updated_at&page=1`;
}

/** Reduces the Credly API payload to the handful of fields the site renders. */
export function pickCredlyBadges(payload: unknown): CredlyBadge[] {
  const data = (payload as { data?: unknown[] }).data;

  if (!Array.isArray(data)) {
    throw new Error("Credly response did not contain a badge array");
  }

  return data.map((entry) => {
    const badge = entry as {
      id: string;
      issued_at_date: string;
      expires_at_date: string | null;
      badge_template: {
        name: string;
        issuer: { entities: { entity: { name: string } }[] };
      };
    };

    return {
      id: badge.id,
      name: badge.badge_template.name,
      issuer: badge.badge_template.issuer.entities[0]?.entity.name ?? "",
      issuedOn: badge.issued_at_date,
      expiresOn: badge.expires_at_date,
    };
  });
}

export async function fetchCredlyBadges(handle: string) {
  const response = await fetch(credlyBadgesUrl(handle), {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Credly responded with ${response.status}`);
  }

  return pickCredlyBadges(await response.json());
}

function isListedCertification(badge: CredlyBadge) {
  return (
    certificationIssuers.has(badge.issuer) &&
    certificationPattern.test(badge.name)
  );
}

// Some names repeat their own short form at the end ("… (CCNA Data Center)"),
// which the meta line already carries as the abbreviation.
const trailingParenthetical = /\s*\([^()]*\)\s*$/;

function toCertification(
  entry: ManualCertification,
  badgeUrl: string | null,
): Certification {
  const fullName = entry.name.replace(trailingParenthetical, "");
  const [name, track] = fullName.split(/\s+[-–—]\s+/, 2);

  return {
    name: name ?? fullName,
    track: track ?? null,
    abbreviation:
      abbreviations.find(([pattern]) => pattern.test(fullName))?.[1] ?? null,
    issuedOn: entry.issuedOn,
    expiresOn: entry.expiresOn,
    badgeUrl,
  };
}

function hasExpired(certification: Certification, asOf: Date) {
  return (
    certification.expiresOn !== null &&
    new Date(`${certification.expiresOn}T23:59:59Z`) < asOf
  );
}

function byDateDescending(left: string | null, right: string | null) {
  return (right ?? "").localeCompare(left ?? "");
}

export function groupCertifications(
  badges: CredlyBadge[],
  manual: ManualCertification[],
  source: CertificationGroups["source"],
  asOf = new Date(),
): CertificationGroups {
  const certifications = [
    ...badges
      .filter(isListedCertification)
      .map((badge) =>
        toCertification(badge, `https://www.credly.com/badges/${badge.id}`),
      ),
    ...manual.map((entry) => toCertification(entry, null)),
  ];

  return {
    active: certifications
      .filter((certification) => !hasExpired(certification, asOf))
      .sort((left, right) => byDateDescending(left.issuedOn, right.issuedOn)),
    expired: certifications
      .filter((certification) => hasExpired(certification, asOf))
      // Broadcom retired a whole generation on the same date, so fall back to
      // the earned date to keep same-expiry badges in a sensible order.
      .sort(
        (left, right) =>
          byDateDescending(left.expiresOn, right.expiresOn) ||
          byDateDescending(left.issuedOn, right.issuedOn),
      ),
    earliestYear: certifications.reduce(
      (earliest, certification) =>
        Math.min(earliest, Number(certification.issuedOn.slice(0, 4))),
      Number.POSITIVE_INFINITY,
    ),
    source,
  };
}

let cached: Promise<CertificationGroups> | undefined;

/**
 * Build-time certification list. Falls back to the committed snapshot in
 * src/data/credly-badges.json when Credly is unreachable, so a bad day at
 * Credly never fails the build. Refresh the snapshot with `pnpm sync:credly`.
 */
export function loadCertifications(
  handle: string,
  manual: ManualCertification[] = [],
) {
  cached ??= fetchCredlyBadges(handle)
    .then((badges) => groupCertifications(badges, manual, "credly"))
    .catch((error: unknown) => {
      console.warn(
        `[credly] Live fetch failed (${error instanceof Error ? error.message : error}); using snapshot from ${snapshot.fetchedAt}.`,
      );
      return groupCertifications(snapshot.badges, manual, "snapshot");
    });

  return cached;
}
