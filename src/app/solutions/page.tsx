import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Crumb, CtaBand, PwHero, TopicGrid, TopicSections, type TopicCard, type TopicDetail } from "@/components/pillar/pillar-parts";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "Solutions — Translation, Localization & Language Services",
  description: "Certified translation, medical and legal translation, USCIS documents, localization, subtitling, voice-over, desktop publishing and AI-assisted services.",
};

const grid: TopicCard[] = [
  { id: "certified", icon: "🖋️", title: "Certified Translation", desc: "Signed, USCIS-ready translations for personal and legal documents." },
  { id: "medical", icon: "⚕️", title: "Medical Translation", desc: "Clinical terminology handled by specialists, with strict confidentiality." },
  { id: "legal", icon: "§", title: "Legal Translation", desc: "Contracts, judgments and filings, translated by legal-fluent linguists." },
  { id: "uscis", icon: "🛂", title: "USCIS Translation", desc: "Certificates and immigration documents formatted to pass review the first time." },
  { id: "localization", icon: "🌐", title: "Localization", desc: "Websites, software and apps that read native in every market." },
  { id: "subtitling", icon: "🎬", title: "Subtitling", desc: "Frame-accurate captions and subtitles across languages." },
  { id: "voiceover", icon: "🎙️", title: "Voice-over", desc: "Professional voice talent and dubbing scripts for video and media." },
  { id: "dtp", icon: "📐", title: "Desktop Publishing", desc: "Translated documents that look exactly like the originals, in every script." },
  { id: "mtpe", icon: "⚡", title: "MTPE & AI-assisted", desc: "Machine translation post-editing — speed from technology, quality from experts." },
];

const details: TopicDetail[] = [
  { id: "certified", title: "Certified Translation", body: "A certified translation carries a signed Certificate of Accuracy attesting that the translation is complete and correct — the standard most institutions require for official documents.", points: ["Birth, marriage and death certificates", "Diplomas and academic transcripts", "Bank statements and financial records", "Notarization available on request"] },
  { id: "medical", title: "Medical Translation", body: "Clinical terminology is a safety matter, not a style choice. Our medical translators work in their area of specialty and every document passes a second clinical review.", points: ["Patient records and discharge summaries", "Clinical trial protocols", "Device manuals and IFUs", "HIPAA-conscious handling"] },
  { id: "legal", title: "Legal Translation", body: "One mistranslated clause changes an outcome, so legal work goes to linguists fluent in legal terminology — certified for court filing when required.", points: ["Contracts and agreements", "Court judgments and pleadings", "Powers of attorney", "Discovery documents"] },
  { id: "uscis", title: "USCIS Translation", body: "Immigration paperwork has to be right the first time. We format every certificate to the standard USCIS and consulates expect, with certification included.", points: ["Birth and marriage certificates", "Police clearance letters", "Academic credentials", "Typical turnaround: 1–2 business days"] },
  { id: "localization", title: "Localization", body: "Localization goes beyond words — tone, imagery, currency, and search behaviour all shift by market. We adapt all of it, not just the text.", points: ["Website and landing page localization", "Software and app strings", "SEO-aware keyword localization", "E-learning and training content"] },
  { id: "subtitling", title: "Subtitling", body: "Timing and reading speed matter as much as the words. Our subtitles are frame-accurate and respect on-screen reading limits in every target language.", points: ["SRT, VTT and burned-in formats", "Closed captions for accessibility", "Multi-language subtitle packages"] },
  { id: "voiceover", title: "Voice-over", body: "From corporate training to entertainment dubbing, we match voice talent to tone, language and audience — synced to picture where needed.", points: ["Corporate and e-learning narration", "Dubbing scripts and direction notes", "Multiple voice styles per language"] },
  { id: "dtp", title: "Desktop Publishing", body: "A translated document should look like the original — same layout, same stamps and seals, reproduced in the new language and script.", points: ["Multilingual layout reproduction", "Right-to-left and CJK typesetting", "Print-ready and digital formats"] },
  { id: "mtpe", title: "MTPE & AI-assisted Services", body: "Technology accelerates the parts that benefit from speed — never the judgment calls. Every AI-assisted project is finished and approved by a native linguist.", points: ["Machine translation post-editing", "AI-assisted terminology extraction", "Human review on every deliverable"] },
];

export default function SolutionsPage() {
  return (
    <div className="pw" id="top">
      <Container>
        <Crumb label="Solutions" />
        <PwHero eyebrow="Global Language Solutions" title="Every solution, under one window.">
          Translation Windows groups its services into clear, professional categories — so whatever
          you need translated, localized, subtitled or typeset, you know exactly what to expect.
        </PwHero>
      </Container>
      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <TopicGrid items={grid} />
        </div>
        <div className="pw-section">
          <p className="k">In depth</p>
          <h2>What each solution includes</h2>
          <TopicSections items={details} backLabel="solutions" />
        </div>
        <CtaBand title="Not sure which solution fits?" body="Tell us what you're working on and we'll match you to the right service — no guesswork required." />
      </Container>
    </div>
  );
}
