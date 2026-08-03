import { siteConfig } from "@/config/site";

/**
 * Structured data (schema.org).
 *
 * Everything here describes what Translation Windows genuinely is and does.
 * Nothing is asserted that cannot be substantiated — no invented review
 * counts, no unearned awards, no aggregate ratings until real reviews exist.
 * Google penalises fabricated markup, and it would be dishonest regardless.
 */

const BASE = siteConfig.url.replace(/\/$/, "");

/** Stable @id values so entities can reference one another. */
export const ORG_ID = `${BASE}/#organization`;
export const SITE_ID = `${BASE}/#website`;
export const PLACE_ID = `${BASE}/#place`;

/** The company itself. Referenced by every other entity. */
export function organizationSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: "Alpha Online Services LLC",
    url: BASE,
    logo: `${BASE}/icon.png`,
    image: `${BASE}/opengraph-image`,
    description:
      "Certified translation and language services with managed project delivery, " +
      "secure document handling and transparent project tracking.",
    foundingDate: "2017",
    email: siteConfig.email,
    telephone: siteConfig.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1219 Hidden Canyon Rd",
      addressLocality: "Katy",
      addressRegion: "TX",
      postalCode: "77450",
      addressCountry: "US",
    },
    /**
     * The postal address is in Katy (ZIP 77450) because that is where post
     * is received and where the Business Profile is verified. The service
     * area is stated separately and includes Houston, of which Katy is part.
     * Putting Houston in addressLocality would contradict the postcode.
     */
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "State", name: "Texas" },
      { "@type": "City", name: "Houston" },
      { "@type": "City", name: "Katy" },
      { "@type": "City", name: "Sugar Land" },
      { "@type": "City", name: "Dallas" },
      { "@type": "City", name: "Austin" },
      { "@type": "City", name: "San Antonio" },
    ],
    availableLanguage: [
      "English", "Spanish", "French", "German", "Italian", "Portuguese",
      "Dutch", "Polish", "Norwegian", "Swedish", "Danish", "Russian",
      "Ukrainian", "Arabic", "Chinese", "Japanese", "Korean",
    ],
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: ["English", "Spanish"],
    }],
  };
}

/** The physical office — supports local search. */
export function localBusinessSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": PLACE_ID,
    name: siteConfig.name,
    parentOrganization: { "@id": ORG_ID },
    url: BASE,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1219 Hidden Canyon Rd",
      addressLocality: "Katy",
      addressRegion: "TX",
      postalCode: "77450",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Houston" },
      { "@type": "City", name: "Katy" },
      { "@type": "State", name: "Texas" },
    ],
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    }],
  };
}

/** The website, with search action. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: BASE,
    name: siteConfig.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

/** One service offering. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@type": "Service",
    "@id": `${BASE}${opts.path}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "State", name: "Texas" },
    ],
    url: `${BASE}${opts.path}`,
    // No `offers` block: we quote per project rather than list prices,
    // and inventing a price range would be misleading.
  };
}

/** Frequently asked questions, as asked and answered on the page. */
export function faqSchema(items: { q: string; a: string }[], path: string) {
  return {
    "@type": "FAQPage",
    "@id": `${BASE}${path}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Breadcrumb trail. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE}${c.path}`,
    })),
  };
}

/** A blog article. */
export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  published: string;
  modified?: string;
}) {
  return {
    "@type": "Article",
    "@id": `${BASE}${opts.path}#article`,
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.published,
    dateModified: opts.modified ?? opts.published,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}${opts.path}` },
    inLanguage: "en-US",
  };
}

/**
 * Wrap entities in a single @graph.
 *
 * One script tag per page, with cross-references by @id, is cleaner for
 * crawlers than several disconnected blocks.
 */
export function graph(...entities: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": entities,
  };
}

/** Render as JSON-LD. */
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
