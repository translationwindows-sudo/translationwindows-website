import type { Metadata } from "next";

import { DocumentPage } from "@/features/services/document-page";
import "@/styles/pillar.css";

const PATH = "/services/transcript-translation";

export const metadata: Metadata = {
  title: "Academic Transcript Translation — Certified for Evaluation and Admissions",
  description:
    "Certified academic transcript translation with a signed Certificate of Accuracy. Course titles, credits and grading scales rendered faithfully for credential evaluation, admissions and licensing.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Transcript Translation — Translation Windows",
    description:
      "Certified academic transcript translation for credential evaluation, university admissions and professional licensing.",
    url: PATH, type: "article",
  },
};

const faqs = [
  { q: "Will WES or another evaluator accept your translation?",
    a: "Credential evaluators require a complete, literal, certified translation of the transcript — not an interpretation and not a conversion of grades. That is precisely what we provide, including a signed Certificate of Accuracy. Evaluators also usually require the original transcript to reach them directly from the issuing institution; the translation accompanies it rather than replacing it." },
  { q: "Do you convert grades to a 4.0 GPA scale?",
    a: "No, deliberately. Converting grades is evaluation, not translation, and doing it in a translation would overstep. We reproduce grades exactly as awarded and translate any grading scale printed on the document, so the evaluator has what they need to make the conversion themselves. A translation that arrives pre-converted invites doubt about what else was altered." },
  { q: "How are course titles handled?",
    a: "Faithfully, and consistently. The same course appearing across several semesters is rendered identically every time — translation memory enforces that. Where a course title contains a term specific to the education system, we translate it and retain the original where it aids interpretation." },
  { q: "What about credits and contact hours?",
    a: "Reproduced as they appear. ECTS credits, semester hours and contact hours are different measures, and converting between them is the evaluator's task. We translate the labels so the reader knows which system they are looking at." },
  { q: "How long does a transcript take?",
    a: "A single-year transcript is typically 1–2 business days. A full degree transcript with several years of coursework is usually 2–3 business days, since course titles are numerous and consistency matters more than speed." },
  { q: "My transcript is dozens of pages. Does that change things?",
    a: "It changes the timeline rather than the approach. Long transcripts are scoped before quoting so the estimate is realistic. The advantage of length is that terminology becomes more consistent, not less — the same course names recur, and translation memory keeps them identical." },
  { q: "Do I need the diploma translated as well?",
    a: "Usually yes. The diploma proves the qualification was awarded; the transcript shows what was studied. Most evaluators and admissions offices ask for both, and translating them together keeps the degree title consistent across the two documents." },
  { q: "The transcript has notes and stamps in the margins. Are those included?",
    a: "Yes. Marginal notes often record transfers, repeated courses, academic standing or disciplinary matters, and they form part of the record. A transcript translated without them is incomplete, and an evaluator noticing an untranslated annotation will ask what it said." },
];

