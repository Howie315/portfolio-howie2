import { projects } from "../../../data/projects";

import ProjectCard from "./subcomponents/ProjectCard";
import SectionHeading from "../../molecules/SectionHeading";

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
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
