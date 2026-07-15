import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Crumb, CtaBand, PwHero, TopicGrid, TopicSections, type TopicCard, type TopicDetail } from "@/components/pillar/pillar-parts";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "Platform — Client Workspace & AI-assisted Quoting",
  description: "The Translation Windows platform: client workspace, AI quote assistant, secure document handling, project tracking, notifications and collaboration.",
};

const grid: TopicCard[] = [
  { id: "workspace", icon: "🗂️", title: "Client Workspace", desc: "One place to build your project, track status and manage every file." },
  { id: "ai-quote", icon: "🤖", title: "AI Quote Assistant", desc: "A guided conversation collects what we need — a human approves every price." },
  { id: "secure-docs", icon: "🔒", title: "Secure Document Handling", desc: "Files are validated, categorized and stored outside the public web." },
  { id: "tracking", icon: "📊", title: "Project Tracking", desc: "A live status timeline from created to delivered — never a black box." },
  { id: "notifications", icon: "🔔", title: "Notifications", desc: "Email and in-app updates the moment your project's status changes." },
  { id: "collaboration", icon: "💬", title: "Team Collaboration", desc: "Message your project manager directly, without leaving your workspace." },
];

const details: TopicDetail[] = [
  { id: "workspace", title: "Client Workspace", body: "The moment you start a project, it becomes a real workspace — not a form that disappears after submission. Files, answers and status all live in one place you can return to.", points: ["Editable until your quote is prepared", "Categorized file library", "Live project summary"] },
  { id: "ai-quote", title: "AI Quote Assistant", body: "A guided intake asks the right follow-up questions for your specific project type, then routes your documents to a project manager for review before any price is sent.", points: ["Sequential, guided questions — not a generic form", "Upload requested only once we know what's needed", "Every quote is human-approved before it reaches you"] },
  { id: "secure-docs", title: "Secure Document Handling", body: "Uploaded documents may contain legal, medical or identity information. We treat them accordingly: validated file types, size limits, and storage outside any publicly accessible path.", points: ["Randomized storage paths", "Access limited to your project team", "Upload and download activity logged"] },
  { id: "tracking", title: "Project Tracking", body: "A visual status timeline — Created, Files Received, Under Review, Quotation, Translation, Quality Review, Delivered — replaces the uncertainty of a traditional email thread.", points: ["Always know exactly what stage you're at", "No more \"just checking in\" emails", "Status updates as work actually progresses"] },
  { id: "notifications", title: "Notifications", body: "You'll hear from us the moment something changes — a quote is ready, a file was received, or your project manager has a question — without needing to check back manually.", points: ["Email confirmation on submission", "Status-change alerts", "Direct messages from your project manager"] },
  { id: "collaboration", title: "Team Collaboration", body: "Every project has a named project manager who already knows your history, your formats and your preferences — reachable directly from your workspace.", points: ["One point of contact per project", "WhatsApp, email and phone, your choice", "Context carries across every future project"] },
];

export default function PlatformPage() {
  return (
    <div className="pw" id="top">
      <Container>
        <Crumb label="Platform" />
        <PwHero eyebrow="How Translation Windows works" title="Technology-enabled. Human-approved." secondaryLabel="Explore the AI Quote Assistant" secondaryHref="/quote">
          Our platform combines a guided AI intake with real project management — so every quote is fast to request and accurate to receive.
        </PwHero>
      </Container>
      <Container>
        <div className="pw-section" style={{ borderTop: 0, paddingTop: 0 }}>
          <TopicGrid items={grid} />
        </div>
        <div className="pw-section">
          <p className="k">In depth</p>
          <h2>What the platform actually does</h2>
          <TopicSections items={details} backLabel="platform" />
        </div>
        <CtaBand title="See it for yourself" body="Start a project and experience the guided intake — no account required to get a quote." />
      </Container>
    </div>
  );
}
