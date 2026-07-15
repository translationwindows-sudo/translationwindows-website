import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Crumb, CtaBand, PwHero } from "@/components/pillar/pillar-parts";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "About Translation Windows — Est. 2017",
  description: "Translation Windows is a global language solutions company founded in 2017, combining AI-assisted workflows with native professional linguists.",
};

const values = [
  { i: "🎯", h: "Accuracy first", p: "Every deliverable is reviewed by a native professional, no exceptions." },
  { i: "🤝", h: "One point of contact", p: "A named project manager who knows your history across every project." },
  { i: "🔒", h: "Confidentiality", p: "Documents handled with the same care as the sensitive information they contain." },
  { i: "⚡", h: "Technology, in service of people", p: "AI accelerates preparation — humans remain accountable for every result." },
];

const workflow = [
  { n: "1", h: "Upload", p: "Share your document — a photo or scan is enough." },
  { n: "2", h: "AI-assisted prep", p: "Structure and terminology, extracted in seconds." },
  { n: "3", h: "Native linguist", p: "Translated into their mother tongue." },
  { n: "4", h: "Senior QA", p: "A second, independent review pass." },
  { n: "5", h: "Certification & delivery", p: "Signed when required, delivered securely." },
];

export default function AboutPage() {
  return (
    <div className="pw" id="top">
      <Container>
        <Crumb label="About" />
        <PwHero eyebrow="Est. 2017" title="A language company built for a technology-enabled world.">
          Translation Windows was founded in 2017 on a simple idea: language services should feel as
          modern and transparent as the businesses they serve — without losing the human judgment that
          makes a translation trustworthy.
        </PwHero>
      </Container>
      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <p className="k">Our story</p>
          <h2>From a translation agency to a global language solutions company</h2>
          <p className="sub">
            We started as a certified translation provider serving Houston&apos;s immigration and legal
            community. As clients asked for more — localization, subtitling, interpretation, desktop
            publishing — we grew into a full global language solutions company, and built the technology
            to match: an AI-assisted intake that makes starting a project effortless, backed by the same
            native linguists and quality process from day one.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">How we work</p>
          <h2>The same process, every time</h2>
          <div className="pw-steps" style={{ marginTop: 30 }}>
            {workflow.map((s) => (
              <div className="s" key={s.n}>
                <div className="sn">{s.n}</div>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pw-section">
          <p className="k">What we believe</p>
          <h2>Our values</h2>
          <div className="pw-values" style={{ marginTop: 30 }}>
            {values.map((v) => (
              <div className="v" key={v.h}>
                <div className="vi">{v.i}</div>
                <h4>{v.h}</h4>
                <p>{v.p}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pw-section">
          <p className="k">Who we serve</p>
          <h2>Industries across immigration, legal, medical, manufacturing, technology, entertainment, gaming and education</h2>
          <p className="sub">
            See how we work in each field on our <a href="/industries" style={{ color: "var(--accent)", fontWeight: 600 }}>Industries page</a>.
          </p>
        </div>

        <CtaBand title="Work with us" body="Start a project today and see the difference a dedicated project manager makes." />
      </Container>
    </div>
  );
}
