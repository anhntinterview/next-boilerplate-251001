import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-themes",
    "storybook-next-intl",
    "storybook-addon-rtl",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: { name: "@storybook/nextjs", options: {} },
  staticDirs: ["../public", { from: "../src/fonts", to: "/fonts" }],
};
export default config;
