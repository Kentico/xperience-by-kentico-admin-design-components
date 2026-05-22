import type { ReactNode } from 'react'
import type { HorizontalActionMenuItem } from '@/components/HorizontalActionMenu'
import type { TableRowId, MassActionsTexts } from './TableComponent.types'

/**
 * Extended action item with optional confirmation dialog.
 */
export interface MassActionItem extends Omit<HorizontalActionMenuItem, 'onClick'> {
  /** Handler called when the action is executed */
  readonly onExecute?: (selectedRows: TableRowId[]) => void | Promise<void>
  /**
   * When true, a confirmation dialog is shown before executing the action.
   * Provide confirmationDialog to customize the dialog content.
   */
  readonly requiresConfirmation?: boolean
  /**
   * Custom confirmation dialog configuration.
   * Only used when requiresConfirmation is true.
   */
  readonly confirmationDialog?: {
    /** Title of the confirmation dialog */
    readonly title?: string
    /** Content of the confirmation dialog */
    readonly content?: ReactNode
    /** Label for the confirm button */
    readonly confirmLabel?: string
    /** Label for the cancel button */
    readonly cancelLabel?: string
  }
}

/**
 * Props for the MassActions component.
 */
export interface MassActionsComponentProps {
  /** Callback after a mass action is performed */
  readonly onExecuted: () => void
  /** Mass actions for the horizontal action menu */
  readonly massActions?: MassActionItem[]
  /** Selected row identifiers */
  readonly selectedRows?: TableRowId[]
  /** Total number of items in the table */
  readonly totalItemCount: number
  /** Class name for the confirmation dialog overlay */
  readonly confirmationDialogClassName?: string
  /**
   * Text labels (replaces i18n).
   * Required for displaying count labels.
   */
  readonly texts: MassActionsTexts
  /** More actions button label (for accessibility) */
  readonly moreActionsButtonLabel?: string
}

/**
 * Default texts for the MassActions component.
 */
export const DEFAULT_MASS_ACTIONS_TEXTS: MassActionsTexts = {
  selectedCountFormat: '{count} items',
  selectAllLabel: 'Select all',
  deselectAllLabel: 'Deselect all',
}
