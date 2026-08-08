"use client";

import { useState } from "react";

import { LAST_REVIEWED, SYSTEMS } from "./grading-data";

/**
 * Grading system browser.
 *
 * Deliberately offers no GPA conversion. Someone holding an unfamiliar
 * transcript needs to know what the scale means and where its pass mark
 * sits — the equivalence judgement is theirs to make, or an evaluator's.
 */
export function GradingTable() {
  const [open, setOpen] = useState<string | null>(SYSTEMS[0]?.id ?? null);
  const [query, setQuery] = useState("");

  const shown = SYSTEMS.filter((s) =>
    query.trim() === "" ? true : s.country.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="req">
      <div className="req-search">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by country…"
          aria-label="Search grading systems"
        />
        <span className="req-count">{shown.length} of {SYSTEMS.length}</span>
      </div>

      <div className="req-list">
        {shown.map((s) => {
          const isOpen = open === s.id;
          return (
            <div className={`req-row ${isOpen ? "on" : ""}`} key={s.id}>
              <button
                type="button"
                className="req-head"
                onClick={() => setOpen(isOpen ? null : s.id)}
                aria-expanded={isOpen}
              >
                <span className="req-court">
                  <span className="req-name">{s.country}</span>
                  <span className="req-scope">Scale {s.scale}</span>
                </span>
                <span className="req-tags">
                  {s.direction === "low-good" && (
                    <span className="req-tag req">Lower is better</span>
                  )}
                  <span className="req-tag var">Pass at {s.passMark}</span>
                  {s.caution && <span className="req-tag usu">Common misreading</span>}
                </span>
                <span className="req-chev" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="req-body">
                  <div className="gs-bands">
                    {s.bands.map((b) => (
                      <div className="gs-band" key={b.grade}>
                        <span className="gs-g">{b.grade}</span>
                        <span className="gs-m">{b.meaning}</span>
                      </div>
                    ))}
                  </div>
                  <div className="req-field">
                    <p className="req-k">Reading it</p>
                    <p className="req-v">{s.notes}</p>
                  </div>
                  {s.caution && (
                    <div className="req-field gs-caution">
                      <p className="req-k">Frequently misread</p>
                      <p className="req-v">{s.caution}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {shown.length === 0 && (
          <p className="req-empty">No system listed for that country yet.</p>
        )}
      </div>

      <p className="req-updated">Last reviewed {LAST_REVIEWED}</p>
    </div>
  );
}
