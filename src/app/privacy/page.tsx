import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy content is being finalized for the new platform.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="Privacy Policy"
      description="Our privacy policy content is being finalized for the new platform."
    />
  );
}
