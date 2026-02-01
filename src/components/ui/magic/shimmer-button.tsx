"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
}

const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.1em",
      shimmerDuration = "2.5s",
      borderRadius = "0.625rem",
      background = "linear-gradient(135deg, #4c6ef5 0%, #4263eb 100%)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        style={
          {
            "--shimmer-color": shimmerColor,
            "--spread": shimmerSize,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--bg": background,
          } as React.CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-sm font-medium text-white transition-all",
          "[background:var(--bg)] [border-radius:var(--radius)]",
          "hover:brightness-110 active:scale-[0.98]",
          "before:absolute before:inset-0 before:z-[-1] before:block before:[border-radius:var(--radius)] before:[background:var(--bg)]",
          "after:absolute after:inset-0 after:z-[-1] after:block after:animate-shimmer after:[background:linear-gradient(90deg,transparent,var(--shimmer-color)_20%,transparent)] after:[background-size:200%_100%] after:opacity-20",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
