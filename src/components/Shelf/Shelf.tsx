import * as React from 'react';
import { forwardRef, type ForwardedRef } from 'react'
import classNames from 'classnames'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { ShelfStickyPosition, type ShelfProps } from './Shelf.types'
import './Shelf.css'

export const Shelf = forwardRef(
  (
    {
      sticky,
      children,
      onPaper,
      fullHeight,
      className,
      ...props
    }: ShelfProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const shelfClasses = classNames(
      className,
      'Shelf',
      sticky === ShelfStickyPosition.Left && 'Shelf-stickyLeft',
      sticky === ShelfStickyPosition.Right && 'Shelf-stickyRight',
      onPaper && 'Shelf-onPaper',
      fullHeight && 'Shelf-fullHeight'
    )

    return (
      <div
        ref={ref}
        {...getDataAndAccessibilityProps(props)}
        className={shelfClasses}
      >
        {children}
      </div>
    )
  }
)

Shelf.displayName = 'Shelf'
