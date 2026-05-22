import * as React from 'react';
import { forwardRef } from 'react'
import { AssetTile } from './AssetTile'
import { AssetTileType } from './AssetTile.types'
import type { AssetTilePreviewProps } from './AssetTile.types'

/**
 * AssetTilePreview - wraps AssetTile with type=Preview and isCheckboxVisible=false by default.
 * Use this for preview-only asset displays without selection capability.
 */
export const AssetTilePreview = forwardRef<HTMLDivElement, AssetTilePreviewProps>(
  ({ isCheckboxVisible = false, ...props }, ref) => {
    return (
      <AssetTile
        ref={ref}
        type={AssetTileType.Preview}
        isCheckboxVisible={isCheckboxVisible}
        {...props}
      />
    )
  }
)

AssetTilePreview.displayName = 'AssetTilePreview'
