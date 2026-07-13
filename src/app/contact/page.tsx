import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach us by phone, WhatsApp or email today; the full contact experience with forms ships in an upcoming milestone.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="Contact"
      description="Reach us by phone, WhatsApp or email today; the full contact experience with forms ships in an upcoming milestone."
    />
  );
}
