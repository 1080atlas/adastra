CLAUDE.md — UI Theme Implementation (Ad Astra: Archive + Leaderboard)
Goal
Apply a Red-Rising-inspired but fandom-agnostic theme: dark space UI, gold accents, restrained crimson details, elegant serif headings, optional starfield background. Keep everything accessible and lightweight.

Scope (code only)

Add design tokens and Tailwind config.

Wire up typography with next/font.

Implement starfield backgrounds (static + optional animated).

Refactor core layout/components to use the new tokens (buttons, lists, leaderboard).

0) Ground rules
Do not change data logic or routing.

Keep all colors as CSS variables in globals.css and expose them in Tailwind.

Ensure AA contrast on dark backgrounds.

Respect prefers-reduced-motion for any animation.

1) Tokens & Tailwind
1.1 globals.css — add variables + base colors
css
Copy
Edit
:root {
  --accent: #E2B64D;      /* gold */
  --accent-600: #C99A33;  /* gold hover */
  --crimson: #C23030;     /* accents, rails, badges */
  --crimson-700: #8E1F1F; /* darker crimson */
  --ink: #E6E7EB;         /* primary text */
  --muted: #9AA0B0;       /* secondary text */
  --bg: #0A0E14;          /* app background */
  --card: #0F141C;        /* card background */
  --line: #1B2330;        /* hairlines */
}

html { color-scheme: dark; }
body { color: var(--ink); background: var(--bg); }
1.2 tailwind.config.ts — extend theme
ts
Copy
Edit
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: "var(--accent)", 600: "var(--accent-600)" },
        crimson: { DEFAULT: "var(--crimson)", 700: "var(--crimson-700)" },
        ink: "var(--ink)",
        muted: "var(--muted)",
        bg: "var(--bg)",
        card: "var(--card)",
        line: "var(--line)",
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,.25)",
      },
    },
  },
  plugins: [],
};
export default config;
2) Typography with next/font
2.1 Load fonts
ts
Copy
Edit
// src/app/fonts.ts
import { Cinzel, Inter } from "next/font/google";

export const fontSerif = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
2.2 Map to Tailwind families
ts
Copy
Edit
// tailwind.config.ts (add to theme.extend)
fontFamily: {
  sans: ["var(--font-sans)", "system-ui", "sans-serif"],
  serif: ["var(--font-serif)", "Georgia", "serif"],
},
2.3 Apply in layout
tsx
Copy
Edit
// src/app/layout.tsx
import "./globals.css";
import { fontSans, fontSerif } from "./fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <body className="font-sans text-ink bg-bg">{children}</body>
    </html>
  );
}
Usage:

Headings: font-serif

Body/UI: default font-sans

