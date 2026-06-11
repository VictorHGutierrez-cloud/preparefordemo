import type { GuideStep } from "@/data/demoGuideSteps";
import type { CallNotesExport, CheckedDiscoveryQuestion } from "@/types/prep";
import type { ChecklistState } from "@/lib/callNotesStorage";

export function buildCallNotesExport(
  guideSteps: GuideStep[],
  checklist: ChecklistState,
  executiveNotes: string,
): CallNotesExport {
  const discoveryStep = guideSteps.find((s) => s.kind === "discovery");
  const checkedQuestions: CheckedDiscoveryQuestion[] = [];

  if (discoveryStep?.discoveryBlocks?.length) {
    for (const block of discoveryStep.discoveryBlocks) {
      block.questions.forEach((question, qi) => {
        const id = `${block.id}-${qi}`;
        if (checklist[id]) {
          checkedQuestions.push({ blockOrArea: block.title, question });
        }
      });
    }
  } else if (discoveryStep?.discoveryAreas?.length) {
    for (const area of discoveryStep.discoveryAreas) {
      area.questions.forEach((question, qi) => {
        const id = `${area.id}-${qi}`;
        if (checklist[id]) {
          checkedQuestions.push({ blockOrArea: area.title, question });
        }
      });
    }
  }

  return { executiveNotes, checkedQuestions };
}
