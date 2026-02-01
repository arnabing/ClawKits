"use client";

import { cn } from "@/lib/utils";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface AnimatedStepsProps {
  steps: Step[];
  className?: string;
}

export function AnimatedSteps({ steps, className }: AnimatedStepsProps) {
  return (
    <div className={cn("grid gap-8 sm:grid-cols-3", className)}>
      {steps.map((step, index) => (
        <div
          key={step.number}
          className="group relative"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          {/* Connector line between steps */}
          {index < steps.length - 1 && (
            <div
              aria-hidden
              className="absolute left-1/2 top-7 hidden h-px w-full sm:block"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(76, 110, 245, 0.3) 20%, rgba(76, 110, 245, 0.3) 80%, transparent 100%)",
              }}
            />
          )}

          <div className="relative rounded-xl border border-surface-800 bg-surface-900/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-surface-700 hover:bg-surface-900/80">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-600/10 text-brand-400 transition-colors group-hover:bg-brand-600/20">
              {step.icon}
            </div>

            <span className="absolute right-3 top-3 font-mono text-xs font-bold text-surface-700 transition-colors group-hover:text-surface-600">
              {step.number}
            </span>

            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-surface-400">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
