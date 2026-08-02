import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { FaqAccordion } from "@/components/pillar/faq-accordion";
import { Crumb, CtaBand, PwHero } from "@/components/pillar/pillar-parts";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/schema";
import "@/styles/pillar.css";

const PATH = "/services/certified-translation";

export const metadata: Metadata = {
  title: "Certified Translation Services — Signed Certificate of Accuracy",
  description:
    "Certified document translation prepared for USCIS immigration applications, courts, universities and employers. Every translation includes a signed Certificate of Accuracy. Small documents typically delivered in 1–2 business days.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Certified Translation Services — Translation Windows",
    description:
      "Certified document translation with a signed Certificate of Accuracy, prepared for USCIS, courts and universities.",
    url: PATH,
    type: "article",
  },
};

/* ── FAQs: real questions, answered honestly. Also feeds FAQ schema. ── */
const faqs = [
  {
    q: "What makes a translation certified?",
    a: "A certified translation is a complete, accurate translation accompanied by a signed Certificate of Accuracy — a statement from the translator or translation company confirming the translation is complete and accurate to the best of their knowledge, and that they are competent to translate between the two languages. Every certified translation we deliver includes that signed certificate. The translation itself is not altered by certification; the certificate is what receiving organizations rely on.",
  },
  {
    q: "Is a certified translation the same as a notarized translation?",
    a: "No, and the difference matters. Certification is about the accuracy of the translation. Notarization is about verifying the identity of the person signing the certificate — a notary confirms who signed, not whether the translation is correct. Most USCIS applications require a certified translation and do not require notarization. We can arrange notarization when a receiving organization specifically asks for it.",
  },
  {
    q: "Will USCIS accept your certified translation?",
    a: "Our certified translations are prepared to meet USCIS document translation requirements, and include the signed Certificate of Accuracy those applications call for. No translation company can guarantee acceptance, because acceptance is decided by the officer reviewing your case and depends on your application as a whole. What we can promise is that the translation is complete, accurate and properly certified.",
  },
  {
    q: "How long does a certified translation take?",
    a: "Small certified documents — birth certificates, marriage certificates, diplomas, transcripts, police certificates — are typically delivered within 1–2 business days. Standard document projects take 2–3 business days. Larger or more complex projects may require additional review time so we can prepare accurate work.",
  },
  {
    q: "How much does certified translation cost?",
    a: "Pricing depends on the document, its length, the language pair and whether certification, formatting or notarization is needed. We do not publish a single rate because it would be misleading. Upload your documents and a Project Coordinator reviews them and prepares an accurate quotation — most requests are reviewed within 30–60 minutes during business hours.",
  },
  {
    q: "Can I translate my own documents for an official application?",
    a: "Generally no. Receiving organizations expect a translation certified by someone independent of the applicant, because a self-translation cannot be treated as impartial. Even where a friend or relative translates, the certification carries less weight than one from a professional translator. This is one of the more common reasons applications are delayed.",
  },
  {
    q: "What languages do you cover?",
    a: "We work across 230+ language combinations, including all major European, Asian, Middle Eastern and African languages. If you are unsure whether we cover a particular pair, ask — the answer is usually yes, and if it is not, we will say so rather than take the project.",
  },
  {
    q: "Do you keep my documents secure?",
    a: "Yes. Documents are validated on upload, stored outside any publicly accessible path, and visible only to the coordinator and linguists assigned to your project. Translators working on your files see the documents, languages and deadline — not your contact details or anything commercially sensitive.",
  },
];

/* ── document types, each linking onward where a page exists ── */
const documents = [
  { name: "Birth certificates", href: "/services/birth-certificate-translation",
    note: "The most commonly requested certified document, and the one most often returned for formatting errors." },
  { name: "Marriage and divorce certificates", href: null,
    note: "Required for spousal petitions and name-change applications." },
  { name: "Academic diplomas and transcripts", href: null,
    note: "For university admissions, credential evaluation and professional licensing." },
  { name: "Police and background certificates", href: null,
    note: "Frequently requested for immigration and employment screening." },
  { name: "Passports and identity documents", href: null,
    note: "Usually needed alongside a primary document rather than alone." },
  { name: "Court and legal documents", href: "/services/legal-translation",
    note: "Judgments, affidavits, powers of attorney and contracts." },
  { name: "Medical records", href: "/services/medical-translation",
    note: "Clinical notes, discharge summaries and insurance documentation." },
  { name: "Financial and employment records", href: null,
    note: "Bank statements, tax records and letters of employment." },
];

