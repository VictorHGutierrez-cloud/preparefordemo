import type { PrepareApiResponse, PrepareFormData } from "@/types/prep";

export async function callPrepareApi(data: PrepareFormData): Promise<PrepareApiResponse> {
  const response = await fetch("/api/preparar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await response.text();

  let payload: PrepareApiResponse & { error?: string };
  try {
    payload = JSON.parse(text) as PrepareApiResponse & { error?: string };
  } catch {
    throw new Error(
      text.startsWith("A server error")
        ? "Server error on Vercel. Check Function Logs in the Vercel dashboard."
        : text.slice(0, 200) || `Request failed (${response.status})`,
    );
  }

  if (!response.ok) {
    throw new Error(payload.error ?? `Request failed (${response.status})`);
  }

  return payload;
}
