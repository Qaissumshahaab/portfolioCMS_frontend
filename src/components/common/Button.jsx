// Single Button component reused everywhere so every action in the app looks
// and behaves the same way. No hover/focus transition by design - state
// changes are instant, never animated.
const VARIANT_CLASSES = {
  primary:
    "bg-accent text-white border border-accent shadow-card hover:bg-accentDark disabled:opacity-50",
  secondary:
    "bg-surface text-ink border border-line hover:bg-paper disabled:opacity-50",
  danger:
    "bg-surface text-danger border border-line hover:border-danger hover:bg-danger hover:text-white disabled:opacity-50",
  ghost:
    "bg-transparent text-ink border border-transparent hover:bg-paper disabled:opacity-50",
  onDark:
    "bg-white text-ink border border-white hover:bg-white/90 disabled:opacity-50",
  outlineOnDark:
    "bg-transparent text-white border border-white/40 hover:border-white disabled:opacity-50",
};

const Button = ({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  icon: Icon,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium disabled:cursor-not-allowed ${
        VARIANT_CLASSES[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {Icon && !loading && <Icon size={16} strokeWidth={2} />}
      {loading ? "Please wait…" : children}
    </button>
  );
};

export default Button;
