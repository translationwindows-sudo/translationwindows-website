import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "About",
  description: "A decade of language work, a global team of native experts, and the road to a full language platform.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="About"
      description="A decade of language work, a global team of native experts, and the road to a full language platform."
    />
  );
}
