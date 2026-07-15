"use client";

import { useMemo, useState } from "react";

export function LanguageDirectory({ languages }: { languages: { name: string; native: string; region: string }[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return languages;
    return languages.filter((l) => l.name.toLowerCase().includes(term) || l.native.toLowerCase().includes(term) || l.region.toLowerCase().includes(term));
  }, [q, languages]);

  return (
    <div>
      <div className="pw-search">
        <span className="si" aria-hidden>🔍</span>
        <input
          type="text" placeholder="Search 230+ languages…" value={q}
          onChange={(e) => setQ(e.target.value)} aria-label="Search languages"
        />
      </div>
      <p style={{ fontSize: ".84rem", color: "var(--char-soft)", marginBottom: 18 }}>
        {filtered.length} of {languages.length}+ shown — every pair we list translates to and from English.
      </p>
      <div className="pw-lang-grid">
        {filtered.map((l) => (
          <div className="pw-lang-chip" key={l.name}>
            <b>{l.name}</b>
            <span>{l.native} · {l.region}</span>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <p style={{ color: "var(--char-soft)" }}>No match — additional language pairs may be available upon request.</p>}
    </div>
  );
}
