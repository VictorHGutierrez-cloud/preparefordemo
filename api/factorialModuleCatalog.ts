/**
 * Condensed Factorial module catalog for pre-demo prep.
 * Source: docs/factorial-funcionalidades-modulos.md (internal commercial reference).
 * Product UI names in demo output must still come from help center excerpts.
 */

export interface FactorialModuleEntry {
  id: string;
  label: string;
  area: string;
  group: "people" | "time" | "talent" | "finance" | "workplace";
  painTriggers: string[];
  demoHighlights: string[];
  tavilyQueries: string[];
  discoveryAreaId: string;
  bundleHint?: string;
}

export const FACTORIAL_MODULE_CATALOG: FactorialModuleEntry[] = [
  {
    id: "recruitment",
    label: "Recruitment",
    area: "Recruitment",
    group: "people",
    painTriggers: ["manual hiring", "high applicant volume", "slow time-to-hire"],
    demoHighlights: [
      "ATS job requisitions",
      "Candidate pipeline and hiring stages",
      "Hiring manager collaboration",
      "Referrals and career page",
      "Interview scheduling",
      "Time-to-hire insights",
    ],
    tavilyQueries: [
      "recruitment ATS hiring candidates pipeline job requisitions",
      "recruitment interview scheduling offer letter hiring managers",
    ],
    discoveryAreaId: "recruitment",
    bundleHint: "Recruitment add-on",
  },
  {
    id: "onboarding",
    label: "Onboarding",
    area: "Onboarding",
    group: "people",
    painTriggers: ["paper contracts", "manual document collection", "slow onboarding"],
    demoHighlights: [
      "Electronic signatures",
      "Document collection tasks",
      "Employee portal",
      "Onboarding workflows",
      "Automated document generation",
    ],
    tavilyQueries: [
      "onboarding electronic signatures document collection employee",
      "onboarding workflows tasks new hire documents",
    ],
    discoveryAreaId: "onboarding",
    bundleHint: "Core",
  },
  {
    id: "documents",
    label: "Documents",
    area: "Document Management",
    group: "people",
    painTriggers: ["scattered files", "compliance risk", "manual document chase"],
    demoHighlights: [
      "Digital employee files",
      "Document templates with variables",
      "Permissions and access control",
      "Compliance document storage",
      "Document filters and status",
    ],
    tavilyQueries: [
      "employee documents digital files permissions storage",
      "document templates onboarding PDF variables",
    ],
    discoveryAreaId: "documents",
    bundleHint: "Core",
  },
  {
    id: "communication",
    label: "Communication",
    area: "Internal Communication",
    group: "people",
    painTriggers: ["email chains", "manual payslips", "low employee engagement"],
    demoHighlights: [
      "Announcements",
      "Payslips distribution",
      "Employee self-service portal",
      "Company policies access",
      "Employee directory",
    ],
    tavilyQueries: [
      "announcements employee portal payslips self service",
      "employee directory company policies communication",
    ],
    discoveryAreaId: "communication",
    bundleHint: "Core",
  },
  {
    id: "time-tracking",
    label: "Time & Attendance",
    area: "Time & Attendance",
    group: "time",
    painTriggers: ["field workforce", "multiple sites", "manual timesheets", "payroll errors"],
    demoHighlights: [
      "Mobile clock-in and clock-out",
      "GPS geolocation on mobile",
      "Real-time attendance dashboard",
      "Timesheet approval",
      "Overtime and bank of hours",
      "QR code clock-in",
    ],
    tavilyQueries: [
      "mobile clock in geolocation GPS attendance site",
      "timesheet approval attendance dashboard overtime",
    ],
    discoveryAreaId: "attendance",
    bundleHint: "Starter People / Planning",
  },
  {
    id: "time-off",
    label: "Leave Management",
    area: "Leave Management",
    group: "time",
    painTriggers: ["WhatsApp approvals", "branch visibility", "staffing gaps"],
    demoHighlights: [
      "Leave requests on desktop and mobile",
      "Approval workflows",
      "Leave calendar and team visibility",
      "Policy and balance management",
      "Shift-aware leave recommendations",
    ],
    tavilyQueries: [
      "time off leave management approvals calendar",
      "leave policy balances absence requests mobile",
    ],
    discoveryAreaId: "leave",
    bundleHint: "Starter People / Planning",
  },
  {
    id: "shifts",
    label: "Shift Management",
    area: "Shift Planning",
    group: "time",
    painTriggers: ["rotating schedules", "site deployments", "shift swaps", "coverage gaps"],
    demoHighlights: [
      "Create and assign shifts in bulk",
      "Shift templates and rotations",
      "Shift swap via mobile app",
      "Coverage by work area",
      "Schedule visibility for managers",
    ],
    tavilyQueries: [
      "shift planning schedule roster assign employees",
      "shift swap rotation templates coverage work areas",
    ],
    discoveryAreaId: "attendance",
    bundleHint: "Starter Planning",
  },
  {
    id: "projects",
    label: "Projects",
    area: "Project Management",
    group: "time",
    painTriggers: ["project labor cost", "billable hours", "multi-site projects"],
    demoHighlights: [
      "Project and subproject structure",
      "Track hours per project",
      "Project cost per employee",
      "Clock-in widget for projects",
      "Project tasks and planning",
      "Billable vs internal projects",
    ],
    tavilyQueries: [
      "project time tracking cost per employee hours",
      "projects subprojects clock in widget tasks budget",
    ],
    discoveryAreaId: "attendance",
    bundleHint: "Starter Consulting / Consulting PRO",
  },
  {
    id: "trainings",
    label: "Trainings",
    area: "Trainings",
    group: "talent",
    painTriggers: ["compliance training", "manual certificates", "scattered LMS"],
    demoHighlights: [
      "Learning management (LMS)",
      "Automatic certificates",
      "Compliance training tracking",
      "Training assignments",
    ],
    tavilyQueries: [
      "trainings learning management LMS courses certificates",
      "compliance training assignments employees",
    ],
    discoveryAreaId: "communication",
    bundleHint: "Starter Essentials / Planning PRO",
  },
  {
    id: "performance",
    label: "Performance",
    area: "Performance",
    group: "talent",
    painTriggers: ["annual reviews on spreadsheets", "no goal tracking", "inconsistent evaluations"],
    demoHighlights: [
      "Performance review cycles",
      "Peer and manager reviews",
      "Goal tracking",
      "Competency frameworks",
      "Review templates",
    ],
    tavilyQueries: [
      "performance review evaluations goals competencies",
      "performance cycles peer review manager feedback",
    ],
    discoveryAreaId: "communication",
    bundleHint: "Starter Productivity / Planning PRO",
  },
  {
    id: "engagement",
    label: "Engagement",
    area: "Engagement",
    group: "talent",
    painTriggers: ["low morale visibility", "no pulse checks", "disconnected teams"],
    demoHighlights: [
      "Employee surveys",
      "eNPS tracking",
      "One-on-one meetings",
      "Pulse check-ins",
      "Engagement reports",
    ],
    tavilyQueries: [
      "engagement surveys eNPS employee feedback",
      "one on one meetings pulse check employee sentiment",
    ],
    discoveryAreaId: "communication",
    bundleHint: "Starter Operations / Planning PRO",
  },
  {
    id: "expenses",
    label: "Expenses",
    area: "Expenses",
    group: "finance",
    painTriggers: ["receipt chaos", "manual expense reports", "no budget control"],
    demoHighlights: [
      "Expense submission mobile and desktop",
      "Receipt OCR scan",
      "Approval workflows",
      "Factorial Cards",
      "Project-linked expenses",
      "Spending dashboard",
    ],
    tavilyQueries: [
      "employee expenses approval receipt OCR mileage",
      "expense reports Factorial cards spending dashboard",
    ],
    discoveryAreaId: "documents",
    bundleHint: "Spending Management add-on",
  },
  {
    id: "complaints",
    label: "Complaints Channel",
    area: "Trust Channel",
    group: "finance",
    painTriggers: ["whistleblower compliance", "anonymous reporting", "EU directive"],
    demoHighlights: [
      "Branded complaints channel",
      "Anonymous or identified submissions",
      "Complaint officer workflow",
      "Status tracking with secure code",
      "Whistleblower law compliance",
    ],
    tavilyQueries: [
      "complaints channel whistleblower anonymous reporting",
      "trust channel complaint officer workflow",
    ],
    discoveryAreaId: "documents",
    bundleHint: "Complaints channel add-on",
  },
  {
    id: "accounts-payable",
    label: "Accounts Payable",
    area: "Accounts Payable",
    group: "finance",
    painTriggers: ["invoice processing", "vendor management", "manual reconciliation"],
    demoHighlights: [
      "Invoice management",
      "OCR invoice digitization",
      "Smart bank reconciliation",
      "Vendor management",
      "Export to Excel",
    ],
    tavilyQueries: [
      "accounts payable invoice management OCR digitization",
      "vendor management bank reconciliation invoices",
    ],
    discoveryAreaId: "documents",
    bundleHint: "Accounts Payable add-on",
  },
  {
    id: "procurement",
    label: "Procurement",
    area: "Procurement",
    group: "finance",
    painTriggers: ["purchase order chaos", "vendor onboarding", "approval bottlenecks"],
    demoHighlights: [
      "Purchase requests and orders",
      "Vendor management",
      "Approval workflows",
      "Invoice OCR and reconciliation",
      "Mobile inbox for approvals",
    ],
    tavilyQueries: [
      "procurement purchase orders vendors approvals",
      "purchase request workflow invoice management",
    ],
    discoveryAreaId: "documents",
    bundleHint: "Procurement add-on",
  },
  {
    id: "space",
    label: "Space",
    area: "Space Management",
    group: "workplace",
    painTriggers: ["hybrid office", "desk booking", "workspace utilization"],
    demoHighlights: [
      "Desk and workspace booking",
      "Real-time capacity insights",
      "Mobile reservations",
      "External user bookings",
      "Booking exports",
    ],
    tavilyQueries: [
      "space management desk booking workplace hybrid",
      "workspace booking capacity hot desk reservation",
    ],
    discoveryAreaId: "communication",
    bundleHint: "Space add-on",
  },
  {
    id: "software-management",
    label: "Software Management",
    area: "Software Management",
    group: "workplace",
    painTriggers: ["SaaS sprawl", "unused licenses", "renewal surprises"],
    demoHighlights: [
      "Software license tracking",
      "Contract renewal alerts",
      "Usage insights per employee",
      "Payment approval workflows",
      "SaaS cost control",
    ],
    tavilyQueries: [
      "software management SaaS licenses subscriptions",
      "software access tracking renewal notifications costs",
    ],
    discoveryAreaId: "documents",
    bundleHint: "Software Management add-on",
  },
  {
    id: "it-inventory",
    label: "IT Inventory",
    area: "IT Inventory",
    group: "workplace",
    painTriggers: ["device tracking", "onboarding hardware", "warranty gaps"],
    demoHighlights: [
      "Device assign and retire workflows",
      "Bulk device import",
      "Serial numbers and warranties",
      "Assign devices to employees",
      "Handover documents",
    ],
    tavilyQueries: [
      "IT inventory devices assign employees hardware",
      "device management warranty serial number handover",
    ],
    discoveryAreaId: "documents",
    bundleHint: "IT Inventory add-on",
  },
];

