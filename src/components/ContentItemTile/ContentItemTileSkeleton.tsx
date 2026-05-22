import * as React from 'react';
import { forwardRef } from 'react'
import { ContentItemTile } from './ContentItemTile'
import { ContentItemTileType } from './ContentItemTile.types'
import type { ContentItemTileSkeletonProps } from './ContentItemTile.types'

/**
 * ContentItemTileSkeleton - wraps ContentItemTile with type=Skeleton and hardcoded loading state values.
 * Use this as a loading placeholder for content item tiles.
 */
export const ContentItemTileSkeleton = forwardRef<HTMLDivElement, ContentItemTileSkeletonProps>(
  (_props, ref) => {
    return (
      <ContentItemTile
        ref={ref}
        type={ContentItemTileType.Skeleton}
        name=""
        contentType=""
        disabled={false}
      />
    )
  }
)

ContentItemTileSkeleton.displayName = 'ContentItemTileSkeleton'
