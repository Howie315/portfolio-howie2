import { useMemo, useRef } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BackSide,
  Color,
  Group,
  Mesh,
  Points,
  SpotLight,
} from "three";

import type { SceneSectionId } from "../../../../data/sceneContent";
import { HubCameraRig } from "../HubCameraRig";
import { InteractiveHubObject } from "../InteractiveHubObject";
import type {
  CameraMode,
  CameraView,
  SceneRenderMode,
  TouchVectorRef,
  TouchZoomRef,
} from "../types";

type HubSceneProps = {
  activeSection: SceneSectionId | null;
  hoveredSection: SceneSectionId | null;
  isTouchDevice?: boolean;
  onHoverSection: (sectionId: SceneSectionId | null) => void;
  onSelectSection: (sectionId: SceneSectionId) => void;
  onTransitionChange?: (isTransitioning: boolean) => void;
  sceneMode: SceneRenderMode;
  touchOrbitOffsetRef?: TouchVectorRef;
  touchLookOffsetRef?: TouchVectorRef;
  touchZoomOffsetRef?: TouchZoomRef;
  viewportKind?: "desktop" | "mobile" | "tablet";
  cameraMode?: CameraMode;
  viewState: CameraView;
};

type PortalRiftProps = {
  accentColor: string;
  isActive: boolean;
  isLiteMode: boolean;
};

type MonitorInterfaceProps = {
  isActive: boolean;
  isLiteMode: boolean;
};

type WorkspaceLightingProps = {
  activeVisualSection: SceneSectionId | null;
  chamberAccent: string;
  isLiteMode: boolean;
};

type DeskWorkspaceProps = {
  activeSection: SceneSectionId | null;
  hoveredSection: SceneSectionId | null;
  isLiteMode: boolean;
  isTouchDevice: boolean;
  mobileHitScale: number;
  onHoverSection: (sectionId: SceneSectionId | null) => void;
  onSelectSection: (sectionId: SceneSectionId) => void;
};

const wallColor = new Color("#0d0715");
const sectionAccentMap: Record<SceneSectionId, string> = {
  about: "#ff4a8a",
  contact: "#7e4cff",
  experience: "#ff8db3",
  projects: "#6dcbff",
  skills: "#d2b1ff",
};
const shardPositions = [
  [-5.2, 1.7, -1.4],
  [4.8, 1.4, -0.8],
  [-4.1, 2.6, -3.2],
  [4.1, 2.8, -2.8],
  [-1.6, 3.7, -4.4],
  [1.9, 3.4, -4.1],
] as const;
const experienceCartridges = [
  {
    accent: "#6dcbff",
    code: "SYNC",
    label: "Synchrony",
    position: [-0.34, 0.34, 0.34],
    rotation: [0.08, -0.16, -0.08],
  },
  {
    accent: "#ff8db3",
    code: "SIZZLE",
    label: "Sizzle",
    position: [0.35, 0.32, 0.34],
    rotation: [0.08, 0.18, 0.08],
  },
] as const;
const keyboardRows = [
  { count: 12, width: 0.105, z: -0.18, xOffset: -0.63 },
  { count: 11, width: 0.112, z: -0.035, xOffset: -0.59 },
  { count: 10, width: 0.122, z: 0.11, xOffset: -0.53 },
  { count: 8, width: 0.145, z: 0.255, xOffset: -0.42 },
] as const;
const keyboardAccentKeys = new Set(["0-11", "2-0", "3-7"]);
const portalEnergyNodes = [
  { angle: 0.15, radius: 1.52, speed: 0.38, y: 0.12 },
  { angle: 1.4, radius: 1.86, speed: -0.24, y: -0.22 },
  { angle: 2.55, radius: 1.46, speed: 0.31, y: 0.34 },
  { angle: 3.7, radius: 1.74, speed: -0.34, y: -0.08 },
  { angle: 4.8, radius: 1.58, speed: 0.28, y: 0.24 },
] as const;
const portalSpokes = [0, 0.52, 1.04, 1.57, 2.1, 2.62] as const;

const MonitorInterface = ({
  isActive,
  isLiteMode,
}: MonitorInterfaceProps): React.JSX.Element => {
  const screenRef = useRef<Mesh | null>(null);
  const scanGroupRef = useRef<Group | null>(null);
  const cursorRef = useRef<Mesh | null>(null);
  const wakeRingRef = useRef<Mesh | null>(null);
  const orbitRef = useRef<Group | null>(null);
  const railRef = useRef<Mesh | null>(null);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (screenRef.current) {
      const targetScale = isActive ? 1.035 : 1;
      screenRef.current.scale.lerp(
        { x: targetScale, y: targetScale, z: 1 },
        1 - Math.exp(-delta * 5),
      );
    }

    if (scanGroupRef.current) {
      scanGroupRef.current.position.y =
        -0.32 + ((time * (isActive ? 0.42 : 0.22)) % 0.64);
    }

    if (cursorRef.current) {
      cursorRef.current.position.x = -0.42 + Math.sin(time * 1.3) * 0.08;
      cursorRef.current.scale.x = 1 + Math.sin(time * 4.5) * 0.12;
    }

    if (wakeRingRef.current) {
      wakeRingRef.current.rotation.z += delta * (isActive ? 0.82 : 0.28);
    }

    if (orbitRef.current) {
      orbitRef.current.rotation.z -= delta * (isActive ? 0.58 : 0.18);
      orbitRef.current.scale.setScalar(
        1 + Math.sin(time * 1.8) * (isActive ? 0.045 : 0.016),
      );
    }

    if (railRef.current) {
      railRef.current.scale.y =
        1 + Math.sin(time * (isActive ? 3.2 : 1.4)) * 0.08;
    }
  });

  return (
    <group>
      <mesh position={[0, 0, -0.12]}>
        <circleGeometry args={[1.18, 48]} />
        <meshBasicMaterial
          color="#6dcbff"
          opacity={isActive ? 0.2 : 0.1}
          transparent
        />
      </mesh>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.92, 1.08, 0.09]} />
        <meshStandardMaterial
          color="#111721"
          emissive="#061018"
          emissiveIntensity={isActive ? 0.24 : 0.12}
          metalness={0.42}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0, 0.052]} ref={screenRef}>
        <planeGeometry args={[1.68, 0.84]} />
        <meshBasicMaterial
          color="#6dcbff"
          opacity={isActive ? 0.68 : 0.42}
          transparent
        />
      </mesh>
      <mesh position={[0, 0, 0.057]}>
        <planeGeometry args={[1.52, 0.7]} />
        <meshBasicMaterial color="#05101a" opacity={0.45} transparent />
      </mesh>
      <mesh position={[-0.5, 0.18, 0.062]}>
        <planeGeometry args={[0.48, 0.09]} />
        <meshBasicMaterial color="#e7fbff" opacity={0.25} transparent />
      </mesh>
      <mesh position={[0.18, 0.18, 0.063]}>
        <planeGeometry args={[0.62, 0.09]} />
        <meshBasicMaterial color="#ffffff" opacity={0.12} transparent />
      </mesh>
      <mesh position={[0.1, -0.08, 0.064]} ref={cursorRef}>
        <planeGeometry args={[0.52, 0.055]} />
        <meshBasicMaterial color="#071019" opacity={0.68} transparent />
      </mesh>
      <mesh position={[-0.62, -0.12, 0.067]} ref={railRef}>
        <planeGeometry args={[0.045, 0.46]} />
        <meshBasicMaterial
          color="#a9efff"
          opacity={isActive ? 0.42 : 0.16}
          transparent
        />
      </mesh>
      {[0.34, 0.18, 0.02, -0.14].map((yOffset, index) => (
        <mesh key={`monitor-stat-${yOffset}`} position={[0.42, yOffset, 0.067]}>
          <planeGeometry args={[0.42 - index * 0.055, 0.032]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#6dcbff" : "#ff8db3"}
            opacity={isActive ? 0.34 : 0.14}
            transparent
          />
        </mesh>
      ))}
      <group position={[0, 0, 0.066]} ref={scanGroupRef}>
        {[-0.24, 0, 0.24].map((yOffset) => (
          <mesh key={`scan-${yOffset}`} position={[0, yOffset, 0]}>
            <planeGeometry args={[1.5, 0.018]} />
            <meshBasicMaterial
              color="#dffaff"
              opacity={isActive ? 0.13 : 0.06}
              transparent
            />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 0, 0.075]} ref={wakeRingRef}>
        <ringGeometry args={[0.6, 0.68, isLiteMode ? 40 : 70]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#a9efff"
          opacity={isActive ? 0.24 : 0.08}
          transparent
        />
      </mesh>
      <group position={[0, 0, 0.082]} ref={orbitRef}>
        <mesh rotation={[0, 0, 0.24]}>
          <ringGeometry args={[0.78, 0.792, isLiteMode ? 42 : 72]} />
          <meshBasicMaterial
            blending={AdditiveBlending}
            color="#6dcbff"
            opacity={isActive ? 0.32 : 0.09}
            transparent
          />
        </mesh>
        <mesh position={[0.78, 0, 0]}>
          <sphereGeometry args={[0.032, 10, 10]} />
          <meshBasicMaterial
            color="#e7fbff"
            opacity={isActive ? 0.78 : 0.28}
            transparent
          />
        </mesh>
      </group>
      <mesh position={[0, -0.76, 0]}>
        <cylinderGeometry args={[0.05, 0.09, 0.66, 10]} />
        <meshStandardMaterial
          color="#1f1a28"
          metalness={0.32}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.07, 18]} />
        <meshStandardMaterial
          color="#221a28"
          metalness={0.24}
          roughness={0.34}
        />
      </mesh>
    </group>
  );
};

