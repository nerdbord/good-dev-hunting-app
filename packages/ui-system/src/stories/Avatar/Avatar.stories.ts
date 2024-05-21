import type { Meta, StoryObj } from '@storybook/react';
import smallAvatar from '../../../public/50.png';
import medAvatar from '../../../public/100.png';
import bigAvatar from '../../../public/250.png';
import { Avatar } from '../../components/index';

const meta = {
  title: 'Components/Avatar/Avatar',
  component: Avatar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
  argTypes: {
    src: {
      control: 'text',
      description: 'Source of the avatar image',
    },
    size: {
      control: 'number',
      description: 'Size of the avatar in pixels',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: medAvatar,
    size: 100
  },
};

export const Small: Story = {
  args: {
    src: smallAvatar,
    size: 50
  },
};

export const Big: Story = {
  args: {
    src: bigAvatar,
    size: 250
  },
};
