import type { VercelRequest, VercelResponse } from "@vercel/node";

// --- types & defaults (inlined for Vercel ESM bundle) ---

interface DemoVideo {
  label: string;
  url: string;
}

interface PrepInput {
  clientName: string;
  language: string;
  industry: string;
  employeeCount: string;
  demoGoal: string;
  focusModules: string[];
}

interface AIPrepPayload {
  clientBullets: string[];
  closingScript: string;
  citedUrls: string[];
  focusDemoAreas: Array<{ area: string; modules: string[]; helpUrl?: string }>;
  discoveryAreaIds?: string[];
  discoveryEmphasis?: Record<string, string>;
  scalingChallenge?: string;
}

interface TavilyHit {
  title: string;
  url: string;
  content: string;
}

interface SearchMeta {
  tavilyEnabled: boolean;
  clientSourceCount: number;
  factorialSourceCount: number;
  model: string;
}

interface ClientProfile {
  empresa: string;
  industry: string;
  employeeCount: string;
  demoGoal: string;
  focusModules: string[];
}

interface DiscoveryArea {
  id: string;
  title: string;
  opener?: string;
  questions: readonly string[];
}

interface GuideStep {
  id: string;
  index: number;
  kind: string;
  title: string;
  subtitle: string;
  duration?: string;
  bullets?: string[];
  validationQuestion?: string;
  discoveryAreas?: DiscoveryArea[];
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

const DISCOVERY_AREAS = [
  {
    id: "recruitment",
    title: "Recruitment & Hiring",
    opener:
      "Before we look at solutions, I'd love to understand how you're currently attracting and hiring talent.",
    questions: [
      "How many hires do you make per month?",
      "How many applications do you receive per vacancy?",
      "How are candidates tracked today?",
      "How much of the process is manual?",
      "What is the biggest challenge in recruitment today?",
    ],
  },
  {
    id: "onboarding",
    title: "Onboarding",
    questions: [
      "What happens after a candidate accepts an offer?",
      "How are contracts signed?",
      "How are employee documents collected?",
      "How long does onboarding typically take?",
      "What parts of onboarding still require manual follow up?",
    ],
  },
  {
    id: "attendance",
    title: "Attendance & Field Workforce",
    questions: [
      "How do you currently track attendance?",
      "How do you manage employees working outside the branch?",
      "How do branch managers communicate attendance information to HR?",
      "How much time is spent consolidating attendance before payroll?",
      "How confident are you in the accuracy of attendance records?",
    ],
  },
  {
    id: "leave",
    title: "Leave Management",
    questions: [
      "How are leave requests submitted?",
      "How are approvals managed?",
      "How does HR maintain visibility across all branches?",
      "Have staffing shortages ever occurred due to overlapping leave requests?",
    ],
  },
  {
    id: "documents",
    title: "Employee Documentation",
    questions: [
      "Where are employee files stored today?",
      "How do managers access documents when needed?",
      "How much time does HR spend searching for documents?",
      "How do you ensure compliance across all locations?",
    ],
  },
  {
    id: "communication",
    title: "Communication",
    questions: [
      "How are company announcements distributed?",
      "How do employees access policies?",
      "How are payslips shared?",
      "How do you maintain culture across multiple locations?",
    ],
  },
] as const;

const HELP_BASE_BY_LANG: Record<string, string> = {
  en: "https://help.factorialhr.com/en_GB/",
  pt: "https://help.factorialhr.com/pt_PT/",
  es: "https://help.factorialhr.com/es_ES/",
  de: "https://help.factorialhr.com/de_DE/",
  fr: "https://help.factorialhr.com/fr_FR/",
  it: "https://help.factorialhr.com/it_IT/",
};

const DEMO_VIDEO_CATALOG: Record<string, DemoVideo[]> = {
  recruitment: [
    {
      label: "ATS AI match",
      url: "https://drive.google.com/file/d/1dqqMsqVk8nQ6Cm5xXjWhTMjK9e2YXif6/preview",
    },
  ],
  trainings: [
    {
      label: "Automatic certificate generation",
      url: "https://drive.google.com/file/d/1RvLz_-zE1B_EJTKPd9J7pAfIY8XikAO4/preview",
    },
    {
      label: "Learning management (LMS)",
      url: "https://drive.google.com/file/d/19XbP-z_ypsCk0Cwhsd_6bpe63vj8TjnX/preview",
    },
  ],
  performance: [
    {
      label: "Peer reviews (AVD Peers)",
      url: "https://drive.google.com/file/d/1vXZCTd5HTwyh1bv0pxGev9QLKnWUVTU1/preview",
    },
    {
      label: "Performance review (AVD Factorial)",
      url: "https://drive.google.com/file/d/1ZBzAvQn8UtKPe_0s8M7c79LA-TZLX5pw/preview",
    },
  ],
  engagement: [
    {
      label: "One-on-one meetings",
      url: "https://drive.google.com/file/d/10kuyd-q2bYtF_fs3oiPOtISHowjsYKA0/preview",
    },
    {
      label: "Surveys",
      url: "https://drive.google.com/file/d/1vZfFnxLLWCvU404bqsGTg1SwwF9hjS_c/preview",
    },
  ],
};

const AREA_VIDEO_KEYS: Record<string, string[]> = {
  Recruitment: ["recruitment"],
  Onboarding: [],
  "Time & Attendance": [],
  "Leave Management": [],
  "Document Management": [],
  "Internal Communication": [],
  Trainings: ["trainings"],
  Performance: ["performance"],
  Engagement: ["engagement"],
};

function videosForArea(area: string, focusModules: string[]): DemoVideo[] {
  const keys = AREA_VIDEO_KEYS[area] ?? [];
  const fromArea = keys.flatMap((k) => DEMO_VIDEO_CATALOG[k] ?? []);
  const fromFocus = focusModules.flatMap((mod) => {
    const key = mod.toLowerCase().replace(/\s+/g, "-");
    if (key.includes("recruit")) return DEMO_VIDEO_CATALOG.recruitment ?? [];
    if (key.includes("train")) return DEMO_VIDEO_CATALOG.trainings ?? [];
    if (key.includes("perform")) return DEMO_VIDEO_CATALOG.performance ?? [];
    if (key.includes("engag")) return DEMO_VIDEO_CATALOG.engagement ?? [];
    return [];
  });
  const seen = new Set<string>();
  return [...fromArea, ...fromFocus].filter((v) => {
    if (seen.has(v.url)) return false;
    seen.add(v.url);
    return true;
  });
}

async function tavilySearch(
  query: string,
  options?: { includeDomains?: string[]; maxResults?: number },
): Promise<TavilyHit[]> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) return [];

  const body: Record<string, unknown> = {
    api_key: apiKey,
    query,
    search_depth: "advanced",
    max_results: options?.maxResults ?? 4,
    include_answer: false,
  };
  if (options?.includeDomains?.length) {
    body.include_domains = options.includeDomains;
  }

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) return [];

  const data = (await response.json()) as {
    results?: Array<{ title: string; url: string; content: string }>;
  };

  return (data.results ?? []).map((r) => ({
    title: r.title,
    url: r.url,
    content: r.content.slice(0, 900),
  }));
}

