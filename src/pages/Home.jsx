import { Link } from "react-router-dom";
import { ArrowRight, LayoutTemplate, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Marketing/entry page for the CMS itself (not a user's portfolio page).
const FEATURES = [
  {
    Icon: LayoutTemplate,
    title: "One clean template",
    description: "A single, professional portfolio layout - fill it in, no design decisions to make.",
  },
  {
    Icon: Sparkles,
    title: "Every section covered",
    description: "Homepage, about, skills, experience, projects, blog, resume, social links and contact.",
  },
  {
    Icon: ShieldCheck,
    title: "Your own private dashboard",
    description: "Sign up once and manage your entire portfolio from a protected dashboard.",
  },
];

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <span className="flex items-center gap-2 font-mono text-sm font-semibold text-ink">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs text-white">P</span>
            portfolioCMS
          </span>
          <nav className="flex items-center gap-4 text-sm">
            {isAuthenticated ? (
              <Link to="/dashboard" className="rounded-md bg-accent px-4 py-2 font-medium text-white hover:bg-accentDark">
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-ink hover:text-accent">
                  Log in
                </Link>
                <Link to="/signup" className="rounded-md bg-accent px-4 py-2 font-medium text-white hover:bg-accentDark">
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-br from-ink to-inkSoft py-24 text-center text-white">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-wide text-accent">Portfolio CMS</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
              One account. One portfolio. No layout decisions.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-mutedOnDark sm:text-base">
              Sign up, fill in your homepage, about, experience, skills, projects and
              blog, and get a single shareable portfolio page - hosted at a link tied
              to your account.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/signup"
                className="flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accentDark"
              >
                Create your portfolio
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="rounded-md border border-white/25 px-5 py-2.5 text-sm font-medium text-white hover:border-white/50"
              >
                I already have an account
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto grid max-w-5xl gap-5 px-4 sm:grid-cols-3 sm:px-6">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="rounded-lg border border-line bg-surface p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accentSoft text-accent">
                  <feature.Icon size={18} />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-ink">{feature.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
