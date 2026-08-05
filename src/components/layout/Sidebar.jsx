import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  UserCircle,
  Briefcase,
  Sparkles,
  FolderGit2,
  Newspaper,
  FileText,
  Link2,
  Mail,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", end: true, icon: LayoutDashboard },
  { to: "/dashboard/homepage", label: "Homepage", icon: Home },
  { to: "/dashboard/about", label: "About", icon: UserCircle },
  { to: "/dashboard/experience", label: "Experience", icon: Briefcase },
  { to: "/dashboard/skills", label: "Skills", icon: Sparkles },
  { to: "/dashboard/projects", label: "Projects", icon: FolderGit2 },
  { to: "/dashboard/blog", label: "Blog", icon: Newspaper },
  { to: "/dashboard/resume", label: "Resume", icon: FileText },
  { to: "/dashboard/social-links", label: "Social links", icon: Link2 },
  { to: "/dashboard/contact-info", label: "Contact info", icon: Mail },
];

const linkClasses = ({ isActive }) =>
  `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm ${
    isActive ? "bg-accent text-white" : "text-ink hover:bg-paper"
  }`;

const Sidebar = () => (
  <nav className="flex w-60 shrink-0 flex-col gap-1 border-r border-line bg-surface p-3">
    <p className="px-3 pb-1 pt-2 font-mono text-[11px] uppercase tracking-wide text-muted">
      Portfolio sections
    </p>
    {NAV_ITEMS.map((item) => (
      <NavLink key={item.to} to={item.to} end={item.end} className={linkClasses}>
        <item.icon size={16} strokeWidth={2} />
        {item.label}
      </NavLink>
    ))}
  </nav>
);

export default Sidebar;
