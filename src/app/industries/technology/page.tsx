import type { Metadata } from "next";

import { DocumentPage } from "@/features/services/document-page";
import "@/styles/pillar.css";

const PATH = "/industries/technology";

export const metadata: Metadata = {
  title: "Translation for Technology Companies — Software, Docs and Support",
  description:
    "Localization for software companies: product interfaces, documentation, help centres, release notes and marketing. Developer-friendly formats and terminology that stays consistent as you ship.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Translation for Technology Companies — Translation Windows",
    description: "Localization for software interfaces, documentation, help content and marketing.",
    url: PATH, type: "article",
  },
};

const faqs = [
  { q: "What file formats can you work with?",
    a: "JSON, XLIFF, PO, YAML, CSV, Markdown and most structured exports, alongside ordinary documents. Tell us what your build consumes and we return files in exactly that structure, ready to drop in. Placeholders, interpolation syntax and ICU message format are preserved rather than translated." },
  { q: "How do you handle interface strings without context?",
    a: "We ask rather than guess. A string reading Post could be a verb or a noun, and the two translate differently in most languages. Send screenshots, a staging link or key comments where you have them; where you cannot, we flag ambiguous strings for you to clarify instead of picking one and hoping." },
  { q: "What about character limits in the UI?",
    a: "Tell us which strings are constrained and we work within the limit. Without that information a translator optimises for accuracy and produces a button label that overflows. German commonly runs a third longer than English, so a layout built for English will break somewhere." },
  { q: "Can you fit into a continuous release cycle?",
    a: "Yes. Most technology clients send changed strings rather than whole files, and translation memory means only new content is billed. A weekly or per-sprint cadence works better than batching into a quarterly overhaul, and keeps terminology consistent as the product evolves." },
  { q: "Do you localize documentation and help content as well as the product?",
    a: "Yes, and it is worth doing together. A help article referring to a menu item by its English name is useless once the interface is translated. Keeping product strings and documentation in the same terminology base is the only way they stay in agreement." },
  { q: "How do you handle brand and product names?",
    a: "Usually retained rather than translated, but the decision is yours and it should be made once. Product names, feature names and brand terms go into a do-not-translate list at the outset so no linguist has to decide case by case." },
  { q: "Can you handle multilingual SEO for our marketing site?",
    a: "Yes. Titles, descriptions, headings, alt text and URL slugs are all part of the work, and keywords are researched per market rather than translated. The phrase people search in Germany is frequently not the literal translation of the English one." },
  { q: "What about data handling for pre-release content?",
    a: "Files are stored outside any publicly accessible path with access limited to the coordinator and assigned linguists. Assigned translators see the strings and the deadline, not the client. If you need a specific NDA signed before unreleased material is sent, send it and we will sign it." },
];

export default function Page() {
  return (
    <DocumentPage
      path={PATH}
      crumb="Technology"
      eyebrow="Localization for Software Companies"
      title="Localization that keeps up with your release cycle."
      lead={
        <>
          Product interfaces, documentation, help centres and marketing — delivered in the formats
          your build already uses, with terminology that stays consistent as you ship.
        </>
      }
      schemaName="Translation Services for Technology Companies"
      schemaDescription="Localization services for software and technology companies covering product interfaces, documentation, help content, release notes and marketing material."
      serviceType="Software Localization"
      intro={{
        kicker: "What goes wrong",
        heading: "Localization fails when it is treated as an event",
        body: (
          <>
            <p className="pw-lead">
              Most software localization projects are commissioned once, delivered, and then
              slowly diverge from the product. Three sprints later the interface has forty new
              strings in English, the help centre describes menus that were renamed, and the German
              version quietly becomes a liability.
            </p>
            <p>
              The problem is not translation quality. It is that a product changes weekly and the
              localization process assumed it would not.
            </p>
            <p>
              The other recurring failure is context. A translator handed a spreadsheet of
              interface strings with no indication of where they appear will produce fluent,
              plausible text and get a meaningful number of them wrong — because Post, Order and
              Share are all ambiguous out of context, and the ambiguity does not survive
              translation.
            </p>
          </>
        ),
      }}
      points={{
        kicker: "How we work",
        heading: "What technology clients get from us",
        items: [
          { h: "Your file formats, returned intact", p: "JSON, XLIFF, PO, YAML and Markdown, with placeholders and interpolation syntax preserved rather than translated." },
          { h: "Context requested, not assumed", p: "Ambiguous strings are flagged for clarification rather than guessed at, because a wrong guess ships." },
          { h: "Length constraints respected", p: "Tell us which strings are bounded and translations fit within the limit." },
          { h: "A do-not-translate list", p: "Product names, feature names and brand terms fixed once so nobody decides case by case." },
          { h: "Incremental delivery", p: "Send changed strings per sprint; translation memory means only new content is billed." },
          { h: "Product and docs in one terminology base", p: "So a help article never refers to a menu item by a name the interface no longer uses." },
        ],
      }}
      uses={{
        kicker: "What we localize",
        heading: "Work we handle for technology companies",
        items: [
          { h: "Product interfaces", p: "Web, mobile and desktop application strings.", href: "/services/website-localization" },
          { h: "Documentation and help centres", p: "Guides, API documentation and support articles." },
          { h: "Release notes and changelogs", p: "Shipped alongside the release rather than weeks later." },
          { h: "Onboarding and in-app content", p: "Tooltips, empty states and guided tours." },
          { h: "Marketing sites and campaigns", p: "Including multilingual SEO researched per market." },
          { h: "Email and notification templates", p: "Often overlooked, and often the first thing a user receives." },
          { h: "Legal and policy pages", p: "Terms, privacy and disclosures for new markets.", href: "/services/legal-translation" },
          { h: "Video and training content", p: "Subtitles for product demos and tutorials.", href: "/services/subtitle-translation" },
        ],
      }}
      timing={{
        rows: [
          { label: "Sprint updates", note: "Changed strings, release notes, short content", time: "2–3 business days" },
          { label: "Documentation sets", note: "Help centres, guides, API references", time: "Depends on volume" },
          { label: "Full product localization", note: "Interface, docs and marketing across several languages", time: "Scoped before quoting" },
        ],
      }}
      related={[
        { h: "Website Localization", p: "The service in detail, including multilingual SEO.", href: "/services/website-localization" },
        { h: "Technical Translation", p: "Specifications, manuals and engineering documentation.", href: "/services/technical-translation" },
        { h: "Subtitle Translation", p: "Product demos, tutorials and training video.", href: "/services/subtitle-translation" },
        { h: "Business Translation", p: "Internal communication and corporate material.", href: "/services/business-translation" },
      ]}
      faqs={faqs}
      cta={{
        title: "Start a localization project",
        body: "Tell us your formats, your languages and your release cadence. A Project Coordinator will scope it before quoting.",
      }}
    />
  );
}
