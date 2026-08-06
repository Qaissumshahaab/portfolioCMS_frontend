import SectionHeading from "./SectionHeading";

const ExperienceSection = ({ experience }) => {
  if (!experience?.myexperience && !experience?.experiencedtools?.length) return null;

  return (
    <section id="experience" className="border-b border-line bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />

        {experience.myexperience && (
          <div className="rounded-lg border border-line border-l-4 border-l-accent bg-paper p-6 sm:p-8">
            <p className="max-w-3xl whitespace-pre-line break-words text-sm leading-relaxed text-ink sm:text-base">
              {experience.myexperience}
            </p>
          </div>
        )}

        {experience.experiencedtools?.length > 0 && (
          <div className={experience.myexperience ? "mt-6" : ""}>
            <p className="font-mono text-xs uppercase tracking-wide text-muted">Tools &amp; technologies</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {experience.experiencedtools.map((tool) => (
                <span
                  key={tool}
                  className="break-words rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-xs text-ink"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
