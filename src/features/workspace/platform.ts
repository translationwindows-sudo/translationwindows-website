/**
 * Customer platform model.
 *
 * NOTE ON DATA: everything exported from `demo` below is illustrative content
 * used to design and review the platform experience. No customer data is
 * stored or retrieved — the platform has no backend yet. Phase 1C replaces
 * `demo` with real records from the PHP/MySQL CRM without changing the
 * component tree.
 */

export type StageKey =
  | "received" | "review" | "quotation" | "approval"
  | "translation" | "quality" | "verification" | "ready" | "delivered";

export interface Stage {
  key: StageKey;
  label: string;
  /** what is actually happening, in the customer's language */
  explain: string;
}

export const STAGES: Stage[] = [
  { key: "received",     label: "Project Received",      explain: "Your documents have arrived and your project has been logged." },
  { key: "review",       label: "Document Review",       explain: "Your Project Coordinator is reading the documents to confirm scope and requirements." },
  { key: "quotation",    label: "Quotation Preparation", explain: "We are calculating word count, turnaround and any certification needed." },
  { key: "approval",     label: "Awaiting Approval",     explain: "Your quotation has been sent. Work begins as soon as you approve it." },
  { key: "translation",  label: "Translation",           explain: "A native professional linguist is translating your documents." },
  { key: "quality",      label: "Quality Review",        explain: "A second senior linguist is reviewing the translation line by line." },
  { key: "verification", label: "Final Verification",    explain: "We are checking formatting, names, dates and certification details." },
  { key: "ready",        label: "Ready for Delivery",    explain: "Your translation is complete and being prepared for secure delivery." },
  { key: "delivered",    label: "Delivered",             explain: "Your files are available to download from this workspace." },
];

export function stageIndex(k: StageKey) { return STAGES.findIndex((s) => s.key === k); }

export interface PlatformFile {
  id: string; name: string; size: string; role: "Source" | "Reference" | "Delivered";
  uploadedAt: string; by: "You" | "Translation Windows";
}
export interface Message {
  id: string; from: "You" | "Project Coordinator"; at: string; body: string;
}
export interface ActivityItem { id: string; at: string; text: string; icon: string }
export interface PastProject {
  id: string; ref: string; title: string; pair: string; completed: string; certificate: boolean;
}

/** Illustrative content for design review only — not customer data. */
export const demo = {
  project: {
    ref: "TW-4F82C1",
    title: "Birth certificate — certified translation",
    service: "Certified Translation",
    pair: "Spanish → English",
    purpose: "USCIS immigration application",
    certification: "Certified with signed Certificate of Accuracy",
    deadline: "Within a week",
    stage: "quality" as StageKey,
    quotation: { status: "Approved", amount: "$74.00", sentAt: "24 Jul, 10:12", approvedAt: "24 Jul, 11:40" },
  },
  files: [
    { id: "f1", name: "birth-certificate.pdf",       size: "1.2 MB",  role: "Source",    uploadedAt: "24 Jul, 09:58", by: "You" },
    { id: "f2", name: "passport-page.jpg",            size: "840 KB",  role: "Reference", uploadedAt: "24 Jul, 09:59", by: "You" },
    { id: "f3", name: "name-spellings.txt",           size: "2 KB",    role: "Reference", uploadedAt: "24 Jul, 14:20", by: "You" },
  ] as PlatformFile[],
  messages: [
    { id: "m1", from: "Project Coordinator", at: "24 Jul, 10:05", body: "Thank you — your documents have been received and I have started the review. I will have your quotation shortly." },
    { id: "m2", from: "Project Coordinator", at: "24 Jul, 10:12", body: "Your quotation is ready and has been sent to your email. Please confirm the spelling of the surname as it appears on your passport so the translation matches your application." },
    { id: "m3", from: "You",                 at: "24 Jul, 14:18", body: "Confirmed — the passport spelling is correct. I have uploaded a note with the exact spellings." },
    { id: "m4", from: "Project Coordinator", at: "24 Jul, 14:31", body: "Received, thank you. Translation is underway and will move to quality review tomorrow morning." },
  ] as Message[],
  activity: [
    { id: "a1", at: "25 Jul, 09:14", text: "Quality review started",             icon: "🔍" },
    { id: "a2", at: "24 Jul, 15:02", text: "Translation started",                icon: "🗣️" },
    { id: "a3", at: "24 Jul, 14:20", text: "name-spellings.txt uploaded",        icon: "📄" },
    { id: "a4", at: "24 Jul, 11:40", text: "Quotation approved",                 icon: "✅" },
    { id: "a5", at: "24 Jul, 10:12", text: "Quotation sent",                     icon: "🧾" },
    { id: "a6", at: "24 Jul, 09:58", text: "Project received",                   icon: "📥" },
  ] as ActivityItem[],
  notifications: [
    { id: "n1", at: "25 Jul, 09:14", text: "Quality review has begun on TW-4F82C1", icon: "🔍" },
    { id: "n2", at: "24 Jul, 11:40", text: "Your quotation was approved",           icon: "✅" },
    { id: "n3", at: "24 Jul, 10:12", text: "Your quotation is ready",               icon: "🧾" },
  ] as ActivityItem[],
  history: [
    { id: "h1", ref: "TW-3B19A7", title: "Marriage certificate", pair: "Spanish → English", completed: "12 Mar 2026", certificate: true },
    { id: "h2", ref: "TW-2C88E4", title: "Academic transcript",  pair: "Spanish → English", completed: "04 Nov 2025", certificate: true },
    { id: "h3", ref: "TW-1A47F0", title: "Employment letter",    pair: "English → Spanish", completed: "19 Aug 2025", certificate: false },
  ] as PastProject[],
};
