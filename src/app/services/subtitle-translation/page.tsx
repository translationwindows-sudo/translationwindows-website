import type { Metadata } from "next";

import { DocumentPage } from "@/features/services/document-page";
import "@/styles/pillar.css";

const PATH = "/services/subtitle-translation";

export const metadata: Metadata = {
  title: "Subtitle Translation Services — Subtitling, Captions and SRT Files",
  description:
    "Professional subtitle translation and subtitling: timed SRT and VTT files, reading-speed compliance, captions for accessibility. For training, marketing, entertainment and corporate video.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Subtitle Translation — Translation Windows",
    description: "Subtitle translation and subtitling with proper timing, reading speed and caption standards.",
    url: PATH, type: "article",
  },
};

const faqs = [
  { q: "What file formats do you deliver?",
    a: "SRT and VTT most commonly, along with ASS, SBV and TTML where a platform requires them. Tell us where the video will be published — YouTube, Vimeo, an LMS, a broadcast platform — and we will deliver the format it expects with the timing conventions it uses." },
  { q: "Why can subtitles not simply be a translation of the script?",
    a: "Because subtitles are constrained in a way script is not. A viewer reads more slowly than a speaker talks, and a line must be readable in the time it is on screen. Standard practice allows roughly 17 characters per second and two lines at a time. A faithful translation of rapid dialogue will exceed that, so the work involves condensing meaning without losing it — closer to editing than to translation." },
  { q: "Do you handle timing and spotting, or only the text?",
    a: "Both. If you have an existing timed file we can translate within its cues. If you have only the video, we create the timing — deciding where a subtitle appears and disappears, which is a craft decision as much as a technical one. Cuts, pauses and shot changes all affect where a break belongs." },
  { q: "What is the difference between subtitles and captions?",
    a: "Subtitles assume the viewer can hear but does not speak the language. Captions assume the viewer cannot hear, and therefore include speaker identification and relevant non-speech audio — [door closes], [ominous music]. If your requirement is accessibility rather than translation, say so, because the deliverable is different." },
  { q: "Can you transcribe the source audio as well?",
    a: "Yes. Where no script exists we transcribe first, which is often the better route anyway — scripts and finished videos diverge more than people expect once editing is done. The transcript then becomes the basis for both timing and translation." },
  { q: "How do you handle several target languages?",
    a: "A single timed master is created first, and each language works within those cues. This keeps subtitle appearance synchronised across versions and makes later revisions far cheaper, since a change to the source propagates cleanly." },
  { q: "How long does subtitling take?",
    a: "It depends on duration, dialogue density and whether timing already exists. A short marketing video with a supplied SRT is quick; a training series requiring transcription and spotting is scoped before quoting so the estimate is realistic." },
  { q: "Do you burn subtitles into the video?",
    a: "We deliver subtitle files rather than encoded video, because separate files are more flexible — viewers can toggle them, search engines can read them, and updates do not require re-encoding. If you need burnt-in subtitles for a platform that requires it, tell us and we will discuss it." },
];

export default function Page() {
  return (
    <DocumentPage
      path={PATH}
      crumb="Subtitle Translation"
      eyebrow="Subtitling and Captioning"
      title="Subtitles that can actually be read in the time available."
      lead={
        <>
          Timed subtitle files for training, marketing, corporate and entertainment video —
          translated within proper reading-speed limits, delivered in the format your platform
          expects.
        </>
      }
      schemaName="Subtitle Translation"
      schemaDescription="Subtitle translation, subtitling and captioning services delivering timed SRT and VTT files with reading-speed compliance for training, marketing, corporate and entertainment video."
      serviceType="Subtitling and Captioning"
      intro={{
        kicker: "The constraint",
        heading: "Subtitling is translation under a stopwatch",
        body: (
          <>
            <p className="pw-lead">
              Everything difficult about subtitling comes from one fact: people read more slowly
              than they speak. A line of dialogue that takes two seconds to say may take four
              seconds to read, and the viewer has only the two.
            </p>
            <p>
              So a subtitle is rarely a full translation of what was said. It is the meaning of
              what was said, compressed to fit — roughly seventeen characters per second, two lines
              at a time, broken where the sense allows rather than where the line runs out. Doing
              that well requires deciding what can be lost. That is an editorial judgement, and it
              is why a literal translation of a script makes poor subtitles.
            </p>
            <p>
              Timing is the other half. A subtitle that persists across a cut, or appears a beat
              before the speaker, is quietly uncomfortable to watch even when the viewer cannot say
              why.
            </p>
          </>
        ),
      }}
      points={{
        kicker: "How we work",
        heading: "What proper subtitling involves",
        items: [
          { h: "Reading speed respected", p: "Lines sized so they can be read in the time on screen, rather than technically accurate and practically unreadable." },
          { h: "Sensible line breaks", p: "Broken where the sense allows — not mid-phrase because the character count ran out." },
          { h: "Timing against the picture", p: "Cues set so subtitles do not straddle cuts or arrive ahead of the speaker." },
          { h: "Consistent terminology", p: "Product names, character names and recurring phrases identical across an entire series." },
          { h: "The right deliverable", p: "Subtitles or captions depending on whether the need is translation or accessibility — they are not the same file." },
          { h: "Platform-correct formats", p: "SRT, VTT, ASS or TTML, with the conventions the destination platform expects." },
        ],
      }}
      uses={{
        kicker: "What we subtitle",
        heading: "Video we work on",
        items: [
          { h: "Training and e-learning", p: "Course modules, compliance training and onboarding for distributed teams." },
          { h: "Corporate and internal video", p: "Announcements, town halls and leadership communication." },
          { h: "Marketing and product video", p: "Campaigns, demos and explainers where subtitles drive silent-autoplay viewing." },
          { h: "Documentary and entertainment", p: "Long-form content requiring sustained register and character consistency." },
          { h: "Conference and event recordings", p: "Presentations, panels and keynotes." },
          { h: "Accessibility captioning", p: "Where the requirement is a viewer who cannot hear rather than one who cannot understand." },
        ],
      }}
      timing={{
        rows: [
          { label: "Short video with supplied timed file", note: "Marketing clips, single modules, existing SRT", time: "2–3 business days" },
          { label: "Video requiring transcription and spotting", note: "No script or timing supplied", time: "Depends on duration and dialogue density" },
          { label: "Series and multilingual sets", note: "Multiple episodes or several target languages", time: "Scoped before quoting" },
        ],
      }}
      related={[
        { h: "Website Localization", p: "The pages and platforms your video sits on.", href: "/services/website-localization" },
        { h: "Business Translation", p: "Training material and internal communication.", href: "/services/business-translation" },
        { h: "Technical Translation", p: "Product documentation accompanying instructional video.", href: "/services/technical-translation" },
        { h: "Languages we cover", p: "230+ combinations for multilingual video programmes.", href: "/languages" },
      ]}
      faqs={faqs}
      cta={{
        title: "Start your subtitling project",
        body: "Send your video or timed file and tell us where it will be published. A Project Coordinator will scope it and prepare an accurate quotation.",
      }}
    />
  );
}
