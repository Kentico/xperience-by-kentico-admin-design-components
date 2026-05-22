import type { ReactNode } from 'react'
import type { TimeValue } from 'react-aria-components'

export interface TimeInputProps {
  readonly value: TimeValue | null
  readonly onChange: (date: TimeValue | null) => void
  readonly minTime?: TimeValue
  readonly maxTime?: TimeValue
  readonly label?: ReactNode
  readonly disabled?: boolean
}
