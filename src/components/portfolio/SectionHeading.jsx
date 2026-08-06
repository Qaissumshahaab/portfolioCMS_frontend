// Shared heading block for every content section on the public portfolio.
const SectionHeading = ({ eyebrow, title }) => (
  <div className="mb-10">
    <p className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">{eyebrow}</p>
    <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
  </div>
);

export default SectionHeading;
