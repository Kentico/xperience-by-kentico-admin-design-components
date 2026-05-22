import type { ReactNode } from 'react'

export const ToggleButtonBaseTypes = {
  Icon: 'icon',
  Name: 'Name',
} as const

export type ToggleButtonBaseTypes =
  (typeof ToggleButtonBaseTypes)[keyof typeof ToggleButtonBaseTypes]

export interface ToggleButtonBaseProps {
  readonly onClick: () => void
  readonly ariaLabel?: string
  readonly children: ReactNode
  readonly className?: string
  readonly isSelected: boolean
  readonly type: ToggleButtonBaseTypes
}
