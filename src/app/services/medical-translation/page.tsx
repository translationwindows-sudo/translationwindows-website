import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { FaqAccordion } from "@/components/pillar/faq-accordion";
import { Crumb, CtaBand, PwHero } from "@/components/pillar/pillar-parts";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/schema";
import "@/styles/pillar.css";

const PATH = "/services/medical-translation";

export const metadata: Metadata = {
  title: "Medical Translation Services — Records, Devices and Clinical Documents",
  description:
    "Medical translation for clinics, device manufacturers, insurers and law firms: patient records, clinical documentation, instructions for use and regulatory material. Secure handling, 230+ language combinations.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Medical Translation Services — Translation Windows",
    description:
      "Medical translation for patient records, clinical documentation, device instructions and regulatory material.",
    url: PATH,
    type: "article",
  },
};

const faqs = [
  {
    q: "How do you protect patient information?",
    a: "Documents are validated on upload and stored outside any publicly accessible path. Access is limited to the coordinator and the linguists assigned to the project, and those linguists see the documents, languages and deadline — not patient identities held elsewhere in the system or any commercial detail. If your organization requires a specific data-handling agreement, send it and we will sign it before work begins.",
  },
  {
    q: "Do your translators have medical backgrounds?",
    a: "Medical work is assigned to linguists with experience in clinical and life-sciences texts. This matters more than it might seem: dosage, laterality, negation and abbreviation are all places where an ordinary translation error becomes a clinical one. A linguist who has not read discharge summaries before will not reliably catch that mg and mcg are not interchangeable.",
  },
  {
    q: "Can you translate patient records for an insurance claim?",
    a: "Yes. Clinical notes, discharge summaries, imaging reports, test results and correspondence are among the most common requests. Where the claim is being made in another country, tell us the destination — the level of detail expected varies, and it is easier to prepare correctly than to revise.",
  },
  {
    q: "Do you handle instructions for use and device labelling?",
    a: "Yes — instructions for use, labelling, packaging, clinical evaluation material and technical files. Device documentation carries regulatory requirements that differ by market, so tell us which markets you are entering and we will scope accordingly.",
  },
  {
    q: "Is a certified translation needed for medical documents?",
    a: "It depends who is receiving them. Insurers, courts and immigration authorities usually require certification with a signed Certificate of Accuracy, which we provide. A clinic reading a patient history for treatment purposes generally does not. If you are unsure, ask — there is no reason to pay for certification nobody asked for.",
  },
  {
    q: "How do you keep terminology consistent?",
    a: "Translation memory and a project glossary keep drug names, device terminology, anatomical terms and recurring phrasing identical across every document. On device documentation especially — where the same warning may appear in a manual, on a label and in a training file — consistency is a regulatory expectation, not a nicety.",
  },
  {
    q: "What is your turnaround on medical documents?",
    a: "Short records are typically 1–2 business days and standard document projects 2–3. Technical manuals, regulatory submissions and multilingual device documentation depend on volume and complexity. We will give you a date we can meet rather than one that sounds good.",
  },
  {
    q: "Can you translate handwritten clinical notes?",
    a: "Often, though it depends entirely on legibility. Handwritten notes are common in older records and in some healthcare systems. Where something is genuinely unreadable we flag it rather than guess — an invented reading in a medical record is worse than an acknowledged gap.",
  },
];

const documents = [
  { name: "Patient records and clinical notes", note: "Histories, consultations, progress notes and referrals." },
  { name: "Discharge summaries", note: "Frequently needed for continuity of care across borders." },
  { name: "Imaging and laboratory reports", note: "Radiology, pathology and diagnostic results." },
  { name: "Instructions for use", note: "Device IFUs, manuals and quick-reference guides." },
  { name: "Labelling and packaging", note: "Where regulatory wording differs by market." },
  { name: "Clinical evaluation material", note: "Reports, literature reviews and technical files." },
  { name: "Informed consent forms", note: "Where comprehension in the patient's own language is the point." },
  { name: "Insurance and claims documentation", note: "Supporting evidence for cross-border claims." },
  { name: "Regulatory submissions", note: "Material prepared for market authorization." },
  { name: "Training and educational material", note: "For clinicians, distributors and patients." },
];

const care = [
  { h: "Where errors become clinical",
    p: "Dosage units, laterality, negation and abbreviation are the recurring danger points. A dropped negation in a contraindication changes its meaning entirely." },
  { h: "Audience decides register",
    p: "A patient-facing consent form and a regulatory technical file describe the same device in very different language. Writing both as though they had one audience serves neither." },
  { h: "Regulatory wording is not free text",
    p: "Some phrasing is prescribed by the receiving market. Improving it is not an improvement." },
  { h: "Consistency across a document set",
    p: "The same warning appearing in a manual, a label and a training deck should read identically. Translation memory enforces that." },
  { h: "Human review, always",
    p: "A second linguist reads the translation against the original before it is delivered. On medical work this is not optional." },
];

