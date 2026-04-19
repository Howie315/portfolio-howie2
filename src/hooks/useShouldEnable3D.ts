import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const MOBILE_QUERY = "(max-width: 768px)";

const getInitialIsMobile = (): boolean => {
  if (typeof window === "undefined" || !("matchMedia" in window)) {
    return false;
  }

  return window.matchMedia(MOBILE_QUERY).matches;
};

const getSaveData = (): boolean => {
  if (typeof navigator === "undefined") {
    return false;
  }

  const connection = (
    navigator as Navigator & {
      connection?: {
        saveData?: boolean;
      };
    }
  ).connection;

  return Boolean(connection?.saveData);
};

const getHardwareConcurrency = (): number => {
  if (typeof navigator === "undefined") {
    return 8;
  }

  return navigator.hardwareConcurrency ?? 8;
};

export const useShouldEnable3D = (): boolean => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState<boolean>(getInitialIsMobile);
  const [isIdleReady, setIsIdleReady] = useState(false);

  useEffect(() => {
    if (!("matchMedia" in window)) {
      return undefined;
    }

    const query = window.matchMedia(MOBILE_QUERY);

    const handleChange = (event: MediaQueryListEvent): void => {
      setIsMobile(event.matches);
    };

    setIsMobile(query.matches);
    query.addEventListener("change", handleChange);

    return () => {
      query.removeEventListener("change", handleChange);
    };
  }, []);

  const baseAllowed =
    !prefersReducedMotion &&
    !getSaveData() &&
    !isMobile &&
    getHardwareConcurrency() > 4;

  useEffect(() => {
    if (!baseAllowed) {
      setIsIdleReady(false);
      return undefined;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const markReady = (): void => {
      if (cancelled) {
        return;
      }
      setIsIdleReady(true);
    };

    timeoutId = setTimeout(markReady, 900);

    return () => {
      cancelled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [baseAllowed]);

  return baseAllowed && isIdleReady;
};
