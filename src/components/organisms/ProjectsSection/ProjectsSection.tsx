import { projects } from "../../../data/projects";

import ProjectCard from "./subcomponents/ProjectCard";
import SectionReveal from "../../molecules/SectionReveal";
import SectionHeading from "../../molecules/SectionHeading";

const ProjectsSection = (): React.JSX.Element => {
  return (
    <section
      className="section-shell"
      id="projects"
      style={{
        containIntrinsicSize: "1px 1800px",
        contentVisibility: "auto",
      }}
    >
      <div className="section-inner">
        <SectionReveal>
          <SectionHeading
            description="A few selected builds where the priority was product clarity, interaction feel, and making each flow hold together under real use."
            eyebrow="Projects"
            title="Selected systems, flows, and product surfaces."
          />

          <div className="mt-12 grid gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default ProjectsSection;
