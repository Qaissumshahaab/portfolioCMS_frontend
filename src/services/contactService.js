import axiosInstance from "./axiosInstance";

export const saveContact = (payload) =>
  axiosInstance.post("/contact/createcontact", payload).then((res) => res.data);

export const getMyContact = () =>
  axiosInstance.get("/contact/getcontact").then((res) => res.data);

export const getContactByPortfolioId = (portfolioid) =>
  axiosInstance.get(`/contact/getcontact/${portfolioid}`).then((res) => res.data);

export const deleteContact = () =>
  axiosInstance.post("/contact/deletecontact").then((res) => res.data);
