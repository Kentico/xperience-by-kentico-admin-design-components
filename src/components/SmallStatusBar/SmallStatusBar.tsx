import * as React from 'react';
import { useState, type FC } from 'react'
import { cn } from '@/lib/cn'
import { Paper, PaperElevation } from '@/components/Paper'
import { Cell } from '@/components/Cell'
import { Icon } from '@/components/Icon'
import { AvatarMenu } from '@/components/Avatar'
import { AvatarButton, AvatarSize } from '@/components/AvatarButton'
import { DropDownPlacement } from '@/components/DropDownActionMenu'
import { LanguageSelectorPlaceholder } from '@/components/Placeholders'
import type { SmallStatusBarProps } from './SmallStatusBar.types'
import './SmallStatusBar.css'

/**
 * A mobile status bar with logo, language selector, and user avatar.
 */
export const SmallStatusBar: FC<SmallStatusBarProps> = ({
  userProfile,
  onProfileClick,
  onSignOut,
  className,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Paper
      elevation={PaperElevation.Small}
      className={cn('SmallStatusBar-statusBar', className)}
    >
      <Cell link="/" ariaLabel="Home">
        <div className={'SmallStatusBar-logo'}>
          <Icon name="xp-kentico" size="l" />
        </div>
      </Cell>

      <LanguageSelectorPlaceholder />

      <AvatarMenu
        userProfile={userProfile}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        menuPlacement={DropDownPlacement.BottomEnd}
        size={AvatarSize.XS}
        onProfileClick={onProfileClick}
        onSignOut={onSignOut}
        renderTrigger={({ ref, onClick, isActive, avatarProps }) => (
          <Cell
            ref={ref}
            onClick={onClick}
            active={isActive}
            ariaLabel="User menu"
          >
            <AvatarButton
              {...avatarProps}
              size={AvatarSize.XS}
              shadow={false}
              disabled
            />
          </Cell>
        )}
      />
    </Paper>
  )
}

SmallStatusBar.displayName = 'SmallStatusBar'