function factorialDomains(language: string): string[] {
  const lang = language === "pt" ? "pt_PT" : language === "es" ? "es_ES" : "en_GB";
  return [`help.factorialhr.com/${lang}`, "help.factorialhr.com"];
}

async function searchClientWeb(
  clientName: string,
  industry: string,
): Promise<TavilyHit[]> {
  const query = `${clientName} ${industry} company employees HR workforce operations`;
  return tavilySearch(query, { maxResults: 5 });
}

async function searchFactorialDocs(
  query: string,
  language: string,
): Promise<TavilyHit[]> {
  return tavilySearch(query, {
    includeDomains: factorialDomains(language),
    maxResults: 4,
  });
}

const MODULE_SEARCH_TERMS: Record<string, string> = {
  recruitment: "recruitment ATS hiring candidates",
  onboarding: "onboarding employee documents signatures",
  "time-tracking": "time tracking attendance clock in mobile GPS",
  "time-off": "time off leave management approvals",
  documents: "employee documents digital files",
  communication: "announcements payslips employee portal",
  trainings: "trainings learning LMS",
  performance: "performance review evaluations",
  engagement: "engagement surveys one on one",
};

function formatExcerpts(hits: TavilyHit[]): string {
  return hits
    .filter((r, i, arr) => arr.findIndex((x) => x.url === r.url) === i)
    .map((r) => `### ${r.title}\nURL: ${r.url}\n${r.content}`)
    .join("\n\n");
}

