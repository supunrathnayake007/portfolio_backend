/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "480px", // min-width
        xxxs: "300px",
      },
      width: {
        "1/8": "12.5%",
        "3/8": "37.5%",
        "5/8": "62.5%",
        // Add more custom width percentages as needed
      },
    },
  },
  plugins: [],
  corePlugins: {
    fractionalWidths: true,
  },
};
