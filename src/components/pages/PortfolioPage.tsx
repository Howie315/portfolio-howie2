import { Suspense, lazy } from "react";

import HeroSection from "../organisms/HeroSection";
import SectionFallback from "../molecules/SectionFallback";
import PortfolioLayout from "../templates/PortfolioLayout";

const AboutSection = lazy(() => import("../organisms/AboutSection"));
const ExperienceSection = lazy(() => import("../organisms/ExperienceSection"));
const ProjectsSection = lazy(() => import("../organisms/ProjectsSection"));
const ContactSection = lazy(() => import("../organisms/ContactSection"));

const PortfolioPage = (): JSX.Element => {
  return (
    <PortfolioLayout>
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
    </PortfolioLayout>
  );
};

export default PortfolioPage;