export const FOCUS_MODULE_IDS = FACTORIAL_MODULE_CATALOG.map((m) => m.id);

const catalogById = new Map(FACTORIAL_MODULE_CATALOG.map((m) => [m.id, m]));

export function getModuleEntry(id: string): FactorialModuleEntry | undefined {
  return catalogById.get(id);
}

export function getModulesForFocus(focusIds: string[]): FactorialModuleEntry[] {
  return focusIds.map((id) => catalogById.get(id)).filter((m): m is FactorialModuleEntry => Boolean(m));
}

export function buildTavilyQueriesForModules(focusIds: string[]): string[] {
  const queries: string[] = [];
  for (const id of focusIds) {
    const entry = catalogById.get(id);
    if (entry) queries.push(...entry.tavilyQueries);
  }
  return queries;
}

export function formatCatalogForPrompt(focusIds: string[]): string {
  return getModulesForFocus(focusIds)
    .map((m) => {
      const lines = [
        `### ${m.label} (${m.id})`,
        `Bundle hint: ${m.bundleHint ?? "—"}`,
        `Pain triggers: ${m.painTriggers.join("; ")}`,
        `Demo highlights (commercial — verify product names in help excerpts):`,
        ...m.demoHighlights.map((h) => `- ${h}`),
      ];
      return lines.join("\n");
    })
    .join("\n\n");
}

export function buildFollowUpQueries(industry: string, focusIds: string[]): string[] {
  const pains = getModulesForFocus(focusIds).flatMap((m) => m.painTriggers);
  const industryPart = industry !== "Not specified" ? industry : "workforce HR";
  return [
    `Factorial help ${industryPart} ${pains[0] ?? "attendance"} ${focusIds[0] ?? "time tracking"}`,
    `Factorial help center ${focusIds.slice(0, 2).join(" ")} mobile field employees`,
    `help.factorialhr ${industryPart} geofencing project time tracking`,
  ];
}

export function catalogDemoAreas(): Record<string, { area: string; modules: string[] }> {
  const areas: Record<string, { area: string; modules: string[] }> = {};
  for (const m of FACTORIAL_MODULE_CATALOG) {
    areas[m.id] = { area: m.area, modules: m.demoHighlights.slice(0, 4) };
  }
  return areas;
}

export const FOCUS_TO_DISCOVERY_FROM_CATALOG: Record<string, string> = Object.fromEntries(
  FACTORIAL_MODULE_CATALOG.map((m) => [m.id, m.discoveryAreaId]),
);
