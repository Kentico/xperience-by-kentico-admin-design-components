import type { TooltipPlacement } from '../Tooltip'

/**
 * ActionTile states - determines the visual appearance and interaction state.
 */
export const ActionTileState = {
  Default: 'Default',
  Disabled: 'Disabled',
  Selected: 'Selected',
  InProgress: 'InProgress',
} as const

export type ActionTileState = (typeof ActionTileState)[keyof typeof ActionTileState]

/**
 * ActionTile sizes - controls the dimensions of the tile.
 */
export const ActionTileSize = {
  XS: 'XS',
  S: 'S',
  L: 'L',
} as const

export type ActionTileSize = (typeof ActionTileSize)[keyof typeof ActionTileSize]

/**
 * ActionTile types - different visual variants.
 */
export const ActionTileType = {
  Default: 'Default',
  Dashboard: 'Dashboard',
} as const

export type ActionTileType = (typeof ActionTileType)[keyof typeof ActionTileType]

export interface ActionTileProps {
  /**
   * Text used as a label of the action tile.
   */
  readonly label: string
  /**
   * Displayed icon name (e.g., "xp-plus" or "plus").
   */
  readonly icon: string
  /**
   * Icon set to use for the icon. Defaults to 'xp-default-icon-set'.
   */
  readonly iconSet?: string
  /**
   * @deprecated Use `icon` instead. This prop is kept for backward compatibility.
   */
  readonly iconName?: string
  /**
   * Tab index for keyboard navigation.
   */
  readonly tabIndex?: number
  /**
   * HTML button type attribute.
   */
  readonly buttonType?: 'button' | 'submit' | 'reset'
  /**
   * Action tile state. Defaults to 'Default'.
   */
  readonly state?: ActionTileState
  /**
   * Action tile size. Defaults to 'Large'.
   */
  readonly size?: ActionTileSize
  /**
   * Action tile type. Defaults to 'Default'.
   */
  readonly type?: ActionTileType
  /**
   * Tooltip text displayed on hover.
   */
  readonly tooltip?: string
  /**
   * Tooltip placement relative to the tile.
   */
  readonly tooltipPlacement?: TooltipPlacement
  /**
   * Callback called on the action tile click.
   */
  readonly onClick?: () => void
  /**
   * URL path for navigation. When provided, the ActionTile becomes a navigational link.
   */
  readonly href?: string
  /**
   * Data test ID for testing purposes.
   */
}
