import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, OptionalTooltip } from './Tooltip'
import { TooltipPlacement } from './Tooltip.types'
import { Button } from '../Button'
import { Icon } from '../Icon'

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placement: {
      control: 'select',
      options: Object.values(TooltipPlacement),
    },
    tooltipText: {
      control: 'text',
    },
    shortcuts: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    withoutShowDelay: {
      control: 'boolean',
    },
  },
  args: {
    disabled: false,
    withoutShowDelay: false,
  },
} satisfies Meta

export default meta
type Story = StoryObj

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => (
    <Tooltip tooltipText="This is a helpful tooltip" placement={TooltipPlacement.Top}>
      <Button label="Hover me" />
    </Tooltip>
  ),
}

export const PlacementVariants: Story = {
  render: () => {
    const placements = Object.values(TooltipPlacement)

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          padding: 60,
        }}
      >
        {placements.map((placement) => (
          <Tooltip
            key={placement}
            tooltipText={`Placement: ${placement}`}
            placement={placement}
            withoutShowDelay
          >
            <Button size="S" style={{ width: '100%' }} label={placement} />
          </Tooltip>
        ))}
      </div>
    )
  },
}

export const TopPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 80 }}>
      <Tooltip tooltipText="Top Start" placement={TooltipPlacement.TopStart} withoutShowDelay>
        <Button label="Top Start" />
      </Tooltip>
      <Tooltip tooltipText="Top Center" placement={TooltipPlacement.Top} withoutShowDelay>
        <Button label="Top" />
      </Tooltip>
      <Tooltip tooltipText="Top End" placement={TooltipPlacement.TopEnd} withoutShowDelay>
        <Button label="Top End" />
      </Tooltip>
    </div>
  ),
}

export const BottomPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 80 }}>
      <Tooltip tooltipText="Bottom Start" placement={TooltipPlacement.BottomStart} withoutShowDelay>
        <Button label="Bottom Start" />
      </Tooltip>
      <Tooltip tooltipText="Bottom Center" placement={TooltipPlacement.Bottom} withoutShowDelay>
        <Button label="Bottom" />
      </Tooltip>
      <Tooltip tooltipText="Bottom End" placement={TooltipPlacement.BottomEnd} withoutShowDelay>
        <Button label="Bottom End" />
      </Tooltip>
    </div>
  ),
}

export const SidePlacements: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div style={{ display: 'flex', gap: 24 }}>
        <Tooltip tooltipText="Left placement" placement={TooltipPlacement.Left} withoutShowDelay>
          <Button label="Left" />
        </Tooltip>
        <Tooltip tooltipText="Right placement" placement={TooltipPlacement.Right} withoutShowDelay>
          <Button label="Right" />
        </Tooltip>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <Tooltip tooltipText="Left Start" placement={TooltipPlacement.LeftStart} withoutShowDelay>
          <Button label="Left Start" />
        </Tooltip>
        <Tooltip tooltipText="Right Start" placement={TooltipPlacement.RightStart} withoutShowDelay>
          <Button label="Right Start" />
        </Tooltip>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <Tooltip tooltipText="Left End" placement={TooltipPlacement.LeftEnd} withoutShowDelay>
          <Button label="Left End" />
        </Tooltip>
        <Tooltip tooltipText="Right End" placement={TooltipPlacement.RightEnd} withoutShowDelay>
          <Button label="Right End" />
        </Tooltip>
      </div>
    </div>
  ),
}

export const WithShortcuts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 40 }}>
      <Tooltip
        tooltipText="Save document"
        shortcuts="Ctrl + S"
        placement={TooltipPlacement.Top}
        withoutShowDelay
      >
        <Button icon={<Icon name="floppy-disk" />} label="Save" />
      </Tooltip>
      <Tooltip
        tooltipText="Copy selection"
        shortcuts="Ctrl + C"
        placement={TooltipPlacement.Top}
        withoutShowDelay
      >
        <Button icon={<Icon name="copy" />} label="Copy" />
      </Tooltip>
      <Tooltip
        tooltipText="Undo last action"
        shortcuts="Ctrl + Z"
        placement={TooltipPlacement.Top}
        withoutShowDelay
      >
        <Button icon={<Icon name="rotate-left" />} label="Undo" />
      </Tooltip>
    </div>
  ),
}

export const ShortcutsOnly: Story = {
  render: () => (
    <div style={{ padding: 40 }}>
      <Tooltip shortcuts="Esc" placement={TooltipPlacement.Top} withoutShowDelay>
        <Button color="tertiary" label="Close" />
      </Tooltip>
    </div>
  ),
}

