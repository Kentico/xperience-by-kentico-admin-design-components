import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { StickyBanner } from './StickyBanner'
import { StickyBannerType } from './StickyBanner.types'

const bannerTypes = [StickyBannerType.Info, StickyBannerType.Error] as const

const meta = {
  title: 'Feedback/StickyBanner',
  component: StickyBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    bannerType: StickyBannerType.Info,
    message: 'This is a sticky banner message.',
    messageAsHtml: false,
  },
  argTypes: {
    bannerType: {
      control: 'select',
      options: bannerTypes,
      description: 'Type of the banner (info or error)',
    },
    message: {
      control: 'text',
      description: 'Message to display in the banner',
    },
    messageAsHtml: {
      control: 'boolean',
      description: 'Indicates if the message should be rendered as HTML',
    },
  },
} satisfies Meta<typeof StickyBanner>

export default meta
type Story = StoryObj<typeof StickyBanner>

export const Default: Story = {
  args: {
    bannerType: StickyBannerType.Info,
    message: 'This is an informational sticky banner.',
  },
}

export const Info: Story = {
  args: {
    bannerType: StickyBannerType.Info,
    message: 'Your session will expire in 5 minutes. Please save your work.',
  },
}

export const Error: Story = {
  args: {
    bannerType: StickyBannerType.Error,
    message: 'An error occurred. Please refresh the page and try again.',
  },
}

export const WithHtmlContent: Story = {
  args: {
    bannerType: StickyBannerType.Info,
    message:
      'Please review our <strong>updated terms</strong> and <a href="#">privacy policy</a>.',
    messageAsHtml: true,
  },
}

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {bannerTypes.map((type) => (
        <div key={type}>
          <StickyBanner
            bannerType={type}
            message={`This is a ${type} banner message.`}
            messageAsHtml={false}
          />
        </div>
      ))}
    </div>
  ),
}

export const LongMessage: Story = {
  args: {
    bannerType: StickyBannerType.Info,
    message:
      'This is a very long message that demonstrates how the sticky banner handles extended content. The banner should accommodate longer messages gracefully while remaining readable and visually consistent with the design system.',
  },
}
