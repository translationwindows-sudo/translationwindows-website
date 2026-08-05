import type { Metadata } from "next";

import { DocumentPage } from "@/features/services/document-page";
import "@/styles/pillar.css";

const PATH = "/industries/universities";

export const metadata: Metadata = {
  title: "Translation for Universities — Admissions, Research and Student Services",
  description:
    "Translation for higher education: international admissions documents, research publications, partnership agreements and student-facing material. Certified where credentials require it.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Translation for Universities — Translation Windows",
    description: "Translation for admissions, research, partnerships and student services.",
    url: PATH, type: "article",
  },
};

const faqs = [
  { q: "Do you translate academic credentials for admissions review?",
    a: "Yes — diplomas, transcripts, degree certificates and syllabus descriptions. We translate faithfully rather than converting: grades are reproduced as awarded and degree titles are rendered literally with the original retained where it helps. Judging equivalence is your admissions team or an evaluator, not the translator." },
  { q: "Can you handle volume during admissions season?",
    a: "Tell us the expected volume and window in advance and we will confirm capacity honestly. Admissions peaks are predictable, and scoping in August for a January deadline works far better than discovering the bottleneck in December." },
  { q: "Do you translate research publications?",
    a: "Yes — papers, abstracts, grant applications and conference material. Academic translation is assigned to linguists with subject familiarity, because a paper translated by someone outside the field reads plausibly and uses the wrong terminology throughout, which reviewers notice immediately." },
  { q: "What about partnership and exchange agreements?",
    a: "Memoranda of understanding, articulation agreements, research collaboration contracts and exchange documentation. These sit closer to legal translation than academic, and are handled accordingly — precision before elegance, with terminology consistent across every version." },
  { q: "Can you produce student-facing material in several languages?",
    a: "Yes. Handbooks, orientation material, safety information and policy documents for international cohorts. The register differs sharply from academic writing: a student handbook exists to be understood by someone new to the country, and translating it in institutional language defeats that." },
  { q: "Do the translations need certification?",
    a: "For credentials submitted as part of an application, usually yes — a signed Certificate of Accuracy. For internal review, research or student material, generally not. Ask before paying for certification nobody requested." },
  { q: "How do you handle historical or unusual academic systems?",
    a: "Carefully, and with the original terms retained. Education systems differ enormously and older records use qualifications that no longer exist. Where a term has no counterpart, we translate it and keep the original alongside so the reader can assess it themselves." },
  { q: "Can you work directly with our international office?",
    a: "Yes, and it is the arrangement that works best. A named Project Coordinator handles your account, learns your conventions, and keeps terminology consistent across everything — rather than each request being handled as though it were the first." },
];

export default function Page() {
  return (
    <DocumentPage
      path={PATH}
      crumb="Universities"
      eyebrow="Translation for Higher Education"
      title="Translation for institutions that read the world's documents."
      lead={
        <>
          International credentials, research publications, partnership agreements and
          student-facing material — translated faithfully, certified where required, and handled
          at the volume admissions season demands.
        </>
      }
      schemaName="Translation Services for Universities"
      schemaDescription="Translation services for higher education institutions covering international admissions documents, academic credentials, research publications, partnership agreements and student-facing material."
      serviceType="Academic and Higher Education Translation"
      intro={{
        kicker: "Four different jobs",
        heading: "A university needs four kinds of translation at once",
        body: (
          <>
            <p className="pw-lead">
              Higher education is unusual in requiring several genuinely different translation
              disciplines from the same provider, often in the same week — and treating them as one
              service serves none of them well.
            </p>
            <p>
              <strong>Credentials</strong> demand literal fidelity: grades reproduced as awarded,
              degree titles untranslated into false equivalents, because equivalence is an
              admissions judgement rather than a linguistic one.
              <strong> Research</strong> demands subject expertise, since a paper rendered by
              someone outside the field reads fluently and uses the wrong terms throughout.
            </p>
            <p>
              <strong>Agreements</strong> are legal instruments and want legal precision.
              <strong> Student material</strong> wants the opposite of all three — plain,
              welcoming language a nervous eighteen-year-old can follow in their second language.
            </p>
            <p>
              We assign each to linguists suited to it, while keeping institution names,
              programme titles and recurring terminology consistent across all four.
            </p>
          </>
        ),
      }}
      points={{
        kicker: "How we work",
        heading: "What institutions get from us",
        items: [
          { h: "Credentials translated, not converted", p: "Grades as awarded, degree titles rendered faithfully with the original retained. Equivalence stays your decision." },
          { h: "Subject-matched linguists for research", p: "Assigned by field, because terminology is most of what makes an academic translation credible." },
          { h: "Capacity planned around your calendar", p: "Tell us the admissions window in advance and we confirm capacity honestly rather than discovering it late." },
          { h: "Register matched to the reader", p: "A student handbook and a research paper are written for different people and should not sound alike." },
          { h: "Consistent institutional terminology", p: "Programme names, department titles and degree nomenclature identical across every document and every year." },
          { h: "Certification only where needed", p: "Signed Certificate of Accuracy on credentials that require it, and no charge for it where nobody asked." },
        ],
      }}
      uses={{
        kicker: "What we translate",
        heading: "Work we handle for universities",
        items: [
          { h: "Diplomas and degree certificates", p: "For international admissions and credential review.", href: "/services/diploma-translation" },
          { h: "Academic transcripts", p: "Course listings, grades and grading scales.", href: "/services/transcript-translation" },
          { h: "Syllabus and course descriptions", p: "For transfer credit assessment and accreditation." },
          { h: "Research papers and abstracts", p: "Publication, conference and grant material." },
          { h: "Partnership agreements", p: "MOUs, articulation and research collaboration contracts.", href: "/services/legal-translation" },
          { h: "Student handbooks", p: "Orientation, policy and safety material for international cohorts." },
          { h: "Recruitment and prospectus material", p: "Marketing content for international markets.", href: "/services/business-translation" },
          { h: "Institutional websites", p: "Programme pages and application portals.", href: "/services/website-localization" },
        ],
      }}
      timing={{
        rows: [
          { label: "Single credentials", note: "One diploma or transcript", time: "1–2 business days" },
          { label: "Standard academic documents", note: "Full credential sets, papers, agreements", time: "2–3 business days" },
          { label: "Admissions-season volume", note: "Batches across many applicants and languages", time: "Scoped in advance of the window" },
        ],
      }}
      related={[
        { h: "Diploma Translation", p: "Degree certificates in detail.", href: "/services/diploma-translation" },
        { h: "Transcript Translation", p: "Grades, credits and course listings.", href: "/services/transcript-translation" },
        { h: "Certified Translation", p: "What certification means and when it is required.", href: "/services/certified-translation" },
        { h: "Business Translation", p: "Recruitment, prospectus and institutional communication.", href: "/services/business-translation" },
      ]}
      faqs={faqs}
      cta={{
        title: "Talk to us about your institution",
        body: "Tell us what you handle and when your peaks fall. A Project Coordinator will scope capacity and terminology before quoting.",
      }}
    />
  );
}
