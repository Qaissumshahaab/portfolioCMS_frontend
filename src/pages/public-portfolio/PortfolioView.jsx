import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { SearchX, Hourglass } from "lucide-react";

import { getPortfolioByUserId } from "../../services/portfolioService";
import { getHomepageByPortfolioId } from "../../services/homepageService";
import { getAboutByPortfolioId } from "../../services/aboutService";
import { getSkillsByPortfolioId } from "../../services/skillsService";
import { getExperienceByPortfolioId } from "../../services/experienceService";
import { getProjectsByPortfolioId } from "../../services/projectsService";
import { getBlogsByPortfolioId } from "../../services/blogService";
import { getResumeByPortfolioId } from "../../services/resumeService";
import { getSocialLinksByPortfolioId } from "../../services/socialLinksService";
import { getContactByPortfolioId } from "../../services/contactService";
import { recordVisit } from "../../services/visitorService";
import { getErrorMessage } from "../../utils/getErrorMessage";

import Loader from "../../components/common/Loader";
import Navbar from "../../components/portfolio/Navbar";
import Footer from "../../components/portfolio/Footer";
import PortfolioMessageScreen from "../../components/portfolio/PortfolioMessageScreen";
import HeroSection from "../../components/portfolio/HeroSection";
import AboutSection from "../../components/portfolio/AboutSection";
import SkillsSection from "../../components/portfolio/SkillsSection";
import ExperienceSection from "../../components/portfolio/ExperienceSection";
import ProjectSection from "../../components/portfolio/ProjectSection";
import BlogSection from "../../components/portfolio/BlogSection";
import ContactSection from "../../components/portfolio/ContactSection";

const PortfolioView = () => {
  const { userid } = useParams();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [sections, setSections] = useState(null);
  // Guards against double-firing the visitor tracking call in React 18 strict mode / re-renders.
  const hasTrackedVisit = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const loadPortfolio = async () => {
      setLoading(true);
      try {
        const portfolioResult = await getPortfolioByUserId(userid);
        const portfolio = portfolioResult.data;

        if (!portfolio) {
          if (isMounted) {
            setNotFound(true);
            setLoading(false);
          }
          return;
        }

        const portfolioid = portfolio._id;

        if (!hasTrackedVisit.current) {
          hasTrackedVisit.current = true;
          recordVisit(portfolioid).catch(() => {
            // Visitor tracking is best-effort and must never block the page.
          });
        }

        const [homepage, about, skills, experience, projects, blogs, resume, socialLinks, contact] =
          await Promise.allSettled([
            getHomepageByPortfolioId(portfolioid),
            getAboutByPortfolioId(portfolioid),
            getSkillsByPortfolioId(portfolioid),
            getExperienceByPortfolioId(portfolioid),
            getProjectsByPortfolioId(portfolioid),
            getBlogsByPortfolioId(portfolioid),
            getResumeByPortfolioId(portfolioid),
            getSocialLinksByPortfolioId(portfolioid),
            getContactByPortfolioId(portfolioid),
          ]);

        if (!isMounted) return;

        setSections({
          portfolioid,
          homepage: homepage.status === "fulfilled" ? homepage.value.data : null,
          about: about.status === "fulfilled" ? about.value.data : null,
          skills: skills.status === "fulfilled" ? skills.value.data : null,
          experience: experience.status === "fulfilled" ? experience.value.data : null,
          projects: projects.status === "fulfilled" ? projects.value.data : [],
          blogs: blogs.status === "fulfilled" ? blogs.value.data : [],
          resumeUrl: resume.status === "fulfilled" ? resume.value.data?.resumePic?.secure_url : "",
          socialLinks: socialLinks.status === "fulfilled" ? socialLinks.value.data : null,
          contact: contact.status === "fulfilled" ? contact.value.data : null,
        });
      } catch (error) {
        if (isMounted) {
          toast.error(getErrorMessage(error, "Could not load this portfolio."));
          setNotFound(true);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPortfolio();

    return () => {
      isMounted = false;
    };
  }, [userid]);

  if (loading) return <Loader label="Loading portfolio…" />;

  if (notFound || !sections) {
    return (
      <PortfolioMessageScreen
        icon={SearchX}
        title="This portfolio doesn't exist"
        description="Double check the link - the account it points to may not have been created."
      />
    );
  }

  // A freshly created portfolio with nothing filled in yet would otherwise
  // render as an almost-blank page (just a navbar + contact form) - show a
  // clear "in progress" state instead.
  const hasAnyContent =
    Boolean(sections.homepage) ||
    Boolean(sections.about) ||
    Boolean(sections.skills) ||
    Boolean(sections.experience) ||
    sections.projects?.length > 0 ||
    sections.blogs?.length > 0;

  if (!hasAnyContent) {
    return (
      <PortfolioMessageScreen
        icon={Hourglass}
        title="This portfolio is still being set up"
        description="The owner hasn't added any content yet. Check back soon."
      />
    );
  }

  // Drives which links the navbar shows - no point linking to an empty section.
  const visibleLinks = [
    sections.about && "about",
    sections.skills && "skills",
    sections.experience && "experience",
    sections.projects?.length > 0 && "projects",
    sections.blogs?.length > 0 && "blog",
    "contact",
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-paper">
      <Navbar name={sections.homepage?.fullName} resumeUrl={sections.resumeUrl} visibleLinks={visibleLinks} />
      <HeroSection homepage={sections.homepage} resumeUrl={sections.resumeUrl} />
      <AboutSection about={sections.about} />
      <SkillsSection skills={sections.skills} />
      <ExperienceSection experience={sections.experience} />
      <ProjectSection projects={sections.projects} />
      <BlogSection blogs={sections.blogs} userid={userid} />
      <ContactSection contact={sections.contact} socialLinks={sections.socialLinks} portfolioid={sections.portfolioid} />
      <Footer name={sections.homepage?.fullName} socialLinks={sections.socialLinks} />
    </div>
  );
};

export default PortfolioView;
