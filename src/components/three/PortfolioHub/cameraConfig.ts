import type { SceneSectionId } from "../../../data/sceneContent";

type CameraPreset = {
  lookAt: [number, number, number];
  position: [number, number, number];
};

export const cameraPresets: Record<SceneSectionId | "hub", CameraPreset> = {
  about: {
    lookAt: [0, 0.86, 1.35],
    position: [0.42, 1.82, 3.55],
  },
  contact: {
    lookAt: [2.35, 1.72, -4.65],
    position: [0.62, 2.56, -1.08],
  },
  experience: {
    lookAt: [1.78, 0.72, 0.42],
    position: [2.58, 1.66, 3.06],
  },
  hub: {
    lookAt: [0, 1.28, -1.08],
    position: [0, 3.04, 8.55],
  },
  projects: {
    lookAt: [-0.5, 1.48, 0.38],
    position: [-1.05, 2.16, 3.45],
  },
  skills: {
    lookAt: [-1.58, 0.82, 0.86],
    position: [-2.08, 1.68, 3.2],
  },
};
