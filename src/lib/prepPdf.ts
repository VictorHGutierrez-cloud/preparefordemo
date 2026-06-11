import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { PrepPdfDocument, prepPdfFilename, prepPdfWithNotesFilename } from "@/components/prep/PrepPdfDocument";
import { buildCallNotesExport } from "@/lib/buildCallNotesExport";
import {
  clientSlug,
  loadDiscoveryChecklist,
  loadExecutiveNotes,
} from "@/lib/callNotesStorage";
import type { PrepPdfOptions, PrepSession } from "@/types/prep";

export async function downloadPrepPdf(
  session: PrepSession,
  options?: PrepPdfOptions,
): Promise<void> {
  const slug = clientSlug(session.client.empresa);
  const includeCallNotes = options?.includeCallNotes ?? false;

  const callNotes = includeCallNotes
    ? buildCallNotesExport(
        session.guideSteps,
        loadDiscoveryChecklist(slug),
        loadExecutiveNotes(slug),
      )
    : undefined;

  const html2pdf = (await import("html2pdf.js")).default;

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  document.body.appendChild(container);

  const root = createRoot(container);

  try {
    root.render(createElement(PrepPdfDocument, { session, callNotes }));

    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const element = container.firstElementChild;
    if (!element) {
      throw new Error("Failed to render PDF document");
    }

    const filename = includeCallNotes
      ? prepPdfWithNotesFilename(session.client.empresa)
      : prepPdfFilename(session.client.empresa);

    await html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      })
      .from(element)
      .save();
  } finally {
    root.unmount();
    document.body.removeChild(container);
  }
}
