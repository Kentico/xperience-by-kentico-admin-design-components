import { useEffect, useState } from 'react'

/**
 * Breakpoint for mobile detection
 */
const DESKTOP_MIN = 600

/**
 * Detects whether virtual keyboard is visible on touch device.
 * Uses resize handler with minHeight change.
 * @param minKeyboardHeight Min height of keyboard to detect resize change.
 * @returns keyboardVisible sign.
 */
export function useMobileKeyboard(minKeyboardHeight = 200): boolean {
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const isScreenWidthMobile = window.screen.width < DESKTOP_MIN
      const newKeyboardVisible =
        isScreenWidthMobile &&
        window.screen.height - minKeyboardHeight > (window.visualViewport?.height ?? 0)
      if (keyboardVisible !== newKeyboardVisible) {
        setKeyboardVisible(newKeyboardVisible)
      }
    }

    window.visualViewport?.addEventListener('resize', handleResize)
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [keyboardVisible, minKeyboardHeight])

  return keyboardVisible
}
