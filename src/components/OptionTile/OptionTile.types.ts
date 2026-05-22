import type { ButtonHTMLAttributes } from 'react'

/**
 * Props for the OptionTile component.
 * OptionTile is a selectable option tile for option lists.
 */
export interface OptionTileProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'tabIndex'> {
  /**
   * Label text displayed in the tile (required).
   */
  readonly label: string
  /**
   * Icon name to display at the start of the tile.
   */
  readonly startIcon?: string
  /**
   * Icon name to display at the end of the tile.
   */
  readonly endIcon?: string
  /**
   * Whether the tile should take full width of its container.
   */
  readonly block?: boolean
  /**
   * Maximum width of the tile.
   */
  readonly maxWidth?: string | number
  /**
   * Whether the tile should expand to fill available space.
   * Defaults to true.
   */
  readonly shouldExpand?: boolean
  /**
   * Data test ID for testing.
   */
}