const SYSTEM_PROMPT = `You are the Factorial pre-demo preparation assistant for sales discovery calls.

RULES:
- clientBullets: 4-6 specific bullets from research notes + client web excerpts ONLY. Include scale, workforce type (field/site/office), industry context. No generic marketing fluff.
- For Factorial modules: ONLY use feature names that appear verbatim in FACTORIAL DOCUMENTATION EXCERPTS.
- citedUrls: every help.factorialhr.com URL from factorial excerpts used in focusDemoAreas.
- discoveryEmphasis: 1-2 sentences per area id explaining WHY this area matters for THIS client (construction, distributed sites, etc.).
- scalingChallenge: one sentence — the real people-ops challenge at scale for this client (not "HR administration" alone).
- closingScript: 3-5 sentences, specific to client name and industry, referencing what you learned.
- Respond in the user's language.
- Output valid JSON only.

JSON schema:
{
  "clientBullets": ["string"],
  "closingScript": "string",
  "citedUrls": ["url"],
  "focusDemoAreas": [
    { "area": "Recruitment|Onboarding|Time & Attendance|Leave Management|Document Management|Internal Communication", "modules": ["exact feature names from docs"], "helpUrl": "specific help article url if available" }
  ],
  "discoveryAreaIds": ["recruitment|onboarding|attendance|leave|documents|communication"],
  "discoveryEmphasis": { "recruitment": "why it matters for this client", "attendance": "..." },
  "scalingChallenge": "string"
}

focusDemoAreas: exactly match focusModules (2-5 areas). modules: 3-5 items each from docs only.
discoveryAreaIds: 3-4 most relevant, ordered by priority.`;

