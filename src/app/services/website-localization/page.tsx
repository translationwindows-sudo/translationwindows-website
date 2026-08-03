import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { FaqAccordion } from "@/components/pillar/faq-accordion";
import { Crumb, CtaBand, PwHero } from "@/components/pillar/pillar-parts";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/schema";
import "@/styles/pillar.css";

const PATH = "/services/website-localization";

export const metadata: Metadata = {
  title: "Website Localization Services — Multilingual Sites That Work",
  description:
    "Website localization covering content, interface, metadata and multilingual SEO. Terminology consistency, translator context and a workflow that fits your development cycle. 230+ language combinations.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Website Localization Services — Translation Windows",
    description:
      "Website localization covering content, interface, metadata and multilingual SEO.",
    url: PATH,
    type: "article",
  },
};

const faqs = [
  {
    q: "What is the difference between translation and localization?",
    a: "Translation converts the words. Localization adapts everything around them so the result feels native: date and number formats, currencies, addresses and phone formats, units, imagery, legal notices, and the length of text a layout can hold. A translated site reads correctly. A localized site behaves correctly.",
  },
  {
    q: "Can you work with our CMS or codebase?",
    a: "We work from whatever export you can produce — JSON, XLIFF, CSV, PO files, spreadsheets or a document set. Tell us the format and how your build consumes it, and we will return files that drop straight back in. If you are not sure what your platform can export, describe it and we will work it out.",
  },
  {
    q: "How do you handle interface text and character limits?",
    a: "Interface strings are the hardest part of any localization, because a button that reads Save in English becomes Sauvegarder in French and may no longer fit. Where a string has a length constraint, tell us and we will work within it. Where context is ambiguous — does Post mean the verb or the noun? — we ask rather than guess.",
  },
  {
    q: "Do you handle multilingual SEO?",
    a: "Yes. Page titles, meta descriptions, headings, image alt text and URL slugs are all part of the work. Keywords rarely translate directly — the term people search in one market is often not the literal translation of the one they search in another — so terminology is researched per market rather than converted.",
  },
  {
    q: "What about hreflang and technical setup?",
    a: "We advise on hreflang, URL structure and canonical handling for multilingual sites, and we will flag problems we see. Implementation sits with your development team, since it depends on your framework and hosting — but you will not be guessing at what needs doing.",
  },
  {
    q: "How long does website localization take?",
    a: "It depends entirely on scope — a twenty-page marketing site is a different project from a product with thousands of interface strings. We scope before quoting so the timeline reflects your actual content, and we will tell you what is realistic rather than what sounds fast.",
  },
  {
    q: "Can you handle ongoing updates rather than a one-off project?",
    a: "Yes, and most sites need this. Translation memory means only changed content is retranslated, so an update costs a fraction of the original and stays consistent with everything already published. Send changes as they arise rather than batching them into an annual overhaul.",
  },
  {
    q: "Do you localize apps and software as well as websites?",
    a: "Yes — the same workflow covers software interfaces, mobile apps, documentation and help content. The constraints differ slightly, but the essentials are identical: context for translators, consistent terminology, and text that fits where it has to go.",
  },
];

const scope = [
  { name: "Marketing and page content", note: "The words a visitor reads, adapted for the market rather than converted." },
  { name: "Interface strings", note: "Buttons, labels, errors and notifications, within their length constraints." },
  { name: "Metadata and SEO", note: "Titles, descriptions, headings, alt text and URL slugs." },
  { name: "Legal and policy pages", note: "Terms, privacy and disclosures, adapted to local expectations." },
  { name: "Product and catalogue data", note: "Descriptions, specifications and attributes, at volume." },
  { name: "Email and notification templates", note: "Often forgotten, and often the first thing a customer receives." },
  { name: "Help centre and documentation", note: "Support content, guides and FAQs." },
  { name: "Forms and validation messages", note: "Including the address and phone formats a market expects." },
];

const steps = [
  { h: "Scope and export", p: "We look at what you have, agree the file formats, and identify what is genuinely in scope. Content nobody reads is content nobody should pay to translate." },
  { h: "Terminology and glossary", p: "Product names, feature names and recurring phrasing are fixed before translation begins, so they stay identical everywhere." },
  { h: "Translation with context", p: "Linguists see where a string appears and what constrains it. Translating a UI string blind is how you get a button that does not fit." },
  { h: "Quality review", p: "A second linguist reads the output, checking terminology, register and any length constraints." },
  { h: "Delivery in your format", p: "Files come back in the structure you sent them, ready for your build." },
  { h: "Ongoing updates", p: "Translation memory means later changes cost a fraction and stay consistent with what is already live." },
];

