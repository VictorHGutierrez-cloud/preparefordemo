import type { GuideStep } from "@/data/demoGuideSteps";

export interface ClientProfile {
  empresa: string;
  industry: string;
  employeeCount: string;
  demoGoal: string;
  focusModules: string[];
}

export interface PrepMeta {
  tavilyEnabled: boolean;
  clientSourceCount: number;
  factorialSourceCount: number;
  model: string;
}

export interface PrepSession {
  client: ClientProfile;
  guideSteps: GuideStep[];
  prepMarkdown: string;
  citedUrls: string[];
  meta?: PrepMeta;
  createdAt: string;
}

export interface PrepareFormData {
  clientName: string;
  language: string;
  industry: string;
  employeeCount: string;
  demoGoal: string;
  focusModules: string[];
  researchNotes: string;
}

export interface PrepareApiResponse {
  client: ClientProfile;
  guideSteps: GuideStep[];
  prepMarkdown: string;
  citedUrls: string[];
  clientSourceUrls?: string[];
  factorialSourceUrls?: string[];
  meta?: PrepMeta;
}