async function generatePrep(
  input: PrepInput,
  researchNotes: string,
): Promise<{ ai: AIPrepPayload; searchMeta: SearchMeta }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured on the server.");
  }

  const ALLOWED_MODELS = new Set([
    "gpt-4o-mini",
    "gpt-4o",
    "gpt-4o-2024-08-06",
    "gpt-4o-mini-2024-07-18",
    "gpt-4.1-mini",
    "gpt-4.1-nano",
    "gpt-4-turbo",
  ]);
  const envModel = process.env.OPENAI_MODEL?.trim();
  const model =
    envModel && ALLOWED_MODELS.has(envModel) ? envModel : "gpt-4o-mini";

  const tavilyEnabled = Boolean(process.env.TAVILY_API_KEY);

  const factorialQueries = input.focusModules
    .map((m) => MODULE_SEARCH_TERMS[m] ?? m)
    .slice(0, 4);

  const [clientHits, ...factorialHitGroups] = await Promise.all([
    searchClientWeb(input.clientName, input.industry),
    ...factorialQueries.map((q) => searchFactorialDocs(q, input.language)),
  ]);

  const factorialHits = factorialHitGroups.flat();
  const clientContext = formatExcerpts(clientHits);
  const docContext = formatExcerpts(factorialHits);

  const searchMeta: SearchMeta = {
    tavilyEnabled,
    clientSourceCount: clientHits.length,
    factorialSourceCount: factorialHits.length,
    model,
  };

  const userMessage = `LANGUAGE: ${input.language}

CLIENT:
- Name: ${input.clientName}
- Industry: ${input.industry}
- Employees: ${input.employeeCount}
- Demo goal: ${input.demoGoal}
- Focus modules: ${input.focusModules.join(", ")}

RESEARCH NOTES (primary source for client facts):
${researchNotes.slice(0, 8000)}

CLIENT WEB RESEARCH (secondary — verify against notes, do not contradict notes):
${clientContext || "No web results. Use research notes only for client facts."}

FACTORIAL DOCUMENTATION EXCERPTS (only source for product/module names):
${docContext || "No factorial docs found. Use generic area names only. citedUrls must be empty."}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${err.slice(0, 200)}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from OpenAI");

  const parsed = JSON.parse(content) as AIPrepPayload;

  if (!parsed.clientBullets?.length || !parsed.closingScript || !parsed.focusDemoAreas?.length) {
    throw new Error("Invalid AI response structure");
  }

  const clientUrls = clientHits.map((h) => h.url);
  const factorialUrls = (parsed.citedUrls ?? []).length
    ? (parsed.citedUrls ?? [])
    : factorialHits.map((h) => h.url);

  const ai: AIPrepPayload = {
    clientBullets: parsed.clientBullets,
    closingScript: parsed.closingScript,
    citedUrls: [...new Set([...factorialUrls, ...clientUrls])],
    focusDemoAreas: parsed.focusDemoAreas,
    discoveryAreaIds: parsed.discoveryAreaIds,
    discoveryEmphasis: parsed.discoveryEmphasis,
    scalingChallenge: parsed.scalingChallenge,
  };

  return { ai, searchMeta };
}

function buildPrepMarkdown(
  input: PrepInput,
  ai: AIPrepPayload,
  searchMeta: SearchMeta,
): string {
  const { clientName, industry, employeeCount, demoGoal } = input;
  const emphasis = ai.discoveryEmphasis ?? {};
  const scaling =
    ai.scalingChallenge ??
    `scaling people operations across ${industry} sites while maintaining operational discipline`;

  const discoverySections = DISCOVERY_AREAS.map((area) => {
    const custom = emphasis[area.id];
    const questions = area.questions.map((q) => `  - ${q}`).join("\n");
    const openerText = "opener" in area && area.opener ? `\n> "${area.opener}"\n` : "";
    return `### ${area.title}\n${custom ? `**Why for ${clientName}:** ${custom}\n` : ""}${openerText}\n${questions}`;
  }).join("\n\n");

  const demoTable = ai.focusDemoAreas
    .map(
      (mod) =>
        `| ${mod.area} | ${mod.modules.join(", ")} | ${mod.helpUrl ?? "—"} |`,
    )
    .join("\n");

  const sourcesBlock =
    ai.citedUrls.length > 0
      ? ai.citedUrls.map((u) => `- ${u}`).join("\n")
      : "_No documentation URLs — add TAVILY_API_KEY on Vercel for Factorial help search._";

  return `# ${clientName} — Pre-Demo Preparation

## 1. Agenda (1 min)

**Today's Goal**

- Understand ${clientName}'s current HR operations
- Validate the main challenges impacting growth
- Show how similar ${industry} organizations solve these challenges
- Explore whether Factorial could support ${clientName}'s next stage of growth

_Demo goal: ${demoGoal}_

---

## 2. What We Learned About ${clientName} (2 min)

First, let me confirm that I understood your business correctly.

### ${clientName} Today

${ai.clientBullets.map((b) => `- ${b}`).join("\n")}

### What Makes ${clientName} Unique

${employeeCount} employees in ${industry}. ${scaling}

**Question:** "Would you say this accurately reflects your operation today?"

---

## 3. Discovery Section (15–20 min)

This becomes a conversation, not a presentation.

${discoverySections}

---

## 4. Executive Summary of Findings

_Fill live during the call._

**Challenge #1** — Example + Impact  
**Challenge #2** — Example + Impact  
**Challenge #3** — Example + Impact

**Question:** "Would you agree these are the main areas worth improving first?"

---

## 5. The Future State (Vision)

Imagine a Site Manager / Branch Manager

**Instead of:** WhatsApp · Excel · Paper forms · Email chains

**They can:** Approve leave · Review schedules · Track attendance · Access employee records · Manage onboarding

From one platform.

---

## 6. Factorial Demo

Only show what solves their pain.

| Focus area | Modules to show | Help article |
|------------|-----------------|--------------|
${demoTable}

---

## 7. Business Impact

- Reduce administrative work on site and in HQ
- Faster hiring for project-based workforce needs
- Improved visibility across sites and field teams
- More accurate attendance before payroll
- Faster onboarding for new site staff
- Better employee experience
- Higher HR scalability as ${clientName} expands

---

## 8. Commercial Discussion

- If we solved these challenges, what would success look like for ${clientName}?
- Who else should be involved in this evaluation?
- What is the ideal timeline for implementation?
- Are there any concerns we should address early?

---

## 9. Strong Closing

${ai.closingScript}

---

## Sources

${sourcesBlock}

_Tavily: ${searchMeta.tavilyEnabled ? "enabled" : "NOT configured"} · Client sources: ${searchMeta.clientSourceCount} · Factorial sources: ${searchMeta.factorialSourceCount} · Model: ${searchMeta.model}_

_Prepared by Victor Gutierrez · victor.gutierrez@factorial.co_
`;
}

