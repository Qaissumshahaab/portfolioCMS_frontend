import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-paper px-4 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accentSoft text-accent">
      <Compass size={22} />
    </div>
    <span className="font-mono text-sm text-muted">404</span>
    <h1 className="text-lg font-semibold text-ink">Page not found</h1>
    <Link to="/" className="text-sm font-medium text-accent hover:underline">
      Back to home
    </Link>
  </div>
);

export default NotFoundPage;
