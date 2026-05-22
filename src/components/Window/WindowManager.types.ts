import type { ReactNode } from 'react'

/**
 * Props for the WindowManager component.
 * WindowManager provides a container element for portal-based rendering.
 */
export interface WindowManagerProps {
  /**
   * Child components that can use WindowPortal for overlay rendering.
   * Any component within the tree can access the window container via useWindowContext.
   */
  readonly children: ReactNode
}
