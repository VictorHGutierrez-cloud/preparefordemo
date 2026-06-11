import type { AIPrepPayload, PrepInput } from "./mergeGuide";
import { searchFactorialDocs } from "./tavily";

const SYSTEM_PROMPT = `You are the Factorial pre-demo preparation assistant.

RULES:
- Use ONLY facts from the user's research notes about the client. Do not invent client details.
- For Factorial product capabilities: only mention features supported by the documentation excerpts provided.
- If documentation does not confirm a feature, do not mention it.
- Include citedUrls with exact help center links from the documentation excerpts when making product claims.
- Respond in the language specified by the user (en, pt, es, de, fr, it).
- Output valid JSON only, matching the schema exactly.

JSON schema:
{
  "clientBullets": ["4 bullet points about the client from research notes only"],
  "closingScript": "2-4 sentences adapted to client and industry",
  "prepMarkdown": "full markdown prep document with 9 sections",
  "citedUrls": ["urls from documentation excerpts used"],
  "focusDemoAreas": [
    { "area": "Recruitment|Onboarding|Time & Attendance|Leave Management|Document Management|Internal Communication", "modules": ["feature names from docs only"], "helpUrl": "optional specific article url" }
  ],
  "discoveryAreaIds": ["recruitment|onboarding|attendance|leave|documents|communication - top 3 most relevant"]
}

focusDemoAreas: include ONLY areas relevant to focusModules and research notes (2-4 areas max).
discoveryAreaIds: order by relevance, include 2-4 ids.`;

export async function generatePrep(
  input: PrepInput,
  researchNotes: string,
): Promise<AIPrepPayload> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured on the server.");
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4o";

  const searchQueries = [
    ...input.focusModules,
    `${input.industry} HR`,
  ].slice(0, 4);

  const docResults = await Promise.all(
    searchQueries.map((q) => searchFactorialDocs(q, input.language)),
  );
  const docContext = docResults
    .flat()
    .filter((r, i, arr) => arr.findIndex((x) => x.url === r.url) === i)
    .map((r) => `### ${r.title}\nURL: ${r.url}\n${r.content}`)
    .join("\n\n");

  const userMessage = `LANGUAGE: ${input.language}

CLIENT:
- Name: ${input.clientName}
- Industry: ${input.industry}
- Employees: ${input.employeeCount}
- Demo goal: ${input.demoGoal}
- Focus modules: ${input.focusModules.join(", ")}

RESEARCH NOTES:
${researchNotes}

FACTORIAL DOCUMENTATION EXCERPTS (only source for product claims):
${docContext || "No documentation excerpts available. Use only generic module area names (Recruitment, Time & Attendance, etc.) without specific UI feature names. Leave citedUrls empty."}`;

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
    throw new Error(`OpenAI API error: ${response.status} ${err}`);
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

  return {
    clientBullets: parsed.clientBullets,
    closingScript: parsed.closingScript,
    prepMarkdown: parsed.prepMarkdown ?? "",
    citedUrls: parsed.citedUrls ?? [],
    focusDemoAreas: parsed.focusDemoAreas,
    discoveryAreaIds: parsed.discoveryAreaIds,
  };
}
