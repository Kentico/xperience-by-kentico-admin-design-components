import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ResizableBox } from './ResizableBox'
import type { HandleDirection } from './ResizableBox.types'

const directions: HandleDirection[] = ['left', 'right', 'top', 'bottom']

const meta = {
  title: 'Layout/ResizableBox',
  component: ResizableBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    directions: ['right'],
    children: 'Drag the edge to resize',
  },
  argTypes: {
    directions: {
      control: 'check',
      options: directions,
      description: 'Directions where resize handles appear',
    },
    width: {
      control: { type: 'number', min: 100, max: 800 },
      description: 'Controlled width of the box',
    },
    height: {
      control: { type: 'number', min: 100, max: 800 },
      description: 'Controlled height of the box',
    },
    minWidth: {
      control: { type: 'number', min: 50, max: 400 },
      description: 'Minimum width constraint',
    },
    maxWidth: {
      control: { type: 'number', min: 200, max: 1200 },
      description: 'Maximum width constraint',
    },
    minHeight: {
      control: { type: 'number', min: 50, max: 400 },
      description: 'Minimum height constraint',
    },
    maxHeight: {
      control: { type: 'number', min: 200, max: 1200 },
      description: 'Maximum height constraint',
    },
    styleMode: {
      control: 'radio',
      options: ['inline', 'css-variables'],
      description: 'How to apply size styles',
    },
  },
} satisfies Meta<typeof ResizableBox>

export default meta
type Story = StoryObj<typeof ResizableBox>

/** Helper component for content display */
const DemoContent = ({ label }: { label: string }) => (
  <div
    style={{
      background: '#e3f2fd',
      border: '1px solid #90caf9',
      borderRadius: 4,
      padding: 16,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      boxSizing: 'border-box',
    }}
  >
    {label}
  </div>
)

export const Default: Story = {
  args: {
    directions: ['right'],
  },
  render: (args) => (
    <ResizableBox {...args}>
      <DemoContent label="Drag the right edge to resize" />
    </ResizableBox>
  ),
}

export const RightHandle: Story = {
  args: {
    directions: ['right'],
    width: 300,
  },
  render: (args) => (
    <ResizableBox {...args}>
      <DemoContent label="Right handle only" />
    </ResizableBox>
  ),
}

export const LeftHandle: Story = {
  args: {
    directions: ['left'],
    width: 300,
  },
  render: (args) => (
    <ResizableBox {...args}>
      <DemoContent label="Left handle only" />
    </ResizableBox>
  ),
}

export const TopHandle: Story = {
  args: {
    directions: ['top'],
    height: 200,
  },
  render: (args) => (
    <ResizableBox {...args}>
      <DemoContent label="Top handle only" />
    </ResizableBox>
  ),
}

export const BottomHandle: Story = {
  args: {
    directions: ['bottom'],
    height: 200,
  },
  render: (args) => (
    <ResizableBox {...args}>
      <DemoContent label="Bottom handle only" />
    </ResizableBox>
  ),
}

export const HorizontalHandles: Story = {
  args: {
    directions: ['left', 'right'],
    width: 300,
  },
  render: (args) => (
    <ResizableBox {...args}>
      <DemoContent label="Resize from left or right" />
    </ResizableBox>
  ),
}

export const VerticalHandles: Story = {
  args: {
    directions: ['top', 'bottom'],
    height: 200,
  },
  render: (args) => (
    <ResizableBox {...args}>
      <DemoContent label="Resize from top or bottom" />
    </ResizableBox>
  ),
}

export const AllHandles: Story = {
  args: {
    directions: ['left', 'right', 'top', 'bottom'],
    width: 300,
    height: 200,
  },
  render: (args) => (
    <ResizableBox {...args}>
      <DemoContent label="Resize from any edge" />
    </ResizableBox>
  ),
}

export const WithConstraints: Story = {
  args: {
    directions: ['right', 'bottom'],
    width: 300,
    height: 200,
    minWidth: 150,
    maxWidth: 500,
    minHeight: 100,
    maxHeight: 400,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ResizableBox {...args}>
        <DemoContent label={`Min: ${args.minWidth}x${args.minHeight}, Max: ${args.maxWidth}x${args.maxHeight}`} />
      </ResizableBox>
      <span style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>
        Width: {args.minWidth}-{args.maxWidth}px, Height: {args.minHeight}-{args.maxHeight}px
      </span>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [size, setSize] = useState({ width: 300, height: 200 })

    const handleResize = (width: number, height: number) => {
      setSize({ width, height })
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <ResizableBox
          directions={['right', 'bottom']}
          width={size.width}
          height={size.height}
          onResize={handleResize}
        >
          <DemoContent label="Controlled resizing" />
        </ResizableBox>
        <div style={{ fontSize: 14, color: '#666' }}>
          Current size: {size.width}px x {size.height}px
        </div>
      </div>
    )
  },
}

export const CSSVariablesMode: Story = {
  args: {
    directions: ['right', 'bottom'],
    width: 300,
    height: 200,
    styleMode: 'css-variables',
  },
  render: (args) => (
    <ResizableBox {...args}>
      <DemoContent label="Using CSS variables mode" />
    </ResizableBox>
  ),
}

export const MultipleBoxes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <ResizableBox directions={['right']} width={200}>
        <DemoContent label="Box 1" />
      </ResizableBox>
      <ResizableBox directions={['right']} width={200}>
        <DemoContent label="Box 2" />
      </ResizableBox>
      <ResizableBox directions={['right']} width={200}>
        <DemoContent label="Box 3" />
      </ResizableBox>
    </div>
  ),
}
