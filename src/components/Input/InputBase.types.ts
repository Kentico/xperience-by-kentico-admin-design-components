import type { RefObject, ReactNode, ReactElement } from 'react'

type NativeInputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  | 'onChange'
  | 'name'
  | 'onClick'
  | 'onKeyPress'
  | 'min'
  | 'max'
  | 'id'
  | 'placeholder'
  | 'tabIndex'
  | 'onBlur'
  | 'role'
  | 'autoComplete'
>

export interface InputBaseProps extends NativeInputProps {
  /**
   * Indicates if input is disabled.
   */
  readonly disabled?: boolean
  /**
   * Indicates if input is read-only.
   */
  readonly readOnly?: boolean
  /**
   * Specifies if input has valid value.
   */
  readonly invalid?: boolean
  /**
   * Input value.
   */
  readonly value?: string | number
  /**
   * Specifies input type.
   */
  readonly type?: 'text' | 'password' | 'email' | 'number'
  /**
   * Button or icon in input field.
   */
  readonly actionElement?: ReactNode
  /**
   * Button for input clearing.
   */
  readonly clearButton?: ReactElement<HTMLButtonElement>
  /**
   * Input ref.
   */
  readonly inputRef?: RefObject<HTMLInputElement>
  /**
   * Specifies if input is used as Select component.
   */
  readonly isSelect?: boolean
  /**
   * Tooltip text displayed on input.
   */
  readonly tooltipText?: string
  /**
   * Dangerously sets explanation text as inner HTML.
   */
  readonly explanationTextAsHtml?: boolean
  /**
   * Dangerously sets tooltip as inner HTML.
   */
  readonly tooltipAsHtml?: boolean
  /**
   * Data test ID.
   */
}
