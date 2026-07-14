"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { siteConfig } from "@/config/site";

import { FIELD_LABELS, FLOWS, GROUP_ORDER, TYPE_STEP, type Step } from "./flow";
import { Reveal } from "./reveal";

/* ── constants ── */
const STARTERS: { label: string; type: string }[] = [
  { label: "I need my birth certificate translated", type: "USCIS / immigration" },
  { label: "I need certified translation for USCIS", type: "USCIS / immigration" },
  { label: "Translate my medical records", type: "Medical document" },
  { label: "Translate my legal contract", type: "Legal contract" },
  { label: "I need a Spanish interpreter tomorrow", type: "Spanish interpreter" },
  { label: "Localize my website", type: "Website / software" },
];
const ACCEPT = [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".doc", ".docx", ".txt", ".srt", ".vtt"];
const MAX_BYTES = 25 * 1024 * 1024; // 25 MB
const BLOCK_EXT = [".exe", ".bat", ".cmd", ".sh", ".msi", ".js", ".jar", ".app", ".scr", ".com"];

type UFile = { name: string; size: number; type: string };
type Answers = Record<string, string>;

function fmtSize(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
function validateFile(f: File): string | null {
  const lower = f.name.toLowerCase();
  if (BLOCK_EXT.some((e) => lower.endsWith(e))) return "That file type is not allowed for security reasons.";
  if (!ACCEPT.some((e) => lower.endsWith(e))) return `Unsupported file type. Try: ${ACCEPT.join(", ")}`;
  if (f.size > MAX_BYTES) return `That file is ${fmtSize(f.size)} — the limit is 25 MB.`;
  return null;
}
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** The guided intake assistant — a one-question-at-a-time state machine. */
export function StartComposer() {
  const reduced = useRef(false);
  const [files, setFiles] = useState<UFile[]>([]);
  const [uploading, setUploading] = useState<{ name: string; pct: number } | null>(null);
  const [fileErr, setFileErr] = useState<string>("");

  const [steps, setSteps] = useState<Step[]>([TYPE_STEP]);
  const [answers, setAnswers] = useState<Answers>({});
  const [idx, setIdx] = useState(0);            // active step index
  const [draft, setDraft] = useState("");        // text/select working value
  const [stepErr, setStepErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null); // project reference
  const [fabHidden, setFabHidden] = useState(true);
  const [live, setLive] = useState("");          // ARIA live text

  const sectionRef = useRef<HTMLElement | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const camRef = useRef<HTMLInputElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const active = steps[idx];
  const answeredSteps = steps.slice(0, idx);

  /* progress groups actually present in this flow */
  const groupsInFlow = useMemo(() => {
    const present = new Set(steps.map((s) => s.group));
    return GROUP_ORDER.filter((g) => present.has(g));
  }, [steps]);
  const activeGroup = active?.group;
  const doneGroups = useMemo(() => {
    const gi = GROUP_ORDER.indexOf(activeGroup);
    return new Set(GROUP_ORDER.slice(0, gi));
  }, [activeGroup]);

  /* ── scroll + focus the active question when it changes ── */
  useEffect(() => {
    if (done) return;
    const el = activeRef.current;
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth", block: "center" });
      const f = firstFieldRef.current;
      if (f) f.focus({ preventScroll: true });
      setLive(active?.q ?? "");
    }, 120);
    return () => window.clearTimeout(t);
  }, [idx, steps, done, active?.q]);

  /* ── compose-event entry (goal cards, languages, starters elsewhere) ── */
  useEffect(() => {
    const onCompose = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      sectionRef.current?.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth" });
      // map an incoming free-text intent to a starter type when possible
      const found = STARTERS.find((s) => detail.toLowerCase().includes(s.label.toLowerCase().slice(0, 12)));
      if (found && idx === 0 && !answers.type) pickType(found.type);
    };
    window.addEventListener("tw:compose", onCompose);
    return () => window.removeEventListener("tw:compose", onCompose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, answers.type]);

  /* ── FAB visibility ── */
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    let inView = true;
    const update = () => setFabHidden(inView || window.scrollY < window.innerHeight * 0.5);
    const io = new IntersectionObserver((es) => { inView = es[0].isIntersecting; update(); }, { threshold: 0.12 });
    io.observe(sec);
    window.addEventListener("scroll", update, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", update); };
  }, []);

  /* ── advance helpers ── */
  const buildSteps = useCallback((type: string): Step[] => {
    const branch = FLOWS[type] ?? FLOWS["Something else"];
    return [TYPE_STEP, ...branch];
  }, []);

  const pickType = useCallback((type: string) => {
    const next = buildSteps(type);
    setSteps(next);
    setAnswers({ type });
    setIdx(1);
    setDraft("");
    setStepErr("");
  }, [buildSteps]);

  const answerActive = useCallback((value: string) => {
    if (!active) return;
    setAnswers((a) => ({ ...a, [active.id]: value }));
    setStepErr("");
    setDraft("");
    setIdx((i) => Math.min(i + 1, steps.length - 1));
  }, [active, steps.length]);

  const onOption = useCallback((value: string) => {
    if (!active) return;
    if (active.id === "type") { pickType(value); return; }
    answerActive(value);
  }, [active, pickType, answerActive]);

  const onFieldNext = useCallback(() => {
    if (!active) return;
    const v = draft.trim();
    if (!v && !active.optional) { setStepErr("Please answer to continue — or it's fine to skip if optional."); return; }
    if (active.inputType === "email" && v && !emailOk(v)) { setStepErr("That email doesn't look right — check the format."); return; }
    answerActive(v || "—");
  }, [active, draft, answerActive]);

  /* ── file handling ── */
  const addFiles = useCallback((list: FileList | null) => {
    setFileErr("");
    if (!list || list.length === 0) return;
    const f = list[0];
    const err = validateFile(f);
    if (err) { setFileErr(err); return; }
    // simulated progress (real upload wires into the PHP endpoint later)
    setUploading({ name: f.name, pct: 0 });
    let pct = 0;
    const tick = window.setInterval(() => {
      pct = Math.min(pct + 20, 100);
      setUploading({ name: f.name, pct });
      if (pct >= 100) {
        window.clearInterval(tick);
        window.setTimeout(() => {
          setUploading(null);
          setFiles((prev) => [...prev, { name: f.name, size: f.size, type: f.type || "file" }]);
          setLive(`${f.name} uploaded successfully.`);
        }, 200);
      }
    }, 120);
  }, []);

  const removeFile = useCallback((name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }, []);

  /* ── edit an earlier answer: rebuild flow from that point ── */
  const editStep = useCallback((stepIdx: number) => {
    const s = steps[stepIdx];
    if (!s) return;
    if (s.id === "type") {
      setSteps([TYPE_STEP]);
      setAnswers({});
      setIdx(0);
    } else {
      // keep answers up to (not including) this step; recompute dependents
      const kept: Answers = {};
      steps.slice(0, stepIdx).forEach((st) => { if (answers[st.id] !== undefined) kept[st.id] = answers[st.id]; });
      setAnswers(kept);
      setIdx(stepIdx);
    }
    setDraft("");
    setStepErr("");
  }, [steps, answers]);

  /* ── submit ── */
  const submit = useCallback(() => {
    if (submitting) return;
    setSubmitting(true);
    setLive("Submitting your request…");
    // Placeholder: Phase 1C wires this to the Vercel route → PHP CRM API.
    window.setTimeout(() => {
      const ref = `TW-${Date.now().toString(36).toUpperCase().slice(-6)}`;
      setSubmitting(false);
      setDone(ref);
      setLive(`Request received. Your reference is ${ref}.`);
    }, 900);
  }, [submitting]);

  const openWhatsApp = useCallback(() => {
    const lines = ["Hello! I'd like to start a project."];
    steps.forEach((s) => {
      const v = answers[s.id];
      if (v && s.id !== "review") lines.push(`${FIELD_LABELS[s.id] ?? s.id}: ${v}`);
    });
    if (files.length) lines.push(`Files ready: ${files.map((f) => f.name).join(", ")}`);
    window.open(`${siteConfig.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  }, [steps, answers, files]);

  const qCountLabel = done
    ? "Complete"
    : active?.kind === "review"
      ? "Final step"
      : `Step ${idx + 1} of ${steps.length}`;

  return (
    <section id="start" ref={sectionRef}>
      <div className="sec" style={{ paddingTop: 84, paddingBottom: 84 }}>
        <Reveal as="p" className="k">For people who already know</Reveal>
        <Reveal delay={1}><h2>Start your project in under 60 seconds.</h2></Reveal>
        <Reveal delay={2}><p className="sub">Upload your files or simply tell us what you need — one quick question at a time.</p></Reveal>

        <div className="startsec">
          <Reveal delay={2} className="composer">
            <div className="body">
              {/* ARIA live region */}
              <div className="sr-only" role="status" aria-live="polite">{live}</div>

              {/* progress */}
              {!done && (
                <div className="progress" aria-hidden>
                  {groupsInFlow.map((g) => (
                    <span key={g} className={`pstep ${doneGroups.has(g) ? "done" : ""} ${activeGroup === g ? "active" : ""}`}>
                      <span className="pdot">✓</span> {g}
                    </span>
                  ))}
                </div>
              )}

              {/* intro (only before first answer) */}
              {idx === 0 && !done && (
                <div className="ansrow">
                  <div className="av">🪟</div>
                  <div className="content"><div className="bub"><strong>Hello!</strong> Let&apos;s get you a quote. Upload a file or tell me what you need — I&apos;ll ask a few quick questions.</div></div>
                </div>
              )}

              {/* uploaded file cards */}
              {files.map((f) => (
                <div className="filecard" key={f.name}>
                  <div className="ic">📄</div>
                  <div className="meta">
                    <div className="fn">{f.name}</div>
                    <div className="fmeta">{f.type} · {fmtSize(f.size)} · <span className="ok">uploaded ✓</span></div>
                  </div>
                  <button type="button" className="rm" aria-label={`Remove ${f.name}`} onClick={() => removeFile(f.name)}>✕</button>
                </div>
              ))}

              {/* upload in progress */}
              {uploading && (
                <div className="filecard" aria-live="polite">
                  <div className="ic">⏳</div>
                  <div className="meta">
                    <div className="fn">{uploading.name}</div>
                    <div className="fprog"><div className="bar" style={{ width: `${uploading.pct}%` }} /></div>
                  </div>
                </div>
              )}

              {/* answered history */}
              {answeredSteps.map((s, i) => {
                const v = answers[s.id];
                if (v === undefined) return null;
                return (
                  <div className="ansrow user" key={`${s.id}-${i}`}>
                    <div className="av">🙂</div>
                    <div className="content">
                      <div className="bub">{v}</div>
                      <button type="button" className="edit" onClick={() => editStep(i)}>Edit {FIELD_LABELS[s.id] ?? ""}</button>
                    </div>
                  </div>
                );
              })}

              {/* success */}
              {done ? (
                <div className="success" role="status">
                  <div className="big">Request received ✓</div>
                  <p>Thank you — our team will review your documents and reply with a quote.</p>
                  <div className="ref">Reference: {done}</div>
                  <p>Typical quote response is under 15 minutes during business hours. We&apos;ll email you, and you can also continue on WhatsApp.</p>
                  <button type="button" className="qnext" onClick={openWhatsApp} style={{ marginTop: 16 }}>Continue on WhatsApp →</button>
                </div>
              ) : (
                /* active question card */
                <div className="qcard-a" ref={activeRef}>
                  <div className="qcount">{qCountLabel}</div>
                  <div className="qh"><span className="av">🪟</span><span>{active?.q}</span></div>

                  {/* upload affordance shown on the first step */}
                  {idx === 0 && (
                    <>
                      <div
                        className="drop"
                        role="button"
                        tabIndex={0}
                        aria-label="Upload files"
                        onClick={() => fileRef.current?.click()}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileRef.current?.click(); } }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
                        style={{ marginTop: 4 }}
                      >
                        <p className="big">📎 Drag &amp; drop a file</p>
                        <p className="or">or</p>
                        <div className="ways">
                          <span role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); camRef.current?.click(); }} onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); camRef.current?.click(); } }}>📷 Take a photo</span>
                          <span>💬 or just pick below</span>
                        </div>
                      </div>
                      {fileErr && <p className="qerr" role="alert">{fileErr}</p>}
                    </>
                  )}

                  {/* options */}
                  {active?.kind === "options" && (
                    <div className="opts" role="group" aria-label={active.q}>
                      {active.options?.map((o, i) => (
                        <button
                          type="button"
                          key={o}
                          className={`opt ${answers[active.id] === o ? "sel" : ""}`}
                          ref={i === 0 ? (el) => { firstFieldRef.current = el as unknown as HTMLInputElement; } : undefined}
                          onClick={() => onOption(o)}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* select */}
                  {active?.kind === "select" && (
                    <div className="qfield">
                      <select
                        ref={(el) => { firstFieldRef.current = el; }}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        aria-label={active.q}
                      >
                        <option value="" disabled>Choose…</option>
                        {active.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <button type="button" className="qnext" disabled={!draft} onClick={onFieldNext}>Continue →</button>
                    </div>
                  )}

                  {/* text */}
                  {active?.kind === "text" && (
                    <div className="qfield">
                      <input
                        ref={(el) => { firstFieldRef.current = el; }}
                        type={active.inputType ?? "text"}
                        placeholder={active.placeholder}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") onFieldNext(); }}
                        aria-label={active.q}
                      />
                      <button type="button" className="qnext" onClick={onFieldNext}>
                        {active.optional ? "Continue →" : "Continue →"}
                      </button>
                    </div>
                  )}

                  {/* review */}
                  {active?.kind === "review" && (
                    <>
                      <div className="review">
                        {files.length > 0 && (
                          <div className="rrow"><b>Files</b><span>{files.map((f) => f.name).join(", ")}</span><span /></div>
                        )}
                        {steps.filter((s) => s.id !== "review" && answers[s.id]).map((s) => {
                          const stepIndex = steps.findIndex((x) => x.id === s.id);
                          return (
                            <div className="rrow" key={s.id}>
                              <b>{FIELD_LABELS[s.id] ?? s.id}</b>
                              <span>{answers[s.id]}</span>
                              <button type="button" className="edit" onClick={() => editStep(stepIndex)}>Edit</button>
                            </div>
                          );
                        })}
                      </div>
                      {stepErr && <p className="qerr" role="alert">{stepErr}</p>}
                      <button type="button" className="qnext" disabled={submitting} onClick={submit}>
                        {submitting ? "Submitting…" : "Submit project request →"}
                      </button>
                    </>
                  )}

                  {stepErr && active?.kind !== "review" && <p className="qerr" role="alert">{stepErr}</p>}
                </div>
              )}

              {/* starters — only at the very start */}
              {idx === 0 && !done && (
                <div className="starters" style={{ marginTop: 16 }}>
                  {STARTERS.map((s) => (
                    <button type="button" className="starter" key={s.label} onClick={() => pickType(s.type)}>{s.label}</button>
                  ))}
                </div>
              )}
            </div>

            {/* hidden inputs */}
            <input ref={fileRef} type="file" hidden accept={ACCEPT.join(",")} onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
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
        aria-label="Start your project"
        onClick={() => {
          sectionRef.current?.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth" });
        }}
      >
        📎 Start your project
      </button>
    </section>
  );
}
