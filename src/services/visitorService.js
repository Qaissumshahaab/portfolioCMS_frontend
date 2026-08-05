import axiosInstance from "./axiosInstance";

// GET /api/visitors/visit/:portfolioid - public, fire-and-forget visitor tracking.
// Call exactly once per portfolio page load (see PortfolioView.jsx guard).
export const recordVisit = (portfolioid) =>
  axiosInstance.get(`/visitors/visit/${portfolioid}`).then((res) => res.data);
