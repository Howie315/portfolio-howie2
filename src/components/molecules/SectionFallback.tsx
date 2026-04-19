type SectionFallbackProps = {
  className?: string;
};

const SectionFallback = ({
  className = "",
}: SectionFallbackProps): JSX.Element => {
  return (
    <div className={`px-4 py-8 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="animate-pulse space-y-6 rounded-[2rem] border border-white/8 bg-white/4 p-6">
          <div className="h-3 w-28 rounded-full bg-white/10" />
          <div className="h-10 w-full max-w-2xl rounded-full bg-white/10" />
          <div className="h-28 rounded-[1.5rem] bg-white/6" />
        </div>
      </div>
    </div>
  );
};

export default SectionFallback;
