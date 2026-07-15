import Link from "next/link";
import type { ReactNode } from "react";

/** Small "Home / Section" trail, consistent across every inner page. */
export function Crumb({ label }: { label: string }) {
  return (
    <p className="pw-crumb">
      <Link href="/">Home</Link> / {label}
    </p>
  );
}

/** Standard pillar-page hero: eyebrow, H1, intro, CTAs. */
export function PwHero({
  eyebrow, title, children, primaryLabel = "Start your project", primaryHref = "/#start",
  secondaryLabel, secondaryHref,
}: {
  eyebrow: string; title: string; children: ReactNode;
  primaryLabel?: string; primaryHref?: string;
  secondaryLabel?: string; secondaryHref?: string;
}) {
  return (
    <div className="pw-hero">
      <p className="k">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{children}</p>
      <div className="pw-ctas">
        <Link className="pw-btn-a" href={primaryHref}>{primaryLabel} →</Link>
        {secondaryLabel && secondaryHref && <Link className="pw-btn-b" href={secondaryHref}>{secondaryLabel}</Link>}
      </div>
    </div>
  );
}

export type TopicCard = { id: string; icon: string; title: string; desc: string };

/** The pillar → child-topic grid. Cards link to in-page anchors today;
 * each anchor can graduate to its own route later without touching nav. */
export function TopicGrid({ items }: { items: TopicCard[] }) {
  return (
    <div className="pw-grid">
      {items.map((it) => (
        <a className="pw-card" href={`#${it.id}`} key={it.id}>
          <div className="ic">{it.icon}</div>
          <h3>{it.title}</h3>
          <p>{it.desc}</p>
          <span className="go">Read more ↓</span>
        </a>
      ))}
    </div>
  );
}

export type TopicDetail = { id: string; title: string; body: string; points?: string[] };

/** The expanded detail section per topic, addressed by the grid above. */
export function TopicSections({ items, backLabel }: { items: TopicDetail[]; backLabel: string }) {
  return (
    <div>
      {items.map((it, i) => (
        <div className="pw-anchor" id={it.id} key={it.id}>
          <h3><span className="n">{String(i + 1).padStart(2, "0")}</span> {it.title}</h3>
          <p>{it.body}</p>
          {it.points && (
            <ul>
              {it.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          )}
          <a className="backlink" href="#top">↑ Back to {backLabel}</a>
        </div>
      ))}
    </div>
  );
}

/** Closing conversion band, reused on every pillar page. */
export function CtaBand({ title, body }: { title: string; body: string }) {
  return (
    <div className="pw-cta-band">
      <h2>{title}</h2>
      <p>{body}</p>
      <Link className="pw-btn-a" href="/#start">Start your project →</Link>
    </div>
  );
}
