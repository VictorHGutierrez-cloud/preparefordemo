export const DISCOVERY_AREAS = [
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

export const HELP_BASE_BY_LANG: Record<string, string> = {
  en: "https://help.factorialhr.com/en_GB/",
  pt: "https://help.factorialhr.com/pt_PT/",
  es: "https://help.factorialhr.com/es_ES/",
  de: "https://help.factorialhr.com/de_DE/",
  fr: "https://help.factorialhr.com/fr_FR/",
  it: "https://help.factorialhr.com/it_IT/",
};
