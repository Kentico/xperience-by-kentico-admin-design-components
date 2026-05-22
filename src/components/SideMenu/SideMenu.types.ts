import type { ReactNode } from 'react'

export interface SideMenuProps {
  /**
   * Menu item tiles to display in the side menu
   */
  readonly children: ReactNode

  /**
   * Optional className for custom styling
   */
  readonly className?: string

  /**
   * Test ID for testing purposes
   */
  readonly testId?: string
}
