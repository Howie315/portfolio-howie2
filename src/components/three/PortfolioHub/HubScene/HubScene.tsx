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
const experienceBookStack = [
  { color: "#79345f", height: 0.38, z: -0.26 },
  { color: "#28478f", height: 0.48, z: 0 },
  { color: "#5b377f", height: 0.42, z: 0.25 },
] as const;
const portalEnergyNodes = [
  { angle: 0.15, radius: 1.52, speed: 0.38, y: 0.12 },
  { angle: 1.4, radius: 1.86, speed: -0.24, y: -0.22 },
  { angle: 2.55, radius: 1.46, speed: 0.31, y: 0.34 },
  { angle: 3.7, radius: 1.74, speed: -0.34, y: -0.08 },
  { angle: 4.8, radius: 1.58, speed: 0.28, y: 0.24 },
] as const;

const MonitorInterface = ({
  isActive,
  isLiteMode,
}: MonitorInterfaceProps): React.JSX.Element => {
  const screenRef = useRef<Mesh | null>(null);
  const scanGroupRef = useRef<Group | null>(null);
  const cursorRef = useRef<Mesh | null>(null);
  const wakeRingRef = useRef<Mesh | null>(null);

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
      <mesh position={[0, -0.76, 0]}>
        <cylinderGeometry args={[0.05, 0.09, 0.66, 10]} />
        <meshStandardMaterial color="#1f1a28" metalness={0.32} roughness={0.3} />
      </mesh>
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.07, 18]} />
        <meshStandardMaterial color="#221a28" metalness={0.24} roughness={0.34} />
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
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.28) * 0.1;
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
        1 + Math.sin(time * (isActive ? 3.4 : 1.8)) * (isActive ? 0.055 : 0.025),
      );
    }

    if (haloRef.current) {
      haloRef.current.rotation.z += delta * (isActive ? 0.44 : 0.18);
    }

    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.z -= delta * (isActive ? 0.58 : 0.18);
      particleGroupRef.current.rotation.y = Math.sin(time * 0.5) * 0.12;
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
        <mesh position={[0, 0, 0.02]}>
          <ringGeometry args={[1.5, 1.72, 80]} />
          <meshBasicMaterial
            blending={AdditiveBlending}
            color="#ffffff"
            opacity={0.16}
            transparent
          />
        </mesh>
      ) : null}
    </group>
  );
};

const DeskLamp = ({ isLiteMode }: { isLiteMode: boolean }): React.JSX.Element => {
  const lampHeadRef = useRef<Group | null>(null);

  useFrame((state) => {
    if (!lampHeadRef.current) {
      return;
    }

    lampHeadRef.current.rotation.z = -0.32 + Math.sin(state.clock.elapsedTime * 0.8) * 0.035;
  });

  return (
    <group position={[-2.05, 0.78, -0.2]} rotation={[0, 0.2, 0]}>
      <mesh castShadow position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.18, 0.26, 0.08, 22]} />
        <meshStandardMaterial color="#221929" metalness={0.35} roughness={0.3} />
      </mesh>
      <mesh castShadow position={[0.05, 0.42, 0]} rotation={[0, 0, -0.28]}>
        <cylinderGeometry args={[0.035, 0.045, 0.94, 12]} />
        <meshStandardMaterial color="#282032" metalness={0.42} roughness={0.24} />
      </mesh>
      <group position={[0.24, 0.88, 0.02]} ref={lampHeadRef}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.24, 0.44, 24, 1, true]} />
          <meshStandardMaterial
            color="#35223b"
            emissive="#ff8db3"
            emissiveIntensity={0.18}
            metalness={0.25}
            roughness={0.28}
          />
        </mesh>
        <pointLight
          color="#ffbfd8"
          distance={3.4}
          intensity={isLiteMode ? 4.5 : 7.5}
          position={[0.16, -0.06, 0.02]}
        />
      </group>
    </group>
  );
};

