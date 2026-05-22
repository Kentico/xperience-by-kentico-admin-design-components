import { useState, useEffect } from 'react'

/**
 * Breakpoint values matching CSS tokens.
 */
const BREAKPOINTS = {
  mobile: 599.98, // --media-mobile-max
  desktop: 600, // --media-desktop-min
  sm: 1365.98, // --media-sm-max
  md: 1366, // --media-md-min
  mdMax: 1919.98, // --media-md-max
  lg: 1920, // --media-lg-min
} as const

export interface MediaBreakpoints {
  /** Viewport is mobile width (< 600px) - alias for isMobile */
  mobile: boolean
  /** Viewport is mobile width (< 600px) */
  isMobile: boolean
  /** Viewport is desktop width (>= 600px) */
  isDesktop: boolean
  /** Viewport is small (< 1366px) */
  isSmall: boolean
  /** Viewport is medium (1366px - 1919px) */
  isMedium: boolean
  /** Viewport is large (>= 1920px) */
  isLarge: boolean
  /** Current viewport width */
  width: number
}

/**
 * Hook that provides responsive breakpoint states based on window width.
 * Updates automatically when the window is resized.
 */
export function useMediaBreakpoints(): MediaBreakpoints {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = width <= BREAKPOINTS.mobile

  return {
    mobile: isMobile,
    isMobile,
    isDesktop: width >= BREAKPOINTS.desktop,
    isSmall: width <= BREAKPOINTS.sm,
    isMedium: width >= BREAKPOINTS.md && width <= BREAKPOINTS.mdMax,
    isLarge: width >= BREAKPOINTS.lg,
    width,
  }
}
