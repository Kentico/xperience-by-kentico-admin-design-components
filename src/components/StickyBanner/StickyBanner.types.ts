/**
 * Type of the sticky banner.
 */
export const StickyBannerType = {
  /**
   * Information banner.
   */
  Info: 'info',
  /**
   * Error banner.
   */
  Error: 'error',
} as const

export type StickyBannerType =
  (typeof StickyBannerType)[keyof typeof StickyBannerType]

/**
 * Properties of the sticky banner component.
 */
export interface StickyBannerProps {
  /**
   * Type of the banner.
   */
  readonly bannerType: StickyBannerType
  /**
   * Message to display in the banner.
   */
  readonly message: string
  /**
   * Indicates if the message should be rendered as HTML.
   */
  readonly messageAsHtml: boolean
}
