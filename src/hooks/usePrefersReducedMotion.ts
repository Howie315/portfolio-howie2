import { useEffect, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const getInitialValue = (): boolean => {
  if (typeof window === "undefined" || !("matchMedia" in window)) {
    return false;
  }

  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
};

export const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(getInitialValue);

  useEffect(() => {
    if (!("matchMedia" in window)) {
      return undefined;
    }

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const handleChange = (event: MediaQueryListEvent): void => {
      setPrefersReducedMotion(event.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
};
