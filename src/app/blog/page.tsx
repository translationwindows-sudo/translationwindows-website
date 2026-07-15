import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Crumb, CtaBand, PwHero } from "@/components/pillar/pillar-parts";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "Blog — Translation Windows",
  description: "Insights on certified translation, localization, AI-assisted translation and language industry best practices.",
};

const categories = ["All", "Certified Translation", "Localization", "AI & Translation", "Industry Guides"];

const posts = [
  { tag: "Certified Translation", title: "The complete USCIS translation guide (2026)", desc: "What USCIS actually requires, and how to avoid the most common rejection reasons.", read: "8 min read" },
  { tag: "Certified Translation", title: "Certified translation: what it is and when you need it", desc: "The difference between certified, notarized and standard translation, explained simply.", read: "5 min read" },
  { tag: "Industry Guides", title: "Medical translation: why terminology is a safety issue", desc: "How a single mistranslated term can change patient outcomes — and how we prevent it.", read: "6 min read" },
  { tag: "Industry Guides", title: "Legal translation: precision, certification and pitfalls", desc: "What law firms should look for when choosing a legal translation partner.", read: "7 min read" },
  { tag: "Localization", title: "The website localization guide", desc: "A practical checklist for launching your site in a new market.", read: "9 min read" },
  { tag: "AI & Translation", title: "AI vs. human translation: what each is actually for", desc: "Where machine translation genuinely helps, and where it still falls short.", read: "6 min read" },
];

export default function BlogPage() {
  return (
    <div className="pw" id="top">
      <Container>
        <Crumb label="Blog" />
        <PwHero eyebrow="Insights" title="Ideas on language, technology and global communication.">
          Practical guidance from our translation and localization team — for procurement teams,
          legal counsel, and anyone navigating a multilingual project for the first time.
        </PwHero>
      </Container>
      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <div className="pw-filter-bar">
            {categories.map((c, i) => (
              <span className={`pw-chip ${i === 0 ? "active" : ""}`} key={c}>{c}</span>
            ))}
          </div>
          <div className="pw-blog-grid">
            {posts.map((p) => (
              <div className="pw-blog-card" key={p.title}>
                <div className="bh" />
                <div className="bb">
                  <span className="tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="meta"><span>{p.read}</span><span>Coming soon</span></div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: ".88rem", color: "var(--char-soft)", marginTop: 24 }}>
            Full articles are in production — see our <a href="/resources" style={{ color: "var(--accent)", fontWeight: 600 }}>Resources</a> section for guides available now.
          </p>
        </div>
        <CtaBand title="Have a question we haven't covered?" body="Ask your project manager directly — we'll get you a real answer today." />
      </Container>
    </div>
  );
}
