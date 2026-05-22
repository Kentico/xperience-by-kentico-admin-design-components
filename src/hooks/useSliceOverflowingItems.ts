import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  type RefObject,
} from 'react'

export type SliceFrom = 'Beginning' | 'End'

type VisibleItemId = number | string
type VisibleItemsById = Map<VisibleItemId, HTMLElement>

interface SplitItems<TItem> {
  readonly allItems: ReadonlyArray<TItem>
  readonly visibleItems: ReadonlyArray<TItem>
  readonly hiddenItems: ReadonlyArray<TItem>
  readonly thresholdWidth: number
}

type Action<TItem> =
  | { readonly type: 'resized'; readonly thresholdWidth: number }
  | { readonly type: 'itemsChanged'; readonly items: ReadonlyArray<TItem> }
  | {
      readonly type: 'rendered'
      readonly visibleItemsById: VisibleItemsById
      readonly sliceFrom: SliceFrom
      readonly containerRef: RefObject<HTMLElement | null>
    }

const getLast = <T>(array: ReadonlyArray<T>): T => array[array.length - 1]

const areShallowEqual = <T extends object>(a: T, b: T): boolean => {
  for (const key in a) {
    if (!(key in b) || a[key] !== b[key]) return false
  }
  for (const key in b) {
    if (!(key in a) || a[key] !== b[key]) return false
  }
  return true
}

const sliceItems = <TItem>(
  allItems: ReadonlyArray<TItem>,
  lastVisibleIndex: number | null,
  sliceFrom: SliceFrom
): [visibleItems: ReadonlyArray<TItem>, hiddenItems: ReadonlyArray<TItem>] => {
  if (lastVisibleIndex === null) {
    return [[], allItems]
  }

  if (sliceFrom === 'Beginning') {
    return [
      allItems.slice(-1 * (lastVisibleIndex + 1)),
      allItems.slice(0, -1 * (lastVisibleIndex + 1)),
    ]
  }

  return [allItems.slice(0, lastVisibleIndex + 1), allItems.slice(lastVisibleIndex + 1)]
}

const getLastVisibleIndex = (
  thresholdWidth: number,
  itemsWidthAcc: ReadonlyArray<number>
): number | null => {
  const indexOfFirstNotVisibleItem = itemsWidthAcc.findIndex(
    (accWidth) => accWidth > thresholdWidth
  )

  if (indexOfFirstNotVisibleItem === 0) {
    return null
  }

  return indexOfFirstNotVisibleItem === -1
    ? itemsWidthAcc.length - 1
    : indexOfFirstNotVisibleItem - 1
}

const sortVisibleItems = (
  visibleItemsById: VisibleItemsById,
  direction: SliceFrom
): ReadonlyArray<HTMLElement> => {
  const visibleItems = Array.from(visibleItemsById.values())
  return direction === 'End' ? visibleItems : visibleItems.reverse()
}

const getAccumulatedItemsWidth = (
  visibleItemsById: VisibleItemsById,
  sliceFrom: SliceFrom
): ReadonlyArray<number> => {
  const visibleItems = sortVisibleItems(visibleItemsById, sliceFrom)
  const itemsWidth = visibleItems.filter(Boolean).map((item) => {
    const marginLeft = parseInt(window.getComputedStyle(item).getPropertyValue('margin-left'))
    const marginRight = parseInt(window.getComputedStyle(item).getPropertyValue('margin-right'))
    return item.scrollWidth + marginLeft + marginRight
  })

  return itemsWidth.reduce((itemWidths: number[], nextItemWidth) => {
    const lastWidth = itemWidths.length > 0 ? getLast(itemWidths) : 0
    return [...itemWidths, lastWidth + nextItemWidth]
  }, [])
}

