// Shared full-page state for the public portfolio route when there's
// nothing (yet) to show - keeps a "broken half-empty page" from ever
// happening, whether the portfolio doesn't exist or simply has no content.
const PortfolioMessageScreen = ({ icon: Icon, title, description }) => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-ink to-inkSoft px-4 text-center text-white">
    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-accent">
      <Icon size={24} />
    </div>
    <div className="max-w-sm">
      <h1 className="text-lg font-semibold">{title}</h1>
      {description && <p className="mt-2 text-sm text-mutedOnDark">{description}</p>}
    </div>
  </div>
);

export default PortfolioMessageScreen;
