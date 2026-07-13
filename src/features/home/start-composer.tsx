"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { siteConfig } from "@/config/site";

import { Reveal } from "./reveal";

type Msg = { role: "bot" | "user"; html?: string; text?: string; cta?: boolean };

const STARTERS = [
  "I need my birth certificate translated",
  "I need certified translation for USCIS",
  "Translate my medical records",
  "Translate my legal contract",
  "I need a Spanish interpreter tomorrow",
  "Localize my website",
];

function reply(t: string): string {
  const x = t.toLowerCase();
  let r: string;
  if (x.includes("uscis") || x.includes("birth") || x.includes("certificate") || x.includes("certified"))
    r = "Perfect — that needs a <b>certified translation</b> with a signed Certificate of Accuracy, and we include it. Most single-page certificates are delivered in 1–2 business days.";
  else if (x.includes("medical") || x.includes("record"))
    r = "Understood — medical documents go to specialists in clinical terminology, handled with strict confidentiality.";
  else if (x.includes("interpret"))
    r = "We provide <b>Spanish</b> interpreting — remote and on-site. Share the date and location and we will confirm availability. Additional language pairs may be available upon request.";
  else if (x.includes("website") || x.includes("localiz") || x.includes("app"))
    r = "Great — we localize sites and software so they read native: tone, culture and SEO included.";
  else if (x.includes("legal") || x.includes("contract") || x.includes("court"))
    r = "Got it — legal documents are matched to linguists fluent in legal terminology, certified where filings require it.";
  else r = "We can do that. Attach your files here and our team will size it up for you.";
  return `${r}<br /><br />Send it to a real person now — quotes typically come back in <b>under 15 minutes</b> during business hours.`;
}

