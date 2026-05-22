export interface SearchInputProps {
  /**
   * Input placeholder.
   */
  readonly placeholder?: string
  /**
   * Input value.
   */
  readonly value: string
  /**
   * Event fired when the search is submitted.
   */
  readonly onSubmit?: () => void
  /**
   * Event fired when search value is changed.
   */
  readonly onChange: (value: string) => void
  /**
   * Custom class name for the search input wrapper.
   */
  readonly className?: string
  /**
   * Indicates if the search input is clearable.
   */
  readonly clearable?: boolean
  /**
   * Tooltip for the clear button.
   */
  readonly clearButtonTooltip?: string
  /**
   * Event fired when the clear button is clicked.
   */
  readonly onClear?: () => void
  /**
   * Input name attribute.
   */
  readonly name?: string
  /**
   * Input ID attribute.
   */
  readonly id?: string
  /**
   * Whether the input is disabled.
   */
  readonly disabled?: boolean
  /**
   * Debounce delay in milliseconds. Set to 0 to disable debouncing (default).
   * Use a positive value like 300 to add debounce delay before onChange fires.
   * @default 0
   */
  readonly debounceMs?: number
}
