import type { StickyBannerProps, UserProfile } from '@/components'

// Re-export UserProfile from components
export type { UserProfile }

/**
 * Application in the navigation menu
 */
export interface Application {
  /** Display name */
  readonly name: string
  /** Icon name (xp-* format) */
  readonly icon: string
  /** Navigation path */
  readonly path: string
}

/**
 * Application category in the navigation menu
 */
export interface ApplicationCategory {
  /** Display name */
  readonly name: string
  /** Icon name (xp-* format) */
  readonly icon: string
  /** Applications in this category */
  readonly applications: Application[]
  /** Unique code name identifier */
  readonly codeName: string
}

/**
 * Props for the App Template
 */
export interface AppTemplateProps {
  /** Application categories for the navigation menu */
  readonly categories: ApplicationCategory[]
  /** User profile for avatar menu */
  readonly userProfile?: UserProfile
  /** Show warning snackbar (license warning) */
  readonly showWarning?: boolean
  /** Show error snackbar (license error) */
  readonly showError?: boolean
  /** License expiry message */
  readonly expiringLicenseMessage?: string
  /** Application version string */
  readonly applicationVersion?: string
  /** Sticky banner configuration */
  readonly stickyBanner?: StickyBannerProps
  /** Content to render inside the template */
  readonly children?: React.ReactNode
}

/**
 * Props for the Main (desktop) layout component
 */
export interface MainProps {
  readonly categories: ApplicationCategory[]
  readonly userProfile?: UserProfile
  readonly showWarning?: boolean
  readonly showError?: boolean
  readonly expiringLicenseMessage?: string
  readonly stickyBanner?: StickyBannerProps
  readonly children?: React.ReactNode
}

/**
 * Props for the MainMobile layout component
 */
export interface MainMobileProps {
  readonly categories: ApplicationCategory[]
  readonly userProfile?: UserProfile
  readonly applicationVersion?: string
  readonly showWarning?: boolean
  readonly showError?: boolean
  readonly expiringLicenseMessage?: string
  readonly children?: React.ReactNode
}
