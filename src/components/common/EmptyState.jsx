import { Inbox } from "lucide-react";

// Reusable empty/blank-state block: explains what's missing and what to do about it.
const EmptyState = ({ title, description, action }) => (
  <div className="flex flex-col items-center rounded-md border border-dashed border-line bg-paper px-6 py-12 text-center">
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accentSoft text-accent">
      <Inbox size={18} />
    </div>
    <p className="text-sm font-semibold text-ink">{title}</p>
    {description && <p className="mt-1 max-w-xs text-sm text-muted">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export default EmptyState;
