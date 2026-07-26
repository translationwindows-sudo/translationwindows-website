/**
 * Customer-facing email templates.
 *
 * These are the approved wordings for Translation Windows transactional email.
 * They are stored here so the Phase 1C backend (Vercel route → PHP API →
 * PHPMailer over Titan SMTP) sends exactly this copy, without it being
 * rewritten at implementation time.
 *
 * Not yet wired: no email is sent from the site today.
 */

export interface ProjectEmailData {
  reference: string;
  customerName?: string;
  trackingUrl?: string;
}

/** Sent to the customer immediately after a project is created. */
export function customerConfirmationEmail(data: ProjectEmailData) {
  const greeting = data.customerName ? `Dear ${data.customerName},` : "Hello,";
  return {
    subject: "We've received your translation project",
    body: [
      greeting,
      "",
      "Thank you for choosing Translation Windows.",
      "",
      "Your documents have been received successfully and are now being reviewed by our Project Coordinator.",
      "",
      "Our team will examine your files, prepare an accurate quotation, and contact you if additional information is required.",
      "",
      "Most quotation requests are reviewed within 30–60 minutes during business hours. Larger or more complex projects may require additional review time.",
      "",
      `Your project reference is ${data.reference}.`,
      data.trackingUrl ? `You can monitor your project status anytime from your Project Workspace: ${data.trackingUrl}` : "You can monitor your project status anytime from your Project Workspace.",
      "",
      "Thank you for choosing Translation Windows.",
      "",
      "Translation Windows",
      "Transinformatic LLC · Houston, Texas",
    ].join("\n"),
  };
}

/** Sent internally to the team when a project is created. */
export function internalNotificationEmail(data: ProjectEmailData & {
  email?: string; phone?: string; service?: string;
  sourceLang?: string; targetLang?: string; deadline?: string; fileCount?: number;
}) {
  return {
    subject: `New project ${data.reference} — ${data.service ?? "Translation"}`,
    body: [
      `New project created: ${data.reference}`,
      "",
      `Customer:   ${data.customerName ?? "—"}`,
      `Email:      ${data.email ?? "—"}`,
      `Phone:      ${data.phone ?? "—"}`,
      `Service:    ${data.service ?? "—"}`,
      `Languages:  ${data.sourceLang ?? "—"} → ${data.targetLang ?? "—"}`,
      `Deadline:   ${data.deadline ?? "—"}`,
      `Files:      ${data.fileCount ?? 0} uploaded`,
      "",
      "Review the documents and prepare the quotation in the CRM.",
    ].join("\n"),
  };
}
