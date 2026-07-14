"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { siteConfig } from "@/config/site";

import { FileBin } from "./file-bin";
import { FIELD_LABELS, FLOWS, GROUP_ORDER, TYPE_STEP, type Step } from "./flow";
import {
  FILE_BINS, STATUS_STAGES, newRef, relTime,
  type ActivityEvent, type FileRole, type ProjectFile, type ProjectStatus,
} from "./project";
import { Reveal } from "./reveal";

const STARTERS: { label: string; type: string }[] = [
  { label: "Birth certificate", type: "USCIS / immigration" },
  { label: "USCIS documents", type: "USCIS / immigration" },
  { label: "Medical records", type: "Medical document" },
  { label: "Legal contract", type: "Legal contract" },
  { label: "Spanish interpreter", type: "Spanish interpreter" },
  { label: "Website localization", type: "Website / software" },
];
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
let fileSeq = 0;

type Answers = Record<string, string>;

/**
 * Project Intake Manager.
 * A guided questionnaire + a persistent (session-scoped) project workspace:
 * categorized multi-file uploads that can be added/removed/replaced before
 * OR after submission, a live summary, missing-document reminders, a status
 * timeline, draft-save, and a project that stays editable until the quote
 * is prepared. Session-scoped now; Phase 1C wires cross-visit persistence
 * and the PHP/MySQL CRM without changing this shape.
 */
