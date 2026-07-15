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
  { id: "spanish", icon: "🇪🇸", title: "Spanish", desc: "Our most requested pair — immigration, legal and business." },
  { id: "chinese", icon: "🇨🇳", title: "Chinese", desc: "Simplified and traditional, for business and manufacturing." },
  { id: "arabic", icon: "🇸🇦", title: "Arabic", desc: "Immigration, legal and government documentation." },
  { id: "vietnamese", icon: "🇻🇳", title: "Vietnamese", desc: "Immigration, personal and medical documents." },
  { id: "portuguese", icon: "🇵🇹", title: "Portuguese", desc: "Business, personal and academic translation." },
  { id: "french", icon: "🇫🇷", title: "French", desc: "Legal, business and academic documents." },
];

const featuredDetail: TopicDetail[] = [
  { id: "spanish", title: "Spanish", body: "Spanish is our highest-volume language pair — native linguists across immigration, legal, medical and business translation, plus our Spanish interpretation service.", points: ["Certified translation, USCIS-ready", "Remote and on-site interpretation", "1–2 business day typical turnaround"] },
  { id: "chinese", title: "Chinese", body: "We work in both Simplified and Traditional Chinese, across business, manufacturing and legal documentation.", points: ["Simplified and Traditional script", "Manufacturing and technical manuals", "Business and legal documents"] },
  { id: "arabic", title: "Arabic", body: "Arabic translation for immigration, legal and government use, handled by linguists fluent in regional dialects and formal register.", points: ["Immigration and government documents", "Legal and court filings", "Certified translation available"] },
  { id: "vietnamese", title: "Vietnamese", body: "A frequently requested pair for immigration and medical documentation, with certified translation included.", points: ["Immigration and personal documents", "Medical records", "Certified translation available"] },
  { id: "portuguese", title: "Portuguese", body: "Brazilian and European Portuguese for business expansion, academic transcripts and personal documents.", points: ["Business and corporate translation", "Academic transcripts", "Personal document translation"] },
  { id: "french", title: "French", body: "European and Canadian French for legal, business and academic translation, with certified options available.", points: ["Legal and contract translation", "Business and corporate documents", "Certified translation available"] },
];

const languages = [
  { name: "Spanish", native: "Español", region: "Europe / Americas" },
  { name: "Chinese (Simplified)", native: "中文", region: "Asia" },
  { name: "Chinese (Traditional)", native: "中文", region: "Asia" },
  { name: "Arabic", native: "العربية", region: "Middle East" },
  { name: "French", native: "Français", region: "Europe" },
  { name: "Portuguese", native: "Português", region: "Europe / Americas" },
  { name: "Vietnamese", native: "Tiếng Việt", region: "Asia" },
  { name: "Russian", native: "Русский", region: "Europe / Asia" },
  { name: "Ukrainian", native: "Українська", region: "Europe" },
  { name: "German", native: "Deutsch", region: "Europe" },
  { name: "Japanese", native: "日本語", region: "Asia" },
  { name: "Korean", native: "한국어", region: "Asia" },
  { name: "Hindi", native: "हिन्दी", region: "Asia" },
  { name: "Urdu", native: "اردو", region: "Asia" },
  { name: "Farsi", native: "فارسی", region: "Middle East" },
  { name: "Turkish", native: "Türkçe", region: "Europe / Asia" },
  { name: "Italian", native: "Italiano", region: "Europe" },
  { name: "Polish", native: "Polski", region: "Europe" },
  { name: "Dutch", native: "Nederlands", region: "Europe" },
  { name: "Greek", native: "Ελληνικά", region: "Europe" },
  { name: "Romanian", native: "Română", region: "Europe" },
  { name: "Thai", native: "ไทย", region: "Asia" },
  { name: "Indonesian", native: "Bahasa Indonesia", region: "Asia" },
  { name: "Tagalog", native: "Tagalog", region: "Asia" },
  { name: "Bengali", native: "বাংলা", region: "Asia" },
  { name: "Punjabi", native: "ਪੰਜਾਬੀ", region: "Asia" },
  { name: "Swahili", native: "Kiswahili", region: "Africa" },
  { name: "Amharic", native: "አማርኛ", region: "Africa" },
  { name: "Hebrew", native: "עברית", region: "Middle East" },
  { name: "Serbian", native: "Српски", region: "Europe" },
  { name: "Croatian", native: "Hrvatski", region: "Europe" },
  { name: "Hungarian", native: "Magyar", region: "Europe" },
  { name: "Czech", native: "Čeština", region: "Europe" },
  { name: "Swedish", native: "Svenska", region: "Europe" },
  { name: "Norwegian", native: "Norsk", region: "Europe" },
  { name: "Danish", native: "Dansk", region: "Europe" },
  { name: "Finnish", native: "Suomi", region: "Europe" },
  { name: "Somali", native: "Soomaali", region: "Africa" },
  { name: "Nepali", native: "नेपाली", region: "Asia" },
  { name: "Burmese", native: "မြန်မာ", region: "Asia" },
  { name: "Khmer", native: "ខ្មែរ", region: "Asia" },
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
