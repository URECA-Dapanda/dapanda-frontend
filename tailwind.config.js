/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-primary-300": "rgba(255, 156, 226, 1)",
        "bg-primary": "rgba(230, 0, 126, 1)",
        "color-text-black": "rgba(23, 23, 27, 1)",
        "color-border-secondary": "rgba(229, 231, 235, 1)",
        "color-bg-white": "rgba(255, 255, 255, 1)",
        "color-text-white": "rgba(255, 255, 255, 1)",
        "color-border-black": "rgba(23, 23, 27, 1)",
        "color-secondary-600": "rgba(70, 71, 229, 1)",
        "color-bg-black": "rgba(23, 23, 27, 1)",
        "color-primary-100": "rgba(255, 228, 247, 1)",
        "color-primary-200": "rgba(255, 201, 240, 1)",
        "color-primary-50": "rgba(255, 240, 250, 1)",
        "color-primary-400": "rgba(255, 95, 204, 1)",
        "color-primary-500": "rgba(255, 48, 180, 1)",
        "color-primary-600": "rgba(245, 13, 147, 1)",
        "color-primary-700": "rgba(230, 0, 126, 1)",
        "color-primary-800": "rgba(176, 4, 96, 1)",
        "color-bg-secondary": "rgba(220, 230, 255, 1)",
        "color-secondary-100": "rgba(220, 230, 255, 1)",
        "color-secondary-200": "rgba(199, 213, 254, 1)",
        "color-secondary-300": "rgba(165, 185, 252, 1)",
        "color-secondary-400": "rgba(129, 147, 248, 1)",
        "color-secondary-500": "rgba(99, 111, 241, 1)",
        "color-secondary-700": "rgba(58, 56, 202, 1)",
        "color-secondary-800": "rgba(48, 48, 163, 1)",
        "color-secondary-50": "rgba(238, 243, 255, 1)",
        "color-bg-ivory": "rgba(255, 232, 198, 1)",
        "color-black-22": "rgba(23, 23, 27, 0.22)",
        "color-gray-100": "rgba(245, 247, 250, 1)",
        "color-gray-200": "rgba(240, 240, 245, 1)",
        "color-gray-300": "rgba(225, 225, 235, 1)",
        "color-gray-400": "rgba(202, 204, 216, 1)",
        "color-gray-500": "rgba(173, 175, 187, 1)",
        "color-gray-600": "rgba(133, 136, 152, 1)",
        "color-gray-700": "rgba(53, 54, 63, 1)",
        "color-gray-800": "rgba(35, 37, 43, 1)",
        "color-bg-error": "rgba(237, 33, 36, 1)",
        "color-bg-warning": "rgba(254, 185, 63, 1)",
        "color-bg-success": "rgba(45, 183, 69, 1)",
        "color-bg-secondary2": "rgba(195, 212, 255, 1)",
        "color-bg-primary2": "rgba(253, 237, 246, 1)",
      },
      fontFamily: {
        // ✅ 폰트 키는 이대로 유지해도 OK
        pretendard: ["Pretendard", "sans-serif"],
        // ...
      },
      fontSize: {
        title: "32px",
        heading1: "32px",
        heading2: "24px",
        // ...
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
