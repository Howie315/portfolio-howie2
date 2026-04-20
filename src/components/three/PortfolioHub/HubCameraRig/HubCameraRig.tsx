import { useEffect, useMemo, useRef } from "react";
import type { Vector3 } from "three";
import { Vector3 as ThreeVector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { cameraPresets } from "../cameraConfig";
import type { CameraView } from "../types";
import type { SceneSectionId } from "../../../../data/sceneContent";

type HubCameraRigProps = {
  activeSection: SceneSectionId | null;
  hoveredSection: SceneSectionId | null;
  isTouchDevice?: boolean;
  onTransitionChange?: (isTransitioning: boolean) => void;
  viewState: CameraView;
};

const HubCameraRig = ({
  activeSection,
  hoveredSection,
  isTouchDevice = false,
  onTransitionChange,
  viewState,
}: HubCameraRigProps): null => {
  const { camera, pointer } = useThree();
  const cameraTargetRef = useRef<Vector3>(new ThreeVector3());
  const lookAtTargetRef = useRef<Vector3>(new ThreeVector3());
  const currentLookAtRef = useRef<Vector3>(new ThreeVector3());
  const transitionRef = useRef(false);

  const preset = useMemo(() => {
    if (isTouchDevice && (viewState === "hub" || !activeSection)) {
      return {
        lookAt: [0, 1.22, -0.15] as [number, number, number],
        position: [0, 2.5, 7.9] as [number, number, number],
      };
    }

    if (viewState === "hub" || !activeSection) {
      return cameraPresets.hub;
    }

    if (isTouchDevice && activeSection === "about") {
      return {
        lookAt: [0, 1.16, 0.55] as [number, number, number],
        position: [0.42, 2.02, 3.72] as [number, number, number],
      };
    }

    return cameraPresets[activeSection];
  }, [activeSection, isTouchDevice, viewState]);

  useEffect(() => {
    cameraTargetRef.current.set(...preset.position);
    lookAtTargetRef.current.set(...preset.lookAt);
    currentLookAtRef.current.set(...preset.lookAt);
  }, [preset]);

  useFrame((_, delta) => {
    const clampedDelta = Math.min(delta, 1 / 20);
    const parallaxStrength = isTouchDevice
      ? 0
      : viewState === "hub"
        ? 0.45
        : 0.16;
    const hoveredLift = hoveredSection ? 0.08 : 0;
    const desiredPosition = cameraTargetRef.current.clone();

    desiredPosition.x += pointer.x * parallaxStrength;
    desiredPosition.y += pointer.y * parallaxStrength * 0.4 + hoveredLift;

    const previousDistance = camera.position.distanceTo(desiredPosition);
    camera.position.lerp(desiredPosition, 1 - Math.exp(-clampedDelta * 4.4));

    const lookAtTarget = lookAtTargetRef.current.clone();
    lookAtTarget.x += isTouchDevice ? 0 : pointer.x * 0.22;
    lookAtTarget.y += isTouchDevice ? 0 : pointer.y * 0.14;

    currentLookAtRef.current.lerp(
      lookAtTarget,
      1 - Math.exp(-clampedDelta * 5.2),
    );
    camera.lookAt(currentLookAtRef.current);

    const isTransitioning =
      previousDistance > (viewState === "hub" ? 0.045 : 0.03);

    if (transitionRef.current !== isTransitioning) {
      transitionRef.current = isTransitioning;
      onTransitionChange?.(isTransitioning);
    }
  });

  return null;
};

export default HubCameraRig;