const AmbientField = ({
  isLiteMode,
  isMobileViewport,
}: {
  isLiteMode: boolean;
  isMobileViewport: boolean;
}): React.JSX.Element => {
  const pointsRef = useRef<Points | null>(null);
  const ambientParticlePositions = useMemo(() => {
    const count = isMobileViewport ? 36 : isLiteMode ? 52 : 92;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 13;
      positions[index * 3 + 1] = Math.random() * 5.6 + 0.1;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 11 - 1.9;
    }

    return positions;
  }, [isLiteMode, isMobileViewport]);

  useFrame((state, delta) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y += delta * 0.018;
    pointsRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.28) * 0.1;
  });

  return (
    <points position={[0, 0.8, -1.9]} ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          args={[ambientParticlePositions, 3]}
          attach="attributes-position"
        />
      </bufferGeometry>
      <pointsMaterial
        color="#b892ff"
        opacity={isMobileViewport ? 0.38 : 0.54}
        size={isMobileViewport ? 0.026 : 0.038}
        sizeAttenuation
        transparent
      />
    </points>
  );
};

const WorkspaceLighting = ({
  activeVisualSection,
  chamberAccent,
  isLiteMode,
}: WorkspaceLightingProps): React.JSX.Element => {
  const deskLightRef = useRef<SpotLight | null>(null);
  const portalLightRef = useRef<SpotLight | null>(null);

  useFrame((state) => {
    const pulse = Math.sin(state.clock.elapsedTime * 1.45) * 0.5 + 0.5;

    if (deskLightRef.current) {
      deskLightRef.current.intensity = (isLiteMode ? 10 : 15) + pulse * 2.5;
    }

    if (portalLightRef.current) {
      portalLightRef.current.intensity =
        (activeVisualSection === "contact" ? 34 : 20) + pulse * 7;
    }
  });

  return (
    <>
      <ambientLight intensity={isLiteMode ? 0.68 : 0.58} />
      <hemisphereLight
        color="#8063ff"
        groundColor="#05030c"
        intensity={isLiteMode ? 0.36 : 0.42}
      />
      <directionalLight
        castShadow={!isLiteMode}
        color="#ffe0f5"
        intensity={isLiteMode ? 1.1 : 1.45}
        position={isLiteMode ? [4.8, 8.2, 6.8] : [5.6, 8.8, 6.2]}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <spotLight
        angle={0.48}
        color="#ffd6eb"
        distance={9}
        penumbra={0.92}
        position={[-1.8, 4.6, 2.8]}
        ref={deskLightRef}
      />
      <spotLight
        angle={0.58}
        color={chamberAccent}
        distance={10}
        penumbra={0.82}
        position={[0, 3.7, -1.3]}
        ref={portalLightRef}
        target-position={[2.35, 1.7, -4.65]}
      />
      <pointLight color="#7e4cff" intensity={22} position={[-4.4, 3, 1.5]} />
      <pointLight color="#ff4a8a" intensity={16} position={[3.8, 2.8, 0.2]} />
      <pointLight color="#6dcbff" intensity={12} position={[-1.7, 2.4, 0.5]} />
    </>
  );
};

