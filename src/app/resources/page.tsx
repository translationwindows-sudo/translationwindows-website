import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { FaqAccordion } from "@/components/pillar/faq-accordion";
import { Crumb, CtaBand, PwHero, TopicGrid, TopicSections, type TopicCard, type TopicDetail } from "@/components/pillar/pillar-parts";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "Resources — Knowledge Center",
  description: "Guides on certified translation, USCIS documents, medical and legal translation, localization, MTPE, subtitling and desktop publishing.",
};

const guides: TopicCard[] = [
  { id: "uscis", icon: "🛂", title: "USCIS Translation Guide", desc: "What USCIS requires and how to avoid rejection." },
  { id: "certified", icon: "🖋️", title: "Certified Translation Guide", desc: "What it is, and when you actually need one." },
  { id: "medical", icon: "⚕️", title: "Medical Translation Guide", desc: "Why terminology accuracy is a safety issue." },
  { id: "legal", icon: "§", title: "Legal Translation Guide", desc: "Precision, certification and common pitfalls." },
  { id: "localization", icon: "🌐", title: "Website Localization Guide", desc: "A practical checklist for launching in a new market." },
  { id: "pricing", icon: "💲", title: "Translation Pricing Guide", desc: "How word count, certification and rush fees work." },
  { id: "mtpe", icon: "⚡", title: "MTPE Guide", desc: "When machine translation post-editing makes sense." },
  { id: "subtitle", icon: "🎬", title: "Subtitle Guide", desc: "Timing, length and reading-speed standards." },
  { id: "dtp", icon: "📐", title: "Desktop Publishing Guide", desc: "Keeping layout and formatting intact across languages." },
  { id: "ai-vs-human", icon: "🤖", title: "AI vs. Human Translation", desc: "What each is actually good for." },
];

const guideDetails: TopicDetail[] = [
  { id: "uscis", title: "USCIS Translation Guide", body: "USCIS requires a signed Certificate of Accuracy with every translated document — the translator doesn't need to be certified, but the translation must be complete and accompanied by that certificate.", points: ["Every page must be translated, including stamps and seals", "The certificate must include translator name and signature", "Formatting should mirror the original document"] },
  { id: "certified", title: "Certified Translation Guide", body: "A certified translation includes a signed statement attesting to its accuracy and completeness. Most government, legal and academic institutions require it for official submissions.", points: ["Required for immigration, court and academic use", "Different from notarized translation", "Turnaround is typically 1–2 business days"] },
  { id: "medical", title: "Medical Translation Guide", body: "Medical terminology carries real consequences — a mistranslated dosage or diagnosis can affect patient safety, which is why medical translation should always involve subject-matter review.", points: ["Use linguists specialized in clinical terminology", "Request a second review pass for critical documents", "Confirm HIPAA-conscious handling with your provider"] },
  { id: "legal", title: "Legal Translation Guide", body: "Legal documents combine precise terminology with jurisdiction-specific conventions. A qualified legal translator understands both the language and the legal system behind it.", points: ["Confirm certification requirements with the receiving court", "Ask whether the translator has legal-domain experience", "Request consistent terminology across related filings"] },
  { id: "localization", title: "Website Localization Guide", body: "Localizing a website means more than translating text — currency, imagery, idioms and even color associations can shift by market.", points: ["Audit your site for culturally specific references", "Localize metadata and keywords, not just visible copy", "Test right-to-left layouts if entering Arabic or Hebrew markets"] },
  { id: "pricing", title: "Translation Pricing Guide", body: "Most translation is priced per word, with additional line items for certification, formatting, and rush turnaround — transparent pricing means knowing what each fee covers.", points: ["Per-word rate is the base cost driver", "Certification and notarization are separate fees", "Rush turnaround typically adds a percentage surcharge"] },
  { id: "mtpe", title: "MTPE Guide", body: "Machine Translation Post-Editing uses AI for a first pass, then a human editor corrects and refines it — faster than pure human translation, more reliable than machine output alone.", points: ["Best for high-volume, lower-risk content", "Not recommended for legal or certified documents", "Always finished by a human editor"] },
  { id: "subtitle", title: "Subtitle Guide", body: "Good subtitles respect a reading-speed limit and stay on screen long enough to read comfortably, without lagging behind the audio.", points: ["Standard reading speed: ~17 characters per second", "Two lines maximum per subtitle, typically", "Timing should sync within a few frames of speech"] },
  { id: "dtp", title: "Desktop Publishing Guide", body: "Multilingual desktop publishing keeps your translated document visually identical to the source — same layout, same stamps, reproduced in the new language and script.", points: ["Right-to-left languages need layout mirroring", "CJK scripts often require different line spacing", "Always request a final visual proof before printing"] },
  { id: "ai-vs-human", title: "AI vs. Human Translation", body: "AI translation is fast and improving, but still struggles with nuance, legal consequence and cultural context — which is why the highest-stakes work still goes through a human linguist.", points: ["AI excels at speed and high-volume content", "Humans remain essential for legal, medical and certified work", "The best results usually combine both"] },
];

const faqs = [
  { q: "How is translation priced?", a: "Most projects are priced per word, with certification, formatting, and rush fees itemized separately so you know exactly what you're paying for." },
  { q: "What file formats do you accept?", a: "PDF, Word, images (JPG/PNG), and most common document formats. A clear photo of a physical document works too." },
  { q: "Do you offer notarization?", a: "Yes — notarization is available in addition to standard certification, for documents that require it." },
  { q: "How fast is turnaround?", a: "Most certified documents are completed in 1–2 business days; larger projects are scoped individually." },
];

export default function ResourcesPage() {
  return (
    <div className="pw" id="top">
      <Container>
        <Crumb label="Resources" />
        <PwHero eyebrow="Knowledge Center" title="Learn before you spend.">
          Practical guides on certified translation, pricing, localization and more — written to help
          you make an informed decision, whether or not you work with us.
        </PwHero>
      </Container>
      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <p className="k">Guides</p>
          <h2>Everything you need to know, in ten guides</h2>
          <TopicGrid items={guides} />
        </div>
        <div className="pw-section">
          <p className="k">In depth</p>
          <h2>Guide details</h2>
          <TopicSections items={guideDetails} backLabel="guides" />
        </div>
        <div className="pw-section">
          <p className="k">Frequently asked</p>
          <h2>Quick answers</h2>
          <div style={{ marginTop: 24 }}>
            <FaqAccordion items={faqs} />
          </div>
        </div>
        <CtaBand title="Still have questions?" body="Start a project and ask your project manager directly — real answers, not FAQs." />
      </Container>
    </div>
  );
}
