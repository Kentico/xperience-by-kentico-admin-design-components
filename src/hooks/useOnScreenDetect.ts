import { useEffect, useMemo, useState, type RefObject } from 'react'

export function useOnScreenDetect(
  ref: RefObject<HTMLElement | null>,
  detectionThreshold: number = 0
) {
  const [isOnScreen, setIsOnScreen] = useState(false)

  const options = useMemo(() => {
    return {
      threshold: detectionThreshold,
    }
  }, [detectionThreshold])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsOnScreen(entry.isIntersecting)
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isOnScreen
}
