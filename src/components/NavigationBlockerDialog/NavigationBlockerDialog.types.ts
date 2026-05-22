import type { ReactNode } from 'react'

/**
 * Texts for the navigation blocker dialog.
 */
export interface NavigationBlockerDialogTexts {
  /**
   * Dialog headline text.
   */
  readonly headline: string
  /**
   * Dialog message text shown in the body.
   */
  readonly message: string
  /**
   * Confirm button label (to leave the page).
   */
  readonly confirmLabel: string
  /**
   * Cancel button label (to stay on the page).
   */
  readonly cancelLabel?: string
}

/**
 * Props for NavigationBlockerDialogProvider.
 */
export interface NavigationBlockerDialogProviderProps {
  /**
   * Application content wrapped by the provider.
   */
  readonly children: ReactNode
}

/**
 * Context value for the navigation blocker.
 */
export interface NavigationBlockerContextValue {
  /**
   * Register or unregister the blocking condition.
   * When true, navigation will be blocked with a confirmation dialog.
   * When false, navigation is allowed normally.
   */
  setBlocking: (blocking: boolean) => void
  /**
   * Whether navigation is currently being blocked.
   */
  isBlocking: boolean
}

/**
 * Props for the hook that manages navigation blocking.
 */
export interface UseNavigationBlockerOptions {
  /**
   * Whether navigation should be blocked.
   * When true, attempting to navigate will show the confirmation dialog.
   */
  readonly shouldBlock: boolean
  /**
   * Texts for the navigation blocker dialog.
   */
  readonly texts: NavigationBlockerDialogTexts
  /**
   * Optional callback when user confirms leaving (navigation proceeds).
   */
  readonly onConfirm?: () => void
  /**
   * Optional callback when user cancels (stays on page).
   */
  readonly onCancel?: () => void
}
