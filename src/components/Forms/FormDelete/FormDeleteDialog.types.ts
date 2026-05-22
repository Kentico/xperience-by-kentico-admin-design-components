import type { ReactNode } from 'react'

/**
 * Text labels for the FormDeleteDialog component.
 */
export interface FormDeleteDialogTexts {
  /**
   * Dialog headline text.
   */
  readonly headline: string
  /**
   * Label for the confirm/delete button.
   */
  readonly confirmLabel: string
  /**
   * Label for the cancel button.
   */
  readonly cancelLabel: string
  /**
   * Tooltip text for the close button.
   */
  readonly closeTooltip?: string
}

/**
 * Properties for the FormDeleteDialog component.
 *
 * A dialog for confirming form deletion operations.
 * Wraps the Dialog component with a destructive confirm action.
 */
export interface FormDeleteDialogProps {
  /**
   * Callback function to execute the delete action.
   */
  readonly onDelete: () => void
  /**
   * Callback function to close the dialog.
   */
  readonly onClose: () => void
  /**
   * Whether the delete operation is in progress.
   * When true, buttons are disabled and confirm button shows loading state.
   */
  readonly inProgress?: boolean
  /**
   * Text labels for the dialog.
   */
  readonly texts: FormDeleteDialogTexts
  /**
   * Content to display in the dialog body.
   */
  readonly children?: ReactNode
  /**
   * Maximum width of the dialog.
   * @default 600
   */
  readonly maxWidth?: number | string
  /**
   * Custom class name for the dialog.
   */
  readonly className?: string
}
