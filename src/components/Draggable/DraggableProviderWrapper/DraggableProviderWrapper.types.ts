import type { ReactNode } from 'react'

/**
 * Props for the DraggableProviderWrapper component.
 * This component wraps react-dnd's DndProvider to enable drag and drop functionality.
 */
export interface DraggableProviderWrapperProps {
  /**
   * Content to render within the DnD provider context.
   * All draggable components must be descendants of this provider.
   */
  readonly children: ReactNode
  /**
   * Window object reference for the DnD backend.
   * Useful for iframe or multi-window scenarios where you need to
   * specify which window context to use for drag operations.
   * @default undefined (uses the global window)
   */
  readonly window?: Window
}
