interface NowLink {
  name: string;
  href?: string;
}

interface NowAppCategory {
  label: string;
  items: NowLink[];
}

export const nowSnapshot = {
  supplements: {
    href: "https://supp.co/u/4cgsmq683fhf-xul/stack/products?st=9dBbXM",
    items: [
      { name: "Vitamin D", detail: "Metagenics · 12,000 IU" },
      { name: "Omega 3", detail: "Metagenics · 3,000 mg" },
      { name: "Magnesium", detail: "Metagenics · 544 mg" },
      { name: "Zinc", detail: "Metagenics · 10 mg" },
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
      label: "Browser Extensions",
      items: [
        { name: "StopTheMadness", href: "https://underpassapp.com/StopTheMadness" },
        { name: "Wipr 2", href: "https://kaylees.site/wipr2.html" },
      ],
    },
    {
      label: "Coding",
      items: [
        { name: "Codex", href: "https://openai.com/codex/" },
        { name: "Zed", href: "https://zed.dev" },
      ],
    },
    {
      label: "Containers",
      items: [{ name: "OrbStack", href: "https://orbstack.dev" }],
    },
    {
      label: "Databases",
      items: [{ name: "TablePlus", href: "https://tableplus.com" }],
    },
    {
      label: "Diagramming",
      items: [{ name: "OmniGraffle", href: "https://www.omnigroup.com/omnigraffle" }],
    },
    {
      label: "Photo Editing",
      items: [{ name: "Pixelmator", href: "https://www.pixelmator.com"}],
    },
    {
      label: "Podcasts",
      items: [{ name: "Overcast", href: "https://overcast.fm" }],
    },
    {
      label: "Sleep Tracking",
      items: [{ name: "SleepHQ", href: "https://sleephq.com" }],
    },
    {
      label: "System Mainteance",
      items: [
        { name: "Hazel", href: "https://www.noodlesoft.com/whats-new-in-hazel-6/" },
        { name: "Updatest", href: "https://updatest.app" },
      ],
    },
    {
      label: "Terminal",
      items: [{ name: "Ghostty", href: "https://ghostty.org" }],
    },
    {
      label: "Virtualization",
      items: [{ name: "UTM", href: "https://mac.getutm.app" }],
    },
    {
      label: "Wallpapers",
      items: [{ name: "Wallaroo", href: "https://wallaroo.app" }],
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
