import * as React from 'react';
import { forwardRef, type ForwardedRef } from 'react'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import type { BoxProps } from './Box.types'

export const Box = forwardRef(
  (
    {
      children,
      spacing,
      spacingTop,
      spacingBottom,
      spacingLeft,
      spacingRight,
      spacingX,
      spacingY,
      className,
      ...props
    }: BoxProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const sTop = spacingTop ?? spacingY ?? spacing
    const sRight = spacingRight ?? spacingX ?? spacing
    const sBottom = spacingBottom ?? spacingY ?? spacing
    const sLeft = spacingLeft ?? spacingX ?? spacing

    const style =
      sTop || sRight || sBottom || sLeft
        ? {
            padding: `${sTop ?? 0} ${sRight ?? 0} ${sBottom ?? 0} ${sLeft ?? 0}`,
          }
        : {}

    return (
      <div
        style={style}
        className={className}
        ref={ref}
        {...getDataAndAccessibilityProps(props)}
      >
        {children}
      </div>
    )
  }
)

Box.displayName = 'Box'
