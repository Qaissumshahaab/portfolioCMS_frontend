import axiosInstance from "./axiosInstance";

// POST /api/portfolio/createportfolio - one portfolio per signed-up user
export const createPortfolio = () =>
  axiosInstance.post("/portfolio/createportfolio").then((res) => res.data);

// GET /api/portfolio/getportfolio - portfolio of the signed-in user (also doubles
// as the "am I logged in" check on app load, see AuthContext)
export const getMyPortfolio = () =>
  axiosInstance.get("/portfolio/getportfolio").then((res) => res.data);

// GET /api/portfolio/getportfolio/:userid - public, used by the public portfolio page
export const getPortfolioByUserId = (userid) =>
  axiosInstance.get(`/portfolio/getportfolio/${userid}`).then((res) => res.data);
