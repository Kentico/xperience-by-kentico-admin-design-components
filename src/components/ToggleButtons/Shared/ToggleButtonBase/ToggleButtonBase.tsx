import * as React from 'react';
import { type ForwardedRef, forwardRef } from 'react'
import classNames from 'classnames'
import { useFocusRing } from '@react-aria/focus'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { type ToggleButtonBaseProps, ToggleButtonBaseTypes } from './ToggleButtonBase.types'
import './ToggleButtonBase.css'

export const ToggleButtonBase = forwardRef(
  (
    { className, onClick, children, isSelected, type, ...props }: ToggleButtonBaseProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const { isFocusVisible, focusProps } = useFocusRing()

    const classes = classNames(
      'ToggleButtonBase-toggleButton',
      isFocusVisible && 'ToggleButtonBase-focused',
      isSelected && 'ToggleButtonBase-selected',
      type === ToggleButtonBaseTypes.Name && 'ToggleButtonBase-name',
      className,
    )

    return (
      <button
        className={classes}
        onClick={onClick}
        type="button"
        ref={ref}
        {...focusProps}
        {...getDataAndAccessibilityProps(props)}
      >
        {children}
      </button>
    )
  },
)

ToggleButtonBase.displayName = 'ToggleButtonBase'
