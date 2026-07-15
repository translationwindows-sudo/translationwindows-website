import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Crumb, CtaBand, PwHero, TopicGrid, TopicSections, type TopicCard, type TopicDetail } from "@/components/pillar/pillar-parts";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "Industries We Serve — Translation Windows",
  description: "Immigration, legal, medical, manufacturing, technology, entertainment, gaming and education — industry-specific translation expertise.",
};

const grid: TopicCard[] = [
  { id: "immigration", icon: "🛂", title: "Immigration", desc: "Certified documents built to pass USCIS and consular review." },
  { id: "legal", icon: "§", title: "Legal", desc: "Contracts, filings and discovery, handled by legal-fluent linguists." },
  { id: "medical", icon: "⚕️", title: "Medical & Life Sciences", desc: "Clinical terminology treated as a safety requirement, not a style choice." },
  { id: "manufacturing", icon: "⚙️", title: "Manufacturing", desc: "Manuals and specs with terminology locked across every document." },
  { id: "technology", icon: "💻", title: "Technology", desc: "Software, SaaS and product UI localized for every market you ship to." },
  { id: "entertainment", icon: "🎬", title: "Entertainment", desc: "Subtitling and dubbing for series, film and streaming catalogs." },
  { id: "gaming", icon: "🎮", title: "Gaming", desc: "In-game text, dialogue and marketing localized without losing character voice." },
  { id: "education", icon: "🎓", title: "Education", desc: "Transcripts, e-learning and academic materials translated for global students." },
];

const details: TopicDetail[] = [
  { id: "immigration", title: "Immigration", body: "Our most requested category: certified translations of personal documents, formatted to the exact standard immigration authorities expect.", points: ["Birth, marriage and death certificates", "Police clearance and court records", "Academic diplomas and transcripts"] },
  { id: "legal", title: "Legal", body: "Law firms and corporate counsel rely on us for precise, certifiable translations where a single word can change a case.", points: ["Contracts and commercial agreements", "Court judgments and pleadings", "Regulatory and compliance filings"] },
  { id: "medical", title: "Medical & Life Sciences", body: "Hospitals, clinics and device manufacturers trust us with documentation where accuracy is a patient-safety issue.", points: ["Patient records and consent forms", "Clinical trial documentation", "Device manuals and regulatory filings"] },
  { id: "manufacturing", title: "Manufacturing", body: "The same part number needs the same name on page four and page four hundred. We build and maintain terminology glossaries per client.", points: ["Technical manuals and safety data sheets", "Training material", "Multilingual specification sheets"] },
  { id: "technology", title: "Technology", body: "Software companies use us to launch in new markets simultaneously — UI strings, help centers and release notes, all in sync.", points: ["Application and UI strings", "Help center and documentation", "Release notes and changelogs"] },
  { id: "entertainment", title: "Entertainment", body: "Our linguistic team has contributed subtitle and dubbing work across major streaming and broadcast catalogs.", points: ["Subtitles and closed captions", "Dubbing scripts", "Metadata localization"] },
  { id: "gaming", title: "Gaming", body: "Game text carries tone and personality — our localizers protect character voice while adapting humor, idioms and UI constraints.", points: ["In-game dialogue and item text", "Marketing and store page copy", "QA-ready localized builds"] },
  { id: "education", title: "Education", body: "Universities and edtech platforms use us for admissions documents, course material and multilingual learning content.", points: ["Transcripts and diplomas", "E-learning course localization", "Multilingual academic publishing"] },
];

export default function IndustriesPage() {
  return (
    <div className="pw" id="top">
      <Container>
        <Crumb label="Industries" />
        <PwHero eyebrow="Where we work" title="Industry expertise, not generic translation.">
          Every field has its own terminology, its own risk, and its own definition of accurate.
          Here is how we work in each of ours.
        </PwHero>
      </Container>
      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <TopicGrid items={grid} />
        </div>
        <div className="pw-section">
          <p className="k">In depth</p>
          <h2>How we work in each industry</h2>
          <TopicSections items={details} backLabel="industries" />
        </div>
        <CtaBand title="Don't see your industry?" body="We work across dozens of fields beyond this list — tell us what you need and we'll match the right specialists." />
      </Container>
    </div>
  );
}
