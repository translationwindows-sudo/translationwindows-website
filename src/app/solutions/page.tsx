import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Certified translation, document translation, transcription, subtitling, localization and proofreading — the full solutions catalog arrives with its dedicated milestone.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="Solutions"
      description="Certified translation, document translation, transcription, subtitling, localization and proofreading — the full solutions catalog arrives with its dedicated milestone."
    />
  );
}
