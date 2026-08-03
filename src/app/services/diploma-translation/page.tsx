import type { Metadata } from "next";

import { DocumentPage } from "@/features/services/document-page";
import "@/styles/pillar.css";

const PATH = "/services/diploma-translation";

export const metadata: Metadata = {
  title: "Diploma and Degree Translation — Certified for Universities and Licensing",
  description:
    "Certified diploma and degree translation with a signed Certificate of Accuracy, prepared for university admissions, credential evaluation, professional licensing and immigration. Typically 1–2 business days.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Diploma Translation — Translation Windows",
    description:
      "Certified diploma and degree translation for admissions, credential evaluation and professional licensing.",
    url: PATH, type: "article",
  },
};

const faqs = [
  { q: "Do universities accept translated diplomas?",
    a: "Universities generally require a certified translation alongside the original, and many also require a credential evaluation from a recognised agency. The translation and the evaluation are different things: we translate the document faithfully; an evaluator judges what the qualification is equivalent to. Most evaluators require a certified translation before they will begin." },
  { q: "Should the degree title be translated or kept in the original language?",
    a: "This is the central judgement in academic translation, and translating too freely does real harm. A Licenciatura, a Diplom-Ingenieur and a Maîtrise are not simply Bachelor or Master degrees, and rendering them that way asserts an equivalence that is not the translator's to decide. We translate the title faithfully and, where useful, retain the original term alongside so an evaluator can make their own assessment." },
  { q: "Do you translate transcripts as well?",
    a: "Yes, and they are usually needed together. A diploma states that a degree was awarded; a transcript shows what was studied and how it was graded. Credential evaluators almost always want both, and translating them as a set keeps course titles and grading terminology consistent." },
  { q: "What about grades and grading scales?",
    a: "Grades are reproduced as they appear, not converted. A 1.3 in the German system and a 4.0 in the American one are not interchangeable, and converting them silently would misrepresent the record. Where a transcript includes an explanatory scale, we translate that too so the reader can interpret it correctly." },
  { q: "How long does it take?",
    a: "A single diploma is typically delivered within 1–2 business days. A diploma with a full transcript is usually 2–3 business days, since transcripts are longer and course titles need care." },
  { q: "Does it need to be notarized?",
    a: "Usually not. Universities and credential evaluators generally require certification with a signed Certificate of Accuracy. Some licensing boards ask for notarization — tell us the receiving organization and we will advise." },
  { q: "My diploma is old and the seal is faded. Can you still translate it?",
    a: "Usually yes. Older diplomas often use ornate script, Latin phrasing and embossed seals that photograph poorly. Try a flat, well-lit photograph without flash. Where something is genuinely illegible we flag it rather than invent a reading." },
  { q: "I need this for professional licensing rather than study. Is that different?",
    a: "The translation is the same, but licensing boards are often stricter about completeness and may require the transcript, syllabus descriptions or proof of clinical hours as well. Tell us the board and the profession so we can prepare the full set correctly." },
];

