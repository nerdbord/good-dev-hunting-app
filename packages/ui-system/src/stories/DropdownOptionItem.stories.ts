import type { Meta, StoryObj } from "@storybook/react";
import { DropdownOptionItem } from "../index";

const meta = {
  title: "Components/Dropdowns/DropdownOptionItem",
  component: DropdownOptionItem,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
  argTypes: {
    onSelect: { action: "selected" },
    hasSearchInput: { control: "boolean" },
    isSelected: { control: "boolean" },
  },
} satisfies Meta<typeof DropdownOptionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    option: { name: "Option 1", value: "option1" },
    hasSearchInput: false,
    isSelected: false,
    onSelect: ()=>{}
  },
};

export const Selected: Story = {
  args: {
    option: { name: "Option 2", value: "option2" },
    hasSearchInput: false,
    isSelected: true,
    onSelect: ()=>{}
  },
};

export const WithSearchInput: Story = {
  args: {
    option: { name: "Option 3", value: "option3" },
    hasSearchInput: true,
    isSelected: false,
    onSelect: ()=>{}
  },
};
