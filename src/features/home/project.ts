/**
 * Project workspace model — the intake manager's shared types & helpers.
 * A "project" is more than answers: it's files (by role), the questionnaire
 * answers, a lifecycle status, and a reference. Everything here is
 * session-scoped in Phase 1; the shape maps 1:1 onto the Phase 1C CRM
 * tables so persistence is a wiring task, not a redesign.
 */

export type FileRole = "document" | "reference" | "glossary" | "style";

export type FileStatus = "uploaded" | "received";

export interface ProjectFile {
  id: string;
  name: string;
  size: number;
  type: string;
  role: FileRole;
  uploadedAt: number;   // epoch ms
  status: FileStatus;
}

export interface ActivityEvent {
  id: string;
  at: number;           // epoch ms
  text: string;
  icon: string;
}

export type ProjectStatus =
  | "draft"          // being built by the customer
  | "submitted"      // sent for review
  | "reviewing"      // staff reviewing documents
  | "quote_ready";   // quotation prepared (editing locks here)

export const FILE_BINS: { role: FileRole; label: string; hint: string; icon: string }[] = [
  { role: "document",  label: "Documents to Translate", hint: "The files that need translating", icon: "📄" },
  { role: "reference", label: "Supporting Documents",    hint: "Prior translations, context, examples", icon: "📎" },
  { role: "glossary",  label: "Glossary / Terminology",  hint: "Approved terms we should follow", icon: "📘" },
  { role: "style",     label: "Style Guide",             hint: "Tone, formatting or brand rules", icon: "🎨" },
];

/** Compact relative time for the activity feed & file dates. */
export function relTime(then: number): string {
  const s = Math.max(1, Math.round((Date.now() - then) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr ago`;
  return new Date(then).toLocaleDateString();
}

export const STATUS_STAGES: { key: ProjectStatus; label: string }[] = [
  { key: "draft",       label: "Building" },
  { key: "submitted",   label: "Submitted" },
  { key: "reviewing",   label: "Under review" },
  { key: "quote_ready", label: "Quote ready" },
];

export function newRef(): string {
  return `TW-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

export function fmtSize(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export const ACCEPT = [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".doc", ".docx", ".txt", ".srt", ".vtt", ".xlsx", ".csv", ".tbx"];
const BLOCK = [".exe", ".bat", ".cmd", ".sh", ".msi", ".js", ".jar", ".app", ".scr", ".com"];
const MAX_BYTES = 25 * 1024 * 1024;

export function validateFile(f: File): string | null {
  const lower = f.name.toLowerCase();
  if (BLOCK.some((e) => lower.endsWith(e))) return "That file type is not allowed for security reasons.";
  if (!ACCEPT.some((e) => lower.endsWith(e))) return `Unsupported type. Allowed: ${ACCEPT.join(", ")}`;
  if (f.size > MAX_BYTES) return `That file is ${fmtSize(f.size)} — the limit is 25 MB.`;
  return null;
}
