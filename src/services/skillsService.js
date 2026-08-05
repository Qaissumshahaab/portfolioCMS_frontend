import axiosInstance from "./axiosInstance";

// NOTE: same $addToSet behaviour as experience - once skills exist, new calls
// only ever ADD tags to each category. Use deleteSkills to start over.
export const saveSkills = (payload) =>
  axiosInstance.post("/skills/addskills", payload).then((res) => res.data);

export const getMySkills = () =>
  axiosInstance.get("/skills/getskills").then((res) => res.data);

export const getSkillsByPortfolioId = (portfolioid) =>
  axiosInstance.get(`/skills/getskills/${portfolioid}`).then((res) => res.data);

export const deleteSkills = () =>
  axiosInstance.post("/skills/deleteskills").then((res) => res.data);
