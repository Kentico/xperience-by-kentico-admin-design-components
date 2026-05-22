import type { ZonedDateTime } from '@internationalized/date'

export interface RangeCalendarProps {
  readonly minDate?: ZonedDateTime
  readonly maxDate?: ZonedDateTime
  readonly timeZone: string
  readonly readOnly?: boolean
}
