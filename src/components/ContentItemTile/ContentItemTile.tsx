import * as React from 'react';
import { forwardRef } from 'react'
import { BaseTile, BaseTileType, BaseTilePreviewIconSize } from '../BaseTile'
import type { ContentItemTileProps, ContentItemTileType } from './ContentItemTile.types'

/**
 * Maps ContentItemTileType to BaseTileType.
 * Returns BaseTileType.Preview as fallback if type is undefined.
 */
export const contentItemTileTypeToBaseTileType = (
  contentItemTileType: ContentItemTileType
): BaseTileType => BaseTileType[contentItemTileType] ?? BaseTileType.Preview

/**
 * ContentItemTile component for displaying content item previews with selection and actions.
 * Thin wrapper around BaseTile that maps ContentItemTileType to BaseTileType and sets
 * default preview icon size to XXL.
 */
export const ContentItemTile = forwardRef<HTMLDivElement, ContentItemTileProps>(
  ({ type, ...props }, ref) => {
    return (
      <BaseTile
        ref={ref}
        previewIconSize={BaseTilePreviewIconSize.XXL}
        {...props}
        type={contentItemTileTypeToBaseTileType(type)}
      />
    )
  }
)

ContentItemTile.displayName = 'ContentItemTile'
