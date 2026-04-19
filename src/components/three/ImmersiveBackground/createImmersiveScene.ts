import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Clock,
  Color,
  DynamicDrawUsage,
  Euler,
  FogExp2,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  Material,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  OctahedronGeometry,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  TorusGeometry,
  type Texture,
  WebGLRenderer,
} from "three";
import { sceneConfig, scenePalette, scenePhaseStops } from "./sceneConfig";

type ImmersiveSceneOptions = {
  canvas: HTMLCanvasElement;
  onReady?: () => void;
  prefersReducedMotion: boolean;
};

type SceneController = {
  destroy: () => void;
};

type FragmentConfig = {
  angle: number;
  height: number;
  radius: number;
  rotationOffset: number;
  scale: number;
  speed: number;
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const getInterpolatedPhaseColor = (progress: number): Color => {
  const clampedProgress = clamp(progress, 0, 1);
  const nextStop =
    scenePhaseStops.find((stop) => stop.progress >= clampedProgress) ??
    scenePhaseStops[scenePhaseStops.length - 1];
  const nextIndex = scenePhaseStops.indexOf(nextStop);
  const previousStop =
    scenePhaseStops[Math.max(nextIndex - 1, 0)] ?? scenePhaseStops[0];
  const range = Math.max(nextStop.progress - previousStop.progress, 0.0001);
  const localProgress = (clampedProgress - previousStop.progress) / range;

  return new Color(previousStop.color).lerp(
    new Color(nextStop.color),
    localProgress,
  );
};

const createParticleTexture = (): CanvasTexture => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 128;
  canvas.height = 128;

  if (!context) {
    return new CanvasTexture(canvas);
  }

  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.28, "rgba(255, 110, 180, 0.95)");
  gradient.addColorStop(0.62, "rgba(109, 80, 255, 0.36)");
  gradient.addColorStop(1, "rgba(109, 80, 255, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;

  return texture;
};

const createSigilTexture = (accentColor: string): CanvasTexture => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 512;
  canvas.height = 512;

  if (!context) {
    return new CanvasTexture(canvas);
  }

  const center = canvas.width / 2;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = accentColor;
  context.lineWidth = 6;
  context.shadowBlur = 28;
  context.shadowColor = accentColor;
  context.globalAlpha = 0.9;

  context.beginPath();
  context.arc(center, center, 190, 0, Math.PI * 2);
  context.stroke();

  context.lineWidth = 3;
  context.globalAlpha = 0.75;
  context.beginPath();
  context.arc(center, center, 150, 0, Math.PI * 2);
  context.stroke();

  context.beginPath();
  context.arc(center, center, 105, 0, Math.PI * 2);
  context.stroke();

  context.globalAlpha = 0.85;

  for (let index = 0; index < 8; index += 1) {
    const angle = (Math.PI * 2 * index) / 8;
    const x = center + Math.cos(angle) * 132;
    const y = center + Math.sin(angle) * 132;

    context.beginPath();
    context.moveTo(
      center + Math.cos(angle) * 76,
      center + Math.sin(angle) * 76,
    );
    context.lineTo(x, y);
    context.stroke();

    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.stroke();
  }

  context.save();
  context.translate(center, center);
  context.rotate(Math.PI / 4);
  context.strokeRect(-84, -84, 168, 168);
  context.restore();

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;

  return texture;
};

const createSmokeTexture = (): CanvasTexture => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 512;
  canvas.height = 512;

  if (!context) {
    return new CanvasTexture(canvas);
  }

  const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.16)");
  gradient.addColorStop(0.28, "rgba(126, 76, 255, 0.12)");
  gradient.addColorStop(0.62, "rgba(16, 8, 24, 0.1)");
  gradient.addColorStop(1, "rgba(8, 4, 12, 0)");

  context.fillStyle = gradient;
  context.beginPath();
  context.arc(256, 256, 220, 0, Math.PI * 2);
  context.fill();

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;

  return texture;
};

