import SectionHeading from "./SectionHeading";

const FACTS = [
  { key: "background", label: "Background" },
  { key: "careerGoals", label: "Career goals" },
  { key: "whatIenjoybuilding", label: "What I enjoy building" },
];

// Biography reads as a featured lead paragraph (accent left-border block);
// the remaining fields sit below as a compact, labelled facts row - avoids
// four identical icon-card boxes competing for attention.
const AboutSection = ({ about }) => {
  const facts = FACTS.filter((field) => about?.[field.key]);
  if (!about?.biography && facts.length === 0) return null;

  return (
    <section id="about" className="border-b border-line bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="About" title="Get to know me" />

        {about.biography && (
          <div className="mb-8 rounded-lg border border-line border-l-4 border-l-accent bg-paper p-6 sm:p-8">
            <p className="max-w-3xl whitespace-pre-line break-words text-base leading-relaxed text-ink sm:text-lg">
              {about.biography}
            </p>
          </div>
        )}

        {facts.length > 0 && (
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap">
            {facts.map((field, i) => (
              <div
                key={field.key}
                className={`min-w-0 sm:flex-1 sm:basis-56 ${i > 0 ? "sm:border-l sm:border-line sm:pl-6" : ""}`}
              >
                <p className="font-mono text-xs uppercase tracking-wide text-muted">{field.label}</p>
                <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed text-muted">
                  {about[field.key]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
