"use client";

import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline-flex animate-shimmer items-center bg-[length:200%_auto] bg-clip-text text-transparent",
        "bg-gradient-to-r from-brand-400 via-purple-400 to-brand-400",
        className
      )}
    >
      {children}
    </span>
  );
}

interface GlowProps {
  children: React.ReactNode;
  className?: string;
}

export function Glow({ children, className }: GlowProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-xl opacity-30 blur-xl"
        style={{
          background:
            "linear-gradient(135deg, #4c6ef5 0%, #7950f2 50%, #9775fa 100%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
