export const scenePalette = {
  ambient: "#46307b",
  backgroundFog: "#07030d",
  cyan: "#6dcbff",
  ember: "#ff4a8a",
  indigo: "#7e4cff",
  key: "#8f63ff",
  rim: "#ff3d82",
  smoke: "#120716",
} as const;

export const sceneConfig = {
  desktop: {
    fragmentCount: 34,
    particleCount: 860,
    smokeCount: 6,
  },
  mobile: {
    fragmentCount: 18,
    particleCount: 420,
    smokeCount: 3,
  },
} as const;

export const scenePhaseStops = [
  { color: "#7e4cff", progress: 0 },
  { color: "#ff4a8a", progress: 0.38 },
  { color: "#6dcbff", progress: 0.72 },
  { color: "#ff6f91", progress: 1 },
] as const;
