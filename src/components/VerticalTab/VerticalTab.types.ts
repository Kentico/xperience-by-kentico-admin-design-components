import type { ReactNode, KeyboardEvent, MouseEvent } from 'react'

export interface VerticalTabProps {
  /** Tab label text */
  readonly label: string
  /** Whether the tab is currently selected/active */
  readonly selected?: boolean
  /** Whether the tab is disabled */
  readonly disabled?: boolean
  /** Optional icon to display before the label */
  readonly icon?: ReactNode
  /** Click handler */
  readonly onClick?: (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void
  /** Optional value identifier for the tab */
  readonly value?: string
  /** Test ID for testing */
  readonly testId?: string
  /** Optional additional class name */
  readonly className?: string
}
