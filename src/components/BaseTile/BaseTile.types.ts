import type { ReactNode } from 'react'
import type { TooltipPlacement } from '../Tooltip'
import type { ButtonProps } from '../Button'

/**
 * Specifies the BaseTile type (Skeleton, Preview, Selectable).
 */
export const BaseTileType = {
  Preview: 'Preview',
  Selectable: 'Selectable',
  Skeleton: 'Skeleton',
} as const

export type BaseTileType = (typeof BaseTileType)[keyof typeof BaseTileType]

/**
 * Size of tile preview icon.
 */
export const BaseTilePreviewIconSize = {
  XXL: 'XXL',
  L: 'L',
} as const

export type BaseTilePreviewIconSize =
  (typeof BaseTilePreviewIconSize)[keyof typeof BaseTilePreviewIconSize]

/**
 * Base props that should be available in all tile types and info bar, toolbar, image preview
 */
export interface BaseTileBaseProps {
  /**
   * Tile image name (required).
   */
  readonly name: string
  /**
   * Tile image url.
   */
  readonly url?: string
  /**
   * Error state when uploading or missing file.
   */
  readonly errorState?: {
    /**
     * Error message tooltip location (if the error message is longer than tile).
     */
    readonly tooltipPlacement?: TooltipPlacement
    /**
     * Explains why the error occurred.
     */
    readonly errorMessage: string
    /**
     * Function to close tile with error.
     */
    readonly onErrorClose?: () => void
  }
  /**
   * Indicates that user is missing permission to view the tile.
   */
  readonly isMissingPermission?: boolean
  /**
   * Indicates uploading a file.
   */
  readonly uploadState?: {
    /**
     * Indicates the percentage of loading progress.
     */
    readonly uploadProgress?: number
    /**
     * Function to close uploading tile.
     */
    readonly onUploadCancel?: () => void
  }
  /**
   * Disabled tile. Tile is not clickable, it has disabled styles (required).
   */
  readonly disabled: boolean
  /**
   * Tile width and height.
   */
  readonly dimensions?: {
    readonly width: number
    readonly height: number
  }
  /**
   * AssetTile image size.
   */
  readonly size?: number
}

export interface BaseTileProps extends BaseTileBaseProps {
  /**
   * Tile width and height.
   */
  readonly dimensions?: {
    readonly width: number
    readonly height: number
  }
  /**
   * Specifies the tile type: Skeleton, Preview, Selectable (required).
   */
  readonly type: BaseTileType
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
  readonly actions?: BaseTileActionProps[]
  /**
   * Tile image size.
   */
  readonly size?: number
  /**
   * Tile node ahead of name.
   */
  readonly nameLeadingNode?: ReactNode
  /**
   * Tile content type.
   */
  readonly contentType?: string
  /**
   * Size of tile preview icon.
   */
  readonly previewIconSize?: BaseTilePreviewIconSize
  /**
   * Tile icon in preview.
   */
  readonly previewIcon?: string
  /**
   * Tooltip to display when tile is disabled.
   */
  readonly inactiveMessage?: string
  /**
   * Function called on checkbox change, by default, the onClick function is called.
   */
  readonly selectOnClick?: boolean
  /**
   * Drag element for the tile.
   */
  readonly dragElement?: ReactNode
  /**
   * Data test ID.
   */
}

/**
 * Selected props from BaseTileProps for tile Tool bar.
 */
export interface ToolBarProps
  extends Pick<
    BaseTileProps,
    'errorState' | 'type' | 'uploadState' | 'actions' | 'disabled' | 'dragElement'
  > {
  /**
   * Specifies if tile has a image (required).
   */
  readonly hasPreview: boolean
}

/**
 * Selected props from BaseTileProps for tile Image.
 */
export interface ImagePreviewProps
  extends Pick<
    BaseTileProps,
    | 'errorState'
    | 'type'
    | 'url'
    | 'uploadState'
    | 'previewIcon'
    | 'previewIconSize'
    | 'isMissingPermission'
  > {
  /**
   * Specifies if tile has a image (required).
   */
  readonly hasPreview: boolean
}

/**
 * Selected props from BaseTileProps for tile info bar.
 */
export interface InfoBarProps
  extends Pick<
    BaseTileProps,
    | 'dimensions'
    | 'size'
    | 'name'
    | 'errorState'
    | 'uploadState'
    | 'contentType'
    | 'type'
    | 'isCheckboxVisible'
    | 'isSelected'
    | 'nameLeadingNode'
    | 'disabled'
    | 'isMissingPermission'
  > {
  /**
   * Indicates if the checkbox is hover (required).
   */
  readonly isHighlighted: boolean
  /**
   * Function called when checkbox is clicked (required).
   */
  readonly onCheckboxChange: () => void
}

/**
 * Action button props.
 */
export interface BaseTileActionProps extends Omit<ButtonProps, 'type' | 'size'> {}
