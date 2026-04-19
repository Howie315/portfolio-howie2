type SectionEyebrowProps = {
  children: string;
};

const SectionEyebrow = ({ children }: SectionEyebrowProps): JSX.Element => {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-300">
      {children}
    </p>
  );
};

export default SectionEyebrow;