/** S0: the ChatGPT-style intake composer + floating upload button. */
export function StartComposer() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", html: "<strong>Hello!</strong> What are you trying to accomplish today?" },
  ]);
  const [files, setFiles] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [over, setOver] = useState(false);
  const [fabHidden, setFabHidden] = useState(true);
  const firstAsk = useRef<string>("");
  const endRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const camRef = useRef<HTMLInputElement | null>(null);

  const submit = useCallback((t: string) => {
    const text = t.trim();
    if (!text) return;
    if (!firstAsk.current) firstAsk.current = text;
    setMsgs((m) => [...m, { role: "user", text }]);
    setValue("");
    window.setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", html: reply(text), cta: true }]);
    }, 420);
  }, []);

  const addFiles = useCallback((list: FileList | null) => {
    if (!list || list.length === 0) return;
    const names = Array.from(list).map((f) => f.name);
    setFiles((f) => {
      const next = [...f, ...names];
      setMsgs((m) => [
        ...m,
        {
          role: "bot",
          html: `Received <b>${next.length} file${next.length > 1 ? "s" : ""}</b> ✓ — anything you want us to know about ${next.length > 1 ? "them" : "it"}?`,
          cta: true,
        },
      ]);
      return next;
    });
  }, []);

  const openWhatsApp = useCallback(() => {
    const parts = ["Hello! I would like to start a project."];
    if (firstAsk.current) parts.push(`Request: ${firstAsk.current}`);
    if (files.length) parts.push(`I have ${files.length} file(s) ready to send: ${files.join(", ")}`);
    parts.push("(I will attach the files in this chat.)");
    window.open(
      `${siteConfig.whatsapp}?text=${encodeURIComponent(parts.join("\n"))}`,
      "_blank"
    );
  }, [files]);

  /* listen for compose events from the rest of the page */
  useEffect(() => {
    const onCompose = (e: Event) => {
      const text = (e as CustomEvent<string>).detail;
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => submit(text), 650);
    };
    window.addEventListener("tw:compose", onCompose);
    return () => window.removeEventListener("tw:compose", onCompose);
  }, [submit]);

  /* FAB visibility */
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    let inView = true;
    const update = () => {
      setFabHidden(inView || window.scrollY < window.innerHeight * 0.5);
    };
    const io = new IntersectionObserver(
      (es) => { inView = es[0].isIntersecting; update(); },
      { threshold: 0.12 }
    );
    io.observe(sec);
    window.addEventListener("scroll", update, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", update); };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [msgs]);

  return (
    <section id="start" ref={sectionRef}>
      <div className="sec" style={{ paddingTop: 84, paddingBottom: 84 }}>
        <Reveal as="p" className="k">For people who already know</Reveal>
        <Reveal delay={1}><h2>Start your project in under 60 seconds.</h2></Reveal>
        <Reveal delay={2}><p className="sub">Upload your files or simply tell us what you need.</p></Reveal>
        <div className="startsec">
          <Reveal delay={2} className="composer">
            <div className="body">
              <div>
                {msgs.map((m, i) =>
                  m.role === "bot" ? (
                    <div key={i}>
                      <div className="msg">
                        <div className="av">🪟</div>
                        <div className="bub" dangerouslySetInnerHTML={{ __html: m.html ?? "" }} />
                      </div>
                      {m.cta ? (
                        <button type="button" className="go-wa" onClick={openWhatsApp} style={{ marginBottom: 16 }}>
                          Continue on WhatsApp →
                        </button>
                      ) : null}
                    </div>
                  ) : (
                    <div className="msg user" key={i}>
                      <div className="bub">{m.text}</div>
                    </div>
                  )
                )}
                <div ref={endRef} />
              </div>
              {files.length > 0 ? (
                <div className="filechips">
                  {files.map((f, i) => (
                    <span className="fchip" key={`${f}-${i}`}>📄 {f} ✓</span>
                  ))}
                </div>
              ) : null}
              <div
                className={`drop ${over ? "over" : ""}`}
                role="button"
                tabIndex={0}
                aria-label="Upload files"
                onClick={() => fileRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileRef.current?.click(); }
                }}
                onDragOver={(e) => { e.preventDefault(); setOver(true); }}
                onDragEnter={(e) => { e.preventDefault(); setOver(true); }}
                onDragLeave={(e) => { e.preventDefault(); setOver(false); }}
                onDrop={(e) => { e.preventDefault(); setOver(false); addFiles(e.dataTransfer.files); }}
              >
                <p className="big">📎 Drag &amp; drop your files</p>
                <p className="or">or</p>
                <div className="ways">
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => { e.stopPropagation(); camRef.current?.click(); }}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); camRef.current?.click(); } }}
                  >
                    📷 Take a photo
                  </span>
                  <span>💬 Describe your project below</span>
                </div>
              </div>
              <div className="starters">
                {STARTERS.map((s) => (
                  <button type="button" className="starter" key={s} onClick={() => submit(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="inputbar">
              <button type="button" className="att" aria-label="Attach files" onClick={() => fileRef.current?.click()}>📎</button>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your message…"
                aria-label="Describe your project"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") submit(value); }}
              />
              <button type="button" className="send" aria-label="Send" onClick={() => submit(value)}>➤</button>
            </div>
            <input ref={fileRef} type="file" multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
            <input ref={camRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
          </Reveal>
          <Reveal delay={3} as="aside" className="quickinfo">
            <h3>Everything language, one window</h3>
            <ul className="qi-list">
              <li><b>✓</b> Certified translation</li>
              <li><b>✓</b> Localization</li>
              <li><b>✓</b> Spanish interpretation</li>
              <li><b>✓</b> Voice-over</li>
              <li><b>✓</b> MTPE</li>
              <li><b>✓</b> Website localization</li>
              <li><b>✓</b> 230+ languages</li>
            </ul>
            <div className="qi-stat">
              <p className="lab">Estimated turnaround</p>
              <p className="val">1–2 <em>business days</em></p>
            </div>
            <div className="qi-stat">
              <p className="lab">Typical quote response</p>
              <p className="val">Under <em>15 minutes</em></p>
              <p style={{ fontSize: ".76rem", color: "var(--char-soft)" }}>during business hours</p>
            </div>
          </Reveal>
        </div>
      </div>
      <button
        type="button"
        className={`fab ${fabHidden ? "hide" : ""}`}
        aria-label="Upload files"
        onClick={() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth" });
          window.setTimeout(() => inputRef.current?.focus(), 700);
        }}
      >
        📎 Upload files
      </button>
    </section>
  );
}
