import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { FaqAccordion } from "@/components/pillar/faq-accordion";
import { Crumb, CtaBand, PwHero } from "@/components/pillar/pillar-parts";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/schema";
import "@/styles/pillar.css";

const PATH = "/services/birth-certificate-translation";

export const metadata: Metadata = {
  title: "Birth Certificate Translation — Certified for USCIS and Official Use",
  description:
    "Certified birth certificate translation with a signed Certificate of Accuracy, prepared for USCIS immigration applications, universities and government agencies. Typically delivered in 1–2 business days.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Birth Certificate Translation — Translation Windows",
    description:
      "Certified birth certificate translation with a signed Certificate of Accuracy, typically delivered in 1–2 business days.",
    url: PATH,
    type: "article",
  },
};

const faqs = [
  {
    q: "How much does birth certificate translation cost?",
    a: "It depends on the language, the length of the document and whether notarization is needed. A single-page certificate from a common language pair sits at the lower end; a handwritten historical record with faded seals takes longer and costs more. We do not publish one rate because it would be misleading. Upload your certificate and a Project Coordinator prepares an accurate quotation, usually within 30–60 minutes during business hours.",
  },
  {
    q: "How long does it take?",
    a: "Birth certificates are typically delivered within 1–2 business days. If you need it sooner, say so when you submit — we will tell you honestly whether it is possible rather than promising and missing.",
  },
  {
    q: "Do I need the original certificate, or is a photo enough?",
    a: "A clear photograph or scan is normally sufficient. What matters is that every element is legible — including stamps, seals, marginal notes and anything printed on the reverse. If part of the image is cut off or blurred, we will ask for a better copy rather than guess.",
  },
  {
    q: "Do you translate the stamps and seals as well?",
    a: "Yes, and this is where many translations fall short. Every mark on the document must be accounted for. Where a seal cannot be translated word for word it is described in brackets — for example [Round seal: Civil Registry Office, Bogotá]. A translation that silently omits a stamp is incomplete, regardless of how good the rest is.",
  },
  {
    q: "Does the translation need to be notarized for USCIS?",
    a: "Generally no. USCIS requires a certified translation with a signed Certificate of Accuracy, which is what we provide. Notarization verifies who signed the certificate, not whether the translation is accurate. Some other organizations do ask for it, and we can arrange notarization when it is genuinely required.",
  },
  {
    q: "Can I translate my own birth certificate?",
    a: "You should not, even if you are fluent. Receiving organizations expect certification from someone independent of the applicant, and a self-translation cannot be treated as impartial. The same applies to a translation by a parent or spouse. It is a frequent cause of Requests for Evidence.",
  },
  {
    q: "My certificate is old and handwritten. Can you still do it?",
    a: "Usually yes. Historical and handwritten certificates are common — older European, Latin American and Asian records especially. They take more care, particularly where script has faded or an official has used an abbreviation no longer in use. Send what you have and we will tell you if anything is genuinely illegible rather than inventing a reading.",
  },
  {
    q: "What if my name is spelled differently on other documents?",
    a: "Tell your Project Coordinator. Transliteration between alphabets rarely has one right answer, and a surname can legitimately be rendered several ways. What matters is that your documents agree with one another and with your passport. We keep names consistent across every document in a set for exactly this reason.",
  },
];

const includes = [
  { h: "Every element of the original", p: "Front, reverse, marginal notes, amendments and registration numbers. Nothing is left out because it looked incidental." },
  { h: "Stamps and seals, described", p: "Translated where they can be, described in brackets where they cannot. An officer must be able to account for every mark." },
  { h: "The original layout preserved", p: "So the translation can be read side by side with the certificate and followed line for line." },
  { h: "A signed Certificate of Accuracy", p: "Naming the translator, identifying the languages and the document, and confirming the translation is complete and accurate." },
  { h: "Consistent names across your documents", p: "Translation memory keeps a surname, place name or parent's name identical across every document in your application." },
];

const uses = [
  { h: "USCIS immigration applications", p: "Family petitions, adjustment of status, naturalization and consular processing.", href: "/services/uscis-translation" },
  { h: "University admissions", p: "Often required alongside diplomas and transcripts for international applicants.", href: null },
  { h: "Passport and citizenship applications", p: "For dual nationality claims and passport renewals where the original record is foreign.", href: null },
  { h: "Court and legal proceedings", p: "Inheritance, custody, name change and probate matters.", href: "/services/legal-translation" },
  { h: "Employment and licensing", p: "Background checks, professional registration and certain security clearances.", href: null },
  { h: "Social security and benefits", p: "Where proof of birth or parentage is required by a government agency.", href: null },
];

