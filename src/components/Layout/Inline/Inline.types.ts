import type { Spacing, LayoutComponentProps } from '../Layout.types'

export const InlineSpacingXDirection = {
  Left: 'Left',
  Right: 'Right',
} as const
export type InlineSpacingXDirection =
  (typeof InlineSpacingXDirection)[keyof typeof InlineSpacingXDirection]

export interface InlineProps extends LayoutComponentProps {
  readonly spacing?: Spacing
  readonly spacingX?: Spacing
  readonly spacingY?: Spacing
  readonly spacingXDirection?: InlineSpacingXDirection
}
