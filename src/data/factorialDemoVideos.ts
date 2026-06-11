/**
 * Factorial product demo videos (Google Drive).
 * Reuse across clients — map in demoGuideSteps.ts.
 * Full list: docs/CATALOGO-DEMOS.md
 */

import type { DemoVideo } from "./demoGuideSteps";

export const FACTORIAL_DEMO_VIDEOS = {
  trainings: {
    certificate: {
      label: "Automatic certificate generation",
      url: "https://drive.google.com/file/d/1RvLz_-zE1B_EJTKPd9J7pAfIY8XikAO4/preview",
    },
    lms: {
      label: "Learning management (LMS)",
      url: "https://drive.google.com/file/d/19XbP-z_ypsCk0Cwhsd_6bpe63vj8TjnX/preview",
    },
  },
  performance: {
    peerReviews: {
      label: "Peer reviews (AVD Peers)",
      url: "https://drive.google.com/file/d/1vXZCTd5HTwyh1bv0pxGev9QLKnWUVTU1/preview",
    },
    performanceReview: {
      label: "Performance review (AVD Factorial)",
      url: "https://drive.google.com/file/d/1ZBzAvQn8UtKPe_0s8M7c79LA-TZLX5pw/preview",
    },
  },
  engagement: {
    oneOnOne: {
      label: "One-on-one meetings",
      url: "https://drive.google.com/file/d/10kuyd-q2bYtF_fs3oiPOtISHowjsYKA0/preview",
    },
    surveys: {
      label: "Surveys",
      url: "https://drive.google.com/file/d/1vZfFnxLLWCvU404bqsGTg1SwwF9hjS_c/preview",
    },
  },
  recruitment: {
    atsAiMatch: {
      label: "ATS AI match",
      url: "https://drive.google.com/file/d/1dqqMsqVk8nQ6Cm5xXjWhTMjK9e2YXif6/preview",
    },
  },
} as const satisfies Record<string, Record<string, DemoVideo>>;
