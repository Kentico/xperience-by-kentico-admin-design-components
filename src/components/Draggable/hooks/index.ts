import { useEffect, useRef } from 'react'
import { useDrag, useDrop, type DropTargetMonitor, type DragSourceMonitor } from 'react-dnd'
import type { ConnectDragPreview, ConnectDragSource, ConnectDropTarget } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import type { UseDraggableItemReturn, DraggableItemBase } from '../Draggable.types'
import { getDraggableItemType } from '../utils'

// ============================================================================
// Hook Options Types
// ============================================================================

/**
 * Configuration options for the useDraggableItem hook.
 */
export interface UseDraggableItemOptions<TItem extends DraggableItemBase> {
  /**
   * The base item type for drag operations.
   * This identifies what kind of item is being dragged.
   */
  readonly itemType: string
  /**
   * Optional group to scope the drag operation.
   * Items can only be dropped on targets with matching types.
   */
  readonly typeGroup?: string
  /**
   * The item data to pass during drag operations.
   */
  readonly item: TItem
  /**
   * Whether drag operations are enabled.
   * @default true
   */
  readonly canDrag?: boolean
  /**
   * Whether to use an empty image as the native drag preview.
   * Set to true when using ItemDragLayer for custom previews.
   * @default true
   */
  readonly useEmptyPreview?: boolean
  /**
   * Callback invoked when another item is hovered over this drop target.
   * @param draggedItem - The item being dragged
   * @param monitor - The drop target monitor
   */
  readonly onHover?: (draggedItem: TItem, monitor: DropTargetMonitor) => void
  /**
   * Callback invoked when an item is dropped on this target.
   * @param droppedItem - The item that was dropped
   * @param monitor - The drop target monitor
   */
  readonly onDrop?: (droppedItem: TItem, monitor: DropTargetMonitor) => void
}

// ============================================================================
// Main Hook
// ============================================================================

/**
 * A reusable hook for implementing drag-and-drop functionality on items.
 *
 * This hook wraps react-dnd's useDrag and useDrop hooks with common patterns
 * used throughout the Draggable system. It handles:
 * - Combining drag and drop functionality in one hook
 * - Type group scoping for independent drag zones
 * - Empty image preview for custom drag layers
 * - Common state collection (isDragging, draggedItemType)
 *
 * @remarks
 * Must be used within a component wrapped by DraggableProviderWrapper.
 *
 * @example Basic usage with list items
 * ```tsx
 * const { drag, drop, isDragging, preview } = useDraggableItem({
 *   itemType: ItemSelectorViewMode.List,
 *   item: { index, identifier, onDragOver: handleDragOver, width },
 *   onHover: (draggedItem, monitor) => {
 *     if (draggedItem.identifier !== identifier) {
 *       handleDragOver(draggedItem.identifier, index, monitor)
 *     }
 *   },
 * })
 *
 * return (
 *   <div ref={(node) => drop(drag(node))}>
 *     {children}
 *   </div>
 * )
 * ```
 *
 * @example With type groups for isolated drag zones
 * ```tsx
 * const { drag, drop, isDragging } = useDraggableItem({
 *   itemType: ItemSelectorViewMode.List,
 *   typeGroup: 'sidebar-list',
 *   item: { index, identifier, onDragOver, width },
 * })
 * ```
 *
 * @example Conditionally enabling drag
 * ```tsx
 * const { drag, drop, isDragging } = useDraggableItem({
 *   itemType: ItemSelectorViewMode.ContentItemGrid,
 *   item: { index, identifier, onDragOver, width },
 *   canDrag: isEditable && !isDisabled,
 * })
 * ```
 *
 * @param options - Configuration for the draggable item
 * @returns Object containing drag/drop connectors and state
 */
export function useDraggableItem<TItem extends DraggableItemBase>(
  options: UseDraggableItemOptions<TItem>
): UseDraggableItemReturn {
  const {
    itemType: baseItemType,
    typeGroup,
    item,
    canDrag = true,
    useEmptyPreview = true,
    onHover,
    onDrop,
  } = options

  // Combine base type with optional group for scoped drag zones
  const itemType = getDraggableItemType(baseItemType, typeGroup)

  // Setup drag source
  const [{ isDragging, draggedItemType }, drag, preview] = useDrag(
    () => ({
      type: itemType,
      item,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: !!monitor.isDragging(),
        draggedItemType: monitor.getItemType(),
      }),
      canDrag: () => canDrag,
    }),
    [itemType, item, canDrag]
  )

  // Setup drop target
  const [, drop] = useDrop<TItem>(
    () => ({
      accept: itemType,
      hover: onHover,
      drop: onDrop,
    }),
    [itemType, onHover, onDrop]
  )

  // Use empty image for drag preview when custom drag layer is used
  useEffect(() => {
    if (useEmptyPreview) {
      preview(getEmptyImage(), { captureDraggingState: true })
    }
  }, [preview, useEmptyPreview])

  return {
    drag,
    drop,
    isDragging,
    preview,
    draggedItemType,
  }
}

// ============================================================================
// Utility Hook
// ============================================================================

/**
 * Options for the useDragPreview hook.
 */
export interface UseDragPreviewOptions {
  /**
   * Whether to capture the dragging state in the preview.
   * @default true
   */
  readonly captureDraggingState?: boolean
}

/**
 * Hook to connect an empty image as the native drag preview.
 *
 * Use this when you want to render a custom drag preview using ItemDragLayer
 * instead of the browser's default drag image.
 *
 * @example
 * ```tsx
 * const [, drag, preview] = useDrag({ ... })
 * useDragPreview(preview)
 *
 * return <div ref={drag}>Drag me</div>
 * ```
 *
 * @param preview - The ConnectDragPreview function from useDrag
 * @param options - Optional configuration
 */
export function useDragPreview(
  preview: ConnectDragPreview,
  options: UseDragPreviewOptions = {}
): void {
  const { captureDraggingState = true } = options

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState })
  }, [preview, captureDraggingState])
}

// ============================================================================
// Ref Combination Utility
// ============================================================================

/**
 * Combines multiple refs into a single ref callback.
 *
 * Useful when you need to attach both drag and drop connectors to the same element,
 * along with other refs like measured refs or forwarded refs.
 *
 * @example
 * ```tsx
 * const { drag, drop } = useDraggableItem({ ... })
 * const measureRef = useRef<HTMLDivElement>(null)
 *
 * const combinedRef = useCombinedRef(drag, drop, measureRef)
 *
 * return <div ref={combinedRef}>Content</div>
 * ```
 *
 * @param refs - Array of ref callbacks or ref objects to combine
 * @returns A single ref callback that updates all provided refs
 */
export function useCombinedRef<T extends HTMLElement>(
  ...refs: Array<
    | ConnectDragSource
    | ConnectDropTarget
    | ConnectDragPreview
    | React.RefObject<T | null>
    | React.RefCallback<T>
    | null
    | undefined
  >
): React.RefCallback<T> {
  const combinedRef = useRef<React.RefCallback<T>>((element: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(element)
      } else if ('current' in ref) {
        // RefObject - need to cast due to readonly
        ;(ref as React.MutableRefObject<T | null>).current = element
      }
    })
  })

  return combinedRef.current
}

// ============================================================================
// Re-exports for convenience
// ============================================================================

// Re-export react-dnd types that consumers commonly need with hooks
export type { DropTargetMonitor, DragSourceMonitor } from 'react-dnd'
export type { ConnectDragSource, ConnectDropTarget, ConnectDragPreview } from 'react-dnd'
