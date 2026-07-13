import Link from "next/link";

import { Container } from "@/components/layout/container";
import { footerNav, siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-brand-navy text-primary-foreground dark:bg-card">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-3">
          <p className="font-display text-lg font-bold">
            Translation<span className="text-brand-gold">Windows</span>
          </p>
          <p className="text-sm text-primary-foreground/70">
            {siteConfig.tagline}. Serving clients worldwide from Houston,
            Texas since {siteConfig.foundingYear}.
          </p>
        </div>
        {footerNav.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <p className="mb-3 text-sm font-semibold text-primary-foreground/90">
              {group.heading}
            </p>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/10 py-6 text-xs text-primary-foreground/50 md:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name} · A product of{" "}
          {siteConfig.legalName}
        </p>
        <p>
          {siteConfig.address.street}, {siteConfig.address.city},{" "}
          {siteConfig.address.region} {siteConfig.address.postal} ·{" "}
          <a className="hover:text-primary-foreground" href={`tel:${siteConfig.phone}`}>
            {siteConfig.phoneDisplay}
          </a>
        </p>
      </Container>
    </footer>
  );
}
