import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  ExternalLink,
  MessageCircleQuestion,
  PlayCircle,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoVideo, GuideStep } from "@/data/demoGuideSteps";
import { useDiscoveryChecklist } from "@/hooks/useDiscoveryChecklist";
import { useExecutiveNotes } from "@/hooks/useExecutiveNotes";
import { clientSlug as toClientSlug } from "@/lib/callNotesStorage";
import { DemoGuideDemoDialog } from "./DemoGuideDemoDialog";

interface DemoGuideStepPanelProps {
  step: GuideStep;
  clientName: string;
}

function replaceClient(text: string, name: string): string {
  return text.replace(/\[CLIENT\]/g, name);
}

export function DemoGuideStepPanel({ step, clientName }: DemoGuideStepPanelProps) {
  const slug = toClientSlug(clientName);
  const { toggle, isChecked } = useDiscoveryChecklist(slug);
  const { notes, setNotes } = useExecutiveNotes(slug);
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState<{ title: string; videos: DemoVideo[] } | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <header>
        {step.duration && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{step.duration}</p>
        )}
        <h2 className="mt-2 text-3xl font-bold leading-tight text-foreground md:text-4xl">{step.title}</h2>
        <p className="mt-2 text-lg text-muted-foreground">{replaceClient(step.subtitle, clientName)}</p>
      </header>

      {step.bullets && step.bullets.length > 0 && (
        <ul className="flex flex-col gap-3">
          {step.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 rounded-xl border border-border bg-background p-4 text-[15px] leading-relaxed text-foreground/90"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
              {replaceClient(bullet, clientName)}
            </li>
          ))}
        </ul>
      )}

      {step.icebreaker && step.kind === "agenda" && (
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Warm greeting &amp; rapport</p>
          <blockquote className="rounded-xl border border-border bg-muted/30 p-4 text-sm italic leading-relaxed text-foreground/90">
            {replaceClient(step.icebreaker.greeting, clientName)}
          </blockquote>
          <blockquote className="rounded-xl border border-border bg-muted/30 p-4 text-sm italic leading-relaxed text-foreground/90">
            {replaceClient(step.icebreaker.rapport, clientName)}
          </blockquote>
        </div>
      )}

      {step.businessProfile && step.kind === "clientContext" && (
        <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Business profile &amp; angle</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-foreground/90">
            <li>
              <span className="font-semibold">Industry:</span> {step.businessProfile.industryDetail}
            </li>
            <li>
              <span className="font-semibold">Location:</span> {step.businessProfile.location}
            </li>
            <li>
              <span className="font-semibold">Workforce:</span> {step.businessProfile.workforceType}
            </li>
            <li>
              <span className="font-semibold">Core pain:</span> {step.businessProfile.corePainPoint}
            </li>
            <li>
              <span className="font-semibold">Factorial angle:</span> {step.businessProfile.factorialValueProp}
            </li>
          </ul>
          {step.employeeCountNote && (
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Employees:</span> {step.employeeCountNote}
            </p>
          )}
        </div>
      )}

      {step.validationQuestion && step.kind !== "executiveSummary" && (
        <ValidationCard question={replaceClient(step.validationQuestion, clientName)} />
      )}

      {step.kind === "discovery" && step.discoveryBlocks && step.discoveryBlocks.length > 0 && (
        <div className="flex flex-col gap-6">
          {step.discoveryBlocks.map((block) => (
            <div key={block.id} className="rounded-xl border border-border bg-background p-5">
              <h3 className="text-lg font-semibold text-foreground">{block.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{block.painContext}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {block.questions.map((q, qi) => {
                  const id = `${block.id}-${qi}`;
                  const checked = isChecked(id);
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => toggle(id)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition-colors",
                          checked
                            ? "border-primary/40 bg-primary/5 text-foreground"
                            : "border-transparent bg-muted/30 text-foreground/80 hover:bg-muted/50",
                        )}
                      >
                        {checked ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        ) : (
                          <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                        {replaceClient(q, clientName)}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}

      {step.kind === "discovery" && step.discoveryAreas && !step.discoveryBlocks?.length && (
        <div className="flex flex-col gap-6">
          {step.discoveryAreas.map((area) => (
            <div key={area.id} className="rounded-xl border border-border bg-background p-5">
              <h3 className="text-lg font-semibold text-foreground">{area.title}</h3>
              {area.opener && (
                <p className="mt-2 text-sm italic text-muted-foreground">&ldquo;{area.opener}&rdquo;</p>
              )}
              <ul className="mt-4 flex flex-col gap-2">
                {area.questions.map((q, qi) => {
                  const id = `${area.id}-${qi}`;
                  const checked = isChecked(id);
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => toggle(id)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition-colors",
                          checked
                            ? "border-primary/40 bg-primary/5 text-foreground"
                            : "border-transparent bg-muted/30 text-foreground/80 hover:bg-muted/50",
                        )}
                      >
                        {checked ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        ) : (
                          <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                        {q}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}

      {step.kind === "executiveSummary" && (
        <div className="flex flex-col gap-4">
          <p className="rounded-lg border border-primary/20 bg-primary/[0.04] px-4 py-3 text-sm text-muted-foreground">
            Saved per client in your browser. Use <strong className="text-foreground">PDF + notes</strong> after
            the call to export what you wrote.
          </p>
          <label className="text-sm font-semibold text-foreground">Live notes — challenges & impact</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Challenge #1: ...&#10;Impact: ...&#10;&#10;Challenge #2: ..."
            rows={10}
            className="w-full resize-y rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {step.validationQuestion && (
            <ValidationCard question={replaceClient(step.validationQuestion, clientName)} />
          )}
        </div>
      )}

      {step.kind === "futureState" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <BeforeAfterList variant="before" items={step.beforeItems ?? []} />
          <BeforeAfterList variant="after" items={step.afterItems ?? []} />
        </div>
      )}

      {step.kind === "factorialDemo" && step.demoTransition && (
        <div className="rounded-xl border-l-4 border-primary bg-primary/[0.06] p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Transition to demo</p>
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            {replaceClient(step.demoTransition, clientName)}
          </p>
        </div>
      )}

      {step.kind === "factorialDemo" && step.demoModules && (
        <div className="flex flex-col gap-4">
          {step.demoModules.map((mod) => (
            <div
              key={mod.area}
              className="rounded-xl border border-border bg-background p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{mod.area}</h3>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {mod.modules.map((m) => (
                      <span
                        key={m}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {m}
                      </span>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mod.videos.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDemo({ title: mod.area, videos: mod.videos });
                        setDemoOpen(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Watch demo
                    </button>
                  )}
                  {mod.helpUrl && (
                    <a
                      href={mod.helpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Help center
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {step.kind === "businessImpact" && step.outcomes && (
        <ul className="grid gap-3 sm:grid-cols-2">
          {step.outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/[0.04] p-4 text-sm font-medium text-foreground"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-primary" />
              {replaceClient(outcome, clientName)}
            </li>
          ))}
        </ul>
      )}

      {step.kind === "commercial" && step.questions && (
        <ul className="flex flex-col gap-3">
          {step.questions.map((q) => (
            <li
              key={q}
              className="flex gap-3 rounded-xl border border-border bg-muted/30 p-4 text-[15px] leading-relaxed"
            >
              <MessageCircleQuestion className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              {replaceClient(q, clientName)}
            </li>
          ))}
        </ul>
      )}

      {step.kind === "closing" && step.closingScript && (
        <blockquote className="rounded-xl border-l-4 border-primary bg-primary/[0.04] p-6 text-base leading-relaxed text-foreground/90">
          {replaceClient(step.closingScript, clientName)}
        </blockquote>
      )}

      {activeDemo && (
        <DemoGuideDemoDialog
          title={activeDemo.title}
          videos={activeDemo.videos}
          open={demoOpen}
          onOpenChange={setDemoOpen}
        />
      )}
    </div>
  );
}

function ValidationCard({ question }: { question: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-primary/30 bg-primary/[0.06] p-5">
      <MessageCircleQuestion className="h-5 w-5 shrink-0 text-primary" />
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">Ask for agreement</p>
        <p className="mt-1 text-base font-medium text-foreground">&ldquo;{question}&rdquo;</p>
      </div>
    </div>
  );
}

function BeforeAfterList({ variant, items }: { variant: "before" | "after"; items: string[] }) {
  const isBefore = variant === "before";
  return (
    <div
      className={cn(
        "rounded-xl border p-5",
        isBefore ? "border-border bg-muted/50" : "border-primary/30 bg-primary/[0.06]",
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        {isBefore ? (
          <TriangleAlert className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Sparkles className="h-4 w-4 text-primary" />
        )}
        <span
          className={cn(
            "text-xs font-bold uppercase tracking-wider",
            isBefore ? "text-muted-foreground" : "text-primary",
          )}
        >
          {isBefore ? "Instead of" : "They can"}
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-[15px] text-foreground/85">
            {isBefore ? (
              <span className="text-muted-foreground">✕</span>
            ) : (
              <ArrowRight className="h-3.5 w-3.5 text-primary" />
            )}
            {item}
          </li>
        ))}
      </ul>
      {!isBefore && (
        <p className="mt-4 text-sm font-semibold text-primary">From one platform.</p>
      )}
    </div>
  );
}
