import type { ReactNode } from 'react'

/**
 * Text strings for TileSelector component.
 * Required because i18n is not included in the design system.
 */
export interface TileSelectorTexts {
  /**
   * Placeholder text for the search input.
   */
  readonly searchPlaceholder: string
  /**
   * Title shown when no search results match.
   */
  readonly noSearchResultTitle: string
  /**
   * Text shown when no search results match.
   */
  readonly noSearchResultText: string
  /**
   * Label for the clear search button.
   */
  readonly clearButtonLabel: string
}

/**
 * Represents an item displayed in the tile selector.
 */
export interface TileSelectorItem {
  /**
   * Item label displayed on the tile.
   */
  readonly label: string
  /**
   * Icon name for the tile (e.g., "xp-placeholder", "xp-home").
   */
  readonly icon: string
  /**
   * Unique identifier for the item.
   */
  readonly identifier: string | number
  /**
   * Indicates if the item is disabled.
   */
  readonly disabled?: boolean
  /**
   * Tooltip text shown on hover.
   */
  readonly tooltip?: string
}

/**
 * Props for TileSelector component.
 */
export interface TileSelectorProps {
  /**
   * Collection of items to display as tiles.
   */
  readonly items: TileSelectorItem[]
  /**
   * Currently selected item.
   */
  readonly value?: TileSelectorItem
  /**
   * Callback fired when an item is selected.
   */
  readonly onItemSelect: (item: TileSelectorItem) => void
  /**
   * Label for the search input field.
   */
  readonly fieldName?: string
  /**
   * Heading to display when there are no items at all.
   */
  readonly noItemsHeading: string
  /**
   * Message to display when there are no items at all.
   */
  readonly noItemsMessage: string
  /**
   * Text strings for UI elements.
   */
  readonly texts: TileSelectorTexts
  /**
   * Debounce delay in milliseconds for search filtering.
   * @default 250
   */
  readonly debounceMs?: number
  /**
   * Optional className for the root container.
   */
  readonly className?: string
  /**
   * Optional children to render in the empty state message area.
   */
  readonly emptyStateChildren?: ReactNode
}
