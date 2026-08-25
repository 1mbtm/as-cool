/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        hand: ['"Caveat"', "cursive"],
        marker: ['"Permanent Marker"', "cursive"],
        type: ['"Special Elite"', "monospace"],
        body: ['"Nunito"', "system-ui", "sans-serif"],
      },
      colors: {
        // Warm scrapbook palette
        paper: "#f6edda",
        cream: "#fbf6e9",
        kraft: "#d8bd93",
        kraftdark: "#a9834b",
        ink: "#3b3122",
        tape: "#ecdca6",
        washi: "#d98b7b",
        teal: "#6f9e94",
        mustard: "#e0a458",
        faded: "#c65b4e",
      },
      boxShadow: {
        polaroid: "0 12px 30px -14px rgba(59,49,34,0.55)",
        note: "0 8px 20px -12px rgba(59,49,34,0.5)",
      },
      rotate: {
        "1.5": "1.5deg",
        "2.5": "2.5deg",
      },
    },
  },
  plugins: [],
};
