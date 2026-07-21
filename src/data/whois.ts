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
      },
      {
        name: "Signal",
        handle: "vmstan.01",
        href: "https://signal.me/#eu/Xm3GwnBxRZc0ojfK8hpMIXCm7BFXWuWffIlypKnDvDcvpvRPYclFw5rDkobpXBEI",
        icon: "fa-brands fa-signal-messenger",
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
      },
      {
        name: "Instagram",
        handle: "vmstan",
        href: "https://www.instagram.com/vmstan/",
        icon: "fa-brands fa-instagram",
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
        name: "YouTube",
        handle: "vmstan",
        href: "https://www.youtube.com/@vmstan",
        icon: "fa-brands fa-youtube",
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
];
