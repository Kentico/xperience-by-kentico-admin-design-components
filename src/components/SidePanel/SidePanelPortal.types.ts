import type { ReactNode, RefObject } from 'react'
import type { SidePanelCloseEvent, SidePanelId } from './SidePanel.types'

/**
 * Context type for SidePanelPortal.
 * Provides parent panel information to nested panels.
 */
export interface SidePanelPortalContextType {
  /**
   * Id of the parent side panel. Undefined if there is no parent.
   */
  readonly parentSidePanelId: SidePanelId | undefined
  /**
   * The height of the panel stack.
   */
  readonly stackLevel: number
}

/**
 * SidePanelPortal component props.
 * Manages the portal rendering and registration of side panels.
 */
export interface SidePanelPortalProps {
  /**
   * Renders the panel content. Called only if the panel is registered
   * and successfully added to SidePanelManager.
   * @param panelRef Reference to the root view of the panel.
   * @param zIndex Z height of the panel content. You should set this to root panel view style.
   * @param panelOffset Right panel offset. You should set this to root panel view style.
   * @returns Content of the panel.
   */
  readonly children: (
    panelRef: RefObject<HTMLDivElement>,
    zIndex: number,
    panelOffset: number
  ) => ReactNode
  /**
   * Called when the panel is open or is on top of panel stack.
   */
  readonly onRevealed?: () => void
  /**
   * Called when the panel is covered by another panel.
   * @param isUserInteractable Specifies if user can interact with the panel even though it is covered.
   */
  readonly onCovered?: (isUserInteractable: boolean) => void
  /**
   * Called when panel should be closed.
   * @param event Closing event.
   */
  readonly onClose: (event: SidePanelCloseEvent) => void | Promise<void>
  /**
   * Enables if the panel is visible. The panel can be blocked from becoming visible.
   * In that case the onClose is called.
   */
  readonly isVisible: boolean
  /**
   * Enables if the panel will be closed by clicking outside of the panel.
   * By default true.
   */
  readonly isOutsideClickCloseable: boolean
}
