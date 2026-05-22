import * as React from 'react';
import { forwardRef } from 'react'
import { Button } from 'react-aria-components'
import { Icon } from '@/components/Icon'
import type { ButtonIconProps } from './ButtonIcon.types'
import './ButtonIcon.css'

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ icon, 'aria-label': ariaLabel, isDisabled = false, onPress, slot }, ref) => {
    return (
      <Button
        ref={ref}
        slot={slot}
        className={'ButtonIcon'}
        isDisabled={isDisabled}
        onPress={onPress}
        aria-label={ariaLabel}
      >
        <span className={'ButtonIcon-iconWrapper'} aria-hidden="true">
          <Icon name={icon} size="s" />
        </span>
      </Button>
    )
  },
)

ButtonIcon.displayName = 'DateTimeInputButtonIcon'