export default function Page() {
  return (
    <div className="pw" id="top">
      <JsonLd
        data={graph(
          serviceSchema({
            name: "Medical Translation",
            description:
              "Medical and life-sciences translation covering patient records, clinical documentation, medical device instructions for use, labelling and regulatory material.",
            path: PATH,
            serviceType: "Medical and Life Sciences Translation",
          }),
          faqSchema(faqs, PATH),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/solutions" },
            { name: "Medical Translation", path: PATH },
          ]),
        )}
      />

      <Container>
        <Crumb label="Medical Translation" />
        <PwHero
          eyebrow="Medical and Life Sciences Translation"
          title="Medical translation, where accuracy is not a matter of style."
        >
          Patient records, clinical documentation, device instructions and regulatory material —
          translated by linguists experienced in medical texts, reviewed by a second reader, and
          handled with the confidentiality health information requires.
        </PwHero>
      </Container>

      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <p className="k">What is at stake</p>
          <h2>Why medical translation is treated differently</h2>
          <p className="pw-lead">
            In most translation, an error is an embarrassment. In medical translation it can reach
            a patient. That single difference shapes how the work is assigned, reviewed and
            delivered.
          </p>
          <p>
            The failures are rarely exotic. They cluster around a handful of predictable places:
            units that look similar and are not, a negation lost in a long sentence, an
            abbreviation that means one thing in cardiology and another in obstetrics, left
            confused with right. A generalist translator with excellent language skills will
            produce fluent text and may still miss all four.
          </p>
          <p>
            So medical work goes to linguists who have read this kind of document before, and every
            translation is read back against the original by a second person before it leaves.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">How we work</p>
          <h2>What careful medical translation involves</h2>
          <ol className="pw-steps">
            {care.map((c, i) => (
              <li key={c.h}>
                <span className="pw-stepn">{i + 1}</span>
                <div><h3>{c.h}</h3><p>{c.p}</p></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="pw-section">
          <p className="k">What we translate</p>
          <h2>Medical documents we handle</h2>
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
          <h2>How health information is handled</h2>
          <ul className="pw-list">
            <li><strong>Stored outside public paths.</strong> Files are validated on upload and held where no web request can reach them.</li>
            <li><strong>Access limited to the assigned team.</strong> A named coordinator and the linguists working the project.</li>
            <li><strong>Linguists see documents, not identities.</strong> Assigned translators receive the files, languages, deadline and brief — not the client record held elsewhere in our system.</li>
            <li><strong>A full audit trail.</strong> Every action recorded with the person and the time.</li>
            <li><strong>Your agreements, signed.</strong> If your organization requires specific data-handling terms, send them before work begins.</li>
          </ul>
        </div>

        <div className="pw-section">
          <p className="k">Timing</p>
          <h2>Turnaround on medical work</h2>
          <table className="pw-table">
            <thead><tr><th>Type of project</th><th>Typical delivery</th></tr></thead>
            <tbody>
              <tr>
                <td>Short records and certificates<br /><span className="pw-tnote">Vaccination records, single reports, brief notes</span></td>
                <td>1–2 business days</td>
              </tr>
              <tr>
                <td>Standard document projects<br /><span className="pw-tnote">Discharge summaries, clinical histories, claim files</span></td>
                <td>2–3 business days</td>
              </tr>
              <tr>
                <td>Technical and regulatory material<br /><span className="pw-tnote">Device documentation, submissions, multilingual sets</span></td>
                <td>Depends on volume and complexity</td>
              </tr>
            </tbody>
          </table>
          <p className="pw-tsmall">
            Larger or more complex projects may require additional review time. Regulatory work in
            particular is scoped before it begins, so the date we give you is one we can meet.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">Related services</p>
          <h2>Where to go next</h2>
          <div className="pw-related">
            <Link className="pw-relcard" href="/services/certified-translation">
              <h3>Certified Translation</h3>
              <p>When an insurer, court or agency requires certification.</p>
            </Link>
            <Link className="pw-relcard" href="/services/legal-translation">
              <h3>Legal Translation</h3>
              <p>Medical records in personal injury and negligence matters.</p>
            </Link>
            <Link className="pw-relcard" href="/services/website-localization">
              <h3>Website Localization</h3>
              <p>Patient-facing content and device portals in multiple markets.</p>
            </Link>
            <Link className="pw-relcard" href="/industries">
              <h3>Industries we serve</h3>
              <p>Healthcare, medical devices, law, technology and education.</p>
            </Link>
          </div>
        </div>

        <div className="pw-section">
          <p className="k">Questions</p>
          <h2>Medical translation, answered</h2>
          <FaqAccordion items={faqs} />
        </div>
      </Container>

      <CtaBand
        title="Start your medical translation"
        body="Upload your documents and a Project Coordinator will review scope, terminology and confidentiality requirements before preparing a quotation."
      />
    </div>
  );
}
