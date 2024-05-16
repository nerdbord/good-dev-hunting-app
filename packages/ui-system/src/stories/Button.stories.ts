import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from '../components/Button/Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: "primary"
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary"
  },
}

export const Tertiary: Story = {
  args: {
    variant: "tertiary"
  },
}

export const Action: Story = {
  args: {
    variant: "action"
  },
}

export const Logout: Story = {
    args: {
      variant: "logout"
    },
  }

  export const Standard: Story = {
    args: {
      variant: "standard"
    },
  }