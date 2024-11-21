import type { StorybookConfig } from "@storybook/nextjs";
import { dirname, join } from "path";
import type { Configuration } from "webpack";

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  staticDirs: ["../public"],
  webpackFinal: async (config: Configuration) => {
    if (!config.module) {
      config.module = { rules: [] };
    }
    if (!config.module.rules) {
      config.module.rules = [];
    }
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: "sass-loader",
          options: {
            additionalData: `@import "src/styles/mixins"; @import "src/styles/tokens";`,
          },
        },
      ],
      include: join(__dirname, "../"),
    });

    return config;
  },
};

export default config;
