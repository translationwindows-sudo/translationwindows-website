import {
  graph, localBusinessSchema, organizationSchema, websiteSchema, jsonLd,
} from "@/lib/schema";

/**
 * Renders a schema.org graph as JSON-LD.
 * One instance per page, containing every entity that page describes.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Built server-side from our own data and escaped in jsonLd();
      // no user input reaches it.
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}

/**
 * Site-wide identity, emitted once from the root layout: who the company
 * is, where it is, and what site this is. Page-level entities (Service,
 * FAQ, Article, Breadcrumb) reference these by @id rather than repeating
 * them.
 */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={graph(organizationSchema(), localBusinessSchema(), websiteSchema())}
    />
  );
}
