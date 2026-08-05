import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImageIcon, X } from "lucide-react";
import { validateImageFile } from "../../utils/validators";
import { MAX_IMAGE_SIZE_MB, ACCEPTED_IMAGE_TYPES } from "../../utils/constants";

// Handles selecting + previewing a single image file efficiently:
// - validates type/size client-side before ever touching the network
// - shows a local object-URL preview (revoked on change/unmount to avoid leaks)
// - falls back to the existing remote image (currentUrl) when nothing new is picked
const ImageUploader = ({
  label,
  currentUrl,
  onFileSelect,
  maxSizeMb = MAX_IMAGE_SIZE_MB,
  acceptedTypes = ACCEPTED_IMAGE_TYPES,
  helpText = "JPG, PNG or WEBP, up to 5MB.",
  rounded = "rounded-md",
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImageFile(file, maxSizeMb, acceptedTypes);
    if (error) {
      toast.error(error);
      e.target.value = "";
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    onFileSelect(file);
  };

  const handleClear = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const displayUrl = previewUrl || currentUrl;

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-ink">{label}</label>}
      <div className="flex items-center gap-4">
        <div
          className={`flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border border-line bg-paper ${rounded}`}
        >
          {displayUrl ? (
            <img src={displayUrl} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon size={22} className="text-muted/60" />
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <input
            ref={inputRef}
            type="file"
            accept={acceptedTypes.join(",")}
            onChange={handleChange}
            className="text-sm text-ink file:mr-3 file:rounded-md file:border file:border-line file:bg-paper file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-ink hover:file:bg-line"
          />
          <span className="text-xs text-muted">{helpText}</span>
          {previewUrl && (
            <button
              type="button"
              onClick={handleClear}
              className="flex w-fit items-center gap-1 text-xs text-danger"
            >
              <X size={12} />
              Remove selected file
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
