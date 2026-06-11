import type { PrepareApiResponse, PrepareFormData } from "@/types/prep";

export async function callPrepareApi(data: PrepareFormData): Promise<PrepareApiResponse> {
  const response = await fetch("/api/preparar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const payload = (await response.json()) as PrepareApiResponse & { error?: string };

  if (!response.ok) {
    throw new Error(payload.error ?? `Request failed (${response.status})`);
  }

  return payload;
}
