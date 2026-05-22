import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Box } from './Box'
import { Spacing } from '@/components/Layout/Layout.types'

const spacingOptions = Object.entries(Spacing) as [string, string][]

const meta = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    spacing: Spacing.M,
    children: 'Box Content',
  },
  argTypes: {
    spacing: {
      control: 'select',
      options: Object.values(Spacing),
      description: 'Padding on all sides',
    },
    spacingX: {
      control: 'select',
      options: Object.values(Spacing),
      description: 'Padding on left and right sides',
    },
    spacingY: {
      control: 'select',
      options: Object.values(Spacing),
      description: 'Padding on top and bottom sides',
    },
    spacingTop: {
      control: 'select',
      options: Object.values(Spacing),
      description: 'Padding on top',
    },
    spacingRight: {
      control: 'select',
      options: Object.values(Spacing),
      description: 'Padding on right',
    },
    spacingBottom: {
      control: 'select',
      options: Object.values(Spacing),
      description: 'Padding on bottom',
    },
    spacingLeft: {
      control: 'select',
      options: Object.values(Spacing),
      description: 'Padding on left',
    },
  },
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof Box>

/** Helper component to visualize spacing */
const BoxWithBorder = ({
  children,
  label,
  ...props
}: ComponentProps<typeof Box> & { label?: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
    }}
  >
    <div style={{ border: '2px dashed #ccc', display: 'inline-block' }}>
      <Box {...props}>
        <div
          style={{
            background: '#e3f2fd',
            padding: 8,
            borderRadius: 4,
            minWidth: 80,
            textAlign: 'center',
          }}
        >
          {children}
        </div>
      </Box>
    </div>
    {label && <span style={{ fontSize: 12, color: '#666' }}>{label}</span>}
  </div>
)

export const Default: Story = {
  args: {
    spacing: Spacing.M,
    children: 'Box Content',
  },
  render: (args) => (
    <div style={{ border: '2px dashed #ccc', display: 'inline-block' }}>
      <Box {...args}>
        <div style={{ background: '#e3f2fd', padding: 8, borderRadius: 4 }}>
          {args.children}
        </div>
      </Box>
    </div>
  ),
}

export const AllSpacingVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 24,
      }}
    >
      {spacingOptions.map(([name, value]) => (
        <BoxWithBorder key={name} spacing={value} label={`${name} (${value})`}>
          Content
        </BoxWithBorder>
      ))}
    </div>
  ),
}

export const HorizontalSpacing: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <BoxWithBorder spacingX={Spacing.S} label="spacingX: S (8px)">
        Horizontal S
      </BoxWithBorder>
      <BoxWithBorder spacingX={Spacing.M} label="spacingX: M (12px)">
        Horizontal M
      </BoxWithBorder>
      <BoxWithBorder spacingX={Spacing.L} label="spacingX: L (16px)">
        Horizontal L
      </BoxWithBorder>
      <BoxWithBorder spacingX={Spacing.XL} label="spacingX: XL (24px)">
        Horizontal XL
      </BoxWithBorder>
    </div>
  ),
}

export const VerticalSpacing: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <BoxWithBorder spacingY={Spacing.S} label="spacingY: S (8px)">
        Vertical S
      </BoxWithBorder>
      <BoxWithBorder spacingY={Spacing.M} label="spacingY: M (12px)">
        Vertical M
      </BoxWithBorder>
      <BoxWithBorder spacingY={Spacing.L} label="spacingY: L (16px)">
        Vertical L
      </BoxWithBorder>
      <BoxWithBorder spacingY={Spacing.XL} label="spacingY: XL (24px)">
        Vertical XL
      </BoxWithBorder>
    </div>
  ),
}

export const IndividualSides: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <BoxWithBorder spacingTop={Spacing.XL} label="spacingTop: XL">
        Top Only
      </BoxWithBorder>
      <BoxWithBorder spacingRight={Spacing.XL} label="spacingRight: XL">
        Right Only
      </BoxWithBorder>
      <BoxWithBorder spacingBottom={Spacing.XL} label="spacingBottom: XL">
        Bottom Only
      </BoxWithBorder>
      <BoxWithBorder spacingLeft={Spacing.XL} label="spacingLeft: XL">
        Left Only
      </BoxWithBorder>
    </div>
  ),
}

export const CombinedSpacing: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <BoxWithBorder
        spacingX={Spacing.XL}
        spacingY={Spacing.S}
        label="X: XL, Y: S"
      >
        Wide Padding
      </BoxWithBorder>
      <BoxWithBorder
        spacingX={Spacing.S}
        spacingY={Spacing.XL}
        label="X: S, Y: XL"
      >
        Tall Padding
      </BoxWithBorder>
      <BoxWithBorder
        spacingTop={Spacing.XL}
        spacingRight={Spacing.L}
        spacingBottom={Spacing.M}
        spacingLeft={Spacing.S}
        label="T:XL R:L B:M L:S"
      >
        Custom
      </BoxWithBorder>
    </div>
  ),
}

export const NestedBoxes: Story = {
  render: () => (
    <div style={{ border: '2px solid #1976d2' }}>
      <Box spacing={Spacing.L}>
        <div
          style={{
            background: '#e3f2fd',
            border: '1px solid #90caf9',
          }}
        >
          <Box spacing={Spacing.M}>
            <div
              style={{
                background: '#bbdefb',
                border: '1px solid #64b5f6',
              }}
            >
              <Box spacing={Spacing.S}>
                <div
                  style={{
                    background: '#90caf9',
                    padding: 8,
                    textAlign: 'center',
                  }}
                >
                  Nested Content
                </div>
              </Box>
            </div>
          </Box>
        </div>
      </Box>
    </div>
  ),
}
