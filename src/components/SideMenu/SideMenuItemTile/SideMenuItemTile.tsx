import * as React from 'react';
import { forwardRef } from 'react'
import { useFocusRing } from '@react-aria/focus'
import classNames from 'classnames'
import { Icon } from '@/components/Icon'
import { SideMenuItemState, type SideMenuItemTileProps } from './SideMenuItemTile.types'
import './SideMenuItemTile.css'

export const SideMenuItemTile = forwardRef<HTMLButtonElement, SideMenuItemTileProps>(
  (
    {
      label,
      iconName,
      state = SideMenuItemState.Default,
      onClick,
      testId,
      className,
    },
    ref
  ) => {
    const { isFocusVisible, focusProps } = useFocusRing()

    const isDisabled = state === SideMenuItemState.Disabled
    const isSelected = state === SideMenuItemState.Selected

    const tileClasses = classNames(
      'SideMenuItemTile-tile',
      state === SideMenuItemState.Default && 'SideMenuItemTile-default',
      isDisabled && 'SideMenuItemTile-disabled',
      isSelected && 'SideMenuItemTile-selected',
      isFocusVisible && 'SideMenuItemTile-focused',
      className
    )

    const iconClasses = classNames(
      'SideMenuItemTile-icon',
      state === SideMenuItemState.Default && 'SideMenuItemTile-iconDefault',
      isDisabled && 'SideMenuItemTile-iconDisabled',
      isSelected && 'SideMenuItemTile-iconSelected'
    )

    return (
      <button
        ref={ref}
        className={tileClasses}
        onClick={isDisabled ? undefined : onClick}
        disabled={isDisabled}
        aria-label={label}
        aria-disabled={isDisabled}
        data-testid={testId}
        type="button"
        {...focusProps}
      >
        <div className={iconClasses}>
          <Icon name={iconName} size="l" />
        </div>
        <span className={'SideMenuItemTile-label'}>{label}</span>
      </button>
    )
  }
)

SideMenuItemTile.displayName = 'SideMenuItemTile'
