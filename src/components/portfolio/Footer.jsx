import { GitBranch, Briefcase, Terminal, Camera, Share2 } from "lucide-react";

const SOCIAL_ICON_MAP = [
  { key: "githublink", label: "GitHub", Icon: GitBranch },
  { key: "linkdinlink", label: "LinkedIn", Icon: Briefcase },
  { key: "leetcodelink", label: "LeetCode", Icon: Terminal },
  { key: "instagramlink", label: "Instagram", Icon: Camera },
  { key: "facebooklink", label: "Facebook", Icon: Share2 },
];

const Footer = ({ name, socialLinks }) => {
  const active = SOCIAL_ICON_MAP.filter((item) => socialLinks?.[item.key]);

  return (
    <footer className="border-t border-white/10 bg-ink text-mutedOnDark">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
        {active.length > 0 && (
          <div className="flex gap-3">
            {active.map(({ key, label, Icon }) => (
              <a
                key={key}
                href={socialLinks[key]}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-mutedOnDark hover:border-white/40 hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        )}
        <p className="max-w-md break-words px-4 text-xs">
          {name ? `© ${new Date().getFullYear()} ${name}` : `© ${new Date().getFullYear()}`} · Built with PortfolioCMS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
