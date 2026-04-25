import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { Group } from "three";
import { Color, DoubleSide, Mesh } from "three";
import type { ThreeEvent } from "@react-three/fiber";
import { useFrame, useThree } from "@react-three/fiber";

import type { SceneSectionId } from "../../../../data/sceneContent";

type InteractiveHubObjectProps = {
  accentColor: string;
  children: ReactNode;
  hoveredSection: SceneSectionId | null;
  hitAreaOffset?: [number, number, number];
  hitAreaScale?: [number, number, number];
  id: SceneSectionId;
  isTouchDevice?: boolean;
  isSelected: boolean;
  label: string;
  onHover: (sectionId: SceneSectionId | null) => void;
  onSelect: (sectionId: SceneSectionId) => void;
  position: [number, number, number];
};

const InteractiveHubObject = ({
  accentColor,
  children,
  hoveredSection,
  hitAreaOffset = [0, 0, 0],
  hitAreaScale = [2.2, 2.2, 2.2],
  id,
  isTouchDevice = false,
  isSelected,
  label,
  onHover,
  onSelect,
  position,
}: InteractiveHubObjectProps): React.JSX.Element => {
  const { gl } = useThree();
  const groupRef = useRef<Group | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const accent = new Color(accentColor);
  const neutral = new Color("#150d1e");

  const isHovered = hoveredSection === id;
  const shouldHighlight = isHovered || isSelected;

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || isTouchDevice) {
      return undefined;
    }

    document.body.style.cursor = shouldHighlight ? "pointer" : "";
    gl.domElement.style.cursor = shouldHighlight ? "pointer" : "";

    return () => {
      document.body.style.cursor = "";
      gl.domElement.style.cursor = "";
    };
  }, [gl, isTouchDevice, shouldHighlight]);

  const handleHoverStart = (): void => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (!isTouchDevice) {
      document.body.style.cursor = "pointer";
      gl.domElement.style.cursor = "pointer";
    }

    onHover(id);
  };

  const handleHoverEnd = (): void => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      if (!isTouchDevice) {
        document.body.style.cursor = "";
        gl.domElement.style.cursor = "";
      }

      onHover(null);
      hoverTimeoutRef.current = null;
    }, 70);
  };

  const handleSelect = (
    event: ThreeEvent<PointerEvent | MouseEvent>,
    source: "click" | "touch",
  ): void => {
    event.stopPropagation();

    if (source === "click" && isTouchDevice) {
      return;
    }

    onSelect(id);
  };

  const resetTouchState = (): void => {
    activePointerIdRef.current = null;
    touchStartRef.current = null;
  };

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    const targetScale = isSelected ? 1.075 : isHovered ? 1.045 : 1;
    const nextScale =
      groupRef.current.scale.x +
      (targetScale - groupRef.current.scale.x) * delta * 6.8;
    const rotationTarget = isSelected ? 0.055 : isHovered ? 0.035 : 0;

    groupRef.current.scale.setScalar(nextScale);
    groupRef.current.position.y =
      position[1] + Math.sin(performance.now() * 0.00065 + position[0]) * 0.045;
    groupRef.current.rotation.y +=
      (rotationTarget - groupRef.current.rotation.y) * delta * 4.2;

    groupRef.current.traverse((object) => {
      if (!(object instanceof Mesh)) {
        return;
      }

      const material = object.material;

      if (Array.isArray(material)) {
        material.forEach((entry) => {
          if ("emissive" in entry && entry.emissive) {
            entry.emissive.lerp(
              shouldHighlight ? accent : neutral,
              delta * 5.8,
            );
            entry.emissiveIntensity = isSelected
              ? 1.05
              : isHovered
                ? 0.78
                : 0.16;
          }
        });
        return;
      }

      if ("emissive" in material && material.emissive) {
        material.emissive.lerp(shouldHighlight ? accent : neutral, delta * 5.8);
        material.emissiveIntensity = isSelected
          ? 1.05
          : isHovered
            ? 0.78
            : 0.16;
      }
    });
  });

  return (
    <group position={position} ref={groupRef}>
      <mesh
        position={hitAreaOffset}
        onClick={(event) => {
          handleSelect(event, "click");
        }}
        onPointerCancel={() => {
          if (isTouchDevice) {
            resetTouchState();
            onHover(null);
          } else {
            document.body.style.cursor = "";
            gl.domElement.style.cursor = "";
          }
        }}
        onPointerDown={(event) => {
          event.stopPropagation();
          if (isTouchDevice) {
            activePointerIdRef.current = event.pointerId;
            touchStartRef.current = { x: event.clientX, y: event.clientY };
            onHover(id);
          }
        }}
        onPointerEnter={(event) => {
          event.stopPropagation();
          if (!isTouchDevice) {
            handleHoverStart();
          }
        }}
        onPointerLeave={(event) => {
          event.stopPropagation();
          if (!isTouchDevice) {
            handleHoverEnd();
          }
        }}
        onPointerMissed={() => {
          if (isTouchDevice) {
            resetTouchState();
          } else {
            handleHoverEnd();
          }
        }}
        onPointerMove={(event) => {
          event.stopPropagation();
          if (isTouchDevice) {
            const touchStart = touchStartRef.current;

            if (touchStart) {
              const movedDistance = Math.hypot(
                event.clientX - touchStart.x,
                event.clientY - touchStart.y,
              );

              if (movedDistance > 12) {
                resetTouchState();
                onHover(null);
              }
            }
          } else {
            handleHoverStart();
          }
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          if (!isTouchDevice) {
            handleHoverEnd();
          }
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          if (!isTouchDevice) {
            handleHoverStart();
          }
        }}
        onPointerUp={(event) => {
          if (
            !isTouchDevice ||
            activePointerIdRef.current !== event.pointerId ||
            !touchStartRef.current
          ) {
            return;
          }

          const movedDistance = Math.hypot(
            event.clientX - touchStartRef.current.x,
            event.clientY - touchStartRef.current.y,
          );

          resetTouchState();

          if (movedDistance <= 16) {
            handleSelect(event, "touch");
          } else {
            onHover(null);
          }
        }}
      >
        <boxGeometry args={hitAreaScale} />
        <meshBasicMaterial
          depthWrite={false}
          opacity={0}
          toneMapped={false}
          transparent
        />
      </mesh>

      {shouldHighlight ? (
        <>
          <mesh position={[0, -0.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.02, isSelected ? 1.62 : 1.38, 56, 1]} />
            <meshBasicMaterial
              color={accentColor}
              opacity={isSelected ? 0.3 : 0.15}
              side={DoubleSide}
              transparent
            />
          </mesh>
          <mesh position={[0, -0.76, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.58, isSelected ? 2.08 : 1.86, 56, 1]} />
            <meshBasicMaterial
              color={accentColor}
              opacity={isSelected ? 0.14 : 0.08}
              side={DoubleSide}
              transparent
            />
          </mesh>
        </>
      ) : null}

      {children}

      {shouldHighlight ? (
        <>
          {[-0.8, -0.2, 0.45, 0.9].map((offset, index) => (
            <mesh
              key={`${label}-spark-${offset}`}
              position={[
                offset,
                0.64 + (index % 2) * 0.28,
                (index % 2 === 0 ? -0.22 : 0.26) * (isSelected ? 1.25 : 1),
              ]}
            >
              <sphereGeometry args={[isSelected ? 0.085 : 0.055, 10, 10]} />
              <meshBasicMaterial
                color={accentColor}
                opacity={isSelected ? 0.9 : 0.62}
                transparent
              />
            </mesh>
          ))}
        </>
      ) : null}
    </group>
  );
};

export default InteractiveHubObject;
