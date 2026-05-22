import type { ReactNode } from 'react'
import type { DropTargetMonitor } from 'react-dnd'
import type { DraggableItemBase, DraggableItemProps } from '../Draggable.types'

/**
 * Render prop function for TableRowDraggable children.
 * Receives the drag element to embed in your row component.
 */
export type TableRowDraggableChildrenFn = (props: {
  dragElement: ReactNode
}) => ReactNode

/**
 * Props for the TableRowDraggable component.
 * Combines standard draggable item props with table row-specific features.
 */
export interface TableRowDraggableProps extends DraggableItemProps {
  /**
   * Content to render inside the draggable row.
   * Can be a React node or a render function that receives the drag element.
   *
   * @example As ReactNode
   * ```tsx
   * <TableRowDraggable {...props}>
   *   <TableRow cells={cells} />
   * </TableRowDraggable>
   * ```
   *
   * @example As render function
   * ```tsx
   * <TableRowDraggable {...props}>
   *   {({ dragElement }) => (
   *     <TableRow cells={cells} dragElement={dragElement} />
   *   )}
   * </TableRowDraggable>
   * ```
   */
  readonly children: ReactNode | TableRowDraggableChildrenFn
  /**
   * Whether the row is visually disabled.
   */
  readonly disabled?: boolean
  /**
   * Whether the row is currently selected.
   */
  readonly selected?: boolean
  /**
   * Custom className for the wrapper element.
   */
  readonly className?: string
  /**
   * Callback when the row is clicked.
   */
  readonly onClick?: () => void
}

/**
 * Item type passed to the drag layer for rendering the drag preview.
 * Extends DraggableItemBase with row-specific display properties.
 */
export interface TableRowDraggableItem extends DraggableItemBase {
  /**
   * The drag handle element to display in the preview.
   */
  readonly dragElement?: ReactNode
  /**
   * Width of the row (used for sizing the drag preview).
   */
  readonly width: number
  /**
   * Whether the row is selected (for preview styling).
   */
  readonly selected?: boolean
  /**
   * Custom content for the drag preview.
   * If not provided, a generic preview will be shown.
   */
  readonly previewContent?: ReactNode
}

/**
 * Render prop interface for TableRowDraggable.
 * Provides drag state and handle to child render functions.
 */
export interface TableRowDraggableRenderProps {
  /**
   * Whether this item is currently being dragged.
   */
  readonly isDragging: boolean
  /**
   * The drag handle element that should be rendered in the row.
   */
  readonly dragElement: ReactNode
  /**
   * Whether drag operations are currently disabled.
   */
  readonly isDragDisabled: boolean
}

/**
 * Props for the drag handle button component.
 */
export interface DragHandleButtonProps {
  /**
   * Whether the drag handle is disabled.
   */
  readonly disabled?: boolean
  /**
   * Whether a drag operation is in progress anywhere.
   */
  readonly isDragging?: boolean
  /**
   * Callback when mouse down on the drag handle.
   */
  readonly onMouseDown?: () => void
  /**
   * Custom className for the button.
   */
  readonly className?: string
}

/**
 * Helper function type for determining switch position during drag.
 */
export type SwitchItemPositionFn = (
  ref: React.RefObject<HTMLDivElement | null>,
  monitor: DropTargetMonitor
) => boolean
