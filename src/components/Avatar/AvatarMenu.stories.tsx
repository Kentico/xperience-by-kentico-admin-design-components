import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { AvatarMenu } from './AvatarMenu'
import type { UserProfile } from './Avatar.types'
import { AvatarSize } from '@/components/AvatarButton'
import { DropDownPlacement } from '@/components/DropDownActionMenu'

const sizes = [
  AvatarSize.XS,
  AvatarSize.S,
  AvatarSize.M,
  AvatarSize.L,
] as const

const placements = [
  DropDownPlacement.BottomEnd,
  DropDownPlacement.BottomStart,
  DropDownPlacement.TopEnd,
  DropDownPlacement.TopStart,
] as const

const sampleUserProfile: UserProfile = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
}

const userWithImage: UserProfile = {
  firstName: 'Jane',
  lastName: 'Smith',
  username: 'janesmith',
  email: 'jane.smith@example.com',
  imageUrl: 'https://i.pravatar.cc/150?u=jane',
}

/**
 * Controlled wrapper for AvatarMenu stories
 */
const AvatarMenuWrapper = ({
  userProfile,
  menuPlacement,
  size,
  onProfileClick,
  onSignOut,
}: {
  userProfile: UserProfile
  menuPlacement?: DropDownPlacement
  size?: AvatarSize
  onProfileClick?: () => void
  onSignOut?: () => void
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <AvatarMenu
      userProfile={userProfile}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      menuPlacement={menuPlacement}
      size={size}
      onProfileClick={onProfileClick}
      onSignOut={onSignOut}
    />
  )
}

const meta = {
  title: 'Navigation/AvatarMenu',
  component: AvatarMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    menuPlacement: {
      control: 'select',
      options: Object.values(DropDownPlacement),
    },
    size: {
      control: 'select',
      options: Object.values(AvatarSize),
    },
  },
  args: {
    onProfileClick: fn(),
    onSignOut: fn(),
  },
} satisfies Meta<typeof AvatarMenu>

export default meta
type Story = StoryObj<typeof AvatarMenu>

export const Default: Story = {
  render: (args) => (
    <AvatarMenuWrapper
      userProfile={sampleUserProfile}
      menuPlacement={args.menuPlacement}
      size={args.size}
      onProfileClick={args.onProfileClick}
      onSignOut={args.onSignOut}
    />
  ),
  args: {
    userProfile: sampleUserProfile,
    menuOpen: false,
    setMenuOpen: fn(),
    menuPlacement: DropDownPlacement.BottomEnd,
    size: AvatarSize.M,
  },
}

export const WithImage: Story = {
  render: (args) => (
    <AvatarMenuWrapper
      userProfile={userWithImage}
      menuPlacement={args.menuPlacement}
      size={args.size}
      onProfileClick={args.onProfileClick}
      onSignOut={args.onSignOut}
    />
  ),
  args: {
    userProfile: userWithImage,
    menuOpen: false,
    setMenuOpen: fn(),
    menuPlacement: DropDownPlacement.BottomEnd,
    size: AvatarSize.M,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {sizes.map((size) => (
        <AvatarMenuWrapper
          key={size}
          userProfile={sampleUserProfile}
          size={size}
        />
      ))}
    </div>
  ),
}

export const MenuPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, padding: 100 }}>
      {placements.map((placement) => (
        <div key={placement} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#666' }}>{placement}</span>
          <AvatarMenuWrapper
            userProfile={sampleUserProfile}
            menuPlacement={placement}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}
