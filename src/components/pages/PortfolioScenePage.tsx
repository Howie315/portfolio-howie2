import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";

import type { SceneSectionId } from "../../data/sceneContent";
import { sceneSectionOrder, sceneSections } from "../../data/sceneContent";
import { useSceneExperienceProfile } from "../../hooks/useSceneExperienceProfile";
import { SceneDetailPanel, SceneHubFallback } from "../three/PortfolioHub";
import type { CameraMode } from "../three/PortfolioHub/types";

type ViewState = "focus" | "hub";

const PortfolioHubCanvas = lazy(
  () => import("../three/PortfolioHub/PortfolioHubCanvas"),
);

type TouchPointListLike = {
  [index: number]: { clientX: number; clientY: number } | undefined;
  length: number;
};

const TOUCH_DRAG_THRESHOLD = 4;
const TOUCH_PINCH_SENSITIVITY = 72;

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

const PortfolioScenePage = (): React.JSX.Element => {
  const { isReady, isTouch, sceneMode, viewportKind } =
    useSceneExperienceProfile();
  const isMobileViewport = viewportKind === "mobile";
  const isMobileFallback = isMobileViewport && sceneMode === "fallback";
  const isAwaitingSceneDecision = !isReady;
  const cameraMode: CameraMode =
    isMobileViewport && isTouch ? "viewer" : "cinematic";

  const [activeSection, setActiveSection] = useState<SceneSectionId | null>(
    null,
  );
  const [hoveredSection, setHoveredSection] = useState<SceneSectionId | null>(
    null,
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>("hub");
  const showBottomNarrative =
    (!isMobileViewport || sceneMode !== "fallback") && !isMobileNavOpen;
  const showCompactDock = viewportKind !== "desktop" && sceneMode !== "fallback";
  const showDesktopStatus = viewportKind === "desktop";
  const returnTimeoutRef = useRef<number | null>(null);
  const touchOrbitOffsetRef = useRef<[number, number]>([0, 0]);
  const touchZoomOffsetRef = useRef(0);
  const touchLookOffsetRef = useRef<[number, number]>([0, 0]);
  const touchGestureRef = useRef<{
    isDragging: boolean;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  } | null>(null);
  const touchPinchRef = useRef<{
    lastDistance: number;
  } | null>(null);

  const activeSceneSection = useMemo(
    () => sceneSections.find((section) => section.id === activeSection) ?? null,
    [activeSection],
  );
  const hoveredSceneSection = useMemo(
    () =>
      sceneSections.find((section) => section.id === hoveredSection) ?? null,
    [hoveredSection],
  );
  const visualSceneSection = activeSceneSection ?? hoveredSceneSection;

  const handleOpenSection = (sectionId: SceneSectionId): void => {
    if (activeSection === sectionId) {
      handleReturnToHub();
      return;
    }

    if (activeSection && activeSection !== sectionId) {
      if (returnTimeoutRef.current) {
        clearTimeout(returnTimeoutRef.current);
        returnTimeoutRef.current = null;
      }

      setIsMobileNavOpen(false);
      setHoveredSection(null);
      touchLookOffsetRef.current = [0, 0];
      setActiveSection(sectionId);
      setViewState("focus");
      return;
    }

    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
      returnTimeoutRef.current = null;
    }

    setIsMobileNavOpen(false);
    setHoveredSection(null);
    touchLookOffsetRef.current = [0, 0];
    setActiveSection(sectionId);
    setViewState("focus");
  };

  const handleReturnToHub = (): void => {
    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
    }

    setIsMobileNavOpen(false);
    setHoveredSection(null);
    touchLookOffsetRef.current = [0, 0];
    setViewState("hub");

    returnTimeoutRef.current = window.setTimeout(() => {
      setActiveSection(null);
      returnTimeoutRef.current = null;
    }, 320);
  };

  useEffect(() => {
    if (!activeSection) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        handleReturnToHub();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSection]);

  useEffect(() => {
    return () => {
      if (returnTimeoutRef.current) {
        clearTimeout(returnTimeoutRef.current);
      }
    };
  }, []);

  const handleTouchGestureMove = (
    clientX: number,
    clientY: number,
    rect: DOMRect,
  ): void => {
    if (!touchGestureRef.current) {
      return;
    }

    const deltaX = clientX - touchGestureRef.current.startX;
    const deltaY = clientY - touchGestureRef.current.startY;

    if (
      !touchGestureRef.current.isDragging &&
      Math.hypot(deltaX, deltaY) > TOUCH_DRAG_THRESHOLD
    ) {
      touchGestureRef.current.isDragging = true;
    }

    if (!touchGestureRef.current.isDragging) {
      return;
    }

    const incrementalX = clientX - touchGestureRef.current.lastX;
    const incrementalY = clientY - touchGestureRef.current.lastY;
    const nextYaw = clamp(
      touchOrbitOffsetRef.current[0] - (incrementalX / rect.width) * 2.2,
      -0.82,
      0.82,
    );
    const nextPitch = clamp(
      touchOrbitOffsetRef.current[1] + (incrementalY / rect.height) * 1.15,
      -0.36,
      0.38,
    );

    touchGestureRef.current.lastX = clientX;
    touchGestureRef.current.lastY = clientY;
    touchOrbitOffsetRef.current = [nextYaw, nextPitch];
    touchLookOffsetRef.current = [0, 0];
  };

  const getTouchDistance = (touches: TouchPointListLike): number | null => {
    if (touches.length < 2) {
      return null;
    }

    const [firstTouch, secondTouch] = [touches[0], touches[1]];

    if (!firstTouch || !secondTouch) {
      return null;
    }

    return Math.hypot(
      secondTouch.clientX - firstTouch.clientX,
      secondTouch.clientY - firstTouch.clientY,
    );
  };

  return (
    <div
      className={`relative min-h-screen bg-[#05030c] text-white ${
        isMobileFallback
          ? "overflow-x-hidden overflow-y-auto"
          : "overflow-hidden"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,74,138,0.16),transparent_22%),radial-gradient(circle_at_78%_16%,rgba(126,76,255,0.22),transparent_24%),linear-gradient(180deg,#04020a_0%,#06030f_44%,#020207_100%)]" />

      {isAwaitingSceneDecision ? (
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_28%,rgba(126,76,255,0.14),transparent_18%),radial-gradient(circle_at_50%_68%,rgba(255,74,138,0.12),transparent_22%),linear-gradient(180deg,#05030c_0%,#04020b_48%,#020208_100%)]" />
      ) : sceneMode !== "fallback" ? (
        <Suspense
          fallback={
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_28%,rgba(126,76,255,0.14),transparent_18%),radial-gradient(circle_at_50%_68%,rgba(255,74,138,0.12),transparent_22%),linear-gradient(180deg,#05030c_0%,#04020b_48%,#020208_100%)]" />
          }
        >
          <div
            className="absolute inset-0 z-10"
            style={{
              touchAction: "none",
              WebkitTapHighlightColor: "transparent",
              userSelect: "none",
            }}
            onTouchCancel={() => {
              touchGestureRef.current = null;
              touchPinchRef.current = null;
              touchLookOffsetRef.current = [0, 0];
            }}
            onTouchEnd={(event) => {
              touchPinchRef.current = null;

              if (event.touches.length === 1) {
                const touch = event.touches[0];

                if (!touch) {
                  return;
                }

                touchGestureRef.current = {
                  isDragging: false,
                  startX: touch.clientX,
                  startY: touch.clientY,
                  lastX: touch.clientX,
                  lastY: touch.clientY,
                };
                touchLookOffsetRef.current = [0, 0];

                return;
              }

              touchGestureRef.current = null;
              touchPinchRef.current = null;
              touchLookOffsetRef.current = [0, 0];
            }}
            onTouchMove={(event) => {
              if (!isMobileViewport || !isTouch) {
                return;
              }

              if (event.touches.length >= 2) {
                event.preventDefault();
                const pinchDistance = getTouchDistance(event.touches);

                if (!pinchDistance) {
                  return;
                }

                if (!touchPinchRef.current) {
                  touchPinchRef.current = {
                    lastDistance: pinchDistance,
                  };
                }

                const pinchDelta =
                  (pinchDistance - touchPinchRef.current.lastDistance) /
                  TOUCH_PINCH_SENSITIVITY;
                const nextZoomOffset = clamp(
                  touchZoomOffsetRef.current - pinchDelta,
                  -2.2,
                  5.2,
                );

                touchPinchRef.current.lastDistance = pinchDistance;
                touchGestureRef.current = null;
                touchZoomOffsetRef.current = nextZoomOffset;
                touchLookOffsetRef.current = [0, 0];
                return;
              }

              const touch = event.touches[0];

              if (!touch) {
                return;
              }

              const gesture = touchGestureRef.current;

              if (gesture) {
                const deltaX = touch.clientX - gesture.startX;
                const deltaY = touch.clientY - gesture.startY;

                if (
                  gesture.isDragging ||
                  Math.hypot(deltaX, deltaY) > TOUCH_DRAG_THRESHOLD
                ) {
                  event.preventDefault();
                }
              }

              handleTouchGestureMove(
                touch.clientX,
                touch.clientY,
                event.currentTarget.getBoundingClientRect(),
              );
            }}
            onTouchStart={(event) => {
              if (!isMobileViewport || !isTouch) {
                return;
              }

              const pinchDistance = getTouchDistance(event.touches);

              if (pinchDistance) {
                event.preventDefault();
                touchPinchRef.current = {
                  lastDistance: pinchDistance,
                };
                touchGestureRef.current = null;
                touchLookOffsetRef.current = [0, 0];
                return;
              }

              const touch = event.touches[0];

              if (!touch) {
                return;
              }

              touchGestureRef.current = {
                isDragging: false,
                startX: touch.clientX,
                startY: touch.clientY,
                lastX: touch.clientX,
                lastY: touch.clientY,
              };
              touchLookOffsetRef.current = [0, 0];
            }}
          >
            <PortfolioHubCanvas
              activeSection={activeSection}
              hoveredSection={hoveredSection}
              isTouchDevice={isTouch}
              onHoverSection={setHoveredSection}
              onSelectSection={handleOpenSection}
              onTransitionChange={setIsTransitioning}
              sceneMode={sceneMode}
              touchOrbitOffsetRef={touchOrbitOffsetRef}
              touchLookOffsetRef={touchLookOffsetRef}
              touchZoomOffsetRef={touchZoomOffsetRef}
              viewportKind={viewportKind}
              cameraMode={cameraMode}
              viewState={viewState}
            />
          </div>
        </Suspense>
      ) : (
        <SceneHubFallback
          activeSection={activeSection}
          onSelectSection={handleOpenSection}
          viewportKind={viewportKind}
        />
      )}

      <div
        className={`pointer-events-none z-20 flex justify-center px-3 pt-3 sm:px-6 sm:pt-6 ${
          isMobileFallback ? "sticky top-0" : "absolute inset-x-0 top-0"
        }`}
      >
        <div
          className={`scene-shell-panel pointer-events-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3.5 sm:px-5 sm:py-4 ${
            isMobileFallback
              ? "rounded-[1.1rem]"
              : "rounded-[1.25rem] lg:flex-row lg:items-center lg:justify-between lg:gap-5 lg:rounded-full lg:py-3 lg:pl-5 lg:pr-3"
          }`}
          style={
            visualSceneSection
              ? ({
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 80px rgba(0,0,0,0.36), 0 0 0 1px ${visualSceneSection.accent}18`,
                } as React.CSSProperties)
              : undefined
          }
        >
          <div className="min-w-0 lg:flex lg:items-center lg:gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span
                aria-hidden="true"
                className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full shadow-[0_0_24px_currentColor]"
                  style={{
                    backgroundColor: visualSceneSection?.accent ?? "#d7d3ee",
                    color: visualSceneSection?.accent ?? "#d7d3ee",
                  }}
                />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[0.95rem] font-semibold tracking-[0.18em] uppercase text-white sm:text-base">
                  Howie Nguyen
                </p>
                <p className="mt-0.5 truncate text-[0.58rem] uppercase tracking-[0.22em] text-[rgba(199,196,223,0.6)] sm:text-[0.66rem]">
                  {visualSceneSection
                    ? `${visualSceneSection.kicker} focus`
                    : "Interactive portfolio chamber"}
                </p>
              </div>
            </div>
            {viewportKind !== "desktop" ? (
              <p className="mt-3 max-w-xl text-[0.86rem] leading-6 text-[rgba(214,216,226,0.74)] sm:text-[0.92rem]">
                {isAwaitingSceneDecision
                  ? "Preparing the chamber for your device."
                  : sceneMode === "fallback"
                    ? "A mobile-first chamber map built for touch, readability, and faster exploration."
                    : isMobileViewport
                      ? "Tap the lit artifacts in the 3D chamber to reveal each section. Touch mode keeps the scene lighter and easier to target."
                      : "Tap the lit artifacts to reveal each section. The chamber is running in a lighter touch mode."}
              </p>
            ) : null}
          </div>

          <div className="hidden items-center justify-end gap-1.5 rounded-full border border-white/8 bg-black/20 p-1 lg:flex">
            {sceneSections.map((section) => (
              <button
                className={`group flex items-center gap-2 rounded-full border px-3 py-2 text-[0.66rem] font-medium tracking-[0.2em] uppercase transition ${
                  activeSection === section.id || hoveredSection === section.id
                    ? "border-white/[0.14] bg-white/[0.11] text-white shadow-[0_10px_28px_rgba(0,0,0,0.26)]"
                    : "border-transparent bg-transparent text-[rgba(214,216,226,0.68)] hover:bg-white/[0.06] hover:text-white"
                }`}
                key={section.id}
                onClick={() => handleOpenSection(section.id)}
                type="button"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full opacity-70 transition group-hover:opacity-100"
                  style={{ backgroundColor: section.accent }}
                />
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showBottomNarrative ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-3 pb-28 sm:px-6 lg:pb-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-4">
            <div
              className={`scene-shell-panel pointer-events-auto rounded-[1.2rem] px-4 py-3.5 sm:px-5 ${
                isMobileViewport
                  ? "max-w-[19.75rem] px-3.5 py-3"
                  : "max-w-2xl lg:rounded-[1.35rem]"
              }`}
              style={
                visualSceneSection
                  ? ({
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 80px rgba(0,0,0,0.36), 0 18px 60px ${visualSceneSection.accent}14`,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <div className="mb-2.5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full shadow-[0_0_18px_currentColor]"
                  style={{
                    backgroundColor: visualSceneSection?.accent ?? "#ffaacd",
                    color: visualSceneSection?.accent ?? "#ffaacd",
                  }}
                />
                <span className="text-[0.58rem] uppercase tracking-[0.28em] text-[rgba(202,199,222,0.58)]">
                  {activeSceneSection
                    ? "Section unveiled"
                    : hoveredSceneSection
                      ? "Object resonance"
                      : "Navigation hub"}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.18),transparent)]"
                />
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[rgba(255,170,204,0.82)]">
                  {activeSceneSection?.kicker ??
                    hoveredSceneSection?.kicker ??
                    "Hub"}
                </p>
                <p className="truncate font-display text-sm font-medium text-white/[0.92]">
                  {activeSceneSection?.title ??
                    hoveredSceneSection?.title ??
                    "Scene Overview"}
                </p>
              </div>
              <p
                className={`mt-2 text-[rgba(218,220,231,0.8)] sm:text-base ${
                  isMobileViewport
                    ? "line-clamp-2 text-[0.8rem] leading-5"
                    : "text-sm leading-7"
                }`}
              >
                {activeSceneSection?.description ??
                  hoveredSceneSection?.description ??
                  (sceneMode === "fallback"
                    ? "Choose a chamber node below to open each section in a mobile-optimized reveal panel."
                    : isTouch
                      ? "Tap the desk, monitor, archive, wall panel, and portal to open each section."
                      : "Move through the chamber and interact with the desk, monitor, archive, wall panel, and portal to open each section.")}
              </p>
            </div>

            {showDesktopStatus ? (
              <div className="scene-shell-panel pointer-events-auto hidden items-center gap-3 rounded-full px-4 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-[rgba(199,196,223,0.68)] lg:flex">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[rgba(255,170,204,0.86)] shadow-[0_0_18px_rgba(255,170,204,0.58)]"
                />
                <span>
                  {isTransitioning
                    ? "Realigning focus"
                    : activeSection
                      ? "Press Esc to return"
                      : "Click objects to explore"}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <SceneDetailPanel
        activeSection={activeSection}
        onClose={handleReturnToHub}
        viewportKind={viewportKind}
      />

      {showCompactDock ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 px-3 lg:hidden">
          {isMobileNavOpen ? (
            <button
              aria-label="Close section navigation"
              className="absolute inset-0 pointer-events-auto"
              onClick={() => setIsMobileNavOpen(false)}
              type="button"
            />
          ) : null}

          <div className="mx-auto flex w-full max-w-[21rem] flex-col items-end gap-2">
            {isMobileNavOpen ? (
              <div className="scene-shell-panel pointer-events-auto w-full rounded-[1.15rem] p-2.5 shadow-[0_24px_64px_rgba(0,0,0,0.42)]">
                <div className="mb-2.5 flex items-center justify-between gap-3 px-1">
                  <div>
                    <p className="text-[0.58rem] uppercase tracking-[0.3em] text-[rgba(199,196,223,0.58)]">
                      Quick navigation
                    </p>
                    <p className="mt-1 text-[0.82rem] text-white">
                      Jump to a chamber object
                    </p>
                  </div>
                  <button
                    className="touch-manipulation rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-[0.54rem] uppercase tracking-[0.24em] text-[rgba(220,223,232,0.82)]"
                    onClick={() => setIsMobileNavOpen(false)}
                    type="button"
                  >
                    Close
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {sceneSectionOrder.map((sectionId) => {
                    const section = sceneSections.find(
                      (item) => item.id === sectionId,
                    );

                    if (!section) {
                      return null;
                    }

                    const isCurrent = activeSection === section.id;

                    return (
                      <button
                        className={`touch-manipulation rounded-[0.95rem] border px-2.5 py-2.5 text-left transition ${
                          isCurrent
                            ? "border-[rgba(255,170,204,0.38)] bg-[rgba(255,255,255,0.1)] text-white shadow-[0_12px_28px_rgba(255,74,138,0.16)]"
                            : "border-white/10 bg-[rgba(255,255,255,0.03)] text-[rgba(214,216,226,0.78)]"
                        }`}
                        key={section.id}
                        onClick={() => handleOpenSection(section.id)}
                        type="button"
                      >
                        <span
                          aria-hidden="true"
                          className="mb-2 block h-1 w-10 rounded-full"
                          style={{ backgroundColor: section.accent }}
                        />
                        <span className="block text-[0.58rem] uppercase tracking-[0.24em] text-[rgba(199,196,223,0.6)]">
                          {section.kicker}
                        </span>
                        <span className="mt-1 block text-[0.82rem] font-medium text-current">
                          {section.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="scene-shell-panel pointer-events-auto flex w-full items-center justify-between gap-2 rounded-[1rem] px-2.5 py-2 shadow-[0_20px_48px_rgba(0,0,0,0.36)]">
              <div className="flex min-w-0 flex-1 items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-8 w-1 rounded-full"
                  style={{
                    backgroundColor: activeSceneSection?.accent ?? "#ff4a8a",
                  }}
                />
                <div className="min-w-0">
                  <p className="text-[0.52rem] uppercase tracking-[0.26em] text-[rgba(199,196,223,0.56)]">
                    {activeSceneSection ? "Focused" : "Suggested"}
                  </p>
                  <p className="mt-0.5 truncate text-[0.84rem] leading-5 text-white">
                    {activeSceneSection?.title ?? "Tap the desk to start"}
                  </p>
                </div>
              </div>
              <button
                className="touch-manipulation shrink-0 rounded-full border border-white/10 bg-white/[0.08] px-3.5 py-2.5 text-[0.54rem] font-medium uppercase tracking-[0.2em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                onClick={() => setIsMobileNavOpen((current) => !current)}
                type="button"
              >
                {isMobileNavOpen ? "Hide" : "Sections"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PortfolioScenePage;
