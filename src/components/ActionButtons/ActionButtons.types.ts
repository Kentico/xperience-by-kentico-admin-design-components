import type { HTMLAttributes, ReactNode } from 'react'

/**
 * ActionButtons alignment options
 */
export const ActionButtonsAlign = {
  Start: 'start',
  Center: 'center',
  End: 'end',
  SpaceBetween: 'space-between',
} as const

export type ActionButtonsAlign = (typeof ActionButtonsAlign)[keyof typeof ActionButtonsAlign]

/**
 * ActionButtons size options (controls spacing between buttons)
 */
export const ActionButtonsSpacing = {
  S: 'S',
  M: 'M',
  L: 'L',
} as const

export type ActionButtonsSpacing = (typeof ActionButtonsSpacing)[keyof typeof ActionButtonsSpacing]

/**
 * ActionButtons component props
 */
export interface ActionButtonsProps extends HTMLAttributes<HTMLDivElement> {
  /** Horizontal alignment of buttons */
  readonly align?: ActionButtonsAlign
  /** Spacing between buttons */
  readonly spacing?: ActionButtonsSpacing
  /** Whether buttons should stack vertically on narrow containers */
  readonly wrap?: boolean
  /** Whether buttons should fill the container width equally */
  readonly fillContainer?: boolean
  /** Button elements to render */
  readonly children?: ReactNode
}
