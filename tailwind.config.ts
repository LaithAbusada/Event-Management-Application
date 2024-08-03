import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        skyblue: "#4A90E2",

        white: "#FFFFFF",

        darkgray: "#333333",
        darkpurple: "#0d0733",
        purple: " #5812c3",
      },
    },
  },
  plugins: [],
};
export default config;
