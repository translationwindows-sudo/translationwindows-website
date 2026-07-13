"use client";

import { useEffect, useRef, useState } from "react";

import { Reveal } from "./reveal";

export function compose(text: string) {
  window.dispatchEvent(new CustomEvent("tw:compose", { detail: text }));
}

/* ── S1 · Journey ─────────────────────────────────────────── */
const STAGES = [
  { em: "⬆️", h: "Upload document", p: "A photo or scan is enough" },
  { em: "🤖", h: "AI terminology prep", p: "Structure and glossary, instantly" },
  { em: "🗣️", h: "Native translator", p: "Into their mother tongue" },
  { em: "🔍", h: "Senior review", p: "Line-by-line quality pass" },
  { em: "🖋️", h: "Certification", p: "Signed, when required" },
  { em: "🔒", h: "Secure delivery", p: "Digital, anywhere on earth" },
];
const EMO = ["📄", "🤖", "🗣️", "🔍", "🖋️", "🔒"];

export function Journey() {
  const tlRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const docRef = useRef<HTMLDivElement | null>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tl = tlRef.current, fill = fillRef.current, doc = docRef.current;
    if (!tl || !fill || !doc) return;
    if (reduced) {
      fill.style.width = "92%";
      doc.style.display = "none";
      stageRefs.current.forEach((s) => s?.classList.add("on"));
      return;
    }
    const tick = () => {
      const r = tl.getBoundingClientRect();
      const prog = Math.min(
        Math.max((window.innerHeight * 0.82 - r.top) / (r.height + window.innerHeight * 0.35), 0),
        1
      );
      fill.style.width = `${prog * 92}%`;
      doc.style.transform = `translateX(${prog * (r.width * 0.92)}px)`;
      doc.textContent = EMO[Math.min(Math.floor(prog * 6), 5)];
      stageRefs.current.forEach((s, i) => s?.classList.toggle("on", prog > (i + 0.35) / 6));
    };
    window.addEventListener("scroll", tick, { passive: true });
    tick();
    return () => window.removeEventListener("scroll", tick);
  }, []);

  return (
    <section id="journey">
      <div className="story">
        <div className="sec">
          <Reveal as="p" className="k">Behind the window</Reveal>
          <Reveal delay={1}><h2>How your project moves through Translation Windows.</h2></Reveal>
          <Reveal delay={2}><p className="sub">Watch your document travel. Six stages, nothing skipped.</p></Reveal>
          <div className="tl" ref={tlRef}>
            <div className="fill" ref={fillRef} />
            <div className="doc" ref={docRef} aria-hidden>📄</div>
            {STAGES.map((s, i) => (
              <div className="stage" key={s.h} ref={(el) => { stageRefs.current[i] = el; }}>
                <span className="node" />
                <div className="pane">
                  <span className="em">{s.em}</span>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── S2 · Industries ─────────────────────────────────────── */
type Goal = {
  g: string; gl: string; h: string; p: string;
  rows: [string, string][]; msg: string; d: 0 | 1 | 2 | 3 | 4;
};
const GOALS: Goal[] = [
  { g: "immigration", gl: "移", h: "Immigration", p: "Certified translations built to pass USCIS review the first time.", d: 0,
    rows: [["Documents", "Birth & marriage certificates, diplomas, police records"], ["Languages", "Spanish, Vietnamese, Arabic, Chinese, Ukrainian"], ["Requirement", "Signed Certificate of Accuracy; notarization on request"]],
    msg: "I need certified translation for immigration (USCIS)." },
  { g: "legal", gl: "§", h: "Legal", p: "One mistranslated clause changes an outcome — so legal work gets legal linguists.", d: 1,
    rows: [["Documents", "Contracts, judgments, powers of attorney, discovery files"], ["Languages", "Spanish, Chinese, Arabic, Portuguese, Russian"], ["Requirement", "Court-ready certification; strict confidentiality"]],
    msg: "I need a legal document translated." },
  { g: "medical", gl: "⚕", h: "Medical & life sciences", p: "Terminology here is a safety matter, not a style choice.", d: 1,
    rows: [["Documents", "Clinical records, trial protocols, device manuals, IFUs"], ["Languages", "Spanish, Chinese, German, Japanese, French"], ["Requirement", "Specialist clinical linguists; regulatory-aware review"]],
    msg: "I need medical records translated." },
  { g: "manufacturing", gl: "⚙", h: "Manufacturing & engineering", p: "The same bolt must have the same name on page 4 and page 400.", d: 2,
    rows: [["Documents", "Manuals, safety data sheets, specs, training material"], ["Languages", "Spanish, German, Chinese, Korean, Portuguese"], ["Requirement", "Locked terminology; formatting reproduced exactly"]],
    msg: "I need technical manuals translated." },
  { g: "business", gl: "↗", h: "Business expansion", p: "Entering a market means sounding like you already belong there.", d: 2,
    rows: [["Documents", "Corporate filings, marketing, financial reports, HR policies"], ["Languages", "Spanish, Portuguese, French, Arabic, Chinese"], ["Requirement", "Tone adapted per market; one glossary across everything"]],
    msg: "We are expanding into a new market and need translation support." },
  { g: "localization", gl: "◎", h: "Website & software", p: "Users should never suspect the product was written in another language.", d: 3,
    rows: [["Scope", "Sites, apps, UI strings, help centers, SEO metadata"], ["Languages", "Spanish, French, German, Japanese, Korean"], ["Requirement", "Culture and keywords localized, not just words"]],
    msg: "I want to localize my website or software." },
  { g: "media", gl: "▶", h: "Media & gaming", p: "Humor, timing and lip-sync survive translation only when someone fights for them.", d: 3,
    rows: [["Scope", "Subtitles, voice-over, dubbing scripts, game content"], ["Languages", "Spanish, Portuguese, French, Japanese, Korean"], ["Requirement", "Frame-accurate timing; character voice preserved"]],
    msg: "I need subtitles or voice-over for media content." },
  { g: "personal", gl: "✦", h: "Personal documents", p: "A phone photo in — a certified, formatted document back.", d: 4,
    rows: [["Documents", "Birth certificates, diplomas, licenses, transcripts"], ["Languages", "Any — every pair, every script"], ["Requirement", "Certified format; typically 1–2 business days"]],
    msg: "I need my personal documents translated." },
];
const MORE = ["Financial", "Engineering", "Government", "Education", "Spanish interpreting", "Voice-over", "DTP", "Something else"];

export function Industries() {
  return (
    <section id="goals">
      <div className="sec">
        <Reveal as="p" className="k">Start from your world</Reveal>
        <Reveal delay={1}><h2>What are you trying to accomplish?</h2></Reveal>
        <Reveal delay={2}>
          <p className="sub">
            A birth certificate, a patent, a website and a clinical trial cannot follow the same
            workflow. We build each project around its purpose — different linguists, different
            checks, different deliverables.
          </p>
        </Reveal>
        <div className="goal-grid">
          {GOALS.map((c) => (
            <Reveal key={c.g} delay={c.d} as="button" className="gcard" >
              <span onClick={() => compose(c.msg)} style={{ display: "contents" }}>
                <span className="gl">{c.gl}</span>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
                <dl>
                  {c.rows.map(([dt, dd]) => (
                    <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>
                  ))}
                </dl>
                <span className="go">Start this path →</span>
              </span>
            </Reveal>
          ))}
        </div>
        <Reveal delay={4} className="more-goals">
          {MORE.map((m) => (
            <button type="button" className="mg" key={m} onClick={() => compose(`I need help with: ${m}.`)}>
              {m}
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── S3 · Language universe ──────────────────────────────── */
const LANGDATA: Record<string, { n: string; work: string }> = {
  Spanish: { n: "Español", work: "Immigration, legal, business" },
  Chinese: { n: "中文", work: "Business, manufacturing, legal" },
  Arabic: { n: "العربية", work: "Immigration, legal, government" },
  French: { n: "Français", work: "Legal, business, academic" },
  Vietnamese: { n: "Tiếng Việt", work: "Immigration, personal, medical" },
  Portuguese: { n: "Português", work: "Business, personal, academic" },
  Russian: { n: "Русский", work: "Immigration, legal, technical" },
  Ukrainian: { n: "Українська", work: "Immigration, personal, legal" },
  German: { n: "Deutsch", work: "Engineering, business, legal" },
  Japanese: { n: "日本語", work: "Technical, gaming, business" },
  Korean: { n: "한국어", work: "Business, media, personal" },
  Hindi: { n: "हिन्दी", work: "Immigration, academic, personal" },
  Farsi: { n: "فارسی", work: "Immigration, personal, legal" },
  Turkish: { n: "Türkçe", work: "Business, legal, personal" },
};
const POS: [number, number][] = [[6,10],[38,6],[68,12],[86,28],[8,38],[30,30],[58,34],[80,52],[12,62],[36,58],[62,62],[84,76],[22,82],[50,84]];

export function LanguageUniverse() {
  const [sel, setSel] = useState("Spanish");
  const d = LANGDATA[sel];
  return (
    <section id="universe">
      <div className="sec">
        <Reveal as="p" className="k">The language universe</Reveal>
        <Reveal delay={1}><h2>Every language, one window away.</h2></Reveal>
        <Reveal delay={2}><p className="sub">Hover to explore. Click a language to start your project in it.</p></Reveal>
        <div className="universe">
          <Reveal delay={2} className="orbit" aria-label="Language explorer">
            {Object.keys(LANGDATA).map((name, i) => (
              <button
                type="button"
                key={name}
                className={`lg ${sel === name ? "on" : ""}`}
                style={{ left: `${POS[i][0]}%`, top: `${POS[i][1]}%`, animationDelay: `${i * 0.5}s` }}
                onMouseEnter={() => setSel(name)}
                onClick={() => compose(`I need translation from ${name} to English.`)}
              >
                {name}
              </button>
            ))}
          </Reveal>
          <Reveal delay={3} as="aside" className="lpanel">
            <p className="ln">{sel}</p>
            <p className="lnat">{d.n}</p>
            <div className="lrow"><b>Native linguists</b><span>Yes — in-country experts</span></div>
            <div className="lrow"><b>Popular work</b><span>{d.work}</span></div>
            <div className="lrow"><b>Certified translation</b><span>Available, USCIS-ready</span></div>
            <div className="lrow"><b>Typical certificate turnaround</b><span>1–2 business days</span></div>
            <div className="lrow"><b>Top pairs</b><span>↔ English</span></div>
            <button type="button" className="cta" onClick={() => compose(`I need translation from ${sel} to English.`)}>
              Click to continue with {sel} →
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── S4 · AI + Human ─────────────────────────────────────── */
export function Duet() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => { if (es[0].isIntersecting) { setPlay(true); io.disconnect(); } },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id="duetsec">
      <div className="sec">
        <Reveal as="p" className="k">Our philosophy</Reveal>
        <Reveal delay={1}><h2>AI prepares. Humans perfect.</h2></Reveal>
        <Reveal delay={2}><p className="sub">We do not hide the technology — we put it where it belongs.</p></Reveal>
        <Reveal delay={3}>
          <div className={`duet ${play ? "play" : ""}`} ref={ref}>
            <div className="side ai">
              <span className="badge">Technology</span>
              <h3>AI prepares</h3>
              <p>Structure, terminology and consistency — handled in seconds, not days.</p>
              <div className="demo">
                <span>glossary ✓</span><span>layout ✓</span><span>terminology ✓</span><span>consistency ✓</span>
              </div>
            </div>
            <div className="link" aria-hidden>
              <div className="fl" />
              <svg width="28" height="26" viewBox="0 0 60 56" fill="none">
                <rect x="8" y="3" width="44" height="42" rx="3" stroke="#E8492A" strokeWidth="5" />
                <line x1="30" y1="5" x2="30" y2="43" stroke="#E8492A" strokeWidth="3.5" />
                <line x1="10" y1="24" x2="50" y2="24" stroke="#E8492A" strokeWidth="3.5" />
                <rect x="2" y="48" width="56" height="6" rx="2" fill="#E8492A" />
              </svg>
              <div className="fl" style={{ transform: "rotate(180deg)" }} />
            </div>
            <div className="side hu">
              <span className="badge">Native experts</span>
              <h3>Humans perfect</h3>
              <p>Meaning, nuance and accountability — a native linguist signs every result.</p>
              <div className="demo">
                <span className="fin">&ldquo;…and it finally <b>reads like it was written there</b>.&rdquo;</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── S6 · Solutions ──────────────────────────────────────── */
type Sol = { i: string; h: string; use: string; items: string[]; note?: string; cta: string; msg: string; d: 0 | 1 | 2 | 3 };
const SOLS: Sol[] = [
  { i: "🖋️", h: "Translation", use: "From a certified birth certificate to a patent portfolio — matched to linguists in that exact field.", d: 0,
    items: ["Certified translation (USCIS-ready)", "Legal & court documents", "Medical & life sciences", "Technical & engineering", "Financial & business"],
    cta: "Start a translation project →", msg: "I need document translation." },
  { i: "🌐", h: "Localization", use: "Products that read native in every market — culture, tone and search keywords included.", d: 1,
    items: ["Website localization", "Software & app strings", "SEO localization", "E-learning courses", "Game content"],
    cta: "Start a localization project →", msg: "I want to localize my website or software." },
  { i: "🎬", h: "Multimedia", use: "Your video and audio carried across languages with frame-accurate timing.", d: 2,
    items: ["Subtitling & captions", "Voice-over", "Dubbing scripts", "Transcription"],
    cta: "Start a multimedia project →", msg: "I need subtitles, voice-over or transcription." },
  { i: "🗣️", h: "Spanish interpretation", use: "Remote and on-site Spanish interpreting for legal, medical and business settings.", d: 1,
    items: ["Remote interpreting", "On-site interpreting", "Legal & medical appointments"],
    note: "Additional language pairs may be available upon request.",
    cta: "Book Spanish interpreting →", msg: "I need a Spanish interpreter." },
  { i: "⚡", h: "AI-assisted services", use: "Technology where it belongs: volume and speed, always finished by native experts.", d: 2,
    items: ["Machine translation post-editing (MTPE)", "AI content proofreading", "Terminology & glossary building"],
    cta: "Start an AI-assisted project →", msg: "I am interested in AI-assisted translation services." },
  { i: "📐", h: "Desktop publishing", use: "Translated documents that look exactly like the originals — in every script.", d: 3,
    items: ["Multilingual DTP", "Layout reproduction", "Print & digital formats"],
    cta: "Start a DTP project →", msg: "I need multilingual desktop publishing." },
];

export function Solutions() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="solutions">
      <div className="sec">
        <Reveal as="p" className="k">Solutions</Reveal>
        <Reveal delay={1}><h2>Global language solutions, grouped the way you buy them.</h2></Reveal>
        <Reveal delay={2}><p className="sub">Six capability groups. Open any of them to see exactly what is included.</p></Reveal>
        <div className="sol-grid">
          {SOLS.map((c, idx) => (
            <Reveal key={c.h} delay={c.d} className={`sol ${open === idx ? "open" : ""}`}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setOpen(open === idx ? null : idx)}
                onKeyDown={(e) => { if (e.key === "Enter") setOpen(open === idx ? null : idx); }}
              >
                <div className="sw"><i>{c.i}</i></div>
                <h3>{c.h}</h3>
                <p className="use">{c.use}</p>
                <div className="det">
                  <ul>{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
                  {c.note ? <p className="note">{c.note}</p> : null}
                  <button
                    type="button"
                    className="sgo"
                    onClick={(e) => { e.stopPropagation(); compose(c.msg); }}
                  >
                    {c.cta}
                  </button>
                </div>
                <span className="ind">Open to see what is included</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── S6b · Experience ────────────────────────────────────── */
export function Experience() {
  return (
    <section id="experience">
      <div className="sec" style={{ paddingTop: 150, paddingBottom: 150 }}>
        <Reveal as="p" className="k">Track record</Reveal>
        <Reveal delay={1}><h2>Experience across global organizations.</h2></Reveal>
        <Reveal delay={2}>
          <p className="sub">
            Our linguistic team has contributed to projects for internationally recognized
            organizations across media, healthcare, technology and manufacturing.
          </p>
        </Reveal>
        <div className="exp-grid">
          <Reveal className="exp-col">
            <p className="exp-h">Entertainment</p>
            <p className="wordmarks"><span>HBO</span><span>NETFLIX</span><span>DISNEY</span><span>WARNER BROS.</span></p>
            <p className="exp-t">Subtitling, dubbing scripts and metadata localization for series and film catalogs.</p>
          </Reveal>
          <Reveal delay={1} className="exp-col">
            <p className="exp-h">Healthcare</p>
            <p className="wordmarks"><span>PHILIPS</span><span>ACCU-CHEK</span></p>
            <p className="exp-t">Device documentation, IFUs and patient-facing material under regulatory review.</p>
          </Reveal>
          <Reveal delay={2} className="exp-col">
            <p className="exp-h">Technology</p>
            <p className="wordmarks"><span>Global software &amp; SaaS teams</span></p>
            <p className="exp-t">UI strings, help centers and release notes localized across simultaneous market launches.</p>
          </Reveal>
          <Reveal delay={3} className="exp-col">
            <p className="exp-h">Manufacturing</p>
            <p className="wordmarks"><span>International manufacturers</span></p>
            <p className="exp-t">Multilingual manuals and safety documentation with locked, reusable terminology.</p>
          </Reveal>
        </div>
        <Reveal delay={3}>
          <p className="exp-note">
            Representative organizations shown reflect projects completed by members of our
            linguistic team through direct engagements and language service partners. Names
            illustrate relevant industry experience and do not imply a direct commercial
            relationship with Translation Windows.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── S7 · Why clients stay ───────────────────────────────── */
const STAY: [string, string, string][] = [
  ["01", "Terminology becomes an asset", "Your approved terms live in a glossary that every future project inherits — year three sounds exactly like year one."],
  ["02", "One project manager remembers your history", "Context never resets. The person answering already knows your formats, deadlines and preferences."],
  ["03", "Formatting remains identical", "Tables, stamps, seals and layouts are reproduced — reviewers compare source and translation side by side without friction."],
  ["04", "Translation memories reduce long-term cost", "Repeated sentences are recognized and reused, so recurring documents get faster and cheaper over time — not more expensive."],
  ["05", "Quality compounds", "Every review cycle feeds back into your glossary and memory. The tenth project is measurably better than the first."],
];

export function Stay() {
  return (
    <section id="stay">
      <div className="sec">
        <Reveal as="p" className="k">The long relationship</Reveal>
        <Reveal delay={1}><h2>Why clients stay.</h2></Reveal>
        <div className="stay">
          {STAY.map(([n, h, p]) => (
            <Reveal key={n} className="stay-row">
              <span className="n">{n}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── S9 · Knowledge ──────────────────────────────────────── */
const GUIDES: [string, string][] = [
  ["Guide", "The complete USCIS translation guide (2026)"],
  ["Guide", "Certified translation: what it is and when you need it"],
  ["Guide", "Medical translation: why terminology is a safety issue"],
  ["Guide", "Legal translation: precision, certification and pitfalls"],
  ["Checklist", "The website localization guide"],
  ["Pricing", "How translation pricing actually works"],
  ["Guide", "MTPE: when machine translation post-editing makes sense"],
  ["Media", "The subtitle guide: timing, length and reading speed"],
  ["Guide", "Multilingual desktop publishing, explained"],
  ["Essay", "AI vs. human translation: what each is actually for"],
];

export function Knowledge() {
  return (
    <section id="knowledge">
      <div className="sec">
        <Reveal as="p" className="k">Knowledge center</Reveal>
        <Reveal delay={1}><h2>Learn before you spend.</h2></Reveal>
        <div className="kn-list">
          {GUIDES.map(([tag, t]) => (
            <Reveal key={t} as="a" className="kni">
              <span onClick={() => compose(`I have a question about: ${t}`)} style={{ display: "contents" }}>
                <span className="tag">{tag}</span>
                <span className="t">{t}</span>
                <span className="ar">→</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── S10 · Final CTA ─────────────────────────────────────── */
export function FinalCta() {
  return (
    <section className="final" id="contact">
      <Reveal as="p" className="k">One window away</Reveal>
      <Reveal delay={1}><h2>Ready to start your project?</h2></Reveal>
      <Reveal delay={2}><p className="sub">Simple. Fast. Secure.</p></Reveal>
      <Reveal delay={2}>
        <div className="promise">
          <span className="pr"><b>1</b> Upload your files</span>
          <span className="pr"><b>2</b> Receive your personalized quote</span>
        </div>
      </Reveal>
      <Reveal delay={3}>
        <div className="hero-ctas">
          <a className="btn-a" href="#start">Get your quote in under 60 seconds <span className="arr">→</span></a>
          <a className="btn-b" href="https://wa.me/12812053932">WhatsApp us</a>
          <a className="btn-b" href="tel:+12812053932">(281) 205-3932</a>
        </div>
      </Reveal>
    </section>
  );
}
