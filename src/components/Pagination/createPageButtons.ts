import type { ButtonModel } from './Pagination.types'

const padUpTo = (items: ButtonModel[], upperLimit: number): void => {
  for (let i = 1; i <= upperLimit; i++) {
    items.push({
      label: `${i}`,
      number: i,
    })
  }
}

const padDownTo = (
  items: ButtonModel[],
  lowerLimit: number,
  totalItems: number
): void => {
  for (let i = lowerLimit; i <= totalItems; i++) {
    items.push({
      label: `${i}`,
      number: i,
    })
  }
}

/**
 * Creates an array of page button models based on the current page count,
 * selected page, and total pages. Handles truncation with ellipsis for
 * large page counts.
 *
 * @param count - Number of page buttons to display (3, 4, or 5)
 * @param selected - Currently selected page number
 * @param totalPages - Total number of pages
 * @returns Array of ButtonModel objects for rendering
 */
export const createPageButtons = (
  count: number,
  selected: number,
  totalPages: number
): ButtonModel[] => {
  if (totalPages > count) {
    const ellipsis = '...'
    const pages: ButtonModel[] = []

    switch (count) {
      case 3:
        if (selected <= count - 1) {
          padUpTo(pages, count - 1)
          pages.push({ label: ellipsis, number: -1, disabled: true })
          pages.push({ label: `${totalPages}`, number: totalPages })
        } else if (totalPages - selected <= 1) {
          padDownTo(pages, totalPages - 1, totalPages)
          pages.unshift({ label: ellipsis, number: -1, disabled: true })
          pages.unshift({ label: '1', number: 1 })
        } else {
          pages.push(
            { label: '1', number: 1 },
            { label: ellipsis, number: -1, disabled: true },
            { label: `${selected}`, number: selected },
            { label: ellipsis, number: -1, disabled: true },
            { label: `${totalPages}`, number: totalPages }
          )
        }
        break
      case 4:
        if (selected <= count - 2) {
          padUpTo(pages, count - 1)
          pages.push({ label: ellipsis, number: -1, disabled: true })
          pages.push({ label: `${totalPages}`, number: totalPages })
        } else if (totalPages - selected <= 2) {
          padDownTo(pages, totalPages - 2, totalPages)
          pages.unshift({ label: ellipsis, number: -1, disabled: true })
          pages.unshift({ label: '1', number: 1 })
        } else {
          pages.push(
            { label: '1', number: 1 },
            { label: ellipsis, number: -1, disabled: true },
            { label: `${selected}`, number: selected },
            { label: `${selected + 1}`, number: selected + 1 },
            { label: ellipsis, number: -1, disabled: true },
            { label: `${totalPages}`, number: totalPages }
          )
        }
        break
      case 5:
        if (selected <= count - 2) {
          padUpTo(pages, count - 1)
          pages.push({ label: ellipsis, number: -1, disabled: true })
          pages.push({ label: `${totalPages}`, number: totalPages })
        } else if (totalPages - selected <= 2) {
          padDownTo(pages, totalPages - 3, totalPages)
          pages.unshift({ label: ellipsis, number: -1, disabled: true })
          pages.unshift({ label: '1', number: 1 })
        } else {
          pages.push(
            { label: '1', number: 1 },
            { label: ellipsis, number: -1, disabled: true },
            { label: `${selected - 1}`, number: selected - 1 },
            { label: `${selected}`, number: selected },
            { label: `${selected + 1}`, number: selected + 1 },
            { label: ellipsis, number: -1, disabled: true },
            { label: `${totalPages}`, number: totalPages }
          )
        }
        break
    }

    return pages
  }

  return [...new Array<undefined>(totalPages).keys()].map((i) => ({
    label: `${i + 1}`,
    number: i + 1,
  }))
}
