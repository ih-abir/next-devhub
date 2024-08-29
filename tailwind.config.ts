import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  plugins: [typography()],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,css,scss}",
  ],

  theme: {
    extend: {
      screens: {
        'xs': '425px',
      },

      colors: {
        primary: "#1F7A4F",
        white2: "#FFFBFE",
        black2: "#1c1c1c",
        saltpan: "#F6FAF8",
        downy: "#69D09E",
        comet: "#5E6282",
        yellow: "#ffd203",
        greenpea: "#19613F",
        lightGreen: "#8bbaa41c",
        martinique: "#3E2E4D",
        viridian: "#3A8A64",
        viridian2: "#4a947140",
      },
      
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#000",
            "--tw-prose-headings": "#000",
            "--tw-prose-links": "#000",
          },
        },
      }),
    },
  },
};
export default config;
