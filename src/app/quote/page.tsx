import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { FaqAccordion } from "@/components/pillar/faq-accordion";
import { Crumb, CtaBand, PwHero } from "@/components/pillar/pillar-parts";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "AI Quote Assistant — Fast, Human-Approved Quotes",
  description: "How our AI-assisted quotation workflow works: a guided intake, document analysis, and a human project manager who approves every price.",
};

const steps = [
  { n: "1", h: "Tell us what you need", p: "A guided conversation, not a form — one question at a time." },
  { n: "2", h: "Upload your documents", p: "Requested only once we know what your project actually is." },
  { n: "3", h: "AI reviews the content", p: "Word count, complexity and terminology are analyzed instantly." },
  { n: "4", h: "A project manager approves", p: "Every price is reviewed by a person before it reaches you." },
  { n: "5", h: "You receive your quote", p: "Typically under 15 minutes during business hours." },
];

const faqs = [
  { q: "Is the price set by AI?", a: "No. The AI drafts an estimate from your documents and answers, but a human project manager reviews and approves every quote before it is sent — technology prepares, people decide." },
  { q: "How long does it take?", a: "Most quotes are ready in under 15 minutes during business hours. Larger or highly technical projects may take longer for an accurate review." },
  { q: "Can I change my project after starting?", a: "Yes. Your project stays fully editable — including files and details — until your quotation is prepared." },
  { q: "Is my information secure?", a: "Documents are validated on upload, stored outside any publicly accessible path, and only visible to your project's assigned team." },
];

export default function QuotePage() {
  return (
    <div className="pw" id="top">
      <Container>
        <Crumb label="AI Quote Assistant" />
        <PwHero eyebrow="Platform · AI Quote Assistant" title="Quotes prepared by AI. Approved by people.">
          Our AI Quote Assistant asks the right questions for your specific project, then a project manager reviews your documents and approves the price — you never get a number nobody stands behind.
        </PwHero>
      </Container>
      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <p className="k">How it works</p>
          <h2>From "I need this translated" to a quote in five steps.</h2>
          <div className="pw-steps" style={{ marginTop: 30 }}>
            {steps.map((s) => (
              <div className="s" key={s.n}>
                <div className="sn">{s.n}</div>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pw-section">
          <p className="k">Why AI, why not just AI</p>
          <h2>Technology accelerates. People decide.</h2>
          <p className="sub">
            AI is excellent at reading a document quickly and estimating its scope. It is not the one
            who should set your price or guarantee your delivery. That is why every quote our assistant
            prepares is reviewed and approved by a project manager before you ever see it — the speed of
            automation, with a person accountable for the result.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">Questions</p>
          <h2>AI Quote Assistant — frequently asked</h2>
          <div style={{ marginTop: 24 }}>
            <FaqAccordion items={faqs} />
          </div>
        </div>

        <CtaBand title="Try the AI Quote Assistant now" body="Start a project below and see the guided intake for yourself." />
      </Container>
    </div>
  );
}

