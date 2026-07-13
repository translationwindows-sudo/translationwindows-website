import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-5 py-28">
      <p className="font-display text-6xl font-bold text-brand-signal">404</p>
      <h1 className="font-display text-3xl font-bold">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you are looking for does not exist or has moved.
      </p>
      <Button asChild variant="accent">
        <Link href="/">Back to home</Link>
      </Button>
    </Container>
  );
}
