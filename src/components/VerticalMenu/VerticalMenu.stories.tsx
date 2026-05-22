import * as React from 'react';
import { useState, useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  VerticalMenu,
  VerticalMenuSize,
  ActionMenu,
  ActionMenuHeadline,
  SelectMenu,
  DropDownActionMenu,
  DropDownSelectMenu,
  MenuDropDown,
} from './index'
import { MenuItem } from '../MenuItem'
import { Icon } from '../Icon'

const meta = {
  title: 'Navigation/VerticalMenu',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta
type Story = StoryObj

/* ------------------------------------------------------------------ */
/*  VerticalMenu (base) Stories                                        */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => (
    <VerticalMenu>
      <MenuItem primaryLabel="Dashboard" leadingElement={{ type: 'icon', element: <Icon name="home" /> }} />
      <MenuItem primaryLabel="Content" leadingElement={{ type: 'icon', element: <Icon name="xp-doc" /> }} />
      <MenuItem primaryLabel="Assets" leadingElement={{ type: 'icon', element: <Icon name="folder" /> }} />
      <MenuItem primaryLabel="Settings" leadingElement={{ type: 'icon', element: <Icon name="cogwheel" /> }} />
    </VerticalMenu>
  ),
}

export const CompactSize: Story = {
  render: () => (
    <VerticalMenu size={VerticalMenuSize.Compact}>
      <MenuItem primaryLabel="Edit" leadingElement={{ type: 'icon', element: <Icon name="edit" /> }} />
      <MenuItem primaryLabel="Duplicate" leadingElement={{ type: 'icon', element: <Icon name="doc-copy" /> }} />
      <MenuItem primaryLabel="Delete" leadingElement={{ type: 'icon', element: <Icon name="bin" /> }} destructive />
    </VerticalMenu>
  ),
}

export const WithHeaderAndFooter: Story = {
  render: () => (
    <VerticalMenu
      header={<div style={{ padding: '8px 16px', fontWeight: 600 }}>Navigation</div>}
      footer={<div style={{ padding: '8px 16px', fontSize: 12, color: '#999' }}>3 items</div>}
    >
      <MenuItem primaryLabel="Home" />
      <MenuItem primaryLabel="About" />
      <MenuItem primaryLabel="Contact" />
    </VerticalMenu>
  ),
}

export const Bordered: Story = {
  render: () => (
    <VerticalMenu bordered elevated={false}>
      <MenuItem primaryLabel="Option A" />
      <MenuItem primaryLabel="Option B" />
      <MenuItem primaryLabel="Option C" />
    </VerticalMenu>
  ),
}

export const WithMaxHeight: Story = {
  render: () => (
    <VerticalMenu maxHeight="200px">
      {Array.from({ length: 12 }, (_, i) => (
        <MenuItem key={i} primaryLabel={`Item ${i + 1}`} />
      ))}
    </VerticalMenu>
  ),
}

/* ------------------------------------------------------------------ */
/*  ActionMenu Stories                                                 */
/* ------------------------------------------------------------------ */

export const ActionMenuDefault: Story = {
  render: () => (
    <ActionMenu>
      <MenuItem primaryLabel="Edit" leadingElement={{ type: 'icon', element: <Icon name="edit" /> }} />
      <MenuItem primaryLabel="Duplicate" leadingElement={{ type: 'icon', element: <Icon name="doc-copy" /> }} />
      <MenuItem primaryLabel="Archive" leadingElement={{ type: 'icon', element: <Icon name="xp-box" /> }} />
      <MenuItem primaryLabel="Delete" leadingElement={{ type: 'icon', element: <Icon name="bin" /> }} destructive />
    </ActionMenu>
  ),
}

export const ActionMenuWithHeadlines: Story = {
  render: () => (
    <ActionMenu>
      <ActionMenuHeadline>Content</ActionMenuHeadline>
      <MenuItem primaryLabel="New page" leadingElement={{ type: 'icon', element: <Icon name="xp-doc" /> }} />
      <MenuItem primaryLabel="New folder" leadingElement={{ type: 'icon', element: <Icon name="folder" /> }} />
      <ActionMenuHeadline>Actions</ActionMenuHeadline>
      <MenuItem primaryLabel="Import" leadingElement={{ type: 'icon', element: <Icon name="arrow-down" /> }} />
      <MenuItem primaryLabel="Export" leadingElement={{ type: 'icon', element: <Icon name="arrow-leave-square" /> }} />
    </ActionMenu>
  ),
}

/* ------------------------------------------------------------------ */
/*  SelectMenu Stories                                                 */
/* ------------------------------------------------------------------ */

export const SelectMenuDefault: Story = {
  render: () => {
    const SelectMenuDemo = () => {
      const [selected, setSelected] = useState<string>('en')

      const languages = [
        { id: 'en', label: 'English' },
        { id: 'cs', label: 'Czech' },
        { id: 'de', label: 'German' },
        { id: 'fr', label: 'French' },
      ]

      return (
        <SelectMenu
          header={<div style={{ padding: '8px 16px', fontWeight: 600 }}>Select language</div>}
        >
          {languages.map((lang) => (
            <MenuItem
              key={lang.id}
              primaryLabel={lang.label}
              onClick={() => setSelected(lang.id)}
              leadingElement={
                selected === lang.id
                  ? { type: 'icon', element: <Icon name="check" /> }
                  : { type: 'empty', element: null }
              }
            />
          ))}
        </SelectMenu>
      )
    }

    return <SelectMenuDemo />
  },
}

