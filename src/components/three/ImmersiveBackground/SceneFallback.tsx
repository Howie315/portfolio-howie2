const SceneFallback = (): React.JSX.Element => {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(170,92,255,0.25),transparent_20%),radial-gradient(circle_at_72%_38%,rgba(255,74,138,0.16),transparent_18%),radial-gradient(circle_at_28%_70%,rgba(77,41,165,0.16),transparent_22%),linear-gradient(180deg,rgba(2,2,10,0.22),rgba(2,2,8,0.72))]" />
      <div className="absolute top-[10%] left-[12%] h-72 w-72 rounded-full border border-[rgba(255,255,255,0.06)] bg-[radial-gradient(circle,rgba(125,70,255,0.15),transparent_68%)] blur-2xl" />
      <div className="absolute right-[8%] bottom-[16%] h-96 w-96 rounded-full border border-[rgba(255,255,255,0.04)] bg-[radial-gradient(circle,rgba(255,60,109,0.16),transparent_64%)] blur-3xl" />
      <div className="absolute inset-x-[18%] top-[22%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)] opacity-70" />
      <div className="absolute inset-x-[28%] top-[24%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,72,131,0.4),transparent)] opacity-60" />
    </div>
  );
};

export default SceneFallback;
