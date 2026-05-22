import { type ReactNode } from 'react'

export const SwitchSize = {
  M: 'M',
  L: 'L',
} as const

export type SwitchSize = (typeof SwitchSize)[keyof typeof SwitchSize]

export interface SwitchProps {
  /** Switch on/off state (required). */
  readonly value: boolean
  /** Switch size (required). */
  readonly size: SwitchSize
  /** Label for description of switch. */
  readonly label?: string
  /** Indicate disabled switch. */
  readonly disabled?: boolean
  /** Used when action triggered by turning switch on/off takes some time. */
  readonly inProgress?: boolean
  /** Allows consumer to switch the switch (required). */
  readonly onChange: (value: boolean) => void
  /** Label actions element. */
  readonly labelActionsElement?: ReactNode
}
