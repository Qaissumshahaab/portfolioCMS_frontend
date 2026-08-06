import { GitBranch, ExternalLink, FolderGit2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

// A portfolio can now list several projects (each its own document).
// Cards are deliberately narrower + taller ("box-like") rather than wide
// horizontal strips - three per row on desktop, content anchored top/bottom
// so every card reads as a consistent, intentional shape regardless of how
// much text a given project has. Sits on the vibrant orange section background.
const ProjectSection = ({ projects }) => {
  const valid = (projects || []).filter((entry) => entry.project?.name);
  if (valid.length === 0) return null;

  return (
    <section id="projects" className="border-b border-line bg-portfolioTint py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="Projects" title="Things I've built" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {valid.map((entry) => {
            const project = entry.project;
            return (
              <div
                key={entry._id}
                className="flex min-h-[280px] flex-col overflow-hidden rounded-lg border border-portfolioTintBorder bg-surface shadow-card"
              >
                <div className="h-1.5 shrink-0 bg-accent" />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accentSoft text-accent">
                    <FolderGit2 size={19} />
                  </div>

                  <h3 className="mt-4 line-clamp-2 break-words text-base font-semibold leading-snug text-ink">
                    {project.name}
                  </h3>

                  {(project.githublink || project.livelink) && (
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                      {project.githublink && (
                        <a
                          href={project.githublink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                        >
                          <GitBranch size={14} />
                          GitHub
                        </a>
                      )}
                      {project.livelink && (
                        <a
                          href={project.livelink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                        >
                          <ExternalLink size={14} />
                          Live demo
                        </a>
                      )}
                    </div>
                  )}

                  <div className="flex-1" />

                  {project.technologiesused?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-4">
                      {project.technologiesused.map((tech) => (
                        <span
                          key={tech}
                          className="break-words rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-xs text-ink"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
