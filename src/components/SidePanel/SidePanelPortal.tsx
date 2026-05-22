import * as React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  type FC,
} from 'react'
import { createPortal } from 'react-dom'
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside'
import { generateId } from '@/lib/generateId'
import { SidePanelCloseSource } from './SidePanel.types'
import type { SidePanelConfig, SidePanelId } from './SidePanel.types'
import { useSidePanel } from './SidePanelManagerContext'
import type {
  SidePanelPortalProps,
  SidePanelPortalContextType,
} from './SidePanelPortal.types'

/**
 * Base z-index for side panels from CSS tokens.
 * Each stacked panel increases by 10.
 */
const Z_INDEX_SIDEPANEL = 3000

/**
 * Default context value for SidePanelPortal.
 * Used when no parent portal exists (root level panels).
 */
const defaultPortalContext: SidePanelPortalContextType = {
  parentSidePanelId: undefined,
  stackLevel: 0,
}

/**
 * Context for managing nested SidePanel hierarchy.
 * Provides parent panel information and stack level to child panels.
 */
const SidePanelPortalContext = createContext<SidePanelPortalContextType>(defaultPortalContext)
SidePanelPortalContext.displayName = 'SidePanelPortalContext'

/**
 * Hook to access the current SidePanelPortal context.
 * @returns The portal context containing parent panel info and stack level.
 */
export const useSidePanelPortalContext = () => useContext(SidePanelPortalContext)

/**
 * SidePanelPortal manages the portal rendering and registration of side panels.
 *
 * Features:
 * - Renders panel content into a portal container
 * - Manages panel registration with SidePanelManager
 * - Handles click-outside to close
 * - Handles escape key to close (when on top of stack)
 * - Tracks panel width for offset calculations
 * - Provides context for nested panels
 *
 * @example
 * ```tsx
 * <SidePanelPortal
 *   isVisible={isOpen}
 *   onClose={handleClose}
 *   isOutsideClickCloseable={true}
 * >
 *   {(panelRef, zIndex, panelOffset) => (
 *     <div
 *       ref={panelRef}
 *       style={{ zIndex, right: panelOffset }}
 *     >
 *       Panel content
 *     </div>
 *   )}
 * </SidePanelPortal>
 * ```
 */
export const SidePanelPortal: FC<SidePanelPortalProps> = ({
  children,
  onRevealed,
  onCovered,
  onClose,
  isVisible,
  isOutsideClickCloseable,
}) => {
  const {
    addSidePanel,
    removeSidePanel,
    updateSidePanel,
    sidePanelContainer,
    getSidePanelOffset,
    getCurrentSidePanel,
  } = useSidePanel()

  const [status, setStatus] = useState<'closed' | 'registering' | 'open'>('closed')
  const parentContext = useContext(SidePanelPortalContext)
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  // Generate stable panel ID
  const id = useMemo(() => generateId() as SidePanelId, [])

  // Check if this panel is on top of the stack
  const isOnTopOfStack = getCurrentSidePanel() === id
  const canClickOutside = isOnTopOfStack && isOutsideClickCloseable

  // Track panel width for offset calculations
  const [panelWidth, setPanelWidth] = useState(0)

  // Resize observer to track panel width
  useEffect(() => {
    const element = panelRef.current
    if (!element) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        setPanelWidth(entry.contentRect.width)
      }
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [status])

  // Handle click outside
  const onClickOutside = useCallback(
    (event: Event) => {
      if (canClickOutside && status === 'open') {
        void (async () => {
          try {
            await onCloseRef.current({
              source: SidePanelCloseSource.ClickedOutside,
              eventPath: event.composedPath(),
            })
          } catch {
            // Close was blocked by the panel, do nothing
          }
        })()
      }
    },
    [canClickOutside, status]
  )

  useHandleClickOutside(panelRef, onClickOutside)

  // Handle escape key
  const onDocumentKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (status === 'open' && event.key === 'Escape' && isOnTopOfStack) {
        void (async () => {
          try {
            await onCloseRef.current({ source: SidePanelCloseSource.UserClosed })
          } catch {
            // Close was blocked by the panel, do nothing
          }
        })()
      }
    },
    [status, isOnTopOfStack]
  )

  useEffect(() => {
    document.addEventListener('keydown', onDocumentKeyDown)
    return () => {
      document.removeEventListener('keydown', onDocumentKeyDown)
    }
  }, [onDocumentKeyDown])

  // Panel removal handler with stable ref
  const panelRemoveRef = useRef(() => {
    removeSidePanel(id)
  })
  panelRemoveRef.current = () => {
    removeSidePanel(id)
    setStatus('closed')
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      panelRemoveRef.current()
    }
  }, [])

  // Build panel config
  const config = useMemo<SidePanelConfig>(
    () => ({
      ref: panelRef,
      close: (event) => onCloseRef.current(event),
      onRevealed,
      onCovered,
      isOutsideClickCloseable,
      panelWidth,
    }),
    [isOutsideClickCloseable, onCovered, onRevealed, panelWidth]
  )

  // Update config when panel is open
  useEffect(() => {
    if (status === 'open') {
      updateSidePanel(id, config)
    }
  }, [config, id, status, updateSidePanel])

  // Handle visibility changes
  useEffect(() => {
    if (isVisible) {
      if (status === 'closed') {
        setStatus('registering')
        void (async () => {
          try {
            await addSidePanel(id, parentContext.parentSidePanelId, config)
            setStatus('open')
          } catch {
            // Registration failed (e.g., blocked by another panel)
            setStatus('closed')
          }
        })()
      }
    } else if (status === 'open') {
      removeSidePanel(id)
      setStatus('closed')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])

  // Build context for child panels
  const panelContext = useMemo<SidePanelPortalContextType>(
    () => ({
      parentSidePanelId: id,
      stackLevel: parentContext.stackLevel + 1,
    }),
    [parentContext.stackLevel, id]
  )

  // Calculate z-index based on stack level
  const zIndex = Z_INDEX_SIDEPANEL + parentContext.stackLevel * 10

  // Render portal if visible and registered
  if (isVisible && status === 'open' && sidePanelContainer) {
    return createPortal(
      <SidePanelPortalContext.Provider value={panelContext}>
        {children(panelRef, zIndex, getSidePanelOffset(id))}
      </SidePanelPortalContext.Provider>,
      sidePanelContainer
    )
  }

  return null
}

SidePanelPortal.displayName = 'SidePanelPortal'
