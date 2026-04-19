import type { ReactNode } from "react";

import type { NavItem } from "../../data/portfolio";

import SiteHeader from "../organisms/SiteHeader";

type PortfolioLayoutProps = {
  children: ReactNode;
  navItems: NavItem[];
};

const PortfolioLayout = ({
  children,
  navItems,
}: Readonly<PortfolioLayoutProps>): JSX.Element => {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <SiteHeader items={navItems} />
      <main className="pb-16">{children}</main>
    </div>
  );
};

export default PortfolioLayout;