export const ControlledVisibility: Story = {
  render: () => {
    const ControlledDemo = () => {
      const [visible, setVisible] = useState(false)

      return (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 40 }}>
          <Button onClick={() => setVisible(!visible)} label={visible ? 'Hide Tooltip' : 'Show Tooltip'} />
          <Tooltip
            tooltipText="This tooltip is controlled externally"
            placement={TooltipPlacement.Right}
            visible={visible}
          >
            <span
              style={{
                padding: '8px 16px',
                background: '#f0f0f0',
                borderRadius: 4,
              }}
            >
              Target Element
            </span>
          </Tooltip>
        </div>
      )
    }

    return <ControlledDemo />
  },
}

export const WithoutDelay: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 40 }}>
      <Tooltip tooltipText="300ms delay (default)" placement={TooltipPlacement.Top}>
        <Button color="secondary" label="Normal Delay" />
      </Tooltip>
      <Tooltip
        tooltipText="No delay - instant!"
        placement={TooltipPlacement.Top}
        withoutShowDelay
      >
        <Button color="primary" label="Instant" />
      </Tooltip>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 40 }}>
      <Tooltip tooltipText="This tooltip is visible" placement={TooltipPlacement.Top}>
        <Button label="Enabled Tooltip" />
      </Tooltip>
      <Tooltip tooltipText="This won't show" placement={TooltipPlacement.Top} disabled>
        <Button color="tertiary" label="Disabled Tooltip" />
      </Tooltip>
    </div>
  ),
}

export const LongContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 60 }}>
      <Tooltip
        tooltipText="This is a much longer tooltip message that demonstrates how the tooltip handles multi-line content. It will wrap based on the maxGridUnitWidth setting."
        placement={TooltipPlacement.Bottom}
        withoutShowDelay
        maxGridUnitWidth={30}
      >
        <Button label="Narrow tooltip" />
      </Tooltip>
      <Tooltip
        tooltipText="This is a much longer tooltip message that demonstrates how the tooltip handles multi-line content. It will wrap based on the maxGridUnitWidth setting."
        placement={TooltipPlacement.Bottom}
        withoutShowDelay
        maxGridUnitWidth={60}
      >
        <Button label="Wide tooltip" />
      </Tooltip>
    </div>
  ),
}

export const OnIconButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, padding: 40 }}>
      <Tooltip tooltipText="Edit item" placement={TooltipPlacement.Top} withoutShowDelay>
        <Button icon={<Icon name="pencil" />} color="tertiary" />
      </Tooltip>
      <Tooltip tooltipText="Delete item" placement={TooltipPlacement.Top} withoutShowDelay>
        <Button icon={<Icon name="bin" />} color="tertiary" />
      </Tooltip>
      <Tooltip tooltipText="Settings" shortcuts="Ctrl + ," placement={TooltipPlacement.Top} withoutShowDelay>
        <Button icon={<Icon name="cog-six-tooth" />} color="tertiary" />
      </Tooltip>
      <Tooltip tooltipText="Help" shortcuts="F1" placement={TooltipPlacement.Top} withoutShowDelay>
        <Button icon={<Icon name="question-mark-circle" />} color="tertiary" />
      </Tooltip>
    </div>
  ),
}

/* ------------------------------------------------------------------ */
/*  OptionalTooltip Stories                                            */
/* ------------------------------------------------------------------ */

export const OptionalTooltipDefault: Story = {
  render: () => (
    <div style={{ padding: 40, maxWidth: 200 }}>
      <p style={{ marginBottom: 16, color: '#666' }}>
        Hover over the truncated text to see the full content:
      </p>
      <OptionalTooltip text="This is a very long text that will be truncated when it overflows its container">
        This is a very long text that will be truncated when it overflows its container
      </OptionalTooltip>
    </div>
  ),
}

export const OptionalTooltipComparison: Story = {
  render: () => (
    <div style={{ padding: 40 }}>
      <div style={{ marginBottom: 24 }}>
        <h4 style={{ margin: '0 0 8px' }}>Short text (no tooltip needed):</h4>
        <div style={{ width: 300, border: '1px solid #ccc', padding: 8 }}>
          <OptionalTooltip text="Short text">Short text</OptionalTooltip>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px' }}>Long text (tooltip appears on hover):</h4>
        <div style={{ width: 300, border: '1px solid #ccc', padding: 8 }}>
          <OptionalTooltip text="This is a very long text that will definitely be truncated and needs a tooltip to show the full content">
            This is a very long text that will definitely be truncated and needs a tooltip to show the full content
          </OptionalTooltip>
        </div>
      </div>
    </div>
  ),
}
