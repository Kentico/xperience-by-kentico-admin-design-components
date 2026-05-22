import { useEffect, useRef, type RefObject } from 'react'

export function useResizeObserver({
  ref,
  onResize,
}: {
  ref: RefObject<Element | null>
  onResize: () => void
}) {
  const onResizeRef = useRef(onResize)
  onResizeRef.current = onResize

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new ResizeObserver(() => {
      onResizeRef.current()
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])
}
