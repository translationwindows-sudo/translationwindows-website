"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";

import "./track.css";

interface ProjectStatus {
  reference: string;
  submitted: string;
  status: string;
  service: string | null;
  languages: string | null;
  purpose: string | null;
  certification: string | null;
  deadline: string | null;
  expectedCompletion: string | null;
  fileCount: number;
  nextUpdate: string | null;
  reviewHours: string;
}

/** The four operational stages Phase 1C can report. */
const STAGES = ["Project Received", "Files Verified", "Under Review", "Quotation"];

export function TrackView({ token }: { token: string }) {
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [project, setProject] = useState<ProjectStatus | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/track?token=${encodeURIComponent(token)}`, { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (cancelled) return;

        if (res.ok && data?.ok && data.project) {
          setProject(data.project);
          setState("ok");
        } else {
          setMessage(
            (data && typeof data.error === "string")
              ? data.error
              : "We could not find that project."
          );
          setState("error");
        }
      } catch {
        if (!cancelled) {
          setMessage("We could not load your project just now. Please try again shortly.");
          setState("error");
        }
      }
    })();

    return () => { cancelled = true; };
  }, [token]);

  if (state === "loading") {
    return (
      <div className="tv">
        <div className="tv-card tv-center">
          <p className="tv-muted">Loading your project…</p>
        </div>
      </div>
    );
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

  const currentIndex = STAGES.indexOf(project.status);

  return (
    <div className="tv">
      <div className="tv-head">
        <p className="tv-k">Project status</p>
        <h1 className="tv-h1">{project.reference}</h1>
        <p className="tv-muted">Submitted {project.submitted}</p>
      </div>

      <div className="tv-stages">
        {STAGES.map((label, i) => (
          <div className={`tv-stage ${i < currentIndex ? "done" : ""} ${i === currentIndex ? "cur" : ""}`} key={label}>
            <span className="tv-dot">✓</span>
            <span className="tv-label">{label}</span>
          </div>
        ))}
      </div>

      {project.nextUpdate && (
        <div className="tv-next">
          <p className="tv-next-t">What happens next</p>
          <p className="tv-next-b">{project.nextUpdate}</p>
        </div>
      )}

      <div className="tv-card">
        <h2 className="tv-h2">Project overview</h2>
        <dl className="tv-rows">
          {project.service && <div><dt>Service</dt><dd>{project.service}</dd></div>}
          {project.languages && <div><dt>Languages</dt><dd>{project.languages}</dd></div>}
          {project.purpose && <div><dt>Purpose</dt><dd>{project.purpose}</dd></div>}
          {project.certification && <div><dt>Certification</dt><dd>{project.certification}</dd></div>}
          {project.deadline && <div><dt>Deadline</dt><dd>{project.deadline}</dd></div>}
          <div><dt>Files received</dt><dd>{project.fileCount}</dd></div>
          {project.expectedCompletion && (
            <div><dt>Expected completion</dt><dd>{project.expectedCompletion}</dd></div>
          )}
        </dl>
      </div>

      <div className="tv-card">
        <h2 className="tv-h2">Your Project Coordinator</h2>
        <p className="tv-muted" style={{ marginBottom: 14 }}>{project.reviewHours}</p>
        <div className="tv-acts">
          <a className="tv-btn" href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a className="tv-btn ghost" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Project ${project.reference}`)}`}>Email</a>
          <a className="tv-btn ghost" href={`tel:${siteConfig.phone}`}>Call</a>
        </div>
      </div>
    </div>
  );
}