const reducer = <TItem>(state: SplitItems<TItem>, action: Action<TItem>): SplitItems<TItem> => {
  switch (action.type) {
    case 'itemsChanged':
      return {
        ...state,
        allItems: action.items,
        visibleItems: action.items,
        hiddenItems: [],
      }
    case 'resized':
      return {
        ...state,
        thresholdWidth: action.thresholdWidth,
        visibleItems: state.allItems,
        hiddenItems: [],
      }
    case 'rendered': {
      const itemsWidthAcc = getAccumulatedItemsWidth(action.visibleItemsById, action.sliceFrom)
      const hidableContentWidth = itemsWidthAcc.length > 0 ? getLast(itemsWidthAcc) : 0
      const containerContentWidth = Array.from(
        action.containerRef.current?.children ?? []
      ).reduce((totalWidth, child) => totalWidth + child.scrollWidth, 0)
      const nonHidableContentWidth =
        containerContentWidth - hidableContentWidth < 0
          ? 0
          : containerContentWidth - hidableContentWidth
      const itemsWidthAccWithOffset = itemsWidthAcc.map((width) => width + nonHidableContentWidth)
      const shouldSlice =
        state.thresholdWidth <
        (itemsWidthAccWithOffset.length > 0 ? getLast(itemsWidthAccWithOffset) : 0)

      if (shouldSlice) {
        const lastVisibleIndex = getLastVisibleIndex(state.thresholdWidth, itemsWidthAccWithOffset)
        const [visibleItems, hiddenItems] = sliceItems(
          state.allItems,
          lastVisibleIndex,
          action.sliceFrom
        )

        if (
          areShallowEqual(visibleItems as object, state.visibleItems as object) &&
          areShallowEqual(hiddenItems as object, state.hiddenItems as object)
        ) {
          return state
        }

        return { ...state, visibleItems, hiddenItems }
      }
      return state
    }
    default:
      return state
  }
}

export type AttachVisibleItemRefCallback = (
  itemId: VisibleItemId
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => (instance: HTMLElement | null) => void

interface OverflowingItemsInfo<TItem> {
  readonly attachVisibleItemRef: AttachVisibleItemRefCallback
  readonly visibleItems: ReadonlyArray<TItem>
  readonly hiddenItems: ReadonlyArray<TItem>
}

/**
 * Determines whether list of items can fit into container element,
 * or which items should be hidden because of overflow.
 */
export const useSliceOverflowingItems = <TItem>(
  allItems: ReadonlyArray<TItem>,
  containerRef: RefObject<HTMLElement | null>,
  sliceFrom: SliceFrom,
  hiddenAll: boolean = false
): OverflowingItemsInfo<TItem> => {
  const initialState: SplitItems<TItem> = {
    allItems,
    visibleItems: allItems,
    hiddenItems: [],
    thresholdWidth: hiddenAll ? 0 : containerRef.current?.scrollWidth ?? Number.MAX_VALUE,
  }

  const typedReducer = reducer as (
    state: SplitItems<TItem>,
    action: Action<TItem>
  ) => SplitItems<TItem>

  const [state, dispatch] = useReducer(typedReducer, initialState)

  const { visibleItems, hiddenItems, allItems: allItemsInState, thresholdWidth } = state

  const visibleItemsRef = useRef<VisibleItemsById>(new Map())

  // Observe container width changes
  useLayoutEffect(() => {
    const handleResize = () => {
      dispatch({
        type: 'resized',
        thresholdWidth: hiddenAll ? 0 : containerRef.current?.scrollWidth ?? Number.MAX_VALUE,
      })
    }

    const resizeObserver = new ResizeObserver(handleResize)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [containerRef, hiddenAll])

  useEffect(() => {
    if (allItems.length) {
      dispatch({
        type: 'rendered',
        sliceFrom,
        visibleItemsById: visibleItemsRef.current,
        containerRef,
      })
    }
  }, [thresholdWidth, allItemsInState, sliceFrom, containerRef])

  useEffect(() => {
    if (!areShallowEqual(allItems as object, allItemsInState as object)) {
      dispatch({ type: 'itemsChanged', items: allItems })
    }
  }, [allItems, hiddenAll, allItemsInState])

  const attachVisibleItemRef: AttachVisibleItemRefCallback = useCallback(
    (itemId) => (instance: HTMLElement | null) => {
      if (instance instanceof HTMLElement) {
        visibleItemsRef.current.set(itemId, instance)
      } else {
        visibleItemsRef.current.delete(itemId)
      }
    },
    []
  )

  return { attachVisibleItemRef, visibleItems, hiddenItems }
}
