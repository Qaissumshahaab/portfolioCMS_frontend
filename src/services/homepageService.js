import axiosInstance from "./axiosInstance";

// POST /api/homepage/createhomepage - multipart (fullName, title, introduction, image?)
export const saveHomepage = (formData) =>
  axiosInstance
    .post("/homepage/createhomepage", formData)
    .then((res) => res.data);

export const getMyHomepage = () =>
  axiosInstance.get("/homepage/gethomepage").then((res) => res.data);

export const getHomepageByPortfolioId = (portfolioid) =>
  axiosInstance.get(`/homepage/gethomepage/${portfolioid}`).then((res) => res.data);

export const deleteHomepage = () =>
  axiosInstance.post("/homepage/deletehomepage").then((res) => res.data);
