import { Suspense, lazy } from "react";

import SectionFallback from "./PortfolioPage/subcomponents/SectionFallback";
import HeroSection from "../organisms/HeroSection/HeroSection";
import PortfolioLayout from "../templates/PortfolioLayout";

const AboutSection = lazy(
  () => import("../organisms/AboutSection/AboutSection"),
);
const ExperienceSection = lazy(
  () => import("../organisms/ExperienceSection/ExperienceSection"),
);
const ProjectsSection = lazy(
  () => import("../organisms/ProjectsSection/ProjectsSection"),
);
const ContactSection = lazy(
  () => import("../organisms/ContactSection/ContactSection"),
);

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
