export const SITE = {
  title: "Virtually Benevolent",
  description: "Michael Stanclift",
  url: "https://vmstan.com",
  author: "Michael Stanclift",
  locale: "en_US",
  navigation: [
    { href: "/", label: "Home" },
    { href: "/whois/", label: "Whois" },
    { href: "/now/", label: "Now" },
    { href: "/archive/", label: "Archive" },
    { href: "/search/", label: "Search" },
  ],
} as const;

export const POSTS_PER_PAGE = 25;
