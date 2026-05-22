import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SideMenu, SideMenuItemTile, SideMenuItemState } from './index'

const meta = {
  title: 'Navigation/SideMenu',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta
type Story = StoryObj

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => (
    <SideMenu>
      <SideMenuItemTile label="Content" iconName="xp-doc" />
      <SideMenuItemTile label="Assets" iconName="folder" />
      <SideMenuItemTile label="Users" iconName="xp-user" />
      <SideMenuItemTile label="Settings" iconName="cogwheel" />
    </SideMenu>
  ),
}

export const WithSelectedItem: Story = {
  render: () => (
    <SideMenu>
      <SideMenuItemTile label="Content" iconName="xp-doc" state={SideMenuItemState.Selected} />
      <SideMenuItemTile label="Assets" iconName="folder" />
      <SideMenuItemTile label="Users" iconName="xp-user" />
      <SideMenuItemTile label="Settings" iconName="cogwheel" />
    </SideMenu>
  ),
}

export const AllStates: Story = {
  render: () => (
    <SideMenu>
      <SideMenuItemTile label="Default" iconName="xp-doc" state={SideMenuItemState.Default} />
      <SideMenuItemTile label="Selected" iconName="folder" state={SideMenuItemState.Selected} />
      <SideMenuItemTile label="Disabled" iconName="cogwheel" state={SideMenuItemState.Disabled} />
    </SideMenu>
  ),
}

export const Interactive: Story = {
  render: () => {
    const InteractiveDemo = () => {
      const [activeItem, setActiveItem] = useState('content')

      const items = [
        { id: 'content', label: 'Content', icon: 'xp-doc' },
        { id: 'assets', label: 'Assets', icon: 'folder' },
        { id: 'users', label: 'Users', icon: 'xp-user' },
        { id: 'analytics', label: 'Analytics', icon: 'graph' },
        { id: 'settings', label: 'Settings', icon: 'cogwheel' },
      ]

      return (
        <SideMenu>
          {items.map((item) => (
            <SideMenuItemTile
              key={item.id}
              label={item.label}
              iconName={item.icon}
              state={activeItem === item.id ? SideMenuItemState.Selected : SideMenuItemState.Default}
              onClick={() => setActiveItem(item.id)}
            />
          ))}
        </SideMenu>
      )
    }

    return <InteractiveDemo />
  },
}

export const WithDisabledItems: Story = {
  render: () => (
    <SideMenu>
      <SideMenuItemTile label="Content" iconName="xp-doc" state={SideMenuItemState.Selected} />
      <SideMenuItemTile label="Assets" iconName="folder" />
      <SideMenuItemTile label="Users" iconName="xp-user" state={SideMenuItemState.Disabled} />
      <SideMenuItemTile label="Analytics" iconName="graph" state={SideMenuItemState.Disabled} />
      <SideMenuItemTile label="Settings" iconName="cogwheel" />
    </SideMenu>
  ),
}

export const ManyItems: Story = {
  render: () => (
    <SideMenu>
      <SideMenuItemTile label="Home" iconName="home" state={SideMenuItemState.Selected} />
      <SideMenuItemTile label="Content" iconName="xp-doc" />
      <SideMenuItemTile label="Assets" iconName="folder" />
      <SideMenuItemTile label="Users" iconName="xp-user" />
      <SideMenuItemTile label="Roles" iconName="xp-users" />
      <SideMenuItemTile label="Emails" iconName="message" />
      <SideMenuItemTile label="Forms" iconName="xp-form" />
      <SideMenuItemTile label="Analytics" iconName="graph" />
      <SideMenuItemTile label="Settings" iconName="cogwheel" />
    </SideMenu>
  ),
}
