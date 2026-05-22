import * as React from 'react';
import { forwardRef } from 'react'
import { BaseTile, BaseTileType } from '../BaseTile'
import type { AssetTileProps, AssetTileType } from './AssetTile.types'

/**
 * Maps AssetTileType to BaseTileType.
 * Returns BaseTileType.Preview as fallback if type is undefined.
 */
const assetTileTypeToBaseTileType = (assetTileType: AssetTileType): BaseTileType =>
  BaseTileType[assetTileType] ?? BaseTileType.Preview

/**
 * AssetTile component for displaying asset previews with selection and actions.
 * Thin wrapper around BaseTile that maps AssetTileType to BaseTileType.
 */
export const AssetTile = forwardRef<HTMLDivElement, AssetTileProps>(
  ({ type, ...props }, ref) => {
    return <BaseTile ref={ref} {...props} type={assetTileTypeToBaseTileType(type)} />
  }
)

AssetTile.displayName = 'AssetTile'
