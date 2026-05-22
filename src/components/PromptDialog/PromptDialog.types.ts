import type { ReactNode } from 'react'

/**
 * Texts for the prompt dialog.
 * These are required props since the component doesn't use i18n.
 */
export interface PromptDialogTexts {
  /**
   * Dialog headline text.
   */
  readonly headline: string
  /**
   * Label for the confirm button.
   */
  readonly confirmLabel: string
  /**
   * Label for the cancel button.
   */
  readonly cancelLabel: string
  /**
   * Tooltip text for the close button in the header.
   * @default "Close"
   */
  readonly closeTooltip?: string
  /**
   * Placeholder text for the input field.
   */
  readonly inputPlaceholder?: string
}

/**
 * Properties for the PromptDialog component.
 *
 * A dialog that prompts the user for text input.
 * Wraps ConfirmationDialog with a built-in Input field.
 */
export interface PromptDialogProps {
  /**
   * Whether the dialog is shown.
   * When false, the dialog is not rendered.
   */
  readonly isOpen: boolean
  /**
   * Text labels for the dialog.
   */
  readonly texts: PromptDialogTexts
  /**
   * Message to display above the input field.
   * Can be a string or ReactNode for custom content.
   */
  readonly message?: ReactNode
  /**
   * Initial value for the input field.
   * @default ""
   */
  readonly initialValue?: string
  /**
   * Whether the confirmation button should be styled as destructive.
   */
  readonly isConfirmationButtonDestructive?: boolean
  /**
   * Icon to display on the confirmation button.
   */
  readonly confirmationButtonIcon?: ReactNode
  /**
   * Whether an action is currently in progress.
   * When true, buttons are disabled and the confirm button shows a loading state.
   */
  readonly actionInProgress?: boolean
  /**
   * Whether the input value is required (non-empty) for confirmation.
   * When true, the confirm button is disabled if input is empty.
   * @default false
   */
  readonly required?: boolean
  /**
   * Callback fired when the confirm button is clicked.
   * Receives the current input value.
   */
  readonly onConfirmation: (value: string) => void
  /**
   * Callback fired when the dialog is cancelled.
   */
  readonly onCancellation: () => void
  /**
   * Custom class name for the dialog wrapper.
   */
  readonly className?: string
  /**
   * Custom class name for the dialog overlay.
   */
  readonly overlayClassName?: string
  /**
   * Maximum width of the dialog.
   * @default 600
   */
  readonly maxWidth?: number | string
  /**
   * Input type for the text field.
   * @default "text"
   */
  readonly inputType?: 'text' | 'password' | 'email'
}
