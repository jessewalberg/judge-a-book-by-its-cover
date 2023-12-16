import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "var(--primary-blue)",
        "primary-pink": "var(--primary-pink)",
        "primary-off-white": "var(--primary-off-white)",
        "primary-orange": "var(--primary-orange)",
        "primary-brown": "var(--primary-brown)",
        "primary-off-white-hero": "var(--primary-off-white-hero)",
      },
      backgroundImage: {
        "hero-pattern": "url('/book-hero.png')",
      },
      backgroundColor: {
        "primary-off-white-90-percent": "var(--primary-off-white-hero)",
      },
    },
  },
  plugins: [],
};
export default config;
