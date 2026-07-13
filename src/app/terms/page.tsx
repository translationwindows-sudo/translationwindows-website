import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Our terms of service content is being finalized for the new platform.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="Terms of Service"
      description="Our terms of service content is being finalized for the new platform."
    />
  );
}
