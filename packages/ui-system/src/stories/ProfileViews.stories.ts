import type { Meta, StoryObj } from "@storybook/react";
import { ProfileViews } from "../index";

const meta = {
  title: "Components/my-profile",
  component: ProfileViews,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof ProfileViews>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { viewCount: 14, children: "Profile Views" },
};
