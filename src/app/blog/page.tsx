import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Crumb, CtaBand, PwHero } from "@/components/pillar/pillar-parts";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "Blog — Translation Windows",
  description:
    "Practical guidance on certified translation, USCIS requirements, and choosing a professional translation provider.",
};

const posts = [
  {
    href: "/blog/certified-translation-uscis",
    tag: "Certified Translation",
    title: "Certified Translation for USCIS: Everything You Need to Know",
    desc: "What USCIS requires, what a Certificate of Accuracy must contain, and the mistakes that most often cause delays.",
    read: "9 min read",
  },
  {
    href: "/blog/certified-vs-notarized-translation",
    tag: "Certified Translation",
    title: "Certified vs. Notarized Translation: What's the Difference?",
    desc: "The two terms are used interchangeably almost everywhere. They describe different things, and ordering the wrong one costs time.",
    read: "6 min read",
  },
  {
    href: "/blog/choosing-a-translation-company",
    tag: "Industry Guides",
    title: "How to Choose a Professional Translation Company",
    desc: "The questions worth asking, the claims worth ignoring, and how translation pricing actually works.",
    read: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="pw" id="top">
      <Container>
        <Crumb label="Blog" />
        <PwHero eyebrow="Insights" title="Practical guidance on language and documentation.">
          Written by our translation team for people navigating certified translation,
          immigration filings and multilingual projects — whether or not you work with us.
        </PwHero>
      </Container>
      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <div className="pw-blog-grid">
            {posts.map((p) => (
              <Link className="pw-blog-card" href={p.href} key={p.href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div className="bh" />
                <div className="bb">
                  <span className="tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="meta"><span>{p.read}</span><span style={{ color: "var(--accent)", fontWeight: 600 }}>Read article →</span></div>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ fontSize: ".92rem", color: "var(--char-soft)", marginTop: 28 }}>
            More guides are available in our{" "}
            <Link href="/resources" style={{ color: "var(--accent)", fontWeight: 600 }}>Knowledge Center</Link>.
          </p>
        </div>
        <CtaBand
          title="Have a question we haven't covered?"
          body="Talk to a Project Coordinator — we'll give you a straight answer, whether or not it leads to a project."
        />
      </Container>
    </div>
  );
}
