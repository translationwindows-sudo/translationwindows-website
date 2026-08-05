import type { Metadata } from "next";

import { DocumentPage } from "@/features/services/document-page";
import "@/styles/pillar.css";

const PATH = "/industries/law-firms";

export const metadata: Metadata = {
  title: "Translation for Law Firms — Litigation, Discovery and Cross-Border Matters",
  description:
    "Translation services for law firms and corporate counsel: discovery, evidence, contracts, foreign judgments and court filings. Confidential handling, consistent terminology across the matter.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Translation for Law Firms — Translation Windows",
    description: "Translation for litigation, discovery, contracts and cross-border matters.",
    url: PATH, type: "article",
  },
};

const faqs = [
  { q: "Can you sign our firm's confidentiality agreement?",
    a: "Yes. Send it before work begins and we will review and sign it. Our default handling is already restrictive — documents stored outside public paths, access limited to the coordinator and assigned linguists, and linguists who see the documents and deadline but not the client identity — but if your firm or your client requires specific terms, we work to those." },
  { q: "How do you handle volume in discovery?",
    a: "Large sets are scoped before work begins so that terminology, formatting and file naming are consistent across the whole production. Where a matter involves several source languages, a single glossary governs all of them. Tell us the volume, the languages and the deadline and we will give you a realistic assessment rather than an optimistic one." },
  { q: "Will terminology stay consistent across a matter running for years?",
    a: "That is what translation memory and a matter glossary exist for. Defined terms, party names, contractual language and previously filed renderings stay identical from the first exhibit to the last, regardless of which linguist works on a given batch or how many months separate them." },
  { q: "Do you provide certified translations for filing?",
    a: "Yes, with a signed Certificate of Accuracy naming the translator and confirming the translation is complete and accurate. Requirements vary by jurisdiction — some courts want notarization or a declaration in a specific form. Tell us the court and we will prepare it accordingly." },
  { q: "Can you meet a filing deadline?",
    a: "Tell us the date at the outset and we will confirm whether it is achievable. We would rather decline a matter than accept it and miss a court deadline, and we will say so plainly if the timeline is not realistic for the volume involved." },
  { q: "Do you work with foreign judgments and arbitration material?",
    a: "Yes — foreign judgments for recognition and enforcement, arbitration filings, letters rogatory, evidence from foreign proceedings and corporate records. Cross-border matters frequently involve several jurisdictions and languages at once, which is where a single point of coordination matters most." },
  { q: "How is billing handled for ongoing matters?",
    a: "Per project, with a quotation before work begins so there is no ambiguity about cost. For firms with continuing work we can agree payment terms rather than requiring payment on each matter — tell your coordinator and it will be set on your account." },
  { q: "Who actually sees our documents?",
    a: "The Project Coordinator responsible for your matter and the linguists assigned to it. Assigned linguists receive the documents, the language pair, the deadline and a brief — not the client name, the fee, or anything else held in our system. Every action on a project is recorded with the person and the time." },
];