3) Starfield backgrounds
3.1 Static, zero-JS starfield + subtle color wash
css
Copy
Edit
/* src/app/globals.css */
.bg-space {
  background:
    radial-gradient(1200px 800px at 70% -10%, rgba(226,182,77,.12), transparent 60%),
    radial-gradient(1000px 600px at 20% 120%, rgba(194,48,48,.08), transparent 60%),
    url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>\
<rect fill='transparent' width='160' height='160'/>\
<circle cx='8' cy='12' r='0.6' fill='white' opacity='0.55'/>\
<circle cx='90' cy='40' r='0.7' fill='white' opacity='0.6'/>\
<circle cx='140' cy='100' r='0.5' fill='white' opacity='0.45'/>\
<circle cx='30' cy='140' r='0.6' fill='white' opacity='0.5'/>\
</svg>");
  background-size: auto, auto, 320px 320px;
}
3.2 Optional gentle parallax (CSS-only)
css
Copy
Edit
/* src/app/globals.css */
.bg-stars { position: relative; overflow: hidden; }
.bg-stars::before, .bg-stars::after {
  content: ""; position: absolute; inset: 0;
  background-image:
    radial-gradient(1px 1px at 20% 30%, #fff 60%, transparent 61%),
    radial-gradient(1px 1px at 80% 60%, #fff 60%, transparent 61%),
    radial-gradient(1px 1px at 40% 80%, #fff 60%, transparent 61%);
  background-repeat: repeat; opacity: .25;
}
.bg-stars::before { background-size: 180px 180px; animation: drift 120s linear infinite; }
.bg-stars::after  { background-size: 300px 300px; animation: drift 240s linear infinite reverse; opacity: .18; }
@keyframes drift { from { background-position: 0 0 } to { background-position: 1000px 0 } }
@media (prefers-reduced-motion: reduce) { .bg-stars::before, .bg-stars::after { animation: none; } }
3.3 Apply to the main wrapper
tsx
Copy
Edit
// e.g., src/app/page.tsx and other top-level pages
export default function Page() {
  return (
    <main className="bg-space bg-stars min-h-dvh">
      {/* content */}
    </main>
  );
}
4) Layout & components refactor
4.1 Header + nav accents
Add a slim top border in crimson.

Use gold on hover/focus.

tsx
Copy
Edit
// src/components/layout/Header.tsx (or equivalent)
export function Header() {
  return (
    <header className="border-b border-line relative">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-crimson/70" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <a href="/" className="font-serif text-xl tracking-wide">Ad Astra</a>
        <nav className="flex items-center gap-6">
          <a className="text-muted hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 rounded">Fanfic</a>
          <a className="text-muted hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 rounded">Fan Art</a>
          <a className="text-muted hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 rounded">Leaderboard</a>
        </nav>
      </div>
    </header>
  );
}
4.2 Buttons (primary + ghost)
tsx
Copy
Edit
// src/components/ui/Button.tsx
const base = "inline-flex items-center gap-2 rounded-xl px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-accent/40";
export const ButtonPrimary = (p: JSX.IntrinsicElements["button"]) =>
  <button {...p} className={`${base} bg-accent text-bg hover:bg-accent-600`} />;
export const ButtonGhost = (p: JSX.IntrinsicElements["button"]) =>
  <button {...p} className={`${base} border border-line hover:border-accent/60`} />;
4.3 Prompt list row (crimson rail + status chip)
tsx
Copy
Edit
// src/components/PromptRow.tsx
export function PromptRow({ href, label, title, status }:{
  href:string; label:string; title:string; status:'UPCOMING'|'ACTIVE'|'CLOSED';
}) {
  return (
    <li className="group relative rounded-xl bg-card border border-line hover:border-accent/40 transition">
      <div className="absolute inset-y-0 left-0 w-1 rounded-l-xl bg-crimson/70" aria-hidden />
      <a href={href} className="block p-4">
        <div className="flex items-center justify-between gap-4">
          <span className="font-medium">{label} — {title}</span>
          <span className="text-[11px] uppercase tracking-wide rounded-full border px-2 py-1 text-muted border-line group-hover:border-accent/60">
            {status}
          </span>
        </div>
      </a>
    </li>
  );
}
4.4 Leaderboard row
tsx
Copy
Edit
// src/components/LeaderboardRow.tsx
export function LeaderboardRow({ rank, username, points }:{
  rank:number; username:string; points:number;
}) {
  return (
    <li className="grid grid-cols-[3rem,1fr,6rem] items-center gap-3 border-b border-line/60 p-3">
      <span className="text-muted">#{rank}</span>
      <span className="font-medium">{username}</span>
      <span className="justify-self-end text-accent font-semibold">{points} pts</span>
    </li>
  );
}
4.5 Card pattern for sections
tsx
Copy
Edit
// usage in pages
<section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
  <h2 className="font-serif text-xl mb-3">Popular Weeks</h2>
  {/* content */}
</section>
Accessibility:

Ensure every interactive element has :focus ring: focus:ring-2 focus:ring-accent/40.

External links to Reddit should include aria-label="Open Reddit thread".

5) Acceptance checklist (for this theme PR)
Tokens present and referenced via Tailwind (no hardcoded hex in components).

Serif headings + sans body rendered (verify in DevTools).

Starfield visible on pages; animation disabled when prefers-reduced-motion.

Buttons, list rows, and leaderboard reflect gold/crimson accents.

Contrast checks pass for text on --bg and --card.

6) Commit suggestion
bash
Copy
Edit
feat(ui): apply gold/crimson theme, serif headings, starfield bg; refactor buttons, lists, leaderboard
7) Regressions to avoid
Don’t change routing or data fetching.

Don’t inline images that inflate bundle size; hero art will be added separately as a file in /public.
