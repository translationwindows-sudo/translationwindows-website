import type { Metadata } from "next";

import { DocumentPage } from "@/features/services/document-page";
import "@/styles/pillar.css";

const PATH = "/services/technical-translation";

export const metadata: Metadata = {
  title: "Technical Translation Services — Manuals, Specifications and Documentation",
  description:
    "Technical translation for manufacturing, engineering and technology: manuals, specifications, safety documentation and technical files. Terminology management, DTP and 230+ language combinations.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Technical Translation — Translation Windows",
    description:
      "Technical translation for manuals, specifications, safety documentation and engineering files.",
    url: PATH, type: "article",
  },
};

const faqs = [
  { q: "Do your translators understand the subject matter?",
    a: "Technical work is assigned to linguists with experience in the relevant field. This matters because technical translation is largely about knowing which of several plausible renderings is the one the industry actually uses. A bearing, a bushing and a bush are different components; a translator who has not worked in mechanical engineering will pick whichever sounds best." },
  { q: "Can you work with our existing terminology?",
    a: "Yes, and we would rather you send it than have us invent our own. If you have a glossary, a termbase, previously approved translations or even a product catalogue, send it at the outset. Where you have none, we build one during the first project and it stays with your account for everything after." },
  { q: "What file formats can you handle?",
    a: "InDesign, FrameMaker, Word, XML, DITA, and structured formats from most authoring systems, alongside plain documents and spreadsheets. Tell us what you have and how the output needs to return. Where files carry tags or conditional text, we preserve the structure rather than flattening it." },
  { q: "Do you handle the layout as well as the text?",
    a: "Yes — desktop publishing is part of the work on most technical projects. Translated text expands or contracts, and a manual that runs a third longer in German will break a layout designed around English. We return files that are usable, not files that need rebuilding." },
  { q: "How do you handle safety warnings and regulatory text?",
    a: "With particular care, because some of it is prescribed rather than free text. Warning wording, symbols and required phrasing are frequently defined by the standard or the market, and improving them is not an improvement. Where a market mandates specific language, we use it." },
  { q: "What is your turnaround on technical documents?",
    a: "Short documents follow standard timelines of 2–3 business days. Manuals, technical files and multilingual documentation sets depend on volume, format complexity and how much DTP is involved. We scope before quoting so the date reflects the actual work." },
  { q: "Can you translate into several languages at once?",
    a: "Yes, and doing so together is more consistent than commissioning separately. A single source is prepared once, terminology is agreed once, and every language works from the same approved base — which matters when the same warning appears in twelve manuals." },
  { q: "Do you handle updates to documents you have already translated?",
    a: "Yes, and this is where translation memory earns its place. When a manual is revised, only the changed segments are retranslated. The rest stays identical to what is already published, and the cost reflects the change rather than the whole document." },
];

