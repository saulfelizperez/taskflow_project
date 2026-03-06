module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,html}"],

  theme: {
    extend: {
      colors: {
        primary: "#2f3de0",
        background: "#ddd6d6c9",
        text: "#0a1eff",
        card: "#000000"
      },

      backgroundImage: {
        "badge-gradient":
          "linear-gradient(135deg,#6a11cb,#8e2de2)"
      },

      spacing: {
        layout: "24px"
      },

      borderRadius: {
        xl: "16px"
      }
    }
  },

  plugins: []}