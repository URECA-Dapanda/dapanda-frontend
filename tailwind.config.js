/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/global.css",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      colors: {
        white: "#ffffff",
        black: "#17171b",

        "black-22": "rgba(23, 23, 27, 0.22)",
        "black-60": "rgba(23, 23, 27, 0.6)",

        primary: "#e6007e",
        primary2: "#fdedf6",
        "primary-50": "#fff0fa",
        "primary-100": "#ffe4f7",
        "primary-200": "#ffc9f0",
        "primary-300": "#ff9ce2",
        "primary-400": "#ff5fcc",
        "primary-500": "#ff30b4",
        "primary-600": "#f50d93",
        "primary-700": "#e6007e",
        "primary-800": "#b00460",

        secondary: "#dce6ff",
        secondary2: "#c3d4ff",
        "secondary-50": "#eef3ff",
        "secondary-100": "#dce6ff",
        "secondary-200": "#c7d5fe",
        "secondary-300": "#a5b9fc",
        "secondary-400": "#8193f8",
        "secondary-500": "#636ff1",
        "secondary-600": "#4647e5",
        "secondary-700": "#3a38ca",
        "secondary-800": "#3030a3",

        "gray-100": "#f5f7fa",
        "gray-200": "#f0f0f5",
        "gray-300": "#e1e1eb",
        "gray-400": "#cacdd8",
        "gray-500": "#adafbb",
        "gray-600": "#858898",
        "gray-700": "#35363f",
        "gray-800": "#23252b",

        error: "#ed2124",
        warning: "#feb93f",
        success: "#2db745",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        title: "32px",
        heading1: "32px",
        heading2: "24px",
      },
      borderRadius: {
        6: "6px",
        10: "10px",
        12: "12px",
        20: "20px",
        30: "30px",
        50: "50px",
        circle: "999px",
      },
      borderWidth: {
        1: "1px",
        2: "2px",
        4: "4px",
        6: "6px",
      },
      spacing: {
        0: "0px",
        2: "2px",
        4: "4px",
        6: "6px",
        8: "8px",
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
        28: "28px",
        30: "30px",
        32: "32px",
        36: "36px",
        40: "40px",
        44: "44px",
        48: "48px",
        52: "52px",
        56: "56px",
        60: "60px",
        64: "64px",
        68: "68px",
        76: "76px",
        80: "80px",
        84: "84px",
        96: "96px",
        108: "108px",
        120: "120px",
        144: "144px",
        152: "152px",
        180: "180px",
        200: "200px",
      },
      boxShadow: {
        nav: "0px -4px 8px 0px rgba(0, 0, 0, 0.05)",
        header: "0px 4px 8px 0px rgba(0, 0, 0, 0.05)",
        default: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        material: "0px 20px 35px 0px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const newUtilities = {
        ".title-lg": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "24px",
          fontWeight: "600",
        },
        ".title-md": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "20px",
          fontWeight: "600",
        },
        ".title-sm": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "16px",
          fontWeight: "600",
        },
        ".title-xs": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "14px",
          fontWeight: "600",
        },
        ".h1": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "32px",
          fontWeight: "700",
        },
        ".h2": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "24px",
          fontWeight: "700",
        },
        ".h3": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "20px",
          fontWeight: "700",
        },
        ".body-lg": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "20px",
          fontWeight: "500",
        },
        ".body-md": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "16px",
          fontWeight: "500",
        },
        ".body-sm": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "14px",
          fontWeight: "500",
        },
        ".body-xs": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "12px",
          fontWeight: "500",
        },
        ".body-xxs": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "10px",
          fontWeight: "500",
        },
        ".caption-lg": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "12px",
          fontWeight: "300",
        },
        ".caption-md": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "10px",
          fontWeight: "300",
        },
        ".caption-sm": {
          fontFamily: theme("fontFamily.pretendard").join(", "),
          fontSize: "8px",
          fontWeight: "300",
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    }),
  ],
};
