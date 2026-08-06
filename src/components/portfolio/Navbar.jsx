import { useState } from "react";
import { Menu, X, FileDown } from "lucide-react";

// Section anchor navigation for the single-page public portfolio template.
// Uses plain #anchors + native jump (no smooth-scroll) - deliberately no
// animation, per product requirement.
const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const Navbar = ({ name, resumeUrl, visibleLinks }) => {
  const [open, setOpen] = useState(false);
  const links = LINKS.filter((link) => visibleLinks?.includes(link.href.slice(1)));

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <a href="#top" className="min-w-0 flex-1 truncate font-mono text-sm font-semibold sm:flex-none">
          {name || "Portfolio"}
        </a>

        <nav className="hidden min-w-0 items-center gap-6 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="shrink-0 text-sm text-mutedOnDark hover:text-white">
              {link.label}
            </a>
          ))}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex shrink-0 items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accentDark"
            >
              <FileDown size={14} />
              Resume
            </a>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="shrink-0 text-white md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-4 pb-4 pt-2 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-mutedOnDark hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 flex w-fit items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white"
            >
              <FileDown size={14} />
              Resume
            </a>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
