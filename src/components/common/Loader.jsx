import { Loader2 } from "lucide-react";

// Static (non-spinning) icon + label - no animation, but still visually clear.
const Loader = ({ label = "Loading…" }) => (
  <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted">
    <Loader2 size={16} />
    <span className="font-mono">{label}</span>
  </div>
);

export default Loader;
