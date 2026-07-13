import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Industries",
  description: "Legal, immigration, healthcare, academic, e-commerce and enterprise — industry pages land in a dedicated milestone.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="Industries"
      description="Legal, immigration, healthcare, academic, e-commerce and enterprise — industry pages land in a dedicated milestone."
    />
  );
}
