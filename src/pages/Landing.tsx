import { useNavigate } from "react-router-dom";
import { Compass, Sparkles } from "lucide-react";
import { ColorfulPillCardsGrid, slidePillAccent } from "@/components/ui/card-1";
import { usePrepSession } from "@/hooks/usePrepSession";

const Landing = () => {
  const navigate = useNavigate();
  const { client, hasSession } = usePrepSession();

  const subtitle = hasSession
    ? `${client.empresa} · ${client.demoGoal}`
    : "Prepare and run Factorial discovery demos — powered by OpenAI";

  return (
    <div className="proposal-font min-h-screen bg-background text-foreground font-sans flex flex-col">
      <section className="w-full min-h-[200px] border-b border-border/60 bg-gradient-to-b from-primary/[0.06] via-background to-background flex flex-col items-center justify-center px-6 py-10 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Factorial</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Pre-Demo Prep</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">{subtitle}</p>
      </section>

      <div className="shrink-0 flex flex-col items-center px-6 py-10 md:py-12">
        <div className="w-full max-w-md">
          <ColorfulPillCardsGrid
            theme="light"
            columns={1}
            className="border border-border/80 bg-white shadow-sm"
            items={[
              {
                name: "Prepare new demo",
                detail: "Fill form · AI generates guide · ~1 min",
                logo: <Sparkles className="h-5 w-5" />,
                accent: slidePillAccent(0),
                onClick: () => navigate("/preparar"),
              },
              {
                name: hasSession ? `Open guide · ${client.empresa}` : "Open demo guide",
                detail: hasSession
                  ? "Your AI-prepared 9-section guide"
                  : "Template guide · prepare a client first",
                logo: <Compass className="h-5 w-5" />,
                accent: slidePillAccent(2),
                onClick: () => navigate("/guia"),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
