/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "variable-collection-bg": "var(--variable-collection-bg)",
        "variable-collection-button": "var(--variable-collection-button)",
        "variable-collection-card-1": "var(--variable-collection-card-1)",
        "variable-collection-navbar": "var(--variable-collection-navbar)",
        "variable-collection-placeholder": "var(--variable-collection-placeholder)",
        "variable-collection-success": "var(--variable-collection-success)",
      },
    },
  },
  plugins: [],
}

