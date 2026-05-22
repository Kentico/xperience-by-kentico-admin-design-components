import type { ReactNode } from 'react'
export const CalloutType = {
  QuickTip: 'quickTip',
  FriendlyWarning: 'friendlyWarning',
} as const

export type CalloutType = (typeof CalloutType)[keyof typeof CalloutType]

export const CalloutPlacementType = {
  OnPaper: 'onPaper',
  OnDesk: 'onDesk',
} as const

export type CalloutPlacementType = (typeof CalloutPlacementType)[keyof typeof CalloutPlacementType]

export interface CalloutProps {
  /** The main headline text */
  readonly headline?: string
  /** The subheadline text displayed next to the icon */
  readonly subheadline?: string
  /** The type of callout - determines icon and colors */
  readonly type: CalloutType
  /** The placement context - affects shadow intensity */
  readonly placement: CalloutPlacementType
  /** Optional action button to render at the bottom */
  readonly actionButton?: ReactNode
  /** The main content of the callout */
  readonly children?: ReactNode
  /** Maximum width of the callout */
  readonly maxWidth?: string | number
  /** Additional CSS class */
  readonly className?: string
}
