import type {
  HTMLAttributeAnchorTarget,
  MouseEvent,
  ReactNode,
  RefObject,
} from 'react'
import type { ButtonColor, ButtonSize } from '../Button/Button.types'

export interface LinkButtonProps {
  /** URL the link points to */
  readonly href?: string
  /** Link target attribute */
  readonly target?: HTMLAttributeAnchorTarget
  /** Tooltip title text */
  readonly title?: string
  /** Click handler */
  readonly onClick?: (e: MouseEvent<HTMLElement>) => void
  /** Button size variant */
  readonly size?: ButtonSize
  /** Button color variant */
  readonly color?: ButtonColor
  /** Button label text */
  readonly label?: string
  /** Icon before the label */
  readonly icon?: ReactNode
  /** Icon after the label */
  readonly trailingIcon?: ReactNode
  /** Whether the button fills its container */
  readonly fillContainer?: boolean
  /** Destructive modifier — applies alert styling */
  readonly destructive?: boolean
  /** Shows spinner and disables interaction */
  readonly inProgress?: boolean
  /** Disables interaction */
  readonly disabled?: boolean
  /** Tab order */
  readonly tabIndex?: number
  /** Additional CSS class */
  readonly className?: string
  /** Ref to the anchor element */
  readonly anchorRef?: RefObject<HTMLAnchorElement>
}
