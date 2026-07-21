interface WhoisServiceBase {
  name: string;
  handle: string;
  icon: string;
  featured?: boolean;
}

export type WhoisService = WhoisServiceBase &
  ({ status: "inactive"; href?: string } | { status?: never; href: string });

export interface WhoisGroup {
  title: string;
  description: string;
  services: WhoisService[];
}

export const whoisProfile = {
  command: '$ whois vmstan',
  name: "Michael Stanclift",
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
        featured: true,
      },
      {
        name: "Signal",
        handle: "vmstan.01",
        href: "https://signal.me/#eu/Xm3GwnBxRZc0ojfK8hpMIXCm7BFXWuWffIlypKnDvDcvpvRPYclFw5rDkobpXBEI",
        icon: "fa-brands fa-signal-messenger",
        featured: true,
      },
      {
        name: "WhatsApp",
        handle: "vmstan",
        href: "https://wa.me/vmstan",
        icon: "fa-brands fa-whatsapp",
      },
      {
        name: "Discord",
        handle: "vmstan",
        href: "https://discord.com/users/vmstan",
        icon: "fa-brands fa-discord",
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
        featured: true,
      },
      {
        name: "GitHub",
        handle: "vmstan",
        href: "https://github.com/vmstan",
        icon: "fa-brands fa-github",
        featured: true,
      },
      {
        name: "Credly",
        handle: "vmstan",
        href: "https://www.credly.com/users/vmstan",
        icon: "fa-solid fa-certificate",
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
        featured: true,
      },
      {
        name: "Bluesky",
        handle: "vmstan.com",
        href: "https://bsky.app/profile/vmstan.com",
        icon: "fa-brands fa-bluesky",
        featured: true,
      },
      {
        name: "Instagram",
        handle: "vmstan",
        href: "https://www.instagram.com/vmstan/",
        icon: "fa-brands fa-instagram",
        featured: true,
      },
      {
        name: "YouTube",
        handle: "vmstan",
        href: "https://www.youtube.com/@vmstan",
        icon: "fa-brands fa-youtube",
      },
      {
        name: "Facebook",
        handle: "stanclift",
        href: "https://www.facebook.com/stanclift",
        icon: "fa-brands fa-facebook",
      },
      {
        name: "TikTok",
        handle: "_vmstan",
        href: "https://www.tiktok.com/@_vmstan",
        icon: "fa-brands fa-tiktok",
      },
      {
        name: "Snapchat",
        handle: "realvmstan",
        href: "https://snapchat.com/t/QZD66ePe",
        icon: "fa-brands fa-snapchat",
      },
      {
        name: "X",
        handle: "vmstan",
        href: "https://x.com/vmstan",
        icon: "fa-brands fa-x-twitter",
      },
      {
        name: "Mastodon",
        handle: "vmstan@vmst.io",
        icon: "fa-brands fa-mastodon",
        status: "inactive",
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
      },
      {
        name: "CashApp",
        handle: "vmstan",
        href: "https://cash.app/vmstan",
        icon: "fa-brands fa-cash-app",
      },
      {
        name: "Patreon",
        handle: "vmstan",
        href: "https://patreon.com/vmstan",
        icon: "fa-brands fa-patreon",
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
      },
      {
        name: "Xbox",
        handle: "Stantactical",
        href: "https://www.xbox.com/en-us/play/user/Stantactical",
        icon: "fa-brands fa-xbox",
      },
      {
        name: "Epic Games",
        handle: "Stantactical",
        href: "https://epicgames.com",
        icon: "fa-solid fa-shield",
      },
    ],
  },
];
