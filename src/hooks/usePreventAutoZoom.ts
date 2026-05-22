import { useState, useEffect } from 'react'

/**
 * Prevents auto-zoom on iOS mobile browsers when focusing input fields.
 * Temporarily sets `user-scalable=0` on the viewport meta tag.
 *
 * @see https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone
 */
export const usePreventAutoZoom = () => {
  const [content, setContent] = useState<string>()
  const viewportElement = document.documentElement.querySelector(
    'head meta[name="viewport"]',
  )

  useEffect(() => {
    if (viewportElement) {
      setContent(viewportElement.getAttribute('content') || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const enableZoom = () => {
    if (viewportElement && content) {
      viewportElement.setAttribute('content', content)
    }
  }

  const disableZoom = () => {
    if (viewportElement) {
      viewportElement.setAttribute('content', content + ', user-scalable=0')
    }
  }

  return { enableZoom, disableZoom }
}
