import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const routes = [
  "",
  "/platform",
  "/solutions",
  "/industries",
  "/languages",
  "/resources",
  "/blog",
  "/blog/certified-translation-uscis",
  "/blog/certified-vs-notarized-translation",
  "/blog/choosing-a-translation-company",
  "/about",
  "/contact",
  "/quote",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
