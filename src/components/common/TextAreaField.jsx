const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  rows = 5,
  error = "",
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-ink">
          {label} {required && <span className="text-accent">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`resize-y rounded-md border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:border-accent ${
          error ? "border-danger" : "border-line"
        }`}
      />
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
};

export default TextAreaField;
