// Root layout - only used for locale routing fallback
// The actual layout is in app/[locale]/layout.js
export const metadata = {
  title: "PirateHub",
  description: "Campus Hub for Whitworth Pirates",
};

export default function RootLayout({ children }) {
  return children;
}
