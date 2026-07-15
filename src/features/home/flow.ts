/**
 * Guided intake — the interview script.
 *
 * The assistant drives: one question at a time, each answer unlocking the
 * next. The upload step is placed deliberately AFTER we know what the
 * project is, so we only ask for documents once we've earned the right to.
 */

export type StepKind = "options" | "select" | "text" | "upload" | "review";

export type StepGroup = "Project" | "Language" | "Requirements" | "Documents" | "Contact" | "Review";

export interface Step {
  id: string;
  kind: StepKind;
  /** what the coordinator asks */
  q: string;
  /** short lead-in the coordinator says before the question */
  lead?: string;
  options?: string[];
  placeholder?: string;
  inputType?: "text" | "email" | "tel" | "url";
  optional?: boolean;
  group: StepGroup;
}

const LANGS = [
  "Spanish", "English", "Chinese", "Arabic", "French", "Portuguese",
  "Vietnamese", "Russian", "Ukrainian", "German", "Japanese", "Korean",
  "Hindi", "Urdu", "Farsi", "Turkish", "Italian", "Other",
];

/* ── reusable steps ── */
const src = (): Step => ({
  id: "source", kind: "select", group: "Language",
  lead: "Great — I'll help prepare your quotation.",
  q: "What language is the original document in?", options: LANGS,
});
const tgt = (): Step => ({
  id: "target", kind: "select", group: "Language",
  lead: "Perfect.",
  q: "And which language do you need it translated into?", options: LANGS,
});
const deadline = (): Step => ({
  id: "deadline", kind: "options", group: "Requirements",
  q: "When do you need it?", options: ["As soon as possible", "Within a week", "Flexible"],
});
const upload = (): Step => ({
  id: "files", kind: "upload", group: "Documents",
  lead: "Excellent — that's everything I need to know about the work.",
  q: "Please upload your documents so we can prepare an accurate quotation.",
});
const contactName = (): Step => ({
  id: "name", kind: "text", group: "Contact",
  lead: "Almost done.", q: "Who should we address the quotation to?", placeholder: "Full name",
});
const contactEmail = (): Step => ({
  id: "email", kind: "text", group: "Contact",
  q: "What email should we send it to?", placeholder: "you@email.com", inputType: "email",
});
const contactPhone = (): Step => ({
  id: "phone", kind: "text", group: "Contact",
  q: "A phone number, in case we need to reach you quickly?", placeholder: "Optional", inputType: "tel", optional: true,
});
const review = (): Step => ({
  id: "review", kind: "review", group: "Review",
  lead: "That's everything.", q: "Here's your project — ready to create?",
});

/** Documents → contact → review tail, shared by every branch. */
function tail(): Step[] {
  return [upload(), contactName(), contactEmail(), contactPhone(), review()];
}

