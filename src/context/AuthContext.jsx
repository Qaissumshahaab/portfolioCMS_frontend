import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { loginRequest, logoutRequest, signupRequest } from "../services/authService";
import { getMyPortfolio, createPortfolio as createPortfolioRequest } from "../services/portfolioService";
import { registerSessionExpiredHandler } from "../services/axiosInstance";

// This context intentionally owns BOTH "is the user logged in" and "what is
// their portfolio" state. The backend has no dedicated "/me" endpoint, so the
// only reliable way to know a session is valid is to call a protected route -
// getMyPortfolio() is that route, and it happens to also be the data the rest
// of the dashboard needs. Reusing it avoids firing two requests on every load.
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // null = still checking, true/false = known
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [portfolioLoading, setPortfolioLoading] = useState(true);

  const refreshPortfolio = useCallback(async () => {
    setPortfolioLoading(true);
    try {
      const result = await getMyPortfolio();
      setIsAuthenticated(true);
      setPortfolio(result.data ?? null);
    } catch (error) {
      setIsAuthenticated(false);
      setPortfolio(null);
    } finally {
      setPortfolioLoading(false);
    }
  }, []);

  // Runs once on app load: this single call both verifies the session
  // (via the axios refresh-token interceptor if the access token is stale)
  // and hydrates portfolio state for the dashboard.
  useEffect(() => {
    refreshPortfolio();
  }, [refreshPortfolio]);

  // Wired to axiosInstance so a failed silent-refresh anywhere in the app
  // immediately reflects as "logged out" in the UI.
  useEffect(() => {
    registerSessionExpiredHandler(() => {
      setIsAuthenticated(false);
      setPortfolio(null);
      setPortfolioLoading(false);
    });
  }, []);

  const signup = async (payload) => {
    const result = await signupRequest(payload);
    return result;
  };

  const login = async (payload) => {
    const result = await loginRequest(payload);
    // Login response carries no user/portfolio data, so re-check right after.
    await refreshPortfolio();
    return result;
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      setIsAuthenticated(false);
      setPortfolio(null);
    }
  };

  const createPortfolio = async () => {
    const result = await createPortfolioRequest();
    await refreshPortfolio();
    return result;
  };

  const value = {
    isAuthenticated,
    portfolio,
    portfolioLoading,
    signup,
    login,
    logout,
    createPortfolio,
    refreshPortfolio,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
