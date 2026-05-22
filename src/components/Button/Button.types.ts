import type { ButtonHTMLAttributes, ReactNode, RefObject } from 'react'

/**
 * Button color variants
 */
export const ButtonColor = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Quinary: 'quinary',
  Alert: 'alert',
} as const

export type ButtonColor = (typeof ButtonColor)[keyof typeof ButtonColor]

/**
 * Button size variants
 */
export const ButtonSize = {
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
} as const

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize]

/**
 * Button component props
 */
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** Button color variant */
  readonly color?: ButtonColor
  /** Button size */
  readonly size?: ButtonSize
  /** Destructive modifier — applies alert styling cross-cutting any color variant */
  readonly destructive?: boolean
  /** Active/selected state — highlights the button as currently active */
  readonly active?: boolean
  /** Icon to show before the label */
  readonly icon?: ReactNode
  /** Icon to show after the label */
  readonly trailingIcon?: ReactNode
  /** Whether the button is in a loading state (shows spinner, disables interaction) */
  readonly inProgress?: boolean
  /** Whether the button should fill the width of its container */
  readonly fillContainer?: boolean
  /** Button content */
  readonly children?: ReactNode
  /** Shows a badge indicator dot on the button */
  readonly badge?: boolean
  /** Ref to the button element */
  readonly buttonRef?: RefObject<HTMLButtonElement | HTMLElement | null>
}
