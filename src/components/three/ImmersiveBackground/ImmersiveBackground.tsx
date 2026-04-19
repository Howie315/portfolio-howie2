import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { isWebGLSupported } from "../../../utils/webgl";
import SceneFallback from "./SceneFallback";
import { createImmersiveScene } from "./createImmersiveScene";

type SceneStatus = "fallback" | "loading" | "ready";

const ImmersiveBackground = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [sceneStatus, setSceneStatus] = useState<SceneStatus>("loading");

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    if (!isWebGLSupported()) {
      setSceneStatus("fallback");
      return undefined;
    }

    setSceneStatus("loading");

    const controller = createImmersiveScene({
      canvas,
      onReady: () => {
        setSceneStatus("ready");
      },
      prefersReducedMotion,
    });

    return () => {
      controller.destroy();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(133,82,255,0.12),transparent_20%),radial-gradient(circle_at_80%_18%,rgba(255,74,138,0.12),transparent_18%),linear-gradient(180deg,rgba(3,2,10,0),rgba(3,2,10,0.65)_58%,rgba(3,2,8,0.92))]" />

      {sceneStatus === "fallback" ? (
        <SceneFallback />
      ) : (
        <canvas
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
            sceneStatus === "ready" ? "opacity-100" : "opacity-0"
          }`}
          ref={canvasRef}
        />
      )}

      <div
        className={`absolute inset-x-0 top-0 flex justify-center transition-all duration-700 ${
          sceneStatus === "ready"
            ? "pointer-events-none -translate-y-6 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mt-10 rounded-full border border-white/10 bg-black/35 px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[rgba(255,74,138,0.92)] shadow-[0_0_18px_rgba(255,74,138,0.85)]" />
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.34em] text-slate-400">
                Scene boot
              </p>
              <p className="mt-1 text-sm text-slate-200">
                Calibrating depth and energy layers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveBackground;
