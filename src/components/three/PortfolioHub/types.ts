import type { SceneSectionId } from "../../../data/sceneContent";

export type CameraView = "focus" | "hub";
export type CameraMode = "cinematic" | "viewer";
export type SceneRenderMode = "full" | "lite";
export type TouchVectorRef = { current: [number, number] };
export type TouchZoomRef = { current: number };

export type PortfolioHubCanvasProps = {
  activeSection: SceneSectionId | null;
  hoveredSection: SceneSectionId | null;
  isTouchDevice?: boolean;
  onHoverSection: (sectionId: SceneSectionId | null) => void;
  onSelectSection: (sectionId: SceneSectionId) => void;
  onTransitionChange?: (isTransitioning: boolean) => void;
  sceneMode: SceneRenderMode;
  touchLookOffsetRef?: TouchVectorRef;
  touchOrbitOffsetRef?: TouchVectorRef;
  touchZoomOffsetRef?: TouchZoomRef;
  viewportKind?: "desktop" | "mobile" | "tablet";
  cameraMode?: CameraMode;
  viewState: CameraView;
};