export default function Page() {
  return (
    <DocumentPage
      path={PATH}
      crumb="Law Firms"
      eyebrow="Translation for Legal Practice"
      title="Translation for firms working across borders."
      lead={
        <>
          Discovery, evidence, contracts, foreign judgments and filings — handled with the
          confidentiality privileged material requires and terminology consistent across the whole
          matter, however long it runs.
        </>
      }
      schemaName="Translation Services for Law Firms"
      schemaDescription="Translation services for law firms and corporate counsel covering litigation support, discovery, evidence, contracts, foreign judgments and certified court filings."
      serviceType="Legal Translation for Law Firms"
      intro={{
        kicker: "What firms need",
        heading: "Litigation is where inconsistency becomes expensive",
        body: (
          <>
            <p className="pw-lead">
              A firm commissioning translation is rarely buying words. It is buying the assurance
              that a document can be relied upon in front of a court, an arbitrator or opposing
              counsel — all of whom are reading adversarially and looking for exactly the
              discrepancy an inconsistent translation creates.
            </p>
            <p>
              The characteristic failure on long matters is not a mistranslation. It is drift. A
              defined term rendered one way in an early exhibit and differently in a later filing,
              because six months and three translators separated them. Explaining that to a judge
              costs considerably more than preventing it would have.
            </p>
            <p>
              The second requirement is discretion that is structural rather than promised. Our
              linguists never see whose matter they are working on — they receive documents,
              languages, a deadline and a brief. Not because they would misuse it, but because the
              information should not be available to misuse.
            </p>
          </>
        ),
      }}
      points={{
        kicker: "How we work with firms",
        heading: "What legal practices get from us",
        items: [
          { h: "A matter glossary from the outset", p: "Defined terms, party names and key phrasing fixed before translation begins, then enforced across every subsequent document." },
          { h: "Linguists who cannot see the client", p: "Assigned translators receive documents, languages, deadline and brief. Client identity and commercial detail stay in the coordination layer." },
          { h: "Certified translations for filing", p: "Signed Certificate of Accuracy, prepared to the requirements of the receiving court or tribunal." },
          { h: "Volume handled as a production", p: "Discovery sets scoped as a whole so naming, formatting and terminology are uniform throughout." },
          { h: "An auditable record", p: "Every action on a project recorded with the person and the time — useful when a matter is examined long afterwards." },
          { h: "Honest deadline assessment", p: "If a filing date is not achievable at the volume involved, we say so before accepting rather than after missing it." },
        ],
      }}
      uses={{
        kicker: "What we translate",
        heading: "Work we handle for firms",
        items: [
          { h: "Discovery and evidence", p: "Correspondence, records and exhibits at volume, with uniform treatment.", href: "/services/legal-translation" },
          { h: "Contracts and agreements", p: "Commercial, employment, licensing and shareholder documents." },
          { h: "Court filings and pleadings", p: "Complaints, motions, briefs and responses prepared for filing." },
          { h: "Foreign judgments and orders", p: "For recognition, enforcement and comparative analysis." },
          { h: "Affidavits and declarations", p: "Sworn statements requiring precise, defensible rendering." },
          { h: "Corporate and due diligence", p: "Articles, resolutions, registers and transaction documents." },
          { h: "Immigration matters", p: "Certified civil documents for family and employment petitions.", href: "/services/uscis-translation" },
          { h: "Medical records in injury claims", p: "Clinical evidence in personal injury and negligence matters.", href: "/services/medical-translation" },
        ],
      }}
      timing={{
        rows: [
          { label: "Short certified documents", note: "Affidavits, powers of attorney, single certificates", time: "1–2 business days" },
          { label: "Standard legal documents", note: "Contracts, pleadings, judgments", time: "2–3 business days" },
          { label: "Discovery and case bundles", note: "High volume, multiple languages, ongoing production", time: "Scoped before quoting" },
        ],
        footnote: (
          <>
            Larger or more complex matters may require additional review time. If you are working
            to a filing deadline, tell us at the outset — we would rather decline than miss it.
          </>
        ),
      }}
      related={[
        { h: "Legal Translation", p: "The service in detail: contracts, filings and evidence.", href: "/services/legal-translation" },
        { h: "Certified Translation", p: "When a court or tribunal requires certification.", href: "/services/certified-translation" },
        { h: "Medical Translation", p: "Clinical records in personal injury and negligence work.", href: "/services/medical-translation" },
        { h: "Court requirements reference", p: "Certification and notarization rules across US courts and agencies.", href: "/resources/court-translation-requirements" },
      ]}
      faqs={faqs}
      cta={{
        title: "Discuss a matter with us",
        body: "Tell us the volume, languages and deadline and a Project Coordinator will assess it honestly before quoting. Confidentiality agreements can be signed before any document is sent.",
      }}
    />
  );
}
