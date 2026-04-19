import {
  aboutHighlights,
  aboutParagraphs,
  contactMethods,
  experienceEntries,
  heroStats,
  navItems,
  profile,
  projects,
} from "../../data/portfolio";

import AboutSection from "../organisms/AboutSection";
import ContactSection from "../organisms/ContactSection";
import ExperienceSection from "../organisms/ExperienceSection";
import HeroSection from "../organisms/HeroSection";
import ProjectsSection from "../organisms/ProjectsSection";
import PortfolioLayout from "../templates/PortfolioLayout";

const PortfolioPage = (): JSX.Element => {
  return (
    <PortfolioLayout navItems={navItems}>
      <HeroSection
        profileAlt={profile.alt}
        profileImage={profile.image}
        stats={heroStats}
      />
      <AboutSection
        highlights={aboutHighlights}
        imageAlt={profile.alt}
        imageSrc={profile.image}
        paragraphs={aboutParagraphs}
      />
      <ExperienceSection entries={experienceEntries} />
      <ProjectsSection projects={projects} />
      <ContactSection methods={contactMethods} />
    </PortfolioLayout>
  );
};

export default PortfolioPage;
