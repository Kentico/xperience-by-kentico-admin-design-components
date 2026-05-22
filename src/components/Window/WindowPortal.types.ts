import type { ReactNode } from 'react'

/**
 * Props for the WindowPortal component.
 * WindowPortal renders children into a dedicated DOM container managed by WindowManager.
 */
export interface WindowPortalProps {
  /**
   * Content to render in the portal.
   * This can include windows, modals, panels, or any overlay content.
   */
  readonly children: ReactNode
}
