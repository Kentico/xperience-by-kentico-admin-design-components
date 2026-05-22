import * as React from 'react';
import { forwardRef } from 'react'
import { ContentItemTile } from './ContentItemTile'
import { ContentItemTileType } from './ContentItemTile.types'
import type { ContentItemTilePreviewProps } from './ContentItemTile.types'

/**
 * ContentItemTilePreview - wraps ContentItemTile with type=Preview and isCheckboxVisible=false by default.
 * Use this for preview-only content item displays without selection capability.
 */
export const ContentItemTilePreview = forwardRef<HTMLDivElement, ContentItemTilePreviewProps>(
  ({ isCheckboxVisible = false, ...props }, ref) => {
    return (
      <ContentItemTile
        ref={ref}
        type={ContentItemTileType.Preview}
        isCheckboxVisible={isCheckboxVisible}
        {...props}
      />
    )
  }
)

ContentItemTilePreview.displayName = 'ContentItemTilePreview'
