import { FileDown, Mail } from "lucide-react";

// Dark gradient hero band - deliberately visually distinct from the light
// content sections below it, matching a typical "portfolio site" feel.
// Static gradient only, no animation.
const HeroSection = ({ homepage, resumeUrl }) => {
  if (!homepage) return null;

  return (
    <section id="top" className="bg-gradient-to-br from-ink to-inkSoft text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-20 text-center sm:px-6 sm:py-24">
        {homepage.profilePic?.secure_url ? (
          <img
            src={homepage.profilePic.secure_url}
            alt={homepage.fullName || "Profile picture"}
            className="h-32 w-32 rounded-full border-4 border-white/10 object-cover ring-2 ring-accent ring-offset-4 ring-offset-ink"
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/10 bg-white/5 font-mono text-3xl text-white/60 ring-2 ring-accent ring-offset-4 ring-offset-ink">
            {(homepage.fullName || "?").charAt(0).toUpperCase()}
          </div>
        )}

        <div className="max-w-xl">
          <h1 className="break-words text-3xl font-semibold sm:text-4xl">{homepage.fullName}</h1>
          {homepage.title && (
            <p className="mt-2 inline-block break-words rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-white/90 sm:text-sm">
              {homepage.title}
            </p>
          )}
        </div>

        {homepage.introduction && (
          <p className="max-w-xl break-words text-sm leading-relaxed text-mutedOnDark sm:text-base">
            {homepage.introduction}
          </p>
        )}

        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accentDark"
            >
              <FileDown size={16} />
              View resume
            </a>
          )}
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-md border border-white/25 px-5 py-2.5 text-sm font-medium text-white hover:border-white/50"
          >
            <Mail size={16} />
            Contact me
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
