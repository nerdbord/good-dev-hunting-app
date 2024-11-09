import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "../index";

const meta: Meta<typeof Logo> = {
  title: "Components/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Primary: Story = {
  args: {},
};
