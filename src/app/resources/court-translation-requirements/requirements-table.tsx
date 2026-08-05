"use client";

import { useState } from "react";

import { LAST_REVIEWED, REQUIREMENTS, type Requirement } from "./requirements-data";

/**
 * Filterable reference table.
 *
 * Built so a paralegal checking a filing can find the relevant row in
 * seconds. Every row states what to verify and where, because this is a
 * starting point for a check rather than a substitute for one.
 */

const CERT_LABEL: Record<Requirement["certification"], [string, string]> = {
  required: ["req", "Required"],
  usually:  ["usu", "Usually required"],
  varies:   ["var", "Varies"],
};

const NOT_LABEL: Record<Requirement["notarization"], [string, string]> = {
  required:  ["req", "Required"],
  sometimes: ["usu", "Sometimes"],
  rarely:    ["rare", "Rarely"],
  varies:    ["var", "Varies"],
};

export function RequirementsTable() {
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const shown = REQUIREMENTS.filter((r) => {
    if (query.trim() === "") return true;
    const q = query.toLowerCase();
    return (
      r.court.toLowerCase().includes(q) ||
      r.scope.toLowerCase().includes(q) ||
      r.filingNotes.toLowerCase().includes(q)
    );
  });

  return (
    <div className="req">
      <div className="req-search">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by court, document type or keyword…"
          aria-label="Search requirements"
        />
        <span className="req-count">
          {shown.length} of {REQUIREMENTS.length}
        </span>
      </div>

      <div className="req-list">
        {shown.map((r) => {
          const [certCls, certText] = CERT_LABEL[r.certification];
          const [notCls, notText] = NOT_LABEL[r.notarization];
          const isOpen = open === r.id;

          return (
            <div className={`req-row ${isOpen ? "on" : ""}`} key={r.id}>
              <button
                type="button"
                className="req-head"
                onClick={() => setOpen(isOpen ? null : r.id)}
                aria-expanded={isOpen}
              >
                <span className="req-court">
                  <span className="req-name">{r.court}</span>
                  <span className="req-scope">{r.scope}</span>
                </span>
                <span className="req-tags">
                  <span className={`req-tag ${certCls}`}>Certification: {certText}</span>
                  <span className={`req-tag ${notCls}`}>Notarization: {notText}</span>
                </span>
                <span className="req-chev" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="req-body">
                  <div className="req-field">
                    <p className="req-k">Who may translate</p>
                    <p className="req-v">{r.translatorQualification}</p>
                  </div>
                  <div className="req-field">
                    <p className="req-k">Filing notes</p>
                    <p className="req-v">{r.filingNotes}</p>
                  </div>
                  <div className="req-field">
                    <p className="req-k">Verify against</p>
                    <p className="req-v req-cite">{r.verifyAt}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {shown.length === 0 && (
          <p className="req-empty">
            Nothing matches that. Try a court name, a document type, or clear the search.
          </p>
        )}
      </div>

      <p className="req-updated">Last reviewed {LAST_REVIEWED}</p>
    </div>
  );
}
