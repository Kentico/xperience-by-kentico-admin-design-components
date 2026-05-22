import type { ReactNode } from 'react'

/**
 * Overview card group properties.
 */
export interface OverviewCardGroupProps {
  /**
   * Card components to render in the group.
   * Typically OverviewCard components.
   */
  readonly children?: ReactNode

  /**
   * When true, all cards have equal width (flex: 1 1 0).
   * When false, cards size based on their content.
   */
  readonly useEqualWidth?: boolean

  /**
   * Optional CSS class name.
   */
  readonly className?: string
}
