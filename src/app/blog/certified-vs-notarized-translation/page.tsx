import type { Metadata } from "next";

import { Article, Callout, H2, P, UL } from "@/components/pillar/article";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "Certified vs. Notarized Translation: What's the Difference?",
  description:
    "Certified and notarized translations are not the same thing, and ordering the wrong one wastes time and money. A clear explanation of what each involves and which institutions require which.",
};

export default function Page() {
  return (
    <Article
      category="Certified Translation"
      title="Certified vs. Notarized Translation: What's the Difference?"
      readTime="6 min read"
      updated="July 2026"
      intro="These two terms are used interchangeably almost everywhere, including by some translation providers. They describe genuinely different things, and ordering the wrong one is one of the most common reasons a document gets sent back."
    >
      <H2>The short answer</H2>
      <P>
        A <strong>certified translation</strong> is about the translation. A qualified translator
        states in writing that the translation is complete and accurate, and signs that statement.
        The certification speaks to linguistic accuracy.
      </P>
      <P>
        A <strong>notarized translation</strong> is about the signature. A notary public confirms the
        identity of the person signing the certification. The notary does not read the translation,
        does not evaluate it, and in most cases does not speak the source language. Notarization
        speaks to identity, not quality.
      </P>
      <Callout title="The practical consequence">
        Notarization does not make a translation more accurate. It adds a layer of identity
        verification that certain institutions require for their own procedural reasons. If accuracy
        is what you need, certification is the part that matters.
      </Callout>

      <H2>What a certified translation involves</H2>
      <UL items={[
        "A complete translation of the entire document, including stamps and seals",
        "A signed Certificate of Accuracy naming the translator",
        "A statement of the translator's competence in the language pair",
        "Contact details for the translator or translation company",
        "The date of certification",
      ]} />
      <P>
        This is what USCIS requires for immigration filings, and what most universities require for
        academic credentials. It is the standard product for official document translation in the
        United States.
      </P>

      <H2>What notarization adds</H2>
      <P>
        The translator signs the Certificate of Accuracy in the physical presence of a notary public,
        who verifies their identity, witnesses the signature, and applies a stamp and their own
        signature. The notary is attesting to one thing: that the named person signed this document
        in front of them on this date.
      </P>
      <P>
        Because notarization requires a physical appearance, it usually adds a day to turnaround and
        a separate fee.
      </P>

      <H2>Who requires which</H2>
      <P><strong>Certification is normally sufficient for:</strong></P>
      <UL items={[
        "USCIS immigration applications",
        "Most United States universities and credential evaluation services",
        "Most employers verifying qualifications",
        "Many state agencies",
      ]} />
      <P><strong>Notarization is more often required by:</strong></P>
      <UL items={[
        "Foreign consulates and embassies",
        "Some courts, depending on jurisdiction and filing type",
        "Foreign ministries and government offices abroad",
        "Some banks and financial institutions for overseas transactions",
        "Property and inheritance proceedings in certain countries",
      ]} />

      <H2>A third term: apostille</H2>
      <P>
        An apostille is a certificate issued by a government authority — in the United States,
        usually the Secretary of State — confirming that a public official&rsquo;s signature or seal
        is genuine. It exists under the Hague Apostille Convention so that documents issued in one
        member country are recognized in another.
      </P>
      <P>
        An apostille authenticates the underlying document or the notary&rsquo;s commission. It is
        not a translation service and it does not replace either certification or notarization. If
        you are sending documents abroad, you may need all three: a certified translation, notarized,
        then apostilled.
      </P>

      <H2>How to determine what you actually need</H2>
      <P>
        Ask the institution receiving the document, not the one issuing it, and ask specifically.
        The phrase &ldquo;certified translation&rdquo; is used loosely enough that a helpful answer
        requires a precise question:
      </P>
      <UL items={[
        "Do you require a signed Certificate of Accuracy from the translator?",
        "Does the certification need to be notarized?",
        "Do you require an apostille on the original document, the translation, or both?",
        "Do you accept digital copies, or do you require original hard copies by mail?",
      ]} />
      <Callout title="When in doubt, ask before ordering">
        Adding notarization to an existing certified translation later is usually straightforward.
        Discovering after a filing deadline that you needed it is not. Five minutes of confirmation
        with the receiving institution is the cheapest step in the entire process.
      </Callout>

      <H2>What this means for cost and timing</H2>
      <P>
        Certification is normally included in the price of an official document translation. Expect
        notarization to add a modest fee and a day, and an apostille to add one to three weeks
        depending on the state and whether expedited processing is available. Building that time into
        your planning is more useful than paying to rush the translation itself.
      </P>
    </Article>
  );
}
