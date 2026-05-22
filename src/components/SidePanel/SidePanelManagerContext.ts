import { createContext, useContext } from 'react'
import type { SidePanelManagerContextType } from './SidePanel.types'

/**
 * Default context value with stub functions.
 * This allows the context to be used without a provider, but operations will be no-ops.
 */
const defaultContextValue: SidePanelManagerContextType = {
  getCurrentSidePanel: () => undefined,
  addSidePanel: () => Promise.reject(new Error('SidePanelManagerContext not available')),
  removeSidePanel: () => {},
  updateSidePanel: () => {},
  getSidePanelOffset: () => 0,
  getCurrentSidePanelRef: () => null,
}

/**
 * Context for managing SidePanel instances.
 * Provides methods to add, remove, update, and query side panels.
 */
export const SidePanelManagerContext = createContext<SidePanelManagerContextType>(defaultContextValue)
SidePanelManagerContext.displayName = 'SidePanelManagerContext'

/**
 * Hook to access the SidePanelManager context.
 * @returns The SidePanelManager context value.
 */
export const useSidePanel = () => useContext(SidePanelManagerContext)
