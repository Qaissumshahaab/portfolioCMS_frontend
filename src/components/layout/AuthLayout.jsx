import { Link } from "react-router-dom";
import { LayoutTemplate, Sparkles, ShieldCheck } from "lucide-react";

const POINTS = [
  { Icon: LayoutTemplate, text: "One clean, professional portfolio template" },
  { Icon: Sparkles, text: "Homepage, projects, blog, resume - all covered" },
  { Icon: ShieldCheck, text: "A private dashboard just for your content" },
];

// Shared frame for the signup/login pages: a dark brand panel on desktop,
// the form card on the right (full-width alone on mobile).
const AuthLayout = ({ children }) => (
  <div className="flex min-h-screen bg-paper">
    <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-ink to-inkSoft p-10 text-white lg:flex">
      <Link to="/" className="flex items-center gap-2 font-mono text-sm font-semibold">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs">P</span>
        portfolioCMS
      </Link>

      <div>
        <h2 className="text-2xl font-semibold">Build a portfolio you're proud to share.</h2>
        <ul className="mt-6 flex flex-col gap-4">
          {POINTS.map((point) => (
            <li key={point.text} className="flex items-center gap-3 text-sm text-mutedOnDark">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/10 text-accent">
                <point.Icon size={16} />
              </span>
              {point.text}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-mutedOnDark">© {new Date().getFullYear()} portfolioCMS</p>
    </div>

    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-lg border border-line bg-surface p-7 shadow-card">{children}</div>
    </div>
  </div>
);

export default AuthLayout;