export function StartComposer() {
  const reduced = useRef(false);

  // questionnaire
  const [steps, setSteps] = useState<Step[]>([TYPE_STEP]);
  const [answers, setAnswers] = useState<Answers>({});
  const [idx, setIdx] = useState(0);
  const [draft, setDraft] = useState("");
  const [stepErr, setStepErr] = useState("");
  const [qDone, setQDone] = useState(false);      // questionnaire finished

  // project
  const [ref, setRef] = useState<string | null>(null);
  const [status, setStatus] = useState<ProjectStatus>("draft");
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [fileErr, setFileErr] = useState("");
  const [savedAt, setSavedAt] = useState<string>("");
  const [activity, setActivity] = useState<ActivityEvent[]>([]);

  const logActivity = useCallback((text: string, icon: string) => {
    setActivity((a) => [{ id: `a${Date.now()}${Math.random().toString(36).slice(2, 5)}`, at: Date.now(), text, icon }, ...a].slice(0, 12));
  }, []);

  const [fabHidden, setFabHidden] = useState(true);
  const [live, setLive] = useState("");

  const sectionRef = useRef<HTMLElement | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);
  const filesRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  useEffect(() => { reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches; }, []);

  const active = steps[idx];
  const answeredSteps = steps.slice(0, idx);
  const submitted = status !== "draft";

  /* progress buckets */
  const groupsInFlow = useMemo(() => {
    const present = new Set(steps.map((s) => s.group));
    return GROUP_ORDER.filter((g) => present.has(g));
  }, [steps]);
  const activeGroup = active?.group;
  const doneGroups = useMemo(() => {
    if (qDone) return new Set(GROUP_ORDER);
    const gi = GROUP_ORDER.indexOf(activeGroup);
    return new Set(GROUP_ORDER.slice(0, gi));
  }, [activeGroup, qDone]);

  /* scroll + focus active question */
  useEffect(() => {
    if (qDone) return;
    const el = activeRef.current;
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth", block: "center" });
      firstFieldRef.current?.focus({ preventScroll: true });
      setLive(active?.q ?? "");
    }, 120);
    return () => window.clearTimeout(t);
  }, [idx, steps, qDone, active?.q]);

  /* compose-event entry */
  useEffect(() => {
    const onCompose = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      sectionRef.current?.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth" });
      const found = STARTERS.find((s) => detail.toLowerCase().includes(s.type.toLowerCase().slice(0, 6)));
      if (found && idx === 0 && !answers.type && !qDone) pickType(found.type);
    };
    window.addEventListener("tw:compose", onCompose);
    return () => window.removeEventListener("tw:compose", onCompose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, answers.type, qDone]);

  /* FAB */
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

  /* mark the project "saved" whenever it changes (session draft) */
  useEffect(() => {
    if (!ref) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setSavedAt(now);
  }, [answers, files, ref, status]);

  /* ── questionnaire flow ── */
  const buildSteps = useCallback((type: string): Step[] => {
    const branch = FLOWS[type] ?? FLOWS["Something else"];
    return [TYPE_STEP, ...branch];
  }, []);

  const pickType = useCallback((type: string) => {
    setSteps(buildSteps(type));
    setAnswers({ type });
    setIdx(1);
    setDraft("");
    setStepErr("");
    if (!ref) { setRef(newRef()); logActivity("Project created", "✨"); }
    logActivity(`Project type: ${type}`, "📋");
  }, [buildSteps, ref, logActivity]);

  const answerActive = useCallback((value: string) => {
    if (!active) return;
    setAnswers((a) => ({ ...a, [active.id]: value }));
    if (active.id === "source" || active.id === "target") logActivity(`${FIELD_LABELS[active.id]}: ${value}`, "🌐");
    else if (active.id === "cert") logActivity("Certification preference set", "🖋️");
    setStepErr("");
    setDraft("");
    setIdx((i) => Math.min(i + 1, steps.length - 1));
  }, [active, logActivity]);

  const onOption = useCallback((value: string) => {
    if (!active) return;
    if (active.id === "type") { pickType(value); return; }
    answerActive(value);
  }, [active, pickType, answerActive]);

  const onFieldNext = useCallback(() => {
    if (!active) return;
    const v = draft.trim();
    if (!v && !active.optional) { setStepErr("Please answer to continue."); return; }
    if (active.inputType === "email" && v && !emailOk(v)) { setStepErr("That email doesn't look right."); return; }
    answerActive(v || "—");
  }, [active, draft, answerActive]);

  const finishQuestionnaire = useCallback(() => { setQDone(true); logActivity("Details completed — ready for files", "✅"); }, [logActivity]);

  const editStep = useCallback((stepIdx: number) => {
    const s = steps[stepIdx];
    if (!s || submitted) return;
    setQDone(false);
    if (s.id === "type") { setSteps([TYPE_STEP]); setAnswers({}); setIdx(0); }
    else {
      const kept: Answers = {};
      steps.slice(0, stepIdx).forEach((st) => { if (answers[st.id] !== undefined) kept[st.id] = answers[st.id]; });
      setAnswers(kept); setIdx(stepIdx);
    }
    setDraft(""); setStepErr("");
  }, [steps, answers, submitted]);

  /* ── files ── */
  const addFiles = useCallback((role: FileRole, list: FileList) => {
    setFileErr("");
    const added: ProjectFile[] = Array.from(list).map((f) => ({
      id: `f${fileSeq++}`, name: f.name, size: f.size, type: f.type || "file", role,
      uploadedAt: Date.now(), status: "uploaded" as const,
    }));
    setFiles((prev) => [...prev, ...added]);
    setLive(`${added.length} file${added.length > 1 ? "s" : ""} added.`);
    added.forEach((f) => logActivity(`${f.name} uploaded`, "📄"));
    if (!ref) { setRef(newRef()); logActivity("Project created", "✨"); }
  }, [ref, logActivity]);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const gone = prev.find((f) => f.id === id);
      if (gone) logActivity(`${gone.name} removed`, "🗑️");
      return prev.filter((f) => f.id !== id);
    });
  }, [logActivity]);

  const replaceFile = useCallback((id: string, list: FileList) => {
    const f = list[0];
    setFiles((prev) => prev.map((p) => p.id === id ? { ...p, name: f.name, size: f.size, type: f.type || "file", uploadedAt: Date.now() } : p));
    setLive("File replaced.");
    logActivity(`${f.name} replaced a file`, "🔄");
  }, [logActivity]);

  /* ── missing-document logic ── */
  const docCount = files.filter((f) => f.role === "document").length;
  const missing = useMemo(() => {
    const m: string[] = [];
    if (docCount === 0) m.push("your documents to translate");
    if (qDone) {
      if (!answers.name) m.push("your name");
      if (!answers.email) m.push("your email");
    }
    return m;
  }, [docCount, qDone, answers.name, answers.email]);

  const canSubmit = qDone && docCount > 0 && !!answers.email && !submitted;

  /* ── actions ── */
  const submit = useCallback(() => {
    if (!canSubmit) return;
    setStatus("submitted");
    setLive(`Project ${ref} created and sent for review.`);
    logActivity("Project submitted for review", "🚀");
    // Phase 1C: POST project + files to the Vercel route → PHP CRM.
    window.setTimeout(() => { setStatus("reviewing"); logActivity("A project manager is reviewing your documents", "👀"); }, 1400);
  }, [canSubmit, ref, logActivity]);

  const openWhatsApp = useCallback(() => {
    const lines = [`Project ${ref ?? ""}`.trim()];
    steps.forEach((s) => { const v = answers[s.id]; if (v && s.id !== "review") lines.push(`${FIELD_LABELS[s.id] ?? s.id}: ${v}`); });
    FILE_BINS.forEach((b) => {
      const fs = files.filter((f) => f.role === b.role);
      if (fs.length) lines.push(`${b.label}: ${fs.map((f) => f.name).join(", ")}`);
    });
    window.open(`${siteConfig.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  }, [ref, steps, answers, files]);

  const stageIndex = STATUS_STAGES.findIndex((s) => s.key === status);

  /* plain-language "what is happening" per status */
  const statusExplainer = useMemo(() => {
    switch (status) {
      case "submitted": return "Great — your project has been created and is entering our review queue.";
      case "reviewing": return "A project manager is reviewing your documents to prepare an accurate quotation — typically under 15 minutes during business hours.";
      case "quote_ready": return "Your quotation is ready. Review it, or message your project manager to go ahead.";
      default: return "Your project is open and saved.";
    }
  }, [status]);

  /* the never-empty next action — every status maps to a concrete step */
  const nextAction = useMemo(() => {
    if (missing.length > 0) {
      return {
        icon: "📎", title: "Add your documents",
        desc: "Uploading your documents helps us prepare a more accurate quotation.",
        cta: "Upload documents", run: () => filesRef.current?.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth", block: "center" }),
      };
    }
    switch (status) {
      case "quote_ready":
        return { icon: "✅", title: "Your quotation is ready", desc: "Review the details and approve to begin.", cta: "Review quotation", run: openWhatsApp };
      case "reviewing":
        return { icon: "💬", title: "Anything to add?", desc: "Send a supporting file, a glossary, or a note while we review.", cta: "Message project manager", run: openWhatsApp };
      case "submitted":
        return { icon: "💬", title: "We're on it", desc: "Your project manager will be in touch shortly. Add anything else you'd like us to see.", cta: "Message project manager", run: openWhatsApp };
      default:
        return { icon: "💬", title: "Anything to add?", desc: "Send a supporting file or a note to your project manager.", cta: "Message project manager", run: openWhatsApp };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missing, status]);

  /* project summary rows (answered, non-review) */
  const summaryRows = steps.filter((s) => s.id !== "review" && answers[s.id]);

  const qCountLabel = active?.kind === "review" ? "Last question" : `Step ${idx + 1} of ${steps.length}`;

  return (
    <section id="start" ref={sectionRef}>
      <div className="sec" style={{ paddingTop: 84, paddingBottom: 84 }}>
        <Reveal as="p" className="k">For people who already know</Reveal>
        <Reveal delay={1}><h2>{ref ? "Your project workspace" : "Start your project in under 60 seconds."}</h2></Reveal>
        <Reveal delay={2}><p className="sub">Answer a few quick questions and add your files — we&apos;ll build a complete project, then prepare your quote.</p></Reveal>

        <div className="startsec">
          <Reveal delay={2} className="composer">
            <div className="body">
              <div className="sr-only" role="status" aria-live="polite">{live}</div>

              {/* workspace header (once a project exists) */}
              {ref && (
                <div className="ws-head">
                  <span className="ws-ref">Project {ref}<span className="pill">{STATUS_STAGES[stageIndex]?.label}</span></span>
                  <span className="ws-save"><span className="d" />{savedAt ? `Draft saved ${savedAt}` : "Draft saved"}</span>
                </div>
              )}

              {/* progress (during questionnaire) */}
              {!qDone && (
                <div className="progress" aria-hidden>
                  {groupsInFlow.map((g) => (
                    <span key={g} className={`pstep ${doneGroups.has(g) ? "done" : ""} ${activeGroup === g ? "active" : ""}`}>
                      <span className="pdot">✓</span> {g}
                    </span>
                  ))}
                </div>
              )}

              {/* intro */}
              {idx === 0 && !ref && (
                <div className="ansrow">
                  <div className="av">🪟</div>
                  <div className="content"><div className="bub"><strong>Hello!</strong> I&apos;m your project manager. Tell me what you need and add your files — I&apos;ll put together everything we need for an accurate quote.</div></div>
                </div>
              )}

              {/* answered history (during questionnaire) */}
              {!qDone && answeredSteps.map((s, i) => {
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

              {/* ── QUESTIONNAIRE (until qDone) ── */}
              {!qDone && (
                <div className="qcard-a" ref={activeRef}>
                  <div className="qcount">{qCountLabel}</div>
                  <div className="qh"><span className="av">🪟</span><span>{active?.q}</span></div>

                  {active?.kind === "options" && (
                    <div className="opts" role="group" aria-label={active.q}>
                      {active.options?.map((o, i) => (
                        <button
                          type="button" key={o}
                          className={`opt ${answers[active.id] === o ? "sel" : ""}`}
                          ref={i === 0 ? (el) => { firstFieldRef.current = el as unknown as HTMLInputElement; } : undefined}
                          onClick={() => onOption(o)}
                        >{o}</button>
                      ))}
                    </div>
                  )}

                  {active?.kind === "select" && (
                    <div className="qfield">
                      <select ref={(el) => { firstFieldRef.current = el; }} value={draft} onChange={(e) => setDraft(e.target.value)} aria-label={active.q}>
                        <option value="" disabled>Choose…</option>
                        {active.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <button type="button" className="qnext" disabled={!draft} onClick={onFieldNext}>Continue →</button>
                    </div>
                  )}

                  {active?.kind === "text" && (
                    <div className="qfield">
                      <input ref={(el) => { firstFieldRef.current = el; }} type={active.inputType ?? "text"} placeholder={active.placeholder} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") onFieldNext(); }} aria-label={active.q} />
                      <button type="button" className="qnext" onClick={onFieldNext}>Continue →</button>
                    </div>
                  )}

                  {active?.kind === "review" && (
                    <>
                      <p style={{ fontSize: ".9rem", color: "var(--char-soft)", marginBottom: 12 }}>
                        That&apos;s everything I need to ask. Next, let&apos;s make sure your files are attached.
                      </p>
                      <button type="button" className="qnext" onClick={finishQuestionnaire}>Continue to files →</button>
                    </>
                  )}

                  {stepErr && <p className="qerr" role="alert">{stepErr}</p>}
                </div>
              )}

              {/* ── BUILD VIEW (questionnaire done, not yet submitted) ── */}
              {qDone && !submitted && (
                <>
                  <div className="ws-summary">
                    <h4>Project summary</h4>
                    {summaryRows.map((s) => (
                      <div className="srow" key={s.id}>
                        <b>{FIELD_LABELS[s.id] ?? s.id}</b>
                        <span>{answers[s.id]}</span>
                        <button type="button" className="edit" onClick={() => editStep(steps.findIndex((x) => x.id === s.id))}>Edit</button>
                      </div>
                    ))}
                    <div className="srow">
                      <b>Files</b>
                      <span>{files.length ? `${files.length} attached (${docCount} document${docCount === 1 ? "" : "s"})` : <span className="miss">none yet</span>}</span>
                      <span />
                    </div>
                  </div>

                  {missing.length > 0 && (
                    <div className="reminder" role="status">
                      <span className="ri">⚠️</span>
                      <span>Uploading your documents will help us prepare a more accurate quotation. Still to add: <b>{missing.join(", ")}</b>.</span>
                    </div>
                  )}

                  {fileErr && <p className="qerr" role="alert" style={{ marginBottom: 10 }}>{fileErr}</p>}
                  {FILE_BINS.map((b) => (
                    <FileBin
                      key={b.role}
                      role={b.role} label={b.label} hint={b.hint} icon={b.icon}
                      files={files.filter((f) => f.role === b.role)}
                      onAdd={addFiles} onRemove={removeFile} onReplace={replaceFile}
                      onError={setFileErr}
                    />
                  ))}

                  <div className="ws-actions">
                    <button type="button" className="primary" disabled={!canSubmit} onClick={submit}>Create my project →</button>
                    <button type="button" className="ghost" onClick={openWhatsApp}>Continue on WhatsApp</button>
                  </div>
                  <p className="ws-note">
                    {canSubmit
                      ? <>You&apos;ll still be able to add or change files after this — your project stays open until we prepare the quote.</>
                      : <>Add your documents and contact details to create your project. <b>Your work is saved for this visit.</b></>}
                  </p>
                </>
              )}

              {/* ── PROJECT WORKSPACE DASHBOARD (after submission) ── */}
              {qDone && submitted && (
                <div className="dash">
                  {/* 1 · WHAT IS HAPPENING */}
                  <div className="dash-hero">
                    <p className="created"><span className="spark">✨</span> Project created</p>
                    <h3>Great, your project has been created.</h3>
                    <p>{statusExplainer}</p>
                    <span className="refbig">
                      {ref}
                      <button type="button" className="copy" onClick={() => { navigator.clipboard?.writeText(ref ?? ""); setLive("Reference copied."); }}>Copy reference</button>
                    </span>
                  </div>

                  {/* status timeline */}
                  <div className="ptimeline" aria-label="Project status">
                    {STATUS_STAGES.map((s, i) => (
                      <span key={s.key} style={{ display: "flex", alignItems: "center" }}>
                        <span className={`pstage ${i <= stageIndex ? "on" : ""} ${i === stageIndex ? "cur" : ""}`}>
                          <span className="pc">✓</span> {s.label}
                        </span>
                        {i < STATUS_STAGES.length - 1 && <span className="arw">→</span>}
                      </span>
                    ))}
                  </div>

                  {/* 2 · WHAT CAN I DO NEXT — never empty */}
                  <div className="nextcard">
                    <span className="na-ic">{nextAction.icon}</span>
                    <div className="na-body">
                      <h4>{nextAction.title}</h4>
                      <p>{nextAction.desc}</p>
                    </div>
                    <button type="button" className="na-btn" onClick={nextAction.run}>{nextAction.cta}</button>
                  </div>

                  {/* 3 · WHAT IS STILL MISSING */}
                  {missing.length > 0 && (
                    <div className="reminder" role="status">
                      <span className="ri">⚠️</span>
                      <span>You can still add documents at any time before your quotation is prepared. Helpful to include: <b>{missing.join(", ")}</b>.</span>
                    </div>
                  )}

                  {/* 4 · WHERE ARE MY FILES */}
                  <div className="dash-grid">
                    <div className="dcard">
                      <h4>📁 Your files <span className="cnt">· {files.length}</span></h4>
                      {files.length === 0 ? (
                        <p className="empty">No files yet — add your documents below.</p>
                      ) : (
                        FILE_BINS.map((b) => {
                          const fs = files.filter((f) => f.role === b.role);
                          if (!fs.length) return null;
                          return fs.map((f) => (
                            <div className="dfile" key={f.id}>
                              <span className="di">{b.icon}</span>
                              <span className="dn">{f.name}</span>
                            </div>
                          ));
                        })
                      )}
                      <button type="button" className="linkbtn" onClick={() => filesRef.current?.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth", block: "center" })}>Manage files ↓</button>
                    </div>

                    {/* 6 · CONTACT THE PROJECT MANAGER */}
                    <div className="dcard">
                      <h4>👤 Your project manager</h4>
                      <div className="pmcard" style={{ border: 0, background: "transparent", padding: 0 }}>
                        <div className="pmav">🪟</div>
                        <div className="pmmeta">
                          <div className="pn">Translation Windows team</div>
                          <div className="pd">Replies under 15 min · business hours</div>
                        </div>
                      </div>
                      <div className="pmacts" style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <a className="wa" href="#" onClick={(e) => { e.preventDefault(); openWhatsApp(); }} style={{ textDecoration: "none", fontWeight: 600, fontSize: ".84rem", padding: "9px 16px", borderRadius: 100, background: "var(--accent)", color: "#fff" }}>WhatsApp</a>
                        <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Project ${ref}`)}`} style={{ textDecoration: "none", fontWeight: 600, fontSize: ".84rem", padding: "9px 16px", borderRadius: 100, border: "1.5px solid var(--line)", color: "var(--char)" }}>Email</a>
                        <a href={`tel:${siteConfig.phone}`} style={{ textDecoration: "none", fontWeight: 600, fontSize: ".84rem", padding: "9px 16px", borderRadius: 100, border: "1.5px solid var(--line)", color: "var(--char)" }}>Call</a>
                      </div>
                    </div>
                  </div>

                  {/* 5 · REQUEST SUMMARY + HOW TO UPDATE */}
                  <div className="ws-summary">
                    <h4>Your request</h4>
                    {summaryRows.map((s) => (
                      <div className="srow" key={s.id}>
                        <b>{FIELD_LABELS[s.id] ?? s.id}</b>
                        <span>{answers[s.id]}</span>
                        <span />
                      </div>
                    ))}
                    <p className="ws-note" style={{ marginTop: 12 }}>
                      Need to change a detail? <b>Message your project manager</b> above and we&apos;ll update it before the quote is prepared.
                    </p>
                  </div>

                  {/* file manager stays fully live after submission */}
                  <div ref={filesRef}>
                    <h4 style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--char-soft)", margin: "6px 0 12px" }}>Add or update files anytime</h4>
                    {fileErr && <p className="qerr" role="alert" style={{ marginBottom: 10 }}>{fileErr}</p>}
                    {FILE_BINS.map((b) => (
                      <FileBin
                        key={b.role}
                        role={b.role} label={b.label} hint={b.hint} icon={b.icon}
                        files={files.filter((f) => f.role === b.role)}
                        onAdd={addFiles} onRemove={removeFile} onReplace={replaceFile}
                        onError={setFileErr}
                      />
                    ))}
                  </div>

                  {/* 7 · RECENT ACTIVITY — makes the workspace feel alive */}
                  {activity.length > 0 && (
                    <div className="activity">
                      <h4>Recent activity</h4>
                      <div className="afeed">
                        {activity.map((a, i) => (
                          <div className={`aitem ${i === 0 ? "fresh" : ""}`} key={a.id}>
                            <span className="adot">{a.icon}</span>
                            <span className="atext">{a.text}</span>
                            <span className="atime">{relTime(a.at)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FUTURE — subtle placeholders for Phase 1C CRM (not functional) */}
                  <div className="dcard">
                    <h4>Coming to your workspace</h4>
                    <div className="placeholders">
                      {[
                        { i: "🧾", l: "Quote", s: "Your quotation" },
                        { i: "💬", l: "Messages", s: "Chat with your PM" },
                        { i: "📄", l: "Invoices", s: "Billing history" },
                        { i: "⬇️", l: "Downloads", s: "Delivered files" },
                        { i: "📊", l: "Status", s: "Live progress" },
                      ].map((p) => (
                        <div className="ph" key={p.l}>
                          <div className="phi">{p.i}</div>
                          <div className="phl">{p.l}</div>
                          <div className="phs">{p.s}</div>
                          <span className="ph-soon">Soon</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* starters — only at the very start */}
              {idx === 0 && !ref && (
                <div className="starters" style={{ marginTop: 16 }}>
                  {STARTERS.map((s) => (
                    <button type="button" className="starter" key={s.label} onClick={() => pickType(s.type)}>{s.label}</button>
                  ))}
                </div>
              )}
            </div>
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
            <div className="qi-stat"><p className="lab">Estimated turnaround</p><p className="val">1–2 <em>business days</em></p></div>
            <div className="qi-stat"><p className="lab">Typical quote response</p><p className="val">Under <em>15 minutes</em></p><p style={{ fontSize: ".76rem", color: "var(--char-soft)" }}>during business hours</p></div>
          </Reveal>
        </div>
      </div>

      <button
        type="button"
        className={`fab ${fabHidden ? "hide" : ""}`}
        aria-label={ref ? "Open your project" : "Start your project"}
        onClick={() => sectionRef.current?.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth" })}
      >
        📎 {ref ? "Your project" : "Start your project"}
      </button>
    </section>
  );
}
