import * as React from 'react';
import { forwardRef } from 'react'
import { AssetTile } from './AssetTile'
import { AssetTileType } from './AssetTile.types'
import type { AssetTileSkeletonProps } from './AssetTile.types'

/**
 * AssetTileSkeleton - wraps AssetTile with type=Skeleton and hardcoded loading state values.
 * Use this as a loading placeholder for asset tiles.
 */
export const AssetTileSkeleton = forwardRef<HTMLDivElement, AssetTileSkeletonProps>(
  (_props, ref) => {
    return (
      <AssetTile
        ref={ref}
        type={AssetTileType.Skeleton}
        name=""
        size={0}
        disabled={false}
      />
    )
  }
)

AssetTileSkeleton.displayName = 'AssetTileSkeleton'
