import * as React from 'react';
import { useState, useRef, useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DropDownActionMenu, DropDownPlacement } from './index'
import { MenuItem } from '../MenuItem'
import { Icon } from '../Icon'

const meta = {
  title: 'Navigation/DropDownActionMenu',
  component: DropDownActionMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placement: {
      control: 'select',
      options: Object.values(DropDownPlacement),
      description: 'Menu placement relative to trigger',
    },
    minWidth: {
      control: 'number',
      description: 'Minimum width in pixels',
    },
    maxContentHeight: {
      control: 'text',
      description: 'Maximum content height (CSS value)',
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

/* ------------------------------------------------------------------ */
/*  Helper: Interactive dropdown wrapper (Controlled Mode)             */
/* ------------------------------------------------------------------ */

interface DropDownDemoProps {
  placement?: DropDownPlacement
  minWidth?: number
  maxContentHeight?: string
  buttonLabel?: string
  menuItems?: React.ReactNode
}

const DropDownDemo = ({
  placement = DropDownPlacement.BottomEnd,
  minWidth,
  maxContentHeight,
  buttonLabel = 'Open Menu',
  menuItems,
}: DropDownDemoProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const onClose = useCallback(() => setIsOpen(false), [])

  const defaultItems = (
    <>
      <MenuItem
        primaryLabel="Edit"
        leadingElement={{ type: 'icon', element: <Icon name="edit" /> }}
        onClick={() => {
          alert('Edit clicked')
          onClose()
        }}
      />
      <MenuItem
        primaryLabel="Duplicate"
        leadingElement={{ type: 'icon', element: <Icon name="doc-copy" /> }}
        onClick={() => {
          alert('Duplicate clicked')
          onClose()
        }}
      />
      <MenuItem
        primaryLabel="Delete"
        leadingElement={{ type: 'icon', element: <Icon name="bin" /> }}
        destructive
        onClick={() => {
          alert('Delete clicked')
          onClose()
        }}
      />
    </>
  )

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
        {buttonLabel}
      </button>
      <DropDownActionMenu
        isOpen={isOpen}
        onClose={onClose}
        triggerRef={triggerRef}
        placement={placement}
        minWidth={minWidth}
        maxContentHeight={maxContentHeight}
      >
        {menuItems ?? defaultItems}
      </DropDownActionMenu>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => <DropDownDemo />,
}

export const BottomStart: Story = {
  render: () => (
    <DropDownDemo
      placement={DropDownPlacement.BottomStart}
      buttonLabel="Bottom Start"
    />
  ),
}

export const BottomEnd: Story = {
  render: () => (
    <DropDownDemo
      placement={DropDownPlacement.BottomEnd}
      buttonLabel="Bottom End"
    />
  ),
}

export const TopStart: Story = {
  render: () => (
    <DropDownDemo
      placement={DropDownPlacement.TopStart}
      buttonLabel="Top Start"
    />
  ),
}

export const TopEnd: Story = {
  render: () => (
    <DropDownDemo
      placement={DropDownPlacement.TopEnd}
      buttonLabel="Top End"
    />
  ),
}

export const LeftStart: Story = {
  render: () => (
    <DropDownDemo
      placement={DropDownPlacement.LeftStart}
      buttonLabel="Left Start"
    />
  ),
}

export const RightEnd: Story = {
  render: () => (
    <DropDownDemo
      placement={DropDownPlacement.RightEnd}
      buttonLabel="Right End"
    />
  ),
}

export const AllPlacements: Story = {
  render: () => {
    const placements = Object.entries(DropDownPlacement) as [string, DropDownPlacement][]

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          padding: 100,
        }}
      >
        {placements.map(([name, placement]) => (
          <DropDownDemo
            key={name}
            placement={placement}
            buttonLabel={name}
          />
        ))}
      </div>
    )
  },
}

export const WithIcons: Story = {
  render: () => (
    <DropDownDemo
      buttonLabel="Actions"
      menuItems={
        <>
          <MenuItem
            primaryLabel="View Details"
            leadingElement={{ type: 'icon', element: <Icon name="eye" /> }}
            onClick={() => alert('View')}
          />
          <MenuItem
            primaryLabel="Edit Item"
            leadingElement={{ type: 'icon', element: <Icon name="edit" /> }}
            onClick={() => alert('Edit')}
          />
          <MenuItem
            primaryLabel="Share"
            leadingElement={{ type: 'icon', element: <Icon name="paper-plane" /> }}
            onClick={() => alert('Share')}
          />
          <MenuItem
            primaryLabel="Download"
            leadingElement={{ type: 'icon', element: <Icon name="arrow-down-line" /> }}
            onClick={() => alert('Download')}
          />
        </>
      }
    />
  ),
}

