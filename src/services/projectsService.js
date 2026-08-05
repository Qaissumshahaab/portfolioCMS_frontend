import axiosInstance from "./axiosInstance";

// A portfolio can now hold MANY projects - each is its own document,
// created/updated/deleted by its own _id (matches the updated backend).
export const createProject = (payload) =>
  axiosInstance.post("/projects/createproject", payload).then((res) => res.data);

export const updateProject = (projectid, payload) =>
  axiosInstance.post("/projects/updateproject", { projectid, ...payload }).then((res) => res.data);

export const getMyProjects = () =>
  axiosInstance.get("/projects/getprojects").then((res) => res.data);

export const getProjectsByPortfolioId = (portfolioid) =>
  axiosInstance.get(`/projects/getprojects/${portfolioid}`).then((res) => res.data);

export const deleteProject = (projectid) =>
  axiosInstance.post("/projects/deleteproject", { projectid }).then((res) => res.data);
