import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "factorial-demo-discovery-checklist";

type ChecklistState = Record<string, boolean>;

function loadState(): ChecklistState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ChecklistState) : {};
  } catch {
    return {};
  }
}

export function useDiscoveryChecklist() {
  const [checked, setChecked] = useState<ChecklistState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const isChecked = useCallback((id: string) => Boolean(checked[id]), [checked]);

  const reset = useCallback(() => {
    setChecked({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { toggle, isChecked, reset };
}
