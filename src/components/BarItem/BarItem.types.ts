import type { KeyboardEvent, MouseEvent, ReactNode } from 'react'

/**
 * BarItem header column alignment options
 */
export const BarItemHeaderColumnAlign = {
  Left: 'left',
  Right: 'right',
} as const

export type BarItemHeaderColumnAlign =
  (typeof BarItemHeaderColumnAlign)[keyof typeof BarItemHeaderColumnAlign]

/**
 * Drag result from @hello-pangea/dnd or compatible DnD library
 * Minimal type definition for drag-and-drop operations
 */
export interface DropResult {
  readonly draggableId: string
  readonly source: {
    readonly droppableId: string
    readonly index: number
  }
  readonly destination?: {
    readonly droppableId: string
    readonly index: number
  } | null
  readonly reason: 'DROP' | 'CANCEL'
}

/**
 * BarItem header column configuration
 */
export interface BarItemHeaderColumn {
  /** Column width in pixels */
  readonly width?: number
  /** Column content alignment */
  readonly align?: BarItemHeaderColumnAlign
  /** Column content */
  readonly content: ReactNode
}

/**
 * Leading button configuration for BarItem
 */
export interface LeadingButtonProps {
  /** Button label for accessibility */
  readonly label: string
  /** Icon name to display */
  readonly icon: string
  /** Whether the button is disabled */
  readonly disabled?: boolean
  /** Whether the button has destructive styling */
  readonly destructive?: boolean
  /** Tooltip text */
  readonly tooltip?: string
  /** Click handler */
  readonly onClick?: (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
  ) => void
}

/**
 * BarItem component props
 */
export interface BarItemProps {
  /** Custom drag handle element */
  readonly dragElement?: ReactNode
  /** Array of leading buttons to display */
  readonly leadingButtons?: LeadingButtonProps[]
  /** Whether the item is expanded */
  readonly expanded?: boolean
  /** Whether the item is currently being dragged */
  readonly isDragging?: boolean
  /** Handler for header click events */
  readonly onHeaderClick?: () => void
  /** Content to render inside the BarItem */
  readonly children?: ReactNode
  /** Header columns configuration */
  readonly headerColumns?: BarItemHeaderColumn[]
  /** Whether the BarItem is disabled */
  readonly disabled?: boolean
}

/**
 * BarItemDraggable component props
 * Extends BarItemProps with drag-and-drop specific properties
 */
export interface BarItemDraggableProps extends BarItemProps {
  /** Unique identifier for the draggable item */
  readonly draggableId: string
  /** Index position in the droppable container */
  readonly index: number
}

/**
 * BarItemGroup component props
 * Container for drag-and-drop BarItems
 */
export interface BarItemGroupProps {
  /** Unique identifier for the droppable container */
  readonly droppableId: string
  /** Handler called when a drag operation ends */
  readonly onDragEnd: (result: DropResult) => void
  /** BarItemDraggable children */
  readonly children: ReactNode
}
