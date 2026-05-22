import { useEffect, useState, useRef, useCallback } from 'react'

/**
 * Detects scroll direction on the page.
 * Returns true when user is scrolling down, false otherwise.
 * @param throttleInterval Throttle interval in ms (default 500ms)
 */
export function useScrollDown(throttleInterval = 500): boolean {
  const [scrollingDown, setScrollingDown] = useState(false)
  const scrollTopRef = useRef(0)
  const timeoutRef = useRef<number | null>(null)

  const handleScroll = useCallback(() => {
    if (timeoutRef.current) return

    timeoutRef.current = window.setTimeout(() => {
      const currentScrollTop = window.scrollY
      setScrollingDown(currentScrollTop > scrollTopRef.current)
      scrollTopRef.current = currentScrollTop
      timeoutRef.current = null
    }, throttleInterval)
  }, [throttleInterval])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [handleScroll])

  return scrollingDown
}
