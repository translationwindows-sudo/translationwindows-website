import type { Metadata } from "next";

import { Dashboard } from "@/features/workspace/dashboard";

export const metadata: Metadata = {
  title: "Project Workspace — Translation Windows",
  description: "Track your translation project, message your Project Coordinator, and manage your files.",
  robots: { index: false, follow: false },
};

export default function WorkspacePage() {
  return <Dashboard />;
}
