import axiosInstance from "./axiosInstance";

export const saveSocialLinks = (payload) =>
  axiosInstance.post("/social/createsociallinks", payload).then((res) => res.data);

export const getMySocialLinks = () =>
  axiosInstance.get("/social/getsociallinks").then((res) => res.data);

export const getSocialLinksByPortfolioId = (portfolioid) =>
  axiosInstance.get(`/social/getsociallinks/${portfolioid}`).then((res) => res.data);

export const deleteSocialLinks = () =>
  axiosInstance.post("/social/deletesociallinks").then((res) => res.data);