const PortalRift = ({
  accentColor,
  isActive,
  isLiteMode,
}: PortalRiftProps): React.JSX.Element => {
  const groupRef = useRef<Group | null>(null);
  const coreRef = useRef<Mesh | null>(null);
  const haloRef = useRef<Mesh | null>(null);
  const particleGroupRef = useRef<Group | null>(null);
  const spokeGroupRef = useRef<Group | null>(null);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const targetScale = isActive ? 1.12 : 1;

    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(time * 0.22) * 0.035;
      groupRef.current.scale.lerp(
        { x: targetScale, y: targetScale, z: targetScale },
        1 - Math.exp(-delta * 4.8),
      );
    }

    if (coreRef.current) {
      coreRef.current.rotation.z -= delta * (isActive ? 0.72 : 0.32);
      coreRef.current.scale.setScalar(
        1 +
          Math.sin(time * (isActive ? 3.4 : 1.8)) * (isActive ? 0.055 : 0.025),
      );
    }

    if (haloRef.current) {
      haloRef.current.rotation.z += delta * (isActive ? 0.44 : 0.18);
    }

    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.z -= delta * (isActive ? 0.58 : 0.18);
      particleGroupRef.current.rotation.y = Math.sin(time * 0.5) * 0.12;
    }

    if (spokeGroupRef.current) {
      spokeGroupRef.current.rotation.z += delta * (isActive ? 0.36 : 0.08);
      spokeGroupRef.current.scale.setScalar(
        1 + Math.sin(time * 2.2) * (isActive ? 0.055 : 0.018),
      );
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.8, -0.08]}>
        <cylinderGeometry args={[0.9, 1.12, 0.22, 8]} />
        <meshStandardMaterial
          color="#1b1124"
          metalness={0.16}
          roughness={0.62}
        />
      </mesh>
      <mesh castShadow ref={haloRef}>
        <torusGeometry args={[1.34, 0.13, 24, isLiteMode ? 90 : 132]} />
        <meshStandardMaterial
          color="#2b1744"
          emissive={accentColor}
          emissiveIntensity={isActive ? 1.3 : 0.58}
          metalness={0.32}
          roughness={0.14}
        />
      </mesh>
      <mesh position={[0, 0, -0.08]} ref={coreRef}>
        <circleGeometry args={[0.98, isLiteMode ? 48 : 76]} />
        <meshBasicMaterial
          color={accentColor}
          opacity={isActive ? 0.58 : 0.36}
          transparent
        />
      </mesh>
      <mesh position={[0, 0, -0.04]} rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[0.42, 0.88, isLiteMode ? 48 : 86]} />
        <meshBasicMaterial
          color="#d8c6ff"
          opacity={isActive ? 0.2 : 0.11}
          transparent
        />
      </mesh>
      <mesh position={[0, 0, 0.22]} rotation={[0.4, 0.3, 0.2]}>
        <torusGeometry args={[1.65, 0.018, 10, 96]} />
        <meshBasicMaterial color="#6dcbff" transparent opacity={0.48} />
      </mesh>
      <mesh position={[0, 0.05, -0.1]} rotation={[0.2, -0.3, 0.16]}>
        <torusGeometry args={[1.95, 0.014, 10, 96]} />
        <meshBasicMaterial color="#ff7db6" transparent opacity={0.32} />
      </mesh>
      <group ref={spokeGroupRef}>
        {portalSpokes.map((rotation, index) => (
          <mesh
            key={`portal-spoke-${rotation}`}
            position={[0, 0, 0.18 + index * 0.004]}
            rotation={[0, 0, rotation]}
          >
            <boxGeometry args={[0.035, 2.54, 0.012]} />
            <meshBasicMaterial
              blending={AdditiveBlending}
              color={index % 2 === 0 ? "#7e4cff" : "#6dcbff"}
              opacity={isActive ? 0.18 : 0.055}
              transparent
            />
          </mesh>
        ))}
      </group>
      <group ref={particleGroupRef}>
        {portalEnergyNodes.map((node, index) => {
          const x = Math.cos(node.angle) * node.radius;
          const z = Math.sin(node.angle) * 0.22;

          return (
            <mesh
              key={`portal-node-${node.angle}`}
              position={[x, node.y, z]}
              rotation={[0, 0, node.angle + node.speed]}
            >
              <sphereGeometry args={[isActive ? 0.075 : 0.052, 10, 10]} />
              <meshBasicMaterial
                blending={AdditiveBlending}
                color={index % 2 === 0 ? "#d8c6ff" : "#6dcbff"}
                opacity={isActive ? 0.85 : 0.48}
                transparent
              />
            </mesh>
          );
        })}
      </group>
      {isActive ? (
        <>
          <mesh position={[0, 0, 0.02]}>
            <ringGeometry args={[1.5, 1.72, 80]} />
            <meshBasicMaterial
              blending={AdditiveBlending}
              color="#ffffff"
              opacity={0.16}
              transparent
            />
          </mesh>
          <mesh position={[0, 0, -0.12]}>
            <circleGeometry args={[1.26, isLiteMode ? 42 : 76]} />
            <meshBasicMaterial
              blending={AdditiveBlending}
              color="#1b0b3d"
              opacity={0.38}
              transparent
            />
          </mesh>
        </>
      ) : null}
    </group>
  );
};

