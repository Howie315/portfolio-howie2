import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

const SectionReveal = ({
  children,
  className = "",
}: SectionRevealProps): JSX.Element => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const element = elementRef.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className={`reveal-stage ${className}`}
      data-visible={isVisible ? "true" : "false"}
      ref={elementRef}
    >
      {children}
    </div>
  );
};

export default SectionReveal;
