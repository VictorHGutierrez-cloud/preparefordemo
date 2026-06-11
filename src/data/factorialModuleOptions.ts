/**
 * Focus module options for /preparar UI — mirrors api/factorialModuleCatalog.ts
 */

export interface FocusModuleOption {
  id: string;
  label: string;
}

export const FOCUS_MODULE_GROUPS: Array<{ title: string; modules: FocusModuleOption[] }> = [
  {
    title: "People & Core",
    modules: [
      { id: "recruitment", label: "Recruitment" },
      { id: "onboarding", label: "Onboarding" },
      { id: "documents", label: "Documents" },
      { id: "communication", label: "Communication" },
    ],
  },
  {
    title: "Time & Projects",
    modules: [
      { id: "time-tracking", label: "Time & Attendance" },
      { id: "time-off", label: "Leave Management" },
      { id: "shifts", label: "Shift Management" },
      { id: "projects", label: "Projects" },
    ],
  },
  {
    title: "Talent",
    modules: [
      { id: "trainings", label: "Trainings" },
      { id: "performance", label: "Performance" },
      { id: "engagement", label: "Engagement" },
    ],
  },
  {
    title: "Finance",
    modules: [
      { id: "expenses", label: "Expenses" },
      { id: "complaints", label: "Complaints Channel" },
      { id: "accounts-payable", label: "Accounts Payable" },
      { id: "procurement", label: "Procurement" },
    ],
  },
  {
    title: "Workplace",
    modules: [
      { id: "space", label: "Space" },
      { id: "software-management", label: "Software Management" },
      { id: "it-inventory", label: "IT Inventory" },
    ],
  },
];

export const ALL_FOCUS_MODULE_IDS = FOCUS_MODULE_GROUPS.flatMap((g) =>
  g.modules.map((m) => m.id),
);
