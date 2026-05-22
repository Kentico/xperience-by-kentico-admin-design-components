export interface DateTimeInputProps {
  /**
   * Callback called when a day is selected or when clicked on the action button.
   */
  readonly onChange?: (date: Date | null) => void
  /**
   * Current selected Date.
   */
  readonly value?: Date | null
  /**
   * Label for the date input.
   */
  readonly label?: string
  /**
   * Minimal date that can be selected.
   */
  readonly minDate?: Date
  /**
   * Maximal date that can be selected.
   */
  readonly maxDate?: Date
  /**
   * Whether to show the time input.
   */
  readonly showTime?: boolean
  /**
   * Whether the input is disabled.
   */
  readonly disabled?: boolean
  /**
   * Whether the input is read-only.
   */
  readonly readOnly?: boolean
  /**
   * The time zone to use for the date input.
   */
  readonly timeZone?: string
  /**
   * Whether to allow clearing the input.
   */
  readonly allowClear?: boolean
  /**
   * Name attribute for the hidden form input.
   */
  readonly name?: string
}