export default function Page() {
  return (
    <DocumentPage
      path={PATH}
      crumb="Technical Translation"
      eyebrow="Technical and Engineering Translation"
      title="Technical documentation, translated by people who know the difference."
      lead={
        <>
          Manuals, specifications, safety documentation and technical files — translated with
          managed terminology, returned in your working formats, and laid out so they are usable
          rather than merely accurate.
        </>
      }
      schemaName="Technical Translation"
      schemaDescription="Technical translation for manufacturing, engineering and technology sectors covering manuals, specifications, safety documentation, technical files and multilingual documentation sets."
      serviceType="Technical Documentation Translation"
      intro={{
        kicker: "What makes it hard",
        heading: "Technical translation is a terminology problem",
        body: (
          <>
            <p className="pw-lead">
              Most technical translation is not difficult because the language is complex. Manuals
              are written plainly by design. It is difficult because for any given component,
              process or fault condition there are usually several defensible translations — and
              only one that the industry actually uses.
            </p>
            <p>
              A translator without domain experience will produce text that reads perfectly well
              and uses the wrong word throughout. The engineer receiving it will understand what
              was meant and will not trust the document. On safety documentation, that gap between
              comprehensible and correct is where liability lives.
            </p>
            <p>
              The second difficulty is scale. Technical documentation arrives as sets — a manual, a
              quick-start guide, labels, a training deck, an online help system — and the same
              warning must read identically in all of them. That is a terminology management
              problem before it is a translation one.
            </p>
          </>
        ),
      }}
      points={{
        kicker: "How we work",
        heading: "What careful technical translation involves",
        items: [
          { h: "Terminology agreed before translation", p: "A glossary is built or imported at the outset, so decisions are made once rather than repeatedly and inconsistently." },
          { h: "Domain-experienced linguists", p: "Assigned by field — mechanical, electrical, software, process — because knowing the industry vocabulary is most of the work." },
          { h: "Prescribed wording respected", p: "Safety phrasing, regulatory text and standard-mandated language are used as required rather than rewritten." },
          { h: "Structure and tags preserved", p: "XML, DITA and structured authoring formats return with their markup intact, not flattened into prose." },
          { h: "Layout adjusted for expansion", p: "German runs longer, Chinese runs shorter, and a layout built for English will not survive either without attention." },
          { h: "Second-linguist review", p: "Every translation is read against the original before delivery — on safety documentation this is not negotiable." },
        ],
      }}
      uses={{
        kicker: "What we translate",
        heading: "Technical documents we handle",
        items: [
          { h: "Operating and maintenance manuals", p: "For machinery, equipment and consumer products." },
          { h: "Installation and service guides", p: "Including field service documentation and troubleshooting trees." },
          { h: "Safety documentation", p: "Warnings, hazard notices, safety data sheets and compliance text." },
          { h: "Technical specifications", p: "Datasheets, drawings, tolerances and material specifications." },
          { h: "Software and interface documentation", p: "Help systems, release notes and API documentation.", href: "/services/website-localization" },
          { h: "Medical device documentation", p: "Instructions for use, labelling and technical files.", href: "/services/medical-translation" },
          { h: "Training and certification material", p: "For operators, technicians and distributors." },
          { h: "Patents and technical filings", p: "Where technical precision meets legal drafting.", href: "/services/legal-translation" },
        ],
      }}
      timing={{
        rows: [
          { label: "Short technical documents", note: "Datasheets, single guides, specifications", time: "2–3 business days" },
          { label: "Manuals and documentation sets", note: "Full manuals, structured content, multiple deliverables", time: "Depends on volume and complexity" },
          { label: "Multilingual documentation programmes", note: "Several languages, ongoing revisions, DTP included", time: "Scoped before quoting" },
        ],
      }}
      advice={{
        kicker: "Getting the best result",
        heading: "What helps a technical project go well",
        items: [
          <><strong>Send your existing terminology.</strong> A glossary, a termbase or previously approved translations save time and produce a better result than anything we could invent.</>,
          <><strong>Send source files, not PDFs, where possible.</strong> An InDesign or XML source returns as a usable file; a PDF has to be rebuilt.</>,
          <><strong>Tell us the target markets.</strong> Regulatory and safety wording differs between them, and knowing early avoids rework.</>,
          <><strong>Flag which content is prescribed.</strong> If certain warnings must use specific wording, mark them so nobody improves them.</>,
          <><strong>Plan for updates.</strong> Documentation changes; translation memory makes later revisions inexpensive if the first project is set up properly.</>,
        ],
      }}
      related={[
        { h: "Medical Translation", p: "Device documentation, IFUs and regulatory material.", href: "/services/medical-translation" },
        { h: "Website Localization", p: "Software interfaces, help content and product portals.", href: "/services/website-localization" },
        { h: "Legal Translation", p: "Patents, contracts and compliance documentation.", href: "/services/legal-translation" },
        { h: "Industries we serve", p: "Manufacturing, engineering, technology and life sciences.", href: "/industries" },
      ]}
      faqs={faqs}
      cta={{
        title: "Start your technical project",
        body: "Send your files and any existing terminology, and a Project Coordinator will scope the work properly before quoting. Most requests are reviewed within 30–60 minutes during business hours.",
      }}
    />
  );
}