const MechanicalKeyboard = ({
  isActive,
}: {
  isActive: boolean;
}): React.JSX.Element => {
  const chassisRef = useRef<Group | null>(null);
  const keyFieldRef = useRef<Group | null>(null);
  const rippleRef = useRef<Group | null>(null);
  const underglowRef = useRef<Mesh | null>(null);
  const commandCoreRef = useRef<Mesh | null>(null);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const activation = isActive ? 1 : 0;

    if (chassisRef.current) {
      chassisRef.current.rotation.x =
        -0.18 + Math.sin(time * 0.72) * (isActive ? 0.018 : 0.008);
      chassisRef.current.position.y =
        Math.sin(time * 1.1) * (isActive ? 0.012 : 0.004);
    }

    if (keyFieldRef.current) {
      keyFieldRef.current.children.forEach((keyGroup) => {
        const rowIndex = Number(keyGroup.userData.rowIndex ?? 0);
        const keyIndex = Number(keyGroup.userData.keyIndex ?? 0);
        const distance = keyIndex * 0.38 + rowIndex * 0.72;
        const wave = Math.sin(time * (isActive ? 4.8 : 1.4) - distance);
        const press = Math.max(0, wave) * (isActive ? 0.026 : 0.007);
        keyGroup.position.y = -press;

        keyGroup.traverse((object) => {
          if (!(object instanceof Mesh)) {
            return;
          }

          const material = object.material;
          const intensity = 0.1 + Math.max(0, wave) * (isActive ? 0.85 : 0.18);

          if (Array.isArray(material)) {
            material.forEach((entry) => {
              if ("emissiveIntensity" in entry) {
                entry.emissiveIntensity = intensity;
              }
            });
            return;
          }

          if ("emissiveIntensity" in material) {
            material.emissiveIntensity = intensity;
          }
        });
      });
    }

    if (rippleRef.current) {
      rippleRef.current.position.x =
        -0.72 + ((time * (isActive ? 0.7 : 0.28)) % 1.44);
      rippleRef.current.scale.x = 0.8 + Math.sin(time * 2.6) * 0.12;
    }

    if (underglowRef.current) {
      underglowRef.current.scale.x +=
        ((isActive ? 1.18 : 0.98) - underglowRef.current.scale.x) *
        (1 - Math.exp(-delta * 5));
      underglowRef.current.scale.z =
        1 + Math.sin(time * 1.8) * (isActive ? 0.06 : 0.02);
    }

    if (commandCoreRef.current) {
      commandCoreRef.current.rotation.z += delta * (isActive ? 1.2 : 0.26);
      commandCoreRef.current.scale.setScalar(
        1 + Math.sin(time * 3.1) * (isActive ? 0.08 : 0.025),
      );
    }
  });

  return (
    <group ref={chassisRef} rotation={[-0.18, 0, 0]}>
      <mesh position={[0, -0.03, 0.02]} ref={underglowRef}>
        <boxGeometry args={[1.98, 0.018, 0.82]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#ff4a8a"
          opacity={isActive ? 0.22 : 0.08}
          transparent
        />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.92, 0.09, 0.72]} />
        <meshStandardMaterial
          color="#12111a"
          emissive="#201020"
          emissiveIntensity={isActive ? 0.22 : 0.08}
          metalness={0.48}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.062, 0]}>
        <boxGeometry args={[1.78, 0.024, 0.58]} />
        <meshStandardMaterial
          color="#24202e"
          emissive="#0b0611"
          emissiveIntensity={0.08}
          metalness={0.22}
          roughness={0.28}
        />
      </mesh>
      <mesh position={[-0.02, 0.084, 0.27]} ref={rippleRef}>
        <boxGeometry args={[0.28, 0.012, 0.045]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#ffd9ea"
          opacity={isActive ? 0.34 : 0.12}
          transparent
        />
      </mesh>
      <group ref={keyFieldRef} position={[0, 0.092, -0.005]}>
        {keyboardRows.map((row, rowIndex) =>
          Array.from({ length: row.count }, (_, keyIndex) => {
            const keyId = `${rowIndex}-${keyIndex}`;
            const isAccentKey = keyboardAccentKeys.has(keyId);
            const keyWidth =
              rowIndex === 3 && keyIndex === 3 ? row.width * 2.4 : row.width;
            const keySpacing = rowIndex === 3 && keyIndex > 3 ? 0.145 : 0.116;
            const x =
              row.xOffset +
              keyIndex * keySpacing +
              (rowIndex === 3 && keyIndex > 3 ? 0.18 : 0);
            const ledColor =
              (keyIndex + rowIndex) % 3 === 0
                ? "#6dcbff"
                : (keyIndex + rowIndex) % 3 === 1
                  ? "#ff8db3"
                  : "#d2b1ff";

            return (
              <group
                key={`key-${rowIndex}-${keyIndex}`}
                position={[x, 0, row.z]}
                userData={{ keyIndex, rowIndex }}
              >
                <mesh position={[0, -0.025, 0]}>
                  <boxGeometry args={[keyWidth * 0.62, 0.035, 0.052]} />
                  <meshStandardMaterial
                    color="#6dcbff"
                    emissive={ledColor}
                    emissiveIntensity={isActive ? 0.46 : 0.12}
                    metalness={0.08}
                    roughness={0.32}
                  />
                </mesh>
                <mesh castShadow position={[0, 0.01, 0]}>
                  <boxGeometry args={[keyWidth, 0.052, 0.102]} />
                  <meshStandardMaterial
                    color={isAccentKey ? "#342037" : "#1d1a25"}
                    emissive={isAccentKey ? "#ff4a8a" : ledColor}
                    emissiveIntensity={
                      isActive ? 0.38 : isAccentKey ? 0.18 : 0.08
                    }
                    metalness={isAccentKey ? 0.26 : 0.14}
                    roughness={0.34}
                  />
                </mesh>
                <mesh position={[0, 0.041, 0]}>
                  <boxGeometry args={[keyWidth * 0.82, 0.012, 0.074]} />
                  <meshBasicMaterial
                    color={isAccentKey ? "#ffe2f0" : "#ffffff"}
                    opacity={isActive || isAccentKey ? 0.18 : 0.08}
                    transparent
                  />
                </mesh>
              </group>
            );
          }),
        )}
      </group>
      <group position={[0.74, 0.112, -0.28]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.085, 0.085, 0.042, 26]} />
          <meshStandardMaterial
            color="#2c2634"
            emissive="#6dcbff"
            emissiveIntensity={isActive ? 0.34 : 0.12}
            metalness={0.55}
            roughness={0.18}
          />
        </mesh>
        <mesh position={[0, 0.026, 0]} ref={commandCoreRef}>
          <ringGeometry args={[0.045, 0.06, 22]} />
          <meshBasicMaterial
            blending={AdditiveBlending}
            color="#6dcbff"
            opacity={isActive ? 0.62 : 0.2}
            transparent
          />
        </mesh>
      </group>
      <mesh position={[0, 0.112, -0.43]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.012, 8, 64, Math.PI]} />
        <meshStandardMaterial
          color="#15121c"
          emissive="#6dcbff"
          emissiveIntensity={isActive ? 0.12 : 0.04}
          metalness={0.18}
          roughness={0.42}
        />
      </mesh>
      <mesh position={[-0.72, 0.11, 0.31]}>
        <boxGeometry args={[0.22, 0.04, 0.08]} />
        <meshStandardMaterial
          color="#3b1f38"
          emissive="#ff4a8a"
          emissiveIntensity={isActive ? 0.58 : 0.18}
          metalness={0.22}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};

