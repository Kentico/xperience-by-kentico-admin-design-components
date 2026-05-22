import type { ChangeEvent, FocusEvent, MouseEvent, KeyboardEvent, RefObject } from 'react'

export interface InputProps {
  /**
   * Current value.
   */
  readonly value?: string
  /**
   * Placeholder text.
   */
  readonly placeholder?: string
  /**
   * Whether the input is disabled.
   */
  readonly disabled?: boolean
  /**
   * Whether the input is invalid.
   */
  readonly invalid?: boolean
  /**
   * Input type.
   */
  readonly type?: 'text' | 'password' | 'email' | 'number' | 'search'
  /**
   * Input name.
   */
  readonly name?: string
  /**
   * Input ID.
   */
  readonly id?: string
  /**
   * Tab index.
   */
  readonly tabIndex?: number
  /**
   * Autocomplete attribute.
   */
  readonly autoComplete?: string
  /**
   * Reference to the input element.
   */
  readonly inputRef?: RefObject<HTMLInputElement>
  /**
   * Change handler.
   */
  readonly onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /**
   * Click handler.
   */
  readonly onClick?: (event: MouseEvent<HTMLInputElement>) => void
  /**
   * Focus handler.
   */
  readonly onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  /**
   * Blur handler.
   */
  readonly onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  /**
   * Key down handler.
   */
  readonly onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  /**
   * Additional class name.
   */
  readonly className?: string
  /**
   * Data test ID.
   */
}
