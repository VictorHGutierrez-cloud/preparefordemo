export interface TavilyResult {
  title: string;
  url: string;
  content: string;
}

export async function searchFactorialDocs(
  query: string,
  language: string,
): Promise<TavilyResult[]> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) return [];

  const langDomain =
    language === "pt"
      ? "help.factorialhr.com/pt_PT"
      : language === "es"
        ? "help.factorialhr.com/es_ES"
        : "help.factorialhr.com";

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      query: `${query} site:${langDomain}`,
      search_depth: "basic",
      max_results: 5,
      include_answer: false,
    }),
  });

  if (!response.ok) return [];

  const data = (await response.json()) as {
    results?: Array<{ title: string; url: string; content: string }>;
  };

  return (data.results ?? []).map((r) => ({
    title: r.title,
    url: r.url,
    content: r.content.slice(0, 800),
  }));
}
