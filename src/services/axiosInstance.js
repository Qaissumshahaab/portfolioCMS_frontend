import axios from "axios";

// Single axios instance used by every service file in the app.
// withCredentials is required because the backend uses httpOnly cookies
// (accessToken / refreshToken) instead of returning tokens in the response body.
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Requests whose own 401 should NOT trigger a refresh attempt
// (refreshing on these would either loop forever or make no sense).
const NO_REFRESH_URLS = ["/auth/refresh-token", "/auth/login", "/auth/signup"];

const isNoRefreshUrl = (url = "") => NO_REFRESH_URLS.some((u) => url.includes(u));

// Only one refresh-token request is allowed to be "in flight" at a time.
// If 5 protected requests all get 401 at once, they all await this same
// promise instead of firing 5 parallel refresh calls (this exact race
// condition is called out in the backend middleware comments).
let refreshingPromise = null;

// AuthContext registers this callback so this plain module can tell the
// React tree "the session is really over" without importing React state.
let onSessionExpired = () => {};
export const registerSessionExpiredHandler = (handler) => {
  onSessionExpired = handler;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Network error / no response at all - nothing to retry.
    if (!originalRequest || !status) {
      return Promise.reject(error);
    }

    const shouldAttemptRefresh =
      status === 401 && !originalRequest._retry && !isNoRefreshUrl(originalRequest.url || "");

    if (!shouldAttemptRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshingPromise) {
        refreshingPromise = axiosInstance
          .get("/auth/refresh-token")
          .finally(() => {
            refreshingPromise = null;
          });
      }
      await refreshingPromise;
      // Refresh succeeded, cookies are updated - safe to replay the original call.
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // Refresh token is missing/expired/invalid - the session is truly over.
      onSessionExpired();
      return Promise.reject(refreshError);
    }
  },
);

export default axiosInstance;