export const FLOWS: Record<string, Step[]> = {
  "Legal contract": [
    src(), tgt(),
    { id: "purpose", kind: "options", group: "Requirements", q: "What is the translation for?", options: ["Court filing", "Business use", "Personal reference", "Other"] },
    { id: "cert", kind: "options", group: "Requirements", q: "Will you need a certified translation?", options: ["Yes, certified", "No, for reference"] },
    { id: "formatting", kind: "options", group: "Requirements", q: "Should we reproduce the original formatting?", options: ["Yes, keep layout", "Plain text is fine"] },
    deadline(), ...tail(),
  ],
  "USCIS / immigration": [
    { id: "doctype", kind: "options", group: "Project", lead: "Happy to help with that.", q: "Which document is it?", options: ["Birth certificate", "Marriage certificate", "Diploma / transcript", "Police record", "Other"] },
    src(), tgt(),
    { id: "purpose", kind: "options", group: "Requirements", q: "Is this for:", options: ["USCIS", "Court", "University", "Personal use"] },
    { id: "cert", kind: "options", group: "Requirements", q: "Certified translation is included. Would you like notarization as well?", options: ["Certified only", "Certified + notarized"] },
    { id: "pages", kind: "options", group: "Requirements", q: "Roughly how many pages?", options: ["1 page", "2–5 pages", "6+ pages"] },
    deadline(), ...tail(),
  ],
  "Medical document": [
    src(), tgt(),
    { id: "purpose", kind: "options", group: "Requirements", q: "What is it for?", options: ["Hospital / clinic", "Insurance", "Legal case", "Personal use"] },
    { id: "cert", kind: "options", group: "Requirements", q: "Do you need a certified translation?", options: ["Yes, certified", "No"] },
    deadline(), ...tail(),
  ],
  "Subtitles / video": [
    src(), tgt(),
    { id: "length", kind: "text", group: "Project", q: "How long is the video, in minutes?", placeholder: "e.g. 12" },
    { id: "transcript", kind: "options", group: "Project", q: "Do you already have a transcript?", options: ["Yes", "No"] },
    { id: "format", kind: "options", group: "Requirements", q: "Which subtitle format do you need?", options: ["SRT / VTT file", "Burned into video", "Not sure"] },
    deadline(), ...tail(),
  ],
  "Website / software": [
    { id: "url", kind: "text", group: "Project", lead: "Good — let's scope it.", q: "What's the website or app address?", placeholder: "https://", inputType: "url", optional: true },
    { id: "target", kind: "select", group: "Language", q: "Which language do you need it in? (pick the main one)", options: LANGS },
    { id: "pages", kind: "options", group: "Project", q: "Roughly how many pages or screens?", options: ["Under 10", "10–50", "50+", "Not sure"] },
    { id: "seo", kind: "options", group: "Requirements", q: "Should we localize your SEO as well?", options: ["Yes", "No", "Not sure"] },
    deadline(), ...tail(),
  ],
  "Spanish interpreter": [
    { id: "mode", kind: "options", group: "Project", lead: "We provide Spanish interpreting.", q: "Remote or on-site?", options: ["Remote", "On-site"] },
    { id: "setting", kind: "options", group: "Project", q: "What's the setting?", options: ["Legal", "Medical", "Business", "Other"] },
    deadline(), ...tail(),
  ],
  "Something else": [
    src(), tgt(), deadline(), ...tail(),
  ],
};

/** The interview always opens here. */
export const TYPE_STEP: Step = {
  id: "type", kind: "options", group: "Project",
  q: "What are you translating?",
  options: Object.keys(FLOWS),
};

export const GROUP_ORDER: StepGroup[] = ["Project", "Language", "Requirements", "Documents", "Contact", "Review"];

export const FIELD_LABELS: Record<string, string> = {
  type: "Project", doctype: "Document", source: "From", target: "To",
  purpose: "Purpose", cert: "Certification", formatting: "Formatting",
  pages: "Size", printed: "Delivery", deadline: "Deadline",
  length: "Video length", transcript: "Transcript", format: "Subtitle format",
  url: "Website", seo: "SEO", mode: "Mode", setting: "Setting",
  name: "Name", email: "Email", phone: "Phone", files: "Documents",
};

/** Customer-facing service name, derived from the project type. */
export const SERVICE_LABEL: Record<string, string> = {
  "Legal contract": "Legal Translation",
  "USCIS / immigration": "Certified Translation",
  "Medical document": "Medical Translation",
  "Subtitles / video": "Subtitling",
  "Website / software": "Localization",
  "Spanish interpreter": "Spanish Interpretation",
  "Something else": "Translation",
};

/** Rough turnaround shown live in the summary panel. */
export const TURNAROUND: Record<string, string> = {
  "Legal contract": "2–3 business days",
  "USCIS / immigration": "1–2 business days",
  "Medical document": "2–3 business days",
  "Subtitles / video": "2–4 business days",
  "Website / software": "Scoped per project",
  "Spanish interpreter": "Confirmed on booking",
  "Something else": "1–3 business days",
};
