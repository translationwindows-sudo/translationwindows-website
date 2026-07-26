import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/pillar/contact-form";
import { Crumb, PwHero } from "@/components/pillar/pillar-parts";
import { siteConfig } from "@/config/site";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "Contact Translation Windows",
  description: "Reach Translation Windows by phone, WhatsApp, email, or the contact form — Houston, TX.",
};

export default function ContactPage() {
  return (
    <div className="pw" id="top">
      <Container>
        <Crumb label="Contact" />
        <PwHero eyebrow="Get in touch" title="Let's talk about your project.">
          Reach us however is easiest — or start your project directly and a Project Coordinator will follow up.
        </PwHero>
      </Container>
      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0, paddingBottom: 60 }}>
          <div className="pw-contact-grid">
            <ContactForm />
            <div className="pw-contact-side">
              <div className="pw-contact-card">
                <h4>Phone</h4>
                <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
                <p>Monday – Friday · 8:00 AM – 6:00 PM Central Time</p>
              </div>
              <div className="pw-contact-card">
                <h4>WhatsApp</h4>
                <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">Talk to a Project Coordinator on WhatsApp</a>
                <p>Fastest way to reach a Project Coordinator</p>
              </div>
              <div className="pw-contact-card">
                <h4>Email</h4>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </div>
              <div className="pw-contact-card">
                <h4>Project Review Hours</h4>
                <p>Monday – Friday · 8:00 AM – 6:00 PM Central Time</p>
                <p>Most quotation requests are reviewed within 30–60 minutes during business hours. Larger or more complex projects may require additional review time.</p>
              </div>
              <div className="pw-contact-card">
                <h4>Office</h4>
                <p>{siteConfig.address.street}</p>
                <p>{siteConfig.address.city}, {siteConfig.address.region} {siteConfig.address.postal}</p>
                <div className="pw-map" style={{ marginTop: 12 }}>
                  <iframe
                    title="Translation Windows office location"
                    loading="lazy"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(`${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postal}`)}&output=embed`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
