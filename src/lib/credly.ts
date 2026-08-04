import snapshot from "../data/credly-badges.json" with { type: "json" };

export interface CredlyBadge {
  id: string;
  name: string;
  issuer: string;
  issuedOn: string;
  expiresOn: string | null;
}

export interface Certification {
  name: string;
  track: string | null;
  abbreviation: string | null;
  issuedOn: string;
  expiresOn: string | null;
  badgeUrl: string;
}

export interface CertificationGroups {
  active: Certification[];
  expired: Certification[];
  // "credly" when the build reached the API, "snapshot" when it fell back.
  source: "credly" | "snapshot";
}

// Only VMware-lineage badges belong on the whois page; Credly reissues the
// older VMware ones under Broadcom, so both issuers count.
const vmwareIssuers = new Set(["VMware", "Broadcom"]);
// Certifications only. Achievement badges ("Double VCP") share the issuer but
// carry no expiration of their own, so they never fit the active/expired split.
const certificationPattern = /^(VMware|Broadcom) Certified /i;

/**
 * Earliest year the page lists. Enforced here rather than left to the data so
 * the disclaimer on the whois page stays true if an older badge turns public.
 */
export const earliestCertificationYear = 2015;

const abbreviations: [RegExp, string][] = [
  [/^VMware Certified Implementation Expert/i, "VCIX"],
  [/^VMware Certified Advanced Professional/i, "VCAP"],
  [/^VMware Certified Technical Associate/i, "VCTA"],
  [/^VMware Certified Associate/i, "VCA"],
  [/^VMware Certified Professional/i, "VCP"],
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

function isVmwareCertification(badge: CredlyBadge) {
  return (
    vmwareIssuers.has(badge.issuer) &&
    certificationPattern.test(badge.name) &&
    Number(badge.issuedOn.slice(0, 4)) >= earliestCertificationYear
  );
}

function toCertification(badge: CredlyBadge): Certification {
  const [name, track] = badge.name.split(/\s+[-–—]\s+/, 2);

  return {
    name: name ?? badge.name,
    track: track ?? null,
    abbreviation:
      abbreviations.find(([pattern]) => pattern.test(badge.name))?.[1] ?? null,
    issuedOn: badge.issuedOn,
    expiresOn: badge.expiresOn,
    badgeUrl: `https://www.credly.com/badges/${badge.id}`,
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
  source: CertificationGroups["source"],
  asOf = new Date(),
): CertificationGroups {
  const certifications = badges
    .filter(isVmwareCertification)
    .map(toCertification);

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
    source,
  };
}

let cached: Promise<CertificationGroups> | undefined;

/**
 * Build-time certification list. Falls back to the committed snapshot in
 * src/data/credly-badges.json when Credly is unreachable, so a bad day at
 * Credly never fails the build. Refresh the snapshot with `pnpm sync:credly`.
 */
export function loadCertifications(handle: string) {
  cached ??= fetchCredlyBadges(handle)
    .then((badges) => groupCertifications(badges, "credly"))
    .catch((error: unknown) => {
      console.warn(
        `[credly] Live fetch failed (${error instanceof Error ? error.message : error}); using snapshot from ${snapshot.fetchedAt}.`,
      );
      return groupCertifications(snapshot.badges, "snapshot");
    });

  return cached;
}
