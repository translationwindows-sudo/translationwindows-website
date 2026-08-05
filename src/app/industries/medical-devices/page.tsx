import type { Metadata } from "next";

import { DocumentPage } from "@/features/services/document-page";
import "@/styles/pillar.css";

const PATH = "/industries/medical-devices";

export const metadata: Metadata = {
  title: "Translation for Medical Device Manufacturers — IFUs and Technical Files",
  description:
    "Translation for medical device manufacturers: instructions for use, labelling, clinical evaluation and technical files. Terminology control across every market and document.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Medical Device Translation — Translation Windows",
    description: "Translation for IFUs, labelling, clinical evaluation and device technical files.",
    url: PATH, type: "article",
  },
};

const faqs = [
  { q: "Which markets do you cover for device documentation?",
    a: "We work across 230+ language combinations, which covers every EU official language plus the major Asian, Middle Eastern and Latin American markets. Tell us which markets you are entering and we will confirm coverage before you commit to a timeline — including whether any require a specific approach to terminology." },
  { q: "Do you understand that some wording is prescribed rather than free text?",
    a: "Yes, and it shapes how we handle the work. Warning phrasing, symbol descriptions and certain regulatory statements are defined by the standard or the receiving market. Improving them is not an improvement. Mark anything prescribed when you send it and it will be used exactly as specified." },
  { q: "How do you keep terminology identical across a documentation set?",
    a: "A device generates a manual, a quick-reference guide, labelling, packaging, training material and often an app interface — and the same warning must read identically in all of them. A device-specific glossary is built at the outset and enforced by translation memory across every deliverable and every subsequent revision." },
  { q: "Can you handle our authoring formats?",
    a: "InDesign, FrameMaker, XML, DITA and structured content from most authoring systems, alongside Word and PDF. Send source files rather than PDFs where you can — a structured source returns as a usable file, whereas a PDF has to be rebuilt, which costs time and introduces error." },
  { q: "What about the layout when text expands?",
    a: "German runs roughly a third longer than English and Finnish longer still, while Chinese contracts. A layout built around English will break in at least one target market. Desktop publishing is part of the work: you receive files that are usable, not files somebody has to rebuild." },
  { q: "How are revisions handled?",
    a: "Translation memory means a revision touches only what changed. When an IFU is updated, the unchanged sections stay identical to what is already in market — which matters for regulatory consistency as much as for cost." },
  { q: "Do you translate clinical evaluation material?",
    a: "Yes — clinical evaluation reports, literature reviews, post-market surveillance documentation and material forming part of a technical file. This work is assigned to linguists experienced in clinical and regulatory texts rather than general technical translators." },
  { q: "What is your turnaround on device documentation?",
    a: "It depends on volume, format complexity and how much DTP is involved. A short IFU update is quick; a full documentation set across twelve languages is scoped before quoting so the date reflects the actual work rather than an optimistic estimate." },
];

export default function Page() {
  return (
    <DocumentPage
      path={PATH}
      crumb="Medical Devices"
      eyebrow="Translation for Device Manufacturers"
      title="Device documentation, where consistency is a regulatory expectation."
      lead={
        <>
          Instructions for use, labelling, clinical evaluation and technical files — translated
          with controlled terminology across every market, prescribed wording respected, and
          layouts that survive the target language.
        </>
      }
      schemaName="Medical Device Translation"
      schemaDescription="Translation services for medical device manufacturers covering instructions for use, labelling, packaging, clinical evaluation reports and technical documentation."
      serviceType="Medical Device Documentation Translation"
      intro={{
        kicker: "What makes it different",
        heading: "The same sentence, identically, in eleven places",
        body: (
          <>
            <p className="pw-lead">
              A single device produces a remarkable amount of text: an instructions-for-use
              document, a quick-reference card, labelling, packaging, training material, service
              documentation, often an app interface. A warning that appears in six of them must
              read identically in all six, in every market.
            </p>
            <p>
              That is a terminology management problem before it is a translation one, and it is
              where most device localization quietly goes wrong. Different translators, different
              months, different files — and the warning on the label no longer matches the warning
              in the manual. A notified body will notice.
            </p>
            <p>
              The second constraint is that some wording is not yours to improve. Symbol
              descriptions, certain warnings and regulatory statements are prescribed by the
              standard or the market. A translator producing more elegant phrasing has produced a
              compliance problem.
            </p>
          </>
        ),
      }}
      points={{
        kicker: "How we work",
        heading: "What device manufacturers get from us",
        items: [
          { h: "A device glossary before translation begins", p: "Component names, warnings and recurring phrasing fixed once, then enforced across every deliverable and every revision." },
          { h: "Prescribed wording used verbatim", p: "Mark what is mandated and it is reproduced exactly, not rewritten to read better." },
          { h: "Clinically experienced linguists", p: "Assigned by familiarity with regulatory and clinical texts rather than general technical translation." },
          { h: "Structure preserved", p: "XML, DITA and structured authoring formats return with markup intact rather than flattened into prose." },
          { h: "Layout adjusted per language", p: "Text that expands a third in German cannot sit in a box built for English. DTP is part of the work." },
          { h: "Revisions cost what changed", p: "Translation memory means an IFU update touches new content only, and the rest stays identical to what is in market." },
        ],
      }}
      uses={{
        kicker: "What we translate",
        heading: "Device documentation we handle",
        items: [
          { h: "Instructions for use", p: "Full IFUs, quick-reference guides and patient-facing versions.", href: "/services/medical-translation" },
          { h: "Labelling and packaging", p: "Where wording and symbols are frequently market-specific." },
          { h: "Clinical evaluation reports", p: "Literature reviews and post-market surveillance documentation." },
          { h: "Technical files", p: "Material forming part of a conformity assessment submission." },
          { h: "Service and maintenance manuals", p: "For field engineers and authorised service partners.", href: "/services/technical-translation" },
          { h: "Training material", p: "For clinicians, distributors and internal teams." },
          { h: "Software and app interfaces", p: "Companion applications and embedded device interfaces.", href: "/services/website-localization" },
          { h: "Regulatory correspondence", p: "Submissions, queries and responses to notified bodies." },
        ],
      }}
      timing={{
        rows: [
          { label: "Short documents and updates", note: "IFU revisions, single labels, brief guides", time: "2–3 business days" },
          { label: "Full documentation sets", note: "Manual, labelling, training and quick-reference together", time: "Depends on volume and complexity" },
          { label: "Multi-market programmes", note: "Several languages, DTP, ongoing revision cycles", time: "Scoped before quoting" },
        ],
      }}
      related={[
        { h: "Medical Translation", p: "Clinical records, patient material and regulatory documents.", href: "/services/medical-translation" },
        { h: "Technical Translation", p: "Manuals, specifications and engineering documentation.", href: "/services/technical-translation" },
        { h: "Website Localization", p: "Product sites, portals and companion applications.", href: "/services/website-localization" },
        { h: "Healthcare", p: "Providers, clinics and patient-facing material.", href: "/industries/healthcare" },
      ]}
      faqs={faqs}
      cta={{
        title: "Discuss your documentation",
        body: "Tell us the device, the markets and the formats you author in. A Project Coordinator will scope the programme properly before quoting.",
      }}
    />
  );
}
