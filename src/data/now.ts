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
      { name: "Vitamin D+K", detail: "10,000 IU" },
      { name: "Omega 3 DHA/EPA", detail: "2 g" },
      { name: "Magnesium", detail: "Glycinate + Threonate · 500 mg" },
      { name: "Creatine", detail: "5 g" },
    ],
  },
  sleep: [
    {
      context: "Home",
      device: "ResMed AirSense 11",
      accessory: "Fisher & Paykel Nova Micro",
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
      label: "Ad Blocker",
      items: [
        {
          name: "Wipr 2",
          href: "https://kaylees.site/wipr2.html",
        },
      ],
    },
    {
      label: "Coding",
      items: [
        { name: "Nova", href: "https://nova.app" },
        { name: "Zed", href: "https://zed.dev" },
      ],
    },
    {
      label: "Containers",
      items: [{ name: "OrbStack", href: "https://orbstack.dev" }],
    },
    {
      label: "Diagramming",
      items: [
        {
          name: "OmniGraffle",
          href: "https://www.omnigroup.com/omnigraffle",
        },
      ],
    },
    {
      label: "Photo Editing",
      items: [
        {
          name: "Pixelmator",
          href: "https://www.pixelmator.com",
        },
      ],
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
      label: "Terminal",
      items: [{ name: "Ghostty", href: "https://ghostty.org" }],
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
    { name: 'iPad Pro 11" (2nd generation)', detail: "Minimally Utilized" },
    { name: "AirPods Pro 3", detail: "Everyday Audio" },
    {
      name: "Keychron K3 V2",
      detail: "Optical Blue Switches",
      href: "https://www.keychron.com/products/keychron-k3-wireless-mechanical-keyboard?variant=32220198764633",
    },
    {
      name: "Logitech MX Master 3S",
      detail: "Everyday Pointer",
      href: "https://www.logitech.com/en-us/shop/p/mx-master-3s.910-006557",
    },
  ] satisfies (NowLink & { detail: string })[],
  podcasts: [
    "Accidental Tech Podcast",
    "Blocks",
    "Dithering",
    "Raging Moderates",
    "Six Colors",
    "Vulcan Hello",
  ],
} as const;
