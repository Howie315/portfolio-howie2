import type { ProjectImage } from "../../../../data/projects";

type ProjectPreviewGridProps = {
  images: ReadonlyArray<ProjectImage>;
  title: string;
};

const ProjectPreviewGrid = ({
  images,
  title,
}: ProjectPreviewGridProps): React.JSX.Element => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {images.map((image) => (
        <div
          key={`${title}-${image.alt}`}
          className="overflow-hidden rounded-[1.65rem] border border-white/10 bg-[rgba(8,4,18,0.68)] shadow-[0_22px_64px_rgba(2,0,15,0.34)]"
        >
          <img
            alt={image.alt}
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
            src={image.src}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectPreviewGrid;
