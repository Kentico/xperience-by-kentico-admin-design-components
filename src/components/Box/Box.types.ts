import type { Spacing, LayoutComponentProps } from '@/components/Layout/Layout.types'

export interface BoxProps extends LayoutComponentProps {
  readonly spacing?: Spacing | string
  readonly spacingX?: Spacing | string
  readonly spacingY?: Spacing | string
  readonly spacingTop?: Spacing | string
  readonly spacingRight?: Spacing | string
  readonly spacingBottom?: Spacing | string
  readonly spacingLeft?: Spacing | string
}
