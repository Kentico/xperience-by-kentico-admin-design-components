import * as React from 'react';
import { forwardRef, useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Button } from '../Button'
import { ButtonColor, ButtonSize } from '../Button/Button.types'
import type { BarItemDraggableProps } from './BarItem.types'
import './BarItemDraggable.css'

/**
 * Optional drag handle props interface for DnD libraries
 * Compatible with @hello-pangea/dnd DraggableProvidedDragHandleProps
 */
interface DragHandleProps {
  readonly 'data-rfd-drag-handle-draggable-id'?: string
  readonly 'data-rfd-drag-handle-context-id'?: string
  readonly role?: string
  readonly tabIndex?: number
  readonly draggable?: boolean
  readonly onDragStart?: (event: React.DragEvent) => void
}

/**
 * Props for the BarItemDraggable wrapper
 * Extends BarItemDraggableProps with render callback support for DnD integration
 */
interface BarItemDraggableWrapperProps extends BarItemDraggableProps {
  /**
   * Optional render function for custom content rendering
   * Used when integrating with @hello-pangea/dnd
   */
  readonly renderContent?: (props: {
    isDragging: boolean
    expanded: boolean
    dragElement: ReactNode
    onHeaderClick: () => void
  }) => ReactNode
}

/**
 * BarItemDraggable provides a draggable wrapper for BarItem components.
 *
 * @remarks
 * This component manages expand/collapse state and provides a drag handle.
 * For full drag-and-drop functionality, wrap this component with a DragDropContext
 * and Droppable from @hello-pangea/dnd.
 *
 * @example
 * ```tsx
 * <BarItemDraggable
 *   draggableId="item-1"
 *   index={0}
 *   expanded={false}
 * >
 *   <BarItem headerColumns={[{ content: 'Item 1' }]} />
 * </BarItemDraggable>
 * ```
 */
export const BarItemDraggable = forwardRef<HTMLDivElement, BarItemDraggableWrapperProps>(
  (
    {
      expanded: expandedControlled = false,
      index,
      draggableId,
      children,
      renderContent,
      // Destructure non-DOM props from BarItemProps to prevent them leaking onto the div
      headerColumns: _headerColumns,
      dragElement: _dragElement,
      leadingButtons: _leadingButtons,
      isDragging: _isDragging,
      onHeaderClick: _onHeaderClick,
      disabled: _disabled,
      ...props
    },
    ref
  ) => {
    // Manage expanded state locally, synced with controlled prop
    const [expanded, setExpanded] = useState(expandedControlled)

    useEffect(() => {
      setExpanded(expandedControlled)
    }, [expandedControlled])

    const handleHeaderClick = () => {
      setExpanded(!expanded)
    }

    // Drag handle props for DnD integration
    const dragHandleProps: DragHandleProps = {
      'data-rfd-drag-handle-draggable-id': draggableId,
      role: 'button',
      tabIndex: 0,
      draggable: true,
    }

    // Create the drag handle element
    const dragElement = (
      <span className={cn(expanded && 'BarItemDraggable-dragButtonHidden')}>
        <Button
          icon="xp-dots-vertical"
          color={ButtonColor.Quinary}
          size={ButtonSize.S}
          aria-label="Drag to reorder"
          {...dragHandleProps}
        />
      </span>
    )

    // If a render function is provided (for DnD integration), use it
    if (renderContent) {
      return (
        <div
          ref={ref}
          className={'BarItemDraggable-draggableWrapper'}
          data-draggable-id={draggableId}
          data-index={index}
        >
          {renderContent({
            isDragging: false,
            expanded,
            dragElement,
            onHeaderClick: handleHeaderClick,
          })}
        </div>
      )
    }

    // Default rendering: simple wrapper with spacing
    return (
      <div
        ref={ref}
        className={'BarItemDraggable-draggableWrapper'}
        data-draggable-id={draggableId}
        data-index={index}
        {...props}
      >
        {children}
      </div>
    )
  }
)

BarItemDraggable.displayName = 'BarItemDraggable'
