import type { StorybookConfig } from "@storybook/nextjs";
import { dirname, join, resolve as resolvePath } from "path";
import type { Configuration, RuleSetRule } from "webpack"; // Dodano typy

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}

const stylesPath = resolvePath(__dirname, "../src/styles");
console.log("[Storybook] Sass Include Path configured:", stylesPath);

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
    // Consider adding addon-styling-webpack for easier style configuration in the future
    // getAbsolutePath("@storybook/addon-styling-webpack"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  staticDirs: ["../public"],

  webpackFinal: async (config: Configuration): Promise<Configuration> => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    const scssRule = config.module.rules.find(
      (rule): rule is RuleSetRule =>
        typeof rule === "object" &&
        rule !== null &&
        rule.test instanceof RegExp &&
        rule.test.test(".scss")
    );

    if (scssRule) {
      console.log(
        "[Storybook] Found existing SCSS rule. Modifying sass-loader options."
      );

      if (Array.isArray(scssRule.use)) {
        scssRule.use.forEach((loaderConfig) => {
          if (
            typeof loaderConfig === "object" &&
            loaderConfig !== null &&
            typeof loaderConfig.loader === "string" &&
            loaderConfig.loader.includes("sass-loader")
          ) {
            loaderConfig.options = {
              ...((loaderConfig.options as object) || {}),
              sassOptions: {
                ...((loaderConfig.options as any)?.sassOptions || {}),
                includePaths: [
                  ...((loaderConfig.options as any)?.sassOptions
                    ?.includePaths || []),
                  stylesPath,
                ],
              },
              additionalData: `@use "mixins" as *; @use "tokens" as *;`,
            };
          }
        });
      } else {
        console.warn(
          "[Storybook] Could not find 'use' array in the SCSS rule to modify sass-loader."
        );
      }
    } else {
      console.warn(
        "[Storybook] Could not find an existing rule for SCSS files. Sass/SCSS might not work correctly."
      );
    }
    return config;
  },
};

export default config;
