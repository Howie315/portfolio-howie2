import { Suspense, lazy } from "react";
import type { ReactNode } from "react";

import { useShouldEnable3D } from "../../hooks/useShouldEnable3D";
import { SiteHeader } from "../organisms/SiteHeader";

type PortfolioLayoutProps = {
  children: ReactNode;
};

const ImmersiveBackground = lazy(
  () => import("../three/ImmersiveBackground/ImmersiveBackground"),
);

const BackdropFallback = (): JSX.Element => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_16%,rgba(126,76,255,0.18),transparent_18%),radial-gradient(circle_at_78%_22%,rgba(255,74,138,0.16),transparent_18%),linear-gradient(180deg,#05020d_0%,#04030b_48%,#030308_100%)]"
    />
  );
};

const PortfolioLayout = ({
  children,
}: Readonly<PortfolioLayoutProps>): JSX.Element => {
  const shouldEnable3D = useShouldEnable3D();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-transparent text-white">
      <BackdropFallback />
      {shouldEnable3D ? (
        <Suspense fallback={null}>
          <ImmersiveBackground />
        </Suspense>
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_50%_-10%,transparent_0%,rgba(0,0,0,0.12)_36%,rgba(0,0,0,0.66)_100%)]"
      />

      <div className="relative z-20">
        <SiteHeader />
        <main className="pb-16">{children}</main>
      </div>
    </div>
  );
};

export default PortfolioLayout;
