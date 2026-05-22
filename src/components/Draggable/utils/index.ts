import type { XYCoord } from 'react-dnd'
import type { DragItemStyles, DragLayerStyles } from '../Draggable.types'

/**
 * Calculates the transform styles for a dragging item based on its current position.
 *
 * @param initialOffset - The initial position when drag started
 * @param currentOffset - The current drag position
 * @returns CSS styles object with transform or display:none if not dragging
 *
 * @example
 * ```tsx
 * const styles = getItemStyles(initialOffset, currentOffset)
 * return <div style={styles}>{dragPreview}</div>
 * ```
 */
export const getItemStyles = (
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
): DragItemStyles => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }

  const { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`

  return {
    transform,
    WebkitTransform: transform,
  }
}

/**
 * Fixed-position styles for the drag layer container.
 * The layer sits above all other content and doesn't capture pointer events.
 *
 * z-index is set to 12000 to ensure the drag layer appears above
 * all other elements in the application.
 */
export const draggableLayerStyles: DragLayerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 12000,
  left: 0,
  top: 0,
}

/**
 * Constructs a draggable item type string, optionally scoped to a type group.
 *
 * Type groups allow multiple independent drag-and-drop zones on the same page.
 * Items can only be dropped on targets with matching types.
 *
 * @param type - Base type identifier (e.g., 'table-row-draggable')
 * @param typeGroup - Optional group to scope the drag operation
 * @returns Combined type string in format "type|typeGroup" or just "type"
 *
 * @example
 * ```tsx
 * // Without group - items can be dragged between all matching zones
 * const type = getDraggableItemType('table-row-draggable')
 * // Returns: 'table-row-draggable'
 *
 * // With group - items stay within their group
 * const type = getDraggableItemType('table-row-draggable', 'list-1')
 * // Returns: 'table-row-draggable|list-1'
 * ```
 */
export const getDraggableItemType = (
  type: string,
  typeGroup?: string
): string => {
  return typeGroup ? `${type}|${typeGroup}` : type
}

/**
 * Extracts the base item type from a potentially grouped type string.
 *
 * @param itemType - The full type string (may include group suffix)
 * @returns The base type without the group suffix
 *
 * @example
 * ```tsx
 * getBaseItemType('table-row-draggable|list-1') // Returns: 'table-row-draggable'
 * getBaseItemType('table-row-draggable') // Returns: 'table-row-draggable'
 * ```
 */
export const getBaseItemType = (
  itemType: string | symbol | null
): string | null => {
  if (!itemType) {
    return null
  }
  return itemType.toString().split('|')[0]
}
