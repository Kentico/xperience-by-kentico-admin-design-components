import { createPortal } from 'react-dom'
import { useWindowContext } from './WindowContext'
import type { WindowPortalProps } from './WindowPortal.types'

/**
 * Portal wrapper that renders children into a dedicated DOM container.
 *
 * WindowPortal places content close to the document root, outside of the
 * component hierarchy. This is essential for modals, dialogs, and overlays
 * that need to break out of overflow:hidden containers and appear above
 * all other content.
 *
 * The portal target container is managed by WindowManager and accessed
 * via WindowContext.
 *
 * @example
 * ```tsx
 * // Wrap WindowManager around your app
 * <WindowManager>
 *   <App />
 * </WindowManager>
 *
 * // Use WindowPortal for overlay content
 * <WindowPortal>
 *   <Dialog isOpen={isOpen} onClose={handleClose}>
 *     Dialog content here
 *   </Dialog>
 * </WindowPortal>
 * ```
 *
 * @param props - {@link WindowPortalProps}
 * @returns Portal content rendered in the window container, or null if no container available
 */
export const WindowPortal = (props: WindowPortalProps) => {
  const { windowContainer } = useWindowContext()

  // Return null if no container is available
  // This handles the case when WindowPortal is used outside of WindowManager
  if (!windowContainer) {
    return null
  }

  return createPortal(props.children, windowContainer)
}

WindowPortal.displayName = 'WindowPortal'
