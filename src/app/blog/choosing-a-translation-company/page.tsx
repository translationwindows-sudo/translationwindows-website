import type { Metadata } from "next";

import { Article, Callout, H2, P, UL } from "@/components/pillar/article";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "How to Choose a Professional Translation Company",
  description:
    "A practical guide to evaluating translation providers: the questions worth asking, the claims worth ignoring, and how pricing, confidentiality and quality processes actually work.",
};

export default function Page() {
  return (
    <Article
      category="Industry Guides"
      title="How to Choose a Professional Translation Company"
      readTime="8 min read"
      updated="July 2026"
      intro="Most buyers compare translation providers on price and turnaround, because those are the two things every website displays. They are also the two things that reveal the least. This guide covers what actually distinguishes providers, and the questions that produce useful answers."
    >
      <H2>Start with the type of work, not the company</H2>
      <P>
        Translation is not one service. A certified birth certificate, a pharmaceutical trial
        protocol, a mobile app interface and a feature film subtitle track require different
        specialists, different quality processes and different deliverables. A provider that is
        genuinely strong at one is not automatically strong at another.
      </P>
      <P>
        Before comparing companies, define what you actually have: the document type, the language
        pair, the purpose, the receiving institution, and the deadline. A provider who asks about
        those things before quoting is doing their job. A provider who quotes a per-word rate without
        asking is selling a commodity.
      </P>

      <H2>Questions that produce useful answers</H2>
      <P><strong>On the translator:</strong></P>
      <UL items={[
        "Is the translator a native speaker of the target language?",
        "Do they have subject-matter experience in this field — legal, medical, technical?",
        "Does a second linguist review the work before delivery?",
      ]} />
      <P><strong>On the process:</strong></P>
      <UL items={[
        "What happens between my upload and my delivery?",
        "Who is my point of contact, and will it be the same person next time?",
        "How do you keep terminology consistent across documents?",
        "What is your revision process if something needs correcting?",
      ]} />
      <P><strong>On confidentiality:</strong></P>
      <UL items={[
        "Who has access to my documents inside your organization?",
        "How are files stored, and for how long?",
        "Are your linguists bound by confidentiality agreements?",
      ]} />
      <P><strong>On the deliverable:</strong></P>
      <UL items={[
        "Will the formatting match my original?",
        "Is certification included, and what does it contain?",
        "What file formats will I receive?",
      ]} />

      <H2>Claims worth ignoring</H2>
      <P>
        Some of the most common marketing claims in this industry carry very little information.
      </P>
      <UL items={[
        "\"USCIS approved\" or \"USCIS certified\" — no such official designation exists for translators or agencies",
        "\"100% accuracy guaranteed\" — an unfalsifiable promise; ask about the review process instead",
        "\"Over 5,000 languages\" — inflated counts usually describe a partner network rather than in-house capability",
        "\"Instant quote\" — instant pricing without seeing the document is an estimate, not a quotation",
        "Logos of large companies without explanation of the relationship",
      ]} />
      <Callout title="A useful test">
        Ask a provider to explain how they would handle your specific document. A company with a real
        process will describe steps. A company without one will restate its marketing.
      </Callout>

      <H2>How translation pricing actually works</H2>
      <P>
        Most professional translation is priced per word of source text, because word count is
        objectively measurable before work begins. Standard civil documents — birth certificates,
        marriage certificates — are often priced per page instead, since their length is predictable.
        Audio and video work is priced per minute of runtime.
      </P>
      <P>Additional charges usually reflect real additional work:</P>
      <UL items={[
        "Certification — normally included for official documents",
        "Notarization — a separate fee, since it requires a notary appearance",
        "Formatting and desktop publishing — for documents where layout must be reproduced",
        "Rush turnaround — reflects rescheduling other work, not faster typing",
        "Poor source quality — handwritten or degraded scans take substantially longer to read",
      ]} />
      <P>
        A quotation that is dramatically below market usually means one of three things: machine
        translation with minimal review, a non-native translator, or no second review. All three are
        legitimate products at the right price — they are only a problem when sold as something else.
      </P>

      <H2>Why translation memory matters for ongoing work</H2>
      <P>
        If you expect to send documents regularly, ask whether the provider maintains a translation
        memory and a glossary for your account. A translation memory stores previously approved
        sentences; a glossary stores your approved terminology. Together they mean your product name
        is translated the same way in year three as in year one, and that repeated content is
        recognized rather than retranslated.
      </P>
      <P>
        For corporate buyers this is usually the single largest long-term cost factor, and it rarely
        appears in a first quotation. It is worth asking about early.
      </P>

      <H2>Signals of a well-run provider</H2>
      <UL items={[
        "They ask about purpose and audience before quoting",
        "They tell you when you do not need something — notarization, for instance",
        "They give you one named point of contact",
        "They explain what happens after you submit, without being asked",
        "Their turnaround promise is specific and modest rather than dramatic",
        "They are transparent about where technology is used in their process",
      ]} />

      <H2>A final word on speed</H2>
      <P>
        Fast is a legitimate requirement, and reputable providers can accommodate genuine urgency.
        But translation speed has a ceiling: a professional linguist reviews roughly 2,000 to 3,000
        words a day at a quality suitable for legal or medical use. Volumes far beyond that in a
        single day mean either multiple translators — which requires careful terminology management —
        or reduced review. Neither is wrong, provided you know which one you are buying.
      </P>
    </Article>
  );
}
