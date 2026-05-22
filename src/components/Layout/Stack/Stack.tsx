import * as React from 'react';
import { forwardRef, type CSSProperties, type ForwardedRef } from 'react'
import classNames from 'classnames'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { LayoutAlignment } from '../Layout.types'
import type { StackProps } from './Stack.types'
import './Stack.css'

export const Stack = forwardRef(
  (
    {
      children,
      align,
      spacing,
      className,
      fullHeight,
      ...props
    }: StackProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const sp = spacing ?? 0
    const style = {
      display: 'flex',
      flexDirection: 'column',
      '--kxp-stack-component-spacing-top': sp,
      alignItems:
        !align || align === LayoutAlignment.Start ? 'stretch' : align,
    } as CSSProperties

    const stackClasses = classNames(
      className,
      'Stack',
      fullHeight && 'Stack-fullHeight'
    )

    return (
      <div
        style={style}
        className={stackClasses}
        ref={ref}
        {...getDataAndAccessibilityProps(props)}
      >
        {children}
      </div>
    )
  }
)

Stack.displayName = 'Stack'
