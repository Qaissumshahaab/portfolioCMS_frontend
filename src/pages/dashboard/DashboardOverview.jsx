import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Users, Fingerprint, Globe2, Rocket, Copy } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getAnalytics } from "../../services/dashboardService";
import SectionCard from "../../components/common/SectionCard";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { getErrorMessage } from "../../utils/getErrorMessage";

const DashboardOverview = () => {
  const { portfolio, portfolioLoading, createPortfolio } = useAuth();
  const [creating, setCreating] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    if (!portfolio) return;

    let isMounted = true;
    setAnalyticsLoading(true);

    getAnalytics()
      .then((result) => {
        if (isMounted) setAnalytics(result.analytics);
      })
      .catch((error) => {
        if (isMounted) toast.error(getErrorMessage(error, "Could not load analytics."));
      })
      .finally(() => {
        if (isMounted) setAnalyticsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [portfolio]);

  const handleCreatePortfolio = async () => {
    setCreating(true);
    try {
      const result = await createPortfolio();
      if (result.success) {
        toast.success("Portfolio created. Start filling in your sections.");
      } else {
        toast.error(result.message || "Could not create portfolio.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not create portfolio."));
    } finally {
      setCreating(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/portfolio/${portfolio.userid}`);
    toast.success("Link copied.");
  };

  if (portfolioLoading) {
    return <Loader label="Loading your portfolio…" />;
  }

  if (!portfolio) {
    return (
      <SectionCard
        title="Create your portfolio"
        description="You get one portfolio tied to your account. Create it once, then fill in each section from the sidebar."
        icon={Rocket}
      >
        <Button onClick={handleCreatePortfolio} loading={creating} icon={Rocket}>
          Create portfolio
        </Button>
      </SectionCard>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Your portfolio link" description="Share this link - it stays the same for your account." icon={Globe2}>
        <div className="flex items-center justify-between gap-3 rounded-md border border-line bg-paper px-4 py-3">
          <a
            href={`/portfolio/${portfolio.userid}`}
            target="_blank"
            rel="noreferrer"
            className="truncate font-mono text-sm text-accent hover:underline"
          >
            {window.location.origin}/portfolio/{portfolio.userid}
          </a>
          <button
            type="button"
            onClick={copyLink}
            className="flex shrink-0 items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs font-medium text-ink hover:bg-line"
          >
            <Copy size={13} />
            Copy
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Visitor analytics" description="Updates as people view your public portfolio." icon={Users}>
        {analyticsLoading ? (
          <Loader label="Loading analytics…" />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Stat icon={Users} label="Total visits" value={analytics?.totalVisitors ?? 0} />
            <Stat icon={Fingerprint} label="Unique visitors" value={analytics?.uniqueVisitors ?? 0} />
            <Stat icon={Globe2} label="Top country" value={analytics?.topCountry || "—"} />
          </div>
        )}
      </SectionCard>
    </div>
  );
};

const Stat = ({ icon: Icon, label, value }) => (
  <div className="rounded-md border border-line bg-paper p-4">
    <div className="flex items-center gap-2 text-muted">
      <Icon size={15} />
      <p className="text-xs">{label}</p>
    </div>
    <p className="mt-2 font-mono text-xl font-semibold text-ink">{value}</p>
  </div>
);

export default DashboardOverview;
