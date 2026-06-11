import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  FOCUS_MODULE_IDS,
  FOCUS_TO_DISCOVERY_FROM_CATALOG,
  buildFollowUpQueries,
  buildTavilyQueriesForModules,
  catalogDemoAreas,
  formatCatalogForPrompt,
} from "./factorialModuleCatalog";

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

interface DemoArea {
  area: string;
  modules: string[];
  helpUrl?: string;
}

interface BusinessProfile {
  industryDetail: string;
  location: string;
  workforceType: string;
  corePainPoint: string;
  factorialValueProp: string;
}

interface EmployeeCountResearch {
  userProvided: string;
  foundInResearch: string | null;
  source: string | null;
  displayNote: string;
}

interface Icebreaker {
  greeting: string;
  rapport: string;
  framing: string;
}

interface DiscoveryBlock {
  id: string;
  title: string;
  painContext: string;
  questions: string[];
}

interface AIPrepPayload {
  clientBullets: string[];
  closingScript: string;
  citedUrls: string[];
  clientSourceUrls: string[];
  factorialSourceUrls: string[];
  focusDemoAreas: DemoArea[];
  discoveryAreaIds?: string[];
  discoveryEmphasis?: Record<string, string>;
  scalingChallenge?: string;
  businessProfile: BusinessProfile;
  employeeCountResearch: EmployeeCountResearch;
  icebreaker: Icebreaker;
  discoveryBlocks: DiscoveryBlock[];
  demoTransition: string;
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
  factorialQueriesRun: number;
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
  businessProfile?: BusinessProfile;
  employeeCountNote?: string;
  icebreaker?: Icebreaker;
  discoveryBlocks?: DiscoveryBlock[];
  demoTransition?: string;
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
  "Shift Planning": [],
  "Project Management": [],
  Expenses: [],
  "Trust Channel": [],
  "Accounts Payable": [],
  Procurement: [],
  "Space Management": [],
  "Software Management": [],
  "IT Inventory": [],
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

function mergeTavilyHits(...groups: TavilyHit[][]): TavilyHit[] {
  const seen = new Set<string>();
  const merged: TavilyHit[] = [];
  for (const group of groups) {
    for (const hit of group) {
      if (!seen.has(hit.url)) {
        seen.add(hit.url);
        merged.push(hit);
      }
    }
  }
  return merged;
}

async function searchClientProfile(
  clientName: string,
  industry: string,
): Promise<TavilyHit[]> {
  const industryPart = industry !== "Not specified" ? industry : "";
  const query = `${clientName} ${industryPart} company about industry location business model workforce`;
  return tavilySearch(query, { maxResults: 4 });
}

async function searchClientPortfolio(clientName: string, industry: string): Promise<TavilyHit[]> {
  const industryPart = industry !== "Not specified" ? industry : "";
  const query = `${clientName} ${industryPart} portfolio projects clients case studies craftsmanship`;
  return tavilySearch(query, { maxResults: 4 });
}

async function searchClientScale(clientName: string): Promise<TavilyHit[]> {
  const query = `${clientName} employees team size headcount LinkedIn workforce`;
  return tavilySearch(query, { maxResults: 4 });
}

async function searchFactorialDocs(
  query: string,
  language: string,
): Promise<TavilyHit[]> {
  return tavilySearch(query, {
    includeDomains: factorialDomains(language),
    maxResults: 5,
  });
}

function formatExcerpts(hits: TavilyHit[]): string {
  return hits
    .filter((r, i, arr) => arr.findIndex((x) => x.url === r.url) === i)
    .map((r) => `### ${r.title}\nURL: ${r.url}\n${r.content}`)
    .join("\n\n");
}

function isFactorialUrl(url: string): boolean {
  return url.includes("help.factorialhr.com") || url.includes("apidoc.factorialhr.com");
}

function uniqueUrls(urls: Array<string | undefined>): string[] {
  return [...new Set(urls.filter((u): u is string => Boolean(u)))];
}

const CANONICAL_DEMO_AREAS: Record<string, DemoArea> = catalogDemoAreas();

const FOCUS_TO_DISCOVERY = FOCUS_TO_DISCOVERY_FROM_CATALOG;

function cleanModuleLabel(raw: string): string {
  let label = raw.trim();
  label = label.replace(/^about (the )?/i, "");
  label = label.replace(/^how to /i, "");
  label = label.replace(/^access /i, "");
  label = label.replace(/ through .+$/i, "");
  label = label.replace(/ in (ATS|Factorial).*$/i, "");
  label = label.replace(/\.$/, "");
  if (label.length > 50) {
    label = label.split(/[,;]/)[0] ?? label.slice(0, 50);
  }
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function cleanModules(modules: string[], fallback: string[]): string[] {
  const cleaned = modules
    .map(cleanModuleLabel)
    .filter((m) => m.length > 2 && m.length < 55);
  const seen = new Set<string>();
  const merged = [...cleaned, ...fallback].filter((m) => {
    const key = m.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return merged.slice(0, 5);
}

function bestHelpUrl(
  areaName: string,
  focusKey: string,
  factorialHits: TavilyHit[],
  language: string,
): string {
  const keywords: Record<string, string[]> = {
    recruitment: ["recruitment", "ats", "hiring", "candidate"],
    onboarding: ["onboarding", "signature", "document"],
    "time-tracking": ["time-tracking", "attendance", "clock", "timesheet"],
    "time-off": ["time-off", "leave", "absence", "approval"],
    documents: ["document", "file", "employee"],
    communication: ["announcement", "payslip", "portal"],
    trainings: ["training", "lms", "learning"],
    performance: ["performance", "review"],
    engagement: ["survey", "engagement", "one-on-one"],
    shifts: ["shift", "schedule", "roster", "planning"],
    projects: ["project", "subproject", "billable"],
    expenses: ["expense", "receipt", "mileage", "card"],
    complaints: ["complaint", "whistleblower", "trust"],
    "accounts-payable": ["payable", "invoice", "vendor"],
    procurement: ["procurement", "purchase", "vendor"],
    space: ["space", "desk", "booking", "workplace"],
    "software-management": ["software", "saas", "license"],
    "it-inventory": ["inventory", "device", "hardware"],
  };

  const keys = keywords[focusKey] ?? [focusKey];
  const match = factorialHits.find(
    (h) =>
      isFactorialUrl(h.url) &&
      keys.some((k) => h.url.toLowerCase().includes(k) || h.title.toLowerCase().includes(k)),
  );
  if (match) return match.url;

  const areaMatch = factorialHits.find(
    (h) =>
      isFactorialUrl(h.url) &&
      h.title.toLowerCase().includes(areaName.toLowerCase().split(" ")[0] ?? ""),
  );
  if (areaMatch) return areaMatch.url;

  return helpBase(language);
}

function buildDemoAreasFromFocus(
  focusModules: string[],
  aiAreas: DemoArea[],
  factorialHits: TavilyHit[],
  language: string,
): DemoArea[] {
  const aiByName = new Map(aiAreas.map((a) => [a.area.toLowerCase(), a]));

  const areas: DemoArea[] = [];

  for (const focusKey of focusModules) {
    const canonical = CANONICAL_DEMO_AREAS[focusKey];
    if (!canonical) continue;

    const aiMatch =
      [...aiByName.entries()].find(([name]) =>
        name.includes(canonical.area.toLowerCase().split(" ")[0] ?? ""),
      )?.[1] ?? null;

    const modules = cleanModules(aiMatch?.modules ?? [], canonical.modules);
    const helpUrl =
      (aiMatch?.helpUrl && isFactorialUrl(aiMatch.helpUrl) ? aiMatch.helpUrl : undefined) ??
      bestHelpUrl(canonical.area, focusKey, factorialHits, language);

    areas.push({ area: canonical.area, modules, helpUrl });
  }

  return areas;
}

function defaultDiscoveryIds(focusModules: string[]): string[] {
  const ids = focusModules
    .map((m) => FOCUS_TO_DISCOVERY[m])
    .filter((id, i, arr) => id && arr.indexOf(id) === i);
  return ids.length > 0 ? ids.slice(0, 4) : ["recruitment", "attendance", "onboarding"];
}

function fallbackDiscoveryBlocks(input: PrepInput): DiscoveryBlock[] {
  const ids = defaultDiscoveryIds(input.focusModules);
  return DISCOVERY_AREAS.filter((a) => ids.includes(a.id)).map((area, i) => ({
    id: area.id,
    title: `Block ${String.fromCharCode(65 + i)}: ${area.title}`,
    painContext:
      `Understanding ${area.title.toLowerCase()} is critical for ${input.clientName} in ${input.industry}.`,
    questions: [...area.questions].slice(0, 4),
  }));
}

function normalizeAiPayload(parsed: Partial<AIPrepPayload>, input: PrepInput): AIPrepPayload {
  const userProvided =
    input.employeeCount !== "Not specified" ? input.employeeCount : "Not provided";

  const businessProfile: BusinessProfile = parsed.businessProfile ?? {
    industryDetail: input.industry,
    location: "Confirm on call",
    workforceType: "Confirm workforce mix on call",
    corePainPoint:
      parsed.scalingChallenge ??
      `Scaling people operations across ${input.industry} while maintaining operational discipline`,
    factorialValueProp:
      "Streamline HR operations, workforce visibility, and compliance in one platform",
  };

  const employeeCountResearch: EmployeeCountResearch = parsed.employeeCountResearch ?? {
    userProvided,
    foundInResearch: null,
    source: null,
    displayNote:
      userProvided !== "Not provided"
        ? `${userProvided} (you entered) — confirm on call`
        : "Headcount not confirmed — ask on call",
  };

  const icebreaker: Icebreaker = parsed.icebreaker ?? {
    greeting: `Hi [Lead's Name], great to connect with you today!`,
    rapport: `I spent some time researching ${input.clientName} before our call — looking forward to learning more about your operations.`,
    framing: `In ${input.industry}, your people are both your biggest asset and your biggest variable cost. The goal today is to understand how your HR and Operations teams manage the workforce daily, and see if Factorial can help. Shall we dive into a few quick questions?`,
  };

  const discoveryBlocks =
    parsed.discoveryBlocks && parsed.discoveryBlocks.length >= 2
      ? parsed.discoveryBlocks
      : fallbackDiscoveryBlocks(input);

  return {
    clientBullets: parsed.clientBullets ?? [],
    closingScript: parsed.closingScript ?? "",
    citedUrls: parsed.citedUrls ?? [],
    clientSourceUrls: [],
    factorialSourceUrls: [],
    focusDemoAreas: parsed.focusDemoAreas ?? [],
    discoveryAreaIds: parsed.discoveryAreaIds,
    discoveryEmphasis: parsed.discoveryEmphasis,
    scalingChallenge: parsed.scalingChallenge,
    businessProfile,
    employeeCountResearch,
    icebreaker,
    discoveryBlocks,
    demoTransition:
      parsed.demoTransition ??
      `What I want to show you in Factorial is how we bridge the gap between office planning and field execution — mobile clock-in with GPS, project-based time tracking, and centralized compliance documents. Let's jump into the platform.`,
  };
}

function formatClientEmployeeCount(research: EmployeeCountResearch): string {
  if (research.foundInResearch) {
    const src = research.source ? ` (${research.source})` : "";
    return `${research.foundInResearch}${src} — confirm on call`;
  }
  if (research.userProvided && research.userProvided !== "Not provided") {
    return `${research.userProvided} (you entered) — confirm on call`;
  }
  return "Confirm on call";
}

function finalizePayload(
  parsed: Partial<AIPrepPayload>,
  input: PrepInput,
  clientHits: TavilyHit[],
  factorialHits: TavilyHit[],
): AIPrepPayload {
  const normalized = normalizeAiPayload(parsed, input);
  const focusDemoAreas = buildDemoAreasFromFocus(
    input.focusModules,
    normalized.focusDemoAreas,
    factorialHits,
    input.language,
  );

  const factorialSourceUrls = uniqueUrls([
    ...factorialHits.map((h) => h.url).filter(isFactorialUrl),
    ...(normalized.citedUrls ?? []).filter(isFactorialUrl),
    ...focusDemoAreas.map((a) => a.helpUrl),
  ]);

  const clientSourceUrls = uniqueUrls([
    ...clientHits.map((h) => h.url),
    ...(normalized.citedUrls ?? []).filter((u) => !isFactorialUrl(u)),
  ]);

  const discoveryAreaIds =
    normalized.discoveryAreaIds?.length
      ? normalized.discoveryAreaIds
      : defaultDiscoveryIds(input.focusModules);

  return {
    ...normalized,
    citedUrls: [...factorialSourceUrls, ...clientSourceUrls],
    clientSourceUrls,
    factorialSourceUrls,
    focusDemoAreas,
    discoveryAreaIds,
  };
}

const SYSTEM_PROMPT = `You are the Factorial pre-demo preparation assistant for sales discovery calls.

QUALITY BAR (match this depth for construction, fit-out, retail, logistics, etc.):
- businessProfile: specific industry sub-segment, city/country if known, dual workforce (office vs field/site), ONE core pain tied to project margins or growth, Factorial angle tied to focus modules.
- icebreaker: warm greeting + compliment referencing REAL portfolio/projects ONLY if in research notes or web excerpts; otherwise honest generic opener. framing: people as asset + goal of today's chat.
- discoveryBlocks: 3-4 blocks named "Block A: ..." aligned to focus modules and industry. Each block: painContext (why this matters in THEIR sector) + 2-4 discovery questions in commercial language. Mark the hardest question with prefix "(Pressing the pain)".
- demoTransition: bridge from their manual/paper pain to Factorial demo (GPS clock-in, project tagging, document compliance — only what docs support).
- NEVER use empty phrases like "leverage Factorial's solutions".

RULES:
- clientBullets: 4-6 specific bullets from research notes + client web excerpts ONLY. Include workforce type, sites/projects, industry context.
- employeeCountResearch: NEVER invent headcount. foundInResearch only if explicitly in notes/web; else null. displayNote always says to confirm on call if uncertain.
- For Factorial modules: short demo labels (2-5 words) from FACTORIAL DOCUMENTATION EXCERPTS only. NEVER copy article titles.
- factorialValueProp: may reference bundle hints from MODULE CATALOG (no prices). Map construction/field pains to Time Tracking + Shifts + Projects when selected.
- citedUrls: only help.factorialhr.com URLs from factorial excerpts.
- closingScript: 3-5 sentences, specific to client name and industry.
- Respond in the user's language.
- Output valid JSON only.

JSON schema:
{
  "businessProfile": {
    "industryDetail": "string",
    "location": "string",
    "workforceType": "string",
    "corePainPoint": "string",
    "factorialValueProp": "string"
  },
  "employeeCountResearch": {
    "userProvided": "string",
    "foundInResearch": "string or null",
    "source": "string or null",
    "displayNote": "string"
  },
  "icebreaker": {
    "greeting": "Hi [Lead's Name], ...",
    "rapport": "portfolio compliment or honest opener",
    "framing": "people as asset + today's goal"
  },
  "discoveryBlocks": [
    { "id": "block-a", "title": "Block A: Project-Based Time Tracking", "painContext": "...", "questions": ["...", "(Pressing the pain) ..."] }
  ],
  "demoTransition": "string",
  "clientBullets": ["string"],
  "closingScript": "string",
  "citedUrls": ["url"],
  "focusDemoAreas": [
    { "area": "Recruitment|Onboarding|Time & Attendance|Leave Management|Document Management|Internal Communication", "modules": ["short labels"], "helpUrl": "url" }
  ],
  "discoveryAreaIds": ["recruitment|onboarding|attendance|leave|documents|communication"],
  "scalingChallenge": "string"
}

focusDemoAreas: one entry per focus module. discoveryBlocks: 3-4 blocks matching focusModules and industry pains.`;

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

  const factorialQueries = buildTavilyQueriesForModules(input.focusModules);
  let factorialQueriesRun = factorialQueries.length;

  const [profileHits, portfolioHits, scaleHits, ...factorialHitGroups] = await Promise.all([
    searchClientProfile(input.clientName, input.industry),
    searchClientPortfolio(input.clientName, input.industry),
    searchClientScale(input.clientName),
    ...factorialQueries.map((q) => searchFactorialDocs(q, input.language)),
  ]);

  const clientHits = mergeTavilyHits(profileHits, portfolioHits, scaleHits);
  let factorialHits = factorialHitGroups.flat();

  if (factorialHits.length < 6 && tavilyEnabled) {
    const followUp = buildFollowUpQueries(input.industry, input.focusModules);
    factorialQueriesRun += followUp.length;
    const followUpGroups = await Promise.all(
      followUp.map((q) => searchFactorialDocs(q, input.language)),
    );
    factorialHits = mergeTavilyHits(factorialHits, ...followUpGroups);
  }

  const profileContext = formatExcerpts(profileHits);
  const portfolioContext = formatExcerpts(portfolioHits);
  const scaleContext = formatExcerpts(scaleHits);
  const docContext = formatExcerpts(factorialHits);
  const catalogContext = formatCatalogForPrompt(input.focusModules);

  const searchMeta: SearchMeta = {
    tavilyEnabled,
    clientSourceCount: clientHits.length,
    factorialSourceCount: factorialHits.length,
    factorialQueriesRun,
    model,
  };

  const userProvidedEmployees =
    input.employeeCount !== "Not specified" ? input.employeeCount : "Not provided";

  const userMessage = `LANGUAGE: ${input.language}

CLIENT:
- Name: ${input.clientName}
- Industry: ${input.industry}
- Employees (user entered): ${userProvidedEmployees}
- Demo goal: ${input.demoGoal}
- Focus modules: ${input.focusModules.join(", ")}

RESEARCH NOTES (primary source for client facts — do not contradict):
${researchNotes.slice(0, 8000)}

CLIENT PROFILE RESEARCH (industry, location, business model):
${profileContext || "No profile results. Use research notes only."}

CLIENT PORTFOLIO / PROJECTS (for icebreaker rapport — only cite if found here or in notes):
${portfolioContext || "No portfolio results. Use honest generic icebreaker."}

CLIENT SCALE / HEADCOUNT (extract employee count only if explicitly stated):
${scaleContext || "No headcount found. Set foundInResearch to null."}

FACTORIAL MODULE CATALOG (commercial reference — verify product names in excerpts below):
${catalogContext}

FACTORIAL DOCUMENTATION EXCERPTS (only source for product/module names and citedUrls):
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
      max_tokens: 4096,
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

  const parsed = JSON.parse(content) as Partial<AIPrepPayload>;

  if (!parsed.clientBullets?.length || !parsed.closingScript || !parsed.focusDemoAreas?.length) {
    throw new Error("Invalid AI response structure");
  }

  const ai = finalizePayload(parsed, input, clientHits, factorialHits);

  return { ai, searchMeta };
}

function buildPrepMarkdown(
  input: PrepInput,
  ai: AIPrepPayload,
  searchMeta: SearchMeta,
): string {
  const { clientName, industry, demoGoal } = input;
  const scaling =
    ai.scalingChallenge ??
    `scaling people operations across ${industry} sites while maintaining operational discipline`;

  const bp = ai.businessProfile;
  const discoverySections = ai.discoveryBlocks
    .map((block) => {
      const questions = block.questions.map((q) => `  - ${q}`).join("\n");
      return `### ${block.title}\n\n${block.painContext}\n\n${questions}`;
    })
    .join("\n\n");

  const demoTable = ai.focusDemoAreas
    .map((mod) => {
      const help =
        mod.helpUrl && isFactorialUrl(mod.helpUrl)
          ? `[Help article](${mod.helpUrl})`
          : "—";
      return `| ${mod.area} | ${mod.modules.join(" · ")} | ${help} |`;
    })
    .join("\n");

  const factorialSourcesBlock =
    ai.factorialSourceUrls.length > 0
      ? ai.factorialSourceUrls.map((u) => `- ${u}`).join("\n")
      : "_No Factorial help articles found — verify TAVILY_API_KEY._";

  const clientSourcesBlock =
    ai.clientSourceUrls.length > 0
      ? ai.clientSourceUrls.map((u) => `- ${u}`).join("\n")
      : "_No client web sources — rely on your research notes._";

  return `# ${clientName} — Pre-Demo Preparation

## 1. Agenda (1 min)

**Today's Goal**

- Understand ${clientName}'s current HR operations
- Validate the main challenges impacting growth
- Show how similar ${industry} organizations solve these challenges
- Explore whether Factorial could support ${clientName}'s next stage of growth

_Demo goal: ${demoGoal}_

---

## 2. Business Profile & Angle

**Industry:** ${bp.industryDetail}

**Location:** ${bp.location}

**Workforce:** ${bp.workforceType}

**Core pain:** ${bp.corePainPoint}

**Factorial angle:** ${bp.factorialValueProp}

**Employees:** ${ai.employeeCountResearch.displayNote}

---

## 2b. Warm Greeting & Rapport

> ${ai.icebreaker.greeting}

> ${ai.icebreaker.rapport}

> ${ai.icebreaker.framing}

---

## 2c. What We Learned About ${clientName} (2 min)

### ${clientName} Today

${ai.clientBullets.map((b) => `- ${b}`).join("\n")}

### Scaling challenge

${scaling}

**Question:** "Would you say this accurately reflects your operation today?"

---

## 3. Deep Discovery (15–20 min)

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

## 5b. Transition to Demo

${ai.demoTransition}

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

### Factorial documentation
${factorialSourcesBlock}

### Client research (web)
${clientSourcesBlock}

_Tavily: ${searchMeta.tavilyEnabled ? "enabled" : "NOT configured"} · Factorial URLs: ${ai.factorialSourceUrls.length} · Client URLs: ${ai.clientSourceUrls.length} · Model: ${searchMeta.model}_

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
  const { clientName, language, demoGoal, focusModules } = input;
  const helpUrl = helpBase(language);
  const employeeDisplay = formatClientEmployeeCount(ai.employeeCountResearch);

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
        ...(ai.icebreaker.framing ? [ai.icebreaker.framing] : []),
      ],
      icebreaker: ai.icebreaker,
    },
    {
      id: "client-context",
      index: 2,
      kind: "clientContext",
      title: "What We Learned",
      subtitle: `${clientName} today — ${employeeDisplay}`,
      duration: "2 min",
      bullets: ai.clientBullets,
      validationQuestion: "Would you say this accurately reflects your operation today?",
      businessProfile: ai.businessProfile,
      employeeCountNote: ai.employeeCountResearch.displayNote,
    },
    {
      id: "discovery",
      index: 3,
      kind: "discovery",
      title: "Discovery",
      subtitle: "A conversation, not a presentation",
      duration: "15–20 min",
      discoveryBlocks: ai.discoveryBlocks,
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
      demoTransition: ai.demoTransition,
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
    industry: ai.businessProfile.industryDetail || input.industry,
    employeeCount: employeeDisplay,
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

const FOCUS_OPTIONS = FOCUS_MODULE_IDS;

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

    if (!clientName) {
      return res.status(400).json({ error: "clientName is required" });
    }

    const researchNotes =
      body.researchNotes?.trim() ||
      `Research from web only for ${clientName}. No prior SDR notes — infer industry, workforce, and scale from public sources.`;

    const input: PrepInput = {
      clientName,
      language: body.language?.trim() || "en",
      industry: body.industry?.trim() || "Not specified",
      employeeCount: body.employeeCount?.trim() || "Not specified",
      demoGoal: body.demoGoal?.trim() || `Prepare a discovery-led Factorial demo for ${clientName}`,
      focusModules: (body.focusModules ?? ["time-tracking", "time-off", "shifts"]).filter((m) =>
        FOCUS_OPTIONS.includes(m),
      ),
    };

    if (input.focusModules.length === 0) {
      input.focusModules = ["time-tracking", "time-off", "shifts"];
    }

    const { ai, searchMeta } = await generatePrep(input, researchNotes);
    const { client, guideSteps } = buildGuide(input, ai);
    const prepMarkdown = buildPrepMarkdown(input, ai, searchMeta);

    return res.status(200).json({
      client,
      guideSteps,
      prepMarkdown,
      citedUrls: ai.citedUrls,
      clientSourceUrls: ai.clientSourceUrls,
      factorialSourceUrls: ai.factorialSourceUrls,
      meta: searchMeta,
    });
  } catch (error) {
    console.error("preparar error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: message });
  }
}
