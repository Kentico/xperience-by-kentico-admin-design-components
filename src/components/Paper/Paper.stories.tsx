import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import {
  Paper,
  PaperElevation,
  BorderRadius,
  type PaperProps,
} from './Paper'

const elevations: PaperElevation[] = [
  PaperElevation.None,
  PaperElevation.Subtle,
  PaperElevation.Small,
  PaperElevation.Medium,
  PaperElevation.Large,
]

const borderRadii: BorderRadius[] = [
  BorderRadius.Small,
  BorderRadius.Medium,
  BorderRadius.Large,
]

const meta = {
  title: 'Layout/Paper',
  component: Paper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    elevation: PaperElevation.Small,
    bordered: false,
    borderRadius: BorderRadius.Medium,
    children: 'Paper Content',
  },
  argTypes: {
    elevation: {
      control: 'select',
      options: Object.values(PaperElevation),
      description: 'Shadow elevation level',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether to show border',
    },
    borderRadius: {
      control: 'select',
      options: Object.values(BorderRadius),
      description: 'Border radius size',
    },
  },
} satisfies Meta<typeof Paper>

export default meta
type Story = StoryObj<typeof Paper>

/** Helper component to visualize Paper with label */
const PaperWithLabel = ({
  label,
  children,
  ...props
}: PaperProps & { label?: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
    }}
  >
    <Paper {...props}>
      <div style={{ padding: 24, minWidth: 120, textAlign: 'center' }}>
        {children}
      </div>
    </Paper>
    {label && <span style={{ fontSize: 12, color: '#666' }}>{label}</span>}
  </div>
)

export const Default: Story = {
  args: {
    elevation: PaperElevation.Small,
    children: 'Paper Content',
  },
  render: (args) => (
    <Paper {...args}>
      <div style={{ padding: 24, minWidth: 120, textAlign: 'center' }}>
        {args.children}
      </div>
    </Paper>
  ),
}

export const AllElevations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      {elevations.map((elevation) => (
        <PaperWithLabel key={elevation} elevation={elevation} label={elevation}>
          {elevation}
        </PaperWithLabel>
      ))}
    </div>
  ),
}

export const WithBorder: Story = {
  args: {
    elevation: PaperElevation.None,
    bordered: true,
    children: 'Bordered Paper',
  },
  render: (args) => (
    <Paper {...args}>
      <div style={{ padding: 24, minWidth: 120, textAlign: 'center' }}>
        {args.children}
      </div>
    </Paper>
  ),
}

export const BorderedVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <PaperWithLabel elevation={PaperElevation.None} bordered label="Bordered only">
        No Shadow
      </PaperWithLabel>
      <PaperWithLabel elevation={PaperElevation.Small} bordered label="Small + Border">
        With Shadow
      </PaperWithLabel>
      <PaperWithLabel elevation={PaperElevation.Medium} bordered label="Medium + Border">
        Combined
      </PaperWithLabel>
    </div>
  ),
}

export const AllBorderRadii: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      {borderRadii.map((radius) => (
        <PaperWithLabel
          key={radius}
          elevation={PaperElevation.Small}
          borderRadius={radius}
          label={`radius: ${radius}`}
        >
          {radius.toUpperCase()}
        </PaperWithLabel>
      ))}
    </div>
  ),
}

export const ElevationComparison: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 32,
        padding: 24,
        background: '#f5f5f5',
        borderRadius: 8,
      }}
    >
      {elevations.map((elevation) => (
        <Paper key={elevation} elevation={elevation}>
          <div style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{elevation}</div>
            <div style={{ fontSize: 12, color: '#666' }}>
              Elevation: {elevation}
            </div>
          </div>
        </Paper>
      ))}
    </div>
  ),
}

export const NestedPapers: Story = {
  render: () => (
    <Paper elevation={PaperElevation.Large}>
      <div style={{ padding: 24 }}>
        <div style={{ marginBottom: 16, fontWeight: 600 }}>Outer Paper</div>
        <Paper elevation={PaperElevation.Small}>
          <div style={{ padding: 16 }}>
            <div style={{ marginBottom: 12, fontWeight: 500 }}>Inner Paper</div>
            <Paper elevation={PaperElevation.Subtle} bordered>
              <div style={{ padding: 12, textAlign: 'center' }}>
                Deepest Level
              </div>
            </Paper>
          </div>
        </Paper>
      </div>
    </Paper>
  ),
}
