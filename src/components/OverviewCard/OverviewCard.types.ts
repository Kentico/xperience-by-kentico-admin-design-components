import type { ReactNode } from 'react'

/**
 * Overview card properties.
 */
export interface OverviewCardProps {
  /**
   * Optional headline text for the card.
   */
  readonly headline?: string

  /**
   * Content to render inside the card.
   * Multiple children will be rendered as separate sections with spacing.
   */
  readonly children?: ReactNode

  /**
   * Actions to render in the card footer.
   * Typically buttons or links.
   */
  readonly actions?: ReactNode

  /**
   * Indicates if the card should fill full height of the parent.
   */
  readonly fullHeight?: boolean
}

/**
 * Overview card section properties.
 * Used for wrapping individual content sections within the card.
 */
export interface OverviewCardSectionProps {
  /**
   * Content to render inside the section.
   */
  readonly children?: ReactNode
}
