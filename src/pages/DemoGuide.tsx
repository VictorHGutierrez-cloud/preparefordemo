import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Download, Home, RotateCcw } from "lucide-react";
import { DemoGuideTimeline, DemoGuideTimelineStrip } from "@/components/demo-guide/DemoGuideTimeline";
import { DemoGuideStepPanel } from "@/components/demo-guide/DemoGuideStepPanel";
import { usePrepSession } from "@/hooks/usePrepSession";
import { downloadPrepMarkdown, clearPrepSession } from "@/lib/prepSession";
import { Button } from "@/components/ui/button";

const DemoGuide = () => {
  const [current, setCurrent] = useState(0);
  const { client, guideSteps, hasSession, session, clear } = usePrepSession();

  const step = guideSteps[current];
  const goTo = (i: number) => setCurrent(Math.max(0, Math.min(i, guideSteps.length - 1)));

  const handleClear = () => {
    clearPrepSession();
    clear();
    window.location.reload();
  };

  return (
    <div className="proposal-font min-h-[100dvh] bg-[hsl(347,15%,97%)] font-sans text-foreground">
      <header className="flex items-center justify-between border-b border-border bg-background px-4 py-3 md:px-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <Home size={16} />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <p className="text-sm font-semibold">{client.empresa} · Demo Guide</p>
        <span className="text-sm tabular-nums text-muted-foreground">
          {current + 1} / {guideSteps.length}
        </span>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
        {hasSession && (
          <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-primary/20 bg-primary/[0.04] px-4 py-3 text-sm">
            <span className="text-foreground">AI-prepared session</span>
            {session?.prepMarkdown && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 h-8"
                onClick={() => downloadPrepMarkdown(session.prepMarkdown, client.empresa)}
              >
                <Download className="h-3.5 w-3.5" />
                prep.md
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-1.5 h-8 text-muted-foreground"
              onClick={handleClear}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          </div>
        )}

        {!hasSession && (
          <div className="mb-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
            Using template defaults.{" "}
            <Link to="/preparar" className="font-medium text-primary hover:underline">
              Prepare a client demo
            </Link>{" "}
            for a personalized guide.
          </div>
        )}

        <div className="mb-6 md:mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Pre-demo</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">{client.demoGoal}</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {client.industry} · {client.employeeCount} employees
          </p>
        </div>

        <DemoGuideTimelineStrip steps={guideSteps} currentIndex={current} onSelect={goTo} />

        <div className="mt-4 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <DemoGuideTimeline steps={guideSteps} currentIndex={current} onSelect={goTo} />
          </aside>

          <main>
            <DemoGuideStepPanel step={step} clientName={client.empresa} />

            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                className="inline-flex items-center gap-1 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/40 disabled:opacity-30"
              >
                <ChevronLeft size={18} />
                Previous
              </button>
              <button
                type="button"
                onClick={() => goTo(current + 1)}
                disabled={current === guideSteps.length - 1}
                className="inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-30"
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DemoGuide;
