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
        white: "#EFEFF1",
        purple: "#BF94FF",
        black: "#18181B",
        purply: "#5d13cb",
        grey: "#A2A2AC",
      },
    },
  },
  plugins: [],
};
export default config;
