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
    lookAt: [1.9, 0.95, 0.43],
    position: [2.68, 1.88, 3.05],
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
    lookAt: [1.08, 0.82, 0.86],
    position: [1.86, 1.72, 3.24],
  },
};
