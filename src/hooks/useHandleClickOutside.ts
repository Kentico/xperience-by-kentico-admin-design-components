import { useEffect, type RefObject } from 'react'

const mouseMainButton = 0
const forceClickOutsideEventType = 'ForceClickOutside'

/**
 * Detects clicks outside a specified element and triggers a callback.
 * Useful for closing dropdowns, modals, and other overlay elements.
 *
 * Features:
 * - Listens for mousedown events on the document
 * - Supports shadow DOM via composedPath()
 * - Elements with `data-ignoredByClickoutside="true"` attribute will be ignored
 * - Supports force close via `forceClickOutside()` utility function
 *
 * @param ref - Reference to the element to monitor for outside clicks
 * @param onClickOutside - Callback invoked when a click outside is detected
 */
export function useHandleClickOutside(
  ref: RefObject<HTMLElement | null>,
  onClickOutside: (event: Event) => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const closable = ref.current

      if (closable && event.button === mouseMainButton) {
        if (closable.contains(event.target as Node)) {
          return
        }

        const path = event.composedPath()
        if (path.includes(closable)) {
          return
        }

        const firstIgnore = path.find((item) => {
          return item instanceof HTMLElement && item.dataset.ignoredByClickoutside === 'true'
        })

        if (!(firstIgnore instanceof HTMLElement) || firstIgnore.contains(closable)) {
          onClickOutside(event)
        }
      }
    }

    const forceClose = (e: CustomEvent) => {
      onClickOutside(e.detail as Event)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener(forceClickOutsideEventType, forceClose as EventListener)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener(forceClickOutsideEventType, forceClose as EventListener)
    }
  }, [ref, onClickOutside])
}

/**
 * Programmatically triggers all click-outside handlers.
 * Useful for closing all open dropdowns/modals on escape key or navigation.
 *
 * @param e - Optional mouse event to pass to handlers
 */
export function forceClickOutside(e?: MouseEvent) {
  if (!e || e.button === mouseMainButton) {
    const ev = new CustomEvent(forceClickOutsideEventType, { detail: e })
    document.dispatchEvent(ev)
  }
}
