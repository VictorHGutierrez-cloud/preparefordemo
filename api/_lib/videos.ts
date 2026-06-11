export interface DemoVideo {
  label: string;
  url: string;
}

export const DEMO_VIDEO_CATALOG: Record<string, DemoVideo[]> = {
  recruitment: [
    {
      label: "ATS AI match",
      url: "https://drive.google.com/file/d/1dqqMsqVk8nQ6Cm5xXjWhTMjK9e2YXif6/preview",
    },
  ],
  trainings: [
    {
      label: "Automatic certificate generation",
      url: "https://drive.google.com/file/d/1RvLz_-zE1B_EJTKPd9J7pAfIY8XikAO4/preview",
    },
    {
      label: "Learning management (LMS)",
      url: "https://drive.google.com/file/d/19XbP-z_ypsCk0Cwhsd_6bpe63vj8TjnX/preview",
    },
  ],
  performance: [
    {
      label: "Peer reviews (AVD Peers)",
      url: "https://drive.google.com/file/d/1vXZCTd5HTwyh1bv0pxGev9QLKnWUVTU1/preview",
    },
    {
      label: "Performance review (AVD Factorial)",
      url: "https://drive.google.com/file/d/1ZBzAvQn8UtKPe_0s8M7c79LA-TZLX5pw/preview",
    },
  ],
  engagement: [
    {
      label: "One-on-one meetings",
      url: "https://drive.google.com/file/d/10kuyd-q2bYtF_fs3oiPOtISHowjsYKA0/preview",
    },
    {
      label: "Surveys",
      url: "https://drive.google.com/file/d/1vZfFnxLLWCvU404bqsGTg1SwwF9hjS_c/preview",
    },
  ],
};

const AREA_VIDEO_KEYS: Record<string, string[]> = {
  Recruitment: ["recruitment"],
  Onboarding: [],
  "Time & Attendance": [],
  "Leave Management": [],
  "Document Management": [],
  "Internal Communication": [],
  Trainings: ["trainings"],
  Performance: ["performance"],
  Engagement: ["engagement"],
};

export function videosForArea(area: string, focusModules: string[]): DemoVideo[] {
  const keys = AREA_VIDEO_KEYS[area] ?? [];
  const fromArea = keys.flatMap((k) => DEMO_VIDEO_CATALOG[k] ?? []);

  const fromFocus = focusModules.flatMap((mod) => {
    const key = mod.toLowerCase().replace(/\s+/g, "-");
    if (key.includes("recruit")) return DEMO_VIDEO_CATALOG.recruitment ?? [];
    if (key.includes("train")) return DEMO_VIDEO_CATALOG.trainings ?? [];
    if (key.includes("perform")) return DEMO_VIDEO_CATALOG.performance ?? [];
    if (key.includes("engag")) return DEMO_VIDEO_CATALOG.engagement ?? [];
    return [];
  });

  const seen = new Set<string>();
  return [...fromArea, ...fromFocus].filter((v) => {
    if (seen.has(v.url)) return false;
    seen.add(v.url);
    return true;
  });
}
