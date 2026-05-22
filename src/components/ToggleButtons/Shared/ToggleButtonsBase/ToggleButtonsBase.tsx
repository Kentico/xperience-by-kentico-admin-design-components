import * as React from 'react';
import { type ForwardedRef, forwardRef } from 'react'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import type { ToggleButtonsBaseProps } from './ToggleButtonsBase.types'
import './ToggleButtonsBase.css'

export const ToggleButtonsBase = forwardRef(
  ({ children, ...props }: ToggleButtonsBaseProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className={'ToggleButtonsBase-toggleButtons'} {...getDataAndAccessibilityProps(props)}>
        {children}
      </div>
    )
  },
)

ToggleButtonsBase.displayName = 'ToggleButtonsBase'
