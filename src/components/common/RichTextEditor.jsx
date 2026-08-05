import { useEffect, useRef } from "react";

// Deliberately built without a third-party rich-text library to keep the
// dependency list minimal (axios / react-router-dom / react-hot-toast only).
// Uses a contentEditable div + document.execCommand, which covers the basic
// formatting a blog post needs (bold, italic, headings, lists, links).
//
// `initialValue` is only applied ONCE on mount (uncontrolled pattern). A
// controlled `value` prop would reset the cursor to the start of the field
// on every keystroke, which is the classic contentEditable + React bug -
// mounting a fresh instance per blog post (see `key={editingId}` in
// BlogManager.jsx) is the reliable way to load a different post for editing.
const TOOLBAR_BUTTONS = [
  { command: "bold", label: "B", title: "Bold" },
  { command: "italic", label: "I", title: "Italic" },
  { command: "underline", label: "U", title: "Underline" },
  { command: "formatBlock", value: "H2", label: "H2", title: "Heading" },
  { command: "insertUnorderedList", label: "• List", title: "Bullet list" },
  { command: "insertOrderedList", label: "1. List", title: "Numbered list" },
];

const RichTextEditor = ({ label, initialValue = "", onChange, placeholder = "Write your post…" }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialValue || "";
    }
    // Intentionally runs once on mount only - see comment above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emitChange = () => {
    onChange(editorRef.current?.innerHTML || "");
  };

  const runCommand = (command, value) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    emitChange();
  };

  const handleLink = () => {
    const url = window.prompt("Link URL");
    if (url) runCommand("createLink", url);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-ink">{label}</label>}

      <div className="flex flex-wrap gap-1 rounded-t-md border border-b-0 border-line bg-paper p-1.5">
        {TOOLBAR_BUTTONS.map((btn) => (
          <button
            key={btn.command + (btn.value || "")}
            type="button"
            title={btn.title}
            onClick={() => runCommand(btn.command, btn.value)}
            className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-xs text-ink hover:bg-line"
          >
            {btn.label}
          </button>
        ))}
        <button
          type="button"
          title="Insert link"
          onClick={handleLink}
          className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-xs text-ink hover:bg-line"
        >
          Link
        </button>
        <button
          type="button"
          title="Clear formatting"
          onClick={() => runCommand("removeFormat")}
          className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-xs text-muted hover:bg-line"
        >
          Clear
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={emitChange}
        onBlur={emitChange}
        data-placeholder={placeholder}
        className="blog-content min-h-[220px] rounded-b-md border border-line bg-surface px-3 py-2 text-sm text-ink focus:outline-none empty:before:text-muted empty:before:content-[attr(data-placeholder)]"
      />
    </div>
  );
};

export default RichTextEditor;
