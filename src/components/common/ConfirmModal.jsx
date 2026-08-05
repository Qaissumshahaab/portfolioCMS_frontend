import { AlertTriangle } from "lucide-react";
import Button from "./Button";

// Minimal confirm dialog for destructive actions (delete section, clear tags, etc).
// No backdrop blur / animation - just a plain overlay.
const ConfirmModal = ({ open, title, description, confirmLabel = "Delete", onConfirm, onCancel, loading }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
      <div className="w-full max-w-sm rounded-lg border border-line bg-surface p-5 shadow-raised">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-danger/10 text-danger">
            <AlertTriangle size={18} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink">{title}</h3>
            {description && <p className="mt-1 text-sm text-muted">{description}</p>}
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
