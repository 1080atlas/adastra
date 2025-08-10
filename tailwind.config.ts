import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: { 
          DEFAULT: "var(--accent)", 
          600: "var(--accent-600)" 
        },
        crimson: { 
          DEFAULT: "var(--crimson)", 
          700: "var(--crimson-700)" 
        },
        ink: "var(--ink)",
        muted: "var(--muted)",
        bg: "var(--bg)",
        card: "var(--card)",
        line: "var(--line)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: { 
        xl: "1rem", 
        "2xl": "1.25rem" 
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,.25)",
      },
    },
  },
  plugins: [],
}
export default config