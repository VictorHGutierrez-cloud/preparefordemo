import { DISCOVERY_AREAS, HELP_BASE_BY_LANG } from "./defaults";
import { videosForArea, type DemoVideo } from "./videos";

export interface PrepInput {
  clientName: string;
  language: string;
  industry: string;
  employeeCount: string;
  demoGoal: string;
  focusModules: string[];
}

export interface AIPrepPayload {
  clientBullets: string[];
  closingScript: string;
  prepMarkdown: string;
  citedUrls: string[];
  focusDemoAreas: Array<{
    area: string;
    modules: string[];
    helpUrl?: string;
  }>;
  discoveryAreaIds?: string[];
}

export interface ClientProfile {
  empresa: string;
  industry: string;
  employeeCount: string;
  demoGoal: string;
  focusModules: string[];
}

export interface GuideStep {
  id: string;
  index: number;
  kind: string;
  title: string;
  subtitle: string;
  duration?: string;
  bullets?: string[];
  validationQuestion?: string;
  discoveryAreas?: typeof DISCOVERY_AREAS;
  beforeItems?: string[];
  afterItems?: string[];
  demoModules?: Array<{
    area: string;
    modules: string[];
    videos: DemoVideo[];
    helpUrl?: string;
  }>;
  outcomes?: string[];
  questions?: string[];
  closingScript?: string;
}

function helpBase(language: string): string {
  return HELP_BASE_BY_LANG[language] ?? HELP_BASE_BY_LANG.en;
}

function replaceClient(text: string, name: string): string {
  return text.replace(/\[CLIENT\]/g, name);
}

export function buildGuide(
  input: PrepInput,
  ai: AIPrepPayload,
): { client: ClientProfile; guideSteps: GuideStep[] } {
  const { clientName, language, industry, employeeCount, demoGoal, focusModules } = input;
  const helpUrl = helpBase(language);

  const discoveryAreas =
    ai.discoveryAreaIds && ai.discoveryAreaIds.length > 0
      ? DISCOVERY_AREAS.filter((a) => ai.discoveryAreaIds!.includes(a.id))
      : [...DISCOVERY_AREAS];

  const demoModules = ai.focusDemoAreas.map((mod) => ({
    area: mod.area,
    modules: mod.modules,
    videos: videosForArea(mod.area, focusModules),
    helpUrl: mod.helpUrl ?? helpUrl,
  }));

  const guideSteps: GuideStep[] = [
    {
      id: "agenda",
      index: 1,
      kind: "agenda",
      title: "Agenda",
      subtitle: "Today's goal",
      duration: "1 min",
      bullets: [
        replaceClient(`Understand ${clientName}'s current HR operations`, clientName),
        "Validate the main challenges impacting growth",
        "Show how similar organizations solve these challenges",
        replaceClient(`Explore whether Factorial could support ${clientName}'s next stage of growth`, clientName),
      ],
    },
    {
      id: "client-context",
      index: 2,
      kind: "clientContext",
      title: "What We Learned",
      subtitle: `${clientName} today — confirm your understanding`,
      duration: "2 min",
      bullets: ai.clientBullets,
      validationQuestion: "Would you say this accurately reflects your operation today?",
    },
    {
      id: "discovery",
      index: 3,
      kind: "discovery",
      title: "Discovery",
      subtitle: "A conversation, not a presentation",
      duration: "15–20 min",
      discoveryAreas,
    },
    {
      id: "executive-summary",
      index: 4,
      kind: "executiveSummary",
      title: "Executive Summary",
      subtitle: "What we heard today — fill live",
      bullets: [
        "Challenge #1 — Example + Impact",
        "Challenge #2 — Example + Impact",
        "Challenge #3 — Example + Impact",
      ],
      validationQuestion: "Would you agree these are the main areas worth improving first?",
    },
    {
      id: "future-state",
      index: 5,
      kind: "futureState",
      title: "Future State",
      subtitle: "Imagine a branch manager",
      beforeItems: ["WhatsApp", "Excel files", "Paper forms", "Email chains"],
      afterItems: [
        "Approve leave",
        "Review schedules",
        "Track attendance",
        "Access employee records",
        "Manage onboarding",
      ],
    },
    {
      id: "factorial-demo",
      index: 6,
      kind: "factorialDemo",
      title: "Factorial Demo",
      subtitle: "Only show what solves their pain",
      demoModules,
    },
    {
      id: "business-impact",
      index: 7,
      kind: "businessImpact",
      title: "Business Impact",
      subtitle: "Expected outcomes",
      outcomes: [
        "Reduce administrative work",
        "Faster hiring process",
        "Improved workforce visibility",
        "More accurate attendance tracking",
        "Faster onboarding",
        "Better employee experience",
        replaceClient(`Higher HR scalability as ${clientName} expands`, clientName),
      ],
    },
    {
      id: "commercial",
      index: 8,
      kind: "commercial",
      title: "Commercial Discussion",
      subtitle: "Next steps in the evaluation",
      questions: [
        replaceClient(`If we solved these challenges, what would success look like for ${clientName}?`, clientName),
        "Who else should be involved in this evaluation?",
        "What is the ideal timeline for implementation?",
        "Are there any concerns we should address early?",
      ],
    },
    {
      id: "closing",
      index: 9,
      kind: "closing",
      title: "Strong Closing",
      subtitle: "End with clarity and momentum",
      closingScript: ai.closingScript,
    },
  ];

  return {
    client: {
      empresa: clientName,
      industry,
      employeeCount,
      demoGoal,
      focusModules,
    },
    guideSteps,
  };
}
