import type { CSSProperties, ReactNode } from 'react'
import type { DropTargetMonitor, XYCoord } from 'react-dnd'
import type { ConnectDragPreview, ConnectDragSource, ConnectDropTarget } from 'react-dnd'

// ============================================================================
// View Mode Constants
// ============================================================================

/**
 * Enum-like constant for item selector view modes used to identify drag item types.
 * Converted from TypeScript enum for erasableSyntaxOnly compliance.
 */
export const ItemSelectorViewMode = {
  ContentItemGrid: 'content-item-grid-tile-draggable',
  List: 'table-row-draggable',
} as const

export type ItemSelectorViewMode =
  (typeof ItemSelectorViewMode)[keyof typeof ItemSelectorViewMode]

// ============================================================================
// Base Draggable Types
// ============================================================================

/**
 * Base interface for draggable items.
 * Contains the minimum required properties for drag operations.
 */
export interface DraggableItemBase {
  /** The index of the item in its list */
  readonly index: number
  /** Unique identifier for the item */
  readonly identifier: string
  /** Callback invoked when an item is dragged over this item */
  readonly onDragOver: (
    identifier: string,
    hoverIndex: number,
    monitor: DropTargetMonitor
  ) => void
}

/**
 * Props for components that support drag and drop functionality.
 */
export interface DraggableItemProps {
  /** The index of the item */
  readonly index: number
  /** Optional type group for categorizing drag operations */
  readonly typeGroup?: string
  /** Unique identifier for the item */
  readonly identifier: string
  /** Whether the item can be dragged */
  readonly isDraggable?: boolean
  /**
   * Callback when an item is dragged over another item.
   * @param dragItemIdentifier - The identifier of the item being dragged
   * @param hoverIndex - The index of the item being hovered over
   */
  readonly onDragOver: (dragItemIdentifier: string, hoverIndex: number) => void
  /** Whether drag-and-drop is completely disabled */
  readonly isDragAndDropDisabled?: boolean
  /** Callback fired when drag operation begins */
  readonly onDragInitiated?: () => void
}

// ============================================================================
// Hook Types
// ============================================================================

/**
 * Return type for the useDraggableItem hook.
 * Provides all necessary refs and state for implementing drag and drop.
 */
export interface UseDraggableItemReturn {
  /** Connect to the drag source (attach to draggable element) */
  readonly drag: ConnectDragSource
  /** Connect to the drop target (attach to droppable element) */
  readonly drop: ConnectDropTarget
  /** Whether this item is currently being dragged */
  readonly isDragging: boolean
  /** Connect to render a custom drag preview */
  readonly preview: ConnectDragPreview
  /** The type of the item currently being dragged (null if not dragging) */
  readonly draggedItemType: string | symbol | null
}

// ============================================================================
// Drag Layer Types
// ============================================================================

/**
 * Props collected from the drag layer monitor.
 * Used by ItemDragLayer to render the drag preview.
 */
export interface DragLayerCollectedProps<T = unknown> {
  /** The item being dragged */
  readonly item: T
  /** The type identifier of the dragged item */
  readonly itemType: string | symbol | null
  /** Initial position when drag started */
  readonly initialOffset: XYCoord | null
  /** Current drag position */
  readonly currentOffset: XYCoord | null
  /** Whether a drag operation is in progress */
  readonly isDragging: boolean
}

// ============================================================================
// Provider Types
// ============================================================================

/**
 * Props for the DraggableProviderWrapper component.
 */
export interface DraggableProviderWrapperProps {
  /** Content to render within the DnD provider context */
  readonly children: ReactNode
  /**
   * Window object reference for the DnD backend.
   * Useful for iframe or multi-window scenarios.
   */
  readonly window?: Window
}

// ============================================================================
// Draggable Item Types (for specific use cases)
// ============================================================================

/**
 * Base properties for a generic draggable item with visual representation.
 */
export interface GenericDraggableItem extends DraggableItemBase {
  /** Element to display as the drag handle */
  readonly dragElement?: ReactNode
  /** Width of the item (used for drag layer rendering) */
  readonly width: number
}

/**
 * Style object returned by getItemStyles utility.
 */
export type DragItemStyles =
  | { display: 'none' }
  | { transform: string; WebkitTransform: string }

/**
 * CSS properties for the drag layer container.
 */
export type DragLayerStyles = CSSProperties
