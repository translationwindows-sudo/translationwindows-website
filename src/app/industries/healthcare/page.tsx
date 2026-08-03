import type { Metadata } from "next";

import { DocumentPage } from "@/features/services/document-page";
import "@/styles/pillar.css";

const PATH = "/industries/healthcare";

export const metadata: Metadata = {
  title: "Translation for Healthcare — Patient Records, Clinics and Providers",
  description:
    "Translation for healthcare providers and clinics: patient records, discharge summaries, consent forms and patient-facing material. Confidential handling and clinically experienced linguists.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Translation for Healthcare — Translation Windows",
    description: "Translation for patient records, clinical documentation and patient-facing material.",
    url: PATH, type: "article",
  },
};

const faqs = [
  { q: "How is patient information protected?",
    a: "Documents are validated on upload and stored outside any publicly accessible path. Access is limited to the coordinator and the linguists assigned to the project, and those linguists receive the documents, languages and deadline — not the wider record held in our system. If your organization requires a specific data-handling agreement, send it and we will sign it before work begins." },
  { q: "Do your linguists have clinical experience?",
    a: "Medical work is assigned to linguists experienced in clinical texts, and the reason is practical rather than reputational. The recurring errors in medical translation are structural — units that resemble each other, negation lost in a long sentence, abbreviations that mean different things in different specialties, laterality. A capable generalist misses all four while producing fluent prose." },
  { q: "Can you translate records for a patient transferring care?",
    a: "Yes, and it is one of the more common requests. Histories, discharge summaries, medication lists and imaging reports translated for continuity of care between countries. Tell us the receiving clinician or system so we can match the level of detail expected." },
  { q: "Do you handle patient-facing material as well as clinical records?",
    a: "Yes — consent forms, aftercare instructions, appointment communication and patient education. These require a different register entirely from clinical notes. A consent form exists so a patient genuinely understands what they are agreeing to, and translating it in clinical language defeats that." },
  { q: "Is certification required for medical documents?",
    a: "It depends on the recipient. Insurers, courts and immigration authorities usually require certification with a signed Certificate of Accuracy. A clinician reading a history for treatment purposes generally does not. Ask before paying for certification nobody requested." },
  { q: "Can you translate handwritten clinical notes?",
    a: "Often, though legibility decides it. Handwritten notes remain common in older records and some healthcare systems. Where something is genuinely unreadable we flag it rather than guess — an invented reading in a medical record is worse than an acknowledged gap." },
  { q: "How quickly can you turn records around?",
    a: "Short records are typically 1–2 business days and standard document sets 2–3. If a patient is mid-transfer or a claim deadline is approaching, say so and we will tell you honestly what is achievable." },
  { q: "Do you work with interpreting as well as written translation?",
    a: "Our core service is written translation. For appointment interpreting, tell your Project Coordinator what you need and we will discuss whether we can help or point you to a more suitable provider — we would rather refer than take work we are not the best fit for." },
];

export default function Page() {
  return (
    <DocumentPage
      path={PATH}
      crumb="Healthcare"
      eyebrow="Translation for Healthcare Providers"
      title="Translation for clinics, hospitals and healthcare providers."
      lead={
        <>
          Patient records, clinical documentation, consent forms and patient-facing material —
          translated by linguists experienced in medical texts and handled with the confidentiality
          health information requires.
        </>
      }
      schemaName="Translation Services for Healthcare"
      schemaDescription="Translation services for healthcare providers, clinics and hospitals covering patient records, clinical documentation, consent forms and patient-facing material."
      serviceType="Healthcare Translation"
      intro={{
        kicker: "Two audiences",
        heading: "Clinical accuracy and patient comprehension are different tasks",
        body: (
          <>
            <p className="pw-lead">
              Healthcare translation serves two readers who need opposite things. A clinician
              reading a transferred patient history needs precision, abbreviation and the technical
              register of their field. A patient reading a consent form needs to understand, in
              plain language, what is about to happen to them.
            </p>
            <p>
              Writing both as though they had one audience fails both. A consent form rendered in
              clinical language is technically accurate and practically useless — the patient signs
              something they do not understand, which is precisely what consent is meant to
              prevent. A discharge summary rewritten in plain English loses the specificity the
              receiving clinician relies on.
            </p>
            <p>
              The other constant is that errors here can reach a patient. The recurring danger
              points are unglamorous and predictable: dosage units that resemble one another,
              negation lost in a long sentence, laterality reversed, an abbreviation that means one
              thing in cardiology and another in obstetrics. Every translation is read back against
              the original by a second linguist before it leaves.
            </p>
          </>
        ),
      }}
      points={{
        kicker: "How we work",
        heading: "What healthcare translation involves",
        items: [
          { h: "Register matched to the reader", p: "A discharge summary for a clinician and an aftercare sheet for a patient describe the same treatment in entirely different language." },
          { h: "Clinically experienced linguists", p: "Assigned by familiarity with medical texts, because the recurring errors are ones only experience catches." },
          { h: "Terminology held consistent", p: "Drug names, anatomical terms and recurring phrasing identical across every document in a patient record or a document set." },
          { h: "Second-linguist review", p: "Every translation read against the original before delivery. On clinical material this is not optional." },
          { h: "Confidentiality by structure", p: "Access limited to the assigned team; linguists see documents and deadlines rather than the wider record." },
          { h: "Honest flagging of illegibility", p: "Where handwriting or a poor scan defeats us, we say so rather than supply a plausible guess." },
        ],
      }}
      uses={{
        kicker: "What we translate",
        heading: "Healthcare documents we handle",
        items: [
          { h: "Patient records and histories", p: "Consultations, progress notes and referrals for continuity of care.", href: "/services/medical-translation" },
          { h: "Discharge summaries", p: "Where a patient continues treatment in another country." },
          { h: "Imaging and laboratory reports", p: "Radiology, pathology and diagnostic results." },
          { h: "Informed consent forms", p: "Written so the patient genuinely understands what they are agreeing to." },
          { h: "Aftercare and patient instructions", p: "Medication guidance, recovery instructions and follow-up." },
          { h: "Insurance and claims material", p: "Supporting evidence for cross-border claims." },
          { h: "Clinical trial documentation", p: "Protocols, participant material and site correspondence." },
          { h: "Patient education", p: "Leaflets, guides and preventive health material." },
        ],
      }}
      timing={{
        rows: [
          { label: "Short records", note: "Single reports, vaccination records, brief notes", time: "1–2 business days" },
          { label: "Standard clinical documents", note: "Discharge summaries, histories, claim files", time: "2–3 business days" },
          { label: "Large record sets", note: "Full patient files, trial documentation, multilingual material", time: "Depends on volume and complexity" },
        ],
      }}
      related={[
        { h: "Medical Translation", p: "The service in detail, including device documentation.", href: "/services/medical-translation" },
        { h: "Certified Translation", p: "When an insurer, court or agency requires certification.", href: "/services/certified-translation" },
        { h: "Legal Translation", p: "Medical evidence in injury and negligence matters.", href: "/services/legal-translation" },
        { h: "How we work", p: "Coordination, secure handling and project tracking.", href: "/platform" },
      ]}
      faqs={faqs}
      cta={{
        title: "Discuss your requirements",
        body: "Tell us what you need translated and for whom, and a Project Coordinator will scope it before quoting. Data-handling agreements can be signed before any document is sent.",
      }}
    />
  );
}
