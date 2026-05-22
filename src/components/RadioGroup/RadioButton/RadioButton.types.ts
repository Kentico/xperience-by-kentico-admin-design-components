import { type RefObject } from 'react'

export interface RadioButtonProps {
  /**
   * The value used to identify radiobutton (required).
   */
  readonly value: string
  /**
   * Test id data attribute.
   */
  /**
   * Indicates if the radiobutton is disabled.
   */
  readonly disabled?: boolean
  /**
   * Indicates if the radiobutton is read-only.
   */
  readonly readOnly?: boolean
  /**
   * State indicating a radiobutton error.
   */
  readonly alert?: boolean
  /**
   * Explanatory text for the radiobutton.
   */
  readonly caption?: string
  /**
   * Explanatory text for the radiobutton with error.
   */
  readonly alertCaption?: string
  /**
   * Label used as description to radiobutton.
   */
  readonly children?: string
  /**
   * Input ref.
   */
  readonly inputRef?: RefObject<HTMLInputElement>
}
