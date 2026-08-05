/**
 * Court translation requirements by jurisdiction.
 *
 * SOURCING NOTE — this matters more than the data itself.
 *
 * Every entry below reflects the general rule as commonly applied. Court
 * requirements change, individual judges impose their own standards, and
 * local rules vary within a state. This reference exists to tell a
 * paralegal WHAT TO CHECK and WHERE, not to be relied upon as the final
 * word. Every entry carries a verify_at pointer for that reason.
 *
 * Anything we are not confident about is marked 'varies' rather than
 * guessed. A wrong answer here costs somebody a rejected filing.
 */

export interface Requirement {
  id: string;
  court: string;
  scope: string;
  certification: "required" | "usually" | "varies";
  notarization: "required" | "sometimes" | "rarely" | "varies";
  translatorQualification: string;
  filingNotes: string;
  verifyAt: string;
}

export const REQUIREMENTS: Requirement[] = [
  {
    id: "uscis",
    court: "USCIS (immigration benefits)",
    scope: "Petitions, applications and supporting civil documents",
    certification: "required",
    notarization: "rarely",
    translatorQualification:
      "No credential required. The translator must certify competence in both languages and that the translation is complete and accurate.",
    filingNotes:
      "The regulation asks for a complete English translation plus the translator certification. Notarization is not part of that requirement, and paying for it is one of the more common wasted costs in an application.",
    verifyAt: "8 CFR 103.2(b)(3)",
  },
  {
    id: "eoir",
    court: "Immigration Court (EOIR)",
    scope: "Removal proceedings, asylum, cancellation",
    certification: "required",
    notarization: "sometimes",
    translatorQualification:
      "Certification of competence and accuracy. Some immigration judges expect a fuller declaration than USCIS does.",
    filingNotes:
      "The Immigration Court Practice Manual governs. Individual judges vary on format, and some require the certification as a separate signed page rather than appended.",
    verifyAt: "EOIR Immigration Court Practice Manual, Ch. 3",
  },
  {
    id: "federal-civil",
    court: "U.S. District Court (civil)",
    scope: "Exhibits, discovery, foreign-language evidence",
    certification: "required",
    notarization: "sometimes",
    translatorQualification:
      "A translator declaration, frequently under 28 U.S.C. § 1746, stating qualifications and accuracy.",
    filingNotes:
      "Local rules differ substantially between districts. Some require the translator declaration to accompany each exhibit; others accept one covering declaration for a set. Check the district and the judge.",
    verifyAt: "FRE 604 · 28 U.S.C. § 1746 · local rules",
  },
  {
    id: "state-general",
    court: "State trial courts (general)",
    scope: "Civil and family matters",
    certification: "usually",
    notarization: "varies",
    translatorQualification:
      "Commonly a certificate of accuracy. Some states maintain rosters of approved court interpreters that also inform document standards.",
    filingNotes:
      "This is the category with the widest variation. Texas, California, New York and Florida each handle it differently, and county rules add another layer. Verify locally before filing.",
    verifyAt: "State rules of civil procedure · county local rules",
  },
  {
    id: "probate",
    court: "Probate and estate proceedings",
    scope: "Foreign wills, death records, heirship documents",
    certification: "required",
    notarization: "sometimes",
    translatorQualification:
      "Certificate of accuracy. Notarization or apostille is more common here than elsewhere, particularly where documents originate abroad.",
    filingNotes:
      "Cross-border estates often need the underlying foreign document legalized as well as translated. Legalization and translation are separate processes and are frequently confused.",
    verifyAt: "State probate code · Hague Apostille Convention",
  },
  {
    id: "family",
    court: "Family court",
    scope: "Marriage, divorce, custody and adoption records",
    certification: "required",
    notarization: "varies",
    translatorQualification:
      "Certificate of accuracy naming the translator.",
    filingNotes:
      "Where a foreign marriage or divorce is being recognised, the court is usually verifying legal validity as much as content. Send every page, including marginal annotations that record civil registration.",
    verifyAt: "State family code · local rules",
  },
  {
    id: "arbitration",
    court: "Arbitration (domestic and international)",
    scope: "Pleadings, exhibits, expert reports",
    certification: "usually",
    notarization: "rarely",
    translatorQualification:
      "Governed by the tribunal rules and the parties agreement rather than statute.",
    filingNotes:
      "Institutional rules (ICC, LCIA, AAA) address language and translation directly. Tribunals often permit untranslated exhibits where all parties read the language, so check before translating everything.",
    verifyAt: "Applicable institutional rules · procedural order",
  },
  {
    id: "uspto",
    court: "USPTO (patents and trademarks)",
    scope: "Priority documents, prior art, foreign filings",
    certification: "required",
    notarization: "rarely",
    translatorQualification:
      "A statement that the translation is accurate. Technical accuracy carries more weight than translator credentials.",
    filingNotes:
      "Requirements differ between patent and trademark matters, and between full translations and partial ones. Terminology consistency with the original claim language matters enormously here.",
    verifyAt: "37 CFR 1.52(d) · MPEP",
  },
];

export const LAST_REVIEWED = "August 2026";
