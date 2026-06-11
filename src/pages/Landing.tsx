import { useNavigate } from "react-router-dom";
import { Compass, Sparkles } from "lucide-react";
import { ColorfulPillCardsGrid, slidePillAccent } from "@/components/ui/card-1";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import { CLIENT_PARTICLE_WORDS } from "@/utils/constants";
import { usePrepSession } from "@/hooks/usePrepSession";

const Landing = () => {
  const navigate = useNavigate();
  const { client, hasSession } = usePrepSession();

  return (
    <div className="proposal-font min-h-screen bg-background text-foreground font-sans flex flex-col">
      <section className="relative w-full flex-1 min-h-[min(55vh,480px)] overflow-hidden border-b border-border/60">
        <ParticleTextEffect words={CLIENT_PARTICLE_WORDS} theme="light" className="pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-transparent to-background pointer-events-none" />
      </section>

      <div className="shrink-0 flex flex-col items-center px-6 py-10 md:py-12">
        <p className="mb-6 text-center text-sm text-muted-foreground max-w-md">
          {hasSession
            ? `${client.empresa} · ${client.demoGoal}`
            : "Prepare and run Factorial discovery demos — powered by OpenAI"}
        </p>
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
