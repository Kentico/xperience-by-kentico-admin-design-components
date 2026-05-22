import type { ReactNode } from 'react'
import type { BaseTileBaseProps, BaseTileActionProps } from '../BaseTile'

/**
 * Specifies the ContentItemTile type (Preview, Selectable, Skeleton).
 */
export const ContentItemTileType = {
  Preview: 'Preview',
  Selectable: 'Selectable',
  Skeleton: 'Skeleton',
} as const

export type ContentItemTileType = (typeof ContentItemTileType)[keyof typeof ContentItemTileType]

/**
 * Action button props for ContentItemTile toolbar.
 */
export type ContentItemTileActionProps = BaseTileActionProps

export interface ContentItemTileProps extends Omit<BaseTileBaseProps, 'type'> {
  /**
   * Specifies the ContentItemTile type: Preview, Selectable, Skeleton (required).
   */
  readonly type: ContentItemTileType
  /**
   * Tile content type (e.g., "Article", "Page") (required).
   */
  readonly contentType: string
  /**
   * Tile node ahead of name.
   */
  readonly nameLeadingNode?: ReactNode
  /**
   * Tile icon in preview.
   */
  readonly previewIcon?: string
  /**
   * Drag element for the tile.
   */
  readonly dragElement?: ReactNode
  /**
   * Function called when checkbox is clicked.
   */
  readonly onChange?: (isSelected: boolean) => void
  /**
   * Function called when tile is clicked.
   */
  readonly onClick?: () => void
  /**
   * URL to navigate to when tile is clicked. If provided, tile will be rendered as NavLink.
   */
  readonly href?: string
  /**
   * Specifies if checkbox in tile info bar is visible.
   */
  readonly isCheckboxVisible?: boolean
  /**
   * Function called on checkbox change, by default, the onClick function is called.
   */
  readonly selectOnClick?: boolean
  /**
   * Specifies if checkbox in tile info bar is checked.
   */
  readonly isSelected?: boolean
  /**
   * Specifies if tile is dragging.
   */
  readonly isDragging?: boolean
  /**
   * Actions button in tile tool bar.
   */
  readonly actions?: ContentItemTileActionProps[]
  /**
   * Tooltip to display when tile is disabled.
   */
  readonly inactiveMessage?: string
  /**
   * Data test ID.
   */
}

/**
 * Props for ContentItemTilePreview variant - only accepts subset of ContentItemTileProps.
 * Matches source's narrowed interface.
 */
export type ContentItemTilePreviewProps = Pick<
  ContentItemTileProps,
  | 'disabled'
  | 'name'
  | 'contentType'
  | 'url'
  | 'errorState'
  | 'isMissingPermission'
  | 'uploadState'
  | 'dimensions'
  | 'size'
  | 'onClick'
  | 'isSelected'
  | 'onChange'
  | 'isCheckboxVisible'
  | 'selectOnClick'
  | 'actions'
  | 'href'
  | 'inactiveMessage'
  | 'isDragging'
  | 'dragElement'
  | 'nameLeadingNode'
  | 'previewIcon'
>

/**
 * Props for ContentItemTileSelectable variant - only accepts subset of ContentItemTileProps.
 * Matches source's narrowed interface.
 */
export type ContentItemTileSelectableProps = Pick<
  ContentItemTileProps,
  | 'disabled'
  | 'name'
  | 'contentType'
  | 'url'
  | 'errorState'
  | 'isMissingPermission'
  | 'uploadState'
  | 'dimensions'
  | 'size'
  | 'onClick'
  | 'isSelected'
  | 'onChange'
  | 'isDragging'
  | 'inactiveMessage'
  | 'actions'
  | 'nameLeadingNode'
  | 'previewIcon'
>

/**
 * Props for ContentItemTileSkeleton variant - accepts no props.
 * Matches source's narrowed interface.
 */
export type ContentItemTileSkeletonProps = Record<string, never>
