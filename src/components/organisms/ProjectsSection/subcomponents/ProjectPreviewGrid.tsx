import type { ProjectImage } from "../../../../data/projects";

type ProjectPreviewGridProps = {
  images: ReadonlyArray<ProjectImage>;
  title: string;
};

const ProjectPreviewGrid = ({
  images,
  title,
}: ProjectPreviewGridProps): JSX.Element => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {images.map((image) => (
        <div
          key={`${title}-${image.alt}`}
          className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/60 shadow-[0_16px_50px_rgba(4,10,24,0.28)]"
        >
          <img
            alt={image.alt}
            className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
            src={image.src}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectPreviewGrid;
