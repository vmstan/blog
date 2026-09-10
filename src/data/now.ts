interface NowLink {
  name: string;
  href?: string;
}

type NowScope = "personal" | "business" | "both";

interface NowApp {
  name: string;
  href?: string;
  scope: NowScope;
}

interface NowAppCategory {
  label: string;
  items: NowApp[];
}

export const nowSnapshot = {
  supplements: {
    href: "https://supp.co/u/4cgsmq683fhf-xul/stack/products?st=9dBbXM",
    items: [
      { name: "Vitamin D", detail: "Metagenics · 15,000 IU" },
      { name: "Omega 3", detail: "Metagenics · 4,000 mg" },
      { name: "Magnesium", detail: "Metagenics · 600 mg" },
      { name: "Creatine", detail: "Momentous · 10 mg" },
    ],
  },
  sleep: [
    {
      context: "Home",
      device: "ResMed AirSense 11",
      accessory: "F&P Nova Micro",
    },
    {
      context: "Travel",
      device: "ResMed AirMini",
      accessory: "AirFit P10",
    },
  ],
  tape: "papmd",
  apps: [
    {
      label: "AI",
      items: [
        { name: "Claude", href: "https://www.apple.com/safari/", scope: "personal" },
        { name: "Codex", href: "https://www.google.com/chrome/", scope: "personal" },
        { name: "Gemini", href: "https://www.google.com/chrome/", scope: "business" },
        { name: "Muse", href: "https://www.google.com/chrome/", scope: "personal" },
      ],
    },
    {
      label: "Browser",
      items: [
        { name: "Safari", href: "https://www.apple.com/safari/", scope: "personal" },
        { name: "Chrome", href: "https://www.google.com/chrome/", scope: "business" },
      ],
    },
    {
      label: "Browser Extensions",
      items: [
        { name: "StopTheMadness", href: "https://underpassapp.com/StopTheMadness", scope: "personal" },
        { name: "Wipr 2", href: "https://kaylees.site/wipr2.html", scope: "personal" },
        { name: "Ghostery", href: "https://www.ghostery.com/", scope: "business" },
      ],
    },
    {
      label: "Coding",
      items: [
        { name: "Zed", href: "https://zed.dev", scope: "personal" },
      ],
    },
    {
      label: "Containers",
      items: [{ name: "OrbStack", href: "https://orbstack.dev", scope: "personal" }],
    },
    {
      label: "Databases",
      items: [{ name: "TablePlus", href: "https://tableplus.com", scope: "personal" }],
    },
    {
      label: "Diagramming",
      items: [{ name: "OmniGraffle", href: "https://www.omnigroup.com/omnigraffle", scope: "personal" }],
    },
    {
      label: "Photo Editing",
      items: [{ name: "Pixelmator", href: "https://www.pixelmator.com", scope: "personal" }],
    },
    {
      label: "Podcasts",
      items: [{ name: "Overcast", href: "https://overcast.fm", scope: "personal" }],
    },
    {
      label: "Sleep Tracking",
      items: [{ name: "SleepHQ", href: "https://sleephq.com", scope: "personal" }],
    },
    {
      label: "System Mainteance",
      items: [
        { name: "Hazel", href: "https://www.noodlesoft.com/whats-new-in-hazel-6/", scope: "personal" },
        { name: "Updatest", href: "https://updatest.app", scope: "personal" },
      ],
    },
    {
      label: "Terminal",
      items: [{ name: "Ghostty", href: "https://ghostty.org", scope: "personal" }],
    },
    {
      label: "Virtualization",
      items: [{ name: "UTM", href: "https://mac.getutm.app", scope: "personal" }],
    },
    {
      label: "Wallpapers",
      items: [{ name: "Wallaroo", href: "https://wallaroo.app", scope: "personal" }],
    },
  ] satisfies NowAppCategory[],
  hardware: [
    { name: "iPhone 17 Pro", detail: "Deep Blue · TechWoven Case" },
    { name: "Apple Watch Ultra", detail: "Blue Trail Loop · Natural Titanium Milanese Loop" },
    { name: 'MacBook Pro M3 Max 14"', detail: "Personal · Space Black" },
    { name: 'MacBook Pro M5 Pro 16"', detail: "Business · Space Black" },
    { name: 'iPad Pro 11" (2nd generation)', detail: "Space Gray" },
    { name: "AirPods Pro 3", detail: "Everyday Audio" },
    { name: "Logitech MX Mechanical Mini for Mac", detail: "Clickety Clicky Clack"},
    { name: "Logitech MX Master 4 for Mac", detail: "Everyday Pointer"},
    { name: 'LG UltraFine 24" 4K', detail: "Display"},
  ] as (NowLink & { detail: string })[],
  podcasts: [
    "Accidental Tech Podcast",
    "Blocks",
    "Dithering",
    "Six Colors",
    "The Rebound",
    "Vulcan Hello",
  ],
} as const;
