import type { ZonedDateTime } from '@internationalized/date'

export interface SelectTimeRangeProps {
  readonly timeZone: string
  readonly onRangeSelect?: (range: {
    start: ZonedDateTime
    end: ZonedDateTime
  }) => void
}
