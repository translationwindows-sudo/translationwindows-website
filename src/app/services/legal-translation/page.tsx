import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { FaqAccordion } from "@/components/pillar/faq-accordion";
import { Crumb, CtaBand, PwHero } from "@/components/pillar/pillar-parts";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/schema";
import "@/styles/pillar.css";

const PATH = "/services/legal-translation";

export const metadata: Metadata = {
  title: "Legal Translation Services — Contracts, Court Filings and Evidence",
  description:
    "Certified legal translation for law firms and corporate counsel: contracts, judgments, affidavits, discovery and court filings. Signed Certificate of Accuracy, secure handling, 230+ language combinations.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Legal Translation Services — Translation Windows",
    description:
      "Certified legal translation for law firms: contracts, judgments, affidavits, discovery and court filings.",
    url: PATH,
    type: "article",
  },
};

const faqs = [
  {
    q: "Do you provide certified translations for court filings?",
    a: "Yes. Every certified translation includes a signed Certificate of Accuracy naming the translator, identifying the languages and confirming the translation is complete and accurate. Requirements vary between jurisdictions — some courts ask for notarization or a sworn declaration in a particular form. Tell your Project Coordinator which court and we will prepare it accordingly.",
  },
  {
    q: "How do you handle privileged or confidential material?",
    a: "Documents are validated on upload and stored outside any publicly accessible path. Access is limited to the coordinator and the linguists assigned to your matter, and assigned linguists see the documents, languages and deadline — not client identities or commercial detail. If your firm requires a specific confidentiality undertaking, send it and we will sign it before work begins.",
  },
  {
    q: "Can you maintain consistent terminology across a long matter?",
    a: "Yes, and on litigation of any size it is essential. Translation memory and a matter-specific glossary keep defined terms, party names and contractual language identical from the first exhibit to the last. Where a term was rendered a particular way in an earlier filing, it stays that way — inconsistency between documents is the kind of thing opposing counsel notices.",
  },
  {
    q: "What is your turnaround on legal documents?",
    a: "Standard document projects are typically 2–3 business days. Large legal projects — discovery sets, full case bundles, multilingual matters — depend on volume and complexity, and we will give you a realistic date rather than an optimistic one. If you are working to a filing deadline, tell us at the outset and we will confirm whether it is achievable.",
  },
  {
    q: "Do your translators have legal training?",
    a: "Legal work is assigned to linguists with experience in legal texts and the relevant jurisdiction, because legal translation is as much about legal systems as language. A term with no equivalent in the target system — a trust, an usufruct, a Bereitschaftsdienst — requires judgement about whether to translate, transliterate or annotate. That is not a decision to leave to a generalist.",
  },
  {
    q: "Can you handle discovery and high-volume document sets?",
    a: "Yes. Large sets are scoped before work begins so that terminology, formatting and file naming are consistent across the whole production. Tell us the volume, the languages and the deadline and we will tell you honestly what is achievable.",
  },
  {
    q: "Do you translate documents for arbitration and international matters?",
    a: "Yes — arbitration filings, foreign judgments, letters rogatory, corporate records and evidence from foreign proceedings. Cross-border matters often involve several source languages at once, which is where consistent terminology and a single point of coordination matter most.",
  },
  {
    q: "Is notarization required for legal translations?",
    a: "It depends on the receiving body. Many courts accept a certified translation with a signed Certificate of Accuracy. Others, and some foreign jurisdictions, require notarization or legalization. We can arrange notarization when it is required — tell us the destination and we will advise rather than let you pay for something unnecessary.",
  },
];

const documents = [
  { name: "Contracts and agreements", note: "Commercial, employment, licensing and shareholder agreements." },
  { name: "Court filings and pleadings", note: "Complaints, motions, briefs and responses for filing." },
  { name: "Judgments and orders", note: "Foreign judgments for recognition and enforcement." },
  { name: "Affidavits and declarations", note: "Sworn statements requiring precise, defensible rendering." },
  { name: "Discovery and evidence", note: "Correspondence, records and exhibits, at volume." },
  { name: "Powers of attorney", note: "Including forms intended for use abroad." },
  { name: "Corporate records", note: "Articles, resolutions, registers and due diligence material." },
  { name: "Patents and IP filings", note: "Where technical and legal precision meet." },
  { name: "Wills, probate and estates", note: "Cross-border inheritance and succession documents." },
  { name: "Regulatory and compliance", note: "Filings, correspondence and internal investigations." },
];

const why = [
  { h: "Precision over fluency",
    p: "A legal translation is read adversarially. It should be accurate before it is elegant, and where the source is ambiguous the translation should not resolve that ambiguity on the author's behalf." },
  { h: "Legal systems, not just languages",
    p: "Concepts frequently have no counterpart in the target system. Handling that well means knowing when to translate, when to keep the original term, and when to add a translator's note." },
  { h: "Consistency across the matter",
    p: "Defined terms, party names and clause references must match across every document, including ones translated months apart." },
  { h: "Confidentiality as a default",
    p: "Access limited to the assigned team, documents stored outside public paths, and linguists who never see who the client is." },
  { h: "An auditable record",
    p: "Every project carries a full history — who did what, and when. Useful when a matter is examined long after the work is done." },
];

