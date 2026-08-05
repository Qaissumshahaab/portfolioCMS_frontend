import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import RequirePortfolio from "./RequirePortfolio";

import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import NotFoundPage from "../pages/NotFoundPage";

import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardOverview from "../pages/dashboard/DashboardOverview";
import HomepageEditor from "../pages/dashboard/HomepageEditor";
import AboutEditor from "../pages/dashboard/AboutEditor";
import ExperienceEditor from "../pages/dashboard/ExperienceEditor";
import SkillsEditor from "../pages/dashboard/SkillsEditor";
import ProjectsEditor from "../pages/dashboard/ProjectsEditor";
import BlogManager from "../pages/dashboard/BlogManager";
import ResumeManager from "../pages/dashboard/ResumeManager";
import SocialLinksEditor from "../pages/dashboard/SocialLinksEditor";
import ContactInfoEditor from "../pages/dashboard/ContactInfoEditor";

import PortfolioView from "../pages/public-portfolio/PortfolioView";
import BlogPostView from "../pages/public-portfolio/BlogPostView";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />

    {/* Public portfolio - the one template every user's portfolio renders through */}
    <Route path="/portfolio/:userid" element={<PortfolioView />} />
    <Route path="/portfolio/:userid/blog/:blogid" element={<BlogPostView />} />

    {/* Auth pages - redirect away if already logged in */}
    <Route element={<PublicOnlyRoute />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Route>

    {/* Dashboard - requires a valid session */}
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route element={<RequirePortfolio />}>
          <Route path="homepage" element={<HomepageEditor />} />
          <Route path="about" element={<AboutEditor />} />
          <Route path="experience" element={<ExperienceEditor />} />
          <Route path="skills" element={<SkillsEditor />} />
          <Route path="projects" element={<ProjectsEditor />} />
          <Route path="blog" element={<BlogManager />} />
          <Route path="resume" element={<ResumeManager />} />
          <Route path="social-links" element={<SocialLinksEditor />} />
          <Route path="contact-info" element={<ContactInfoEditor />} />
        </Route>
      </Route>
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
