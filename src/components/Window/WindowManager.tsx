import * as React from 'react';
import { useState, useCallback, type ReactNode } from 'react'
import { WindowContext } from './WindowContext'
import type { WindowContextType } from './WindowContext'
import type { WindowManagerProps } from './WindowManager.types'

/**
 * Provider component for managing a portal container for overlay rendering.
 *
 * WindowManager creates a dedicated DOM container element that WindowPortal
 * components use to render their content. This enables modals, dialogs, and
 * other overlays to break out of their parent container's overflow constraints.
 *
 * Place WindowManager at or near the root of your component tree to enable
 * portal-based rendering throughout your application.
 *
 * @example
 * ```tsx
 * // In your app root
 * import { WindowManager } from '@/components/Window'
 *
 * function App() {
 *   return (
 *     <WindowManager>
 *       <MyAppContent />
 *     </WindowManager>
 *   )
 * }
 *
 * // In any child component
 * import { WindowPortal } from '@/components/Window'
 *
 * function Modal({ isOpen, children }) {
 *   if (!isOpen) return null
 *
 *   return (
 *     <WindowPortal>
 *       <div className="modal-backdrop">
 *         <div className="modal-content">{children}</div>
 *       </div>
 *     </WindowPortal>
 *   )
 * }
 * ```
 */
export const WindowManager = (props: WindowManagerProps): ReactNode => {
  const [context, setContext] = useState<WindowContextType>({})

  /**
   * Ref callback to capture the container element when it mounts.
   * Updates the context state with the container reference.
   */
  const onRefChange = useCallback((ref: HTMLDivElement | null) => {
    setContext({ windowContainer: ref ?? undefined })
  }, [])

  return (
    <>
      <div ref={onRefChange} />
      <WindowContext.Provider value={context}>
        {props.children}
      </WindowContext.Provider>
    </>
  )
}

WindowManager.displayName = 'WindowManager'
