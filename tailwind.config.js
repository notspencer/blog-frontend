// Import the daisyui plugin
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Google Font "Poppins"
      },
    },
  },
  plugins: [daisyui],
};
