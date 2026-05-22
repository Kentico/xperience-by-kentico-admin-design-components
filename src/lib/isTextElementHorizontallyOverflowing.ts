/**
 * Checks whether a text element's content overflows its container horizontally.
 * Uses `getBoundingClientRect().width` vs `scrollWidth` to detect overflow.
 */
export const isTextElementHorizontallyOverflowing = (
  element: HTMLElement | undefined | null,
): boolean =>
  element
    ? Math.ceil(element.getBoundingClientRect().width) < element.scrollWidth
    : false
