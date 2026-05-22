import * as React from 'react';
import type { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import type { DraggableProviderWrapperProps } from './DraggableProviderWrapper.types'

/**
 * DraggableProviderWrapper provides the react-dnd context for drag and drop operations.
 *
 * Wrap your draggable components with this provider to enable drag and drop functionality.
 * Uses the HTML5 backend by default for native browser drag and drop support.
 *
 * @example
 * ```tsx
 * <DraggableProviderWrapper>
 *   <DraggableList items={items} />
 *   <ItemDragLayer />
 * </DraggableProviderWrapper>
 * ```
 *
 * @example Using with a specific window context (for iframes):
 * ```tsx
 * <DraggableProviderWrapper window={iframeRef.current?.contentWindow}>
 *   <DraggableContent />
 * </DraggableProviderWrapper>
 * ```
 */
export const DraggableProviderWrapper: FC<DraggableProviderWrapperProps> = ({
  children,
  window,
}) => {
  return (
    <DndProvider backend={HTML5Backend} context={window}>
      {children}
    </DndProvider>
  )
}
