import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, FileDown, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { callPrepareApi } from "@/lib/prepApi";
import { downloadPrepMarkdown, loadPrepSession, savePrepSession } from "@/lib/prepSession";
import { usePrepPdfDownload } from "@/hooks/usePrepPdfDownload";
import type { PrepareFormData } from "@/types/prep";
import { useToast } from "@/hooks/use-toast";

const FOCUS_MODULES = [
  { id: "recruitment", label: "Recruitment" },
  { id: "onboarding", label: "Onboarding" },
  { id: "time-tracking", label: "Time & Attendance" },
  { id: "time-off", label: "Leave Management" },
  { id: "documents", label: "Documents" },
  { id: "communication", label: "Communication" },
  { id: "trainings", label: "Trainings" },
  { id: "performance", label: "Performance" },
  { id: "engagement", label: "Engagement" },
] as const;

const Prepare = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { downloadPdfScript, downloadPdfWithNotes, pdfLoading } = usePrepPdfDownload();
  const [loading, setLoading] = useState(false);
  const [lastMarkdown, setLastMarkdown] = useState<string | null>(null);
  const [lastClientName, setLastClientName] = useState("");

  const [form, setForm] = useState<PrepareFormData>({
    clientName: "",
    language: "en",
    industry: "",
    employeeCount: "",
    demoGoal: "",
    focusModules: ["recruitment", "time-tracking", "time-off"],
    researchNotes: "",
  });

  const toggleModule = (id: string) => {
    setForm((prev) => {
      const has = prev.focusModules.includes(id);
      return {
        ...prev,
        focusModules: has
          ? prev.focusModules.filter((m) => m !== id)
          : [...prev.focusModules, id],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName.trim()) {
      toast({ title: "Client name required", variant: "destructive" });
      return;
    }
    if (form.researchNotes.trim().length < 20) {
      toast({
        title: "Add more research notes",
        description: "At least 20 characters (SDR notes, LinkedIn, website, etc.)",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await callPrepareApi({
        ...form,
        demoGoal:
          form.demoGoal.trim() ||
          `Prepare a discovery-led Factorial demo for ${form.clientName.trim()}`,
      });

      savePrepSession({
        client: result.client,
        guideSteps: result.guideSteps,
        prepMarkdown: result.prepMarkdown,
        citedUrls: result.citedUrls,
        meta: result.meta,
      });

      setLastMarkdown(result.prepMarkdown);
      setLastClientName(form.clientName.trim());

      const meta = result.meta;
      const factorialCount = result.factorialSourceUrls?.length ?? 0;
      const clientCount = result.clientSourceUrls?.length ?? 0;
      const sourceDesc = meta
        ? `${factorialCount} Factorial docs · ${clientCount} client sources`
        : `${result.citedUrls.length} sources cited`;

      toast({
        title: "Demo prepared",
        description: meta?.tavilyEnabled
          ? sourceDesc
          : `${sourceDesc}. Tip: add TAVILY_API_KEY on Vercel for richer research.`,
        variant: meta?.tavilyEnabled && factorialCount > 0 ? "default" : "destructive",
      });

      navigate("/guia");
    } catch (err) {
      toast({
        title: "Preparation failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="proposal-font min-h-[100dvh] bg-[hsl(347,15%,97%)] font-sans text-foreground">
      <header className="border-b border-border bg-background px-4 py-3 md:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Home
        </Link>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8 md:py-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">AI preparation</p>
          <h1 className="mt-2 text-3xl font-bold">Prepare your demo</h1>
          <p className="mt-2 text-muted-foreground">
            Fill in client details and research notes. OpenAI generates your demo guide — no Cursor
            needed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="clientName">Client name *</Label>
              <Input
                id="clientName"
                placeholder="e.g. Jirani"
                value={form.clientName}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={form.language}
                onValueChange={(v) => setForm({ ...form, language: v })}
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="employeeCount">Employees</Label>
              <Input
                id="employeeCount"
                placeholder="e.g. 120 — or leave blank to let AI search"
                value={form.employeeCount}
                onChange={(e) => setForm({ ...form, employeeCount: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="e.g. Commercial construction / Interior fit-outs"
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
              />
              {!form.industry.trim() && (
                <p className="text-xs text-muted-foreground">
                  If empty, AI will try to find from web — always confirm on call.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="demoGoal">Today&apos;s goal</Label>
              <Input
                id="demoGoal"
                placeholder="e.g. Validate recruitment and field attendance challenges"
                value={form.demoGoal}
                onChange={(e) => setForm({ ...form, demoGoal: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label>Focus modules</Label>
            <div className="flex flex-wrap gap-2">
              {FOCUS_MODULES.map((mod) => {
                const active = form.focusModules.includes(mod.id);
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => toggleModule(mod.id)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {mod.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="researchNotes">Research notes *</Label>
            <Textarea
              id="researchNotes"
              placeholder="Include: location, portfolio/projects, workforce type (office vs field), headcount if known, SDR notes, LinkedIn, website..."
              rows={10}
              value={form.researchNotes}
              onChange={(e) => setForm({ ...form, researchNotes: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground">
              Minimum 20 characters. Portfolio and location help the icebreaker. Only facts from here
              will be used about the client.
            </p>
          </div>

          <Button type="submit" size="lg" disabled={loading} className="w-full gap-2">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating with OpenAI…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate demo guide
              </>
            )}
          </Button>
        </form>

        {lastMarkdown && (
          <div className="mt-6 rounded-xl border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground mb-2">Last preparation saved in browser.</p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => downloadPrepMarkdown(lastMarkdown, lastClientName)}
              >
                <Download className="h-4 w-4" />
                Download prep.md
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={pdfLoading}
                onClick={() => downloadPdfScript(loadPrepSession())}
              >
                {pdfLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileDown className="h-4 w-4" />
                )}
                PDF script
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={pdfLoading}
                onClick={() => downloadPdfWithNotes(loadPrepSession())}
              >
                {pdfLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileDown className="h-4 w-4" />
                )}
                PDF + notes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prepare;
