/**
 * Central site configuration.
 * Every surface (metadata, nav, footer, JSON-LD) reads from here —
 * change once, propagate everywhere.
 */
export const siteConfig = {
  name: "Translation Windows",
  legalName: "Transinformatic LLC",
  tagline: "Every language passes through one window",
  description:
    "Certified document translation, transcription, subtitling and localization in every language — accepted by USCIS, courts and universities worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://translationwindows.com",
  phone: "+12812053932",
  phoneDisplay: "(281) 205-3932",
  email: "sales@translationwindows.com",
  whatsapp: "https://wa.me/12812053932",
  address: {
    street: "19255 Park Row #205",
    city: "Houston",
    region: "TX",
    postal: "77084",
    country: "US",
  },
  foundingYear: 2017,
} as const;

export type NavItem = { title: string; href: string; description?: string };

export const mainNav: NavItem[] = [
  { title: "Solutions", href: "/solutions" },
  { title: "Industries", href: "/industries" },
  { title: "Languages", href: "/languages" },
  { title: "Resources", href: "/resources" },
  { title: "Blog", href: "/blog" },
  { title: "About", href: "/about" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Platform",
    items: [
      { title: "Solutions", href: "/solutions" },
      { title: "AI Quote Assistant", href: "/quote" },
      { title: "Languages", href: "/languages" },
      { title: "Industries", href: "/industries" },
    ],
  },
  {
    heading: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Blog", href: "/blog" },
      { title: "Resources", href: "/resources" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { title: "Privacy", href: "/privacy" },
      { title: "Terms", href: "/terms" },
    ],
  },
];
