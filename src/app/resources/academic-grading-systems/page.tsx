import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Crumb, CtaBand, PwHero } from "@/components/pillar/pillar-parts";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";
import "@/styles/pillar.css";

import { GradingTable } from "./grading-table";
import "../court-translation-requirements/requirements.css";
import "./grading.css";

const PATH = "/resources/academic-grading-systems";

export const metadata: Metadata = {
  title: "International Grading Systems — A Reference for Admissions Teams",
  description:
    "How grading scales work in Germany, France, the UK, India, China and beyond: what each grade means, where the pass mark sits, and which scales are most often misread.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "International Grading Systems — Translation Windows",
    description:
      "A free reference on how grading scales work across twelve countries, for admissions and credential review.",
    url: PATH, type: "article",
  },
};

const faqs = [
  {
    q: "Why does this reference not convert grades to a US GPA?",
    a: "Because conversion is an evaluative judgement rather than a factual one, and it belongs to a credential evaluator or an admissions office rather than a reference table. Two institutions can reasonably reach different conclusions about the same transcript. What we can state factually is what each scale means in its own country and where its pass mark sits.",
  },
  {
    q: "Which grading scale is most often misread?",
    a: "The German 1.0 to 5.0 scale, without much competition. Lower numbers are better, which reverses the intuition of anyone accustomed to percentages or a GPA. A reviewer seeing 1.3 and reading it as a poor mark has an excellent student exactly backwards, and the error is easy to make quickly.",
  },
  {
    q: "Should a translated transcript show converted grades?",
    a: "No. A translation should reproduce grades exactly as awarded, along with any grading scale printed on the document. A transcript arriving with grades already converted raises an obvious question about what else was interpreted, and most credential evaluators will reject it or ask for the original.",
  },
  {
    q: "What if a transcript does not state which scale is in use?",
    a: "Ask the applicant or the issuing institution. This is common with Indian CGPA transcripts, where 4, 7 and 10 point scales are all in circulation, and with Italian records that carry both the exam scale and the degree scale. Guessing produces a wrong assessment rather than an approximate one.",
  },
  {
    q: "Do these scales apply to secondary as well as university education?",
    a: "Not always. Several countries use different scales at school and university level, and Italy is the clearest example. Where you are reviewing a secondary certificate, confirm the scale rather than assuming it matches the university one.",
  },
  {
    q: "How current is this reference?",
    a: "It is reviewed periodically and dated accordingly. Grading practice changes slowly but it does change, and institutions within a country vary. Treat this as orientation for reading an unfamiliar document rather than an authority to cite in a decision.",
  },
];

export default function Page() {
  return (
    <div className="pw" id="top">
      <JsonLd
        data={graph(
          faqSchema(faqs, PATH),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: "International Grading Systems", path: PATH },
          ]),
        )}
      />

      <Container>
        <Crumb label="International Grading Systems" />
        <PwHero
          eyebrow="Free Reference for Admissions and Credential Review"
          title="What a 1.3 means, and why it is not what it looks like."
        >
          How grading scales work across twelve countries — what each grade means in its own
          system, where the pass mark sits, and which scales are most frequently misread by
          reviewers seeing them for the first time.
        </PwHero>
      </Container>

      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <GradingTable />
        </div>

        <div className="pw-section">
          <p className="k">Why there are no conversions here</p>
          <h2>This reference deliberately stops short of a GPA</h2>
          <p className="pw-lead">
            You will find no table converting a German 1.7 into a US GPA on this page, and that is
            a considered decision rather than an omission.
          </p>
          <p>
            Conversion is an evaluative act. Two credential evaluators can look at the same
            transcript, apply defensible methodologies, and reach different conclusions — because
            they are weighing institutional standing, programme rigour and grade distribution, not
            performing arithmetic. A table that flattens this into a single number implies a
            precision that does not exist.
          </p>
          <p>
            The same reasoning governs how we translate transcripts. Grades are reproduced exactly
            as awarded, with any grading scale printed on the document translated alongside them.
            A transcript that arrives already converted invites the reviewer to ask what else was
            interpreted along the way.
          </p>
          <p>
            What this page offers instead is orientation: what the scale is, how it reads in its
            own country, and where the threshold for passing sits. That is what someone holding an
            unfamiliar transcript actually needs.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">The recurring errors</p>
          <h2>Where reviewers most often go wrong</h2>
          <ul className="pw-list">
            <li>
              <strong>Reading Germany as though higher were better.</strong> The single most
              consequential misreading. A 1.3 is outstanding and a 3.8 is a bare pass.
            </li>
            <li>
              <strong>Treating French marks as percentages.</strong> A 14 out of 20 is a genuinely
              good result. Read as 70%, it understates the candidate substantially.
            </li>
            <li>
              <strong>Assuming a UK First means near-perfect work.</strong> The threshold is 70%,
              and marks above 80 are rare in most disciplines.
            </li>
            <li>
              <strong>Not asking which Indian CGPA scale applies.</strong> Four, seven and
              ten-point scales are all current, and the difference is not marginal.
            </li>
            <li>
              <strong>Confusing the two Italian scales.</strong> A transcript may carry both the
              18–30 exam scale and the 66–110 degree scale. They measure different things.
            </li>
            <li>
              <strong>Missing a distinction grade.</strong> Matrícula de Honor, 30 e lode and the
              Japanese S grade all sit above what a reviewer expecting a standard range would
              anticipate.
            </li>
          </ul>
        </div>

        <div className="pw-section">
          <p className="k">Using this reference</p>
          <h2>What it is, and what it is not</h2>
          <p>
            This is orientation for reading an unfamiliar document, not an authority to cite in an
            admissions decision. Institutions within a country vary, practice changes over time,
            and secondary and university scales often differ.
          </p>
          <p>
            Where a transcript does not state its own scale, ask the applicant or the issuing
            institution rather than inferring from this page. If you find something here that is
            outdated or wrong, <Link href="/contact">tell us</Link> and we will correct it.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">Related</p>
          <h2>Where to go next</h2>
          <div className="pw-related">
            <Link className="pw-relcard" href="/services/transcript-translation">
              <h3>Transcript Translation</h3>
              <p>Why grades should arrive unconverted, and what a proper translation includes.</p>
            </Link>
            <Link className="pw-relcard" href="/services/diploma-translation">
              <h3>Diploma Translation</h3>
              <p>Degree titles translated faithfully rather than equated.</p>
            </Link>
            <Link className="pw-relcard" href="/industries/universities">
              <h3>For Universities</h3>
              <p>Admissions, research, partnerships and student services.</p>
            </Link>
            <Link className="pw-relcard" href="/resources/court-translation-requirements">
              <h3>Court Requirements Reference</h3>
              <p>Certification and notarization across US courts and agencies.</p>
            </Link>
          </div>
        </div>

        <div className="pw-section">
          <p className="k">Questions</p>
          <h2>Grading systems, answered</h2>
          <div className="req-faqs">
            {faqs.map((f) => (
              <details className="req-faq" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>

      <CtaBand
        title="Need academic credentials translated"
        body="Send the diploma and transcript together and a Project Coordinator will review them and prepare an accurate quotation. Grades arrive exactly as awarded."
      />
    </div>
  );
}
