import type { Metadata } from "next";

import { Article, Callout, H2, P, UL } from "@/components/pillar/article";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "Certified Translation for USCIS: Everything You Need to Know",
  description:
    "What USCIS requires from a translated document, what a Certificate of Accuracy contains, which documents need translating, and the mistakes that most often cause delays.",
};

export default function Page() {
  return (
    <Article
      category="Certified Translation"
      title="Certified Translation for USCIS: Everything You Need to Know"
      readTime="9 min read"
      updated="July 2026"
      intro="If you are filing an immigration application and any of your documents are not in English, USCIS requires a complete English translation with a signed certification. This guide explains exactly what that means, what the certification must contain, and where applications most often run into trouble."
    >
      <H2>What USCIS actually requires</H2>
      <P>
        The requirement comes from the Code of Federal Regulations, 8 CFR 103.2(b)(3): any document
        in a foreign language must be accompanied by a full English translation, and the translator
        must certify that the translation is complete and accurate and that they are competent to
        translate from that language into English.
      </P>
      <P>
        Two details in that sentence matter more than people expect. The translation must be
        <strong> complete</strong> — not a summary, and not only the parts that seem relevant. And
        the translator must certify their own competence, which is why you cannot translate your own
        documents even if you are perfectly bilingual.
      </P>
      <Callout title="A common misunderstanding">
        USCIS does not maintain a list of approved or licensed translators, and it does not certify
        translation companies. Any competent translator may provide the certification. When you see a
        company describe itself as &ldquo;USCIS certified,&rdquo; that is marketing language rather
        than an official status — no such designation exists.
      </Callout>

      <H2>What a Certificate of Accuracy contains</H2>
      <P>
        The certification is a short signed statement that accompanies the translation. There is no
        official template, but it needs to include:
      </P>
      <UL items={[
        "A statement that the translation is complete and accurate to the best of the translator's knowledge",
        "A statement that the translator is competent to translate from the source language into English",
        "The translator's full name and signature",
        "The translator's address and contact details",
        "The date of certification",
        "Identification of the document that was translated",
      ]} />
      <P>
        The certificate is typically attached as a separate page in front of or behind the
        translation. It is signed by the translator or an authorized representative of the
        translation company.
      </P>

      <H2>Which documents usually need translation</H2>
      <P>
        Anything you submit that is not written in English. In practice, the documents that come up
        most often in family-based and naturalization filings are:
      </P>
      <UL items={[
        "Birth certificates",
        "Marriage certificates and divorce decrees",
        "Death certificates",
        "Police clearance and court records",
        "Academic diplomas and transcripts",
        "Passports and national identity documents, where a copy is submitted",
        "Bank statements and financial records supporting an affidavit of support",
      ]} />

      <H2>Notarization: usually not required</H2>
      <P>
        USCIS requires certification, not notarization. A notary public verifies the identity of the
        person signing a document — they do not verify the accuracy of a translation, and a notary
        stamp adds nothing to the linguistic quality of the work.
      </P>
      <P>
        There are exceptions. Some consulates, foreign ministries, courts and universities do require
        notarized translations, and documents intended for use abroad may need an apostille. If your
        document is going somewhere other than USCIS, confirm the requirement with the receiving
        institution before ordering.
      </P>

      <H2>Formatting: why it matters more than people think</H2>
      <P>
        A translated document should be recognizable as a version of the original. A reviewer will
        often compare the two side by side, and anything that makes that comparison harder increases
        the chance of a request for evidence.
      </P>
      <UL items={[
        "Stamps, seals and official markings should be described in the translation, not omitted",
        "Handwritten annotations should be translated or marked as illegible where genuinely unreadable",
        "The layout should broadly mirror the original so that fields line up",
        "Signatures should be indicated, typically as [signature] rather than reproduced",
        "Nothing may be added, interpreted or corrected — including apparent errors in the original",
      ]} />
      <Callout title="Do not correct the original">
        If a name is misspelled on the source birth certificate, the translation must carry the same
        spelling. Correcting it creates a discrepancy between your evidence and your application. If
        an inconsistency exists, it is addressed in the application itself, not silently fixed in the
        translation.
      </Callout>

      <H2>The mistakes that most often cause delays</H2>
      <P>
        In our experience the same handful of problems account for most rejected or queried
        translations:
      </P>
      <UL items={[
        "Partial translation — only the visible text is translated and stamps or reverse sides are skipped",
        "Self-translation by the applicant or a relative, which fails the competence requirement",
        "A missing or incomplete certification page",
        "Machine translation submitted without professional review",
        "Illegible source scans, which produce guesswork in the translation",
        "Inconsistent name transliteration across multiple documents in the same filing",
      ]} />
      <P>
        That last point is worth emphasizing for families submitting several documents at once. If a
        name is transliterated one way on a birth certificate and differently on a marriage
        certificate, a reviewer sees two different people. Consistency across a filing is a
        deliberate step, not an accident.
      </P>

      <H2>How long it takes and what it costs</H2>
      <P>
        Most single-page civil documents — a birth or marriage certificate — are straightforward and
        typically complete within one to two business days. Longer records, poor-quality scans, and
        handwritten historical documents take longer because they require more careful reading.
      </P>
      <P>
        Certified translation is usually priced per page for standard civil documents, or per word
        for longer records. Certification itself is normally included; notarization, if you need it,
        is a separate fee. Rush turnaround is generally available at a premium.
      </P>

      <H2>What to prepare before you order</H2>
      <UL items={[
        "A clear, complete scan or photograph of every page, including reverse sides with stamps",
        "The spelling of names exactly as they appear on your passport or application",
        "The deadline you are working toward",
        "Confirmation of whether the receiving institution requires notarization",
        "Any earlier translations of related documents, so names stay consistent",
      ]} />

      <H2>A note on machine translation</H2>
      <P>
        Machine translation has improved enormously and is genuinely useful for understanding the
        gist of a document. It is not appropriate for immigration filings on its own. The
        certification requirement is a statement made by a named person who takes responsibility for
        accuracy — which is something software cannot do. Where technology helps is in preparation:
        extracting terminology, maintaining consistency across a set of documents, and reproducing
        layout. The translation itself, and the accountability for it, remains human.
      </P>
    </Article>
  );
}
