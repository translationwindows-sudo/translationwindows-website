import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * XML sitemap.
 *
 * Priority reflects commercial intent rather than a flat number: the pages
 * that generate enquiries rank above the ones that merely inform. Change
 * frequency is honest — claiming daily updates on a static page teaches
 * crawlers to distrust the file.
 */

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const routes: Entry[] = [
  // ── the site itself ──
  { path: "", priority: 1.0, changeFrequency: "weekly" },

  // ── service pages: highest commercial intent ──
  { path: "/services/certified-translation", priority: 0.95, changeFrequency: "monthly" },

  // ── commercial pages: what people search for and buy ──
  { path: "/solutions", priority: 0.9, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/languages", priority: 0.8, changeFrequency: "monthly" },
  { path: "/platform", priority: 0.8, changeFrequency: "monthly" },
  { path: "/quote", priority: 0.9, changeFrequency: "monthly" },

  // ── authority ──
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/blog/certified-translation-uscis", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog/certified-vs-notarized-translation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog/choosing-a-translation-company", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.6, changeFrequency: "monthly" },

  // ── company ──
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
