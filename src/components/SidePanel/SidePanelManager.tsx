import * as React from 'react';
import { useCallback, useMemo, useRef, useState, type FC } from 'react'
import { Dimensions } from '@/components/Layout'
import { SidePanelManagerContext } from './SidePanelManagerContext'
import { SidePanelCloseSource } from './SidePanel.types'
import type { SidePanelConfig, SidePanelId, SidePanelManagerProps } from './SidePanel.types'

/**
 * Grid unit value in pixels (8px).
 */
const gridUnit = parseInt(Dimensions.GridUnit, 10)

/**
 * Margin between stacked panels (3 grid units = 24px).
 */
const levelMargin = 3 * gridUnit

/**
 * Sidebar width (12 grid units = 96px).
 * Used to calculate maximum panel offset.
 */
const sidebarWidth = 12 * gridUnit

/**
 * Maximum level that can be stacked with offset.
 * Panels beyond this level stack directly on top.
 */
const maxStackedLevel = 3

/**
 * SidePanelManager provides context for managing a stack of side panels.
 *
 * Features:
 * - Manages panel stack (add, remove, update)
 * - Calculates offsets for stacked panels
 * - Handles cascading close (closing parent closes children)
 * - Provides portal container for panel rendering
 * - Notifies panels of reveal/cover events
 *
 * @example
 * ```tsx
 * // Wrap your app with SidePanelManager
 * <SidePanelManager>
 *   <App />
 * </SidePanelManager>
 *
 * // Then use SidePanel components anywhere in the tree
 * <SidePanel isVisible={isOpen} onClose={handleClose} ... />
 * ```
 */
