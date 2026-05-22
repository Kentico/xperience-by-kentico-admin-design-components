import * as React from 'react';
import { forwardRef } from 'react'
import { ContentItemTile } from './ContentItemTile'
import { ContentItemTileType } from './ContentItemTile.types'
import type { ContentItemTileSelectableProps } from './ContentItemTile.types'

/**
 * ContentItemTileSelectable - wraps ContentItemTile with type=Selectable.
 * Use this for content item tiles that can be selected.
 */
export const ContentItemTileSelectable = forwardRef<HTMLDivElement, ContentItemTileSelectableProps>(
  ({ ...props }, ref) => {
    return (
      <ContentItemTile
        ref={ref}
        type={ContentItemTileType.Selectable}
        {...props}
      />
    )
  }
)

ContentItemTileSelectable.displayName = 'ContentItemTileSelectable'
