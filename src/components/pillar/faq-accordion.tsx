"use client";

import { useState } from "react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="pw-faq">
      {items.map((it, i) => (
        <div className={`pw-faq-item ${open === i ? "open" : ""}`} key={it.q}>
          <button
            type="button" className="q"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            {it.q} <span className="x">+</span>
          </button>
          <div className="a"><p>{it.a}</p></div>
        </div>
      ))}
    </div>
  );
}
