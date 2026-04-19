import type { ReactNode } from "react";

import SiteHeader from "../organisms/SiteHeader";

type PortfolioLayoutProps = {
  children: ReactNode;
};

const PortfolioLayout = ({
  children,
}: Readonly<PortfolioLayoutProps>): JSX.Element => {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <SiteHeader />
      <main className="pb-16">{children}</main>
    </div>
  );
};

export default PortfolioLayout;
