import type { SceneSectionId } from "../../../data/sceneContent";

export type CameraView = "focus" | "hub";
export type SceneRenderMode = "full" | "lite";

export type PortfolioHubCanvasProps = {
  activeSection: SceneSectionId | null;
  hoveredSection: SceneSectionId | null;
  isTouchDevice?: boolean;
  onHoverSection: (sectionId: SceneSectionId | null) => void;
  onSelectSection: (sectionId: SceneSectionId) => void;
  onTransitionChange?: (isTransitioning: boolean) => void;
  touchOrbitOffset?: [number, number];
  touchZoomOffset?: number;
  sceneMode: SceneRenderMode;
  touchLookOffset?: [number, number];
  viewportKind?: "desktop" | "mobile" | "tablet";
  viewState: CameraView;
};
