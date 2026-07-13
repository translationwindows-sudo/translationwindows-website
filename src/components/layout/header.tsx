"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { mainNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight"
          aria-label={`${siteConfig.name} home`}
        >
          <svg width="22" height="22" viewBox="0 0 60 56" fill="none" aria-hidden className="inline-block align-[-3px] mr-1">
            <rect x="8" y="3" width="44" height="42" rx="3" stroke="#E8492A" strokeWidth="5" />
            <line x1="30" y1="5" x2="30" y2="43" stroke="#E8492A" strokeWidth="3.5" />
            <line x1="10" y1="24" x2="50" y2="24" stroke="#E8492A" strokeWidth="3.5" />
            <rect x="2" y="48" width="56" height="6" rx="2" fill="#E8492A" />
          </svg>
          Translation<span className="text-brand-signal">Windows</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" size="sm">
            <a href={`tel:${siteConfig.phone}`}>
              <Phone className="h-4 w-4" aria-hidden />
              {siteConfig.phoneDisplay}
            </a>
          </Button>
          <Button asChild variant="accent" size="sm">
            <Link href="/#start">Upload files</Link>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border bg-background md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium hover:bg-muted"
            >
              {item.title}
            </Link>
          ))}
          <Button asChild variant="accent" className="mt-2">
            <Link href="/#start" onClick={() => setOpen(false)}>
              Upload files
            </Link>
          </Button>
        </Container>
      </div>
    </header>
  );
}
