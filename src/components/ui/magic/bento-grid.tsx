"use client";

import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  tags?: string[];
  onClick?: () => void;
  featured?: boolean;
}

export function BentoCard({
  name,
  description,
  icon,
  className,
  tags,
  onClick,
  featured,
}: BentoCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-surface-800 bg-surface-900/50 p-6 backdrop-blur-sm transition-all duration-300",
        "hover:border-surface-600 hover:bg-surface-900/80 hover:shadow-xl hover:shadow-brand-500/5",
        onClick && "cursor-pointer",
        featured && "sm:col-span-2 lg:col-span-1",
        className
      )}
    >
      {/* Hover glow effect */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(76, 110, 245, 0.06), transparent 40%)",
        }}
      />

      <div className="relative">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600/10 text-2xl">
            {icon}
          </div>
          {featured && (
            <span className="rounded-full bg-brand-600/10 px-2.5 py-0.5 text-xs font-medium text-brand-400">
              Popular
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-white">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-surface-400">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-surface-800 px-2 py-0.5 text-[11px] font-medium text-surface-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
