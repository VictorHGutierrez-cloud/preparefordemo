import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GuideStep } from "@/data/demoGuideSteps";

interface DemoGuideTimelineProps {
  steps: GuideStep[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function DemoGuideTimeline({ steps, currentIndex, onSelect }: DemoGuideTimelineProps) {
  return (
    <ol className="relative flex flex-col gap-1">
      {steps.map((step, i) => {
        const active = i === currentIndex;
        const done = i < currentIndex;
        return (
          <li key={step.id} className="relative">
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "absolute left-[19px] top-10 h-[calc(100%-1rem)] w-px",
                  done ? "bg-primary/60" : "bg-border",
                )}
              />
            )}
            <button
              type="button"
              onClick={() => onSelect(i)}
              className={cn(
                "group flex w-full items-center gap-4 rounded-xl p-2.5 text-left transition-colors",
                active ? "bg-primary/10" : "hover:bg-muted/60",
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors",
                  active && "border-primary bg-primary text-primary-foreground",
                  done && "border-primary/60 bg-primary/15 text-primary",
                  !active && !done && "border-border bg-background text-muted-foreground",
                )}
              >
                {done ? <Check className="h-4 w-4" /> : step.index}
              </span>
              <span className="min-w-0">
                <span
                  className={cn(
                    "block truncate text-sm font-semibold",
                    active ? "text-foreground" : "text-foreground/80",
                  )}
                >
                  {step.title}
                </span>
                <span className="block truncate text-xs text-muted-foreground">{step.duration ?? step.subtitle}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export function DemoGuideTimelineStrip({ steps, currentIndex, onSelect }: DemoGuideTimelineProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
      {steps.map((step, i) => {
        const active = i === currentIndex;
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onSelect(i)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all",
              active
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-background text-muted-foreground hover:text-foreground",
            )}
          >
            {step.index}. {step.title}
          </button>
        );
      })}
    </div>
  );
}
