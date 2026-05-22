import type { Meta, StoryObj } from '@storybook/react-vite'
import { SubheaderDivider } from './SubheaderDivider'

const meta = {
  title: 'Layout/SubheaderDivider',
  component: SubheaderDivider,
  tags: ['autodocs'],
} satisfies Meta<typeof SubheaderDivider>

export default meta
type Story = StoryObj<typeof SubheaderDivider>

export const Default: Story = {
  args: {
    text: 'Section Header',
  },
}

export const ShortLabel: Story = {
  args: {
    text: 'Info',
  },
}

export const LongLabel: Story = {
  args: {
    text: 'Additional Settings and Preferences',
  },
}
