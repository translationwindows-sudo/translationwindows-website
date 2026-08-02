import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * Crawl rules.
 *
 * Public marketing pages are open. Anything customer-specific or
 * operational is excluded — a tracking token in a search result would be
 * a privacy failure, and the workspace preview is not real content.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",        // endpoints, not pages
          "/track/",      // customer tracking links — never indexable
          "/workspace",   // design preview, not a real service page
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
