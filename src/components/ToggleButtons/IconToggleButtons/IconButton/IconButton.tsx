import * as React from 'react';
import { type ForwardedRef, forwardRef } from 'react'
import classNames from 'classnames'
import { Icon } from '@/components/Icon'
import { ToggleButtonBase } from '../../Shared/ToggleButtonBase'
import { ToggleButtonBaseTypes } from '../../Shared/ToggleButtonBase/ToggleButtonBase.types'
import type { IconButtonProps } from './IconButton.types'
import './IconButton.css'

export const IconButton = forwardRef(
  ({ icon, isSelected, ...props }: IconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const classes = classNames('IconButton-iconToggleButton', isSelected && 'IconButton-selected')

    return (
      <ToggleButtonBase
        className={classes}
        isSelected={isSelected}
        type={ToggleButtonBaseTypes.Icon}
        ref={ref}
        {...props}
      >
        <Icon name={icon} size="s" />
      </ToggleButtonBase>
    )
  },
)

IconButton.displayName = 'IconButton'
