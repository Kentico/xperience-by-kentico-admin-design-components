import type { MouseEvent } from 'react'

/**
 * State options for SideMenuItemTile
 * Replaces enum with const + type pattern for erasableSyntaxOnly compatibility
 */
export const SideMenuItemState = {
  Default: 'Default',
  Selected: 'Selected',
  Disabled: 'Disabled',
} as const

export type SideMenuItemState =
  (typeof SideMenuItemState)[keyof typeof SideMenuItemState]

export interface SideMenuItemTileProps {
  /** Label text displayed below the icon */
  readonly label: string
  /** Icon name (with or without xp- prefix) */
  readonly iconName: string
  /** Current state of the menu item */
  readonly state?: SideMenuItemState
  /** Click handler */
  readonly onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  /** Test ID for testing */
  readonly testId?: string
  /** Additional class name */
  readonly className?: string
}
