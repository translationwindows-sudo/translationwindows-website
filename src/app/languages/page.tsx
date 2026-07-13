import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Languages",
  description: "Every language pair in the world. The interactive language explorer ships in a later milestone.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="Languages"
      description="Every language pair in the world. The interactive language explorer ships in a later milestone."
    />
  );
}
