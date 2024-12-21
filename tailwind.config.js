/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import postcss from "postcss";
import postcssJs from "postcss-js";

import clampGenerator from "./src/css-utils/clamp-generator.js";
import tokensToTailwind from "./src/css-utils/tokens-to-tailwind.js";

// Raw design tokens
import colorTokens from "./src/design-tokens/colors.json";
import fontTokens from "./src/design-tokens/fonts.json";
import spacingTokens from "./src/design-tokens/spacing.json";
import textSizeTokens from "./src/design-tokens/text-sizes.json";
import textLeadingTokens from "./src/design-tokens/text-leading.json";
import textWeightTokens from "./src/design-tokens/text-weights.json";
import viewportTokens from "./src/design-tokens/viewports.json";

// Process design tokens
const colors = tokensToTailwind(colorTokens.items);
const fontFamily = tokensToTailwind(fontTokens.items);
const fontWeight = tokensToTailwind(textWeightTokens.items);
const fontSize = tokensToTailwind(clampGenerator(textSizeTokens.items));
const lineHeight = tokensToTailwind(textLeadingTokens.items);
const spacing = tokensToTailwind(clampGenerator(spacingTokens.items));

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  // Add color classes to safe list so they are always generated
  safelist: [],
  theme: {
    screens: {
      sm: `${viewportTokens.min}px`,
      md: `${viewportTokens.mid}px`,
      lg: `${viewportTokens.max}px`,
    },
    colors,
    spacing,
    fontSize,
    lineHeight,
    fontFamily,
    fontWeight,
    backgroundColor: ({ theme }) => theme("colors"),
    textColor: ({ theme }) => theme("colors"),
    margin: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
    }),
    padding: ({ theme }) => theme("spacing"),
  },
  variantOrder: [
    "first",
    "last",
    "odd",
    "even",
    "visited",
    "checked",
    "empty",
  ],
};