import type { PrepSession } from "@/types/prep";

const STORAGE_KEY = "factorial-prep-session";

export function loadPrepSession(): PrepSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PrepSession;
  } catch {
    return null;
  }
}

export function savePrepSession(session: Omit<PrepSession, "createdAt">): PrepSession {
  const full: PrepSession = { ...session, createdAt: new Date().toISOString() };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  return full;
}

export function clearPrepSession(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function downloadPrepMarkdown(markdown: string, clientName: string): void {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `prep-${clientName.toLowerCase().replace(/\s+/g, "-")}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
