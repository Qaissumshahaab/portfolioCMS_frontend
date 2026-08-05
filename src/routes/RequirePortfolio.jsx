import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";

// Every content section (homepage, about, skills, etc.) requires a portfolio
// document to exist first - the backend rejects each of those calls with
// "Create portfolio first" otherwise. This guard stops that round trip.
const RequirePortfolio = () => {
  const { portfolio, portfolioLoading } = useAuth();
  const navigate = useNavigate();

  if (portfolioLoading) {
    return <Loader label="Loading your portfolio…" />;
  }

  if (!portfolio) {
    return (
      <EmptyState
        title="Create your portfolio first"
        description="You need a portfolio before you can add this section."
        action={
          <Button onClick={() => navigate("/dashboard")}>Go to overview</Button>
        }
      />
    );
  }

  return <Outlet />;
};

export default RequirePortfolio;
