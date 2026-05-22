import type { Spacing, LayoutComponentProps } from '../Layout.types'

export interface GridProps extends LayoutComponentProps {
  readonly cols?: number
  readonly rowGap?: Spacing
  readonly columnGap?: Spacing
}
