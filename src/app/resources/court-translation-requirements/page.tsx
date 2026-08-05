import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Crumb, CtaBand, PwHero } from "@/components/pillar/pillar-parts";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";
import "@/styles/pillar.css";

import { RequirementsTable } from "./requirements-table";
import "./requirements.css";

const PATH = "/resources/court-translation-requirements";

export const metadata: Metadata = {
  title: "Court Translation Requirements — A Reference for Legal Practices",
  description:
    "Which courts require certified translation, which require notarization, and who may translate. A free reference covering USCIS, immigration court, federal and state courts, probate, arbitration and USPTO.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Court Translation Requirements — Translation Windows",
    description:
      "A free reference on certification and notarization requirements across US courts and agencies.",
    url: PATH, type: "article",
  },
};

const faqs = [
  {
    q: "Does a court-filed translation need to be notarized?",
    a: "Usually not. Certification and notarization address different things: certification is a statement about the accuracy of the translation, while notarization only verifies who signed that statement. Most courts and agencies, including USCIS, require certification alone. Probate matters and documents originating abroad are the common exceptions.",
  },
  {
    q: "Who is permitted to translate a document for court?",
    a: "In most US jurisdictions there is no required credential. What matters is that the translator attests to their competence in both languages and to the completeness and accuracy of the translation. That said, courts weigh the credibility of that attestation, and a translation certified by a party to the case or a close relative carries considerably less weight.",
  },
  {
    q: "Can a party or their relative translate their own documents?",
    a: "It is generally unwise. Even where no rule prohibits it, a translation certified by someone with an interest in the outcome invites a challenge that is easy to make and time-consuming to answer. Opposing counsel will raise it, and the court may agree.",
  },
  {
    q: "What is the difference between certification, notarization and apostille?",
    a: "Certification attests that a translation is accurate. Notarization verifies the identity of the person signing that attestation. An apostille authenticates a public document for use in another country under the Hague Convention and applies to the original document rather than the translation. They serve entirely different purposes and are frequently confused.",
  },
  {
    q: "Do local rules override these general requirements?",
    a: "Frequently, and that is the main caution attached to this reference. Federal districts differ from one another, state courts differ by state and often by county, and individual judges impose their own standards. Treat anything here as the starting point for a check rather than the answer.",
  },
  {
    q: "Does a partial translation ever suffice?",
    a: "Sometimes, particularly in arbitration and in discovery where parties agree. In filings requiring a certified translation, partial translations are usually rejected — the certification asserts completeness, so a partial document contradicts its own certificate. Where only an extract is relevant, that should be agreed and documented rather than assumed.",
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
            { name: "Court Translation Requirements", path: PATH },
          ]),
        )}
      />

      <Container>
        <Crumb label="Court Translation Requirements" />
        <PwHero
          eyebrow="Free Reference for Legal Practices"
          title="Which courts require what, and where to verify it."
        >
          Certification, notarization and translator qualification across US courts and agencies —
          with a pointer to the governing rule for every entry, because local rules vary and this
          is a starting point for a check rather than a substitute for one.
        </PwHero>
      </Container>

      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <RequirementsTable />
        </div>

        <div className="pw-section">
          <p className="k">The distinction that costs money</p>
          <h2>Certification and notarization are not the same thing</h2>
          <p className="pw-lead">
            More filing time is wasted on this confusion than on any other translation question,
            and it almost always runs in the same direction: paying for notarization that was
            never required.
          </p>
          <div className="pw-compare">
            <div className="pw-compare-col">
              <h3>Certification</h3>
              <p>
                A statement, signed by the translator, that the translation is complete and
                accurate and that they are competent to translate between the two languages. It
                addresses <strong>the translation</strong>. This is what USCIS and most courts
                require.
              </p>
            </div>
            <div className="pw-compare-col">
              <h3>Notarization</h3>
              <p>
                A notary public witnesses the signature on that statement. The notary does not read
                the translation and does not speak the language. It addresses{" "}
                <strong>the signer</strong>, not the accuracy.
              </p>
            </div>
          </div>
          <p>
            A third term, <strong>apostille</strong>, is different again: it authenticates a public
            document for use abroad under the Hague Convention, and applies to the original
            document rather than its translation. A birth certificate may need an apostille and a
            certified translation, and neither substitutes for the other.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">What gets translations rejected</p>
          <h2>The recurring failures</h2>
          <ul className="pw-list">
            <li>
              <strong>Incompleteness.</strong> A certificate asserts that the translation is
              complete. If a stamp, a marginal note or the reverse of a page is missing, the
              certificate is inaccurate on its face — which is a more serious problem than a
              translation error.
            </li>
            <li>
              <strong>An interested translator.</strong> A party, a relative or an employee of the
              filing firm. Easy to challenge, and expensive to answer.
            </li>
            <li>
              <strong>Inconsistency across a set.</strong> A name transliterated one way in an
              early exhibit and differently in a later one obliges the court to establish they
              refer to the same person.
            </li>
            <li>
              <strong>Missing the local rule.</strong> A district requiring a declaration per
              exhibit rather than one covering declaration, or a judge with a standing order on
              format.
            </li>
            <li>
              <strong>Conflating apostille with certification.</strong> Documents arrive
              apostilled but untranslated, or translated but not legalized.
            </li>
          </ul>
        </div>

        <div className="pw-section">
          <p className="k">Using this reference</p>
          <h2>How to treat what is above</h2>
          <p>
            Every entry states the general rule as commonly applied, and names what to verify
            against. It is not legal advice, and it is not a substitute for reading the local rules
            that govern your filing.
          </p>
          <p>
            Requirements change. Individual judges impose standards their colleagues do not. Where
            we are not confident of a general rule, the entry says <em>varies</em> rather than
            offering a guess — a wrong answer here costs somebody a rejected filing, which is worse
            than an honest gap.
          </p>
          <p>
            If you find something outdated or wrong,{" "}
            <Link href="/contact">tell us</Link> and we will correct it. This page is reviewed
            periodically and dated accordingly.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">Related</p>
          <h2>Where to go next</h2>
          <div className="pw-related">
            <Link className="pw-relcard" href="/services/legal-translation">
              <h3>Legal Translation</h3>
              <p>Contracts, filings, judgments and evidence.</p>
            </Link>
            <Link className="pw-relcard" href="/industries/law-firms">
              <h3>For Law Firms</h3>
              <p>Discovery, evidence bundles and cross-border matters.</p>
            </Link>
            <Link className="pw-relcard" href="/industries/immigration-law">
              <h3>For Immigration Practices</h3>
              <p>Civil documents, evidence and asylum filings.</p>
            </Link>
            <Link className="pw-relcard" href="/blog/certified-vs-notarized-translation">
              <h3>Certified vs Notarized</h3>
              <p>The distinction explained in full.</p>
            </Link>
          </div>
        </div>

        <div className="pw-section">
          <p className="k">Questions</p>
          <h2>Court translation, answered</h2>
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
        title="Need a certified translation for a filing"
        body="Tell us the court and the deadline. A Project Coordinator will confirm what is required and whether the timeline is achievable before quoting."
      />
    </div>
  );
}
