"use client";

import { useState, type FormEvent } from "react";

import { siteConfig } from "@/config/site";

/** Honest, backend-free contact form: composes a real mailto: on submit
 * (Phase 1C will replace this with a server route to the PHP CRM). */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Website inquiry — ${service || "General"}`;
    const body = `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="pw-form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="cf-name">Full name</label>
        <input id="cf-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" />
      </div>
      <div>
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
      </div>
      <div>
        <label htmlFor="cf-service">Service</label>
        <select id="cf-service" value={service} onChange={(e) => setService(e.target.value)}>
          <option value="">Select a service</option>
          <option>Certified Translation</option>
          <option>Legal Translation</option>
          <option>Medical Translation</option>
          <option>Localization</option>
          <option>Spanish Interpretation</option>
          <option>Something else</option>
        </select>
      </div>
      <div>
        <label htmlFor="cf-msg">How can we help?</label>
        <textarea id="cf-msg" required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your project…" />
      </div>
      <button type="submit" className="pw-btn-a" style={{ justifyContent: "center" }}>Send message →</button>
      {sent && <p style={{ fontSize: ".84rem", color: "var(--char-soft)" }}>Opening your email client with this message pre-filled — send it to reach us directly.</p>}
    </form>
  );
}
