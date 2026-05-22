import type { FormDeleteDialogTexts } from './FormDeleteDialog.types'
import type { FormDeleteCalloutConfig, FormDeleteItem } from './FormDeleteDialogContent.types'

/**
 * Properties for the FormDeleteComponent.
 *
 * A controller component that manages the form delete dialog state.
 * This simplified version removes server dependencies from the source
 * and uses local callbacks instead.
 */
export interface FormDeleteComponentProps {
  /**
   * The items to be deleted.
   */
  readonly items: FormDeleteItem | FormDeleteItem[]
  /**
   * Callback fired when delete is confirmed.
   * Should return a promise that resolves when deletion is complete.
   */
  readonly onDelete: (ids: Array<number | string>) => Promise<void>
  /**
   * Callback fired when the dialog is closed without deleting.
   */
  readonly onClose: () => void
  /**
   * Callback fired after deletion is complete (success or failure).
   */
  readonly onComplete?: () => void
  /**
   * Configuration for the warning callout.
   */
  readonly callout?: FormDeleteCalloutConfig
  /**
   * Text labels for the dialog.
   */
  readonly texts: FormDeleteDialogTexts
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
