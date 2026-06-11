import { useCallback, useMemo, useState } from "react";
import { DEMO_GUIDE_STEPS } from "@/data/demoGuideSteps";
import { DEFAULT_VALUES } from "@/utils/constants";
import { loadPrepSession, clearPrepSession as clearStorage } from "@/lib/prepSession";
import type { ClientProfile, PrepSession } from "@/types/prep";

export function usePrepSession() {
  const [session, setSession] = useState<PrepSession | null>(() => loadPrepSession());

  const client: ClientProfile = useMemo(
    () =>
      session?.client ?? {
        empresa: DEFAULT_VALUES.empresa,
        industry: DEFAULT_VALUES.industry,
        employeeCount: DEFAULT_VALUES.employeeCount,
        demoGoal: DEFAULT_VALUES.demoGoal,
        focusModules: [...DEFAULT_VALUES.focusModules],
      },
    [session],
  );

  const guideSteps = session?.guideSteps ?? DEMO_GUIDE_STEPS;
  const hasSession = Boolean(session);

  const refresh = useCallback(() => {
    setSession(loadPrepSession());
  }, []);

  const clear = useCallback(() => {
    clearStorage();
    setSession(null);
  }, []);

  return {
    session,
    client,
    guideSteps,
    hasSession,
    refresh,
    clear,
  };
}
