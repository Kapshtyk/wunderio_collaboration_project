const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./{components,lib,pages,stories,styles,ui}/**/*"],
  theme: {
    boxShadow: {
      xs: "0px 1px 2px 0px rgba(17, 24, 39, 0.05)",
      sm: "0px 1px 2px 0px rgba(17, 24, 39, 0.06), 0px 1px 3px 0px rgba(17, 24, 39, 0.10);",
      md: "0px 2px 4px -2px rgba(17, 24, 39, 0.06), 0px 4px 8px -2px rgba(17, 24, 39, 0.10);",
      lg: "0px 4px 6px -2px rgba(17, 24, 39, 0.05), 0px 12px 16px -4px rgba(17, 24, 39, 0.10);",
      xl: "0px 8px 8px -4px rgba(17, 24, 39, 0.04), 0px 20px 24px -4px rgba(17, 24, 39, 0.10);",
      "2xl": "0px 24px 48px -12px rgba(17, 24, 39, 0.25);",
    },
    colors: {
      "accent-color": "rgb(var(--accent-color))",
      main: "rgb(var(--main-color) / <alpha-value>)",
      background: "rgb(var(--background) / <alpha-value>)",
      foreground: "rgb(var(--foreground) / <alpha-value>)",
      primary: {
        50: "rgb(var(--primary-50) / <alpha-value>)",
        100: "rgb(var(--primary-100) / <alpha-value>)",
        200: "rgb(var(--primary-200) / <alpha-value>)",
        300: "rgb(var(--primary-300) / <alpha-value>)",
        400: "rgb(var(--primary-400) / <alpha-value>)",
        500: "rgb(var(--primary-500) / <alpha-value>)",
        600: "rgb(var(--primary-600) / <alpha-value>)",
        700: "rgb(var(--primary-700) / <alpha-value>)",
        800: "rgb(var(--primary-800) / <alpha-value>)",
        900: "rgb(var(--primary-900) / <alpha-value>)",
      },
      secondary: {
        50: "rgb(var(--secondary-50) / <alpha-value>)",
        100: "rgb(var(--secondary-100) / <alpha-value>)",
        200: "rgb(var(--secondary-200) / <alpha-value>)",
        300: "rgb(var(--secondary-300) / <alpha-value>)",
        400: "rgb(var(--secondary-400) / <alpha-value>)",
        500: "rgb(var(--secondary-500) / <alpha-value>)",
        600: "rgb(var(--secondary-600) / <alpha-value>)",
        700: "rgb(var(--secondary-700) / <alpha-value>)",
        800: "rgb(var(--secondary-800) / <alpha-value>)",
        900: "rgb(var(--secondary-900) / <alpha-value>)",
      },

      tranquil: "rgb(var(--tranquil) / <alpha-value>)",
      mantinque: "rgb(var(--mantinque) / <alpha-value>)",

      "accent-hugs": "rgb(var(--accent-hugs) / <alpha-value>)",
      "accent-bittersweet": "rgb(var(--accent-bittersweet) / <alpha-value>)",
      "accent-evergreen": "rgb(var(--accent-evergreen) / <alpha-value>)",
      "accent-fog": "rgb(var(--accent-fog) / <alpha-value>)",
      "accent-mellow": "rgb(var(--accent-mellow) / <alpha-value>)",
      "accent-rose": "rgb(var(--accent-rose) / <alpha-value>)",
      "accent-orange": "rgb(var(--accent-orange) / <alpha-value>)",
      "accent-peach-fuzz": "rgb(var(--accent-peach-fuzz) / <alpha-value>)",

      transparent: "transparent",
      current: "currentColor",

      steelgray: "rgb(var(--steelgray) / <alpha-value>)",
      scapaflow: "rgb(var(--scapaflow) / <alpha-value>)",
      stone: "rgb(var(--stone) / <alpha-value>)",
      topaz: "rgb(var(--topaz) / <alpha-value>)",
      graysuit: "rgb(var(--graysuit) / <alpha-value>)",
      finnishwinter: "rgb(var(--finnishwinter) / <alpha-value>)",
      mischka: "rgb(var(--mischka) / <alpha-value>)",
      white: "rgb(var(--white) / <alpha-value>)",

      info: "rgb(var(--info) / <alpha-value>)",
      success: "rgb(var(--success) / <alpha-value>)",
      warning: "rgb(var(--warning) / <alpha-value>)",
      error: "rgb(var(--error) / <alpha-value>)",
    },

    fontFamily: {
      overpass: ["--font-overpass", ...defaultTheme.fontFamily.sans],
      inter: ["--font-inter", ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1.33" }],
      sm: ["0.8750rem", { lineHeight: "1.43" }],
      md: ["1rem", { lineHeight: "1.5" }],
      lg: ["1.125rem", { lineHeight: "1.56" }],
      xl: ["1.25rem", { lineHeight: "1.4" }],
      "heading-xs": ["1.5rem", { lineHeight: "1.33" }],
      "heading-sm": ["1.8750rem", { lineHeight: "1.33" }],
      "heading-md": [
        "2.25rem",
        { lineHeight: "1.25", letterSpacing: "-0.025em" },
      ],
      "heading-lg": ["3rem", { lineHeight: "1.25", letterSpacing: "-0.025em" }],
      "heading-xl": [
        "3.75rem",
        { lineHeight: "1.2", letterSpacing: "-0.025em" },
      ],
      "heading-2xl": [
        "4.5rem",
        { lineHeight: "1.25", letterSpacing: "-0.025em" },
      ],
    },
    fontWeight: {
      light: "300",
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      1: "1",
      md: "1.25",
      lg: "1.5",
      xl: "1.75",
    },
    extend: {
      screens: {
        "2sm": "570px",
        desktopMenu: "940px",
      },
      borderRadius: {
        ...defaultTheme.borderRadius,
        DEFAULT: "3px",
      },
      opacity: {
        ...defaultTheme.opacity,
        15: "0.15",
      },
      backgroundImage: {
        "gradient-primary-600":
          "linear-gradient(90deg, rgba(91, 55, 191, 0.9) 0%, rgba(91, 55, 191, 0.90) 100%), url('/a5b97f1ed23d0bc08a59a8be0e3a1290.jpeg')",
      },
      keyframes: {
        appear: {
          "0%": { width: 0 },
          "100%": { width: "100%" },
          "slide-in-from-bottom": {
            "0%": { transform: "translateY(100%)" },
            "100%": { transform: "translateY(0)" },
          },
          "slide-out-to-bottom": {
            "0%": { transform: "translateY(0)" },
            "100%": { transform: "translateY(100%)" },
          },
        },
      },
      animation: {
        underline: "appear 0.2s linear forwards",
        "slide-in-from-bottom": "slide-in-from-bottom 0.2s ease-out forwards",
        "slide-out-to-bottom": "slide-out-to-bottom 0.2s ease-out forwards",
      },
    },
  },
  corePlugins: {
    aspectRatio: true,
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
