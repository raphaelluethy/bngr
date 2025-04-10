/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./manage-bangs.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  darkMode: "media", // Use media queries for dark mode (respects device preferences)
  theme: {
    extend: {
      backgroundImage: {
        'linear-45': 'linear-gradient(45deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundImage: ['firefox'],
    },
  },
};