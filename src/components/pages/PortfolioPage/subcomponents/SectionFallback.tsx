type SectionFallbackProps = {
  className?: string;
};

const SectionFallback = ({
  className = "",
}: SectionFallbackProps): React.JSX.Element => {
  return (
    <div className={`section-shell ${className}`}>
      <div className="section-inner">
        <div className="surface-panel animate-pulse space-y-6 rounded-[2rem] p-6">
          <div className="h-3 w-28 rounded-full bg-white/10" />
          <div className="h-10 w-full max-w-2xl rounded-full bg-white/10" />
          <div className="h-28 rounded-[1.5rem] bg-white/6" />
        </div>
      </div>
    </div>
  );
};

export default SectionFallback;
