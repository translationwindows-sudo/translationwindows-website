import type { Metadata } from "next";

import { HeroWindow } from "@/features/home/hero-window";
import {
  Duet,
  Experience,
  FinalCta,
  Industries,
  Journey,
  Knowledge,
  LanguageUniverse,
  Solutions,
  Stay,
} from "@/features/home/home-sections";
import { StartComposer } from "@/features/home/start-composer";

import "@/features/home/home.css";

export const metadata: Metadata = {
  title: "Translation Windows — Certified Translation & Global Language Solutions",
  description:
    "Certified document translation, localization, multimedia, Spanish interpretation and desktop publishing. USCIS-accepted, native experts, worldwide delivery. EST. 2017.",
};

export default function HomePage() {
  return (
    <div className="twh">
      <HeroWindow />
      <div className="divider" aria-hidden>
        <svg width="50" height="48" viewBox="0 0 60 56" fill="none">
          <rect x="8" y="3" width="44" height="42" rx="3" stroke="#E8492A" strokeWidth="3.5" />
          <line x1="30" y1="4" x2="30" y2="44" stroke="#E8492A" strokeWidth="2.4" />
          <line x1="9" y1="24" x2="51" y2="24" stroke="#E8492A" strokeWidth="2.4" />
          <rect x="2" y="49" width="56" height="5" rx="2" fill="#E8492A" />
        </svg>
      </div>
      <StartComposer />
      <Journey />
      <Industries />
      <LanguageUniverse />
      <Duet />
      <Solutions />
      <Experience />
      <Stay />
      <Knowledge />
      <FinalCta />
    </div>
  );
}
