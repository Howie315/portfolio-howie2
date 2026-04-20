import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

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
  touchOrbitOffset = [0, 0],
  touchLookOffset = [0, 0],
  touchZoomOffset = 0,
  viewportKind = "desktop",
  viewState,
}: PortfolioHubCanvasProps): React.JSX.Element => {
  const isLiteMode = sceneMode === "lite";
  const isMobileViewport = viewportKind === "mobile";

  return (
    <div className="absolute inset-0 z-10">
      <Canvas
        camera={{
          fov: isMobileViewport
            ? 50
            : isLiteMode
              ? isTouchDevice
                ? 47
                : 44
              : 38,
          position: isMobileViewport ? [0, 2.5, 10.2] : [0, 2.8, 9.5],
        }}
        dpr={isMobileViewport ? [1, 1] : isLiteMode ? [1, 1.15] : [1, 1.6]}
        gl={{
          antialias: !isLiteMode && !isMobileViewport,
          alpha: true,
          powerPreference: "high-performance",
        }}
        performance={{
          min: isMobileViewport ? 0.45 : isLiteMode ? 0.5 : 0.75,
        }}
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
            touchOrbitOffset={touchOrbitOffset}
            touchLookOffset={touchLookOffset}
            touchZoomOffset={touchZoomOffset}
            viewportKind={viewportKind}
            viewState={viewState}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PortfolioHubCanvas;
