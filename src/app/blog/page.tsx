import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Blog",
  description: "The blog framework is in place; the first articles arrive with the content milestone.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="Blog"
      description="The blog framework is in place; the first articles arrive with the content milestone."
    />
  );
}
