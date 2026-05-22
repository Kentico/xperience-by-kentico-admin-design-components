import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { Callout, CalloutType, CalloutPlacementType } from './index'
import { Button } from '../Button'

const calloutTypes = Object.values(CalloutType)
const calloutPlacements = Object.values(CalloutPlacementType)

const meta = {
  title: 'Feedback/Callout',
  component: Callout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    type: CalloutType.QuickTip,
    placement: CalloutPlacementType.OnPaper,
    headline: 'Helpful Information',
    subheadline: 'Quick Tip',
    children: 'This is some helpful information for the user.',
  },
  argTypes: {
    type: {
      control: 'select',
      options: calloutTypes,
      description: 'The type of callout - determines icon and colors',
    },
    placement: {
      control: 'select',
      options: calloutPlacements,
      description: 'The placement context - affects shadow intensity',
    },
    headline: {
      control: 'text',
      description: 'The main headline text',
    },
    subheadline: {
      control: 'text',
      description: 'The subheadline text displayed next to the icon',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the callout',
    },
  },
} satisfies Meta<typeof Callout>

export default meta
type Story = StoryObj<typeof Callout>

export const Default: Story = {
  args: {
    type: CalloutType.QuickTip,
    placement: CalloutPlacementType.OnPaper,
    headline: 'Helpful Information',
    subheadline: 'Quick Tip',
    children: 'This is some helpful information for the user.',
  },
}

export const QuickTip: Story = {
  args: {
    type: CalloutType.QuickTip,
    placement: CalloutPlacementType.OnPaper,
    headline: 'Did You Know?',
    subheadline: 'Quick Tip',
    children:
      'You can use keyboard shortcuts to navigate through the application more efficiently.',
  },
}

export const FriendlyWarning: Story = {
  args: {
    type: CalloutType.FriendlyWarning,
    placement: CalloutPlacementType.OnPaper,
    headline: 'Heads Up!',
    subheadline: 'Friendly Warning',
    children:
      'This action cannot be undone. Please make sure you have saved your work before proceeding.',
  },
}

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {calloutTypes.map((type) => (
        <Callout
          key={type}
          type={type}
          placement={CalloutPlacementType.OnPaper}
          headline={type === CalloutType.QuickTip ? 'Quick Tip' : 'Warning'}
          subheadline={type}
        >
          This is a {type} callout example showing the different styling.
        </Callout>
      ))}
    </div>
  ),
}

export const AllPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {calloutPlacements.map((placement) => (
        <div
          key={placement}
          style={{
            padding: 16,
            background:
              placement === CalloutPlacementType.OnDesk
                ? 'var(--gradient-background-desk)'
                : '#fff',
            borderRadius: 8,
          }}
        >
          <div style={{ marginBottom: 8, fontWeight: 500, fontSize: 12, color: '#666' }}>
            Placement: {placement}
          </div>
          <Callout
            type={CalloutType.QuickTip}
            placement={placement}
            headline="Placement Example"
            subheadline="Quick Tip"
          >
            This callout is placed with the &quot;{placement}&quot; setting.
          </Callout>
        </div>
      ))}
    </div>
  ),
}

export const TypePlacementMatrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
      {calloutTypes.map((type) =>
        calloutPlacements.map((placement) => (
          <div
            key={`${type}-${placement}`}
            style={{
              padding: 16,
              background:
                placement === CalloutPlacementType.OnDesk
                  ? 'var(--gradient-background-desk)'
                  : '#fff',
              borderRadius: 8,
            }}
          >
            <div style={{ marginBottom: 8, fontWeight: 500, fontSize: 12, color: '#666' }}>
              {type} / {placement}
            </div>
            <Callout type={type} placement={placement} subheadline={type}>
              A {type} callout on {placement} background.
            </Callout>
          </div>
        ))
      )}
    </div>
  ),
}

export const WithActionButton: Story = {
  args: {
    type: CalloutType.FriendlyWarning,
    placement: CalloutPlacementType.OnPaper,
    headline: 'Action Required',
    subheadline: 'Warning',
    children: 'Your session is about to expire. Please save your work.',
    actionButton: <Button size="M">Save Work</Button>,
  },
}

export const WithoutHeadline: Story = {
  args: {
    type: CalloutType.QuickTip,
    placement: CalloutPlacementType.OnPaper,
    subheadline: 'Tip',
    children: 'This callout has no headline, just content with a subheadline.',
  },
}

export const CustomMaxWidth: Story = {
  args: {
    type: CalloutType.QuickTip,
    placement: CalloutPlacementType.OnPaper,
    headline: 'Constrained Width',
    subheadline: 'Quick Tip',
    maxWidth: '400px',
    children:
      'This callout has a custom max-width of 400px to demonstrate the maxWidth prop.',
  },
}