function helpBase(language: string): string {
  return HELP_BASE_BY_LANG[language] ?? HELP_BASE_BY_LANG.en;
}

function replaceClient(text: string, name: string): string {
  return text.replace(/\[CLIENT\]/g, name);
}

function buildGuide(input: PrepInput, ai: AIPrepPayload) {
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

  const client: ClientProfile = {
    empresa: clientName,
    industry,
    employeeCount,
    demoGoal,
    focusModules,
  };

  return { client, guideSteps };
}

// --- handler ---

export const config = {
  maxDuration: 60,
};

interface RequestBody {
  clientName?: string;
  language?: string;
  industry?: string;
  employeeCount?: string;
  demoGoal?: string;
  focusModules?: string[];
  researchNotes?: string;
}

const FOCUS_OPTIONS = [
  "recruitment",
  "onboarding",
  "time-tracking",
  "time-off",
  "documents",
  "communication",
  "trainings",
  "performance",
  "engagement",
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = (req.body ?? {}) as RequestBody;

    const clientName = body.clientName?.trim();
    const researchNotes = body.researchNotes?.trim();

    if (!clientName) {
      return res.status(400).json({ error: "clientName is required" });
    }
    if (!researchNotes || researchNotes.length < 20) {
      return res.status(400).json({
        error: "researchNotes is required (minimum 20 characters)",
      });
    }

    const input: PrepInput = {
      clientName,
      language: body.language?.trim() || "en",
      industry: body.industry?.trim() || "Not specified",
      employeeCount: body.employeeCount?.trim() || "Not specified",
      demoGoal: body.demoGoal?.trim() || `Prepare a discovery-led Factorial demo for ${clientName}`,
      focusModules: (body.focusModules ?? ["recruitment", "time-tracking", "time-off"]).filter((m) =>
        FOCUS_OPTIONS.includes(m),
      ),
    };

    if (input.focusModules.length === 0) {
      input.focusModules = ["recruitment", "time-tracking", "time-off"];
    }

    const { ai, searchMeta } = await generatePrep(input, researchNotes);
    const { client, guideSteps } = buildGuide(input, ai);
    const prepMarkdown = buildPrepMarkdown(input, ai, searchMeta);

    return res.status(200).json({
      client,
      guideSteps,
      prepMarkdown,
      citedUrls: ai.citedUrls,
      meta: searchMeta,
    });
  } catch (error) {
    console.error("preparar error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: message });
  }
}
