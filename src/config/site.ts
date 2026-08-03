/**
 * Central site configuration.
 * Every surface (metadata, nav, footer, JSON-LD) reads from here —
 * change once, propagate everywhere.
 */
export const siteConfig = {
  name: "Translation Windows",
  legalName: "Alpha Online Services LLC",
  tagline: "Every language passes through one window",
  description:
    "Certified document translation, transcription, subtitling and localization in every language — prepared to meet the requirements of USCIS, courts and universities.",
  /**
   * The canonical origin. MUST match the host actually served, or Google
   * receives conflicting signals — canonical tags pointing one way while
   * the site responds on another suppresses indexing.
   *
   * The site resolves on www, so www is canonical. Override with
   * NEXT_PUBLIC_SITE_URL if that ever changes.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.translationwindows.com",
  phone: "+12812053932",
  phoneDisplay: "(281) 205-3932",
  email: "sales@translationwindows.com",
  whatsapp: "https://wa.me/12812053932",
  address: {
    street: "1219 Hidden Canyon Rd",
    city: "Katy",
    region: "TX",
    postal: "77450",
    country: "US",
  },
  foundingYear: 2017,
} as const;

export type NavItem = { title: string; href: string; description?: string };

export const mainNav: NavItem[] = [
  { title: "Platform", href: "/platform" },
  { title: "Solutions", href: "/solutions" },
  { title: "Industries", href: "/industries" },
  { title: "Languages", href: "/languages" },
  { title: "Resources", href: "/resources" },
  { title: "About", href: "/about" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Platform",
    items: [
      { title: "Platform overview", href: "/platform" },
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
