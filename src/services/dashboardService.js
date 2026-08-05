import axiosInstance from "./axiosInstance";

// GET /api/dashboard/getanalytics - visitor analytics for the signed-in user's portfolio
export const getAnalytics = () =>
  axiosInstance.get("/dashboard/getanalytics").then((res) => res.data);