export default function Page() {
  return (
    <div className="pw" id="top">
      <JsonLd
        data={graph(
          serviceSchema({
            name: "Birth Certificate Translation",
            description:
              "Certified birth certificate translation with a signed Certificate of Accuracy, prepared for USCIS immigration applications, universities and government agencies.",
            path: PATH,
            serviceType: "Certified Birth Certificate Translation",
          }),
          faqSchema(faqs, PATH),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/solutions" },
            { name: "Birth Certificate Translation", path: PATH },
          ]),
        )}
      />

      <Container>
        <Crumb label="Birth Certificate Translation" />
        <PwHero
          eyebrow="Certified Birth Certificate Translation"
          title="Your birth certificate, translated and certified properly."
        >
          A signed Certificate of Accuracy with every translation, prepared for USCIS immigration
          applications, universities and government agencies. Typically delivered within
          1–2 business days, across 230+ language combinations.
        </PwHero>
      </Container>

      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <p className="k">Why this document</p>
          <h2>The most requested document, and the most often returned</h2>
          <p className="pw-lead">
            A birth certificate is usually the first document anyone needs translated, and it is
            the one most frequently sent back for correction. Not because the language is
            difficult — a birth certificate contains perhaps forty words — but because completeness
            matters more than eloquence, and small omissions are easy to make.
          </p>
          <p>
            The certificate is a legal record of identity and parentage. Whoever receives the
            translation is checking it against the original, mark by mark. A missing registration
            stamp or an untranslated note in the margin raises a question that costs weeks to
            answer.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">What you receive</p>
          <h2>What a proper certified translation includes</h2>
          <ol className="pw-steps">
            {includes.map((inc, i) => (
              <li key={inc.h}>
                <span className="pw-stepn">{i + 1}</span>
                <div><h3>{inc.h}</h3><p>{inc.p}</p></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="pw-section">
          <p className="k">Where it is needed</p>
          <h2>What people use these translations for</h2>
          <div className="pw-doclist">
            {uses.map((u) => (
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
          <p className="k">Timing and cost</p>
          <h2>How long, and how much</h2>
          <table className="pw-table">
            <thead><tr><th>Situation</th><th>Typical delivery</th></tr></thead>
            <tbody>
              <tr>
                <td>Single birth certificate<br />
                  <span className="pw-tnote">Clear scan, common language pair</span></td>
                <td>1–2 business days</td>
              </tr>
              <tr>
                <td>Several documents together<br />
                  <span className="pw-tnote">Birth, marriage and supporting records as one set</span></td>
                <td>2–3 business days</td>
              </tr>
              <tr>
                <td>Historical or handwritten records<br />
                  <span className="pw-tnote">Faded script, archaic terminology, damaged originals</span></td>
                <td>Depends on legibility and complexity</td>
              </tr>
            </tbody>
          </table>
          <p className="pw-tsmall">
            Larger or more complex projects may require additional review time. We do not publish a
            fixed price because language, length and legibility genuinely change the work involved.
            Upload your certificate and you will have an accurate quotation, usually within
            30–60 minutes during business hours.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">Practical advice</p>
          <h2>Before you send your certificate</h2>
          <ul className="pw-list">
            <li>
              <strong>Photograph the whole page.</strong> Including the edges. Cropped corners
              often remove a registration number or a stamp.
            </li>
            <li>
              <strong>Include the reverse.</strong> Many certificates carry annotations,
              apostilles or amendment notes on the back. If in doubt, send both sides.
            </li>
            <li>
              <strong>Check the light.</strong> A photograph taken at an angle in poor light can
              render an embossed seal invisible. Flat, well lit, straight on.
            </li>
            <li>
              <strong>Tell us the spelling on your passport.</strong> If your name is transliterated
              from another alphabet, we will match your existing documents rather than picking our
              own rendering.
            </li>
            <li>
              <strong>Say what it is for.</strong> USCIS, a university and a court have slightly
              different expectations. Knowing the destination lets us prepare it correctly first time.
            </li>
          </ul>
        </div>

        <div className="pw-section">
          <p className="k">Related services</p>
          <h2>Where to go next</h2>
          <div className="pw-related">
            <Link className="pw-relcard" href="/services/uscis-translation">
              <h3>USCIS Translation</h3>
              <p>What immigration applications require, and the mistakes that cause delays.</p>
            </Link>
            <Link className="pw-relcard" href="/services/certified-translation">
              <h3>Certified Translation</h3>
              <p>What certification means and which documents need it.</p>
            </Link>
            <Link className="pw-relcard" href="/blog/certified-vs-notarized-translation">
              <h3>Certified vs notarized</h3>
              <p>The difference, and which one you actually need.</p>
            </Link>
            <Link className="pw-relcard" href="/languages">
              <h3>Languages we cover</h3>
              <p>230+ combinations, from Spanish and Arabic to Norwegian and Korean.</p>
            </Link>
          </div>
        </div>

        <div className="pw-section">
          <p className="k">Questions</p>
          <h2>Birth certificate translation, answered</h2>
          <FaqAccordion items={faqs} />
        </div>
      </Container>

      <CtaBand
        title="Translate your birth certificate"
        body="Upload a clear photograph or scan and a Project Coordinator will review it and prepare an accurate quotation. Most requests are reviewed within 30–60 minutes during business hours."
      />
    </div>
  );
}
