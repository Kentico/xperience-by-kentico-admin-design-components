import * as React from 'react';
import { forwardRef } from 'react'
import { AssetTile } from './AssetTile'
import { AssetTileType } from './AssetTile.types'
import type { AssetTileSelectableProps } from './AssetTile.types'

/**
 * AssetTileSelectable - wraps AssetTile with type=Selectable.
 * Use this for asset tiles that can be selected.
 */
export const AssetTileSelectable = forwardRef<HTMLDivElement, AssetTileSelectableProps>(
  (props, ref) => {
    return <AssetTile ref={ref} type={AssetTileType.Selectable} {...props} />
  }
)

AssetTileSelectable.displayName = 'AssetTileSelectable'
