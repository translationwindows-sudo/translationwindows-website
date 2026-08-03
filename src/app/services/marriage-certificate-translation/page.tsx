import type { Metadata } from "next";

import { DocumentPage } from "@/features/services/document-page";
import "@/styles/pillar.css";

const PATH = "/services/marriage-certificate-translation";

export const metadata: Metadata = {
  title: "Marriage Certificate Translation — Certified for USCIS and Legal Use",
  description:
    "Certified marriage certificate translation with a signed Certificate of Accuracy, prepared for USCIS spousal petitions, name changes and legal matters. Typically delivered in 1–2 business days.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Marriage Certificate Translation — Translation Windows",
    description:
      "Certified marriage certificate translation with a signed Certificate of Accuracy, typically delivered in 1–2 business days.",
    url: PATH, type: "article",
  },
};

const faqs = [
  { q: "Do I need my marriage certificate translated for a green card application?",
    a: "If the certificate is not in English, yes. Spousal petitions rest on proving the marriage is genuine and legally valid, and the certificate is the primary evidence of that. It must be translated in full and accompanied by a signed Certificate of Accuracy." },
  { q: "What if we married abroad and the certificate looks unusual?",
    a: "That is normal. Marriage records vary enormously — some are single certificates, others are extracts from a family register or a religious record with civil registration noted separately. Send everything you were given rather than only the page that looks most official; missing the registration annotation is a common problem." },
  { q: "Does the translation need to be notarized?",
    a: "Generally not for USCIS, which requires certification rather than notarization. Some state agencies and foreign consulates do ask for it. Tell us who will receive the document and we will advise rather than let you pay for something unnecessary." },
  { q: "My spouse's name is spelled differently on our other documents. Is that a problem?",
    a: "It is worth flagging before we start. Transliteration between alphabets rarely has one correct answer, and a name may legitimately appear several ways. What matters is that your documents agree with each other and with the passports. We keep names consistent across every document in a set." },
  { q: "How long does it take?",
    a: "Marriage certificates are typically delivered within 1–2 business days. If you are submitting several documents together — marriage, birth, divorce decrees — allow 2–3 business days for the set so terminology and names stay consistent throughout." },
  { q: "Do you translate divorce decrees as well?",
    a: "Yes, and they are frequently needed alongside a marriage certificate where either party was previously married. USCIS expects evidence that earlier marriages were legally terminated, so the decree is usually part of the same submission." },
  { q: "What about religious marriage documents?",
    a: "We translate them, and they often matter. Where a religious ceremony was later civilly registered, the receiving organization usually wants both. Where it was not, the religious record may not establish legal validity on its own — worth understanding before you submit." },
  { q: "Can I use a photograph of the certificate?",
    a: "Yes, provided everything is legible — including seals, registration numbers, and anything on the reverse. Photograph the whole page flat and in good light. If part is unclear we will ask for a better copy rather than guess." },
];

