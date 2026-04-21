import { useEffect, useMemo, useRef } from "react";
import type { Vector3 } from "three";
import { Vector3 as ThreeVector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { cameraPresets } from "../cameraConfig";
import type { CameraView, TouchVectorRef, TouchZoomRef } from "../types";
import type { SceneSectionId } from "../../../../data/sceneContent";

type HubCameraRigProps = {
  activeSection: SceneSectionId | null;
  hoveredSection: SceneSectionId | null;
  isTouchDevice?: boolean;
  onTransitionChange?: (isTransitioning: boolean) => void;
  touchOrbitOffsetRef?: TouchVectorRef;
  touchLookOffsetRef?: TouchVectorRef;
  touchZoomOffsetRef?: TouchZoomRef;
  viewState: CameraView;
};

const HubCameraRig = ({
  activeSection,
  hoveredSection,
  isTouchDevice = false,
  onTransitionChange,
  touchOrbitOffsetRef,
  touchLookOffsetRef,
  touchZoomOffsetRef,
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
        position: [0, 2.96, 11.9] as [number, number, number],
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
    const touchOrbitOffset = touchOrbitOffsetRef?.current ?? [0, 0];
    const touchLookOffset = touchLookOffsetRef?.current ?? [0, 0];
    const touchZoomOffset = touchZoomOffsetRef?.current ?? 0;
    const isHubView = viewState === "hub" || !activeSection;
    const parallaxStrength = isTouchDevice
      ? isHubView
        ? 0.48
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
      const orbitYaw = touchOrbitOffset[0] * (isHubView ? 0.72 : 0.15);
      const orbitPitch = touchOrbitOffset[1] * (isHubView ? 0.28 : 0.07);
      const orbitVector = desiredPosition.clone().sub(baseLookAt);
      const radius = Math.max(
        isHubView ? 9.6 : 2.8,
        Math.min(
          isHubView ? 15.1 : 7.4,
          orbitVector.length() + (isHubView ? touchZoomOffset : 0),
        ),
      );
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

      lookAtTarget.x += touchOrbitOffset[0] * (isHubView ? 0.72 : 0.14);
      lookAtTarget.y += touchOrbitOffset[1] * (isHubView ? 0.24 : 0.07);
    }

    const previousDistance = camera.position.distanceTo(desiredPosition);
    camera.position.lerp(
      desiredPosition,
      1 - Math.exp(-clampedDelta * (isTouchDevice ? 5.6 : 4.4)),
    );

    lookAtTarget.x += horizontalInput * (isTouchDevice ? 0.2 : 0.22);
    lookAtTarget.y += verticalInput * (isTouchDevice ? 0.14 : 0.14);

    currentLookAtRef.current.lerp(
      lookAtTarget,
      1 - Math.exp(-clampedDelta * (isTouchDevice ? 6.1 : 5.2)),
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
