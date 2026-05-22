import * as React from 'react';
import { forwardRef, type ForwardedRef } from 'react'
import classNames from 'classnames'
import { Divider, DividerOrientation } from '@/components/Divider'
import type { ActionMenuDividerProps } from './ActionMenuDivider.types'
import './ActionMenuDivider.css'

export const ActionMenuDivider = forwardRef(
  (
    { orientation = DividerOrientation.Horizontal }: ActionMenuDividerProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const classes = classNames(
      'ActionMenuDivider',
      orientation === DividerOrientation.Horizontal
        ? 'ActionMenuDivider-horizontal'
        : 'ActionMenuDivider-vertical'
    )

    return (
      <div ref={ref} className={classes}>
        <Divider orientation={orientation} />
      </div>
    )
  }
)

ActionMenuDivider.displayName = 'ActionMenuDivider'