export default function Page() {
  return (
    <DocumentPage
      path={PATH}
      crumb="Diploma Translation"
      eyebrow="Certified Diploma and Degree Translation"
      title="Academic credentials, translated without overstating them."
      lead={
        <>
          Certified translation of diplomas, degrees and academic certificates for university
          admissions, credential evaluation, professional licensing and immigration — with a signed
          Certificate of Accuracy and no invented equivalences.
        </>
      }
      schemaName="Diploma Translation"
      schemaDescription="Certified diploma and degree translation with a signed Certificate of Accuracy, prepared for university admissions, credential evaluation, professional licensing and immigration."
      serviceType="Certified Academic Document Translation"
      intro={{
        kicker: "The central difficulty",
        heading: "Translating a qualification is not the same as equating it",
        body: (
          <>
            <p className="pw-lead">
              The hardest part of academic translation is resisting the urge to be helpful. A
              Spanish <em>Licenciatura</em>, a German <em>Diplom-Ingenieur</em> and a French{" "}
              <em>Maîtrise</em> all sit somewhere near an American bachelor or master degree — but
              none of them maps cleanly, and deciding which is which is not the translator&rsquo;s
              job.
            </p>
            <p>
              That decision belongs to a credential evaluator, an admissions office or a licensing
              board. A translation that quietly converts <em>Licenciatura</em> into
              &ldquo;Bachelor of Arts&rdquo; has made a judgement it had no standing to make, and
              an evaluator who notices will trust the rest of the document less.
            </p>
            <p>
              So we translate faithfully and, where it helps the reader, keep the original term
              alongside. The same discipline applies to grades: a 1.3 and a 4.0 are not
              interchangeable, and converting between grading systems is interpretation, not
              translation.
            </p>
          </>
        ),
      }}
      points={{
        kicker: "What you receive",
        heading: "What a proper academic translation includes",
        items: [
          { h: "Degree titles translated, not converted", p: "Faithful rendering, with the original term retained where it helps an evaluator assess equivalence for themselves." },
          { h: "Grades reproduced as awarded", p: "Including any grading scale printed on the document, so the reader can interpret the marks correctly." },
          { h: "Institution names handled carefully", p: "University names are usually retained in the original with a translation alongside, since the institution is a proper noun and a searchable entity." },
          { h: "Seals, signatures and honours", p: "Including Latin honours, accreditation marks and registrar signatures, described where they cannot be translated." },
          { h: "Layout preserved", p: "So the translation can be read beside the original — particularly important for transcripts, where a misaligned table is unusable." },
          { h: "A signed Certificate of Accuracy", p: "Naming the translator and confirming the translation is complete and accurate." },
        ],
      }}
      uses={{
        kicker: "Where it is needed",
        heading: "What people use these translations for",
        items: [
          { h: "University admissions", p: "Undergraduate, graduate and doctoral applications from international candidates." },
          { h: "Credential evaluation", p: "WES, ECE and other evaluators generally require a certified translation before assessing." },
          { h: "Professional licensing", p: "Medical, engineering, legal, teaching and accountancy boards." },
          { h: "Employment verification", p: "Where an employer or background-check provider requires evidence of qualifications." },
          { h: "Immigration applications", p: "Skilled worker petitions and points-based assessments.", href: "/services/uscis-translation" },
          { h: "Further study abroad", p: "Exchange programmes, research placements and scholarship applications." },
        ],
      }}
      timing={{
        rows: [
          { label: "Single diploma or degree certificate", note: "One page, clear scan", time: "1–2 business days" },
          { label: "Diploma with full transcript", note: "Multi-page academic record with course listings", time: "2–3 business days" },
          { label: "Full credential set", note: "Several qualifications, syllabus descriptions, licensing evidence", time: "Depends on volume and complexity" },
        ],
      }}
      advice={{
        kicker: "Practical advice",
        heading: "Before you send your documents",
        items: [
          <><strong>Send the transcript with the diploma.</strong> Evaluators almost always want both, and translating them together keeps course titles consistent.</>,
          <><strong>Include the grading scale.</strong> Often printed on the reverse of a transcript, and essential for interpreting the marks.</>,
          <><strong>Photograph seals flat and without flash.</strong> Embossed seals disappear at an angle or under direct light.</>,
          <><strong>Tell us the receiving organization.</strong> A credential evaluator, a licensing board and an admissions office have different expectations.</>,
          <><strong>Say if a name has changed.</strong> Where a diploma predates a marriage or a legal name change, mention it so the record can be reconciled.</>,
        ],
      }}
      related={[
        { h: "Transcript Translation", p: "Course listings, grades and academic records in detail.", href: "/services/transcript-translation" },
        { h: "Certified Translation", p: "What certification means and which documents require it.", href: "/services/certified-translation" },
        { h: "USCIS Translation", p: "Academic credentials in immigration applications.", href: "/services/uscis-translation" },
        { h: "Languages we cover", p: "230+ combinations across every major education system.", href: "/languages" },
      ]}
      faqs={faqs}
      cta={{
        title: "Translate your diploma",
        body: "Upload your diploma and transcript together and a Project Coordinator will review them and prepare an accurate quotation. Most requests are reviewed within 30–60 minutes during business hours.",
      }}
    />
  );
}
