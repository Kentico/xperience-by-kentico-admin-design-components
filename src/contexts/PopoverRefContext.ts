import { createContext, useContext } from 'react'

/**
 * Context for providing a container element reference for portal-based popovers.
 * Used by react-aria-components `<Popover>` via `UNSTABLE_portalContainer`.
 *
 * The provider should wrap its children with a `<div ref={...}>` and pass
 * the ref value through this context so popovers mount inside that container.
 */
export const PopoverRefContext = createContext<HTMLDivElement | null>(null)

/**
 * Returns the popover container ref from the nearest `PopoverRefContext.Provider`.
 * Used by DateTimeInput and DateTimeRangeInput to mount RAC popovers.
 */
export const usePopoverContainerRef = () => useContext(PopoverRefContext)