const createSprite = (
  texture: Texture,
  color: string,
  scale: number,
): Sprite => {
  const material = new SpriteMaterial({
    blending: AdditiveBlending,
    color,
    depthWrite: false,
    map: texture,
    opacity: 0.48,
    transparent: true,
  });

  const sprite = new Sprite(material);
  sprite.scale.setScalar(scale);

  return sprite;
};

export const createImmersiveScene = ({
  canvas,
  onReady,
  prefersReducedMotion,
}: ImmersiveSceneOptions): SceneController => {
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile
    ? sceneConfig.mobile.particleCount
    : sceneConfig.desktop.particleCount;
  const fragmentCount = isMobile
    ? sceneConfig.mobile.fragmentCount
    : sceneConfig.desktop.fragmentCount;
  const smokeCount = isMobile
    ? sceneConfig.mobile.smokeCount
    : sceneConfig.desktop.smokeCount;

  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: !isMobile,
    canvas,
    powerPreference: "high-performance",
  });

  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = isMobile ? 1 : 1.08;
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, isMobile ? 1.2 : 1.8),
  );

  const scene = new Scene();
  const fog = new FogExp2(scenePalette.backgroundFog, isMobile ? 0.09 : 0.068);
  scene.fog = fog;

  const camera = new PerspectiveCamera(
    42,
    window.innerWidth / window.innerHeight,
    0.1,
    80,
  );
  camera.position.set(0, 0.6, 8.2);

  const ambientLight = new AmbientLight(scenePalette.ambient, 1.8);
  const keyLight = new PointLight(scenePalette.key, 14, 22, 2);
  keyLight.position.set(2.8, 1.2, 4.6);

  const rimLight = new PointLight(scenePalette.rim, 10, 20, 2);
  rimLight.position.set(-4.2, -1.2, 2.8);

  scene.add(ambientLight, keyLight, rimLight);

  const sceneRoot = new Group();
  const sealGroup = new Group();
  const fragmentGroup = new Group();

  scene.add(sceneRoot);
  sceneRoot.add(sealGroup, fragmentGroup);

  const coreMaterial = new MeshPhysicalMaterial({
    clearcoat: 0.7,
    clearcoatRoughness: 0.24,
    color: "#13081f",
    emissive: scenePalette.indigo,
    emissiveIntensity: 1.25,
    metalness: 0.15,
    roughness: 0.28,
    sheen: 0.45,
    transparent: true,
    transmission: 0.08,
  });

  const coreMesh = new Mesh(
    new IcosahedronGeometry(isMobile ? 0.82 : 0.94, 1),
    coreMaterial,
  );

  const shellMaterial = new MeshBasicMaterial({
    blending: AdditiveBlending,
    color: scenePalette.ember,
    opacity: 0.13,
    transparent: true,
    wireframe: true,
  });

  const shellMesh = new Mesh(
    new IcosahedronGeometry(isMobile ? 1.18 : 1.28, 1),
    shellMaterial,
  );

  sceneRoot.add(coreMesh, shellMesh);

  const ringPalette = [
    scenePalette.indigo,
    scenePalette.ember,
    scenePalette.cyan,
  ] as const;
  const ringRotations = [
    new Euler(0.8, 0.2, 0),
    new Euler(1.3, 0.8, Math.PI / 3),
    new Euler(Math.PI / 2, 0.2, Math.PI / 2.2),
  ] as const;

  ringPalette.forEach((color, index) => {
    const ring = new Mesh(
      new TorusGeometry(2.1 + index * 0.52, 0.018, 18, 220),
      new MeshBasicMaterial({
        blending: AdditiveBlending,
        color,
        opacity: index === 1 ? 0.46 : 0.28,
        transparent: true,
      }),
    );

    ring.rotation.copy(ringRotations[index]);
    sealGroup.add(ring);
  });

  const sigilTextures = [
    createSigilTexture(scenePalette.indigo),
    createSigilTexture(scenePalette.ember),
  ];
  const particleTexture = createParticleTexture();
  const smokeTexture = createSmokeTexture();
  const phaseColor = new Color(scenePalette.indigo);
  const complementaryPhaseColor = new Color(scenePalette.cyan);

  const frontSigil = createSprite(
    sigilTextures[0],
    "#8f63ff",
    isMobile ? 7.8 : 8.9,
  );
  frontSigil.position.set(0, -0.4, -1.2);

  const backSigil = createSprite(
    sigilTextures[1],
    scenePalette.ember,
    isMobile ? 9.5 : 11.5,
  );
  backSigil.position.set(0.8, 0.6, -3.8);

  sceneRoot.add(frontSigil, backSigil);

  const smokeConfigs = Array.from({ length: smokeCount }, () => ({
    rotation: MathUtils.randFloat(0, Math.PI * 2),
    speed: MathUtils.randFloat(0.24, 0.52),
    x: MathUtils.randFloatSpread(6),
    y: MathUtils.randFloatSpread(3.2),
  }));

  const smokeSprites = smokeConfigs.map((config, index) => {
    const sprite = createSprite(
      smokeTexture,
      scenePalette.smoke,
      isMobile ? 8 + index * 1.6 : 10 + index * 2.1,
    );

    sprite.material.opacity = isMobile ? 0.08 : 0.11;
    sprite.position.set(config.x, config.y, -5.5 - index * 1.4);
    sprite.material.rotation = config.rotation;

    scene.add(sprite);

    return sprite;
  });

  const particleGeometry = new BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let index = 0; index < particleCount; index += 1) {
    const stride = index * 3;
    const radius = MathUtils.randFloat(4.5, isMobile ? 10 : 13);
    const angle = MathUtils.randFloat(0, Math.PI * 2);
    const verticalSpread = MathUtils.randFloatSpread(isMobile ? 6 : 8);

    particlePositions[stride] = Math.cos(angle) * radius;
    particlePositions[stride + 1] = verticalSpread;
    particlePositions[stride + 2] =
      Math.sin(angle) * radius - MathUtils.randFloat(1, 8);
  }

  particleGeometry.setAttribute(
    "position",
    new BufferAttribute(particlePositions, 3),
  );

  const particles = new Points(
    particleGeometry,
    new PointsMaterial({
      alphaMap: particleTexture,
      blending: AdditiveBlending,
      color: scenePalette.indigo,
      depthWrite: false,
      map: particleTexture,
      opacity: isMobile ? 0.55 : 0.7,
      size: isMobile ? 0.09 : 0.11,
      sizeAttenuation: true,
      transparent: true,
    }),
  );

  scene.add(particles);

  const fragmentGeometry = new OctahedronGeometry(0.18, 0);
  const fragmentMaterial = new MeshStandardMaterial({
    color: "#18091f",
    emissive: scenePalette.ember,
    emissiveIntensity: 1.15,
    metalness: 0.15,
    roughness: 0.18,
    transparent: true,
  });

  const fragments = new InstancedMesh(
    fragmentGeometry,
    fragmentMaterial,
    fragmentCount,
  );
  fragments.instanceMatrix.setUsage(DynamicDrawUsage);

  const fragmentConfigurations: FragmentConfig[] = Array.from(
    { length: fragmentCount },
    () => ({
      angle: MathUtils.randFloat(0, Math.PI * 2),
      height: MathUtils.randFloatSpread(3.8),
      radius: MathUtils.randFloat(1.9, 4.2),
      rotationOffset: MathUtils.randFloat(0, Math.PI * 2),
      scale: MathUtils.randFloat(0.42, 1.18),
      speed: MathUtils.randFloat(0.2, 0.72),
    }),
  );

  fragmentGroup.add(fragments);

  const dummy = new Object3D();
  const clock = new Clock();

  let animationFrameId = 0;
  let destroyed = false;
  let isVisible = !document.hidden;
  let scrollProgress = 0;
  let maxScroll = 1;
  let pointerTargetX = 0;
  let pointerTargetY = 0;
  let pointerX = 0;
  let pointerY = 0;

  const updateScrollProgress = (): void => {
    maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    );
    scrollProgress = clamp(window.scrollY / maxScroll, 0, 1);
  };

  const resize = (): void => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    updateScrollProgress();
  };

  const updateFragments = (elapsedTime: number): void => {
    fragmentConfigurations.forEach((config, index) => {
      const drift = elapsedTime * config.speed + scrollProgress * 3.5;
      const radius = config.radius + Math.sin(drift * 0.9) * 0.16;

      dummy.position.set(
        Math.cos(config.angle + drift * 0.38) * radius,
        config.height + Math.sin(drift * 1.2 + config.rotationOffset) * 0.48,
        Math.sin(config.angle + drift * 0.32) * radius - 1.8,
      );

      dummy.rotation.set(
        drift + config.rotationOffset,
        drift * 0.8,
        drift * 0.6,
      );

      dummy.scale.setScalar(config.scale * (1 + scrollProgress * 0.18));
      dummy.updateMatrix();
      fragments.setMatrixAt(index, dummy.matrix);
    });

    fragments.instanceMatrix.needsUpdate = true;
  };

  const updateScene = (elapsedTime: number): void => {
    pointerX = MathUtils.lerp(pointerX, pointerTargetX, 0.06);
    pointerY = MathUtils.lerp(pointerY, pointerTargetY, 0.06);

    // The whole scene responds to scroll and pointer data so the camera
    // progression feels cinematic without needing heavy section-by-section timelines.
    const motionTime = prefersReducedMotion
      ? scrollProgress * Math.PI
      : elapsedTime;
    phaseColor.copy(getInterpolatedPhaseColor(scrollProgress));
    complementaryPhaseColor.set(scenePalette.cyan).lerp(phaseColor, 0.22);

    coreMesh.rotation.x = motionTime * 0.28 + pointerY * 0.18;
    coreMesh.rotation.y = motionTime * 0.38 + pointerX * 0.24;
    coreMesh.rotation.z = motionTime * 0.12;

    shellMesh.rotation.x = -motionTime * 0.12;
    shellMesh.rotation.y = motionTime * 0.22;
    shellMesh.rotation.z = motionTime * 0.08;

    const coreScale =
      1 + Math.sin(motionTime * 1.4) * 0.045 + scrollProgress * 0.16;
    coreMesh.scale.setScalar(coreScale);
    shellMesh.scale.setScalar(1.02 + Math.sin(motionTime * 1.1) * 0.08);

    sealGroup.rotation.x = pointerY * 0.15 + scrollProgress * 0.5;
    sealGroup.rotation.y = motionTime * 0.11 + pointerX * 0.24;
    sealGroup.rotation.z = motionTime * 0.06;

    frontSigil.material.rotation = -motionTime * 0.14;
    backSigil.material.rotation = motionTime * 0.08;
    frontSigil.position.y = -0.35 + Math.sin(motionTime * 1.2) * 0.08;
    backSigil.position.y = 0.48 + Math.cos(motionTime * 0.6) * 0.12;
    frontSigil.material.color.copy(phaseColor);
    backSigil.material.color.copy(complementaryPhaseColor);

    particles.rotation.y = motionTime * 0.016;
    particles.rotation.x = motionTime * 0.008;
    if (particles.material instanceof PointsMaterial) {
      particles.material.color.copy(phaseColor);
    }

    sceneRoot.position.x = pointerX * 0.8;
    sceneRoot.position.y = 0.4 - scrollProgress * 2.4 + pointerY * 0.45;
    sceneRoot.position.z = -scrollProgress * 1.1;

    smokeSprites.forEach((sprite, index) => {
      const config = smokeConfigs[index];
      const drift = motionTime * config.speed;
      sprite.position.x = config.x + Math.sin(drift + index) * 0.35;
      sprite.position.y = config.y + Math.cos(drift * 1.4 + index) * 0.24;
      sprite.material.rotation = config.rotation + drift * 0.08;
      sprite.material.color.set(scenePalette.smoke).lerp(phaseColor, 0.18);
    });

    camera.position.x = pointerX * 0.6;
    camera.position.y = 0.55 - scrollProgress * 3.2 + pointerY * 0.4;
    camera.position.z = 8.2 - scrollProgress * 2.3;
    camera.lookAt(pointerX * 0.35, sceneRoot.position.y * 0.3, -1.8);

    keyLight.intensity = 12 + scrollProgress * 6;
    rimLight.intensity = 8 + Math.sin(motionTime * 0.6) * 1.8;
    keyLight.color.copy(phaseColor);
    rimLight.color.copy(complementaryPhaseColor);
    coreMaterial.emissiveIntensity = 1.2 + scrollProgress * 0.8;
    coreMaterial.emissive.copy(phaseColor);
    fragmentMaterial.emissive.copy(complementaryPhaseColor);
    shellMaterial.color.copy(complementaryPhaseColor);
    fog.color.copy(
      new Color(scenePalette.backgroundFog).lerp(phaseColor, 0.18),
    );
    fog.density = isMobile
      ? 0.09 - scrollProgress * 0.012
      : 0.068 - scrollProgress * 0.014;
    renderer.toneMappingExposure = isMobile
      ? 1 + scrollProgress * 0.08
      : 1.08 + scrollProgress * 0.1;

    updateFragments(motionTime);
  };

  const renderFrame = (): void => {
    if (destroyed || !isVisible) {
      return;
    }

    const elapsedTime = clock.getElapsedTime();
    updateScene(elapsedTime);
    renderer.render(scene, camera);
    animationFrameId = window.requestAnimationFrame(renderFrame);
  };

  const renderStatic = (): void => {
    updateScene(clock.getElapsedTime());
    renderer.render(scene, camera);
  };

  const handlePointerMove = (event: PointerEvent): void => {
    pointerTargetX = ((event.clientX / window.innerWidth) * 2 - 1) * 0.6;
    pointerTargetY = -((event.clientY / window.innerHeight) * 2 - 1) * 0.45;

    if (prefersReducedMotion) {
      renderStatic();
    }
  };

  const handlePointerLeave = (): void => {
    pointerTargetX = 0;
    pointerTargetY = 0;

    if (prefersReducedMotion) {
      renderStatic();
    }
  };

  const handleWindowBlur = (): void => {
    handlePointerLeave();
  };

  const handleScroll = (): void => {
    updateScrollProgress();

    if (prefersReducedMotion) {
      renderStatic();
    }
  };

  const handleVisibilityChange = (): void => {
    isVisible = !document.hidden;

    if (!isVisible && animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
      return;
    }

    if (!prefersReducedMotion && isVisible && !animationFrameId) {
      clock.getDelta();
      renderFrame();
    }
  };

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("blur", handleWindowBlur);
  window.addEventListener("resize", resize);
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("visibilitychange", handleVisibilityChange);

  updateScrollProgress();
  resize();
  renderStatic();

  onReady?.();

  if (!prefersReducedMotion) {
    renderFrame();
  }

  return {
    destroy: (): void => {
      destroyed = true;

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      scene.traverse((object: Object3D) => {
        if (object instanceof Mesh) {
          object.geometry.dispose();

          if (Array.isArray(object.material)) {
            object.material.forEach((material: Material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }

        if (object instanceof Sprite) {
          object.material.map?.dispose();
          object.material.dispose();
        }

        if (object instanceof Points) {
          object.geometry.dispose();

          if (Array.isArray(object.material)) {
            object.material.forEach((material: Material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      particleTexture.dispose();
      smokeTexture.dispose();
      sigilTextures.forEach((texture) => texture.dispose());
      renderer.dispose();
    },
  };
};
