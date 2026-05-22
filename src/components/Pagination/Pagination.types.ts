/**
 * Properties of the Pagination component.
 */
export interface PaginationProps {
  /**
   * Represents a current page which is indicated visually.
   */
  readonly selectedPage: number

  /**
   * Denotes the maximum number of pages.
   */
  readonly totalPages: number

  /**
   * Allows you to bind a custom handler on a page change. The new page number is passed to the handler.
   */
  readonly onPageChange: (newPageNumber: number) => void
}

/**
 * Represents a model for rendering page buttons.
 */
export interface ButtonModel {
  /**
   * Page button label.
   */
  readonly label: string

  /**
   * Page button number.
   */
  readonly number: number

  /**
   * Indicates whether a given page button is disabled.
   */
  readonly disabled?: boolean
}
