import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export function Container({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5", className)}>
      {children}
    </div>
  );
}
