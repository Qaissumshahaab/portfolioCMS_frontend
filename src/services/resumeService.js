import axiosInstance from "./axiosInstance";

// POST /api/resume/uploadresume - multipart, image field is REQUIRED by the backend
// on every call (there is no "keep the old file" partial update).
export const uploadResume = (formData) =>
  axiosInstance
    .post("/resume/uploadresume", formData)
    .then((res) => res.data);

export const getMyResume = () =>
  axiosInstance.get("/resume/getresume").then((res) => res.data);

export const getResumeByPortfolioId = (portfolioid) =>
  axiosInstance.get(`/resume/getresume/${portfolioid}`).then((res) => res.data);

export const deleteResume = () =>
  axiosInstance.post("/resume/deleteresume").then((res) => res.data);
