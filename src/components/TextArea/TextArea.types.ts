import type { TextareaHTMLAttributes } from 'react'

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  /** Current value */
  value: string
  /** Callback when value changes */
  onValueChange: (value: string) => void
  /** Callback when Enter is pressed (without Shift) */
  onSubmit?: () => void
  /** Whether to auto-resize based on content */
  autoResize?: boolean
  /** Maximum rows when auto-resizing */
  maxRows?: number
  /** Additional CSS class for the textarea */
  className?: string
}