export default function Page() {
  return (
    <DocumentPage
      path={PATH}
      crumb="Transcript Translation"
      eyebrow="Certified Academic Transcript Translation"
      title="Transcripts, translated faithfully rather than interpreted."
      lead={
        <>
          Course titles, credits and grading scales rendered exactly as awarded, with a signed
          Certificate of Accuracy — prepared for credential evaluation, university admissions and
          professional licensing.
        </>
      }
      schemaName="Academic Transcript Translation"
      schemaDescription="Certified academic transcript translation with a signed Certificate of Accuracy, prepared for credential evaluation, university admissions and professional licensing."
      serviceType="Certified Academic Transcript Translation"
      intro={{
        kicker: "The discipline required",
        heading: "A transcript should arrive unconverted",
        body: (
          <>
            <p className="pw-lead">
              A transcript is a record, and the most valuable thing a translator can do with a
              record is leave it intact. The temptation — to convert grades into a familiar scale,
              to render a course title as its nearest local equivalent, to tidy an unusual credit
              system — makes the document easier to read and less trustworthy.
            </p>
            <p>
              Credential evaluators exist precisely to perform those conversions, and they need an
              unaltered source to work from. A transcript that arrives with grades already
              converted to a 4.0 scale raises an obvious question: what else was interpreted along
              the way?
            </p>
            <p>
              The real skill is consistency. A degree transcript may list two hundred courses
              across four years, many recurring with slight variations. Every instance of the same
              course must read identically, and every grading term must be rendered the same way
              from the first page to the last.
            </p>
          </>
        ),
      }}
      points={{
        kicker: "What you receive",
        heading: "What a proper transcript translation involves",
        items: [
          { h: "Grades exactly as awarded", p: "No conversion, no scaling, no interpretation. The evaluator receives the record as issued." },
          { h: "The grading scale translated", p: "Where the transcript explains its own marking system, that explanation is translated so the marks can be interpreted." },
          { h: "Course titles rendered consistently", p: "The same course reads identically wherever it appears, across every page and every semester." },
          { h: "Credits and hours labelled clearly", p: "ECTS, semester hours and contact hours are distinct measures; the label makes clear which is in use." },
          { h: "Marginal notes and annotations included", p: "Transfers, repeats, academic standing and administrative notes are part of the record." },
          { h: "Table structure preserved", p: "So the translation can be read line for line against the original — essential when a transcript runs to many pages." },
        ],
      }}
      uses={{
        kicker: "Where it is needed",
        heading: "What people use these translations for",
        items: [
          { h: "Credential evaluation", p: "WES, ECE, SpanTran and similar agencies require a certified literal translation." },
          { h: "University admissions", p: "Graduate and undergraduate applications, and transfer credit assessment." },
          { h: "Professional licensing", p: "Medical, nursing, engineering and teaching boards assessing coursework." },
          { h: "Diploma verification", p: "Alongside the degree certificate, which proves the award itself.", href: "/services/diploma-translation" },
          { h: "Immigration applications", p: "Skilled-worker and points-based assessments requiring evidence of study.", href: "/services/uscis-translation" },
          { h: "Employment screening", p: "Where an employer verifies academic history directly." },
        ],
      }}
      timing={{
        rows: [
          { label: "Single-year transcript", note: "One academic year, clear scan", time: "1–2 business days" },
          { label: "Full degree transcript", note: "Multi-year record with extensive course listings", time: "2–3 business days" },
          { label: "Multiple qualifications", note: "Several institutions or a full credential portfolio", time: "Depends on volume and complexity" },
        ],
      }}
      advice={{
        kicker: "Practical advice",
        heading: "Before you send your transcript",
        items: [
          <><strong>Send every page, in order.</strong> Transcripts are cumulative, and a missing page leaves a gap an evaluator must query.</>,
          <><strong>Include the reverse of each sheet.</strong> Grading scales and explanatory notes are almost always printed there.</>,
          <><strong>Send the diploma at the same time.</strong> Translating both together keeps the degree title identical across them.</>,
          <><strong>Scan rather than photograph if you can.</strong> Dense tables suffer badly from camera angle and shadow.</>,
          <><strong>Tell us which evaluator or institution it is for.</strong> Requirements differ slightly, and it is easier to prepare correctly than to revise.</>,
        ],
      }}
      related={[
        { h: "Diploma Translation", p: "The degree certificate that accompanies your transcript.", href: "/services/diploma-translation" },
        { h: "Certified Translation", p: "What certification means and which documents require it.", href: "/services/certified-translation" },
        { h: "USCIS Translation", p: "Academic evidence in immigration applications.", href: "/services/uscis-translation" },
        { h: "How we work", p: "Coordination, terminology management and secure handling.", href: "/platform" },
      ]}
      faqs={faqs}
      cta={{
        title: "Translate your transcript",
        body: "Upload every page, including the reverse, and a Project Coordinator will review the scope and prepare an accurate quotation. Most requests are reviewed within 30–60 minutes during business hours.",
      }}
    />
  );
}
