import type { Metadata } from "next";

import { DocumentPage } from "@/features/services/document-page";
import "@/styles/pillar.css";

const PATH = "/industries/immigration-law";

export const metadata: Metadata = {
  title: "Translation for Immigration Attorneys — Certified Evidence and Filings",
  description:
    "Certified translation for immigration practices: civil documents, country condition evidence, court records and asylum declarations. Consistent naming across a case file, signed Certificate of Accuracy.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Translation for Immigration Attorneys — Translation Windows",
    description: "Certified translation for immigration filings, evidence and asylum documentation.",
    url: PATH, type: "article",
  },
};

const faqs = [
  { q: "Can you handle a full evidence bundle rather than single documents?",
    a: "Yes, and it is usually better. Submitting a bundle as one project keeps names, dates and place names consistent across every document, which matters when an officer is cross-checking a birth certificate against a passport against a marriage record. Piecemeal translation by different providers is where discrepancies creep in." },
  { q: "How do you keep name transliterations consistent across a case?",
    a: "Translation memory holds every decision made on a matter. When a surname is rendered a particular way on the first document, it stays that way across everything else — including documents translated months later for a supplementary filing. Tell us the passport spelling at the outset and we match it." },
  { q: "Do you translate country condition evidence?",
    a: "Yes — news reports, human rights documentation, government publications and expert material used in asylum and withholding cases. This work often involves several source languages and unfamiliar dialects; tell us what you have and we will confirm coverage before you commit to a filing date." },
  { q: "Can you work to a filing deadline?",
    a: "Tell us the date when you send the work and we will confirm whether it is achievable. If the volume makes it unrealistic we will say so before accepting rather than after missing it — a translation that arrives late is worse than one you sourced elsewhere." },
  { q: "What certification do you provide?",
    a: "A signed Certificate of Accuracy with every certified translation, naming the translator, identifying the languages and the document, and confirming the translation is complete and accurate. That is what USCIS requires. Where an immigration court or a consulate asks for notarization, we can arrange it." },
  { q: "Do you handle handwritten and poor-quality documents?",
    a: "Frequently. Older civil records, rural registry entries and documents that have been photocopied repeatedly are routine in immigration work. Where something is genuinely illegible we flag it in the translation rather than guessing, because an invented reading in evidence is worse than an acknowledged gap." },
  { q: "How is client confidentiality handled?",
    a: "Documents are stored outside any publicly accessible path, with access limited to the coordinator and assigned linguists. Assigned translators see the documents, languages and deadline — not the client name or the nature of the case. If your firm requires a specific confidentiality undertaking, send it before work begins." },
  { q: "Can you provide declarations about the translation if challenged?",
    a: "The Certificate of Accuracy accompanying each translation names the translator and states their competence. If a translation we prepared is questioned, tell your coordinator and we will address it — including preparing a supplementary declaration where the situation calls for one." },
];

export default function Page() {
  return (
    <DocumentPage
      path={PATH}
      crumb="Immigration Law"
      eyebrow="Translation for Immigration Practices"
      title="Translation for practices where a discrepancy costs months."
      lead={
        <>
          Certified civil documents, court records, country condition evidence and asylum
          declarations — with names and dates consistent across the entire case file, and a signed
          Certificate of Accuracy on everything certified.
        </>
      }
      schemaName="Translation Services for Immigration Attorneys"
      schemaDescription="Certified translation services for immigration law practices covering civil documents, evidence bundles, country condition material, court records and asylum documentation."
      serviceType="Immigration Legal Translation"
      intro={{
        kicker: "What is actually at stake",
        heading: "The failure mode is inconsistency, not mistranslation",
        body: (
          <>
            <p className="pw-lead">
              Immigration filings rarely fail because a word was translated badly. They stall
              because a surname appears one way on a birth certificate and another on a marriage
              record, or a place name is transliterated differently across two documents, and an
              officer now has to satisfy themselves that these are the same person.
            </p>
            <p>
              That question costs weeks. Sometimes it produces a Request for Evidence, and
              answering one is more work than preventing it would have been.
            </p>
            <p>
              The cause is almost always fragmentation. A client brings three documents translated
              at different times by different people — a cousin, an agency abroad, a service found
              online. Each is individually defensible. Together they contradict one another.
            </p>
            <p>
              Translating a bundle as one project removes that entirely: one glossary, one set of
              decisions, applied to every document and held for whatever arrives later.
            </p>
          </>
        ),
      }}
      points={{
        kicker: "How we work with practices",
        heading: "What immigration attorneys get from us",
        items: [
          { h: "One naming decision per case", p: "Surnames, given names and place names fixed at the outset and applied to every document, including supplementary filings months later." },
          { h: "Bundles handled as bundles", p: "A full evidence set scoped as one project rather than a sequence of unrelated jobs." },
          { h: "Certification on everything required", p: "Signed Certificate of Accuracy naming the translator, as USCIS asks for. Notarization arranged where a court or consulate requires it." },
          { h: "Illegibility flagged, never invented", p: "Where a rural registry entry defeats us, the translation says so. A plausible guess in evidence is a liability." },
          { h: "Honest deadline assessment", p: "If a filing date is not achievable at the volume involved, we say so before accepting the work." },
          { h: "Linguists who cannot see the client", p: "Assigned translators receive documents, languages and a deadline — not the client name or the nature of the case." },
        ],
      }}
      uses={{
        kicker: "What we translate",
        heading: "Work we handle for immigration practices",
        items: [
          { h: "Civil documents", p: "Birth, marriage, divorce and death certificates for family petitions.", href: "/services/uscis-translation" },
          { h: "Police and background certificates", p: "Required for most consular processing and adjustment applications." },
          { h: "Academic credentials", p: "Diplomas and transcripts for employment-based petitions.", href: "/services/diploma-translation" },
          { h: "Country condition evidence", p: "News reports, human rights documentation and government publications." },
          { h: "Asylum declarations", p: "Personal statements and supporting testimony." },
          { h: "Foreign court records", p: "Judgments, custody orders and criminal records.", href: "/services/legal-translation" },
          { h: "Medical evidence", p: "Clinical documentation for hardship and humanitarian applications.", href: "/services/medical-translation" },
          { h: "Financial documentation", p: "Bank statements and employment letters for affidavits of support." },
        ],
      }}
      timing={{
        rows: [
          { label: "Single civil documents", note: "Birth, marriage or police certificates", time: "1–2 business days" },
          { label: "Standard case documents", note: "Court records, declarations, academic sets", time: "2–3 business days" },
          { label: "Full evidence bundles", note: "Multi-document filings, country conditions, several languages", time: "Scoped before quoting" },
        ],
        footnote: (
          <>
            Larger or more complex bundles may require additional review time. If you are working
            to a filing deadline, tell us at the outset — we would rather decline than miss it.
          </>
        ),
      }}
      related={[
        { h: "USCIS Translation", p: "The requirements in detail, and the mistakes that cause delays.", href: "/services/uscis-translation" },
        { h: "Legal Translation", p: "Court records, judgments and sworn documents.", href: "/services/legal-translation" },
        { h: "Birth Certificate Translation", p: "The document most often returned for correction.", href: "/services/birth-certificate-translation" },
        { h: "Court requirements reference", p: "What each court and agency requires, and where to verify it.", href: "/resources/court-translation-requirements" },
      ]}
      faqs={faqs}
      cta={{
        title: "Discuss a case with us",
        body: "Send the bundle and tell us the filing deadline. A Project Coordinator will assess it honestly before quoting, and confidentiality agreements can be signed first.",
      }}
    />
  );
}
