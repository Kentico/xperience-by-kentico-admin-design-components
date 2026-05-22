import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { createSelectGroup } from './SelectGroup'
import { SelectGroupCell } from './SelectGroupCell'

interface SelectItem {
  id: string
  label: string
  icon?: string
}

const SelectGroup = createSelectGroup<SelectItem>()

const meta = {
  title: 'Navigation/SelectGroup',
  component: SelectGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SelectGroup>

export default meta
type Story = StoryObj

const sampleSelects: SelectItem[] = [
  { id: 'language', label: 'English', icon: 'xp-earth' },
  { id: 'workspace', label: 'Default', icon: 'xp-two-rectangles-stacked' },
  { id: 'status', label: 'Published', icon: 'xp-check-circle' },
]

export const Default: Story = {
  render: () => {
    const Demo = () => {
      const [opens, setOpens] = useState<Record<string, boolean>>({})
      return (
        <SelectGroup
          selects={sampleSelects}
          renderSelect={(select, onItemClick, visible) => (
            <SelectGroupCell
              key={select.id}
              label={visible ? select.label : undefined}
              icon={select.icon}
              open={opens[select.id]}
              onClick={() => {
                setOpens((prev) => ({ ...prev, [select.id]: !prev[select.id] }))
                onItemClick()
              }}
            />
          )}
        />
      )
    }
    return <Demo />
  },
}

export const SingleSelect: Story = {
  render: () => (
    <SelectGroup
      selects={[{ id: 'lang', label: 'English', icon: 'xp-earth' }]}
      renderSelect={(select, _onItemClick, visible) => (
        <SelectGroupCell
          label={visible ? select.label : undefined}
          icon={select.icon}
        />
      )}
    />
  ),
}

export const CellVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: '#666' }}>With label and icon</p>
        <SelectGroupCell label="English" icon="xp-earth" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: '#666' }}>Icon only (ellipsis mode)</p>
        <SelectGroupCell icon="xp-ellipsis" ellipsis />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: '#666' }}>Selection disabled</p>
        <SelectGroupCell label="Read only" icon="xp-lock" selectionDisabled />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: '#666' }}>With tooltip</p>
        <SelectGroupCell label="Hover me" icon="xp-i-circle" tooltipText="Additional information" />
      </div>
    </div>
  ),
}
