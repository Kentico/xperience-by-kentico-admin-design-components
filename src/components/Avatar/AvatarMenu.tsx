import * as React from 'react';
import { useRef, useState, type FC } from 'react'
import { cn } from '@/lib/cn'
import { useMediaBreakpoints } from '@/hooks'
import { AvatarButton, AvatarSize } from '@/components/AvatarButton'
import { DropDownActionMenu, DropDownPlacement } from '@/components/DropDownActionMenu'
import { MenuItem } from '@/components/MenuItem'
import { Icon } from '@/components/Icon'
import { VersionDialog } from '@/components/VersionDialog'
import type { AvatarMenuProps } from './Avatar.types'
import './Avatar.css'

/**
 * AvatarMenu component with dropdown menu for user actions.
 * Displays profile, about (on mobile), and sign out options.
 */
export const AvatarMenu: FC<AvatarMenuProps> = ({
  userProfile,
  menuPlacement = DropDownPlacement.BottomEnd,
  menuOpen,
  setMenuOpen,
  size = AvatarSize.M,
  renderTrigger,
  onProfileClick,
  onSignOut,
  className,
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [versionDialogOpen, setVersionDialogOpen] = useState(false)
  const { isMobile } = useMediaBreakpoints()

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleCloseMenu = () => {
    setMenuOpen(false)
  }

  const handleProfile = () => {
    handleCloseMenu()
    onProfileClick?.()
  }

  const handleAbout = () => {
    handleCloseMenu()
    setVersionDialogOpen(true)
  }

  const handleSignOut = () => {
    handleCloseMenu()
    onSignOut?.()
  }

  const avatarProps = {
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    username: userProfile.username,
    imageUrl: userProfile.imageUrl,
  }

  return (
    <div className={cn('Avatar-avatarMenu', className)}>
      {renderTrigger ? (
        renderTrigger({
          ref: triggerRef,
          onClick: handleToggleMenu,
          isActive: menuOpen,
          avatarProps,
        })
      ) : (
        <AvatarButton
          ref={triggerRef}
          {...avatarProps}
          size={size}
          onClick={handleToggleMenu}
          isActive={menuOpen}
          ariaLabel="User menu"
        />
      )}

      <DropDownActionMenu
        isOpen={menuOpen}
        onClose={handleCloseMenu}
        triggerRef={triggerRef}
        placement={menuPlacement}
        minWidth={180}
      >
        <MenuItem
          icon={<Icon name="xp-user" size="s" />}
          label="Profile"
          onClick={handleProfile}
        />
        {isMobile && (
          <MenuItem
            icon={<Icon name="xp-i-circle" size="s" />}
            label="About"
            onClick={handleAbout}
          />
        )}
        <hr />
        <MenuItem
          icon={<Icon name="xp-arrow-leave-square" size="s" />}
          label="Sign out"
          onClick={handleSignOut}
        />
      </DropDownActionMenu>

      {versionDialogOpen ? (
        <VersionDialog
          onClose={() => setVersionDialogOpen(false)}
        />
      ) : null}
    </div>
  )
}

AvatarMenu.displayName = 'AvatarMenu'
