/** Tailwind config - richer palette than a bare default, still zero custom
 * animation utilities (the product requires a motion-free UI). */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#15171C", // primary text / dark hero background base
        inkSoft: "#2A2D37", // secondary dark shade (hero gradient end, footer)
        paper: "#F7F7F5", // page background
        surface: "#FFFFFF", // card background
        line: "#E4E2DD", // hairline borders
        muted: "#6B7076", // secondary text
        mutedOnDark: "#B5B8C4", // secondary text on dark hero/footer
        accent: "#4A47E0", // single accent color (buttons, links, focus)
        accentDark: "#3835B8",
        accentSoft: "#EEEDFC", // light accent tint for badges/icon chips
        danger: "#C0311D",
        success: "#1E7B4D",

        portfolioTint: "#FDBA74", // vibrant orange section background
        portfolioTintBorder: "#F0873A",
        portfolioAccent: "#C2410C", // deep vibrant orange for small accents (icons/badges) on white cards
        portfolioAccentSoft: "#FFEAD5", // light warm orange tint for icon chips on white cards
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,20,30,0.04), 0 1px 8px rgba(20,20,30,0.04)",
        raised: "0 2px 4px rgba(20,20,30,0.06), 0 8px 24px rgba(20,20,30,0.08)",
      },
    },
  },
  plugins: [],
};
