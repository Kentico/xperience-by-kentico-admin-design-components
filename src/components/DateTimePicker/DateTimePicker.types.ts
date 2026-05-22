export interface TimeValue {
  readonly hours: number
  readonly minutes: number
}

export const TimeFormat = {
  Hours12: 'hours12',
  Hours24: 'hours24',
} as const
export type TimeFormat = (typeof TimeFormat)[keyof typeof TimeFormat]

export interface TimePicker {
  /**
   * Format of the time 24-h or 12-h.
   */
  readonly timeFormat: TimeFormat
  /**
   * Label for the action button.
   */
  readonly actionLabel: string
  /**
   * Default time shown when the user writes an invalid date.
   */
  readonly defaultTime: TimeValue
  /**
   * Callback called on the action button click.
   */
  readonly onActionClick?: () => void
}

export interface DateTimePickerProps {
  /**
   * Callback called when a day is selected or when clicked on the action button.
   */
  readonly onChange: (date: Date | null) => void
  /**
   * Current selected Date.
   */
  readonly value: Date | null
  /**
   * Array of allowed years.
   */
  readonly years: number[]
  /**
   * Array of months.
   */
  readonly months?: string[]
  /**
   * Minimal date that can be selected.
   */
  readonly minDate?: Date
  /**
   * Maximal date that can be selected.
   */
  readonly maxDate?: Date
  /**
   * If undefined no time picker is selected. Expects settings for the time picker
   */
  readonly timePicker?: TimePicker
}
