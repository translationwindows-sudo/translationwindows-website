import Link from "next/link";
import type { ReactNode } from "react";

/** Shared article shell: consistent header, body rhythm and closing CTA. */
export function Article({
  category, title, readTime, updated, intro, children,
}: {
  category: string; title: string; readTime: string; updated: string;
  intro: string; children: ReactNode;
}) {
  return (
    <div className="pw" id="top">
      <div className="pw-container">
        <p className="pw-crumb">
          <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / {category}
        </p>
        <div className="art">
          <header className="art-head">
            <p className="k">{category}</p>
            <h1>{title}</h1>
            <p className="art-meta">{readTime} · Updated {updated}</p>
            <p className="art-intro">{intro}</p>
          </header>
          <div className="art-body">{children}</div>
          <div className="art-end">
            <h3>Need a certified translation?</h3>
            <p>
              Tell us what you need and our Project Coordinator will prepare an accurate
              quotation. Most requests are reviewed within 30–60 minutes during business hours.
            </p>
            <Link className="pw-btn-a" href="/#start">Start Your Project →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="art-h2">{children}</h2>;
}
export function P({ children }: { children: ReactNode }) {
  return <p className="art-p">{children}</p>;
}
export function UL({ items }: { items: string[] }) {
  return <ul className="art-ul">{items.map((i) => <li key={i}>{i}</li>)}</ul>;
}
export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="art-callout">
      <p className="ac-t">{title}</p>
      <p className="ac-b">{children}</p>
    </div>
  );
}
