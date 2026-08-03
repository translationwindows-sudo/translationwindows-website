import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { FaqAccordion } from "@/components/pillar/faq-accordion";
import { Crumb, CtaBand, PwHero } from "@/components/pillar/pillar-parts";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/schema";
import "@/styles/pillar.css";

const PATH = "/services/uscis-translation";

export const metadata: Metadata = {
  title: "USCIS Translation Services — Certified for Immigration Applications",
  description:
    "Certified translation prepared for USCIS immigration applications, with a signed Certificate of Accuracy. Birth and marriage certificates typically delivered in 1–2 business days. 230+ language combinations.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "USCIS Translation Services — Translation Windows",
    description:
      "Certified translation prepared to meet USCIS document translation requirements, with a signed Certificate of Accuracy.",
    url: PATH,
    type: "article",
  },
};

const faqs = [
  {
    q: "What does USCIS require for a translated document?",
    a: "USCIS asks that any document not in English be accompanied by a full English translation, together with a certification from the translator confirming the translation is complete and accurate and that they are competent to translate from the foreign language into English. That certification — the Certificate of Accuracy — is included with every certified translation we deliver.",
  },
  {
    q: "Does USCIS require the translation to be notarized?",
    a: "Generally no. USCIS requires a certified translation, not a notarized one. Notarization verifies who signed the certificate, not whether the translation is accurate, and paying for it when it has not been asked for is one of the more common wasted expenses in an application. If a specific officer or a different agency asks for notarization, we can arrange it.",
  },
  {
    q: "Can I translate my own documents for my USCIS application?",
    a: "You should not. USCIS expects the translation to be certified by someone competent and independent — an applicant translating their own birth certificate cannot reasonably attest to impartiality. The same caution applies to translations by a spouse or close relative. It is a frequent cause of Requests for Evidence, which cost weeks.",
  },
  {
    q: "Which documents usually need translating for immigration?",
    a: "Most commonly birth certificates, marriage certificates, divorce decrees, police and background certificates, academic diplomas and transcripts, passports and identity pages, and court records. Financial documents such as bank statements and employment letters come up in affidavit of support cases.",
  },
  {
    q: "How long does USCIS translation take?",
    a: "Small certified documents such as birth and marriage certificates are typically delivered within 1–2 business days. Standard document projects take 2–3 business days. Larger or more complex projects may require additional review time so we can prepare accurate work.",
  },
  {
    q: "What happens if USCIS rejects my translation?",
    a: "Rejections of the translation itself are usually about completeness or certification rather than language quality — a missing stamp, an untranslated seal, or a certificate that does not name the translator. If a Request for Evidence relates to a translation we prepared, tell your Project Coordinator and we will address it.",
  },
  {
    q: "Do you provide a Certificate of Accuracy with every translation?",
    a: "Yes. Every certified translation includes a signed Certificate of Accuracy naming the translator, identifying the languages and the document, and confirming the translation is complete and accurate. It is delivered alongside the translation.",
  },
  {
    q: "Will USCIS accept your translation?",
    a: "Our translations are prepared to meet USCIS document translation requirements and include the certification those applications call for. No company can guarantee acceptance — that decision rests with the officer reviewing your case and depends on the application as a whole. What we control is that the translation is complete, accurate, properly formatted and correctly certified.",
  },
];

const mistakes = [
  { h: "Leaving stamps and seals untranslated",
    p: "Every mark on the document must be accounted for. Where a seal cannot be translated, it should be described — [Round seal: Civil Registry Office, Bogotá]. Omitting one because it looked decorative is a common reason a document is queried." },
  { h: "Translating only part of a document",
    p: "The reverse of a certificate, marginal annotations, amendment notes — all of it forms part of the record. A partial translation is not a certified translation, however accurate the part that was done." },
  { h: "Inconsistent name spellings across documents",
    p: "If a surname is transliterated one way on a birth certificate and another on a passport, an officer has to reconcile two apparently different people. We keep names consistent across every document in a set." },
  { h: "Using a relative as translator",
    p: "Even a fluent, well-intentioned family member creates an independence problem. The certification carries far less weight, and it is an avoidable risk on an application that has already taken months." },
  { h: "Losing the original layout",
    p: "An officer should be able to place the translation beside the original and follow it. A reformatted document with different structure makes verification slow and invites questions." },
  { h: "Paying for notarization that was never required",
    p: "Most USCIS applications need certification only. Ask before adding it — we will tell you honestly whether your receiving organization is likely to want it." },
];

const documents = [
  "Birth certificates", "Marriage certificates", "Divorce decrees",
  "Police and background certificates", "Academic diplomas", "Academic transcripts",
  "Passports and identity pages", "Court records and judgments",
  "Adoption records", "Death certificates", "Bank statements", "Employment letters",
];

