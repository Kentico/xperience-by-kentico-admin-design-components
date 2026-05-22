import { type RefObject, type ReactNode } from 'react'

export const CheckboxSize = {
  S: 'S',
  M: 'M',
  L: 'L',
} as const

export type CheckboxSize = (typeof CheckboxSize)[keyof typeof CheckboxSize]

type CheckboxBaseProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'name' | 'onClick' | 'disabled' | 'readOnly' | 'tabIndex'
>

export interface CheckboxProps extends CheckboxBaseProps {
  /** Size of the checkbox. */
  readonly size?: CheckboxSize
  /** A text label to be displayed. */
  readonly label?: string
  /** Indicates a checked state. Defaults to false. */
  readonly checked?: boolean
  /** Indicates an indetermined state. Defaults to false. */
  readonly indetermined?: boolean
  /** Indicates whether the checkbox should indicate a high importance. */
  readonly invalid?: boolean
  /** Allows consumer to bind an onChange event handler. */
  readonly onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
  /** Indicates whether the checkbox is highlighted. */
  readonly highlighted?: boolean
  readonly explanationText?: string
  readonly inactiveMessage?: string
  readonly labelIcon?: string
  readonly labelIconTooltip?: string
  readonly validationMessage?: string
  /** Indicates whether required sign should be displayed next to the label. */
  readonly markAsRequired?: boolean
  readonly inputRef?: RefObject<HTMLInputElement>
  /** Dangerously sets explanation text as inner HTML. */
  readonly explanationTextAsHtml?: boolean
  /** Dangerously sets tooltip as inner HTML. */
  readonly tooltipAsHtml?: boolean
  /** Label actions element. */
  readonly labelActionsElement?: ReactNode
}

export interface CheckboxTickIconProps extends Pick<CheckboxProps, 'checked' | 'size' | 'disabled' | 'readOnly'> {}
