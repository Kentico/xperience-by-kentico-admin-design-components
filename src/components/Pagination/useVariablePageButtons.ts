import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react'
import { createPageButtons } from './createPageButtons'
import type { ButtonModel } from './Pagination.types'

type AddRefType = (key: number) => (instance: HTMLElement | null) => void

const getWidth = (el: HTMLElement): number => {
  const { marginLeft, marginRight } = window.getComputedStyle(el)
  return (
    el.getBoundingClientRect().width +
    parseFloat(marginLeft) +
    parseFloat(marginRight)
  )
}

/**
 * Hook for dynamically adjusting the number of page buttons based on container width.
 * Uses ResizeObserver to detect container size changes and adjusts the page button
 * count between 3 and 5 buttons to fit the available space.
 *
 * @param selectedPage - Currently selected page number
 * @param totalPages - Total number of pages
 * @param paginationContainer - Ref to the pagination container element
 * @returns Tuple of [addRefFunction, pageButtons] - function to track element refs and array of page button models
 */
export const useVariablePageButtons = <T extends HTMLElement>(
  selectedPage: number,
  totalPages: number,
  paginationContainer: RefObject<T | null>
): [AddRefType, ButtonModel[]] => {
  const [pageButtonCount, setPageButtonCount] = useState<number>(5)
  const [containerWidth, setContainerWidth] = useState<number | undefined>(
    undefined
  )
  const pageButtons = createPageButtons(pageButtonCount, selectedPage, totalPages)
  const visibleItems = useRef(new Map<number, HTMLElement>())

  // Track container width using ResizeObserver
  useLayoutEffect(() => {
    const container = paginationContainer.current
    if (!container) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })

    observer.observe(container)

    // Set initial width
    setContainerWidth(container.offsetWidth)

    return () => {
      observer.disconnect()
    }
  }, [paginationContainer])

  const addRefToVisibleItems = useCallback((key: number) => {
    return (instance: HTMLElement | null) => {
      if (instance instanceof HTMLElement) {
        visibleItems.current.set(key, instance)
      } else {
        visibleItems.current.delete(key)
      }
    }
  }, [])

  useLayoutEffect(() => {
    const allPageButtonsWidth = Array.from(visibleItems.current.values())
      .map(getWidth)
      .reduce((acc, cur) => acc + cur, 0)

    const containerElementWidth =
      paginationContainer.current?.offsetWidth ?? Number.MAX_VALUE
    const averageButtonWidth = Math.ceil(
      allPageButtonsWidth / visibleItems.current.size
    )

    const remainingWidth = containerElementWidth - allPageButtonsWidth

    if (remainingWidth > averageButtonWidth) {
      setPageButtonCount((prevState) => {
        return prevState + 1 <= 5 ? prevState + 1 : prevState
      })
    } else if (remainingWidth <= 0) {
      setPageButtonCount((prevState) => {
        return prevState - 1 >= 3 ? prevState - 1 : prevState
      })
    }
  }, [containerWidth, selectedPage, paginationContainer])

  return [addRefToVisibleItems, pageButtons]
}
