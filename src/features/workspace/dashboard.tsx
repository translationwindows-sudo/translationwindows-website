"use client";

import { useState } from "react";

import { siteConfig } from "@/config/site";

import { STAGES, demo, stageIndex } from "./platform";
import "./workspace.css";

/**
 * Customer platform dashboard.
 * Presentation layer only — content comes from `demo` in platform.ts.
 * Phase 1C swaps that source for CRM records; this tree stays as-is.
 */
export function Dashboard() {
  const p = demo.project;
  const cur = stageIndex(p.stage);
  const [draft, setDraft] = useState("");

  return (
    <div className="tww">
      <div className="wrap">
        <div className="preview">
          <span>ℹ️</span>
          <span>
            <b>Platform preview.</b> This is a design preview of the customer workspace using
            example content. Customer accounts and live project data arrive in the next phase.
          </span>
        </div>

        {/* ── header ── */}
        <div className="whead">
          <div className="wh-l">
            <p className="eyebrow">Your project workspace</p>
            <h1>{p.title}</h1>
            <p className="wh-meta">
              Reference <b>{p.ref}</b> · {p.service} · {p.pair}
            </p>
          </div>
          <span className="badge"><span className="dot" /> {STAGES[cur].label}</span>
        </div>

        {/* ── next action — never empty ── */}
        <div className="next" style={{ marginBottom: 20 }}>
          <span className="ni">✅</span>
          <div className="nb">
            <h4>Nothing needed from you right now</h4>
            <p>{STAGES[cur].explain} We will notify you the moment your files are ready.</p>
          </div>
          <a className="nbtn" href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
            Message your Coordinator
          </a>
        </div>

        <div className="grid">
          {/* ── LEFT ── */}
          <div className="col">
            {/* timeline */}
            <div className="card">
              <h3>Project timeline</h3>
              <div className="tl2">
                {STAGES.map((s, i) => (
                  <div className={`st ${i < cur ? "done" : ""} ${i === cur ? "cur" : ""} ${i > cur ? "upcoming" : ""}`} key={s.key}>
                    <span className="sd">✓</span>
                    <div className="sb">
                      <div className="sn">{s.label}</div>
                      <div className="se">{s.explain}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* messages */}
            <div className="card">
              <h3>Messages <span className="cnt">· {demo.messages.length}</span></h3>
              <div className="thread">
                {demo.messages.map((m) => (
                  <div className={`msg2 ${m.from === "You" ? "you" : ""}`} key={m.id}>
                    <span className="ma">{m.from === "You" ? "🙂" : "🪟"}</span>
                    <div className="mb">
                      <div className="mt">{m.body}</div>
                      <div className="mw">{m.from} · {m.at}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="reply">
                <input
                  type="text" placeholder="Write a message to your Project Coordinator…"
                  value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Message"
                />
                <button type="button" onClick={() => setDraft("")}>Send</button>
              </div>
            </div>

            {/* files */}
            <div className="card">
              <h3>Files <span className="cnt">· {demo.files.length}</span></h3>
              {demo.files.map((f) => (
                <div className="frow2" key={f.id}>
                  <span className="fi">{f.role === "Delivered" ? "⬇️" : "📄"}</span>
                  <div className="fm">
                    <div className="fn2">{f.name} <span className="ftag">{f.role}</span></div>
                    <div className="fs2">{f.size} · uploaded {f.uploadedAt} by {f.by}</div>
                  </div>
                  <button type="button" className="fa">{f.role === "Delivered" ? "Download" : "Replace"}</button>
                </div>
              ))}
              <div className="fupload">+ Upload an additional document</div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="col">
            {/* coordinator */}
            <div className="card">
              <h3>Your Project Coordinator</h3>
              <div className="coord">
                <span className="cav">🪟</span>
                <div className="cm">
                  <div className="cn">Project Coordinator</div>
                  <div className="cr">Translation Windows</div>
                </div>
              </div>
              <p className="chours">
                <b>Project Review Hours</b><br />
                Monday – Friday · 8:00 AM – 6:00 PM Central Time
              </p>
              <div className="cacts">
                <a className="pri" href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Project ${p.ref}`)}`}>Email</a>
                <a href={`tel:${siteConfig.phone}`}>Call</a>
              </div>
            </div>

            {/* overview */}
            <div className="card">
              <h3>Project overview</h3>
              <div className="srow2"><b>Service</b><span>{p.service}</span></div>
              <div className="srow2"><b>Languages</b><span>{p.pair}</span></div>
              <div className="srow2"><b>Purpose</b><span>{p.purpose}</span></div>
              <div className="srow2"><b>Certification</b><span>{p.certification}</span></div>
              <div className="srow2"><b>Deadline</b><span>{p.deadline}</span></div>
              <div className="srow2"><b>Quotation</b><span>{p.quotation.amount} · {p.quotation.status}</span></div>
            </div>

            {/* notifications */}
            <div className="card">
              <h3>Notifications</h3>
              {demo.notifications.map((n) => (
                <div className="arow" key={n.id}>
                  <span className="ad">{n.icon}</span>
                  <span className="at">{n.text}</span>
                  <span className="aw">{n.at}</span>
                </div>
              ))}
            </div>

            {/* activity */}
            <div className="card">
              <h3>Recent activity</h3>
              {demo.activity.map((a) => (
                <div className="arow" key={a.id}>
                  <span className="ad">{a.icon}</span>
                  <span className="at">{a.text}</span>
                  <span className="aw">{a.at}</span>
                </div>
              ))}
            </div>

            {/* history + repeat */}
            <div className="card">
              <h3>Previous projects <span className="cnt">· {demo.history.length}</span></h3>
              {demo.history.map((h) => (
                <div className="hrow" key={h.id}>
                  <div>
                    <div className="ht">{h.title}</div>
                    <div className="hm">{h.ref} · {h.pair} · delivered {h.completed}{h.certificate ? " · certificate issued" : ""}</div>
                  </div>
                  <button type="button" className="hb">Repeat</button>
                </div>
              ))}
              <p className="repeat">
                <b>Repeat projects are quicker.</b> Your language pair, contact details and approved
                terminology carry across, so a returning project needs only your new documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
