import { useState } from "react";
import { Plus, X } from "lucide-react";

// Used for every string-array field in the backend: skills.languages,
// experience.experiencedtools, project.technologiesused, blog.tags.
//
// `existingTags` are tags already saved on the server. When `existingTags`
// is provided they render as read-only chips, because several of these
// fields use $addToSet on the backend and can only grow, never shrink via
// this form (see the matching service file comments). `value`/`onChange`
// control only the NEW tags being staged for submission.
const TagInput = ({ label, value, onChange, existingTags = [], placeholder = "Type and press Enter" }) => {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const cleaned = draft.trim();
    if (!cleaned) return;
    if (value.includes(cleaned) || existingTags.includes(cleaned)) {
      setDraft("");
      return;
    }
    onChange([...value, cleaned]);
    setDraft("");
  };

  const removeTag = (tag) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-ink">{label}</label>}

      {existingTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {existingTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-xs text-muted"
              title="Already saved - remove all via 'Clear section' below"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:border-accent"
        />
        <button
          type="button"
          onClick={addTag}
          className="flex items-center gap-1 rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink hover:bg-line"
        >
          <Plus size={14} />
          Add
        </button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 rounded-full border border-accent bg-accentSoft px-2.5 py-1 font-mono text-xs text-accentDark"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag}`}
                className="text-accentDark hover:text-danger"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
