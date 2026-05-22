import type { ReactNode, RefObject } from 'react'
import type { DropDownPlacement } from '@/components/DropDownActionMenu'
import type { AvatarSize } from '@/components/AvatarButton'
import type { TooltipPlacement } from '@/components/Tooltip'

/**
 * User profile data
 */
export interface UserProfile {
  /** User's first name */
  firstName?: string
  /** User's last name */
  lastName?: string
  /** Username (used for initials if names not available) */
  username: string
  /** Profile image URL */
  imageUrl?: string
  /** Email address */
  email?: string
}

/**
 * AvatarMenu component props — dropdown menu wrapper around AvatarButton
 */
export interface AvatarMenuProps {
  /** User profile data */
  readonly userProfile: UserProfile
  /** Menu dropdown placement */
  readonly menuPlacement?: DropDownPlacement
  /** Whether the menu is currently open */
  readonly menuOpen: boolean
  /** Callback to set menu open state */
  readonly setMenuOpen: (open: boolean) => void
  /** Avatar size */
  readonly size?: AvatarSize
  /** Custom render function for the trigger button */
  readonly renderTrigger?: (props: {
    ref: RefObject<HTMLButtonElement>
    onClick: () => void
    isActive: boolean
    avatarProps: {
      firstName?: string
      lastName?: string
      username?: string
      imageUrl?: string
    }
  }) => ReactNode
  /** Callback for profile action */
  readonly onProfileClick?: () => void
  /** Callback for sign out action */
  readonly onSignOut?: () => void
  /** Optional additional class name */
  readonly className?: string
}

/**
 * Static Avatar size variants
 */
export const AvatarStaticSize = {
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
} as const

export type AvatarStaticSize = (typeof AvatarStaticSize)[keyof typeof AvatarStaticSize]

/**
 * Static Avatar component props — circle with initials or image, no menu
 */
export interface AvatarProps {
  /** Size variant */
  readonly size: AvatarStaticSize
  /** Tooltip text (required for accessibility) */
  readonly tooltipText: string
  /** Tooltip placement */
  readonly tooltipPlacement?: TooltipPlacement
  /** Two-letter initials to display */
  readonly initials: string
  /** Profile image URL (optional, falls back to initials) */
  readonly img?: string
  /** Show shadow ring around avatar */
  readonly shadow?: boolean
  /** Background gradient and dark/light flag */
  readonly background: { readonly gradient: string; readonly isDark?: boolean }
  /** Custom content to render inside the avatar (overrides initials/image) */
  readonly customContent?: ReactNode
  /** Optional additional class name */
  readonly className?: string
}
