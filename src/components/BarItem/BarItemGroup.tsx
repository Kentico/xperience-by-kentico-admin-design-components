import * as React from 'react';
import { forwardRef, type ForwardedRef } from 'react'
import { cn } from '@/lib/cn'
import type { BarItemGroupProps } from './BarItem.types'
import './BarItemGroup.css'

/**
 * BarItemGroup provides a container for draggable BarItem components.
 *
 * @remarks
 * This component serves as a droppable container for BarItemDraggable children.
 * For full drag-and-drop functionality, this component is designed to work with
 * @hello-pangea/dnd. When the library is available, wrap this component's logic
 * with DragDropContext and Droppable.
 *
 * In standalone mode (without @hello-pangea/dnd), this component renders children
 * in a positioned container with proper spacing and data attributes for future
 * DnD integration.
 *
 * @example
 * ```tsx
 * // Basic usage (without DnD)
 * <BarItemGroup droppableId="my-list" onDragEnd={handleDragEnd}>
 *   <BarItemDraggable draggableId="item-1" index={0}>
 *     <BarItem headerColumns={[{ content: 'Item 1' }]} />
 *   </BarItemDraggable>
 *   <BarItemDraggable draggableId="item-2" index={1}>
 *     <BarItem headerColumns={[{ content: 'Item 2' }]} />
 *   </BarItemDraggable>
 * </BarItemGroup>
 * ```
 */
export const BarItemGroup = forwardRef(
  (
    { droppableId, onDragEnd: _onDragEnd, children }: BarItemGroupProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    // Note: onDragEnd is accepted but not used in standalone mode
    // When @hello-pangea/dnd is integrated, it will be passed to DragDropContext

    return (
      <div
        ref={ref}
        className={cn('BarItemGroup-droppable')}
        data-droppable-id={droppableId}
        data-rbd-droppable-id={droppableId}
        data-rbd-droppable-context-id="0"
      >
        {children}
      </div>
    )
  }
)

BarItemGroup.displayName = 'BarItemGroup'
