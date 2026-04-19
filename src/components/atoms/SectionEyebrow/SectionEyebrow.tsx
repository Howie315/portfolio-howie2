type SectionEyebrowProps = {
  children: string;
};

export const SectionEyebrow = ({
  children,
}: SectionEyebrowProps): JSX.Element => {
  return (
    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[rgba(255,170,204,0.88)]">
      {children}
    </p>
  );
};

export default SectionEyebrow;