export const SidePanelManager: FC<SidePanelManagerProps> = ({ children }) => {
  /**
   * Stack of opened side panels with their configurations.
   * Using ref to avoid unnecessary re-renders on panel operations.
   */
  const openedSidePanels = useRef<{ readonly id: SidePanelId; config: SidePanelConfig }[]>([])

  /**
   * ID of the panel currently on top of the stack.
   * Used to determine which panel should handle click-outside events.
   */
  const [topSidePanelId, setTopSidePanelId] = useState<SidePanelId | undefined>()

  /**
   * Counter to force re-render of side panels when the stack changes.
   * Incrementing this triggers context consumers to re-calculate offsets.
   */
  const [panelsChange, setPanelsChange] = useState(0)

  /**
   * Container element for rendering side panel portals.
   */
  const [sidePanelContainer, setSidePanelContainer] = useState<HTMLDivElement | undefined>()

  /**
   * Returns the ID of the current top panel.
   */
  const getCurrentSidePanel = useCallback(() => topSidePanelId, [topSidePanelId])

  /**
   * Closes all panels above the given panel ID in the stack.
   * Used when a panel opens or closes to maintain stack integrity.
   */
  const closeAllChildSidePanels = useCallback(
    async (panelId: SidePanelId | undefined, source: SidePanelCloseSource) => {
      for (let i = openedSidePanels.current.length - 1; i >= 0; i--) {
        const panel = openedSidePanels.current[i]
        if (!panel || panel.id === panelId) {
          break
        }

        await panel.config.close({ source })
      }
    },
    []
  )

  /**
   * Adds a new side panel to the stack.
   * If the panel has a parent, it's inserted after the parent.
   * Closes any panels above the new panel's position.
   */
  const addSidePanel = useCallback(
    async (
      id: SidePanelId,
      parentSidePanelId: SidePanelId | undefined,
      config: SidePanelConfig
    ) => {
      const existingPanel = openedSidePanels.current.find((panel) => panel.id === id)

      if (!existingPanel) {
        const oldTop = openedSidePanels.current[openedSidePanels.current.length - 1]
        const parentIndex = openedSidePanels.current.findIndex(
          (panel) => panel.id === parentSidePanelId
        )

        // Insert panel after its parent (or at the beginning if no parent)
        openedSidePanels.current = [
          ...openedSidePanels.current.slice(0, parentIndex + 1),
          { id, config },
          ...openedSidePanels.current.slice(parentIndex + 1),
        ]

        try {
          // Close any panels that were above the insertion point
          await closeAllChildSidePanels(id, SidePanelCloseSource.ForeignPanelOpen)

          const newTop = openedSidePanels.current[openedSidePanels.current.length - 1]
          if (oldTop?.id !== newTop?.id) {
            oldTop?.config.onCovered?.(!config.isOutsideClickCloseable)
            newTop?.config.onRevealed?.()
            setTopSidePanelId(newTop?.id)
          }
        } catch (e) {
          // Exception thrown if any child panel refuses to close
          // Remove the newly added panel and notify it was blocked
          const panelIndex = openedSidePanels.current.findIndex((panel) => panel.id === id)
          if (panelIndex >= 0) {
            openedSidePanels.current.splice(panelIndex, 1)
          }
          void config.close({ source: SidePanelCloseSource.BlockedByForeignPanel })

          throw e
        }

        setPanelsChange((prev) => prev + 1)
      }
    },
    [closeAllChildSidePanels]
  )

  /**
   * Removes a side panel from the stack.
   * Also closes any child panels (panels above it in the stack).
   */
  const removeSidePanel = useCallback(
    (id: SidePanelId) => {
      const panelIndex = openedSidePanels.current.findIndex((panel) => panel.id === id)

      if (panelIndex >= 0) {
        void closeAllChildSidePanels(id, SidePanelCloseSource.ParentPanelClosed)

        const oldTop = openedSidePanels.current[openedSidePanels.current.length - 1]
        openedSidePanels.current.splice(panelIndex, 1)

        const newTop = openedSidePanels.current[openedSidePanels.current.length - 1]
        if (oldTop?.id !== newTop?.id) {
          newTop?.config.onRevealed?.()
          setTopSidePanelId(newTop?.id)
        }

        setPanelsChange((prev) => prev + 1)
      }
    },
    [closeAllChildSidePanels]
  )

  /**
   * Updates the configuration of an existing side panel.
   */
  const updateSidePanel = useCallback((id: SidePanelId, config: SidePanelConfig) => {
    const panel = openedSidePanels.current.find((panel) => panel.id === id)
    if (panel) {
      panel.config = config
      setPanelsChange((prev) => prev + 1)
    }
  }, [])

  /**
   * Calculates the right offset for a panel based on panels stacked above it.
   * Accounts for panel widths and level margins for the first few panels.
   */
  const getSidePanelOffset = useCallback(
    (id: SidePanelId) => {
      // Track this dependency to recalculate when panels change
      void panelsChange

      let maxWidthOfPanelsOnTop = 0

      for (let i = openedSidePanels.current.length - 1; i >= 0; i--) {
        const panel = openedSidePanels.current[i]
        let width = Math.max(panel.config.panelWidth ?? 0, maxWidthOfPanelsOnTop)

        // Add margin for the first N (maxStackedLevel) panels,
        // if there is at least one panel above which is wider than current
        if (i < maxStackedLevel && openedSidePanels.current.length > i + 1) {
          if (maxWidthOfPanelsOnTop + levelMargin >= (panel.config.panelWidth ?? 0)) {
            width += levelMargin
          }
        }

        maxWidthOfPanelsOnTop = width

        if (panel.id === id) {
          break
        }
      }

      const panelWidth =
        openedSidePanels.current.find((panel) => panel.id === id)?.config.panelWidth ?? 0

      // Subtract the panel's own width (it was included in maxWidthOfPanelsOnTop)
      const offset = maxWidthOfPanelsOnTop - panelWidth

      // If offset + panel would extend past body width minus sidebar, return 0
      // (handles maximized panels or very wide panels)
      return document.body.offsetWidth > offset + panelWidth + sidebarWidth ? offset : 0
    },
    [panelsChange]
  )

  /**
   * Returns the ref to the current top panel's root element.
   */
  const getCurrentSidePanelRef = useCallback(
    () => openedSidePanels.current[openedSidePanels.current.length - 1]?.config.ref ?? null,
    []
  )

  /**
   * Callback ref for the panel container div.
   */
  const onSidePanelContainerRefChange = useCallback((ref: HTMLDivElement | null) => {
    setSidePanelContainer(ref ?? undefined)
  }, [])

  /**
   * Context value provided to all SidePanel components.
   */
  const context = useMemo(
    () => ({
      getCurrentSidePanel,
      addSidePanel,
      removeSidePanel,
      updateSidePanel,
      getSidePanelOffset,
      getCurrentSidePanelRef,
      sidePanelContainer,
    }),
    [
      addSidePanel,
      getCurrentSidePanel,
      getCurrentSidePanelRef,
      getSidePanelOffset,
      removeSidePanel,
      updateSidePanel,
      sidePanelContainer,
    ]
  )

  return (
    <SidePanelManagerContext.Provider value={context}>
      <div ref={onSidePanelContainerRefChange} id="sidePanelPlaceholder" />
      {children}
    </SidePanelManagerContext.Provider>
  )
}

SidePanelManager.displayName = 'SidePanelManager'
