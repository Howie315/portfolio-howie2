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

  return (
    <aside className="pointer-events-none fixed inset-0 z-30 flex items-end justify-end p-0 sm:items-stretch sm:p-4 lg:p-6">
      <button
        aria-label="Close section panel"
        className="pointer-events-auto absolute inset-0 touch-manipulation bg-[rgba(2,2,8,0.56)] backdrop-blur-[2px]"
        onClick={onClose}
        type="button"
      />

      <div className="pointer-events-auto relative flex h-[min(91vh,46rem)] w-full flex-col overflow-hidden rounded-t-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(19,11,34,0.96),rgba(7,6,18,0.98))] shadow-[0_32px_120px_rgba(0,0,0,0.56)] backdrop-blur-2xl sm:h-full sm:max-h-none sm:max-w-xl sm:rounded-4xl">
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
                {sectionMeta.kicker} archive
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

          {activeSection === "projects" ? (
            <div className="space-y-4">
              {sceneSectionCopy.projects.projects.map((project) => (
                <article
                  className="scene-detail-card rounded-[1.6rem] p-4 sm:p-5"
                  key={project.title}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl text-white">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-7 text-[rgba(214,217,228,0.76)]">
                        {project.summary}
                      </p>
                    </div>

                    <a
                      className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] uppercase tracking-[0.24em] text-white transition hover:border-white/20 hover:bg-white/8"
                      href={project.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Open
                    </a>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span className="scene-detail-chip" key={technology}>
                        {technology}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : null}

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

          {activeSection === "experience" ? (
            <div className="space-y-4">
              {sceneSectionCopy.experience.entries.map((entry) => (
                <article
                  className="scene-detail-card rounded-[1.6rem] p-4 sm:p-5"
                  key={`${entry.title}-${entry.duration}`}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-display text-xl text-white">
                      {entry.title}
                    </h3>
                    <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[rgba(255,170,204,0.8)]">
                      {entry.duration}
                    </p>
                  </div>

                  <ul className="mt-4 space-y-3 text-sm leading-7 text-[rgba(214,217,228,0.76)]">
                    {entry.description.map((item) => (
                      <li className="flex gap-3" key={item}>
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(255,170,204,0.92)]" />
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
          ) : null}

          {activeSection === "contact" ? (
            <div className="space-y-4">
              {sceneSectionCopy.contact.methods.map((method) => (
                <a
                  className="scene-detail-card flex items-center justify-between gap-4 rounded-[1.6rem] p-4 transition hover:border-white/20 hover:bg-white/7 sm:p-5"
                  href={method.href}
                  key={method.label}
                  rel={
                    method.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                >
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[rgba(255,170,204,0.82)]">
                      {method.label}
                    </p>
                    <p className="mt-2 text-base text-white sm:text-lg">
                      {method.value}
                    </p>
                  </div>
                  <span className="text-[0.68rem] uppercase tracking-[0.24em] text-[rgba(219,221,231,0.68)]">
                    Open
                  </span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
};

export default SceneDetailPanel;