export default function Page() {
  return (
    <div className="pw" id="top">
      <JsonLd
        data={graph(
          serviceSchema({
            name: "Website Localization",
            description:
              "Website and software localization covering page content, interface strings, metadata, multilingual SEO and ongoing updates.",
            path: PATH,
            serviceType: "Website and Software Localization",
          }),
          faqSchema(faqs, PATH),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/solutions" },
            { name: "Website Localization", path: PATH },
          ]),
        )}
      />

      <Container>
        <Crumb label="Website Localization" />
        <PwHero
          eyebrow="Website and Software Localization"
          title="A site that reads as though it was written for the market."
        >
          Content, interface, metadata and multilingual SEO — localized with consistent
          terminology, delivered in the file formats your build already uses, and maintainable as
          your site changes.
        </PwHero>
      </Container>

      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <p className="k">The distinction</p>
          <h2>Translation is not localization</h2>
          <p className="pw-lead">
            A translated website reads correctly. A localized website behaves correctly — and the
            gap between the two is where most multilingual projects quietly fail.
          </p>
          <p>
            Translation handles the words. Localization handles everything around them: the date
            format that reads as 03/04 in one market and 04/03 in another, the address form that
            has no field for a postcode, the currency, the phone validation, the legal notice that
            is required in one country and meaningless in the next. It also handles length — German
            runs roughly a third longer than English, and a navigation bar designed around English
            will break.
          </p>
          <p>
            The most common failure is not a mistranslation. It is a site where the words are right
            and everything else signals that this market was an afterthought.
          </p>
        </div>

        <div className="pw-section">
          <p className="k">How it works</p>
          <h2>Our localization process</h2>
          <ol className="pw-steps">
            {steps.map((s, i) => (
              <li key={s.h}>
                <span className="pw-stepn">{i + 1}</span>
                <div><h3>{s.h}</h3><p>{s.p}</p></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="pw-section">
          <p className="k">What is included</p>
          <h2>What we localize</h2>
          <div className="pw-doclist">
            {scope.map((s) => (
              <div className="pw-docitem" key={s.name}>
                <p className="pw-docname">{s.name}</p>
                <p className="pw-docnote">{s.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pw-section">
          <p className="k">Search visibility</p>
          <h2>Multilingual SEO, done properly</h2>
          <p>
            Translating your English keywords is one of the more expensive mistakes in multilingual
            SEO. The phrase people actually search in Germany is frequently not the literal
            translation of the phrase they search in the United States — different word, different
            volume, sometimes a different concept entirely.
          </p>
          <ul className="pw-list">
            <li><strong>Terminology researched per market</strong>, not converted from English.</li>
            <li><strong>Titles, descriptions and headings</strong> written for the target market rather than translated into it.</li>
            <li><strong>URL slugs</strong> in the target language where your platform supports it.</li>
            <li><strong>Image alt text</strong> localized alongside everything else.</li>
            <li><strong>hreflang and canonical guidance</strong> so search engines understand which version serves which market.</li>
          </ul>
        </div>

        <div className="pw-section">
          <p className="k">Working together</p>
          <h2>Fitting your development cycle</h2>
          <p>
            Localization goes wrong when it is treated as a one-off event. Sites change weekly;
            a translation delivered once is out of date within a month.
          </p>
          <ul className="pw-list">
            <li><strong>Your file formats.</strong> JSON, XLIFF, CSV, PO, spreadsheets or documents — returned in the same structure.</li>
            <li><strong>Only what changed.</strong> Translation memory means an update touches the new strings, not the whole site.</li>
            <li><strong>Consistent with what is live.</strong> New content matches terminology already published.</li>
            <li><strong>A named coordinator.</strong> One person who knows the project, rather than a ticket queue.</li>
          </ul>
        </div>

        <div className="pw-section">
          <p className="k">Related services</p>
          <h2>Where to go next</h2>
          <div className="pw-related">
            <Link className="pw-relcard" href="/services/certified-translation">
              <h3>Certified Translation</h3>
              <p>For the documents behind the business, where certification is required.</p>
            </Link>
            <Link className="pw-relcard" href="/services/legal-translation">
              <h3>Legal Translation</h3>
              <p>Terms, privacy policies and contracts for new markets.</p>
            </Link>
            <Link className="pw-relcard" href="/languages">
              <h3>Languages we cover</h3>
              <p>230+ combinations across European, Asian and Middle Eastern markets.</p>
            </Link>
            <Link className="pw-relcard" href="/platform">
              <h3>How we work</h3>
              <p>Project coordination, tracking and secure handling.</p>
            </Link>
          </div>
        </div>

        <div className="pw-section">
          <p className="k">Questions</p>
          <h2>Website localization, answered</h2>
          <FaqAccordion items={faqs} />
        </div>
      </Container>

      <CtaBand
        title="Start your localization project"
        body="Tell us what you have and a Project Coordinator will scope it properly before quoting. Most requests are reviewed within 30–60 minutes during business hours."
      />
    </div>
  );
}
