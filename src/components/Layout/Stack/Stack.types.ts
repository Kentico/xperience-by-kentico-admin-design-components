import type { Spacing, LayoutAlignment, LayoutComponentProps } from '../Layout.types'

export interface StackProps extends LayoutComponentProps {
  readonly align?: LayoutAlignment
  readonly spacing?: Spacing
  readonly fullHeight?: boolean
}
