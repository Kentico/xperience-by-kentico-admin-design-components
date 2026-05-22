import * as React from 'react';
import { forwardRef, type ForwardedRef } from 'react'
import { Divider, DividerOrientation } from '@/components/Divider'
import type { SubheaderDividerProps } from './SubheaderDivider.types'
import './SubheaderDivider.css'

export const SubheaderDivider = forwardRef(
  ({ text, ...props }: SubheaderDividerProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className={'SubheaderDivider'}>
        <span>{text}</span>
        <div className={'SubheaderDivider-dividerWrapper'}>
          <Divider
            orientation={DividerOrientation.Horizontal}
            isSubheaderDivider
            {...props}
          />
        </div>
      </div>
    )
  }
)

SubheaderDivider.displayName = 'SubheaderDivider'
