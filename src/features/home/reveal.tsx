"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/** Scroll-reveal wrapper matching the locked design's .rv system. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div" as ElementType,
}: {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.14 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`rv ${delay ? `d${delay}` : ""} ${seen ? "in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