const MysticNotebook = ({
  isActive,
}: {
  isActive: boolean;
}): React.JSX.Element => {
  const rootRef = useRef<Group | null>(null);
  const coverRef = useRef<Group | null>(null);
  const emblemRef = useRef<Group | null>(null);
  const ribbonRef = useRef<Mesh | null>(null);
  const auraRef = useRef<Mesh | null>(null);
  const openProgressRef = useRef(0);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    openProgressRef.current +=
      ((isActive ? 1 : 0) - openProgressRef.current) *
      (1 - Math.exp(-delta * 5.6));
    const openProgress = openProgressRef.current;

    if (rootRef.current) {
      rootRef.current.position.y =
        Math.sin(time * 0.62) * (0.006 + openProgress * 0.014);
      rootRef.current.rotation.x =
        -0.085 + Math.sin(time * 0.55) * (0.004 + openProgress * 0.006);
    }

    if (coverRef.current) {
      coverRef.current.rotation.z =
        -openProgress * 0.13 + Math.sin(time * 0.9) * 0.004;
      coverRef.current.rotation.x = -openProgress * 0.035;
      coverRef.current.position.y = openProgress * 0.038;
      coverRef.current.position.x = -openProgress * 0.018;
    }

    if (emblemRef.current) {
      emblemRef.current.rotation.y += delta * (0.08 + openProgress * 0.18);
      emblemRef.current.scale.setScalar(
        1 + Math.sin(time * 2.2) * (0.012 + openProgress * 0.035),
      );
    }

    if (ribbonRef.current) {
      ribbonRef.current.position.z =
        0.46 + openProgress * 0.028 + Math.sin(time * 1.3) * 0.004;
    }

    if (auraRef.current) {
      auraRef.current.rotation.z += delta * (0.04 + openProgress * 0.16);
      auraRef.current.scale.setScalar(
        1 + Math.sin(time * 1.35) * (0.014 + openProgress * 0.045),
      );
    }
  });

  return (
    <group
      ref={rootRef}
      rotation={[-0.085, -0.34, 0.025]}
      scale={[1.42, 1.42, 1.42]}
    >
      <mesh position={[0.02, -0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.66, 0.87, 88]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#d2b1ff"
          opacity={isActive ? 0.18 : 0.035}
          transparent
        />
      </mesh>
      <mesh position={[0.03, -0.046, 0.02]}>
        <boxGeometry args={[1.36, 0.024, 0.98]} />
        <meshBasicMaterial color="#030205" opacity={0.52} transparent />
      </mesh>

      <mesh castShadow receiveShadow position={[0.045, -0.015, 0.018]}>
        <boxGeometry args={[1.14, 0.11, 0.86]} />
        <meshStandardMaterial
          color="#ece2d7"
          emissive="#b49bce"
          emissiveIntensity={isActive ? 0.08 : 0.025}
          metalness={0.04}
          roughness={0.72}
        />
      </mesh>

      {[0.36, 0.28, 0.2, 0.12, 0.04, -0.04, -0.12, -0.2, -0.28, -0.36].map(
        (z) => (
          <mesh key={`journal-page-edge-${z}`} position={[0.595, 0.044, z]}>
            <boxGeometry args={[0.035, 0.01, 0.032]} />
            <meshBasicMaterial color="#d8cec4" opacity={0.82} transparent />
          </mesh>
        ),
      )}
      {[-0.42, -0.28, -0.14, 0, 0.14, 0.28, 0.42, 0.52].map((x) => (
        <mesh key={`journal-bottom-edge-${x}`} position={[x, 0.035, 0.462]}>
          <boxGeometry args={[0.068, 0.008, 0.026]} />
          <meshBasicMaterial color="#ddd2c8" opacity={0.58} transparent />
        </mesh>
      ))}

      <group ref={coverRef}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.22, 0.108, 0.9]} />
          <meshStandardMaterial
            color="#030305"
            emissive="#12051b"
            emissiveIntensity={isActive ? 0.28 : 0.07}
            metalness={0.18}
            roughness={0.66}
          />
        </mesh>
        <mesh position={[0.025, 0.06, 0]}>
          <boxGeometry args={[1.02, 0.016, 0.72]} />
          <meshStandardMaterial
            color="#09080d"
            emissive="#21112c"
            emissiveIntensity={isActive ? 0.13 : 0.035}
            metalness={0.14}
            roughness={0.7}
          />
        </mesh>
        <mesh position={[-0.53, 0.083, 0]}>
          <boxGeometry args={[0.08, 0.035, 0.8]} />
          <meshStandardMaterial
            color="#17121b"
            emissive="#d2b1ff"
            emissiveIntensity={isActive ? 0.2 : 0.045}
            metalness={0.3}
            roughness={0.46}
          />
        </mesh>

        <mesh position={[0.5, 0.084, 0.46]} ref={ribbonRef}>
          <boxGeometry args={[0.045, 0.016, 0.28]} />
          <meshBasicMaterial
            color="#ff4a8a"
            opacity={isActive ? 0.74 : 0.42}
            transparent
          />
        </mesh>

        <group position={[0.08, 0.091, 0.02]} ref={emblemRef}>
          <mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
            <ringGeometry args={[0.25, 0.285, 4]} />
            <meshBasicMaterial
              blending={AdditiveBlending}
              color="#d2b1ff"
              opacity={isActive ? 0.88 : 0.46}
              transparent
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.11, 0.132, 48]} />
            <meshBasicMaterial
              blending={AdditiveBlending}
              color="#ff8db3"
              opacity={isActive ? 0.62 : 0.24}
              transparent
            />
          </mesh>
          <mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.035, 32]} />
            <meshBasicMaterial
              blending={AdditiveBlending}
              color="#f1edf5"
              opacity={isActive ? 0.56 : 0.2}
              transparent
            />
          </mesh>
        </group>

        {[-0.265, -0.205, -0.145, -0.085].map((z, index) => (
          <mesh key={`journal-title-a-${z}`} position={[0.08, 0.094, z]}>
            <boxGeometry args={[0.44 - index * 0.045, 0.012, 0.018]} />
            <meshBasicMaterial
              color="#f1edf5"
              opacity={isActive ? 0.76 : 0.54}
              transparent
            />
          </mesh>
        ))}
        {[0.225, 0.285].map((z, index) => (
          <mesh key={`journal-subtitle-${z}`} position={[0.08, 0.094, z]}>
            <boxGeometry args={[0.34 - index * 0.08, 0.01, 0.016]} />
            <meshBasicMaterial
              color="#d2b1ff"
              opacity={isActive ? 0.46 : 0.22}
              transparent
            />
          </mesh>
        ))}
      </group>

      <mesh
        position={[0.08, 0.118, 0.02]}
        rotation={[Math.PI / 2, 0, 0]}
        ref={auraRef}
      >
        <ringGeometry args={[0.48, 0.505, 72]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#d2b1ff"
          opacity={isActive ? 0.22 : 0.045}
          transparent
        />
      </mesh>
    </group>
  );
};

