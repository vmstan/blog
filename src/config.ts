export const SITE = {
  title: "Virtually Benevolent",
  description: "Thoughts, opinions, and other longer form rants",
  url: "https://vmstan.com",
  author: "Michael Stanclift",
  locale: "en_US",
  navigation: [
    { href: "/", label: "Home" },
    { href: "/whois/", label: "Whois" },
    { href: "/now/", label: "Now" },
    { href: "/archive/", label: "Archive" },
  ],
} as const;

export const POSTS_PER_PAGE = 25;
