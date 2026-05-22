import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { DropDownOnClick } from './DropDownOnClick'
import { DropDownOnHover } from './DropDownOnHover'
import { DropDownPlacement } from './DropDown.types'
import { Button, ButtonColor } from '@/components/Button'
import { MenuItem } from '@/components/MenuItem'

const meta = {
  title: 'Navigation/DropDown',
  component: DropDownOnClick,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DropDownOnClick>

export default meta
type Story = StoryObj

const menuItems = (
  <>
    <MenuItem primaryLabel="Edit" />
    <MenuItem primaryLabel="Duplicate" />
    <MenuItem primaryLabel="Archive" />
    <MenuItem primaryLabel="Delete" />
  </>
)

export const OnClick: Story = {
  render: () => (
    <DropDownOnClick
      renderTrigger={(ref, toggle) => (
        <Button ref={ref as React.RefObject<HTMLButtonElement>} onClick={toggle}>
          Click me
        </Button>
      )}
      placement={DropDownPlacement.BottomStart}
    >
      {menuItems}
    </DropDownOnClick>
  ),
}

export const OnHover: Story = {
  render: () => (
    <DropDownOnHover
      renderTrigger={(ref, _toggle) => (
        <Button ref={ref as React.RefObject<HTMLButtonElement>} color={ButtonColor.Secondary}>
          Hover me
        </Button>
      )}
      placement={DropDownPlacement.BottomStart}
      hideDelay={200}
    >
      {menuItems}
    </DropDownOnHover>
  ),
}

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, padding: 100 }}>
      {(['bottom-start', 'bottom-end', 'top-start', 'right'] as DropDownPlacement[]).map(
        (placement) => (
          <DropDownOnClick
            key={placement}
            renderTrigger={(ref, toggle) => (
              <Button
                ref={ref as React.RefObject<HTMLButtonElement>}
                color={ButtonColor.Secondary}
                onClick={toggle}
              >
                {placement}
              </Button>
            )}
            placement={placement}
          >
            {menuItems}
          </DropDownOnClick>
        )
      )}
    </div>
  ),
}

export const CloseOnContentClick: Story = {
  render: () => (
    <DropDownOnClick
      renderTrigger={(ref, toggle) => (
        <Button ref={ref as React.RefObject<HTMLButtonElement>} onClick={toggle}>
          Closes on item click
        </Button>
      )}
      closeOnContentClick
    >
      {menuItems}
    </DropDownOnClick>
  ),
}

export const WithMaxHeight: Story = {
  render: () => (
    <DropDownOnClick
      renderTrigger={(ref, toggle) => (
        <Button ref={ref as React.RefObject<HTMLButtonElement>} onClick={toggle}>
          Scrollable dropdown
        </Button>
      )}
      maxHeight="150px"
    >
      {Array.from({ length: 10 }, (_, i) => (
        <MenuItem key={i} primaryLabel={`Item ${i + 1}`} />
      ))}
    </DropDownOnClick>
  ),
}
