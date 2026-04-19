import type { Project } from "../../../../data/projects";

import { Badge } from "../../../atoms/Badge";
import { ButtonLink } from "../../../atoms/ButtonLink";
import { IconArrowUpRight } from "../../../atoms/IconArrowUpRight";
import ProjectPreviewGrid from "./ProjectPreviewGrid";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps): JSX.Element => {
  return (
    <article className="surface-panel rounded-[2.3rem] p-6 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)]">
        <ProjectPreviewGrid images={project.images} title={project.title} />

        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
              {project.title}
            </h3>
            <p className="text-sm leading-7 text-[rgba(214,216,226,0.76)] sm:text-base">
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
  );
};

export default ProjectCard;
