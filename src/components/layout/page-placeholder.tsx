import { Container } from "@/components/layout/container";

/**
 * Temporary scaffold for routes whose full design lands in later
 * milestones. Real information architecture, placeholder presentation.
 */
export function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Container className="py-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-signal">
        Coming in a future milestone
      </p>
      <h1 className="mb-4 font-display text-4xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="max-w-xl text-muted-foreground">{description}</p>
    </Container>
  );
}
