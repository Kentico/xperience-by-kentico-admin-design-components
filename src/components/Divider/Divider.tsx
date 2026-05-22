import * as React from 'react';
import { forwardRef, type ForwardedRef } from 'react'
import classNames from 'classnames'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { DividerOrientation, type DividerProps } from './Divider.types'
import './Divider.css'

export const Divider = forwardRef(
  (
    { orientation, isSubheaderDivider, ...props }: DividerProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const classes = classNames(
      isSubheaderDivider ? 'Divider-subheaderDivider' : 'Divider',
      orientation === DividerOrientation.Horizontal
        ? 'Divider-horizontal'
        : 'Divider-vertical'
    )

    return (
      <div
        ref={ref}
        className={classes}
        {...getDataAndAccessibilityProps(props)}
      />
    )
  }
)

Divider.displayName = 'Divider'
