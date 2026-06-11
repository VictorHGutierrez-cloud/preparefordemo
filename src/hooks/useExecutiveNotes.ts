import { useCallback, useEffect, useState } from "react";
import { loadExecutiveNotes, saveExecutiveNotes } from "@/lib/callNotesStorage";

export function useExecutiveNotes(clientSlug: string) {
  const slug = clientSlug || "default";

  const [notes, setNotes] = useState(() => loadExecutiveNotes(slug));

  useEffect(() => {
    setNotes(loadExecutiveNotes(slug));
  }, [slug]);

  useEffect(() => {
    saveExecutiveNotes(slug, notes);
  }, [slug, notes]);

  const clear = useCallback(() => {
    setNotes("");
    saveExecutiveNotes(slug, "");
  }, [slug]);

  return { notes, setNotes, clear };
}
