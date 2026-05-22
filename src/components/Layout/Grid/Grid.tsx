import * as React from 'react';
import { forwardRef, type CSSProperties, type ForwardedRef } from 'react'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import type { GridProps } from './Grid.types'

export const Grid = forwardRef(
  (
    {
      children,
      cols,
      rowGap,
      columnGap,
      className,
      ...props
    }: GridProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const containerStyle: CSSProperties = {
      display: 'grid',
      rowGap: `${rowGap}`,
      columnGap: `${columnGap}`,
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
    }

    return (
      <div
        style={containerStyle}
        ref={ref}
        className={className}
        {...getDataAndAccessibilityProps(props)}
      >
        {children}
      </div>
    )
  }
)

Grid.displayName = 'Grid'
