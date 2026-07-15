import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Crumb, PwHero } from "@/components/pillar/pillar-parts";
import { siteConfig } from "@/config/site";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "Terms & Conditions — Translation Windows",
  description: "The terms governing use of Translation Windows' website and translation services.",
};

export default function TermsPage() {
  return (
    <div className="pw" id="top">
      <Container>
        <Crumb label="Terms & Conditions" />
        <PwHero eyebrow="Legal" title="Terms & Conditions">
          The terms that govern your use of our website and services.
        </PwHero>
      </Container>
      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0, paddingBottom: 80 }}>
          <div className="pw-legal">
            <p className="updated">Last updated: July 2026</p>

            <h2>1. Acceptance of terms</h2>
            <p>By using this website or engaging {siteConfig.legalName} ({siteConfig.name}) for translation, localization, interpretation, or related services, you agree to these Terms & Conditions.</p>

            <h2>2. Our services</h2>
            <p>We provide certified and standard translation, localization, subtitling, voice-over, desktop publishing, Spanish interpretation, and AI-assisted language services. Specific deliverables, pricing, and turnaround are confirmed in each project&apos;s quotation.</p>

            <h2>3. Quotations and pricing</h2>
            <p>Quotations are prepared based on the documents and information provided. Final pricing may be adjusted if the scope changes once documents are fully reviewed. All quotations are reviewed and approved by a project manager before being sent.</p>

            <h2>4. Client responsibilities</h2>
            <ul>
              <li>Providing accurate project details and complete source documents</li>
              <li>Reviewing and approving quotations before work begins</li>
              <li>Providing timely feedback during revision periods</li>
            </ul>

            <h2>5. Certification</h2>
            <p>Certified translations include a signed Certificate of Accuracy. We are not responsible for a receiving institution&apos;s specific formatting or notarization requirements beyond what was agreed in the project scope — please confirm requirements with the receiving party in advance.</p>

            <h2>6. Confidentiality</h2>
            <p>We treat all client documents as confidential and handle them according to our Privacy Policy. Documents are stored securely and accessible only to your assigned project team.</p>

            <h2>7. Revisions</h2>
            <p>Revision requests related to translation accuracy are accepted within a reasonable period after delivery, as specified in your project confirmation. Revisions due to changes in source content may incur additional charges.</p>

            <h2>8. Payment</h2>
            <p>Payment terms are confirmed at quotation. Work on certified and time-sensitive projects typically begins upon quote approval; specific payment schedules will be outlined in your project details.</p>

            <h2>9. Limitation of liability</h2>
            <p>Our liability for any claim arising from our services is limited to the amount paid for the specific project in question. We are not liable for indirect, incidental, or consequential damages.</p>

            <h2>10. Governing law</h2>
            <p>These terms are governed by the laws of the State of Texas, without regard to conflict-of-law principles.</p>

            <h2>11. Changes to these terms</h2>
            <p>We may update these terms from time to time. Continued use of our services after changes are posted constitutes acceptance of the updated terms.</p>

            <h2>12. Contact</h2>
            <p>Questions about these terms can be sent to <a href={`mailto:${siteConfig.email}`} style={{ color: "var(--accent)" }}>{siteConfig.email}</a> or {siteConfig.phoneDisplay}.</p>

            <div className="disclaimer">
              This page is a general-purpose template intended to describe our current practices in plain language. It should be reviewed by qualified legal counsel before being relied upon as a complete, binding legal document.
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
