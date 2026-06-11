import { useState, useCallback } from "react";
import { downloadPrepPdf } from "@/lib/prepPdf";
import { loadPrepSession } from "@/lib/prepSession";
import type { PrepSession } from "@/types/prep";
import { useToast } from "@/hooks/use-toast";

export function usePrepPdfDownload() {
  const [pdfLoading, setPdfLoading] = useState(false);
  const { toast } = useToast();

  const downloadPdf = useCallback(
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

      setPdfLoading(true);
      try {
        await downloadPrepPdf(data);
        toast({ title: "PDF downloaded" });
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

  return { downloadPdf, pdfLoading };
}