const steps = [
  { n: "1", h: "Tell us what you need",
    p: "A short guided conversation — document type, languages, and what the translation is for. About a minute." },
  { n: "2", h: "Upload your documents",
    p: "Requested only once we understand the project. Files are validated and stored securely." },
  { n: "3", h: "A Project Coordinator reviews",
    p: "A person examines your documents and prepares an accurate quotation. Most requests are reviewed within 30–60 minutes during business hours." },
  { n: "4", h: "Translation and quality review",
    p: "A professional linguist translates; a second reads it against the original before anything is certified." },
  { n: "5", h: "Certification and delivery",
    p: "Your translation is issued with a signed Certificate of Accuracy and delivered through your project workspace." },
];

export default function Page() {
  return (
    <div className="pw" id="top">
      <JsonLd
        data={graph(
          serviceSchema({
            name: "Certified Translation",
            description:
              "Certified document translation with a signed Certificate of Accuracy, prepared for USCIS immigration applications, courts, universities and employers.",
            path: PATH,
            serviceType: "Certified Document Translation",
          }),
          faqSchema(faqs, PATH),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/solutions" },
            { name: "Certified Translation", path: PATH },
          ]),
        )}
      />

      <Container>
        <Crumb label="Certified Translation" />
        <PwHero
          eyebrow="Certified Document Translation"
          title="Certified translation, with the certificate that makes it count."
        >
          Every certified translation we deliver includes a signed Certificate of Accuracy —
          the document receiving organizations actually rely on. Prepared for USCIS immigration
          applications, and equally suited to courts, universities, employers and government agencies.
        </PwHero>
      </Container>

      <Container>
        {/* ── what it is ── */}
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <p className="k">The essentials</p>
          <h2>What a certified translation actually is</h2>
          <p className="pw-lead">
            A certified translation is a complete and accurate translation of a document,
            accompanied by a signed statement — the Certificate of Accuracy — confirming that
            the translation is faithful to the original and that the translator is competent to
            work between the two languages.
          </p>
          <p>
            The translation itself is not written differently because it is certified. What
            changes is that it arrives with evidence: a named signatory standing behind it. That
            is what an immigration officer, a court clerk or a university admissions office is
            looking for when they ask for a certified translation.
          </p>
          <p>
            Three things distinguish a certified translation from an ordinary one, and all three
            matter to whoever receives it:
          </p>
          <ul className="pw-list">
            <li>
              <strong>It is complete.</strong> Every element of the original appears — including
              stamps, seals, signatures and marginal notes, described where they cannot be
              translated. Omitting a stamp because it seemed unimportant is a common reason
              documents are returned.
            </li>
            <li>
              <strong>It mirrors the original layout.</strong> The reader should be able to hold
              both documents side by side and see which part corresponds to which. Tables stay
              tables; a seal in the top right stays in the top right.
            </li>
            <li>
              <strong>It carries a signed Certificate of Accuracy.</strong> Naming the translator,
              the languages, the date, and confirming the translation is complete and accurate.
            </li>
          </ul>
        </div>

        {/* ── certified vs notarized ── */}
        <div className="pw-section">
          <p className="k">A common confusion</p>
          <h2>Certified is not the same as notarized</h2>
          <p>
            These two words are used interchangeably in everyday conversation and mean quite
            different things in practice. Getting them confused costs applicants time and money,
            usually in the same direction — paying for notarization that was never required.
          </p>
          <div className="pw-compare">
            <div className="pw-compare-col">
              <h3>Certified translation</h3>
              <p>
                Concerns <strong>the accuracy of the translation</strong>. A translator or
                translation company signs a statement confirming the work is complete and
                accurate. This is what USCIS asks for, and what most universities, courts and
                employers require.
              </p>
            </div>
            <div className="pw-compare-col">
              <h3>Notarized translation</h3>
              <p>
                Concerns <strong>the identity of the signer</strong>. A notary public witnesses
                the signature on the certificate. The notary does not read the translation, does
                not speak the language, and makes no statement about accuracy.
              </p>
            </div>
          </div>
          <p>
            <strong>Most USCIS applications require a certified translation and do not require
            notarization.</strong> Notarization becomes relevant when a specific receiving
            organization asks for it — some courts, some foreign consulates, occasionally a
            university. We can arrange notarization when it is genuinely needed. If you are not
            sure, ask us before paying for it.
          </p>
          <p>
            <Link href="/blog/certified-vs-notarized-translation">
              We have written about this difference in more detail
            </Link>
            , including which organizations typically ask for which.
          </p>
        </div>

        {/* ── documents ── */}
        <div className="pw-section">
          <p className="k">What we translate</p>
          <h2>Documents we certify most often</h2>
          <p>
            Certified translation covers far more than immigration paperwork, though that is
            where most requests begin.
          </p>
          <div className="pw-doclist">
            {documents.map((d) => (
              <div className="pw-docitem" key={d.name}>
                <p className="pw-docname">
                  {d.href ? <Link href={d.href}>{d.name}</Link> : d.name}
                </p>
                <p className="pw-docnote">{d.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── process ── */}
        <div className="pw-section">
          <p className="k">How it works</p>
          <h2>From upload to certified translation</h2>
          <p>
            The process is deliberately transparent. You can see where your project stands at any
            point, and a named Project Coordinator is responsible for it from start to finish.
          </p>
          <ol className="pw-steps">
            {steps.map((s) => (
              <li key={s.n}>
                <span className="pw-stepn">{s.n}</span>
                <div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ── turnaround ── */}
        <div className="pw-section">
          <p className="k">Timing</p>
          <h2>How long certified translation takes</h2>
          <table className="pw-table">
            <thead>
              <tr><th>Type of project</th><th>Typical delivery</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Small certified documents<br />
                  <span className="pw-tnote">Birth and marriage certificates, diplomas, transcripts, police certificates</span></td>
                <td>1–2 business days</td>
              </tr>
              <tr>
                <td>Standard document projects<br />
                  <span className="pw-tnote">Multi-page records, contracts, reports</span></td>
                <td>2–3 business days</td>
              </tr>
              <tr>
                <td>Large or complex projects<br />
                  <span className="pw-tnote">Legal bundles, technical manuals, multilingual sets</span></td>
                <td>Depends on volume and complexity</td>
              </tr>
            </tbody>
          </table>
          <p className="pw-tsmall">
            Larger or more complex projects may require additional review time. Business hours are
            Monday to Friday, 8:00 AM to 6:00 PM Central Time.
          </p>
        </div>

        {/* ── working with us ── */}
        <div className="pw-section">
          <p className="k">Working with us</p>
          <h2>What you can expect</h2>
          <p>
            Translation is a service where most of the anxiety comes not from the translation
            itself but from not knowing what is happening. We have built our workflow around
            removing that.
          </p>
          <ul className="pw-list">
            <li>
              <strong>A named Project Coordinator.</strong> One person responsible for your
              project, reachable by email, phone or WhatsApp.
            </li>
            <li>
              <strong>Project tracking.</strong> A private link showing exactly where your project
              stands — received, under review, quotation, translation, quality review, delivered.
            </li>
            <li>
              <strong>Secure document handling.</strong> Files are validated on upload and stored
              outside any publicly accessible path. Assigned linguists see the documents and the
              deadline, not your contact details.
            </li>
            <li>
              <strong>Human quality assurance.</strong> A second linguist reads the translation
              against the original before anything is certified.
            </li>
            <li>
              <strong>Terminology consistency.</strong> Translation memory keeps names, titles and
              recurring terms identical across every document in a set — which matters when a
              surname is spelled one way on a birth certificate and another on a passport.
            </li>
          </ul>
        </div>

        {/* ── related ── */}
        <div className="pw-section">
          <p className="k">Related services</p>
          <h2>Where to go next</h2>
          <div className="pw-related">
            <Link className="pw-relcard" href="/services/uscis-translation">
              <h3>USCIS Translation</h3>
              <p>What immigration applications specifically require, and the mistakes that cause delays.</p>
            </Link>
            <Link className="pw-relcard" href="/services/birth-certificate-translation">
              <h3>Birth Certificate Translation</h3>
              <p>The single most requested certified document, and how to get it right first time.</p>
            </Link>
            <Link className="pw-relcard" href="/services/legal-translation">
              <h3>Legal Translation</h3>
              <p>Contracts, judgments and court filings, handled with the precision they demand.</p>
            </Link>
            <Link className="pw-relcard" href="/services/medical-translation">
              <h3>Medical Translation</h3>
              <p>Clinical records, device documentation and insurance paperwork.</p>
            </Link>
          </div>
        </div>

        {/* ── faq ── */}
        <div className="pw-section">
          <p className="k">Questions</p>
          <h2>Certified translation, answered</h2>
          <FaqAccordion items={faqs} />
        </div>
      </Container>

      <CtaBand
        title="Start your certified translation"
        body="Upload your documents and a Project Coordinator will review them and prepare an accurate quotation. Most requests are reviewed within 30–60 minutes during business hours."
      />
    </div>
  );
}
