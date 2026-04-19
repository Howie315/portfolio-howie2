import { projects } from "../../data/projects";

import Badge from "../atoms/Badge";
import ButtonLink from "../atoms/ButtonLink";
import IconArrowUpRight from "../atoms/IconArrowUpRight";
import ProjectPreviewGrid from "../molecules/ProjectPreviewGrid";
import SectionHeading from "../molecules/SectionHeading";

const ProjectsSection = (): JSX.Element => {
  return (
    <section
      className="px-4 py-8 scroll-mt-28 sm:px-6 lg:px-8"
      id="projects"
      style={{
        containIntrinsicSize: "1px 1800px",
        contentVisibility: "auto",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          description="Selected work focused on product interfaces, communication flows, and mobile-first experiences."
          eyebrow="Projects"
          title="Products that balance clarity, utility, and visual polish."
        />

        <div className="mt-10 grid gap-8">
          {projects.map((project) => (
            <article
              className="rounded-4xl border border-white/10 bg-white/6 p-6 shadow-[0_26px_90px_rgba(4,10,24,0.3)] backdrop-blur-xl"
              key={project.title}
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
                <ProjectPreviewGrid
                  images={project.images}
                  title={project.title}
                />

                <div className="flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-7 text-slate-300 sm:text-base">
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <Badge key={technology} tone="muted">
                        {technology}
                      </Badge>
                    ))}
                  </div>

                  <ButtonLink
                    className="self-start"
                    href={project.href}
                    rel="noreferrer"
                    target="_blank"
                    variant="ghost"
                  >
                    <span className="flex items-center gap-2">
                      Open repository
                      <IconArrowUpRight />
                    </span>
                  </ButtonLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
