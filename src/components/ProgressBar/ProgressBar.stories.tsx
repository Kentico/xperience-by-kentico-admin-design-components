import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'
import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    completed: 50,
  },
  argTypes: {
    completed: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100). Omit for indeterminate state.',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: {
    completed: 50,
  },
}

export const Determinate: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>0%</div>
        <ProgressBar completed={0} />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>25%</div>
        <ProgressBar completed={25} />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>50%</div>
        <ProgressBar completed={50} />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>75%</div>
        <ProgressBar completed={75} />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>100%</div>
        <ProgressBar completed={100} />
      </div>
    </div>
  ),
}

export const Indeterminate: Story = {
  args: {
    completed: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `completed` is undefined or not provided, the progress bar shows an empty state (0%). For animated indeterminate loading, consider using the Spinner component instead.',
      },
    },
  },
}

/** Shows animated progress from 0 to 100 */
const AnimatedProgressDemo = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 5
      })
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>
        Progress: {progress}%
      </div>
      <ProgressBar completed={progress} />
    </div>
  )
}

export const AnimatedProgress: Story = {
  render: () => <AnimatedProgressDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the smooth transition animation when the progress value changes over time.',
      },
    },
  },
}

export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>
          Negative value (-10) → clamps to 0%
        </div>
        <ProgressBar completed={-10} />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>
          Over 100 (150) → clamps to 100%
        </div>
        <ProgressBar completed={150} />
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>
          Undefined → shows 0%
        </div>
        <ProgressBar completed={undefined} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The component handles edge cases gracefully: negative values clamp to 0%, values over 100 clamp to 100%, and undefined shows 0%.',
      },
    },
  },
}