export default function Page() {
  return (
    <div className="pw" id="top">
      <JsonLd
        data={graph(
          serviceSchema({
            name: "Legal Translation",
            description:
              "Certified legal translation for law firms and corporate counsel, including contracts, court filings, judgments, affidavits and discovery material.",
            path: PATH,
            serviceType: "Legal Document Translation",
          }),
          faqSchema(faqs, PATH),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/solutions" },
            { name: "Legal Translation", path: PATH },
          ]),
        )}
      />

      <Container>
        <Crumb label="Legal Translation" />
        <PwHero
          eyebrow="Legal and Court Translation"
          title="Legal translation, precise enough to be read adversarially."
        >
          Contracts, filings, judgments and evidence — translated by linguists experienced in legal
          texts, with consistent terminology across the whole matter and a signed Certificate of
          Accuracy where certification is required.
        </PwHero>
      </Container>

      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <p className="k">What makes it different</p>
          <h2>Legal translation is not general translation</h2>
          <p className="pw-lead">
            A marketing brochure can be improved in translation. A contract cannot. Legal
            translation is constrained work: the task is to carry meaning across without adding,
            removing or resolving anything the original left open.
          </p>
          <p>
            The difficulty is rarely vocabulary. It is that legal concepts are creatures of the
            systems that produced them. A common-law trust has no clean civil-law equivalent. A
            German <em>Vollstreckungsbescheid</em> is not quite a default judgment. Rendering these
            well requires deciding — case by case — whether to translate, retain the original term,
            or add a note. Get it wrong and a clause means something the drafter never intended.
          </p>
          <p>
            The second difficulty is consistency. A matter may run for years and produce hundreds
            of documents. If a defined term is translated three different ways across three
            filings, someone will notice, and explaining it will cost more than doing it properly
            would have.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">How we work</p>
          <h2>What legal clients get from us</h2>
          <ol className="pw-steps">
            {why.map((w, i) => (
              <li key={w.h}>
                <span className="pw-stepn">{i + 1}</span>
                <div><h3>{w.h}</h3><p>{w.p}</p></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="pw-section">
          <p className="k">What we translate</p>
          <h2>Legal documents we handle</h2>
          <div className="pw-doclist">
            {documents.map((d) => (
              <div className="pw-docitem" key={d.name}>
                <p className="pw-docname">{d.name}</p>
                <p className="pw-docnote">{d.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pw-section">
          <p className="k">Confidentiality</p>
          <h2>How your documents are handled</h2>
          <p>
            Law firms send us material that is privileged, commercially sensitive, or both. The
            handling reflects that.
          </p>
          <ul className="pw-list">
            <li><strong>Stored outside public paths.</strong> Files are validated on upload and held where no web request can reach them.</li>
            <li><strong>Access limited to the assigned team.</strong> A named coordinator and the linguists working the matter — nobody else.</li>
            <li><strong>Linguists never see the client.</strong> Assigned translators receive the documents, languages, deadline and a brief. Not who the client is, not what it costs.</li>
            <li><strong>A full audit trail.</strong> Every action on a project is recorded with the person and the time.</li>
            <li><strong>Your paperwork, signed.</strong> If your firm requires a specific NDA or confidentiality undertaking, send it before work begins.</li>
          </ul>
        </div>

        <div className="pw-section">
          <p className="k">Timing</p>
          <h2>Turnaround on legal work</h2>
          <table className="pw-table">
            <thead><tr><th>Type of project</th><th>Typical delivery</th></tr></thead>
            <tbody>
              <tr>
                <td>Short certified documents<br /><span className="pw-tnote">Powers of attorney, single affidavits, certificates</span></td>
                <td>1–2 business days</td>
              </tr>
              <tr>
                <td>Standard legal documents<br /><span className="pw-tnote">Contracts, pleadings, judgments</span></td>
                <td>2–3 business days</td>
              </tr>
              <tr>
                <td>Large legal projects<br /><span className="pw-tnote">Discovery sets, case bundles, multilingual matters</span></td>
                <td>Depends on volume and complexity</td>
              </tr>
            </tbody>
          </table>
          <p className="pw-tsmall">
            Larger or more complex projects may require additional review time. If you are working
            to a filing deadline, tell us at the outset — we would rather decline than miss it.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">Related services</p>
          <h2>Where to go next</h2>
          <div className="pw-related">
            <Link className="pw-relcard" href="/services/certified-translation">
              <h3>Certified Translation</h3>
              <p>What certification means and when a court will require it.</p>
            </Link>
            <Link className="pw-relcard" href="/services/uscis-translation">
              <h3>USCIS Translation</h3>
              <p>Immigration filings and supporting evidence.</p>
            </Link>
            <Link className="pw-relcard" href="/services/medical-translation">
              <h3>Medical Translation</h3>
              <p>Clinical records for personal injury and medical negligence matters.</p>
            </Link>
            <Link className="pw-relcard" href="/resources/court-translation-requirements">
              <h3>Court requirements reference</h3>
              <p>Which courts require certification, which require notarization, and where to verify.</p>
            </Link>
          </div>
        </div>

        <div className="pw-section">
          <p className="k">Questions</p>
          <h2>Legal translation, answered</h2>
          <FaqAccordion items={faqs} />
        </div>
      </Container>

      <CtaBand
        title="Start your legal translation"
        body="Upload your documents and a Project Coordinator will review scope, terminology and deadline before preparing a quotation. Most requests are reviewed within 30–60 minutes during business hours."
      />
    </div>
  );
}
