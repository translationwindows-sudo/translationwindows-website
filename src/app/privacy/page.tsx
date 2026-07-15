import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Crumb, PwHero } from "@/components/pillar/pillar-parts";
import { siteConfig } from "@/config/site";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "Privacy Policy — Translation Windows",
  description: "How Translation Windows (Transinformatic LLC) collects, uses, stores and protects your information and documents.",
};

export default function PrivacyPage() {
  return (
    <div className="pw" id="top">
      <Container>
        <Crumb label="Privacy Policy" />
        <PwHero eyebrow="Legal" title="Privacy Policy">
          How we collect, use and protect your information and documents.
        </PwHero>
      </Container>
      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0, paddingBottom: 80 }}>
          <div className="pw-legal">
            <p className="updated">Last updated: July 2026</p>

            <h2>1. Who we are</h2>
            <p>{siteConfig.name} is operated by {siteConfig.legalName}, based in {siteConfig.address.city}, {siteConfig.address.region}. This policy explains how we handle personal information and documents submitted through our website and project workspace.</p>

            <h2>2. Information we collect</h2>
            <p>We collect information you provide directly, including your name, email, phone number, company, and the documents and project details you submit for translation. We also collect basic technical information such as browser type and pages visited, used to operate and improve the site.</p>

            <h2>3. Documents you upload</h2>
            <p>Uploaded files are stored outside any publicly accessible location and are only accessible to your assigned project team. Files are validated on upload and retained only as long as necessary to complete your project and applicable legal or accounting requirements.</p>

            <h2>4. How we use your information</h2>
            <ul>
              <li>To prepare quotations and complete translation projects</li>
              <li>To communicate with you about your project status</li>
              <li>To send confirmation and notification emails</li>
              <li>To maintain records required for business and legal purposes</li>
            </ul>

            <h2>5. How we share information</h2>
            <p>We do not sell your information. We share it only with linguists and staff directly involved in completing your project, and with service providers who help us operate the platform (such as hosting and email delivery), under confidentiality obligations.</p>

            <h2>6. Data retention</h2>
            <p>We retain project files and records for as long as needed to deliver your project and meet legal, tax, or accounting obligations, after which they are deleted or anonymized.</p>

            <h2>7. Your rights</h2>
            <p>You may request access to, correction of, or deletion of your personal information by contacting us at {siteConfig.email}. We will respond within a reasonable time.</p>

            <h2>8. Cookies</h2>
            <p>Our website uses only essential cookies required for the site to function. We do not use third-party advertising cookies.</p>

            <h2>9. Security</h2>
            <p>We apply reasonable technical and organizational measures to protect your information, including restricted access to uploaded documents and secure storage practices. No method of transmission or storage is 100% secure.</p>

            <h2>10. Contact us</h2>
            <p>Questions about this policy can be sent to <a href={`mailto:${siteConfig.email}`} style={{ color: "var(--accent)" }}>{siteConfig.email}</a> or {siteConfig.phoneDisplay}.</p>

            <div className="disclaimer">
              This page is a general-purpose template intended to describe our current practices in plain language. It should be reviewed by qualified legal counsel before being relied upon as a complete legal document, particularly regarding jurisdiction-specific requirements (e.g. GDPR, CCPA).
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
