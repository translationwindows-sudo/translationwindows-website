"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { siteConfig } from "@/config/site";

import { FileBin } from "./file-bin";
import {
  FIELD_LABELS, FLOWS, GROUP_ORDER, SERVICE_LABEL, TURNAROUND, TYPE_STEP, type Step,
} from "./flow";
import {
  FILE_BINS, STATUS_STAGES, newRef, relTime,
  type ActivityEvent, type FileRole, type ProjectFile, type ProjectStatus,
} from "./project";
import { Reveal } from "./reveal";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
let fileSeq = 0;

type Answers = Record<string, string>;

/**
 * Project Intake Manager — a sequential interview, not a menu.
 * One question drives the next; the upload step appears only once enough
 * is known to justify it; completed answers collapse into a compact
 * confirmation list; a live project summary replaces the static sidebar.
 * Session-scoped now — Phase 1C wires cross-visit persistence and the
 * PHP/MySQL CRM onto this same data shape.
 */
export function StartComposer() {
  const reduced = useRef(false);

  const [steps, setSteps] = useState<Step[]>([TYPE_STEP]);
  const [answers, setAnswers] = useState<Answers>({});
  const [idx, setIdx] = useState(0);
  /** When editing an earlier answer, where to return once it is changed. */
  const [returnTo, setReturnTo] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [stepErr, setStepErr] = useState("");

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
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [trackingToken, setTrackingToken] = useState<string | null>(null);
  const [moreFilesOpen, setMoreFilesOpen] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);
  const filesRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  useEffect(() => { reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches; }, []);

  const active = steps[idx];
  const submitted = status !== "draft";
  const uploadIdx = useMemo(() => steps.findIndex((s) => s.kind === "upload"), [steps]);
  const filesUnlocked = uploadIdx >= 0 && idx >= uploadIdx;
  const onUploadStep = active?.kind === "upload";

  const groupsInFlow = useMemo(() => {
    const present = new Set(steps.map((s) => s.group));
    return GROUP_ORDER.filter((g) => present.has(g));
  }, [steps]);
  const activeGroup = active?.group;
  const doneGroups = useMemo(() => {
    const gi = GROUP_ORDER.indexOf(activeGroup);
    return new Set(GROUP_ORDER.slice(0, gi));
  }, [activeGroup]);

  useEffect(() => {
    if (submitted) return;
    const el = activeRef.current;
    if (!el) return;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth", block: "nearest" });
      firstFieldRef.current?.focus({ preventScroll: true });
      setLive(active ? `${active.lead ? `${active.lead} ` : ""}${active.q}` : "");
    }, 120);
    return () => window.clearTimeout(t);
  }, [idx, steps, submitted, active]);

  useEffect(() => {
    const onCompose = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail.toLowerCase();
      sectionRef.current?.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth" });
      if (idx !== 0 || answers.type || submitted) return;
      const guess = Object.keys(FLOWS).find((t) => detail.includes(t.toLowerCase().slice(0, 6)))
        ?? (detail.includes("interpret") ? "Spanish interpreter" : undefined)
        ?? (detail.includes("uscis") || detail.includes("birth") || detail.includes("certificate") ? "USCIS / immigration" : undefined)
        ?? (detail.includes("medical") ? "Medical document" : undefined)
        ?? (detail.includes("website") || detail.includes("localiz") ? "Website / software" : undefined)
        ?? (detail.includes("legal") || detail.includes("contract") ? "Legal contract" : undefined);
      if (guess) pickType(guess);
    };
    window.addEventListener("tw:compose", onCompose);
    return () => window.removeEventListener("tw:compose", onCompose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, answers.type, submitted]);

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

  useEffect(() => {
    if (!ref) return;
    setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, [answers, files, ref, status]);

  const buildSteps = useCallback((type: string): Step[] => [TYPE_STEP, ...(FLOWS[type] ?? FLOWS["Something else"])], []);

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
    else if (active.id === "purpose") logActivity(`Purpose: ${value}`, "🎯");
    setStepErr("");
    setDraft("");

    // If this was an edit, hand the customer straight back to where they
    // were rather than making them walk the remaining questions again.
    if (returnTo !== null) {
      setIdx(Math.min(returnTo, steps.length - 1));
      setReturnTo(null);
      return;
    }
    setIdx((i) => Math.min(i + 1, steps.length - 1));
  }, [active, steps.length, logActivity, returnTo]);

  const onOption = useCallback((value: string) => {
    if (!active) return;
    if (active.id === "type") {
      // Re-picking the SAME type must not wipe the answers that follow.
      if (answers.type === value && returnTo !== null) {
        setIdx(Math.min(returnTo, steps.length - 1));
        setReturnTo(null);
        setStepErr("");
        return;
      }
      setReturnTo(null);   // a real change invalidates the later questions
      pickType(value);
      return;
    }
    answerActive(value);
  }, [active, pickType, answerActive, answers.type, returnTo, steps.length]);

  const onFieldNext = useCallback(() => {
    if (!active) return;
    const v = draft.trim();
    if (!v && !active.optional) { setStepErr("Please answer to continue."); return; }
    if (active.inputType === "email" && v && !emailOk(v)) { setStepErr("That email doesn't look right."); return; }
    answerActive(v || "—");
  }, [active, draft, answerActive]);

  const advancePastUpload = useCallback(() => {
    if (files.filter((f) => f.role === "document").length === 0) { setStepErr("Please add at least one document to continue."); return; }
    setStepErr("");
    setIdx((i) => Math.min(i + 1, steps.length - 1));
  }, [files, steps.length]);

  /**
   * Jump back to one answer without losing the others.
   *
   * Previously this discarded every answer after the edited step, so
   * correcting the purpose meant re-entering the certification, deadline
   * and everything else. Now all answers are kept and the customer is
   * returned to where they were as soon as the change is made.
   *
   * The one exception is the project type, which determines WHICH
   * questions follow — changing that genuinely does invalidate the rest,
   * and only then are later answers cleared.
   */
  const editStep = useCallback((stepIdx: number) => {
    const s = steps[stepIdx];
    if (!s || submitted) return;
    setReturnTo(idx);          // remember where to come back to
    setIdx(stepIdx);
    setDraft(String(answers[s.id] ?? ""));
    setStepErr("");
  }, [steps, submitted, idx, answers]);

  const addFiles = useCallback((role: FileRole, list: FileList) => {
    setFileErr("");
    const added: ProjectFile[] = Array.from(list).map((f) => ({
      id: `f${fileSeq++}`, name: f.name, size: f.size, type: f.type || "file", role,
      uploadedAt: Date.now(), status: "uploaded" as const, raw: f,
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
    setFiles((prev) => prev.map((p) => (p.id === id ? { ...p, name: f.name, size: f.size, type: f.type || "file", uploadedAt: Date.now() } : p)));
    setLive("File replaced.");
    logActivity(`${f.name} replaced a file`, "🔄");
  }, [logActivity]);

  const docCount = files.filter((f) => f.role === "document").length;

  const canSubmit = active?.kind === "review" && docCount > 0 && !!answers.email && !sending;

  /**
   * Real submission. Posts to our Vercel route, which signs the payload and
   * forwards it to the PHP backend. The reference shown afterwards is the one
   * the SERVER generated — never a browser-made value.
   *
   * On failure the customer keeps every answer and file, sees an honest
   * message, and can retry or reach us on WhatsApp.
   */
  const submit = useCallback(async () => {
    if (!canSubmit || sending) return;

    setSending(true);
    setSubmitError(null);
    setLive("Submitting your project…");

    try {
      const skip = ["type", "name", "email", "phone", "source", "target",
                    "purpose", "cert", "deadline", "review", "files"];

      const payload = {
        customer: {
          full_name: answers.name ?? "",
          email: answers.email ?? "",
          phone: answers.phone && answers.phone !== "—" ? answers.phone : "",
          company: "",
          preferred_language: "English",
          preferred_contact: "email",
        },
        project: {
          service: answers.type ?? "",
          source_lang: answers.source ?? "",
          target_lang: answers.target ?? "",
          purpose: answers.purpose ?? "",
          certification: answers.cert ?? "",
          deadline: answers.deadline ?? "",
          priority: answers.deadline === "As soon as possible" ? "Rush" : "Standard",
          customer_notes: "",
          source: "Website",
        },
        answers: steps
          .filter((s) => !skip.includes(s.id) && answers[s.id])
          .map((s) => ({
            key: s.id,
            label: FIELD_LABELS[s.id] ?? s.id,
            value: answers[s.id],
          })),
      };

      const form = new FormData();
      form.append("payload", JSON.stringify(payload));
      files.forEach((f) => {
        if (f.raw) {
          form.append("files", f.raw, f.name);
          form.append("file_roles[]", f.role);
        }
      });

      const res = await fetch("/api/submit-project", { method: "POST", body: form });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        const message = (data && typeof data.error === "string")
          ? data.error
          : "We could not save your project. Please try again, or message us on WhatsApp and we will take it from there.";
        setSubmitError(message);
        setLive(message);
        setSending(false);
        return;
      }

      // Success — adopt the SERVER's reference and tracking token.
      setRef(data.reference);
      setTrackingToken(data.trackingToken ?? null);
      setStatus("submitted");
      logActivity(`Project ${data.reference} submitted for review`, "🚀");
      setLive(`Your project has been received. Reference ${data.reference}.`);
      window.setTimeout(() => {
        setStatus("reviewing");
        logActivity("Your Project Coordinator is reviewing your documents", "👀");
      }, 1400);
    } catch (err) {
      console.error("[TW] submit failed", err);
      const message = "We could not reach our system just now. Your details are still here — please try again, or message us on WhatsApp.";
      setSubmitError(message);
      setLive(message);
    } finally {
      setSending(false);
    }
  }, [canSubmit, sending, answers, steps, files, logActivity]);

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

  const statusExplainer = useMemo(() => {
    switch (status) {
      case "submitted": return "Your project has been received successfully. Our Project Coordinator is now reviewing your documents.";
      case "reviewing": return "Your Project Coordinator is reviewing your documents to prepare an accurate quotation. Most requests are reviewed within 30–60 minutes during business hours.";
      case "quote_ready": return "Your quotation is ready. Review it, or message your Project Coordinator to go ahead.";
      default: return "Your project is open and saved.";
    }
  }, [status]);

  const missing = useMemo(() => {
    const m: string[] = [];
    if (docCount === 0) m.push("your documents");
    if (!answers.email) m.push("your email");
    return m;
  }, [docCount, answers.email]);

  const nextAction = useMemo(() => {
    if (missing.length > 0) {
      return { icon: "📎", title: "Add your documents", desc: "Uploading your documents helps us prepare a more accurate quotation.", cta: "Upload documents", run: () => filesRef.current?.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth", block: "center" }) };
    }
    switch (status) {
      case "quote_ready": return { icon: "✅", title: "Your quotation is ready", desc: "Review the details and approve to begin.", cta: "Review quotation", run: openWhatsApp };
      case "reviewing": return { icon: "💬", title: "Anything to add?", desc: "Send a supporting file, a glossary, or a note while we review.", cta: "Message Project Coordinator", run: openWhatsApp };
      default: return { icon: "💬", title: "We're on it", desc: "Your Project Coordinator will be in touch shortly. Add anything else you'd like us to see.", cta: "Message Project Coordinator", run: openWhatsApp };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missing, status]);

  const confirmedRows = useMemo(() => {
    const rows: { key: string; label: string; value: string; stepIdx: number }[] = [];
    let sourceDone = false;
    steps.forEach((s, i) => {
      if (i >= idx || s.kind === "review" || s.kind === "upload") return;
      const v = answers[s.id];
      if (v === undefined) return;
      if (s.id === "source") { sourceDone = true; return; }
      if (s.id === "target" && sourceDone) {
        rows.push({ key: "lang", label: "Language pair", value: `${answers.source} → ${v}`, stepIdx: i });
        return;
      }
      rows.push({ key: s.id, label: FIELD_LABELS[s.id] ?? s.id, value: v, stepIdx: i });
    });
    if (filesUnlocked && docCount > 0) rows.push({ key: "files", label: "Files", value: `${docCount} uploaded`, stepIdx: uploadIdx });
    return rows;
  }, [steps, idx, answers, filesUnlocked, docCount, uploadIdx]);

  const svc = answers.type ? SERVICE_LABEL[answers.type] : null;
  const turnaround = answers.type ? TURNAROUND[answers.type] : null;
  const sidebarStatus = submitted
    ? STATUS_STAGES[stageIndex]?.label
    : !answers.type ? "Let's get started"
    : docCount === 0 ? "Awaiting your documents"
    : active?.kind === "review" ? "Ready for quotation"
    : "Building your project overview";

  const qCountLabel = active?.kind === "review" ? "Final step" : `Step ${idx + 1} of ${steps.length}`;

  /* "What happens next?" — always answered, at every stage of the journey */
  const nextStepText = submitted
    ? (status === "quote_ready"
        ? "Review your quotation"
        : "Your Project Coordinator is reviewing your documents")
    : !answers.type ? "Tell us what you are translating"
    : active?.kind === "upload" ? "Upload your documents"
    : active?.kind === "review" ? "Create your project"
    : "Answer a few more quick questions";

  /* the upload ask names the actual document the customer mentioned */
  const docNoun = (answers.doctype || answers.type || "document").toLowerCase();
  const uploadLeadText = `Please upload your ${docNoun} whenever you are ready.`;

  return (
    <section id="start" ref={sectionRef}>
      <div className="sec" style={{ paddingTop: 84, paddingBottom: 84 }}>
        <Reveal as="p" className="k">For people who already know</Reveal>
        <Reveal delay={1}><h2>{ref ? "Your project workspace" : "Start your project in under 60 seconds."}</h2></Reveal>
        <Reveal delay={2}><p className="sub">A few quick questions, then your documents. About a minute in total.</p></Reveal>

        <div className="startsec">
          <Reveal delay={2} className="composer">
            <div className="body">
              <div className="sr-only" role="status" aria-live="polite">{live}</div>

              {ref && (
                <div className="ws-head">
                  <span className="ws-ref">Project {ref}<span className="pill">{STATUS_STAGES[stageIndex]?.label}</span></span>
                  <span className="ws-save"><span className="d" />{savedAt ? `Draft saved ${savedAt}` : "Draft saved"}</span>
                </div>
              )}

              {!submitted && (
                <div className="progress" aria-hidden>
                  {groupsInFlow.map((g) => (
                    <span key={g} className={`pstep ${doneGroups.has(g) ? "done" : ""} ${activeGroup === g ? "active" : ""}`}>
                      <span className="pdot">✓</span> {g}
                    </span>
                  ))}
                </div>
              )}

              {idx === 0 && !ref && (
                <div className="ansrow">
                  <div className="av">🧑‍💼</div>
                  <div className="content"><div className="bub"><span className="qwho">Project Coordinator</span><strong>Welcome to Translation Windows.</strong> Let&apos;s prepare your project together. I&apos;ll ask a few quick questions so our team can prepare the most accurate quotation possible — it takes about a minute.</div></div>
                </div>
              )}

              {!submitted && confirmedRows.map((r) => (
                <div className="ansrow user confirmed" key={r.key}>
                  <div className="av">✓</div>
                  <div className="content">
                    <div className="bub"><b>{r.label}</b><span className="val">{r.value}</span></div>
                    <button type="button" className="edit" onClick={() => editStep(r.stepIdx)}>Edit</button>
                  </div>
                </div>
              ))}

              {!submitted && filesUnlocked && (
                <div className="qcard-a" ref={onUploadStep ? activeRef : undefined} style={{ marginBottom: 16 }}>
                  {onUploadStep ? (
                    <>
                      <div className="qcount">{qCountLabel}</div>
                      <div className="qh"><span className="av">🧑‍💼</span><span><span className="qwho">Project Coordinator</span>{uploadLeadText}</span></div>
                      {active?.why && <p className="qwhy">{active.why}</p>}

                      {fileErr && <p className="qerr" role="alert" style={{ marginBottom: 10 }}>{fileErr}</p>}
                      <FileBin
                        role="document" label={FILE_BINS[0].label} hint={FILE_BINS[0].hint} icon={FILE_BINS[0].icon}
                        files={files.filter((f) => f.role === "document")}
                        onAdd={addFiles} onRemove={removeFile} onReplace={replaceFile}
                        onError={setFileErr}
                      />

                      <button type="button" className="linkbtn" onClick={() => setMoreFilesOpen((o) => !o)} style={{ marginBottom: moreFilesOpen ? 12 : 0 }}>
                        {moreFilesOpen ? "Hide supporting files" : "+ Add supporting documents, glossary, or style guide (optional)"}
                      </button>
                      {moreFilesOpen && FILE_BINS.slice(1).map((b) => (
                        <FileBin
                          key={b.role}
                          role={b.role} label={b.label} hint={b.hint} icon={b.icon}
                          files={files.filter((f) => f.role === b.role)}
                          onAdd={addFiles} onRemove={removeFile} onReplace={replaceFile}
                          onError={setFileErr}
                        />
                      ))}

                      {docCount === 0 && <p className="qerr" role="alert">{stepErr || "Add at least one document to continue."}</p>}
                      <button type="button" className="qnext" disabled={docCount === 0} onClick={advancePastUpload}>Continue →</button>
                    </>
                  ) : (
                    <>
                      <h4 style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--char-soft)", marginBottom: 12 }}>Your documents</h4>
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
                    </>
                  )}
                </div>
              )}

              {!submitted && active && active.kind !== "upload" && (
                <div className="qcard-a" ref={activeRef}>
                  <div className="qcount">{qCountLabel}</div>
                  <div className="qh"><span className="av">🧑‍💼</span><span><span className="qwho">Project Coordinator</span>{active.lead ? `${active.lead} ` : ""}{active.q}</span></div>
                  {active.why && <p className="qwhy">{active.why}</p>}

                  {active.kind === "options" && (
                    <div className="opts" role="group" aria-label={active.q}>
                      {active.options?.map((o, i) => (
                        <button
                          type="button" key={o}
                          className="opt"
                          ref={i === 0 ? (el) => { firstFieldRef.current = el as unknown as HTMLInputElement; } : undefined}
                          onClick={() => onOption(o)}
                        >{o}</button>
                      ))}
                    </div>
                  )}

                  {active.kind === "select" && (
                    <div className="qfield">
                      <select ref={(el) => { firstFieldRef.current = el; }} value={draft} onChange={(e) => setDraft(e.target.value)} aria-label={active.q}>
                        <option value="" disabled>Choose…</option>
                        {active.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <button type="button" className="qnext" disabled={!draft} onClick={onFieldNext}>Continue →</button>
                    </div>
                  )}

                  {active.kind === "text" && (
                    <div className="qfield">
                      <input ref={(el) => { firstFieldRef.current = el; }} type={active.inputType ?? "text"} placeholder={active.placeholder} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") onFieldNext(); }} aria-label={active.q} />
                      <button type="button" className="qnext" onClick={onFieldNext}>Continue →</button>
                    </div>
                  )}

                  {active.kind === "review" && (
                    <>
                      <div className="review">
                        {svc && <div className="rrow"><b>Service</b><span>{svc}</span><span /></div>}
                        {confirmedRows.map((r) => (
                          <div className="rrow" key={r.key}><b>{r.label}</b><span>{r.value}</span><span /></div>
                        ))}
                      </div>
                      {stepErr && <p className="qerr" role="alert">{stepErr}</p>}

                      {submitError && (
                        <div className="submit-error" role="alert">
                          <p className="se-t">We could not create your project</p>
                          <p className="se-b">{submitError}</p>
                          <div className="se-acts">
                            <button type="button" className="se-retry" onClick={() => { void submit(); }}>Try again</button>
                            <button type="button" className="se-wa" onClick={openWhatsApp}>Send on WhatsApp instead</button>
                          </div>
                          <p className="se-n">Nothing has been lost — your answers and files are still here.</p>
                        </div>
                      )}

                      <button type="button" className="qnext" disabled={!canSubmit} onClick={() => { void submit(); }}>
                        {sending ? "Creating your project…" : "Create My Project →"}
                      </button>
                    </>
                  )}

                  {stepErr && active.kind !== "review" && <p className="qerr" role="alert">{stepErr}</p>}
                </div>
              )}

              {submitted && (
                <div className="dash">
                  <div className="dash-hero">
                    <p className="created"><span className="spark">✓</span> Project created</p>
                    <h3>Your project has been received successfully.</h3>
                    <p>{statusExplainer}</p>
                    <span className="refbig">
                      {ref}
                      <button type="button" className="copy" onClick={() => { navigator.clipboard?.writeText(ref ?? ""); setLive("Reference copied."); }}>Copy reference</button>
                    </span>
                    {trackingToken && (
                      <p className="tracklink">
                        Track this project anytime:{" "}
                        <a href={`/track/${trackingToken}`}>translationwindows.com/track/…</a>
                        {" · "}
                        <button type="button" onClick={() => {
                          navigator.clipboard?.writeText(`${window.location.origin}/track/${trackingToken}`);
                          setLive("Tracking link copied.");
                        }}>Copy link</button>
                      </p>
                    )}
                  </div>

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

                  <div className="nextcard">
                    <span className="na-ic">{nextAction.icon}</span>
                    <div className="na-body"><h4>{nextAction.title}</h4><p>{nextAction.desc}</p></div>
                    <button type="button" className="na-btn" onClick={nextAction.run}>{nextAction.cta}</button>
                  </div>

                  <div className="whatnext">
                    <h4>What happens next</h4>
                    <p className="wn-lead">Your Project Coordinator will:</p>
                    <ol className="wn-list">
                      <li>Review your documents</li>
                      <li>Confirm your project requirements</li>
                      <li>Prepare an accurate quotation</li>
                      <li>Contact you if clarification is required</li>
                      <li>Assign your project after approval</li>
                    </ol>
                    <div className="wn-hours">
                      <p className="wnh-t">Project Review Hours</p>
                      <p className="wnh-b">Monday – Friday · 8:00 AM – 6:00 PM Central Time</p>
                      <p className="wnh-n">Quotation requests received during these hours are normally reviewed within 30–60 minutes. Larger or more complex projects may require additional review time.</p>
                    </div>
                  </div>

                  {missing.length > 0 && (
                    <div className="reminder" role="status">
                      <span className="ri">⚠️</span>
                      <span>You can still add documents at any time before your quotation is prepared. Helpful to include: <b>{missing.join(", ")}</b>.</span>
                    </div>
                  )}

                  <div className="dash-grid">
                    <div className="dcard">
                      <h4>📁 Your files <span className="cnt">· {files.length}</span></h4>
                      {files.length === 0 ? <p className="empty">No files yet — add your documents below.</p> : (
                        FILE_BINS.map((b) => files.filter((f) => f.role === b.role).map((f) => (
                          <div className="dfile" key={f.id}><span className="di">{b.icon}</span><span className="dn">{f.name}</span></div>
                        )))
                      )}
                      <button type="button" className="linkbtn" onClick={() => filesRef.current?.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth", block: "center" })}>Manage files ↓</button>
                    </div>

                    <div className="dcard">
                      <h4>👤 Your Project Coordinator</h4>
                      <div className="pmcard" style={{ border: 0, background: "transparent", padding: 0 }}>
                        <div className="pmav">🪟</div>
                        <div className="pmmeta"><div className="pn">Translation Windows team</div><div className="pd">Reviewed within 30–60 minutes · business hours</div></div>
                      </div>
                      <div className="pmacts" style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <a className="wa" href="#" onClick={(e) => { e.preventDefault(); openWhatsApp(); }} style={{ textDecoration: "none", fontWeight: 600, fontSize: ".84rem", padding: "9px 16px", borderRadius: 100, background: "var(--accent)", color: "#fff" }}>WhatsApp</a>
                        <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Project ${ref}`)}`} style={{ textDecoration: "none", fontWeight: 600, fontSize: ".84rem", padding: "9px 16px", borderRadius: 100, border: "1.5px solid var(--line)", color: "var(--char)" }}>Email</a>
                        <a href={`tel:${siteConfig.phone}`} style={{ textDecoration: "none", fontWeight: 600, fontSize: ".84rem", padding: "9px 16px", borderRadius: 100, border: "1.5px solid var(--line)", color: "var(--char)" }}>Call</a>
                      </div>
                    </div>
                  </div>

                  <div className="ws-summary">
                    <h4>Your request</h4>
                    {svc && <div className="srow"><b>Service</b><span>{svc}</span><span /></div>}
                    {confirmedRows.map((r) => (
                      <div className="srow" key={r.key}><b>{r.label}</b><span>{r.value}</span><span /></div>
                    ))}
                    <p className="ws-note" style={{ marginTop: 12 }}>
                      Need to change a detail? <b>Message your Project Coordinator</b> above and we&apos;ll update it before the quote is prepared.
                    </p>
                  </div>

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
            </div>
          </Reveal>

          <Reveal delay={3} as="aside" className="quickinfo livesum">
            <h3>Your project summary</h3>
            {!answers.type ? (
              <p style={{ fontSize: ".88rem", color: "var(--char-soft)" }}>Answer the first question and this panel fills in as we go.</p>
            ) : (
              <ul className="qi-list">
                <li className="on"><b>✓</b> Service: {svc}</li>
                {answers.doctype && <li className="on"><b>✓</b> Document: {answers.doctype}</li>}
                <li className={answers.source && answers.target ? "on" : ""}><b>{answers.source && answers.target ? "✓" : "—"}</b> Language pair: {answers.source && answers.target ? `${answers.source} → ${answers.target}` : "not yet set"}</li>
                {steps.some((s) => s.id === "purpose") && (
                  <li className={answers.purpose ? "on" : ""}><b>{answers.purpose ? "✓" : "—"}</b> Purpose: {answers.purpose ?? "not yet set"}</li>
                )}
                <li className={docCount > 0 ? "on" : ""}><b>{docCount > 0 ? "✓" : "—"}</b> Files: {docCount > 0 ? `${docCount} uploaded` : "none yet"}</li>
              </ul>
            )}
            {answers.deadline && <div className="qi-stat"><p className="lab">Deadline</p><p className="val" style={{ fontSize: "1rem" }}>{answers.deadline}</p></div>}
            {turnaround && <div className="qi-stat"><p className="lab">Estimated turnaround</p><p className="val">{turnaround}</p></div>}
            <div className="qi-stat"><p className="lab">Current status</p><p className="val" style={{ fontSize: "1rem" }}>{sidebarStatus}</p></div>
            <div className="qi-stat"><p className="lab">Next step</p><p className="val" style={{ fontSize: ".95rem", fontWeight: 500 }}>{nextStepText}</p></div>
            {!submitted && <div className="qi-stat"><p className="lab">Quotation review</p><p className="val" style={{ fontSize: "1rem" }}><em>30–60 minutes</em></p><p style={{ fontSize: ".76rem", color: "var(--char-soft)" }}>during business hours</p></div>}
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
