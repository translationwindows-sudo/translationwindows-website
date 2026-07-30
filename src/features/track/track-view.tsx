"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { siteConfig } from "@/config/site";

import "./track.css";

/* ── shapes returned by /api/portal ─────────────────────────────────── */
interface QuoteLine { label: string; amount: number }
interface Quotation {
  id: number; number: string; lines: QuoteLine[]; total: number; currency: string;
  turnaround: string | null; validUntil: string | null; status: string; canDecide: boolean;
}
interface PaymentMethod { key: string; label: string; note: string }
interface Invoice {
  id: number; number: string; amount: number; paid: number; outstanding: number;
  currency: string; status: string; dueAt: string | null;
  methods: PaymentMethod[]; paypalReady: boolean; paypalClientId: string | null;
}
interface Deliverable { id: number; name: string; size: number }
interface TimelineEntry { status: string; at: string }
interface Project {
  reference: string; submitted: string; status: string;
  service: string | null; languages: string | null; purpose: string | null;
  certification: string | null; deadlineText: string | null; deadline: string | null;
  expected: string | null; fileCount: number; remarks: string | null; reviewHours: string;
  deliverables: Deliverable[]; timeline: TimelineEntry[];
  quotation?: Quotation; invoice?: Invoice;
}

const STAGES = [
  "Project Received", "Files Verified", "Under Review", "Quotation",
  "Translation", "Quality Review", "Ready for Delivery", "Delivered",
];

const money = (v: number, c = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: c || "USD" }).format(v);