export const WithSecondaryLabels: Story = {
  render: () => (
    <DropDownDemo
      minWidth={250}
      buttonLabel="User Actions"
      menuItems={
        <>
          <MenuItem
            primaryLabel="Edit Profile"
            secondaryLabel="Change your display name and avatar"
            leadingElement={{ type: 'icon', element: <Icon name="user" /> }}
            onClick={() => alert('Edit profile')}
          />
          <MenuItem
            primaryLabel="Settings"
            secondaryLabel="Manage your preferences"
            leadingElement={{ type: 'icon', element: <Icon name="cogwheel" /> }}
            onClick={() => alert('Settings')}
          />
          <MenuItem
            primaryLabel="Sign Out"
            secondaryLabel="Log out of your account"
            leadingElement={{ type: 'icon', element: <Icon name="arrow-leave-square" /> }}
            destructive
            onClick={() => alert('Sign out')}
          />
        </>
      }
    />
  ),
}

export const WithCustomWidth: Story = {
  render: () => (
    <DropDownDemo
      minWidth={300}
      buttonLabel="Wide Menu"
      menuItems={
        <>
          <MenuItem
            primaryLabel="This is a menu item with longer text"
            onClick={() => alert('Item 1')}
          />
          <MenuItem
            primaryLabel="Another item"
            onClick={() => alert('Item 2')}
          />
          <MenuItem
            primaryLabel="One more"
            onClick={() => alert('Item 3')}
          />
        </>
      }
    />
  ),
}

export const WithMaxHeight: Story = {
  render: () => (
    <DropDownDemo
      maxContentHeight="200px"
      buttonLabel="Scrollable Menu"
      menuItems={
        <>
          {Array.from({ length: 15 }, (_, i) => (
            <MenuItem
              key={i}
              primaryLabel={`Menu Item ${i + 1}`}
              onClick={() => alert(`Item ${i + 1}`)}
            />
          ))}
        </>
      }
    />
  ),
}

export const DisabledItems: Story = {
  render: () => (
    <DropDownDemo
      buttonLabel="With Disabled"
      menuItems={
        <>
          <MenuItem
            primaryLabel="Available Action"
            leadingElement={{ type: 'icon', element: <Icon name="check-circle" /> }}
            onClick={() => alert('Available')}
          />
          <MenuItem
            primaryLabel="Disabled Action"
            leadingElement={{ type: 'icon', element: <Icon name="ban-sign" /> }}
            disabled
          />
          <MenuItem
            primaryLabel="Another Available"
            leadingElement={{ type: 'icon', element: <Icon name="check-circle" /> }}
            onClick={() => alert('Another')}
          />
        </>
      }
    />
  ),
}

export const UncontrolledWithRenderTrigger: Story = {
  render: () => (
    <div style={{ padding: 100 }}>
      <DropDownActionMenu
        placement={DropDownPlacement.BottomEnd}
        renderTrigger={(ref, onClick) => (
          <button
            ref={ref as React.RefObject<HTMLButtonElement>}
            onClick={onClick}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#fff',
            }}
          >
            Uncontrolled Menu
          </button>
        )}
      >
        <MenuItem
          primaryLabel="Uncontrolled Item 1"
          onClick={() => alert('Item 1')}
        />
        <MenuItem
          primaryLabel="Uncontrolled Item 2"
          onClick={() => alert('Item 2')}
        />
        <MenuItem
          primaryLabel="Uncontrolled Item 3"
          onClick={() => alert('Item 3')}
        />
      </DropDownActionMenu>
    </div>
  ),
}

export const WithOnToggle: Story = {
  render: () => {
    const WithOnToggleDemo = () => {
      const [isOpen, setIsOpen] = useState(false)
      const triggerRef = useRef<HTMLButtonElement>(null)

      return (
        <div style={{ padding: 100 }}>
          <p style={{ marginBottom: 16 }}>
            Menu is: <strong>{isOpen ? 'Open' : 'Closed'}</strong>
          </p>
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
            Toggle Menu
          </button>
          <DropDownActionMenu
            isOpen={isOpen}
            onToggle={setIsOpen}
            triggerRef={triggerRef}
            placement={DropDownPlacement.BottomEnd}
          >
            <MenuItem
              primaryLabel="Action 1"
              onClick={() => {
                alert('Action 1')
                setIsOpen(false)
              }}
            />
            <MenuItem
              primaryLabel="Action 2"
              onClick={() => {
                alert('Action 2')
                setIsOpen(false)
              }}
            />
          </DropDownActionMenu>
        </div>
      )
    }

    return <WithOnToggleDemo />
  },
}
