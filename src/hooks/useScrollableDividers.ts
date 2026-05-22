import { useCallback, useEffect, useState, type RefObject } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useResizeObserver } from './useResizeObserver'

/**
 * Tracks scroll position and content overflow for a scrollable container,
 * returning booleans for top/bottom divider visibility.
 *
 * Adapted from source `useScrollableDividers.ts`:
 * - Uses target's callback-based `useResizeObserver` instead of npm `use-resize-observer`
 * - Debounces scroll handler at 100ms via `use-debounce`
 * - Reacts to both content and container resize
 */
export function useScrollableDividers(
  scrollableContainerRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  isVisible: boolean = true
) {
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [isTopDividerShown, setIsTopDividerShown] = useState(false)
  const [isBottomDividerShown, setIsBottomDividerShown] = useState(false)

  const recalculateDividersVisibility = useCallback(() => {
    if (!isVisible) return

    const scrollableElement = scrollableContainerRef.current
    if (scrollableElement) {
      const scrollTop = scrollableElement.scrollTop
      setIsTopDividerShown(isOverflowing ? scrollTop > 0 : false)
      setIsBottomDividerShown(
        isOverflowing
          ? scrollTop < scrollableElement.scrollHeight - scrollableElement.offsetHeight
          : false
      )
    }
  }, [isOverflowing, scrollableContainerRef, isVisible])

  useEffect(() => {
    recalculateDividersVisibility()
  }, [recalculateDividersVisibility])

  const recalculateOverflow = useCallback(() => {
    if (!isVisible) return

    const element = scrollableContainerRef.current
    if (element) {
      setIsOverflowing(element.clientHeight < element.scrollHeight)
    }
  }, [scrollableContainerRef, isVisible])

  // Triggers on height change of children (lazy loading, dynamic content)
  useResizeObserver({ ref: contentRef, onResize: recalculateOverflow })

  // Triggers on height change of scrollable container (screen resizing)
  useResizeObserver({ ref: scrollableContainerRef, onResize: recalculateOverflow })

  const onScroll = useDebouncedCallback(recalculateDividersVisibility, 100)

  return { isTopDividerShown, isBottomDividerShown, onScroll }
}
