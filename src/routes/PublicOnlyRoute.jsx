import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicOnlyRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // isAuthenticated === null (still checking) renders the page underneath
  // as normal - login/signup forms don't need to block on that check.
  return <Outlet />;
};

export default PublicOnlyRoute;
