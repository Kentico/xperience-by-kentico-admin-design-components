import type { ReactNode } from 'react'

export const ShelfStickyPosition = {
  Left: 'Left',
  Right: 'Right',
} as const
export type ShelfStickyPosition =
  (typeof ShelfStickyPosition)[keyof typeof ShelfStickyPosition]

export interface ShelfProps {
  readonly children?: ReactNode
  readonly sticky?: ShelfStickyPosition
  readonly onPaper?: boolean
  readonly fullHeight?: boolean
  readonly className?: string
}