const ArchiveExperienceSystem = ({
  isActive,
  isLiteMode,
}: {
  isActive: boolean;
  isLiteMode: boolean;
}): React.JSX.Element => {
  const cartridgeRackRef = useRef<Group | null>(null);
  const consoleBodyRef = useRef<Group | null>(null);
  const consoleLidRef = useRef<Mesh | null>(null);
  const insertBayRef = useRef<Group | null>(null);
  const bootScreenRef = useRef<Mesh | null>(null);
  const powerLightRef = useRef<Mesh | null>(null);
  const selectedCartRef = useRef<Group | null>(null);
  const loaderRef = useRef<Mesh | null>(null);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (consoleBodyRef.current) {
      consoleBodyRef.current.position.y =
        Math.sin(time * 0.72) * (isActive ? 0.018 : 0.006);
      consoleBodyRef.current.rotation.x =
        Math.sin(time * 0.44) * (isActive ? 0.014 : 0.004);
    }

    if (cartridgeRackRef.current) {
      cartridgeRackRef.current.children.forEach((cartridge, index) => {
        const wave = Math.sin(time * (isActive ? 2.4 : 0.9) + index * 1.2);
        cartridge.position.y =
          Number(cartridge.userData.baseY ?? 0) +
          wave * (isActive ? 0.035 : 0.012);
        cartridge.rotation.z =
          Number(cartridge.userData.baseRotationZ ?? 0) +
          wave * (isActive ? 0.035 : 0.012);
      });
    }

    if (consoleLidRef.current) {
      consoleLidRef.current.position.z =
        -0.15 + (isActive ? -0.07 : 0) + Math.sin(time * 1.4) * 0.006;
      consoleLidRef.current.rotation.x =
        -0.04 + (isActive ? -0.08 : 0) + Math.sin(time * 0.85) * 0.01;
    }

    if (insertBayRef.current) {
      insertBayRef.current.scale.z +=
        ((isActive ? 1.12 : 1) - insertBayRef.current.scale.z) *
        (1 - Math.exp(-delta * 4.2));
    }

    if (bootScreenRef.current) {
      bootScreenRef.current.scale.x =
        1 + Math.sin(time * (isActive ? 5.2 : 1.7)) * (isActive ? 0.06 : 0.018);
    }

    if (powerLightRef.current) {
      powerLightRef.current.scale.setScalar(
        1 + Math.sin(time * (isActive ? 4.8 : 1.3)) * (isActive ? 0.18 : 0.05),
      );
    }

    if (selectedCartRef.current) {
      selectedCartRef.current.position.z +=
        ((isActive ? -0.16 : 0.02) - selectedCartRef.current.position.z) *
        (1 - Math.exp(-delta * 5));
      selectedCartRef.current.position.y +=
        ((isActive
          ? 0.46
          : Number(selectedCartRef.current.userData.baseY ?? 0)) -
          selectedCartRef.current.position.y) *
        (1 - Math.exp(-delta * 4.6));
      selectedCartRef.current.rotation.x =
        -0.24 + Math.sin(time * 1.1) * (isActive ? 0.025 : 0.008);
    }

    if (loaderRef.current) {
      loaderRef.current.position.x =
        -0.42 + ((time * (isActive ? 0.58 : 0.16)) % 0.84);
      loaderRef.current.scale.x = 0.82 + Math.sin(time * 2.6) * 0.1;
    }
  });

  return (
    <group rotation={[0, -0.18, 0]}>
      <group ref={consoleBodyRef}>
        <mesh castShadow receiveShadow position={[0, -0.01, -0.02]}>
          <boxGeometry args={[1.72, 0.12, 0.94]} />
          <meshStandardMaterial
            color="#101018"
            emissive="#0c0710"
            emissiveIntensity={0.08}
            metalness={0.26}
            roughness={0.42}
          />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.08, -0.02]}>
          <boxGeometry args={[1.56, 0.19, 0.82]} />
          <meshStandardMaterial
            color="#1e1b24"
            emissive="#2b1728"
            emissiveIntensity={isActive ? 0.22 : 0.08}
            metalness={0.32}
            roughness={0.28}
          />
        </mesh>
        <mesh position={[0, 0.195, 0.25]}>
          <boxGeometry args={[1.4, 0.034, 0.22]} />
          <meshStandardMaterial
            color="#302a35"
            emissive="#ff8db3"
            emissiveIntensity={isActive ? 0.08 : 0.025}
            metalness={0.22}
            roughness={0.3}
          />
        </mesh>
        <group ref={insertBayRef}>
          <mesh castShadow position={[0, 0.22, -0.16]} ref={consoleLidRef}>
            <boxGeometry args={[1.28, 0.06, 0.28]} />
            <meshStandardMaterial
              color="#35303b"
              emissive="#6dcbff"
              emissiveIntensity={isActive ? 0.16 : 0.04}
              metalness={0.22}
              roughness={0.24}
            />
          </mesh>
          <mesh position={[0, 0.265, -0.34]}>
            <boxGeometry args={[0.76, 0.024, 0.072]} />
            <meshBasicMaterial color="#08060d" transparent opacity={0.82} />
          </mesh>
          <mesh position={[0, 0.285, -0.34]}>
            <boxGeometry args={[0.56, 0.012, 0.02]} />
            <meshBasicMaterial
              blending={AdditiveBlending}
              color="#7cffd4"
              opacity={isActive ? 0.34 : 0.09}
              transparent
            />
          </mesh>
        </group>
        <group position={[-0.58, 0.245, -0.02]}>
          {[-0.08, 0.1].map((x, index) => (
            <mesh key={`archive-button-${x}`} position={[x, 0, 0]}>
              <boxGeometry args={[0.13, 0.03, 0.13]} />
              <meshStandardMaterial
                color="#1c1820"
                emissive={index === 0 ? "#ff8db3" : "#6dcbff"}
                emissiveIntensity={isActive ? 0.24 : 0.07}
                metalness={0.2}
                roughness={0.32}
              />
            </mesh>
          ))}
        </group>
        <mesh position={[0.6, 0.248, -0.02]} ref={powerLightRef}>
          <sphereGeometry args={[0.045, 14, 14]} />
          <meshBasicMaterial
            blending={AdditiveBlending}
            color={isActive ? "#7cffd4" : "#ff8db3"}
            opacity={isActive ? 0.9 : 0.36}
            transparent
          />
        </mesh>
        {[0.3, 0.38, 0.46, 0.54].map((x) => (
          <mesh key={`archive-vent-${x}`} position={[x, 0.226, 0.25]}>
            <boxGeometry args={[0.035, 0.012, 0.16]} />
            <meshBasicMaterial color="#07060b" transparent opacity={0.58} />
          </mesh>
        ))}
      </group>

      <group position={[0, 0.5, -0.41]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.32, 0.5, 0.06]} />
          <meshStandardMaterial
            color="#080711"
            emissive="#6dcbff"
            emissiveIntensity={isActive ? 0.14 : 0.04}
            metalness={0.2}
            roughness={0.22}
          />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <boxGeometry args={[1.12, 0.34, 0.016]} />
          <meshStandardMaterial
            color="#101623"
            emissive="#7cffd4"
            emissiveIntensity={isActive ? 0.22 : 0.06}
            metalness={0.12}
            roughness={0.36}
          />
        </mesh>
        <mesh position={[0, -0.12, 0.05]} ref={bootScreenRef}>
          <boxGeometry args={[0.9, 0.034, 0.014]} />
          <meshBasicMaterial
            color="#7cffd4"
            opacity={isActive ? 0.42 : 0.14}
            transparent
          />
        </mesh>
        <mesh position={[-0.42, 0.15, 0.052]} ref={loaderRef}>
          <boxGeometry args={[0.18, 0.018, 0.012]} />
          <meshBasicMaterial
            color="#ff8db3"
            opacity={isActive ? 0.42 : 0.08}
            transparent
          />
        </mesh>
        {[-0.04, 0.08, 0.2].map((y, index) => (
          <mesh key={`archive-boot-line-${y}`} position={[0, y, 0.032]}>
            <boxGeometry args={[0.72 - index * 0.16, 0.018, 0.012]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? "#6dcbff" : "#ff8db3"}
              opacity={isActive ? 0.3 : 0.08}
              transparent
            />
          </mesh>
        ))}
      </group>

      <group ref={cartridgeRackRef}>
        {experienceCartridges.map((cartridge, index) => (
          <group
            key={cartridge.code}
            position={cartridge.position}
            rotation={cartridge.rotation}
            ref={index === 0 ? selectedCartRef : undefined}
            userData={{
              baseRotationZ: cartridge.rotation[2],
              baseY: cartridge.position[1],
            }}
          >
            <mesh position={[0, -0.34, -0.005]}>
              <boxGeometry args={[0.32, 0.08, 0.105]} />
              <meshStandardMaterial
                color="#18151f"
                emissive={cartridge.accent}
                emissiveIntensity={isActive ? 0.1 : 0.035}
                metalness={0.14}
                roughness={0.4}
              />
            </mesh>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.44, 0.66, 0.105]} />
              <meshStandardMaterial
                color="#2c2731"
                emissive={cartridge.accent}
                emissiveIntensity={isActive ? 0.22 : 0.07}
                metalness={0.16}
                roughness={0.38}
              />
            </mesh>
            <mesh position={[0, 0.12, 0.058]}>
              <boxGeometry args={[0.34, 0.3, 0.018]} />
              <meshStandardMaterial
                color={cartridge.accent}
                emissive={cartridge.accent}
                emissiveIntensity={isActive ? 0.32 : 0.12}
                metalness={0.08}
                roughness={0.36}
              />
            </mesh>
            <mesh position={[0, 0.12, 0.07]}>
              <boxGeometry args={[0.24, 0.11, 0.012]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
            </mesh>
            <mesh position={[0, -0.18, 0.054]}>
              <boxGeometry args={[0.26, 0.035, 0.012]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.24} />
            </mesh>
            <mesh position={[0, -0.25, 0.054]}>
              <boxGeometry args={[0.18, 0.024, 0.012]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.16} />
            </mesh>
            <mesh position={[0, 0.28, 0.058]}>
              <boxGeometry args={[0.22, 0.045, 0.012]} />
              <meshBasicMaterial color="#08060d" opacity={0.58} transparent />
            </mesh>
          </group>
        ))}
      </group>
      <group position={[0, 0.16, 0.37]}>
        <mesh receiveShadow>
          <boxGeometry args={[1.44, 0.09, 0.2]} />
          <meshStandardMaterial
            color="#15131a"
            emissive="#ff8db3"
            emissiveIntensity={isActive ? 0.09 : 0.035}
            metalness={0.16}
            roughness={0.38}
          />
        </mesh>
        {[-0.34, 0.35].map((x, index) => (
          <mesh key={`cartridge-shelf-stop-${x}`} position={[x, 0.06, 0]}>
            <boxGeometry args={[0.08, 0.12, 0.2]} />
            <meshStandardMaterial color="#26222d" roughness={0.32} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const DeskBase = ({
  isLiteMode,
}: {
  isLiteMode: boolean;
}): React.JSX.Element => (
  <group>
    <mesh castShadow receiveShadow>
      <boxGeometry args={[5.25, 0.2, 2.16]} />
      <meshStandardMaterial
        color="#22142c"
        emissive="#110815"
        emissiveIntensity={0.14}
        metalness={0.24}
        roughness={0.34}
      />
    </mesh>
    <mesh position={[0, 0.115, 0]} receiveShadow>
      <boxGeometry args={[4.92, 0.035, 1.88]} />
      <meshStandardMaterial
        color="#3a233c"
        emissive="#1d101f"
        emissiveIntensity={0.12}
        metalness={0.1}
        roughness={0.18}
      />
    </mesh>
    <mesh position={[0, 0.145, 0.62]}>
      <boxGeometry args={[4.24, 0.018, 0.18]} />
      <meshBasicMaterial color="#ff4a8a" transparent opacity={0.18} />
    </mesh>
    {(
      [
        [-2.26, -0.67, -0.78],
        [2.26, -0.67, -0.78],
        [-2.26, -0.67, 0.78],
        [2.26, -0.67, 0.78],
      ] as const
    ).map((legPosition) => (
      <mesh castShadow key={legPosition.join("-")} position={legPosition}>
        <boxGeometry args={[0.2, 1.28, 0.22]} />
        <meshStandardMaterial
          color="#15101c"
          metalness={0.2}
          roughness={0.64}
        />
      </mesh>
    ))}
  </group>
);

const DeskWorkspace = ({
  activeSection,
  hoveredSection,
  isLiteMode,
  isTouchDevice,
  mobileHitScale,
  onHoverSection,
  onSelectSection,
}: DeskWorkspaceProps): React.JSX.Element => {
  const isArchiveAwake =
    hoveredSection === "experience" || activeSection === "experience";
  const isKeyboardAwake =
    hoveredSection === "about" || activeSection === "about";
  const isMonitorAwake =
    hoveredSection === "projects" || activeSection === "projects";
  const isNotebookAwake =
    hoveredSection === "skills" || activeSection === "skills";

  return (
    <group position={[0, 0.1, 0.85]}>
      <DeskBase isLiteMode={isLiteMode} />
      <InteractiveHubObject
        accentColor="#ff4a8a"
        hoveredSection={hoveredSection}
        hitAreaScale={
          isTouchDevice
            ? [
                2.35 * mobileHitScale,
                1.4 * mobileHitScale,
                1.35 * mobileHitScale,
              ]
            : [2.2, 1.18, 1.15]
        }
        id="about"
        isTouchDevice={isTouchDevice}
        isSelected={activeSection === "about"}
        label="Keyboard / About"
        onHover={onHoverSection}
        onSelect={onSelectSection}
        position={[0, 0.38, 0.58]}
      >
        <MechanicalKeyboard isActive={isKeyboardAwake} />
      </InteractiveHubObject>

      <InteractiveHubObject
        accentColor="#6dcbff"
        hoveredSection={hoveredSection}
        hitAreaScale={
          isTouchDevice
            ? [
                2.45 * mobileHitScale,
                2.7 * mobileHitScale,
                1.5 * mobileHitScale,
              ]
            : [2.35, 2.45, 1.35]
        }
        id="projects"
        isTouchDevice={isTouchDevice}
        isSelected={activeSection === "projects"}
        label="Monitor / Projects"
        onHover={onHoverSection}
        onSelect={onSelectSection}
        position={[-0.48, 1.15, -0.46]}
      >
        <MonitorInterface isActive={isMonitorAwake} isLiteMode={isLiteMode} />
      </InteractiveHubObject>

      <InteractiveHubObject
        accentColor="#d2b1ff"
        hoveredSection={hoveredSection}
        hitAreaScale={
          isTouchDevice
            ? [
                1.78 * mobileHitScale,
                1.28 * mobileHitScale,
                1.42 * mobileHitScale,
              ]
            : [1.58, 1.08, 1.26]
        }
        id="skills"
        isTouchDevice={isTouchDevice}
        isSelected={activeSection === "skills"}
        label="Occult Notebook / Skills"
        onHover={onHoverSection}
        onSelect={onSelectSection}
        position={[-1.58, 0.43, -0.02]}
      >
        <MysticNotebook isActive={isNotebookAwake} />
      </InteractiveHubObject>

      <InteractiveHubObject
        accentColor="#ff8db3"
        hoveredSection={hoveredSection}
        hitAreaScale={
          isTouchDevice
            ? [
                2.15 * mobileHitScale,
                1.9 * mobileHitScale,
                1.55 * mobileHitScale,
              ]
            : [2, 1.65, 1.35]
        }
        id="experience"
        isTouchDevice={isTouchDevice}
        isSelected={activeSection === "experience"}
        label="Archive / Experience"
        onHover={onHoverSection}
        onSelect={onSelectSection}
        position={[1.78, 0.24, -0.44]}
      >
        <ArchiveExperienceSystem
          isActive={isArchiveAwake}
          isLiteMode={isLiteMode}
        />
      </InteractiveHubObject>
    </group>
  );
};

const HubScene = ({
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
}: HubSceneProps): React.JSX.Element => {
  const activeVisualSection = hoveredSection ?? activeSection;
  const chamberAccent = activeVisualSection
    ? sectionAccentMap[activeVisualSection]
    : "#8f65ff";
  const isLiteMode = sceneMode === "lite";
  const isMobileViewport = viewportKind === "mobile";
  const mobileHitScale = isMobileViewport
    ? 1.08
    : viewportKind === "tablet"
      ? 1.02
      : 1;
  const isPortalActive = activeVisualSection === "contact";

  return (
    <>
      <color args={["#05030c"]} attach="background" />
      <fog attach="fog" args={["#05030c", 8, 27]} />

      <mesh position={[0, 4.6, -1.8]}>
        <sphereGeometry args={[28, 44, 44]} />
        <meshBasicMaterial color="#08040f" side={BackSide} />
      </mesh>

      <WorkspaceLighting
        activeVisualSection={activeVisualSection}
        chamberAccent={chamberAccent}
        isLiteMode={isLiteMode}
      />

      <HubCameraRig
        activeSection={activeSection}
        hoveredSection={hoveredSection}
        isTouchDevice={isTouchDevice}
        onTransitionChange={onTransitionChange}
        touchOrbitOffsetRef={touchOrbitOffsetRef}
        touchLookOffsetRef={touchLookOffsetRef}
        touchZoomOffsetRef={touchZoomOffsetRef}
        cameraMode={cameraMode}
        viewState={viewState}
      />

      <group position={[0, -1.1, -1.8]}>
        <mesh receiveShadow={!isLiteMode} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[18, 18]} />
          <meshStandardMaterial
            color="#08050f"
            metalness={isLiteMode ? 0.12 : 0.24}
            roughness={isLiteMode ? 0.9 : 0.7}
          />
        </mesh>

        <mesh position={[0, 4.6, -6.2]}>
          <boxGeometry args={[16, 10, 0.6]} />
          <meshStandardMaterial color={wallColor} roughness={0.96} />
        </mesh>
        <mesh position={[-9.2, 4.6, -0.2]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[15.4, 10, 0.6]} />
          <meshStandardMaterial color={wallColor} roughness={0.96} />
        </mesh>
        <mesh position={[9.2, 4.6, -0.2]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[15.4, 10, 0.6]} />
          <meshStandardMaterial color={wallColor} roughness={0.96} />
        </mesh>
        <mesh position={[0, 9.5, -0.5]}>
          <boxGeometry args={[18, 0.8, 13]} />
          <meshStandardMaterial color="#090510" roughness={1} />
        </mesh>

        <mesh position={[0, 0.52, -6.08]}>
          <torusGeometry args={[2.38, 0.06, 24, 120]} />
          <meshBasicMaterial
            color="#ff4a8a"
            transparent
            opacity={isPortalActive ? 0.28 : 0.16}
          />
        </mesh>
        <mesh position={[0, 0.72, -6.15]}>
          <torusGeometry args={[3.08, 0.018, 12, 120]} />
          <meshBasicMaterial
            color="#6dcbff"
            transparent
            opacity={isPortalActive ? 0.34 : 0.2}
          />
        </mesh>
        <mesh position={[0, 2.5, -2.9]}>
          <sphereGeometry args={[3.75, 30, 30]} />
          <meshBasicMaterial
            color={chamberAccent}
            opacity={activeVisualSection ? 0.085 : 0.035}
            transparent
          />
        </mesh>
        <mesh position={[0, 5.36, -2.3]} rotation={[Math.PI / 2, 0.2, 0.4]}>
          <torusGeometry args={[1.9, 0.025, 10, 120]} />
          <meshBasicMaterial color="#b892ff" transparent opacity={0.14} />
        </mesh>
        <mesh position={[0, 5.42, -2.28]} rotation={[Math.PI / 2, -0.4, -0.1]}>
          <torusGeometry args={[2.55, 0.014, 10, 120]} />
          <meshBasicMaterial color="#ff7db6" transparent opacity={0.11} />
        </mesh>
        <mesh position={[0, 4.15, -5.9]}>
          <planeGeometry args={[7.8, 3.6]} />
          <meshBasicMaterial color="#08040f" transparent opacity={0.24} />
        </mesh>

        <mesh position={[0, -0.58, -5.5]}>
          <cylinderGeometry args={[1.35, 1.95, 0.85, 8]} />
          <meshStandardMaterial color="#120b19" roughness={0.88} />
        </mesh>
        <mesh position={[-5.9, 0.6, -4.4]}>
          <boxGeometry args={[0.6, 3.4, 0.7]} />
          <meshStandardMaterial color="#110b17" roughness={0.9} />
        </mesh>
        <mesh position={[5.9, 0.6, -4.4]}>
          <boxGeometry args={[0.6, 3.4, 0.7]} />
          <meshStandardMaterial color="#110b17" roughness={0.9} />
        </mesh>
        <mesh position={[-5.9, 2.3, -4.1]} rotation={[0, 0, 0.42]}>
          <torusGeometry args={[0.56, 0.02, 12, 80]} />
          <meshBasicMaterial color="#ff4a8a" transparent opacity={0.24} />
        </mesh>
        <mesh position={[5.9, 2.1, -4.1]} rotation={[0.2, 0.1, -0.38]}>
          <torusGeometry args={[0.56, 0.02, 12, 80]} />
          <meshBasicMaterial color="#6dcbff" transparent opacity={0.24} />
        </mesh>

        {(isLiteMode || isMobileViewport
          ? shardPositions.slice(0, isMobileViewport ? 2 : 3)
          : shardPositions
        ).map((position, index) => (
          <mesh
            castShadow={!isLiteMode}
            key={`${position.join("-")}`}
            position={position}
            rotation={[0.3 + index * 0.14, 0.2, 0.4 + index * 0.08]}
          >
            <octahedronGeometry args={[0.22 + (index % 3) * 0.04, 0]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#ffd2f0" : "#a8c9ff"}
              emissive={index % 2 === 0 ? "#ff4a8a" : "#6dcbff"}
              emissiveIntensity={0.22}
              metalness={0.3}
              roughness={0.22}
            />
          </mesh>
        ))}

        <AmbientField
          isLiteMode={isLiteMode}
          isMobileViewport={isMobileViewport}
        />
      </group>

      <DeskWorkspace
        activeSection={activeSection}
        hoveredSection={hoveredSection}
        isLiteMode={isLiteMode}
        isTouchDevice={isTouchDevice}
        mobileHitScale={mobileHitScale}
        onHoverSection={onHoverSection}
        onSelectSection={onSelectSection}
      />

      <InteractiveHubObject
        accentColor="#7e4cff"
        hoveredSection={hoveredSection}
        hitAreaOffset={
          isTouchDevice ? [0, 0.1, isMobileViewport ? 1.05 : 1.28] : [0, 0, 0]
        }
        hitAreaScale={
          isTouchDevice
            ? [4 * mobileHitScale, 4.2 * mobileHitScale, 1.35 * mobileHitScale]
            : [3.4, 3.9, 2.2]
        }
        id="contact"
        isTouchDevice={isTouchDevice}
        isSelected={activeSection === "contact"}
        label="Portal / Contact"
        onHover={onHoverSection}
        onSelect={onSelectSection}
        position={[2.35, 1.7, -4.65]}
      >
        <PortalRift
          accentColor="#7e4cff"
          isActive={isPortalActive}
          isLiteMode={isLiteMode}
        />
      </InteractiveHubObject>

      <mesh
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation();
          onHoverSection(null);
        }}
        position={[0, -1.08, 0]}
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
};

export default HubScene;
