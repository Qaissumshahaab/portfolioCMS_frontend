import axiosInstance from "./axiosInstance";

export const saveAbout = (payload) =>
  axiosInstance.post("/about/createabout", payload).then((res) => res.data);

export const getMyAbout = () =>
  axiosInstance.get("/about/getabout").then((res) => res.data);

export const getAboutByPortfolioId = (portfolioid) =>
  axiosInstance.get(`/about/getabout/${portfolioid}`).then((res) => res.data);

export const deleteAbout = () =>
  axiosInstance.post("/about/deleteabout").then((res) => res.data);
