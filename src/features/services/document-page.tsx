import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { FaqAccordion } from "@/components/pillar/faq-accordion";
import { Crumb, CtaBand, PwHero } from "@/components/pillar/pillar-parts";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/schema";

/**
 * Shared layout for certified-document service pages.
 *
 * The SHAPE is shared; the CONTENT never is. Each page supplies its own
 * explanation, its own pitfalls and its own FAQs, because a page that is
 * a find-and-replace of another deserves neither a ranking nor a reader.
 * What this component removes is the repetition of markup, not of thought.
 */

export interface DocumentPageProps {
  path: string;
  crumb: string;
  eyebrow: string;
  title: string;
  lead: ReactNode;
  schemaName: string;
  schemaDescription: string;
  serviceType: string;

  /** Why this document specifically is worth care. */
  intro: { heading: string; kicker: string; body: ReactNode };

  /** Numbered points — what is included, or what goes wrong. */
  points: { heading: string; kicker: string; items: { h: string; p: string }[] };

  /** Where the translation gets used. */
  uses: { heading: string; kicker: string; items: { h: string; p: string; href?: string }[] };

  /** Turnaround rows. */
  timing: { rows: { label: string; note: string; time: string }[]; footnote?: ReactNode };

  /** Practical guidance before sending. */
  advice?: { heading: string; kicker: string; items: ReactNode[] };

  related: { h: string; p: string; href: string }[];
  faqs: { q: string; a: string }[];
  cta: { title: string; body: string };
}

export function DocumentPage(props: DocumentPageProps) {
  const {
    path, crumb, eyebrow, title, lead, schemaName, schemaDescription, serviceType,
    intro, points, uses, timing, advice, related, faqs, cta,
  } = props;

  return (
    <div className="pw" id="top">
      <JsonLd
        data={graph(
          serviceSchema({ name: schemaName, description: schemaDescription, path, serviceType }),
          faqSchema(faqs, path),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/solutions" },
            { name: crumb, path },
          ]),
        )}
      />

      <Container>
        <Crumb label={crumb} />
        <PwHero eyebrow={eyebrow} title={title}>{lead}</PwHero>
      </Container>

      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <p className="k">{intro.kicker}</p>
          <h2>{intro.heading}</h2>
          {intro.body}
        </div>

        <div className="pw-section">
          <p className="k">{points.kicker}</p>
          <h2>{points.heading}</h2>
          <ol className="pw-steps">
            {points.items.map((it, i) => (
              <li key={it.h}>
                <span className="pw-stepn">{i + 1}</span>
                <div><h3>{it.h}</h3><p>{it.p}</p></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="pw-section">
          <p className="k">{uses.kicker}</p>
          <h2>{uses.heading}</h2>
          <div className="pw-doclist">
            {uses.items.map((u) => (
              <div className="pw-docitem" key={u.h}>
                <p className="pw-docname">
                  {u.href ? <Link href={u.href}>{u.h}</Link> : u.h}
                </p>
                <p className="pw-docnote">{u.p}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pw-section">
          <p className="k">Timing</p>
          <h2>How long it takes</h2>
          <table className="pw-table">
            <thead><tr><th>Type of project</th><th>Typical delivery</th></tr></thead>
            <tbody>
              {timing.rows.map((r) => (
                <tr key={r.label}>
                  <td>{r.label}<br /><span className="pw-tnote">{r.note}</span></td>
                  <td>{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="pw-tsmall">
            {timing.footnote ?? (
              <>
                Larger or more complex projects may require additional review time. Quotation
                requests are usually reviewed within 30–60 minutes during business hours, Monday to
                Friday, 8:00 AM to 6:00 PM Central Time.
              </>
            )}
          </p>
        </div>

        {advice && (
          <div className="pw-section">
            <p className="k">{advice.kicker}</p>
            <h2>{advice.heading}</h2>
            <ul className="pw-list">
              {advice.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        )}

        <div className="pw-section">
          <p className="k">Related services</p>
          <h2>Where to go next</h2>
          <div className="pw-related">
            {related.map((r) => (
              <Link className="pw-relcard" href={r.href} key={r.href}>
                <h3>{r.h}</h3><p>{r.p}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="pw-section">
          <p className="k">Questions</p>
          <h2>{crumb}, answered</h2>
          <FaqAccordion items={faqs} />
        </div>
      </Container>

      <CtaBand title={cta.title} body={cta.body} />
    </div>
  );
}
