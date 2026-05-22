import * as React from 'react';
import { useCallback, useRef, useState } from 'react'
import { useDrag, useDrop, type DropTargetMonitor, type DragSourceMonitor, type XYCoord } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { cn } from '@/lib/cn'
import { Button } from '../../Button'
import { ButtonColor, ButtonSize } from '../../Button/Button.types'
import { ItemSelectorViewMode } from '../Draggable.types'
import { getDraggableItemType } from '../utils'
import type {
  TableRowDraggableProps,
  TableRowDraggableItem,
  TableRowDraggableChildrenFn,
  DragHandleButtonProps,
} from './TableRowDraggable.types'
import './TableRowDraggable.css'

/**
 * Internal drag handle button component.
 */
const DragHandleButton = ({
  disabled,
  isDragging,
  onMouseDown,
  className,
  dragRef,
}: DragHandleButtonProps & { dragRef?: React.Ref<HTMLButtonElement> }) => {
  return (
    <div
      onMouseDown={onMouseDown}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onMouseDown?.()
        }
      }}
    >
      <Button
        className={cn(
          'TableRowDraggable-draggableHandleButton',
          disabled && 'TableRowDraggable-disabled',
          isDragging && 'TableRowDraggable-dragging',
          className
        )}
        icon="xp-dots-vertical"
        color={ButtonColor.Quinary}
        size={ButtonSize.S}
        ref={dragRef}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation()
        }}
        aria-label="Drag to reorder"
      />
    </div>
  )
}

/**
 * Determines whether the position of items when dragging in list mode should be switched.
 * Used to prevent 'oscillation' of items when dragging.
 *
 * @param ref - Reference to the draggable item element
 * @param monitor - The drop target monitor from react-dnd
 * @returns true if the item position should be switched, false otherwise
 */
const switchItemPosition = (
  ref: React.RefObject<HTMLDivElement | null>,
  monitor: DropTargetMonitor
): boolean => {
  if (!ref.current) {
    return false
  }

  const hoverBoundingRect = ref.current.getBoundingClientRect()

  // Get the offsets to the top and bottom for position switch
  const offsetTop = hoverBoundingRect.height / 4
  const offsetBottom = hoverBoundingRect.height * 0.75

  const clientOffset = monitor.getClientOffset()
  if (!clientOffset) {
    return false
  }

  const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

  // Only perform the move when the mouse has crossed 1/4 of the items height
  // When dragging downwards, only move when the cursor is below 25%
  // When dragging upwards, only move when the cursor is above 25%
  if (hoverClientY < offsetTop || hoverClientY > offsetBottom) {
    return false
  }

  return true
}

/**
 * TableRowDraggable provides drag-and-drop functionality for table rows or list items.
 *
 * Wrap any row content with this component to enable reordering via drag and drop.
 * The component provides a drag handle button and manages all drag state internally.
 *
 * @remarks
 * - Must be used within a DraggableProviderWrapper context
 * - Use ItemDragLayer to render custom drag previews
 * - The typeGroup prop allows multiple independent drag zones on the same page
 *
 * @example Basic usage
 * ```tsx
 * <DraggableProviderWrapper>
 *   {items.map((item, index) => (
 *     <TableRowDraggable
 *       key={item.id}
 *       index={index}
 *       identifier={item.id}
 *       onDragOver={handleDragOver}
 *     >
 *       <TableRow cells={item.cells} />
 *     </TableRowDraggable>
 *   ))}
 *   <ItemDragLayer renderListPreview={...} />
 * </DraggableProviderWrapper>
 * ```
 *
 * @example With type groups for independent drag zones
 * ```tsx
 * <TableRowDraggable
 *   typeGroup="list-1"
 *   index={index}
 *   identifier={item.id}
 *   onDragOver={handleDragOver}
 * >
 *   <MyRowComponent />
 * </TableRowDraggable>
 * ```
 *
 * @example Disabled drag and drop
 * ```tsx
 * <TableRowDraggable
 *   isDragAndDropDisabled
 *   index={index}
 *   identifier={item.id}
 *   onDragOver={handleDragOver}
 * >
 *   <MyRowComponent />
 * </TableRowDraggable>
 * ```
 */
export const TableRowDraggable = ({
  index,
  typeGroup,
  identifier,
  children,
  disabled = false,
  selected = false,
  isDraggable = true,
  isDragAndDropDisabled = false,
  onDragOver,
  onDragInitiated,
  onClick,
  className,
}: TableRowDraggableProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)

  const itemType = getDraggableItemType(ItemSelectorViewMode.List, typeGroup)

  // Handle drag over event with position switch logic
  const handleDragOver = useCallback(
    (dragItemIdentifier: string, hoverIndex: number, monitor: DropTargetMonitor) => {
      if (switchItemPosition(ref, monitor)) {
        onDragOver(dragItemIdentifier, hoverIndex)
      }
    },
    [onDragOver]
  )

  const handleOnDragMouseDown = useCallback(() => {
    onDragInitiated?.()
  }, [onDragInitiated])

  // Create the draggable item data
  const dragItem: TableRowDraggableItem = {
    index,
    identifier,
    onDragOver: handleDragOver,
    width,
    selected,
    dragElement: null, // Will be set by the drag button
  }

  // Setup drop target
  const [, drop] = useDrop<TableRowDraggableItem>({
    accept: itemType,
    hover(item: TableRowDraggableItem, monitor: DropTargetMonitor<TableRowDraggableItem>) {
      if (item.identifier !== identifier) {
        handleDragOver(item.identifier, index, monitor)
      }
    },
  })

  // Setup drag source
  const [{ isDragging, draggedItemType }, drag, preview] = useDrag(
    () => ({
      type: itemType,
      item: dragItem,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: !!monitor.isDragging(),
        draggedItemType: monitor.getItemType(),
      }),
      canDrag: () => isDraggable && !isDragAndDropDisabled && !disabled,
    }),
    [itemType, dragItem, isDraggable, isDragAndDropDisabled, disabled]
  )

  // Use empty image for drag preview (we'll render custom preview in ItemDragLayer)
  preview(getEmptyImage())

  // Measure the element width for drag preview sizing
  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      ref.current = node
      setWidth(node.getBoundingClientRect().width)
    }
  }, [])

  // Create drag handle button element
  const dragElement =
    isDraggable && !isDragAndDropDisabled ? (
      <DragHandleButton
        disabled={disabled}
        isDragging={!!draggedItemType}
        onMouseDown={handleOnDragMouseDown}
        dragRef={(el) => {
          if (!disabled && !isDragAndDropDisabled) {
            drag(el)
          }
        }}
      />
    ) : undefined

  return (
    <div ref={measuredRef} className={cn('TableRowDraggable-draggableWrapper', className)}>
      <div
        ref={(node) => { drop(node) }}
        className={cn(isDragging && 'TableRowDraggable-rowDragging')}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onClick()
                }
              }
            : undefined
        }
      >
        {/* Render children, passing drag element if children is a function */}
        {typeof children === 'function'
          ? (children as TableRowDraggableChildrenFn)({ dragElement })
          : children}
      </div>
    </div>
  )
}

TableRowDraggable.displayName = 'TableRowDraggable'
