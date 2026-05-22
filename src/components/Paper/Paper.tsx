import * as React from 'react';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import './Paper.css'

/**
 * Paper elevation levels
 */
export const PaperElevation = {
  None: 'none',
  Subtle: 'subtle',
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
} as const

export type PaperElevation =
  (typeof PaperElevation)[keyof typeof PaperElevation]

export const BorderRadius = {
  Small: 's',
  Medium: 'm',
  Large: 'l',
} as const

export type BorderRadius = (typeof BorderRadius)[keyof typeof BorderRadius]

export interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  /** Shadow elevation */
  readonly elevation?: PaperElevation
  /** Whether to show border */
  readonly bordered?: boolean
  /** Border radius */
  readonly borderRadius?: BorderRadius
  /** Paper content */
  readonly children?: ReactNode
}

/**
 * A surface container with optional shadow and border.
 * Provides a subtle elevation effect for grouping content.
 */
export const Paper = forwardRef<HTMLDivElement, PaperProps>(
  (
    {
      elevation = PaperElevation.Small,
      bordered = false,
      borderRadius = BorderRadius.Medium,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const radiusClass = borderRadius ? `Paper-${`radius-${borderRadius}`}` : undefined

    return (
      <div
        ref={ref}
        className={cn(
          'Paper',
          `Paper-${elevation}`,
          bordered && 'Paper-bordered',
          radiusClass,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Paper.displayName = 'Paper'
