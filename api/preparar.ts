import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generatePrep } from "./_lib/openai";
import { buildGuide, type PrepInput } from "./_lib/mergeGuide";

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
      focusModules: (body.focusModules ?? ["recruitment", "time-tracking", "time-off"]).filter(
        (m) => FOCUS_OPTIONS.includes(m),
      ),
    };

    if (input.focusModules.length === 0) {
      input.focusModules = ["recruitment", "time-tracking", "time-off"];
    }

    const ai = await generatePrep(input, researchNotes);
    const { client, guideSteps } = buildGuide(input, ai);

    return res.status(200).json({
      client,
      guideSteps,
      prepMarkdown: ai.prepMarkdown,
      citedUrls: ai.citedUrls,
    });
  } catch (error) {
    console.error("preparar error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: message });
  }
}
