/**
 * Guided-assistant flow definition.
 * A lightweight, declarative step machine: each project type maps to an
 * ordered list of steps. The component walks these one at a time, keeps
 * answers keyed by step id, and derives the visible history + active step
 * from that state. Backend wiring (CRM/email) plugs into onSubmit later.
 */

export type StepKind = "options" | "select" | "text" | "review";

export interface Step {
  id: string;
  kind: StepKind;
  /** assistant question text */
  q: string;
  /** acknowledgement shown once answered (may use the answer via {v}) */
  ack?: string;
  /** for options/select */
  options?: string[];
  /** for text */
  placeholder?: string;
  inputType?: "text" | "email" | "tel" | "url";
  optional?: boolean;
  /** progress bucket this step belongs to */
  group: "Project" | "Language" | "Requirements" | "Contact" | "Review";
}

const LANGS = [
  "Spanish", "English", "Chinese", "Arabic", "French", "Portuguese",
  "Vietnamese", "Russian", "Ukrainian", "German", "Japanese", "Korean",
  "Hindi", "Urdu", "Farsi", "Turkish", "Italian", "Other",
];

const src = (): Step => ({
  id: "source", kind: "select", group: "Language",
  q: "What language is it currently in?", options: LANGS,
  ack: "From {v}.",
});
const tgt = (): Step => ({
  id: "target", kind: "select", group: "Language",
  q: "And which language do you need?", options: LANGS,
  ack: "Into {v}.",
});
const deadline = (): Step => ({
  id: "deadline", kind: "options", group: "Requirements",
  q: "When do you need it?", options: ["As soon as possible", "Within a week", "Flexible"],
});
const contactName = (): Step => ({ id: "name", kind: "text", group: "Contact", q: "What should we call you?", placeholder: "Full name" });
const contactEmail = (): Step => ({ id: "email", kind: "text", group: "Contact", q: "Your email address?", placeholder: "you@email.com", inputType: "email" });
const contactPhone = (): Step => ({ id: "phone", kind: "text", group: "Contact", q: "A phone number? (optional)", placeholder: "Optional", inputType: "tel", optional: true });
const review = (): Step => ({ id: "review", kind: "review", group: "Review", q: "Review your request." });

/** Steps common to translation-type flows, after the type-specific ones. */
function contactAndReview(): Step[] {
  return [contactName(), contactEmail(), contactPhone(), review()];
}

/** Type-specific branches. Keyed by the project-type answer. */
export const FLOWS: Record<string, Step[]> = {
  "Legal contract": [
    src(), tgt(),
    { id: "cert", kind: "options", group: "Requirements", q: "Do you need certification for a court or legal filing?", options: ["Yes, certified", "No, for reference"] },
    { id: "formatting", kind: "options", group: "Requirements", q: "Should we preserve the original formatting?", options: ["Yes, keep layout", "Plain text is fine"] },
    deadline(), ...contactAndReview(),
  ],
  "USCIS / immigration": [
    { id: "doctype", kind: "options", group: "Project", q: "Which document is it?", options: ["Birth certificate", "Marriage certificate", "Diploma / transcript", "Police record", "Other"] },
    src(), tgt(),
    { id: "cert", kind: "options", group: "Requirements", q: "USCIS requires certified translation — included. Add notarization?", options: ["Certified only", "Certified + notarized"] },
    { id: "pages", kind: "options", group: "Requirements", q: "Roughly how many pages?", options: ["1 page", "2–5 pages", "6+ pages"] },
    { id: "printed", kind: "options", group: "Requirements", q: "Do you need a printed hard copy mailed?", options: ["Digital is fine", "Mail a printed copy"] },
    deadline(), ...contactAndReview(),
  ],
  "Medical document": [
    src(), tgt(),
    { id: "cert", kind: "options", group: "Requirements", q: "Do you need a certified translation?", options: ["Yes, certified", "No"] },
    deadline(), ...contactAndReview(),
  ],
  "Subtitles / video": [
    src(), tgt(),
    { id: "length", kind: "text", group: "Project", q: "How long is the video? (minutes)", placeholder: "e.g. 12", inputType: "text" },
    { id: "transcript", kind: "options", group: "Project", q: "Do you already have a transcript?", options: ["Yes", "No"] },
    { id: "format", kind: "options", group: "Requirements", q: "Preferred subtitle format?", options: ["SRT / VTT file", "Burned into video", "Not sure"] },
    deadline(), ...contactAndReview(),
  ],
  "Website / software": [
    { id: "url", kind: "text", group: "Project", q: "What's the website or app URL?", placeholder: "https://", inputType: "url", optional: true },
    { id: "target", kind: "select", group: "Language", q: "Which language(s) do you need? (pick the main one)", options: LANGS, ack: "Into {v}." },
    { id: "pages", kind: "options", group: "Project", q: "Roughly how many pages or screens?", options: ["Under 10", "10–50", "50+", "Not sure"] },
    { id: "seo", kind: "options", group: "Requirements", q: "Do you need SEO localization?", options: ["Yes", "No", "Not sure"] },
    deadline(), ...contactAndReview(),
  ],
  "Spanish interpreter": [
    { id: "mode", kind: "options", group: "Project", q: "Remote or on-site?", options: ["Remote", "On-site"] },
    { id: "setting", kind: "options", group: "Project", q: "What's the setting?", options: ["Legal", "Medical", "Business", "Other"] },
    deadline(), ...contactAndReview(),
  ],
  "Something else": [
    src(), tgt(), deadline(), ...contactAndReview(),
  ],
};

/** First question is always the project type. */
export const TYPE_STEP: Step = {
  id: "type", kind: "options", group: "Project",
  q: "What are you translating?",
  options: Object.keys(FLOWS),
};

export const GROUP_ORDER: Step["group"][] = ["Project", "Language", "Requirements", "Contact", "Review"];

/** Human labels for the review summary. */
export const FIELD_LABELS: Record<string, string> = {
  type: "Project", doctype: "Document", source: "From", target: "To",
  cert: "Certification", formatting: "Formatting", pages: "Pages",
  printed: "Delivery", deadline: "Deadline", length: "Video length",
  transcript: "Transcript", format: "Subtitle format", url: "URL",
  seo: "SEO", mode: "Mode", setting: "Setting",
  name: "Name", email: "Email", phone: "Phone",
};
