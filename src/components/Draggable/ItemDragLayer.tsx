import * as React from 'react';
import type { ReactNode } from 'react'
import { useDragLayer, type DragLayerMonitor } from 'react-dnd'
import type { DragLayerCollectedProps } from './Draggable.types'
import { ItemSelectorViewMode } from './Draggable.types'
import { getItemStyles, draggableLayerStyles, getBaseItemType } from './utils'

/**
 * Props for custom drag preview renderers.
 */
export interface DragPreviewRenderProps<T = unknown> {
  /** The item being dragged */
  readonly item: T
  /** Width of the original item */
  readonly width: number
}

/**
 * Props for the ItemDragLayer component.
 */
export interface ItemDragLayerProps<TGridItem = unknown, TListItem = unknown> {
  /**
   * Optional custom renderer for content item grid drag previews.
   * If not provided, nothing will be rendered for grid items.
   */
  readonly renderGridPreview?: (props: DragPreviewRenderProps<TGridItem>) => ReactNode
  /**
   * Optional custom renderer for table row/list drag previews.
   * If not provided, nothing will be rendered for list items.
   */
  readonly renderListPreview?: (props: DragPreviewRenderProps<TListItem>) => ReactNode
  /**
   * Optional custom renderer for any item type.
   * Takes precedence over type-specific renderers.
   */
  readonly renderPreview?: (
    itemType: string | null,
    props: DragPreviewRenderProps<TGridItem | TListItem>
  ) => ReactNode
}

/**
 * Extended draggable item with width for rendering.
 */
interface DraggableItemWithWidth {
  readonly width: number
  readonly dragElement?: ReactNode
}

/**
 * ItemDragLayer renders a custom drag preview that follows the cursor during drag operations.
 *
 * This component should be placed inside a DraggableProviderWrapper and will automatically
 * display drag previews for items being dragged within that context.
 *
 * @remarks
 * The drag layer uses fixed positioning with a high z-index (12000) to ensure
 * it appears above all other content. It does not capture pointer events.
 *
 * For type-safe drag previews, provide render functions that match your draggable items:
 * - `renderGridPreview` for ContentItemGrid items
 * - `renderListPreview` for table row/list items
 * - `renderPreview` for custom handling of all item types
 *
 * @example Basic usage with render functions
 * ```tsx
 * <DraggableProviderWrapper>
 *   <ItemDragLayer
 *     renderGridPreview={({ item, width }) => (
 *       <div style={{ width }}>
 *         <ContentItemTilePreview name={item.name} contentType={item.contentType} />
 *       </div>
 *     )}
 *     renderListPreview={({ item, width }) => (
 *       <div style={{ width }}>
 *         <TableRow cells={item.cells} />
 *       </div>
 *     )}
 *   />
 *   <DraggableList items={items} />
 * </DraggableProviderWrapper>
 * ```
 *
 * @example Custom preview for all item types
 * ```tsx
 * <ItemDragLayer
 *   renderPreview={(itemType, { item, width }) => {
 *     if (itemType === 'custom-type') {
 *       return <CustomPreview item={item} width={width} />
 *     }
 *     return null
 *   }}
 * />
 * ```
 */
export const ItemDragLayer = <TGridItem = unknown, TListItem = unknown>({
  renderGridPreview,
  renderListPreview,
  renderPreview,
}: ItemDragLayerProps<TGridItem, TListItem>) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer<DragLayerCollectedProps<DraggableItemWithWidth>>((monitor: DragLayerMonitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }))

  if (!isDragging || !item) {
    return null
  }

  const baseItemType = getBaseItemType(itemType)
  const renderProps: DragPreviewRenderProps<TGridItem | TListItem> = {
    item: item as TGridItem | TListItem,
    width: item.width,
  }

  // Use custom renderPreview if provided
  if (renderPreview) {
    const preview = renderPreview(baseItemType, renderProps)
    if (preview) {
      return (
        <div style={draggableLayerStyles}>
          <div style={{ width: `${item.width}px` }}>
            <div style={getItemStyles(initialOffset, currentOffset)}>{preview}</div>
          </div>
        </div>
      )
    }
  }

  // Use type-specific renderers
  let preview: ReactNode = null

  switch (baseItemType) {
    case ItemSelectorViewMode.ContentItemGrid:
      if (renderGridPreview) {
        preview = renderGridPreview(renderProps as DragPreviewRenderProps<TGridItem>)
      }
      break
    case ItemSelectorViewMode.List:
      if (renderListPreview) {
        preview = renderListPreview(renderProps as DragPreviewRenderProps<TListItem>)
      }
      break
    default:
      // Unknown item type - no preview rendered
      break
  }

  if (!preview) {
    return null
  }

  return (
    <div style={draggableLayerStyles}>
      <div style={{ width: `${item.width}px` }}>
        <div style={getItemStyles(initialOffset, currentOffset)}>{preview}</div>
      </div>
    </div>
  )
}

ItemDragLayer.displayName = 'ItemDragLayer'
