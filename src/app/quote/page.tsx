import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "AI Quote Assistant",
  description: "The guided quote experience — upload a document, pick your languages, get an estimate — is designed in an upcoming milestone. Mock service layer already in place.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="AI Quote Assistant"
      description="The guided quote experience — upload a document, pick your languages, get an estimate — is designed in an upcoming milestone. Mock service layer already in place."
    />
  );
}
