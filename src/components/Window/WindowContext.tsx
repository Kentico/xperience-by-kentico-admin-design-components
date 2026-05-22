import { createContext, useContext } from 'react'

/**
 * Context type for sharing window container reference.
 * The container is used by WindowPortal to render portal content.
 */
export interface WindowContextType {
  /** The container element for portal rendering */
  readonly windowContainer?: HTMLDivElement
}

/**
 * Default context value with no container.
 * Returns undefined windowContainer when used outside of a WindowManager provider.
 */
const defaultContextValue: WindowContextType = {}

/**
 * Context for managing window container reference across the application.
 * Use with WindowManager to enable portal-based rendering.
 */
export const WindowContext = createContext<WindowContextType>(defaultContextValue)
WindowContext.displayName = 'WindowContext'

/**
 * Hook to access window context for portal rendering.
 *
 * @example
 * ```tsx
 * const { windowContainer } = useWindowContext()
 *
 * // Use with WindowPortal
 * if (windowContainer) {
 *   return <WindowPortal container={windowContainer}>content</WindowPortal>
 * }
 * ```
 *
 * @returns The window context value with optional container reference
 */
export const useWindowContext = (): WindowContextType => {
  return useContext(WindowContext)
}
