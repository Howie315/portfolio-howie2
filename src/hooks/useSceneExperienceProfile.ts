import { useEffect, useMemo, useState } from "react";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const MOBILE_QUERY = "(max-width: 767px)";
const TABLET_QUERY = "(min-width: 768px) and (max-width: 1023px)";
const TOUCH_QUERY = "(pointer: coarse)";

export type SceneMode = "fallback" | "full" | "lite";
export type ViewportKind = "desktop" | "mobile" | "tablet";

export type SceneExperienceProfile = {
  isTouch: boolean;
  sceneMode: SceneMode;
  viewportKind: ViewportKind;
};

const getMatch = (query: string): boolean => {
  if (typeof window === "undefined" || !("matchMedia" in window)) {
    return false;
  }

  return window.matchMedia(query).matches;
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

const getDeviceMemory = (): number => {
  if (typeof navigator === "undefined") {
    return 8;
  }

  return (
    (
      navigator as Navigator & {
        deviceMemory?: number;
      }
    ).deviceMemory ?? 8
  );
};

export const useSceneExperienceProfile = (): SceneExperienceProfile => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    getMatch(MOBILE_QUERY),
  );
  const [isTablet, setIsTablet] = useState<boolean>(() =>
    getMatch(TABLET_QUERY),
  );
  const [isTouch, setIsTouch] = useState<boolean>(() => getMatch(TOUCH_QUERY));
  const [isIdleReady, setIsIdleReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) {
      return undefined;
    }

    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    const tabletQuery = window.matchMedia(TABLET_QUERY);
    const touchQuery = window.matchMedia(TOUCH_QUERY);

    const handleMobileChange = (event: MediaQueryListEvent): void => {
      setIsMobile(event.matches);
    };
    const handleTabletChange = (event: MediaQueryListEvent): void => {
      setIsTablet(event.matches);
    };
    const handleTouchChange = (event: MediaQueryListEvent): void => {
      setIsTouch(event.matches);
    };

    setIsMobile(mobileQuery.matches);
    setIsTablet(tabletQuery.matches);
    setIsTouch(touchQuery.matches);

    mobileQuery.addEventListener("change", handleMobileChange);
    tabletQuery.addEventListener("change", handleTabletChange);
    touchQuery.addEventListener("change", handleTouchChange);

    return () => {
      mobileQuery.removeEventListener("change", handleMobileChange);
      tabletQuery.removeEventListener("change", handleTabletChange);
      touchQuery.removeEventListener("change", handleTouchChange);
    };
  }, []);

  const hardwareConcurrency = getHardwareConcurrency();
  const deviceMemory = getDeviceMemory();
  const saveData = getSaveData();

  const canRenderAny3D =
    !prefersReducedMotion && !saveData && hardwareConcurrency >= 4;

  useEffect(() => {
    if (!canRenderAny3D) {
      setIsIdleReady(false);
      return undefined;
    }

    let cancelled = false;
    const timeoutId = setTimeout(
      () => {
        if (!cancelled) {
          setIsIdleReady(true);
        }
      },
      isMobile ? 140 : 650,
    );

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [canRenderAny3D, isMobile]);

  return useMemo(() => {
    const viewportKind: ViewportKind = isMobile
      ? "mobile"
      : isTablet
        ? "tablet"
        : "desktop";

    let sceneMode: SceneMode = "fallback";

    if (viewportKind === "mobile") {
      sceneMode =
        canRenderAny3D &&
        isIdleReady &&
        hardwareConcurrency >= 6 &&
        deviceMemory >= 4
          ? "lite"
          : "fallback";
    } else if (canRenderAny3D && isIdleReady) {
      sceneMode =
        viewportKind === "desktop" && !isTouch && hardwareConcurrency >= 6
          ? "full"
          : "lite";
    }

    return {
      isTouch,
      sceneMode,
      viewportKind,
    };
  }, [
    canRenderAny3D,
    deviceMemory,
    hardwareConcurrency,
    isIdleReady,
    isMobile,
    isTablet,
    isTouch,
  ]);
};
