import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";

import type { PortfolioHubCanvasProps } from "../types";
import { HubScene } from "../HubScene";

const PortfolioHubCanvas = ({
  activeSection,
  hoveredSection,
  isTouchDevice = false,
  onHoverSection,
  onSelectSection,
  onTransitionChange,
  sceneMode,
  touchOrbitOffsetRef,
  touchLookOffsetRef,
  touchZoomOffsetRef,
  viewportKind = "desktop",
  cameraMode = "cinematic",
  viewState,
}: PortfolioHubCanvasProps): React.JSX.Element => {
  const isLiteMode = sceneMode === "lite";
  const isMobileViewport = viewportKind === "mobile";
  const mobileDprMax =
    typeof window === "undefined"
      ? 1.45
      : Math.min(window.devicePixelRatio || 1.45, 1.6);

  return (
    <div className="absolute inset-0 z-10">
      <Canvas
        camera={{
          fov: isMobileViewport
            ? 60
            : isLiteMode
              ? isTouchDevice
                ? 47
                : 44
              : 38,
          position: isMobileViewport ? [0, 2.86, 13.9] : [0, 2.8, 9.5],
        }}
        dpr={
          isMobileViewport
            ? [1, mobileDprMax]
            : isLiteMode
              ? [1, 1.15]
              : [1, 1.6]
        }
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = SRGBColorSpace;
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = isMobileViewport ? 1.06 : 1.1;
        }}
        performance={{
          min: isMobileViewport ? 0.45 : isLiteMode ? 0.5 : 0.75,
        }}
        onPointerMissed={() => onHoverSection(null)}
        shadows={!isLiteMode && !isMobileViewport}
      >
        <Suspense fallback={null}>
          <HubScene
            activeSection={activeSection}
            hoveredSection={hoveredSection}
            isTouchDevice={isTouchDevice}
            onHoverSection={onHoverSection}
            onSelectSection={onSelectSection}
            onTransitionChange={onTransitionChange}
            sceneMode={sceneMode}
            touchOrbitOffsetRef={touchOrbitOffsetRef}
            touchLookOffsetRef={touchLookOffsetRef}
            touchZoomOffsetRef={touchZoomOffsetRef}
            viewportKind={viewportKind}
            cameraMode={cameraMode}
            viewState={viewState}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PortfolioHubCanvas;
