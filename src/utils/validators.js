export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const isNonEmpty = (value) => Boolean(value && value.trim().length > 0);

export const validateImageFile = (file, maxSizeMb, acceptedTypes) => {
  if (!file) return null;
  if (!acceptedTypes.includes(file.type)) {
    return `Unsupported file type. Use ${acceptedTypes.map((t) => t.split("/")[1]).join(", ")}.`;
  }
  if (file.size > maxSizeMb * 1024 * 1024) {
    return `File is too large. Maximum size is ${maxSizeMb}MB.`;
  }
  return null;
};
