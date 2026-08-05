// Centralised limits so multer/cloudinary upload failures never surprise the user.
export const MAX_IMAGE_SIZE_MB = 5;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const MAX_RESUME_SIZE_MB = 5;
// Backend stores the resume as an "image" upload (no dedicated PDF route),
// so the resume must be an image file (e.g. a scanned/exported resume page).
export const ACCEPTED_RESUME_TYPES = ["image/jpeg", "image/png", "image/webp"];
