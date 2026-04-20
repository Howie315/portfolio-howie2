import {
  type SceneSectionId,
  sceneSectionOrder,
  sceneSections,
} from "../../../../data/sceneContent";
import type { ViewportKind } from "../../../../hooks/useSceneExperienceProfile";

type SceneHubFallbackProps = {
  activeSection: SceneSectionId | null;
  onSelectSection: (sectionId: SceneSectionId) => void;
  viewportKind: ViewportKind;
};

const SceneHubFallback = ({
  activeSection,
  onSelectSection,
  viewportKind,
}: Readonly<SceneHubFallbackProps>): React.JSX.Element => {
  const isMobile = viewportKind === "mobile";
  const leadSection = sceneSections.find((section) => section.id === "about");

  return (
    <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden overscroll-y-contain">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(126,76,255,0.16),transparent_22%),radial-gradient(circle_at_52%_62%,rgba(255,74,138,0.16),transparent_22%),linear-gradient(180deg,#05030c_0%,#04020b_48%,#020208_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[22%] h-88 w-88 -translate-x-1/2 rounded-full border border-[rgba(126,76,255,0.22)] bg-[radial-gradient(circle_at_center,rgba(126,76,255,0.22),transparent_65%)] blur-3xl"
      />

      <div className="relative flex min-h-screen items-start justify-center px-4 py-28 pb-12 sm:items-center sm:px-6 sm:py-28">
        <div className="grid w-full max-w-6xl gap-4 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="scene-shell-panel rounded-[1.7rem] p-5 sm:rounded-4xl sm:p-8">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[rgba(255,170,204,0.84)] sm:text-[0.72rem]">
              {isMobile ? "Touch chamber mode" : "Scene fallback"}
            </p>
            <h1 className="mt-4 max-w-xl font-display text-[1.8rem] leading-[0.95] text-white sm:text-[2.45rem] lg:text-6xl">
              {isMobile
                ? "A lighter chamber built for touch, clarity, and speed."
                : "A navigation chamber that still works without heavy 3D."}
            </h1>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-7 text-[rgba(218,220,231,0.78)] sm:mt-5 sm:text-base">
              {isMobile
                ? "On mobile and constrained devices, the chamber becomes a touch-first exploration map. The same desk, monitor, archive, wall panel, and portal structure is preserved, but the presentation is cleaner, faster, and easier to navigate."
                : "On smaller screens and low-power devices, the portfolio switches to a lighter exploration mode. The same object map is preserved so the experience stays readable, fast, and intentional."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.66rem] uppercase tracking-[0.24em] text-[rgba(214,216,226,0.74)]">
                Lightweight mode
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.66rem] uppercase tracking-[0.24em] text-[rgba(214,216,226,0.74)]">
                Same section map
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.66rem] uppercase tracking-[0.24em] text-[rgba(214,216,226,0.74)]">
                Faster mobile load
              </span>
            </div>

            {isMobile && leadSection ? (
              <div className="mt-6 rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.26)]">
                <p className="text-[0.6rem] uppercase tracking-[0.32em] text-[rgba(196,192,220,0.56)]">
                  Start here
                </p>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[rgba(255,170,204,0.82)]">
                      {leadSection.kicker}
                    </p>
                    <p className="mt-2 font-display text-xl text-white">
                      Open the desk first
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_24px_currentColor]"
                    style={{ backgroundColor: leadSection.accent }}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-[rgba(214,217,228,0.76)]">
                  Begin with the personal context, then move through projects,
                  skills, experience, and contact like a guided chamber map.
                </p>
              </div>
            ) : null}
          </div>

          <div className={`grid gap-3 ${isMobile ? "" : "sm:grid-cols-2"}`}>
            {sceneSectionOrder.map((sectionId) => {
              const section =
                sceneSections.find((item) => item.id === sectionId) ?? null;

              if (!section) {
                return null;
              }

              const isActive = activeSection === section.id;

              return (
                <button
                  className={`touch-manipulation group rounded-[1.55rem] border p-5 text-left transition active:scale-[0.99] sm:rounded-[1.8rem] sm:p-6 ${
                    isActive
                      ? "border-[rgba(255,170,204,0.36)] bg-[rgba(255,255,255,0.1)] shadow-[0_24px_70px_rgba(127,76,255,0.18)]"
                      : "border-white/10 bg-[rgba(10,8,20,0.62)] hover:border-white/20 hover:bg-[rgba(255,255,255,0.06)]"
                  }`}
                  key={section.id}
                  onClick={() => onSelectSection(section.id)}
                  type="button"
                >
                  <div
                    aria-hidden="true"
                    className="mb-4 h-1 w-16 rounded-full bg-[linear-gradient(90deg,rgba(255,74,138,0.92),rgba(126,76,255,0.88),rgba(109,203,255,0.82))]"
                  />
                  <p className="text-[0.66rem] uppercase tracking-[0.32em] text-[rgba(255,170,204,0.82)]">
                    {section.kicker}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="mt-3 font-display text-[1.25rem] text-white sm:text-2xl">
                      {section.title}
                    </h2>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.22em] text-[rgba(222,224,232,0.7)] transition group-active:bg-white/10">
                      {isMobile ? "Tap to open" : "Open"}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.94rem] leading-7 text-[rgba(216,219,229,0.76)] sm:text-sm">
                    {section.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneHubFallback;
