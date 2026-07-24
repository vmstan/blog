interface WhoisServiceBase {
  name: string;
  handle: string;
  icon: string;
}

// preferred  → the one service you'd steer people to in this category (one per group)
// active     → accounts you actually use
// inactive   → present but rarely used; listed for completeness
// legacy     → dead; kept for the record, not linked
export type WhoisTier = "preferred" | "active" | "inactive" | "legacy";

export type WhoisService = WhoisServiceBase &
  (
    | { tier: "legacy"; href?: string }
    | { tier?: Exclude<WhoisTier, "legacy">; href: string }
  );

export interface WhoisGroup {
  title: string;
  description: string;
  services: WhoisService[];
}

export const whoisProfile = {
  command: '$ whois vmstan',
  name: "Michael Stanclift",
  birthDate: "1983-11-09",
  description:
    "Lifelong Kansan, father of four, and sysadmin since age 13. Heavily caffinated, infrequently rested.",
  facts: [
    { label: "Kansas City", icon: "fa-solid fa-location-dot" },
    { label: "Broadcom", icon: "fa-solid fa-briefcase" },
  ],
} as const;

export const whoisGroups: WhoisGroup[] = [
  {
    title: "Contact",
    description: "Direct ways to reach me.",
    services: [
      {
        name: "Email",
        handle: "mx@vmstan.com",
        href: "mailto:mx@vmstan.com",
        icon: "fa-solid fa-envelope",
        tier: "preferred",
      },
      {
        name: "Signal",
        handle: "vmstan.01",
        href: "https://signal.me/#eu/Xm3GwnBxRZc0ojfK8hpMIXCm7BFXWuWffIlypKnDvDcvpvRPYclFw5rDkobpXBEI",
        icon: "fa-brands fa-signal-messenger",
        tier: "active",
      },
      {
        name: "WhatsApp",
        handle: "vmstan",
        href: "https://wa.me/vmstan",
        icon: "fa-brands fa-whatsapp",
        tier: "active",
      },
    ],
  },
  {
    title: "Professional",
    description: "Work, code, and professional profiles.",
    services: [
      {
        name: "LinkedIn",
        handle: "vmstan",
        href: "https://www.linkedin.com/in/vmstan",
        icon: "fa-brands fa-linkedin",
        tier: "preferred",
      },
      {
        name: "GitHub",
        handle: "vmstan",
        href: "https://github.com/vmstan",
        icon: "fa-brands fa-github",
        tier: "active",
      },
      {
        name: "Credly",
        handle: "vmstan",
        href: "https://www.credly.com/users/vmstan",
        icon: "fa-solid fa-certificate",
        tier: "active",
      },
    ],
  },
  {
    title: "Social",
    description: "Places where I post and participate.",
    services: [
      {
        name: "Threads",
        handle: "vmstan",
        href: "https://www.threads.com/@vmstan",
        icon: "fa-brands fa-threads",
        tier: "preferred",
      },
      {
        name: "Bluesky",
        handle: "vmstan.com",
        href: "https://bsky.app/profile/vmstan.com",
        icon: "fa-brands fa-bluesky",
        tier: "active",
      },
      {
        name: "Instagram",
        handle: "vmstan",
        href: "https://www.instagram.com/vmstan/",
        icon: "fa-brands fa-instagram",
        tier: "active",
      },
      {
        name: "YouTube",
        handle: "vmstan",
        href: "https://www.youtube.com/@vmstan",
        icon: "fa-brands fa-youtube",
        tier: "active",
      },
      {
        name: "Discord",
        handle: "vmstan",
        href: "https://discord.com/users/vmstan",
        icon: "fa-brands fa-discord",
        tier: "active",
      },
      {
        name: "Facebook",
        handle: "stanclift",
        href: "https://www.facebook.com/stanclift",
        icon: "fa-brands fa-facebook",
        tier: "active",
      },
      {
        name: "TikTok",
        handle: "_vmstan",
        href: "https://www.tiktok.com/@_vmstan",
        icon: "fa-brands fa-tiktok",
        tier: "active",
      },
      {
        name: "X",
        handle: "vmstan",
        href: "https://x.com/vmstan",
        icon: "fa-brands fa-x-twitter",
        tier: "active",
      },
      {
        name: "Mastodon",
        handle: "vmstan@vmst.io",
        icon: "fa-brands fa-mastodon",
        tier: "legacy",
      },
      {
        name: "Snapchat",
        handle: "realvmstan",
        href: "https://www.snapchat.com/add/realvmstan",
        icon: "fa-brands fa-snapchat",
        tier: "inactive",
      },
      {
        name: "Reddit",
        handle: "u/KhakiKansan",
        href: "https://www.reddit.com/user/KhakiKansan",
        icon: "fa-brands fa-reddit",
        tier: "inactive",
      },
      {
        name: "Patreon",
        handle: "vmstan",
        href: "https://patreon.com/vmstan",
        icon: "fa-brands fa-patreon",
        tier: "active",
      },
    ],
  },
  {
    title: "Payments",
    description: "Where to give me all your money.",
    services: [
      {
        name: "Venmo",
        handle: "vmstan",
        href: "https://venmo.com/u/vmstan",
        icon: "fa-brands fa-venmo-v",
        tier: "active",
      },
      {
        name: "CashApp",
        handle: "vmstan",
        href: "https://cash.app/vmstan",
        icon: "fa-brands fa-cash-app",
        tier: "active",
      },
    ],
  },
  {
    title: "Gaming",
    description: "Places where I play and share my games.",
    services: [
      {
        name: "Steam",
        handle: "Stantactical",
        href: "https://steamcommunity.com/id/vmstan/",
        icon: "fa-brands fa-steam",
        tier: "active",
      },
      {
        name: "Xbox",
        handle: "Stantactical",
        href: "https://www.xbox.com/en-us/play/user/Stantactical",
        icon: "fa-brands fa-xbox",
        tier: "active",
      },
      {
        name: "Epic Games",
        handle: "Stantactical",
        href: "https://epicgames.com",
        icon: "fa-solid fa-shield",
        tier: "active",
      },
    ],
  },
];
