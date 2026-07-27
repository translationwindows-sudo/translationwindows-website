import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { TrackView } from "@/features/track/track-view";
import "@/styles/pillar.css";

export const metadata: Metadata = {
  title: "Track your project — Translation Windows",
  description: "Check the status of your translation project.",
  robots: { index: false, follow: false },
};

export default async function TrackPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return (
    <div className="pw" id="top">
      <Container>
        <TrackView token={token} />
      </Container>
    </div>
  );
}
