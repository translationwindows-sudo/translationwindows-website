import type { Metadata } from "next";

import { DocumentPage } from "@/features/services/document-page";
import "@/styles/pillar.css";

const PATH = "/services/business-translation";

export const metadata: Metadata = {
  title: "Business Translation Services — Corporate Documents and Communication",
  description:
    "Business translation for corporate documents, reports, presentations, HR material and internal communication. Managed terminology, consistent brand voice, 230+ language combinations.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Business Translation — Translation Windows",
    description: "Business translation for corporate documents, reports, presentations and internal communication.",
    url: PATH, type: "article",
  },
};

const faqs = [
  { q: "What counts as business translation?",
    a: "Everything a company produces that is not a contract, a manual or a website: annual reports, board papers, presentations, HR policies, training material, internal announcements, marketing collateral and customer correspondence. It is the largest category by volume and the one where tone matters most, because the reader is usually a colleague or a customer rather than an official." },
  { q: "Can you match our existing tone of voice?",
    a: "Yes, and it is worth setting up properly at the start. Send us material you consider well written in the source language, along with any style guide or previously approved translations. Where a company has a deliberately warm or deliberately formal register, that should survive translation — a policy document that reads as legalistic in one language and chatty in another undermines both." },
  { q: "How do you keep terminology consistent across departments?",
    a: "A shared glossary and translation memory held against your account rather than a single project. When marketing, HR and finance all refer to the same product or the same internal programme, the translation is identical regardless of which team commissioned it or how many months apart." },
  { q: "Do you handle confidential material such as board papers?",
    a: "Yes. Documents are validated on upload and stored outside any publicly accessible path, with access limited to the coordinator and assigned linguists. Assigned linguists see the documents and the deadline, not who the client is. If your company requires a specific confidentiality agreement, send it before work begins." },
  { q: "Can you translate presentations and keep the formatting?",
    a: "Yes. Slide decks are among the most common requests and among the easiest to get wrong, because translated text rarely fits the box it came from. We return decks that are usable — text adjusted to fit, layouts respected — rather than technically translated files somebody then has to rebuild." },
  { q: "What is your turnaround on business documents?",
    a: "Standard documents are typically 2–3 business days. Reports, multilingual sets and large internal communications programmes depend on volume. If you have a board date or an announcement window, tell us at the outset so we can confirm what is realistic." },
  { q: "Do you offer ongoing support rather than one-off projects?",
    a: "Most business clients work this way. Translation memory means recurring documents — quarterly reports, updated policies, revised training material — cost a fraction after the first version and stay consistent with everything already circulated." },
  { q: "Can you handle several languages simultaneously?",
    a: "Yes, and simultaneous is usually better than sequential for internal communication. If an announcement reaches one country three days before another, people notice. A single coordinated release keeps the message and the timing consistent." },
];

export default function Page() {
  return (
    <DocumentPage
      path={PATH}
      crumb="Business Translation"
      eyebrow="Corporate and Business Translation"
      title="Business documents that read as though written, not translated."
      lead={
        <>
          Reports, presentations, HR material and internal communication — translated with a
          consistent corporate voice, managed terminology and coordination that fits how companies
          actually work.
        </>
      }
      schemaName="Business Translation"
      schemaDescription="Business and corporate translation covering reports, presentations, HR documentation, internal communication and marketing material."
      serviceType="Business Document Translation"
      intro={{
        kicker: "What it demands",
        heading: "The category where tone carries the message",
        body: (
          <>
            <p className="pw-lead">
              Business translation is the largest category by volume and the least discussed,
              because none of it is dramatic. Nobody writes an article about translating an HR
              policy. But it is where a company&rsquo;s voice either survives crossing a border or
              quietly does not.
            </p>
            <p>
              The failure mode is subtle. A translation can be entirely accurate and still land
              wrong — a warm internal announcement rendered in stiff officialese, a carefully
              hedged report made blunt, a deliberately informal training deck turned bureaucratic.
              Employees read it and conclude that head office does not much care about their
              market.
            </p>
            <p>
              The second issue is consistency across a company rather than across a document.
              Marketing, HR and finance commission translations separately, months apart, often
              through different people. Without shared terminology the same product ends up with
              three names and the same internal programme with three descriptions.
            </p>
          </>
        ),
      }}
      points={{
        kicker: "How we work",
        heading: "What business translation involves",
        items: [
          { h: "Voice established once", p: "We ask for material you consider well written, plus any style guide, so register is a decision rather than an accident." },
          { h: "Terminology held against your account", p: "Product names, internal programmes and recurring phrasing stay identical across departments and across years." },
          { h: "Formatting that survives", p: "Slide decks, reports and branded documents returned usable, with text fitted rather than merely replaced." },
          { h: "Coordinated multilingual releases", p: "Where an announcement must land everywhere at once, all languages are prepared together." },
          { h: "Confidentiality by default", p: "Board papers, restructuring plans and financial results handled with access limited to the assigned team." },
          { h: "Efficient revisions", p: "Recurring documents reuse what was approved before, so a quarterly update costs a fraction of the original." },
        ],
      }}
      uses={{
        kicker: "What we translate",
        heading: "Business documents we handle",
        items: [
          { h: "Reports and financial statements", p: "Annual reports, quarterly results and investor material." },
          { h: "Presentations and decks", p: "Board presentations, sales material and internal briefings." },
          { h: "HR policies and handbooks", p: "Employment terms, codes of conduct and benefits documentation." },
          { h: "Training and onboarding material", p: "Courses, guides and assessments for distributed teams." },
          { h: "Internal communication", p: "Announcements, newsletters and change programmes." },
          { h: "Marketing collateral", p: "Brochures, case studies and campaign material." },
          { h: "Customer correspondence", p: "Support responses, service communications and account letters." },
          { h: "Tenders and proposals", p: "Where a bid must read as credibly in the target language as the source." },
        ],
      }}
      timing={{
        rows: [
          { label: "Short business documents", note: "Letters, announcements, single presentations", time: "2–3 business days" },
          { label: "Reports and document sets", note: "Annual reports, policy suites, training programmes", time: "Depends on volume and complexity" },
          { label: "Multilingual releases", note: "Several languages prepared for simultaneous publication", time: "Scoped before quoting" },
        ],
      }}
      related={[
        { h: "Legal Translation", p: "Contracts, terms and corporate governance documents.", href: "/services/legal-translation" },
        { h: "Website Localization", p: "Public-facing content, campaigns and product pages.", href: "/services/website-localization" },
        { h: "Technical Translation", p: "Manuals, specifications and product documentation.", href: "/services/technical-translation" },
        { h: "Industries we serve", p: "Technology, manufacturing, healthcare, law and education.", href: "/industries" },
      ]}
      faqs={faqs}
      cta={{
        title: "Start your business translation",
        body: "Send your documents and any existing terminology, and a Project Coordinator will scope the work before quoting. Most requests are reviewed within 30–60 minutes during business hours.",
      }}
    />
  );
}
