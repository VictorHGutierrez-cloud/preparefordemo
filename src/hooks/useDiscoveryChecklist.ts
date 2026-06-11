import { useCallback, useEffect, useState } from "react";
import {
  type ChecklistState,
  loadDiscoveryChecklist,
  saveDiscoveryChecklist,
} from "@/lib/callNotesStorage";

export function useDiscoveryChecklist(clientSlug: string) {
  const slug = clientSlug || "default";

  const [checked, setChecked] = useState<ChecklistState>(() => loadDiscoveryChecklist(slug));

  useEffect(() => {
    setChecked(loadDiscoveryChecklist(slug));
  }, [slug]);

  useEffect(() => {
    saveDiscoveryChecklist(slug, checked);
  }, [slug, checked]);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const isChecked = useCallback((id: string) => Boolean(checked[id]), [checked]);

  const reset = useCallback(() => {
    setChecked({});
    saveDiscoveryChecklist(slug, {});
  }, [slug]);

  return { toggle, isChecked, reset, checked };
}