export default function Page() {
  return (
    <div className="pw" id="top">
      <JsonLd
        data={graph(
          serviceSchema({
            name: "USCIS Translation",
            description:
              "Certified document translation prepared for USCIS immigration applications, including a signed Certificate of Accuracy.",
            path: PATH,
            serviceType: "Certified Translation for Immigration",
          }),
          faqSchema(faqs, PATH),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/solutions" },
            { name: "USCIS Translation", path: PATH },
          ]),
        )}
      />

      <Container>
        <Crumb label="USCIS Translation" />
        <PwHero
          eyebrow="Translation for Immigration Applications"
          title="Certified translation, prepared for USCIS applications."
        >
          Every translation includes a signed Certificate of Accuracy — the certification USCIS
          asks for. Birth and marriage certificates are typically delivered within 1–2 business
          days, across 230+ language combinations.
        </PwHero>
      </Container>

      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <p className="k">The requirement</p>
          <h2>What USCIS actually asks for</h2>
          <p className="pw-lead">
            Any document submitted to USCIS that is not in English must be accompanied by a
            complete English translation, together with a certification from the translator
            confirming that the translation is complete and accurate, and that they are competent
            to translate between the two languages.
          </p>
          <p>
            That is the whole requirement, and it is narrower than most people expect. There is no
            approved translator list. No government certification body. No requirement that the
            translator hold a particular qualification. What matters is that the translation is
            complete, that it is accurate, and that a competent person signs their name to it.
          </p>
          <p>
            This is also why so much of the anxiety around immigration translation is misplaced.
            Applicants worry about finding a translator with the right credential, when the actual
            failure points are far more mundane — an untranslated stamp, a page left out, a name
            spelled two different ways.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">A costly misconception</p>
          <h2>Certification, not notarization</h2>
          <p>
            <strong>USCIS requires a certified translation. It does not generally require a
            notarized one.</strong> The distinction is worth understanding before you pay for
            something you do not need.
          </p>
          <div className="pw-compare">
            <div className="pw-compare-col">
              <h3>What certification does</h3>
              <p>
                A translator signs a statement confirming the translation is complete and accurate
                and that they are competent in both languages. This addresses the quality of the
                translation, which is what USCIS is concerned with.
              </p>
            </div>
            <div className="pw-compare-col">
              <h3>What notarization does</h3>
              <p>
                A notary public witnesses the signature on that statement. The notary does not read
                the translation and does not speak the language. It verifies identity, not accuracy.
              </p>
            </div>
          </div>
          <p>
            Notarization becomes relevant when a specific organization asks for it — occasionally a
            court, a foreign consulate, or a state agency. We can arrange it when it is genuinely
            required. If you are unsure, ask before adding the cost.{" "}
            <Link href="/blog/certified-vs-notarized-translation">
              We explain the difference in more depth here
            </Link>.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">Where applications go wrong</p>
          <h2>Six mistakes that cause delays</h2>
          <p>
            Requests for Evidence relating to translations are rarely about translation quality.
            They are almost always about completeness or certification — and every one of these is
            avoidable.
          </p>
          <ol className="pw-steps">
            {mistakes.map((m, i) => (
              <li key={m.h}>
                <span className="pw-stepn">{i + 1}</span>
                <div>
                  <h3>{m.h}</h3>
                  <p>{m.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="pw-section">
          <p className="k">What we translate</p>
          <h2>Documents for immigration applications</h2>
          <p>
            Most petitions require several of these together. Submitting them as one set keeps
            names, dates and place names consistent across the whole application.
          </p>
          <div className="pw-doclist">
            {documents.map((d) => (
              <div className="pw-docitem" key={d}>
                <p className="pw-docname">{d}</p>
              </div>
            ))}
          </div>
          <p className="pw-tsmall">
            Not listed? Ask — if it exists on paper, it can almost certainly be certified.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">Timing</p>
          <h2>How quickly you will have it</h2>
          <table className="pw-table">
            <thead><tr><th>Type of project</th><th>Typical delivery</th></tr></thead>
            <tbody>
              <tr>
                <td>Birth, marriage and similar certificates<br />
                  <span className="pw-tnote">Single-page civil documents</span></td>
                <td>1–2 business days</td>
              </tr>
              <tr>
                <td>Standard document projects<br />
                  <span className="pw-tnote">Transcripts, court records, multi-page sets</span></td>
                <td>2–3 business days</td>
              </tr>
              <tr>
                <td>Large or complex applications<br />
                  <span className="pw-tnote">Full evidence bundles, multiple languages</span></td>
                <td>Depends on volume and complexity</td>
              </tr>
            </tbody>
          </table>
          <p className="pw-tsmall">
            Larger or more complex projects may require additional review time. Quotation requests
            are usually reviewed within 30–60 minutes during business hours, Monday to Friday,
            8:00 AM to 6:00 PM Central Time.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">Related services</p>
          <h2>Where to go next</h2>
          <div className="pw-related">
            <Link className="pw-relcard" href="/services/certified-translation">
              <h3>Certified Translation</h3>
              <p>What certification means, and which documents require it.</p>
            </Link>
            <Link className="pw-relcard" href="/services/birth-certificate-translation">
              <h3>Birth Certificate Translation</h3>
              <p>The document most often requested, and most often returned.</p>
            </Link>
            <Link className="pw-relcard" href="/blog/certified-translation-uscis">
              <h3>Guide: Certified translation for USCIS</h3>
              <p>A longer read on requirements and common pitfalls.</p>
            </Link>
            <Link className="pw-relcard" href="/services/legal-translation">
              <h3>Legal Translation</h3>
              <p>Court records, judgments and sworn documents.</p>
            </Link>
          </div>
        </div>

        <div className="pw-section">
          <p className="k">Questions</p>
          <h2>USCIS translation, answered</h2>
          <FaqAccordion items={faqs} />
        </div>
      </Container>

      <CtaBand
        title="Start your immigration translation"
        body="Upload your documents and a Project Coordinator will review them and prepare an accurate quotation. Most requests are reviewed within 30–60 minutes during business hours."
      />
    </div>
  );
}
