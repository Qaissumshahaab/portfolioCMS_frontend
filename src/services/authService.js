import axiosInstance from "./axiosInstance";

// POST /api/auth/signup - creates a login-capable account (does not log the user in)
export const signupRequest = (payload) =>
  axiosInstance.post("/auth/signup", payload).then((res) => res.data);

// POST /api/auth/login - sets accessToken + refreshToken httpOnly cookies
export const loginRequest = (payload) =>
  axiosInstance.post("/auth/login", payload).then((res) => res.data);

// GET /api/auth/logout - clears cookies both client and server side
export const logoutRequest = () =>
  axiosInstance.get("/auth/logout").then((res) => res.data);
