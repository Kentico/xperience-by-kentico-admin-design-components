import type { HeadlineSize } from '@/components/Headline/Headline.types'

/**
 * Result of editable header confirm action.
 */
export interface EditableHeaderConfirmResult {
  /**
   * Indicates if the input in confirmation is valid.
   */
  readonly isValid: boolean
  /**
   * Message to display when validation fails.
   */
  readonly validationMessage?: string
}

/**
 * Text labels for the editable header dialog.
 */
export interface EditableHeaderTexts {
  /**
   * Dialog headline text.
   */
  readonly dialogHeadline: string
  /**
   * Input field label text.
   */
  readonly inputLabel: string
  /**
   * Confirm/Save button label.
   */
  readonly confirmLabel: string
  /**
   * Cancel button label.
   */
  readonly cancelLabel: string
  /**
   * Close button tooltip text.
   */
  readonly closeTooltip?: string
}

/**
 * Editable header component properties.
 */
export interface EditableHeaderProps {
  /**
   * Value to display and edit.
   */
  readonly value: string
  /**
   * Text labels for the dialog.
   */
  readonly texts: EditableHeaderTexts
  /**
   * Confirmation handler.
   * @param value User input.
   * @returns Result indicating if the input is valid.
   */
  readonly onConfirm: (value: string) => Promise<EditableHeaderConfirmResult>
  /**
   * Indicates if the header is disabled for editing.
   */
  readonly disabled?: boolean
  /**
   * Size of the headline text.
   * @default HeadlineSize.S
   */
  readonly headlineSize?: HeadlineSize
  /**
   * Additional class name for the header container.
   */
  readonly className?: string
}

/**
 * Minimal width of the editable header dialog.
 */
export const EDITABLE_HEADER_DIALOG_MIN_WIDTH = 544
