import type { MouseEvent } from 'react'
import type { TooltipPlacement } from '../Tooltip'

export const ApplicationTileState = {
  Default: 'Default',
  Disabled: 'Disabled',
  Activated: 'Activated',
} as const

export type ApplicationTileState = (typeof ApplicationTileState)[keyof typeof ApplicationTileState]

export interface ApplicationTileProps {
  /**
   * Label (required).
   */
  readonly label: string
  /**
   * Icon name (required).
   */
  readonly iconName: string
  /**
   * State of the tile. Defaults to 'Default'.
   */
  readonly state?: ApplicationTileState
  /**
   * Tooltip text.
   */
  readonly tooltip?: string
  readonly tooltipPlacement?: TooltipPlacement
  /**
   * Find out if it's favourite tile.
   */
  readonly favouriteTile?: {
    withStar?: boolean
    starTooltip?: string
    starTooltipPlacement?: TooltipPlacement
  }
  /**
   * Click handler.
   */
  readonly onClick?: (event: MouseEvent<HTMLElement>) => void
  /**
   * Link to redirect (renders NavLink instead of button).
   */
  readonly link?: string
  /**
   * Data test ID.
   */
}
