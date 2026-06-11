/**
 * Pre-demo guide — 9 sections (Jirani model).
 * Replace placeholders from transcricao/reuniao.txt and cliente.config.json.
 */

import { FACTORIAL_DEMO_VIDEOS } from "./factorialDemoVideos";

export interface DemoVideo {
  label: string;
  url: string;
}

export interface DiscoveryArea {
  id: string;
  title: string;
  opener?: string;
  questions: string[];
}

export interface DemoModule {
  area: string;
  modules: string[];
  videos: DemoVideo[];
  helpUrl?: string;
}

export type GuideStepKind =
  | "agenda"
  | "clientContext"
  | "discovery"
  | "executiveSummary"
  | "futureState"
  | "factorialDemo"
  | "businessImpact"
  | "commercial"
  | "closing";

export interface GuideStep {
  id: string;
  index: number;
  kind: GuideStepKind;
  title: string;
  subtitle: string;
  duration?: string;
  bullets?: string[];
  validationQuestion?: string;
  discoveryAreas?: DiscoveryArea[];
  beforeItems?: string[];
  afterItems?: string[];
  demoModules?: DemoModule[];
  outcomes?: string[];
  questions?: string[];
  closingScript?: string;
}

export const DISCOVERY_AREAS: DiscoveryArea[] = [
  {
    id: "recruitment",
    title: "Recruitment & Hiring",
    opener: "Before we look at solutions, I'd love to understand how you're currently attracting and hiring talent.",
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
];

export const DEMO_GUIDE_STEPS: GuideStep[] = [
  {
    id: "agenda",
    index: 1,
    kind: "agenda",
    title: "Agenda",
    subtitle: "Today's goal",
    duration: "1 min",
    bullets: [
      "Understand [CLIENT]'s current HR operations",
      "Validate the main challenges impacting growth",
      "Show how similar organizations solve these challenges",
      "Explore whether Factorial could support [CLIENT]'s next stage of growth",
    ],
  },
  {
    id: "client-context",
    index: 2,
    kind: "clientContext",
    title: "What We Learned",
    subtitle: "[CLIENT] today — confirm your understanding",
    duration: "2 min",
    bullets: [
      "[Operating scale — regions, employees, branches]",
      "[Business model and workforce types]",
      "[Current HR context from research]",
      "Growing a distributed workforce at this scale is significantly more complex than a single office.",
    ],
    validationQuestion: "Would you say this accurately reflects your operation today?",
  },
  {
    id: "discovery",
    index: 3,
    kind: "discovery",
    title: "Discovery",
    subtitle: "A conversation, not a presentation",
    duration: "15–20 min",
    discoveryAreas: DISCOVERY_AREAS,
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
    demoModules: [
      {
        area: "Recruitment",
        modules: ["Candidate pipeline", "Hiring stages", "Hiring manager collaboration", "Offer management"],
        videos: [FACTORIAL_DEMO_VIDEOS.recruitment.atsAiMatch],
        helpUrl: "https://help.factorialhr.com/pt_PT/",
      },
      {
        area: "Onboarding",
        modules: ["Electronic signatures", "Document collection", "Employee portal", "Task automation"],
        videos: [],
        helpUrl: "https://help.factorialhr.com/pt_PT/",
      },
      {
        area: "Time & Attendance",
        modules: ["Mobile clock in", "GPS validation", "Attendance dashboard", "Timesheets"],
        videos: [],
        helpUrl: "https://help.factorialhr.com/pt_PT/",
      },
      {
        area: "Leave Management",
        modules: ["Approval workflows", "Leave calendar", "Team visibility"],
        videos: [],
        helpUrl: "https://help.factorialhr.com/pt_PT/",
      },
      {
        area: "Document Management",
        modules: ["Digital employee files", "Permissions", "Compliance storage"],
        videos: [],
        helpUrl: "https://help.factorialhr.com/pt_PT/",
      },
      {
        area: "Internal Communication",
        modules: ["Payslips", "Announcements", "Employee self service"],
        videos: [],
        helpUrl: "https://help.factorialhr.com/pt_PT/",
      },
    ],
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
      "Higher HR scalability as [CLIENT] expands",
    ],
  },
  {
    id: "commercial",
    index: 8,
    kind: "commercial",
    title: "Commercial Discussion",
    subtitle: "Next steps in the evaluation",
    questions: [
      "If we solved these challenges, what would success look like for [CLIENT]?",
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
    closingScript:
      "Based on what we've discussed today, my impression is that [CLIENT]'s challenge is not simply HR administration. The real challenge is scaling people operations with the same efficiency that has allowed the business to expand. What excites me is that the foundations are already there. The opportunity now is creating a single source of truth for every employee, manager, and branch across the organization. From what we've heard today, I believe Factorial could play a meaningful role in supporting that journey.",
  },
];
