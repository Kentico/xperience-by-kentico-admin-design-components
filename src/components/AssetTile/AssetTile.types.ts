import type { BaseTileBaseProps, BaseTileActionProps } from '../BaseTile'

/**
 * Specifies the AssetTile type (Preview, Selectable, Skeleton).
 */
export const AssetTileType = {
  Preview: 'Preview',
  Selectable: 'Selectable',
  Skeleton: 'Skeleton',
} as const

export type AssetTileType = (typeof AssetTileType)[keyof typeof AssetTileType]

/**
 * Action button props for AssetTile toolbar.
 */
export type AssetTileActionProps = BaseTileActionProps

export interface AssetTileProps extends Omit<BaseTileBaseProps, 'type'> {
  /**
   * Specifies the AssetTile type: Preview, Selectable, Skeleton (required).
   */
  readonly type: AssetTileType
  /**
   * Function called when checkbox is clicked.
   */
  readonly onChange?: (isSelected: boolean) => void
  /**
   * Function called when tile is clicked.
   */
  readonly onClick?: () => void
  /**
   * Specifies if checkbox in tile info bar is visible.
   */
  readonly isCheckboxVisible?: boolean
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
  readonly actions?: AssetTileActionProps[]
  /**
   * Data test ID.
   */
}

/**
 * Props for AssetTilePreview variant - only accepts subset of AssetTileProps.
 * Matches source's narrowed interface.
 */
export type AssetTilePreviewProps = Pick<
  AssetTileProps,
  | 'disabled'
  | 'name'
  | 'onClick'
  | 'isSelected'
  | 'onChange'
  | 'isCheckboxVisible'
  | 'actions'
  | 'url'
  | 'errorState'
  | 'isMissingPermission'
  | 'uploadState'
  | 'dimensions'
  | 'size'
>

/**
 * Props for AssetTileSelectable variant - only accepts subset of AssetTileProps.
 * Matches source's narrowed interface.
 */
export type AssetTileSelectableProps = Pick<
  AssetTileProps,
  | 'disabled'
  | 'name'
  | 'onClick'
  | 'isSelected'
  | 'onChange'
  | 'isDragging'
  | 'url'
  | 'errorState'
  | 'isMissingPermission'
  | 'uploadState'
  | 'dimensions'
  | 'size'
>

/**
 * Props for AssetTileSkeleton variant - accepts no props.
 * Matches source's narrowed interface.
 */
export type AssetTileSkeletonProps = Record<string, never>
