import {
  type SceneSectionId,
  sceneSectionCopy,
  sceneSections,
} from "../../../../data/sceneContent";
import type { ViewportKind } from "../../../../hooks/useSceneExperienceProfile";

type SceneDetailPanelProps = {
  activeSection: SceneSectionId | null;
  onClose: () => void;
  viewportKind: ViewportKind;
};

const ProjectMonitorContent = (): React.JSX.Element => {
  const [featuredProject, ...supportingProjects] =
    sceneSectionCopy.projects.projects;

  return (
    <div className="space-y-4">
      {featuredProject ? (
        <article className="scene-detail-card overflow-hidden rounded-[1.45rem]">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
            <div className="relative min-h-[13rem] overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(109,203,255,0.2),transparent_32%),linear-gradient(135deg,rgba(7,18,28,0.96),rgba(11,8,24,0.98))] p-4 sm:p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#6dcbff] shadow-[0_0_18px_rgba(109,203,255,0.78)]" />
                  <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[rgba(216,244,255,0.62)]">
                    Workspace boot
                  </span>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[0.56rem] uppercase tracking-[0.24em] text-[rgba(230,246,255,0.72)]">
                  Featured
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {featuredProject.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[rgba(218,230,238,0.78)]">
                {featuredProject.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {featuredProject.technologies.slice(0, 5).map((technology) => (
                  <span className="scene-detail-chip" key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
              <a
                className="mt-6 inline-flex rounded-full border border-[rgba(109,203,255,0.34)] bg-[rgba(109,203,255,0.1)] px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-white transition hover:border-[rgba(109,203,255,0.55)] hover:bg-[rgba(109,203,255,0.16)]"
                href={featuredProject.href}
                rel="noreferrer"
                target="_blank"
              >
                Open build
              </a>
            </div>
            <div className="relative min-h-[13rem] overflow-hidden border-t border-white/10 bg-black/20 lg:border-l lg:border-t-0">
              {featuredProject.images[0] ? (
                <img
                  alt={featuredProject.images[0].alt}
                  className="h-full min-h-[13rem] w-full object-cover opacity-82"
                  src={featuredProject.images[0].src}
                />
              ) : null}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(5,5,16,0.5)),repeating-linear-gradient(180deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_8px)]" />
            </div>
          </div>
        </article>
      ) : null}

      <div className="grid gap-3 lg:grid-cols-2">
        {supportingProjects.map((project) => (
          <article
            className="scene-detail-card overflow-hidden rounded-[1.35rem]"
            key={project.title}
          >
            {project.images[0] ? (
              <img
                alt={project.images[0].alt}
                className="h-32 w-full object-cover opacity-78"
                src={project.images[0].src}
              />
            ) : null}
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg text-white">
                  {project.title}
                </h3>
                <a
                  className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.22em] text-white transition hover:border-white/25 hover:bg-white/8"
                  href={project.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open
                </a>
              </div>
              <p className="mt-2 text-sm leading-6 text-[rgba(214,217,228,0.74)]">
                {project.summary}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

const PortalContactContent = (): React.JSX.Element => (
  <div className="space-y-4">
    <div className="scene-detail-card relative overflow-hidden rounded-[1.55rem] p-5 sm:p-6">
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[rgba(126,76,255,0.28)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-8 h-52 w-52 rounded-full bg-[rgba(109,203,255,0.16)] blur-3xl" />
      <div className="relative">
        <p className="text-[0.62rem] uppercase tracking-[0.34em] text-[rgba(203,182,255,0.76)]">
          Gateway open
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
          Step through when the work needs a sharper interface.
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[rgba(224,224,238,0.76)]">
          Frontend roles, product UI work, AI-facing interfaces, and distinctive
          web experiences are the best fit.
        </p>
      </div>
    </div>

    <div className="grid gap-3">
      {sceneSectionCopy.contact.methods.map((method) => (
        <a
          className="scene-detail-card group flex items-center justify-between gap-4 rounded-[1.35rem] p-4 transition hover:border-[rgba(126,76,255,0.36)] hover:bg-white/7 sm:p-5"
          href={method.href}
          key={method.label}
          rel={method.href.startsWith("http") ? "noreferrer" : undefined}
          target={method.href.startsWith("http") ? "_blank" : undefined}
        >
          <div>
            <p className="text-[0.66rem] uppercase tracking-[0.28em] text-[rgba(203,182,255,0.76)]">
              {method.label}
            </p>
            <p className="mt-2 text-base text-white sm:text-lg">
              {method.value}
            </p>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.24em] text-[rgba(219,221,231,0.68)] transition group-hover:border-[rgba(126,76,255,0.42)] group-hover:text-white">
            Enter
          </span>
        </a>
      ))}
    </div>
  </div>
);

const ExperienceArchiveContent = (): React.JSX.Element => (
  <div className="space-y-4">
    <div className="scene-detail-card relative overflow-hidden rounded-[1.35rem] p-5 sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.045)_0,rgba(255,255,255,0.045)_1px,transparent_1px,transparent_8px)] opacity-45" />
      <div className="pointer-events-none absolute -right-10 top-4 h-44 w-44 rounded-full bg-[rgba(109,203,255,0.18)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-36 w-56 bg-[radial-gradient(circle_at_20%_60%,rgba(255,141,179,0.18),transparent_58%)]" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[0.62rem] uppercase tracking-[0.34em] text-[rgba(124,255,212,0.78)]">
            Cartridge archive
          </p>
          <span className="rounded-full border border-[rgba(124,255,212,0.2)] bg-[rgba(124,255,212,0.06)] px-3 py-1 text-[0.56rem] uppercase tracking-[0.24em] text-[rgba(230,255,248,0.72)]">
            2 carts
          </span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
          Insert a career cartridge. Load the level. Read the save data.
        </h3>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {["SYNC-24", "SIZZLE-23"].map((label) => (
            <div
              className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3"
              key={label}
            >
              <p className="text-[0.58rem] uppercase tracking-[0.26em] text-[rgba(109,203,255,0.72)]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid gap-3 lg:grid-cols-2">
      {sceneSectionCopy.experience.entries.map((entry, index) => (
        <article
          className="scene-detail-card relative overflow-hidden rounded-[1.15rem] p-4 transition hover:border-[rgba(124,255,212,0.28)] hover:bg-white/7 sm:p-5"
          key={`${entry.title}-${entry.duration}`}
        >
          <div className="pointer-events-none absolute right-4 top-4 h-16 w-16 rounded-full bg-[rgba(109,203,255,0.08)] blur-2xl" />
          <div className="relative mb-4 flex h-28 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(13,12,18,0.95),rgba(29,21,36,0.9))]">
            <div
              className="h-20 w-32 rounded-lg border border-white/10 bg-[#2a2530] shadow-[0_18px_38px_rgba(0,0,0,0.32)]"
              style={{
                boxShadow:
                  index === 0
                    ? "0 0 34px rgba(109,203,255,0.18)"
                    : "0 0 34px rgba(255,141,179,0.18)",
              }}
            >
              <div
                className="mx-auto mt-3 h-9 w-24 rounded border border-white/10"
                style={{
                  backgroundColor:
                    index === 0
                      ? "rgba(109,203,255,0.34)"
                      : "rgba(255,141,179,0.34)",
                }}
              />
              <div className="mx-auto mt-2 h-1.5 w-20 rounded-full bg-white/18" />
              <div className="mx-auto mt-1.5 h-1.5 w-14 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:items-start">
            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.28em] text-[rgba(124,255,212,0.72)]">
                Cartridge {String(index + 1).padStart(2, "0")} loaded
              </p>
              <h3 className="mt-2 font-display text-xl text-white">
                {entry.title}
              </h3>
            </div>
            <p className="text-[0.66rem] uppercase tracking-[0.24em] text-[rgba(255,170,204,0.8)]">
              {entry.duration}
            </p>
          </div>

          <ul className="mt-4 space-y-3 text-sm leading-7 text-[rgba(214,217,228,0.76)]">
            {entry.description.map((item) => (
              <li className="flex gap-3" key={item}>
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(124,255,212,0.82)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {entry.technologies.map((technology) => (
              <span className="scene-detail-chip" key={technology}>
                {technology}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  </div>
);

const panelEyebrowMap: Record<SceneSectionId, string> = {
  about: "Keyboard profile",
  contact: "Portal gateway",
  experience: "Archive index",
  projects: "Monitor system",
  skills: "Notebook codex",
};

export const SceneDetailPanel = ({
  activeSection,
  onClose,
  viewportKind,
}: Readonly<SceneDetailPanelProps>): React.JSX.Element | null => {
  if (!activeSection) {
    return null;
  }

  const sectionMeta =
    sceneSections.find((section) => section.id === activeSection) ?? null;

  if (!sectionMeta) {
    return null;
  }

  const isMobile = viewportKind === "mobile";
  const panelClassName =
    activeSection === "projects"
      ? "pointer-events-auto relative flex h-[min(91vh,46rem)] w-full flex-col overflow-hidden rounded-t-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,18,28,0.96),rgba(5,6,18,0.98))] shadow-[0_32px_120px_rgba(0,0,0,0.56)] backdrop-blur-2xl sm:h-full sm:max-h-none sm:max-w-3xl sm:rounded-4xl xl:max-w-4xl"
      : activeSection === "contact"
        ? "pointer-events-auto relative flex h-[min(91vh,46rem)] w-full flex-col overflow-hidden rounded-t-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,10,42,0.96),rgba(7,6,18,0.98))] shadow-[0_32px_120px_rgba(0,0,0,0.56)] backdrop-blur-2xl sm:h-full sm:max-h-none sm:max-w-2xl sm:rounded-4xl"
        : activeSection === "experience"
          ? "pointer-events-auto relative flex h-[min(91vh,46rem)] w-full flex-col overflow-hidden rounded-t-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(28,11,28,0.96),rgba(7,6,18,0.98))] shadow-[0_32px_120px_rgba(0,0,0,0.56)] backdrop-blur-2xl sm:h-full sm:max-h-none sm:max-w-2xl sm:rounded-4xl"
          : "pointer-events-auto relative flex h-[min(91vh,46rem)] w-full flex-col overflow-hidden rounded-t-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(19,11,34,0.96),rgba(7,6,18,0.98))] shadow-[0_32px_120px_rgba(0,0,0,0.56)] backdrop-blur-2xl sm:h-full sm:max-h-none sm:max-w-xl sm:rounded-4xl";

  return (
    <aside className="pointer-events-none fixed inset-0 z-30 flex items-end justify-end p-0 sm:items-stretch sm:p-4 lg:p-6">
      <button
        aria-label="Close section panel"
        className="pointer-events-auto absolute inset-0 touch-manipulation bg-[rgba(2,2,8,0.56)] backdrop-blur-[2px]"
        onClick={onClose}
        type="button"
      />

      <div className={panelClassName}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,170,204,0.42),transparent)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-16 h-48 w-48 rounded-full blur-3xl"
          style={{ backgroundColor: `${sectionMeta.accent}32` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 top-20 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)] sm:inset-x-7"
        />
        {isMobile ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center pt-3">
            <span className="h-1 w-14 rounded-full bg-white/16" />
          </div>
        ) : null}

        <div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-7">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full shadow-[0_0_20px_currentColor]"
                style={{ backgroundColor: sectionMeta.accent }}
              />
              <p className="text-[0.64rem] uppercase tracking-[0.34em] text-[rgba(255,170,204,0.82)]">
                {panelEyebrowMap[activeSection]}
              </p>
            </div>
            <p className="mt-3 text-[0.68rem] uppercase tracking-[0.34em] text-[rgba(196,192,220,0.54)]">
              {sectionMeta.kicker}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
              {sectionMeta.title}
            </h2>
            <p className="mt-3 max-w-lg text-[0.95rem] leading-7 text-[rgba(219,221,231,0.76)] sm:text-base">
              {sectionMeta.summary ?? sectionMeta.description}
            </p>
          </div>

          <button
            aria-label="Close detail panel"
            className="touch-manipulation rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.66rem] font-medium uppercase tracking-[0.28em] text-[rgba(220,223,232,0.78)] transition hover:border-white/20 hover:bg-white/8 hover:text-white"
            onClick={onClose}
            type="button"
          >
            {isMobile ? "Close" : "Return"}
          </button>
        </div>

        <div className="relative z-10 flex-1 overflow-y-auto px-5 py-4 pb-32 sm:px-7 sm:py-6 sm:pb-6">
          {activeSection === "about" ? (
            <div className="space-y-6">
              <div className={`grid gap-3 ${isMobile ? "" : "sm:grid-cols-3"}`}>
                {sceneSectionCopy.about.highlights.map((highlight) => (
                  <div
                    className="scene-detail-card rounded-[1.4rem] px-4 py-4 text-sm leading-6 text-[rgba(228,230,237,0.82)]"
                    key={highlight}
                  >
                    {highlight}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {sceneSectionCopy.about.paragraphs.map((paragraph) => (
                  <p
                    className="text-sm leading-7 text-[rgba(214,217,228,0.78)] sm:text-base"
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          {activeSection === "projects" ? <ProjectMonitorContent /> : null}

          {activeSection === "skills" ? (
            <div className="grid gap-4">
              {sceneSectionCopy.skills.groups.map((group) => (
                <section
                  className="scene-detail-card rounded-[1.6rem] p-4 sm:p-5"
                  key={group.label}
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[rgba(255,170,204,0.82)]">
                    {group.label}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {group.values.map((value) => (
                      <span
                        className="scene-detail-chip text-[0.72rem]! tracking-[0.12em]! normal-case"
                        key={value}
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : null}

          {activeSection === "experience" ? <ExperienceArchiveContent /> : null}

          {activeSection === "contact" ? <PortalContactContent /> : null}
        </div>
      </div>
    </aside>
  );
};

export default SceneDetailPanel;