export default function Page() {
  return (
    <DocumentPage
      path={PATH}
      crumb="Marriage Certificate Translation"
      eyebrow="Certified Marriage Certificate Translation"
      title="Marriage certificates, translated for applications that depend on them."
      lead={
        <>
          A signed Certificate of Accuracy with every translation, prepared for USCIS spousal
          petitions, name changes and legal proceedings. Typically delivered within 1–2 business
          days, across 230+ language combinations.
        </>
      }
      schemaName="Marriage Certificate Translation"
      schemaDescription="Certified marriage certificate translation with a signed Certificate of Accuracy, prepared for USCIS spousal petitions, name changes and legal matters."
      serviceType="Certified Marriage Certificate Translation"
      intro={{
        kicker: "Why it matters",
        heading: "The document a spousal petition rests on",
        body: (
          <>
            <p className="pw-lead">
              A marriage certificate is rarely translated out of curiosity. It is translated
              because an application depends on it — a green card petition, a name change, an
              inheritance claim, a pension entitlement. Whoever receives it is checking that the
              marriage was legally valid, when and where it took place, and that the two people
              named are the two people applying.
            </p>
            <p>
              Marriage records also vary more than any other civil document. Some countries issue
              a single certificate. Others record marriages in a family register, so what you hold
              is an extract rather than a certificate. In several jurisdictions a religious ceremony
              is registered separately, and the civil registration appears as an annotation in the
              margin — easy to overlook, and precisely what establishes legal validity.
            </p>
            <p>
              This is why we ask to see everything you were given rather than the page that looks
              most official. A missing annotation is a far more common problem than a mistranslated
              word.
            </p>
          </>
        ),
      }}
      points={{
        kicker: "What you receive",
        heading: "What a proper certified translation includes",
        items: [
          { h: "The complete record, front and back", p: "Including registration numbers, marginal annotations, amendment notes and anything printed on the reverse. Partial translations are not certified translations." },
          { h: "Seals and stamps accounted for", p: "Translated where possible, described in brackets where not — [Round seal: Civil Registry, Warsaw]. Every mark on the page is explained." },
          { h: "Names matched to your other documents", p: "Where a surname is transliterated from another alphabet, we use the spelling that appears on your passport so your documents agree with one another." },
          { h: "Dates in an unambiguous format", p: "A date written 03/04 means two different things in two countries. Ambiguity in a marriage date is not something to leave to the reader." },
          { h: "A signed Certificate of Accuracy", p: "Naming the translator, identifying the languages and the document, and confirming the translation is complete and accurate." },
        ],
      }}
      uses={{
        kicker: "Where it is needed",
        heading: "What people use these translations for",
        items: [
          { h: "USCIS spousal petitions", p: "Form I-130 and adjustment of status, where the certificate is primary evidence of a genuine marriage.", href: "/services/uscis-translation" },
          { h: "Name change applications", p: "Where a married name must be evidenced for a passport, licence or bank." },
          { h: "Divorce and family proceedings", p: "Establishing the date and place of a marriage in court.", href: "/services/legal-translation" },
          { h: "Inheritance and probate", p: "Proving spousal relationship in cross-border estates." },
          { h: "Pension and benefits claims", p: "Where a surviving spouse must evidence the marriage." },
          { h: "Consular and citizenship applications", p: "For dual nationality, family reunification and residency." },
        ],
      }}
      timing={{
        rows: [
          { label: "Single marriage certificate", note: "Clear scan, common language pair", time: "1–2 business days" },
          { label: "Marriage with supporting documents", note: "Birth certificates, divorce decrees, passports as one set", time: "2–3 business days" },
          { label: "Historical or handwritten records", note: "Older registers, faded script, archaic terminology", time: "Depends on legibility and complexity" },
        ],
      }}
      advice={{
        kicker: "Practical advice",
        heading: "Before you send your certificate",
        items: [
          <><strong>Send every page you were given.</strong> Extracts, annexes and register extracts often carry the registration detail that establishes validity.</>,
          <><strong>Include the reverse.</strong> Annotations, apostilles and amendment notes are frequently on the back.</>,
          <><strong>Add the divorce decree if either party was married before.</strong> USCIS will ask for it, and translating both together keeps names consistent.</>,
          <><strong>Tell us the passport spellings.</strong> For both spouses, so the translation matches your existing documents.</>,
          <><strong>Say what it is for.</strong> A consulate, a court and USCIS have slightly different expectations.</>,
        ],
      }}
      related={[
        { h: "USCIS Translation", p: "What immigration applications require, and the mistakes that cause delays.", href: "/services/uscis-translation" },
        { h: "Birth Certificate Translation", p: "Usually needed alongside a marriage certificate.", href: "/services/birth-certificate-translation" },
        { h: "Certified Translation", p: "What certification means and which documents require it.", href: "/services/certified-translation" },
        { h: "Legal Translation", p: "Divorce decrees, court orders and family law documents.", href: "/services/legal-translation" },
      ]}
      faqs={faqs}
      cta={{
        title: "Translate your marriage certificate",
        body: "Upload a clear scan of every page and a Project Coordinator will review it and prepare an accurate quotation. Most requests are reviewed within 30–60 minutes during business hours.",
      }}
    />
  );
}
