import axiosInstance from "./axiosInstance";

// NOTE: the backend uses $addToSet to update "experiencedtools" on an existing
// document - it can only ADD tools, never remove a single one. Removing tools
// individually is not supported by the API; only a full deleteExperience is.
export const saveExperience = (payload) =>
  axiosInstance.post("/experience/createexperience", payload).then((res) => res.data);

export const getMyExperience = () =>
  axiosInstance.get("/experience/getexperience").then((res) => res.data);

export const getExperienceByPortfolioId = (portfolioid) =>
  axiosInstance.get(`/experience/getexperience/${portfolioid}`).then((res) => res.data);

export const deleteExperience = () =>
  axiosInstance.post("/experience/deleteexperience").then((res) => res.data);
