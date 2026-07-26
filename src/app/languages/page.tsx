import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { LanguageDirectory } from "@/components/pillar/language-directory";
import { Crumb, CtaBand, PwHero, TopicGrid, TopicSections, type TopicCard, type TopicDetail } from "@/components/pillar/pillar-parts";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "Languages — 230+ Language Pairs",
  description: "Browse our full language directory — 230+ languages translated to and from English, with featured pages for our most requested pairs.",
};

const featuredGrid: TopicCard[] = [
  { id: "spanish", icon: "🇪🇸", title: "Spanish", desc: "Our highest-volume pair — immigration, legal and business." },
  { id: "german", icon: "🇩🇪", title: "German", desc: "Engineering, manufacturing, legal and corporate documentation." },
  { id: "french", icon: "🇫🇷", title: "French", desc: "Legal, business and academic translation for France and Canada." },
  { id: "portuguese", icon: "🇵🇹", title: "Portuguese", desc: "European and Brazilian Portuguese for business and personal use." },
  { id: "italian", icon: "🇮🇹", title: "Italian", desc: "Business, legal and academic documents." },
  { id: "dutch", icon: "🇳🇱", title: "Dutch", desc: "Corporate, technical and legal translation for the Netherlands and Belgium." },
];

const featuredDetail: TopicDetail[] = [
  { id: "spanish", title: "Spanish", body: "Spanish is our highest-volume language pair — native linguists across immigration, legal, medical and business translation, plus our Spanish interpretation service.", points: ["Certified translation, prepared for USCIS applications", "Remote and on-site interpretation", "European and Latin American variants"] },
  { id: "german", title: "German", body: "German is one of our strongest European pairs, particularly for engineering and manufacturing documentation where terminology consistency across long document sets matters.", points: ["Technical manuals and specifications", "Corporate and legal documents", "Locked terminology across product lines"] },
  { id: "french", title: "French", body: "We work in both European and Canadian French, with attention to the regulatory and stylistic differences between them.", points: ["Legal and contract translation", "Business and corporate documents", "Certified translation available"] },
  { id: "portuguese", title: "Portuguese", body: "European and Brazilian Portuguese are handled by separate native linguists — the differences matter more than most buyers expect.", points: ["Business and corporate translation", "Academic transcripts", "Personal and civil documents"] },
  { id: "italian", title: "Italian", body: "Italian translation for business, legal and academic use, prepared by native linguists based in Italy.", points: ["Commercial contracts and filings", "Academic and personal documents", "Certified translation available"] },
  { id: "dutch", title: "Dutch", body: "Dutch for the Netherlands and Flemish Belgium, frequently requested for corporate, technical and regulatory documentation.", points: ["Corporate and financial documents", "Technical documentation", "Regulatory and compliance material"] },
];

const languages = [
  { name: "Spanish", native: "Español", region: "Europe / Americas" },
  { name: "German", native: "Deutsch", region: "Europe" },
  { name: "French", native: "Français", region: "Europe / Canada" },
  { name: "Portuguese", native: "Português", region: "Europe / Brazil" },
  { name: "Italian", native: "Italiano", region: "Europe" },
  { name: "Dutch", native: "Nederlands", region: "Europe" },
  { name: "Polish", native: "Polski", region: "Europe" },
  { name: "Russian", native: "Русский", region: "Europe / Asia" },
  { name: "Ukrainian", native: "Українська", region: "Europe" },
  { name: "Swedish", native: "Svenska", region: "Europe" },
  { name: "Norwegian", native: "Norsk", region: "Europe" },
  { name: "Danish", native: "Dansk", region: "Europe" },
  { name: "Finnish", native: "Suomi", region: "Europe" },
  { name: "Icelandic", native: "Íslenska", region: "Europe" },
  { name: "Greek", native: "Ελληνικά", region: "Europe" },
  { name: "Czech", native: "Čeština", region: "Europe" },
  { name: "Slovak", native: "Slovenčina", region: "Europe" },
  { name: "Hungarian", native: "Magyar", region: "Europe" },
  { name: "Romanian", native: "Română", region: "Europe" },
  { name: "Bulgarian", native: "Български", region: "Europe" },
  { name: "Croatian", native: "Hrvatski", region: "Europe" },
  { name: "Serbian", native: "Српски", region: "Europe" },
  { name: "Slovenian", native: "Slovenščina", region: "Europe" },
  { name: "Bosnian", native: "Bosanski", region: "Europe" },
  { name: "Albanian", native: "Shqip", region: "Europe" },
  { name: "Lithuanian", native: "Lietuvių", region: "Europe" },
  { name: "Latvian", native: "Latviešu", region: "Europe" },
  { name: "Estonian", native: "Eesti", region: "Europe" },
  { name: "Catalan", native: "Català", region: "Europe" },
  { name: "Irish", native: "Gaeilge", region: "Europe" },
  { name: "Maltese", native: "Malti", region: "Europe" },
  { name: "Chinese (Simplified)", native: "简体中文", region: "Asia" },
  { name: "Chinese (Traditional)", native: "繁體中文", region: "Asia" },
  { name: "Japanese", native: "日本語", region: "Asia" },
  { name: "Korean", native: "한국어", region: "Asia" },
  { name: "Vietnamese", native: "Tiếng Việt", region: "Asia" },
  { name: "Thai", native: "ไทย", region: "Asia" },
  { name: "Indonesian", native: "Bahasa Indonesia", region: "Asia" },
  { name: "Tagalog", native: "Tagalog", region: "Asia" },
  { name: "Turkish", native: "Türkçe", region: "Europe / Asia" },
  { name: "Arabic", native: "العربية", region: "Middle East" },
  { name: "Hebrew", native: "עברית", region: "Middle East" },
];

export default function LanguagesPage() {
  return (
    <div className="pw" id="top">
      <Container>
        <Crumb label="Languages" />
        <PwHero eyebrow="230+ languages" title="Every language passes through one window.">
          Search our full directory below, or explore the pairs we translate most often.
        </PwHero>
      </Container>
      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <p className="k">Featured languages</p>
          <h2>Our most requested pairs</h2>
          <TopicGrid items={featuredGrid} />
        </div>
        <div className="pw-section">
          <TopicSections items={featuredDetail} backLabel="featured languages" />
        </div>
        <div className="pw-section">
          <p className="k">Full directory</p>
          <h2>Search all languages</h2>
          <p className="sub">Additional language pairs may be available upon request — reach out if you don&apos;t see yours.</p>
          <LanguageDirectory languages={languages} />
        </div>
        <CtaBand title="Ready to start in your language?" body="Tell us your language pair and we'll confirm availability right away." />
      </Container>
    </div>
  );
}