const DeskBase = ({ isLiteMode }: { isLiteMode: boolean }): React.JSX.Element => (
  <group>
    <mesh castShadow receiveShadow>
      <boxGeometry args={[4.35, 0.2, 2]} />
      <meshStandardMaterial
        color="#22142c"
        emissive="#110815"
        emissiveIntensity={0.14}
        metalness={0.24}
        roughness={0.34}
      />
    </mesh>
    <mesh position={[0, 0.115, 0]} receiveShadow>
      <boxGeometry args={[4.12, 0.035, 1.74]} />
      <meshStandardMaterial
        color="#3a233c"
        emissive="#1d101f"
        emissiveIntensity={0.12}
        metalness={0.1}
        roughness={0.18}
      />
    </mesh>
    <mesh position={[0, 0.145, 0.62]}>
      <boxGeometry args={[3.4, 0.018, 0.18]} />
      <meshBasicMaterial color="#ff4a8a" transparent opacity={0.18} />
    </mesh>
    {(
      [
        [-1.78, -0.67, -0.72],
        [1.78, -0.67, -0.72],
        [-1.78, -0.67, 0.72],
        [1.78, -0.67, 0.72],
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
    <DeskLamp isLiteMode={isLiteMode} />
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
  const isMonitorAwake =
    hoveredSection === "projects" || activeSection === "projects";

  return (
  <group position={[0, 0.1, 0.85]}>
    <DeskBase isLiteMode={isLiteMode} />
    <InteractiveHubObject
      accentColor="#ff4a8a"
      hoveredSection={hoveredSection}
      hitAreaScale={
        isTouchDevice
          ? [2.35 * mobileHitScale, 1.4 * mobileHitScale, 1.35 * mobileHitScale]
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
      <group rotation={[-0.18, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.58, 0.08, 0.48]} />
          <meshStandardMaterial
            color="#1b1624"
            emissive="#ff4a8a"
            emissiveIntensity={0.18}
            metalness={0.25}
            roughness={0.32}
          />
        </mesh>
        <mesh position={[0, 0.055, -0.01]}>
          <boxGeometry args={[1.32, 0.018, 0.28]} />
          <meshBasicMaterial color="#ffd9ea" transparent opacity={0.08} />
        </mesh>
        {[-0.48, -0.24, 0, 0.24, 0.48].map((x) => (
          <mesh key={`key-${x}`} position={[x, 0.075, 0.05]}>
            <boxGeometry args={[0.12, 0.018, 0.09]} />
            <meshBasicMaterial color="#ff8db3" transparent opacity={0.36} />
          </mesh>
        ))}
      </group>
    </InteractiveHubObject>

    <InteractiveHubObject
      accentColor="#6dcbff"
      hoveredSection={hoveredSection}
      hitAreaScale={
        isTouchDevice
          ? [2.45 * mobileHitScale, 2.7 * mobileHitScale, 1.5 * mobileHitScale]
          : [2.35, 2.45, 1.35]
      }
      id="projects"
      isTouchDevice={isTouchDevice}
      isSelected={activeSection === "projects"}
      label="Monitor / Projects"
      onHover={onHoverSection}
      onSelect={onSelectSection}
      position={[-0.7, 1.15, -0.46]}
    >
      <MonitorInterface isActive={isMonitorAwake} isLiteMode={isLiteMode} />
    </InteractiveHubObject>

    <InteractiveHubObject
      accentColor="#d2b1ff"
      hoveredSection={hoveredSection}
      hitAreaScale={
        isTouchDevice
          ? [1.7 * mobileHitScale, 1.1 * mobileHitScale, 1.35 * mobileHitScale]
          : [1.55, 0.95, 1.2]
      }
      id="skills"
      isTouchDevice={isTouchDevice}
      isSelected={activeSection === "skills"}
      label="Notebook / Skills"
      onHover={onHoverSection}
      onSelect={onSelectSection}
      position={[1.08, 0.39, 0.02]}
    >
      <group rotation={[-0.08, -0.28, 0.05]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.02, 0.08, 0.74]} />
          <meshStandardMaterial
            color="#2a1c34"
            emissive="#d2b1ff"
            emissiveIntensity={0.18}
            metalness={0.12}
            roughness={0.42}
          />
        </mesh>
        <mesh position={[0, 0.052, 0]}>
          <boxGeometry args={[0.92, 0.012, 0.62]} />
          <meshBasicMaterial color="#f1e6ff" transparent opacity={0.12} />
        </mesh>
        <mesh position={[-0.28, 0.07, 0]}>
          <boxGeometry args={[0.035, 0.018, 0.66]} />
          <meshBasicMaterial color="#d2b1ff" transparent opacity={0.5} />
        </mesh>
      </group>
    </InteractiveHubObject>

    <InteractiveHubObject
      accentColor="#ff8db3"
      hoveredSection={hoveredSection}
      hitAreaScale={
        isTouchDevice
          ? [1.8 * mobileHitScale, 1.45 * mobileHitScale, 1.3 * mobileHitScale]
          : [1.65, 1.2, 1.15]
      }
      id="experience"
      isTouchDevice={isTouchDevice}
      isSelected={activeSection === "experience"}
      label="Archive Books / Experience"
      onHover={onHoverSection}
      onSelect={onSelectSection}
      position={[1.9, 0.62, -0.42]}
    >
      <group rotation={[0, -0.18, 0]}>
        {experienceBookStack.map(({ color, height, z }, index) => (
          <mesh
            castShadow
            key={`${color}-${z}`}
            position={[index * 0.18, height / 2, z]}
          >
            <boxGeometry args={[0.16, height, 0.48]} />
            <meshStandardMaterial
              color={color}
              emissive={index === 0 ? "#ff8db3" : "#1b1230"}
              emissiveIntensity={index === 0 ? 0.16 : 0.06}
              metalness={0.12}
              roughness={0.42}
            />
          </mesh>
        ))}
        <mesh position={[0.58, 0.18, 0.08]} rotation={[0, 0.18, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.84, 18]} />
          <meshStandardMaterial color="#c27a8d" metalness={0.08} roughness={0.32} />
        </mesh>
      </group>
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
  const mobileHitScale = isMobileViewport ? 1.08 : viewportKind === "tablet" ? 1.02 : 1;
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
          <meshBasicMaterial color="#ff4a8a" transparent opacity={isPortalActive ? 0.28 : 0.16} />
        </mesh>
        <mesh position={[0, 0.72, -6.15]}>
          <torusGeometry args={[3.08, 0.018, 12, 120]} />
          <meshBasicMaterial color="#6dcbff" transparent opacity={isPortalActive ? 0.34 : 0.2} />
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

        <AmbientField isLiteMode={isLiteMode} isMobileViewport={isMobileViewport} />
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
        hitAreaOffset={isTouchDevice ? [0, 0.1, isMobileViewport ? 1.05 : 1.28] : [0, 0, 0]}
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
