import { Code2, LayoutTemplate, Server, Wrench } from "lucide-react";
import SectionHeading from "./SectionHeading";

const GROUPS = [
  { key: "languages", label: "Languages", Icon: Code2 },
  { key: "frontendFramework", label: "Frontend", Icon: LayoutTemplate },
  { key: "backendFramework", label: "Backend", Icon: Server },
  { key: "toolsandecosystem", label: "Tools", Icon: Wrench },
];

// A single cohesive panel with one row per category, rather than a grid of
// repeated icon-card boxes - reads as a deliberate "skill matrix" instead of
// a templated card grid. Sits on the vibrant orange section background.
const SkillsSection = ({ skills }) => {
  const groups = GROUPS.filter((group) => skills?.[group.key]?.length);
  if (groups.length === 0) return null;

  return (
    <section id="skills" className="border-b border-line bg-portfolioTint py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="Skills" title="What I work with" />

        <div className="overflow-hidden rounded-lg border border-portfolioTintBorder bg-surface shadow-card">
          {groups.map((group, i) => (
            <div
              key={group.key}
              className={`flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:gap-8 sm:px-8 ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <div className="flex w-full shrink-0 items-center gap-3 sm:w-44">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-portfolioAccentSoft text-portfolioAccent">
                  <group.Icon size={17} />
                </div>
                <span className="text-base font-medium text-ink">{group.label}</span>
              </div>
              <div className="flex min-w-0 flex-1 flex-wrap gap-2.5">
                {skills[group.key].map((item) => (
                  <span
                    key={item}
                    className="break-words rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-sm text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
