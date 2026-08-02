import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

/**
 * 404.
 *
 * A dead end wastes a visitor who was looking for something specific.
 * This offers the routes most people actually want, so a mistyped or
 * stale link still has a chance of becoming an enquiry.
 */
export default function NotFound() {
  const routes = [
    { href: "/solutions", label: "Translation services", hint: "Certified, legal, medical and technical" },
    { href: "/languages", label: "Languages we cover", hint: "European, Asian and Middle Eastern" },
    { href: "/industries", label: "Industries", hint: "Law, healthcare, technology, education" },
    { href: "/blog", label: "Guides and answers", hint: "USCIS, certification, turnaround" },
    { href: "/about", label: "About Translation Windows", hint: "Who we are, since 2017" },
    { href: "/contact", label: "Talk to a coordinator", hint: "Phone, email or WhatsApp" },
  ];

  return (
    <Container className="py-24">
      <p className="font-display text-6xl font-bold text-brand-signal">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold">
        We could not find that page
      </h1>
      <p className="mt-3 max-w-lg text-muted-foreground">
        It may have moved, or the link may be incomplete. If you were partway
        through a project, your work is saved — start again from the home page
        and it will still be there.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="accent">
          <Link href="/#start">Start your project</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="rounded-xl border border-border p-5 transition-colors hover:border-brand-signal"
          >
            <p className="font-display font-semibold">{r.label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{r.hint}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
