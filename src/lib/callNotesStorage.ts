const LEGACY_EXECUTIVE_KEY = "factorial-demo-executive-notes";
const LEGACY_CHECKLIST_KEY = "factorial-demo-discovery-checklist";

export type ChecklistState = Record<string, boolean>;

export function clientSlug(name: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return slug || "client";
}

function executiveKey(slug: string): string {
  return `factorial-notes-${slug}-executive`;
}

function checklistKey(slug: string): string {
  return `factorial-notes-${slug}-checklist`;
}

function migrateLegacyIfNeeded(slug: string): void {
  const execKey = executiveKey(slug);
  if (!localStorage.getItem(execKey)) {
    const legacy = localStorage.getItem(LEGACY_EXECUTIVE_KEY);
    if (legacy) {
      localStorage.setItem(execKey, legacy);
      localStorage.removeItem(LEGACY_EXECUTIVE_KEY);
    }
  }

  const checkKey = checklistKey(slug);
  if (!localStorage.getItem(checkKey)) {
    const legacy = localStorage.getItem(LEGACY_CHECKLIST_KEY);
    if (legacy) {
      localStorage.setItem(checkKey, legacy);
      localStorage.removeItem(LEGACY_CHECKLIST_KEY);
    }
  }
}

export function loadExecutiveNotes(slug: string): string {
  try {
    migrateLegacyIfNeeded(slug);
    return localStorage.getItem(executiveKey(slug)) ?? "";
  } catch {
    return "";
  }
}

export function saveExecutiveNotes(slug: string, notes: string): void {
  localStorage.setItem(executiveKey(slug), notes);
}

export function loadDiscoveryChecklist(slug: string): ChecklistState {
  try {
    migrateLegacyIfNeeded(slug);
    const raw = localStorage.getItem(checklistKey(slug));
    return raw ? (JSON.parse(raw) as ChecklistState) : {};
  } catch {
    return {};
  }
}

export function saveDiscoveryChecklist(slug: string, state: ChecklistState): void {
  localStorage.setItem(checklistKey(slug), JSON.stringify(state));
}

export function clearCallNotes(slug: string): void {
  localStorage.removeItem(executiveKey(slug));
  localStorage.removeItem(checklistKey(slug));
}
