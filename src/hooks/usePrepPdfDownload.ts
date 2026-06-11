import { useState, useCallback } from "react";
import { downloadPrepPdf } from "@/lib/prepPdf";
import { loadPrepSession } from "@/lib/prepSession";
import type { PrepSession } from "@/types/prep";
import { useToast } from "@/hooks/use-toast";

export function usePrepPdfDownload() {
  const [pdfLoading, setPdfLoading] = useState(false);
  const { toast } = useToast();

  const runDownload = useCallback(
    async (session: PrepSession, includeCallNotes: boolean) => {
      setPdfLoading(true);
      try {
        await downloadPrepPdf(session, { includeCallNotes });
        toast({
          title: includeCallNotes ? "PDF + notes downloaded" : "PDF script downloaded",
        });
      } catch (err) {
        toast({
          title: "PDF failed",
          description: err instanceof Error ? err.message : "Could not generate PDF",
          variant: "destructive",
        });
      } finally {
        setPdfLoading(false);
      }
    },
    [toast],
  );

  const downloadPdfScript = useCallback(
    async (session?: PrepSession | null) => {
      const data = session ?? loadPrepSession();
      if (!data) {
        toast({
          title: "No preparation found",
          description: "Generate a demo guide first.",
          variant: "destructive",
        });
        return;
      }
      await runDownload(data, false);
    },
    [runDownload, toast],
  );

  const downloadPdfWithNotes = useCallback(
    async (session?: PrepSession | null) => {
      const data = session ?? loadPrepSession();
      if (!data) {
        toast({
          title: "No preparation found",
          description: "Generate a demo guide first.",
          variant: "destructive",
        });
        return;
      }
      await runDownload(data, true);
    },
    [runDownload, toast],
  );

  return { downloadPdfScript, downloadPdfWithNotes, pdfLoading };
}
