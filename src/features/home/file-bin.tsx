"use client";

import { useRef, useState } from "react";

import { fmtSize, relTime, validateFile, type FileRole, type ProjectFile } from "./project";

/**
 * One categorized upload bin (documents / supporting / glossary / style).
 * Add (click/drag), remove, replace. Shows filename, size, date, status.
 * The "Add another" affordance is always present — never hidden.
 */
export function FileBin({
  role, label, hint, icon, files, onAdd, onRemove, onReplace, onError,
}: {
  role: FileRole;
  label: string;
  hint: string;
  icon: string;
  files: ProjectFile[];
  onAdd: (role: FileRole, list: FileList) => void;
  onRemove: (id: string) => void;
  onReplace: (id: string, list: FileList) => void;
  onError: (msg: string) => void;
}) {
  const [over, setOver] = useState(false);
  const addRef = useRef<HTMLInputElement | null>(null);
  const replaceRef = useRef<HTMLInputElement | null>(null);
  const replacingId = useRef<string | null>(null);

  const guard = (list: FileList | null): FileList | null => {
    if (!list || list.length === 0) return null;
    for (const f of Array.from(list)) {
      const err = validateFile(f);
      if (err) { onError(err); return null; }
    }
    return list;
  };

  return (
    <div className="filebin">
      <h4>
        <span>{icon}</span> {label}
        {files.length > 0 && <span className="cnt">· {files.length}</span>}
      </h4>

      {files.map((f) => (
        <div className="frow" key={f.id}>
          <div className="ic">{icon}</div>
          <div className="m">
            <div className="fn">{f.name}</div>
            <div className="fs">
              {fmtSize(f.size)} · added {relTime(f.uploadedAt)} · <span className="fstat">{f.status === "received" ? "received ✓" : "uploaded ✓"}</span>
            </div>
          </div>
          <div className="acts">
            <button type="button" onClick={() => { replacingId.current = f.id; replaceRef.current?.click(); }}>Replace</button>
            <button type="button" onClick={() => onRemove(f.id)}>Remove</button>
          </div>
        </div>
      ))}

      <div
        className={`fdrop ${over ? "over" : ""}`}
        role="button"
        tabIndex={0}
        aria-label={`Add ${label}`}
        onClick={() => addRef.current?.click()}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); addRef.current?.click(); } }}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={(e) => { e.preventDefault(); setOver(false); }}
        onDrop={(e) => { e.preventDefault(); setOver(false); const l = guard(e.dataTransfer.files); if (l) onAdd(role, l); }}
      >
        <span className="plus">+</span> Add {files.length > 0 ? "another" : "document"} <span style={{ opacity: 0.6 }}>· {hint}</span>
      </div>

      <input ref={addRef} type="file" multiple hidden onChange={(e) => { const l = guard(e.target.files); if (l) onAdd(role, l); e.target.value = ""; }} />
      <input ref={replaceRef} type="file" hidden onChange={(e) => { const l = guard(e.target.files); if (l && replacingId.current) onReplace(replacingId.current, l); replacingId.current = null; e.target.value = ""; }} />
    </div>
  );
}
