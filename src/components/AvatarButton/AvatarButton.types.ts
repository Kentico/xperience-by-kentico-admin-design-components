import type { TooltipPlacement } from '../Tooltip'

/**
 * Avatar button size variants
 */
export const AvatarSize = {
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
} as const

export type AvatarSize = (typeof AvatarSize)[keyof typeof AvatarSize]

export interface AvatarButtonProps {
  /** User's first name (for initials) */
  readonly firstName?: string
  /** User's last name (for initials) */
  readonly lastName?: string
  /** Fallback username if names not available */
  readonly username?: string
  /** Pre-computed initials (overrides firstName/lastName/username derivation) */
  readonly initials?: string
  /** Profile image URL */
  readonly imageUrl?: string
  /** Avatar size */
  readonly size?: AvatarSize
  /** Click handler */
  readonly onClick?: () => void
  /** Whether the button is in active/open state */
  readonly isActive?: boolean
  /** Accessibility label */
  readonly ariaLabel?: string
  /** Optional additional class name */
  readonly className?: string
  /** Tooltip text shown on hover */
  readonly tooltipText?: string
  /** Tooltip placement */
  readonly tooltipPlacement?: TooltipPlacement
  /** Explicit background gradient and dark/light flag */
  readonly background?: { readonly gradient: string; readonly isDark?: boolean }
  /** Show shadow ring around avatar */
  readonly shadow?: boolean
  /** Disabled state (suppresses hover overlay) */
  readonly disabled?: boolean
}
