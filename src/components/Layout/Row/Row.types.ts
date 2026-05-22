import type { Spacing, LayoutAlignment, LayoutComponentProps } from '../Layout.types'

export const RowWrap = {
  NoWrap: 'nowrap',
  Wrap: 'wrap',
  WrapReverse: 'wrap-reverse',
} as const
export type RowWrap = (typeof RowWrap)[keyof typeof RowWrap]

export interface RowProps extends LayoutComponentProps {
  readonly alignX?: LayoutAlignment
  readonly alignY?: LayoutAlignment
  readonly spacing?: Spacing
  readonly spacingX?: Spacing
  readonly spacingY?: Spacing
  readonly wrap?: RowWrap
}
