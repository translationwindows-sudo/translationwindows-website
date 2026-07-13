import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides on certified vs. notarized translation, USCIS requirements, apostilles and more — the knowledge center framework is scaffolded and ready.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="Resources"
      description="Guides on certified vs. notarized translation, USCIS requirements, apostilles and more — the knowledge center framework is scaffolded and ready."
    />
  );
}
