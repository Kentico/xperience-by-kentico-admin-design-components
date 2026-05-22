import type { ReactNode } from 'react'

/**
 * Handler function type for the UnsavedChangesWrapper.
 */
export type UnsavedChangesWrapperHandleClose = () => void

/**
 * Texts for the unsaved changes dialog.
 */
export interface UnsavedChangesDialogTexts {
  /**
   * Dialog headline text.
   */
  readonly headline: string
  /**
   * Dialog message text.
   */
  readonly message: string
  /**
   * Confirm button label.
   */
  readonly confirmLabel: string
  /**
   * Cancel button label.
   */
  readonly cancelLabel?: string
}

/**
 * Properties for the UnsavedChangesWrapper component.
 * Wrapper for unsaved changes dialog when the page does not navigate away
 * but only wants to display an unsaved changes dialog.
 */
export interface UnsavedChangesWrapperProps {
  /**
   * Render function that receives the handleClose function.
   * The handleClose function should be called to trigger the close action
   * (which will show the unsaved changes dialog if there are unsaved changes).
   */
  readonly children: (handleClose: UnsavedChangesWrapperHandleClose) => ReactNode
  /**
   * Indicates that there are unsaved changes and the component behaves accordingly.
   * When true, closing will show the confirmation dialog.
   */
  readonly unsavedChanges: boolean
  /**
   * Fired when the wrapped dialog is closed (without unsaved changes or dialog dismissed).
   */
  readonly onCloseAction: () => void
  /**
   * Fired when the dialog indicating unsaved changes is confirmed.
   * The user confirmed they want to discard changes.
   */
  readonly onConfirmAction: () => void
  /**
   * Texts for the unsaved changes dialog.
   */
  readonly texts: UnsavedChangesDialogTexts
}
