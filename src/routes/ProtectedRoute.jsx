import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/common/Loader";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // Still verifying the session on first load (calling getMyPortfolio()).
  if (isAuthenticated === null) {
    return <Loader label="Checking your session…" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
