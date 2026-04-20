import type { SceneSectionId } from "../../../data/sceneContent";

type CameraPreset = {
  lookAt: [number, number, number];
  position: [number, number, number];
};

export const cameraPresets: Record<SceneSectionId | "hub", CameraPreset> = {
  about: {
    lookAt: [0, 1.25, 0.45],
    position: [0.75, 2.2, 4.6],
  },
  contact: {
    lookAt: [0, 1.72, -4.92],
    position: [0, 2.45, -1.2],
  },
  experience: {
    lookAt: [-3.15, 1.78, -2.35],
    position: [-0.9, 2.5, 0.55],
  },
  hub: {
    lookAt: [0, 1.5, -1.55],
    position: [0, 2.95, 9.1],
  },
  projects: {
    lookAt: [-2.35, 1.84, -0.18],
    position: [-0.42, 2.5, 4.05],
  },
  skills: {
    lookAt: [2.86, 1.55, -0.16],
    position: [1.02, 2.32, 4.32],
  },
};
