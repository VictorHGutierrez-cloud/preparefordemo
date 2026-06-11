import { createRoot } from "react-dom/client";
import { createElement } from "react";
import html2pdf from "html2pdf.js";
import { PrepPdfDocument, prepPdfFilename } from "@/components/prep/PrepPdfDocument";
import type { PrepSession } from "@/types/prep";

export async function downloadPrepPdf(session: PrepSession): Promise<void> {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  document.body.appendChild(container);

  const root = createRoot(container);

  try {
    root.render(createElement(PrepPdfDocument, { session }));

    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const element = container.firstElementChild;
    if (!element) {
      throw new Error("Failed to render PDF document");
    }

    await html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: prepPdfFilename(session.client.empresa),
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
