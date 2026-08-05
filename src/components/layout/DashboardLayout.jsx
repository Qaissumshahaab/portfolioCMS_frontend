import { Link, Outlet } from "react-router-dom";
import { ExternalLink, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "./Sidebar";
import Button from "../common/Button";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const { logout, portfolio } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out");
    } catch {
      // logout() already clears local state even if the network call fails
      toast.success("Logged out");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-line bg-surface px-6 py-3.5">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-xs font-semibold text-white">
            P
          </span>
          <span className="font-mono text-sm font-semibold text-ink">portfolioCMS</span>
        </Link>
        <div className="flex items-center gap-2">
          {portfolio && (
            <a
              href={`/portfolio/${portfolio.userid}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-line px-3 py-2 text-sm text-ink hover:bg-paper"
            >
              View public portfolio
              <ExternalLink size={14} />
            </a>
          )}
          <Button variant="secondary" onClick={handleLogout} icon={LogOut}>
            Log out
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-paper p-6 sm:p-8">
          <div className="mx-auto max-w-3xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
