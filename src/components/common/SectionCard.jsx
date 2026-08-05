// Wraps every dashboard editor page in an identical card + heading block,
// with an optional icon chip for quick visual identification of the section.
const SectionCard = ({ title, description, icon: Icon, children }) => (
  <div className="rounded-lg border border-line bg-surface p-6 shadow-card sm:p-7">
    <div className="mb-6 flex items-start gap-3">
      {Icon && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accentSoft text-accent">
          <Icon size={18} strokeWidth={2} />
        </div>
      )}
      <div>
        <h2 className="text-base font-semibold text-ink">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
    </div>
    {children}
  </div>
);

export default SectionCard;