export function TrackView({ token }: { token: string }) {
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [project, setProject] = useState<Project | null>(null);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [comment, setComment] = useState("");
  const [declaring, setDeclaring] = useState(false);
  const [payRef, setPayRef] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/portal?token=${encodeURIComponent(token)}`, { cache: "no-store" });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok && data.project) {
        setProject(data.project as Project);
        setState("ok");
      } else {
        setMessage(typeof data?.error === "string" ? data.error : "We could not find that project.");
        setState("error");
      }
    } catch {
      setMessage("We could not load your project just now. Please try again shortly.");
      setState("error");
    }
  }, [token]);

  useEffect(() => { void load(); }, [load]);

  /** Send an action to the portal, then refresh. */
  const act = useCallback(async (fields: Record<string, string>) => {
    setBusy(true);
    setNotice(null);
    try {
      const form = new FormData();
      form.append("token", token);
      Object.entries(fields).forEach(([k, v]) => form.append(k, v));

      const res = await fetch("/api/portal", { method: "POST", body: form });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.ok) {
        setNotice(typeof data.message === "string" ? data.message : "Thank you.");
        await load();
      } else {
        setNotice(typeof data?.error === "string"
          ? data.error
          : "We could not complete that. Please try again, or message us on WhatsApp.");
      }
    } catch {
      setNotice("We could not reach our system just now. Please try again shortly.");
    } finally {
      setBusy(false);
    }
  }, [token, load]);

  if (state === "loading") {
    return <div className="tv"><div className="tv-card tv-center"><p className="tv-muted">Loading your project…</p></div></div>;
  }

  if (state === "error" || !project) {
    return (
      <div className="tv">
        <div className="tv-card tv-center">
          <h1 className="tv-h1">We could not find that project</h1>
          <p className="tv-muted">{message}</p>
          <div className="tv-acts">
            <a className="tv-btn" href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
              Talk to a Project Coordinator
            </a>
            <Link className="tv-btn ghost" href="/">Back to Translation Windows</Link>
          </div>
        </div>
      </div>
    );
  }

  const current = STAGES.indexOf(project.status);
  const q = project.quotation;
  const inv = project.invoice;

  return (
    <div className="tv">
      <div className="tv-head">
        <p className="tv-k">Project status</p>
        <h1 className="tv-h1">{project.reference}</h1>
        <p className="tv-muted">Submitted {project.submitted}</p>
      </div>

      {notice && <div className="tv-notice" role="status">{notice}</div>}

      {/* ── finished work, first when it exists ── */}
      {project.deliverables.length > 0 && (
        <div className="tv-card tv-deliver">
          <h2 className="tv-h2">Your completed translation</h2>
          {project.deliverables.map((d) => (
            <div className="tv-file" key={d.id}>
              <span className="tv-fn">{d.name}</span>
              <a className="tv-btn" href={`/api/deliverable?token=${encodeURIComponent(token)}&file=${d.id}`}>
                Download
              </a>
            </div>
          ))}
          {project.remarks && <p className="tv-remarks">{project.remarks}</p>}
        </div>
      )}

      {/* ── quotation, with approve / decline ── */}
      {q && (
        <div className="tv-card tv-quote">
          <h2 className="tv-h2">Quotation {q.number}</h2>
          <table className="tv-lines">
            <tbody>
              {q.lines.map((l) => (
                <tr key={l.label}>
                  <td>{l.label}</td>
                  <td>{money(l.amount, q.currency)}</td>
                </tr>
              ))}
              <tr className="tv-total">
                <td>Total</td>
                <td>{money(q.total, q.currency)}</td>
              </tr>
            </tbody>
          </table>

          {q.turnaround && <p className="tv-muted tv-sm">Turnaround: {q.turnaround}</p>}
          {q.validUntil && <p className="tv-muted tv-sm">Valid until {q.validUntil}</p>}

          {q.canDecide ? (
            <>
              <textarea
                className="tv-comment"
                placeholder="Any questions or notes for your Project Coordinator (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="tv-acts" style={{ justifyContent: "flex-start" }}>
                <button
                  type="button" className="tv-btn ok" disabled={busy}
                  onClick={() => void act({ action: "decide", quotation_id: String(q.id), decision: "accepted", comment })}
                >
                  {busy ? "Please wait…" : "Approve this quotation"}
                </button>
                <button
                  type="button" className="tv-btn ghost" disabled={busy}
                  onClick={() => void act({ action: "decide", quotation_id: String(q.id), decision: "declined", comment })}
                >
                  Decline
                </button>
              </div>
              <p className="tv-muted tv-sm">Approving begins the work and sends your invoice by email.</p>
            </>
          ) : (
            <p className="tv-status-line">
              This quotation is <strong>{q.status}</strong>.
            </p>
          )}
        </div>
      )}

      {/* ── invoice and payment ── */}
      {inv && (
        <div className="tv-card">
          <h2 className="tv-h2">Invoice {inv.number}</h2>
          <dl className="tv-rows">
            <div><dt>Amount</dt><dd>{money(inv.amount, inv.currency)}</dd></div>
            {inv.paid > 0 && <div><dt>Paid</dt><dd>{money(inv.paid, inv.currency)}</dd></div>}
            {inv.outstanding > 0 && <div><dt>Outstanding</dt><dd><strong>{money(inv.outstanding, inv.currency)}</strong></dd></div>}
            {inv.dueAt && <div><dt>Due by</dt><dd>{inv.dueAt}</dd></div>}
            <div><dt>Status</dt><dd>{inv.status.replace(/_/g, " ")}</dd></div>
          </dl>

          {inv.outstanding > 0 && inv.methods.length > 0 && (
            <div className="tv-pay">
              <p className="tv-sm" style={{ fontWeight: 600, marginBottom: 8 }}>How would you like to pay?</p>
              {inv.methods.map((m) => (
                <div className="tv-method" key={m.key}>
                  <div>
                    <div className="tv-mlabel">{m.label}</div>
                    <div className="tv-muted tv-sm">{m.note}</div>
                  </div>
                  {m.key === "bank" ? (
                    <button type="button" className="tv-btn ghost" onClick={() => setDeclaring(true)}>
                      I have paid
                    </button>
                  ) : inv.paypalReady ? (
                    <a className="tv-btn" href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                      Continue
                    </a>
                  ) : (
                    <span className="tv-muted tv-sm">Ask us for a link</span>
                  )}
                </div>
              ))}

              {declaring && (
                <div className="tv-declare">
                  <label htmlFor="payref">Your payment reference</label>
                  <input
                    id="payref" value={payRef} onChange={(e) => setPayRef(e.target.value)}
                    placeholder="Transaction or reference number"
                  />
                  <div className="tv-acts" style={{ justifyContent: "flex-start", marginTop: 10 }}>
                    <button
                      type="button" className="tv-btn" disabled={busy}
                      onClick={() => void act({ action: "declare_payment", method: "Bank transfer", reference: payRef })}
                    >
                      Tell us it is sent
                    </button>
                    <button type="button" className="tv-btn ghost" onClick={() => setDeclaring(false)}>Cancel</button>
                  </div>
                  <p className="tv-muted tv-sm">
                    We will confirm it against our records and let you know — usually the same business day.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── progress ── */}
      <div className="tv-stages">
        {STAGES.map((label, i) => (
          <div className={`tv-stage ${i < current ? "done" : ""} ${i === current ? "cur" : ""}`} key={label}>
            <span className="tv-dot">✓</span>
            <span className="tv-label">{label}</span>
          </div>
        ))}
      </div>

      {/* ── overview ── */}
      <div className="tv-card">
        <h2 className="tv-h2">Project overview</h2>
        <dl className="tv-rows">
          {project.service && <div><dt>Service</dt><dd>{project.service}</dd></div>}
          {project.languages && <div><dt>Languages</dt><dd>{project.languages}</dd></div>}
          {project.purpose && <div><dt>Purpose</dt><dd>{project.purpose}</dd></div>}
          {project.certification && <div><dt>Certification</dt><dd>{project.certification}</dd></div>}
          {project.deadline && <div><dt>Deadline</dt><dd>{project.deadline}</dd></div>}
          {!project.deadline && project.deadlineText && <div><dt>Deadline</dt><dd>{project.deadlineText}</dd></div>}
          {project.expected && <div><dt>Expected completion</dt><dd><strong>{project.expected}</strong></dd></div>}
          <div><dt>Files received</dt><dd>{project.fileCount}</dd></div>
        </dl>
      </div>

      {/* ── coordinator ── */}
      <div className="tv-card">
        <h2 className="tv-h2">Your Project Coordinator</h2>
        <p className="tv-muted" style={{ marginBottom: 14 }}>{project.reviewHours}</p>
        <div className="tv-acts" style={{ justifyContent: "flex-start" }}>
          <a className="tv-btn" href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a className="tv-btn ghost" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Project ${project.reference}`)}`}>Email</a>
          <a className="tv-btn ghost" href={`tel:${siteConfig.phone}`}>Call</a>
        </div>
      </div>
    </div>
  );
}
