import { useMemo } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { BackSide, Color } from "three";

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

const wallColor = new Color("#0f0718");
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
  const mobileHitScale = isMobileViewport ? 1.04 : 1;
  const ambientParticlePositions = useMemo(() => {
    const count = isMobileViewport ? 28 : isLiteMode ? 40 : 72;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 12;
      positions[index * 3 + 1] = Math.random() * 5 + 0.2;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 10 - 1.5;
    }

    return positions;
  }, [isLiteMode, isMobileViewport]);

  return (
    <>
      <color args={["#05030c"]} attach="background" />
      <fog attach="fog" args={["#05030c", 10, 28]} />

      <mesh position={[0, 4.6, -1.8]}>
        <sphereGeometry args={[28, 44, 44]} />
        <meshBasicMaterial color="#08040f" side={BackSide} />
      </mesh>

      <ambientLight intensity={isLiteMode ? 0.92 : 0.85} />
      <hemisphereLight
        color="#7d5bff"
        groundColor="#05030c"
        intensity={isLiteMode ? 0.22 : 0.34}
      />
      <directionalLight
        castShadow={!isLiteMode}
        color="#ffd7f2"
        intensity={isLiteMode ? 1.45 : 1.85}
        position={isLiteMode ? [4.8, 8.2, 6.8] : [5.6, 8.8, 6.2]}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <pointLight color="#7e4cff" intensity={28} position={[-4, 3, 2]} />
      <pointLight color="#ff4a8a" intensity={22} position={[4, 3, -1]} />
      <pointLight color="#6dcbff" intensity={9} position={[0, 2, -5]} />
      <pointLight
        color={chamberAccent}
        intensity={activeVisualSection ? 18 : 8}
        position={[0, 3.4, -2.8]}
      />
      <spotLight
        angle={0.42}
        color="#ffb6d8"
        intensity={20}
        penumbra={0.9}
        position={[0, 7.5, 4.8]}
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
        <mesh
          position={[0, 0, 0]}
          receiveShadow={!isLiteMode}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[18, 18]} />
          <meshStandardMaterial
            color="#090611"
            metalness={isLiteMode ? 0.16 : 0.32}
            roughness={isLiteMode ? 0.84 : 0.66}
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
          <meshStandardMaterial color="#0a0610" roughness={1} />
        </mesh>

        <mesh position={[0, 0.35, -6.1]}>
          <torusGeometry args={[2.3, 0.08, 24, 120]} />
          <meshBasicMaterial color="#ff4a8a" transparent opacity={0.18} />
        </mesh>

        <mesh position={[0, 0.65, -6.15]}>
          <torusGeometry args={[2.9, 0.02, 12, 120]} />
          <meshBasicMaterial color="#6dcbff" transparent opacity={0.22} />
        </mesh>

        <mesh position={[0, 2.5, -2.9]}>
          <sphereGeometry args={[3.6, 30, 30]} />
          <meshBasicMaterial
            color={chamberAccent}
            opacity={activeVisualSection ? 0.08 : 0.035}
            transparent
          />
        </mesh>

        <mesh position={[0, 5.4, -2.3]} rotation={[Math.PI / 2, 0.2, 0.4]}>
          <torusGeometry args={[1.9, 0.025, 10, 120]} />
          <meshBasicMaterial color="#b892ff" transparent opacity={0.14} />
        </mesh>

        <mesh position={[0, 5.42, -2.28]} rotation={[Math.PI / 2, -0.4, -0.1]}>
          <torusGeometry args={[2.55, 0.014, 10, 120]} />
          <meshBasicMaterial color="#ff7db6" transparent opacity={0.11} />
        </mesh>

        <mesh position={[0, 4.15, -5.9]}>
          <planeGeometry args={[7.8, 3.6]} />
          <meshBasicMaterial color="#08040f" transparent opacity={0.22} />
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

        <points position={[0, 0.8, -1.9]}>
          <bufferGeometry>
            <bufferAttribute
              args={[ambientParticlePositions, 3]}
              attach="attributes-position"
            />
          </bufferGeometry>
          <pointsMaterial
            color="#b892ff"
            opacity={isMobileViewport ? 0.42 : 0.5}
            size={isMobileViewport ? 0.028 : 0.04}
            sizeAttenuation
            transparent
          />
        </points>
      </group>

      <group>
        <InteractiveHubObject
          accentColor="#ff4a8a"
          hoveredSection={hoveredSection}
          hitAreaScale={
            isTouchDevice
              ? [
                  5.3 * mobileHitScale,
                  3.1 * mobileHitScale,
                  3.7 * mobileHitScale,
                ]
              : [4.4, 2.2, 2.6]
          }
          id="about"
          isTouchDevice={isTouchDevice}
          isSelected={activeSection === "about"}
          label="Desk / About"
          onHover={onHoverSection}
          onSelect={onSelectSection}
          position={[0, 0.2, 1]}
        >
          <group>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[3.1, 0.18, 1.45]} />
              <meshStandardMaterial
                color="#24152f"
                emissive="#130b18"
                emissiveIntensity={0.1}
                metalness={0.24}
                roughness={0.34}
              />
            </mesh>
            <mesh position={[0, 0.095, 0]} receiveShadow>
              <boxGeometry args={[2.92, 0.03, 1.27]} />
              <meshStandardMaterial
                color="#3b223d"
                emissive="#1f111f"
                emissiveIntensity={0.08}
                metalness={0.08}
                roughness={0.18}
              />
            </mesh>
            {(
              [
                [-1.25, -0.65, -0.52],
                [1.25, -0.65, -0.52],
                [-1.25, -0.65, 0.52],
                [1.25, -0.65, 0.52],
              ] as const
            ).map((legPosition) => (
              <mesh
                castShadow
                key={legPosition.join("-")}
                position={legPosition}
              >
                <boxGeometry args={[0.22, 1.2, 0.22]} />
                <meshStandardMaterial
                  color="#17101f"
                  metalness={0.18}
                  roughness={0.62}
                />
              </mesh>
            ))}
            <mesh position={[0, 0.32, -0.1]} rotation={[-0.2, 0.1, 0]}>
              <boxGeometry args={[1.05, 0.08, 0.72]} />
              <meshStandardMaterial
                color="#341b35"
                emissive="#ff4a8a"
                emissiveIntensity={0.28}
                metalness={0.22}
                roughness={0.28}
              />
            </mesh>
          </group>
        </InteractiveHubObject>
      </group>

      <group>
        <InteractiveHubObject
          accentColor="#6dcbff"
          hoveredSection={hoveredSection}
          hitAreaScale={
            isTouchDevice
              ? [
                  2.55 * mobileHitScale,
                  2.7 * mobileHitScale,
                  1.55 * mobileHitScale,
                ]
              : [2.8, 2.9, 1.8]
          }
          id="projects"
          isTouchDevice={isTouchDevice}
          isSelected={activeSection === "projects"}
          label="Monitor / Projects"
          onHover={onHoverSection}
          onSelect={onSelectSection}
          position={[-2.4, 1.25, -0.2]}
        >
          <group>
            <mesh position={[0, 0, -0.12]}>
              <circleGeometry args={[1.15, 48]} />
              <meshBasicMaterial color="#6dcbff" transparent opacity={0.12} />
            </mesh>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.8, 1.05, 0.08]} />
              <meshStandardMaterial
                color="#131621"
                emissive="#080b10"
                emissiveIntensity={0.08}
                metalness={0.42}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 0, 0.045]}>
              <planeGeometry args={[1.58, 0.82]} />
              <meshBasicMaterial color="#6dcbff" transparent opacity={0.46} />
            </mesh>
            <mesh position={[0, 0, 0.05]}>
              <planeGeometry args={[1.44, 0.69]} />
              <meshBasicMaterial color="#d8f4ff" transparent opacity={0.08} />
            </mesh>
            <mesh position={[0, -0.75, 0]}>
              <cylinderGeometry args={[0.05, 0.09, 0.7, 10]} />
              <meshStandardMaterial
                color="#1f1a28"
                metalness={0.32}
                roughness={0.3}
              />
            </mesh>
            <mesh position={[0, -1.12, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 0.08, 18]} />
              <meshStandardMaterial
                color="#221a28"
                metalness={0.24}
                roughness={0.34}
              />
            </mesh>
          </group>
        </InteractiveHubObject>
      </group>

      <group>
        <InteractiveHubObject
          accentColor="#d2b1ff"
          hoveredSection={hoveredSection}
          hitAreaScale={
            isTouchDevice
              ? [
                  2.95 * mobileHitScale,
                  3.15 * mobileHitScale,
                  2 * mobileHitScale,
                ]
              : [2.9, 3.1, 2]
          }
          id="skills"
          isTouchDevice={isTouchDevice}
          isSelected={activeSection === "skills"}
          label="Archive / Skills"
          onHover={onHoverSection}
          onSelect={onSelectSection}
          position={[2.9, 0.35, -0.1]}
        >
          <group>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.65, 2.2, 0.9]} />
              <meshStandardMaterial
                color="#1b1323"
                emissive="#0f0a14"
                emissiveIntensity={0.08}
                metalness={0.14}
                roughness={0.56}
              />
            </mesh>
            <mesh position={[-0.24, 0.55, 0.48]} rotation={[0, 0.12, 0]}>
              <boxGeometry args={[0.34, 1.1, 0.2]} />
              <meshStandardMaterial
                color="#6a2b6f"
                emissive="#281026"
                emissiveIntensity={0.08}
                metalness={0.12}
                roughness={0.42}
              />
            </mesh>
            <mesh position={[0.18, 0.42, 0.46]} rotation={[0, -0.08, 0]}>
              <boxGeometry args={[0.4, 1.32, 0.22]} />
              <meshStandardMaterial
                color="#335799"
                emissive="#111c34"
                emissiveIntensity={0.08}
                metalness={0.14}
                roughness={0.4}
              />
            </mesh>
            <mesh position={[-0.05, -0.4, 0.44]} rotation={[0, 0.18, 0]}>
              <cylinderGeometry args={[0.14, 0.14, 1, 18]} />
              <meshStandardMaterial
                color="#c27a8d"
                metalness={0.08}
                roughness={0.32}
              />
            </mesh>
          </group>
        </InteractiveHubObject>
      </group>

      <group>
        <InteractiveHubObject
          accentColor="#ff8db3"
          hoveredSection={hoveredSection}
          hitAreaScale={
            isTouchDevice
              ? [
                  3.1 * mobileHitScale,
                  3.25 * mobileHitScale,
                  1.75 * mobileHitScale,
                ]
              : [2.9, 3.3, 1.6]
          }
          id="experience"
          isTouchDevice={isTouchDevice}
          isSelected={activeSection === "experience"}
          label="Wall Panel / Experience"
          onHover={onHoverSection}
          onSelect={onSelectSection}
          position={[-3.2, 1.7, -2.4]}
        >
          <group>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.9, 2.35, 0.12]} />
              <meshStandardMaterial
                color="#201727"
                emissive="#0e0912"
                emissiveIntensity={0.08}
                metalness={0.18}
                roughness={0.26}
              />
            </mesh>
            <mesh position={[0, 0, 0.1]}>
              <planeGeometry args={[1.5, 1.9]} />
              <meshBasicMaterial color="#ff4a8a" transparent opacity={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.105]}>
              <planeGeometry args={[1.18, 1.56]} />
              <meshBasicMaterial color="#ffd6e6" transparent opacity={0.05} />
            </mesh>
            <mesh position={[0.42, 0.66, 0.22]} rotation={[0.3, 0.6, 0]}>
              <octahedronGeometry args={[0.16, 0]} />
              <meshStandardMaterial
                color="#ffd4f0"
                emissive="#ff4a8a"
                emissiveIntensity={0.3}
                metalness={0.38}
                roughness={0.16}
              />
            </mesh>
            <mesh position={[-0.36, -0.2, 0.18]} rotation={[0.6, 0.2, 0.5]}>
              <octahedronGeometry args={[0.12, 0]} />
              <meshStandardMaterial
                color="#b2cfff"
                emissive="#6dcbff"
                emissiveIntensity={0.24}
                metalness={0.34}
                roughness={0.18}
              />
            </mesh>
          </group>
        </InteractiveHubObject>
      </group>

      <group>
        <InteractiveHubObject
          accentColor="#7e4cff"
          hoveredSection={hoveredSection}
          hitAreaOffset={
            isTouchDevice
              ? [
                  0,
                  isMobileViewport ? 0.08 : 0.15,
                  isMobileViewport ? 1.05 : 1.28,
                ]
              : [0, 0, 0]
          }
          hitAreaScale={
            isTouchDevice
              ? [
                  4 * mobileHitScale,
                  4.2 * mobileHitScale,
                  1.35 * mobileHitScale,
                ]
              : [3.3, 3.8, 2.2]
          }
          id="contact"
          isTouchDevice={isTouchDevice}
          isSelected={activeSection === "contact"}
          label="Portal / Contact"
          onHover={onHoverSection}
          onSelect={onSelectSection}
          position={[0, 1.7, -4.9]}
        >
          <group>
            <mesh position={[0, -0.78, -0.08]}>
              <cylinderGeometry args={[0.8, 1, 0.22, 8]} />
              <meshStandardMaterial
                color="#1b1124"
                metalness={0.16}
                roughness={0.62}
              />
            </mesh>
            <mesh castShadow>
              <torusGeometry args={[1.2, 0.12, 22, 120]} />
              <meshStandardMaterial
                color="#29153a"
                emissive="#7e4cff"
                emissiveIntensity={0.42}
                metalness={0.24}
                roughness={0.14}
              />
            </mesh>
            <mesh position={[0, 0, -0.05]}>
              <circleGeometry args={[0.95, 64]} />
              <meshBasicMaterial color="#7e4cff" transparent opacity={0.38} />
            </mesh>
            <mesh position={[0, 0, -0.01]}>
              <circleGeometry args={[0.72, 64]} />
              <meshBasicMaterial color="#cbb6ff" transparent opacity={0.12} />
            </mesh>
            <mesh position={[0, 0, 0.22]} rotation={[0.4, 0.3, 0.2]}>
              <torusGeometry args={[1.55, 0.02, 10, 90]} />
              <meshBasicMaterial color="#6dcbff" transparent opacity={0.48} />
            </mesh>
            <mesh position={[0, 0.05, -0.1]} rotation={[0.2, -0.3, 0.16]}>
              <torusGeometry args={[1.85, 0.015, 10, 90]} />
              <meshBasicMaterial color="#ff7db6" transparent opacity={0.3} />
            </mesh>
          </group>
        </InteractiveHubObject>
      </group>

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
