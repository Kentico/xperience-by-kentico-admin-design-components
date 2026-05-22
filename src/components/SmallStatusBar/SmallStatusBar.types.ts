import type { UserProfile } from '@/components/Avatar'

export interface SmallStatusBarProps {
  /** User profile for avatar */
  readonly userProfile: UserProfile
  /** Callback for profile action */
  readonly onProfileClick?: () => void
  /** Callback for sign out action */
  readonly onSignOut?: () => void
  /** Optional additional class name */
  readonly className?: string
}
