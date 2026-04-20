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
  touchOrbitOffset?: [number, number];
  touchLookOffset?: [number, number];
  touchZoomOffset?: number;
  viewState: CameraView;
};

const HubCameraRig = ({
  activeSection,
  hoveredSection,
  isTouchDevice = false,
  onTransitionChange,
  touchOrbitOffset = [0, 0],
  touchLookOffset = [0, 0],
  touchZoomOffset = 0,
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
    const isHubView = viewState === "hub" || !activeSection;
    const parallaxStrength = isTouchDevice
      ? isHubView
        ? 0.6
        : 0.26
      : isHubView
        ? 0.45
        : 0.16;
    const hoveredLift = hoveredSection ? 0.08 : 0;
    const basePosition = cameraTargetRef.current.clone();
    const baseLookAt = lookAtTargetRef.current.clone();
    const desiredPosition = basePosition.clone();

    const horizontalInput = isTouchDevice ? touchLookOffset[0] : pointer.x;
    const verticalInput = isTouchDevice ? touchLookOffset[1] : pointer.y;

    desiredPosition.x += horizontalInput * parallaxStrength;
    desiredPosition.y += verticalInput * parallaxStrength * 0.4 + hoveredLift;

    const lookAtTarget = baseLookAt.clone();

    if (isTouchDevice) {
      const orbitYaw = touchOrbitOffset[0] * (isHubView ? 0.88 : 0.18);
      const orbitPitch = touchOrbitOffset[1] * (isHubView ? 0.34 : 0.08);
      const orbitVector = desiredPosition.clone().sub(baseLookAt);
      const radius = orbitVector.length() + (isHubView ? touchZoomOffset : 0);
      const nextYaw = Math.atan2(orbitVector.x, orbitVector.z) + orbitYaw;
      const nextPitch = Math.max(
        -0.45,
        Math.min(
          0.4,
          Math.atan2(
            orbitVector.y,
            Math.sqrt(
              orbitVector.x * orbitVector.x + orbitVector.z * orbitVector.z,
            ),
          ) + orbitPitch,
        ),
      );
      const planarRadius = Math.cos(nextPitch) * radius;

      desiredPosition.set(
        baseLookAt.x + Math.sin(nextYaw) * planarRadius,
        baseLookAt.y + Math.sin(nextPitch) * radius + hoveredLift,
        baseLookAt.z + Math.cos(nextYaw) * planarRadius,
      );

      lookAtTarget.x += touchOrbitOffset[0] * (isHubView ? 0.95 : 0.18);
      lookAtTarget.y += touchOrbitOffset[1] * (isHubView ? 0.3 : 0.08);
    }

    const previousDistance = camera.position.distanceTo(desiredPosition);
    camera.position.lerp(
      desiredPosition,
      1 - Math.exp(-clampedDelta * (isTouchDevice ? 5.1 : 4.4)),
    );

    lookAtTarget.x += horizontalInput * (isTouchDevice ? 0.2 : 0.22);
    lookAtTarget.y += verticalInput * (isTouchDevice ? 0.14 : 0.14);

    currentLookAtRef.current.lerp(
      lookAtTarget,
      1 - Math.exp(-clampedDelta * (isTouchDevice ? 5.8 : 5.2)),
    );
    camera.lookAt(currentLookAtRef.current);

    const isTransitioning = previousDistance > (isHubView ? 0.045 : 0.03);

    if (transitionRef.current !== isTransitioning) {
      transitionRef.current = isTransitioning;
      onTransitionChange?.(isTransitioning);
    }
  });

  return null;
};

export default HubCameraRig;
