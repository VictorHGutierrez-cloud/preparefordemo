import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "factorial-demo-executive-notes";

function loadNotes(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function useExecutiveNotes() {
  const [notes, setNotes] = useState(loadNotes);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, notes);
  }, [notes]);

  const clear = useCallback(() => {
    setNotes("");
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { notes, setNotes, clear };
}