/* ------------------------------------------------------------------ */
/*  DropDownActionMenu Stories                                         */
/* ------------------------------------------------------------------ */

export const DropDownActionMenuUncontrolled: Story = {
  render: () => (
    <div style={{ padding: 100 }}>
      <DropDownActionMenu
        renderTrigger={(ref, toggle) => (
          <button
            ref={ref as React.RefObject<HTMLButtonElement>}
            onClick={toggle}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#fff',
            }}
          >
            Actions
          </button>
        )}
      >
        <MenuItem primaryLabel="Edit" leadingElement={{ type: 'icon', element: <Icon name="edit" /> }} />
        <MenuItem primaryLabel="Duplicate" leadingElement={{ type: 'icon', element: <Icon name="doc-copy" /> }} />
        <MenuItem primaryLabel="Delete" leadingElement={{ type: 'icon', element: <Icon name="bin" /> }} destructive />
      </DropDownActionMenu>
    </div>
  ),
}

export const DropDownActionMenuControlled: Story = {
  render: () => {
    const ControlledDemo = () => {
      const [isOpen, setIsOpen] = useState(false)
      const triggerRef = useRef<HTMLButtonElement>(null)

      return (
        <div style={{ padding: 100 }}>
          <button
            ref={triggerRef}
            onClick={() => setIsOpen(!isOpen)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#fff',
            }}
          >
            Controlled Actions
          </button>
          <DropDownActionMenu
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            triggerRef={triggerRef}
          >
            <ActionMenuHeadline>Manage</ActionMenuHeadline>
            <MenuItem primaryLabel="Edit" onClick={() => setIsOpen(false)} />
            <MenuItem primaryLabel="Share" onClick={() => setIsOpen(false)} />
            <ActionMenuHeadline>Danger zone</ActionMenuHeadline>
            <MenuItem primaryLabel="Delete" destructive onClick={() => setIsOpen(false)} />
          </DropDownActionMenu>
        </div>
      )
    }

    return <ControlledDemo />
  },
}

/* ------------------------------------------------------------------ */
/*  DropDownSelectMenu Stories                                         */
/* ------------------------------------------------------------------ */

export const DropDownSelectMenuDefault: Story = {
  render: () => {
    const SelectDemo = () => {
      const [selected, setSelected] = useState('list')

      const views = [
        { id: 'list', label: 'List view', icon: 'xp-list' },
        { id: 'grid', label: 'Grid view', icon: 'xp-table' },
        { id: 'kanban', label: 'Kanban view', icon: 'xp-layouts' },
      ]

      return (
        <div style={{ padding: 100 }}>
          <DropDownSelectMenu
            renderTrigger={(ref, toggle) => (
              <button
                ref={ref as React.RefObject<HTMLButtonElement>}
                onClick={toggle}
                style={{
                  padding: '8px 16px',
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  background: '#fff',
                }}
              >
                View: {views.find((v) => v.id === selected)?.label}
              </button>
            )}
            header={<div style={{ padding: '8px 16px', fontWeight: 600 }}>View mode</div>}
          >
            {views.map((view) => (
              <MenuItem
                key={view.id}
                primaryLabel={view.label}
                leadingElement={
                  selected === view.id
                    ? { type: 'icon', element: <Icon name="check" /> }
                    : { type: 'icon', element: <Icon name={view.icon} /> }
                }
                onClick={() => setSelected(view.id)}
              />
            ))}
          </DropDownSelectMenu>
        </div>
      )
    }

    return <SelectDemo />
  },
}

/* ------------------------------------------------------------------ */
/*  MenuDropDown Stories                                                */
/* ------------------------------------------------------------------ */

export const MenuDropDownDefault: Story = {
  render: () => (
    <div style={{ padding: 100 }}>
      <MenuDropDown
        renderTrigger={(ref, toggle) => (
          <button
            ref={ref as React.RefObject<HTMLButtonElement>}
            onClick={toggle}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#fff',
            }}
          >
            Menu
          </button>
        )}
        header={<div style={{ padding: '8px 16px', fontWeight: 600 }}>Quick actions</div>}
        footer={<div style={{ padding: '8px 16px', fontSize: 12, color: '#999' }}>Press Esc to close</div>}
      >
        <MenuItem primaryLabel="New item" leadingElement={{ type: 'icon', element: <Icon name="xp-plus" /> }} />
        <MenuItem primaryLabel="Import" leadingElement={{ type: 'icon', element: <Icon name="arrow-down" /> }} />
        <MenuItem primaryLabel="Export" leadingElement={{ type: 'icon', element: <Icon name="arrow-leave-square" /> }} />
      </MenuDropDown>
    </div>
  ),
}

/* ------------------------------------------------------------------ */
/*  Size Comparison                                                    */
/* ------------------------------------------------------------------ */

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>Default</p>
        <ActionMenu size={VerticalMenuSize.Default}>
          <MenuItem primaryLabel="Edit" />
          <MenuItem primaryLabel="Duplicate" />
          <MenuItem primaryLabel="Delete" destructive />
        </ActionMenu>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>Compact</p>
        <ActionMenu size={VerticalMenuSize.Compact}>
          <MenuItem primaryLabel="Edit" />
          <MenuItem primaryLabel="Duplicate" />
          <MenuItem primaryLabel="Delete" destructive />
        </ActionMenu>
      </div>
    </div>
  ),
}
