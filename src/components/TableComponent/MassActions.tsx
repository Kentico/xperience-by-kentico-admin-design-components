import * as React from 'react';
import { useState, useMemo, useCallback } from 'react'
import type { HorizontalActionMenuItem } from '@/components/HorizontalActionMenu'
import { HorizontalActionMenu } from '@/components/HorizontalActionMenu'
import { ConfirmationDialog } from '@/components/ConfirmationDialog'
import type {
  MassActionsComponentProps,
  MassActionItem,
} from './MassActions.types'
import { DEFAULT_MASS_ACTIONS_TEXTS } from './MassActions.types'

/**
 * State for the confirmation dialog.
 */
interface ConfirmationState {
  /** Whether the dialog is open */
  isOpen: boolean
  /** The action that triggered the confirmation */
  action: MassActionItem | null
  /** Whether an action is in progress */
  isLoading: boolean
}

/**
 * MassActions component displays a horizontal action menu for bulk operations
 * on selected table rows. Shows action buttons when rows are selected and
 * handles optional confirmation dialogs before executing actions.
 *
 * @example
 * ```tsx
 * <MassActions
 *   massActions={[
 *     {
 *       identifier: 'delete',
 *       label: 'Delete',
 *       icon: 'xp-bin',
 *       destructive: true,
 *       requiresConfirmation: true,
 *       confirmationDialog: {
 *         title: 'Delete items?',
 *         content: 'This action cannot be undone.',
 *         confirmLabel: 'Delete',
 *         cancelLabel: 'Cancel',
 *       },
 *       onExecute: async (rows) => {
 *         await deleteRows(rows)
 *       },
 *     },
 *   ]}
 *   selectedRows={selectedIds}
 *   totalItemCount={100}
 *   onExecuted={() => refetch()}
 *   texts={{
 *     selectedCountFormat: '{count} selected',
 *   }}
 * />
 * ```
 */
export function MassActions({
  massActions = [],
  selectedRows = [],
  totalItemCount,
  onExecuted,
  confirmationDialogClassName,
  texts = DEFAULT_MASS_ACTIONS_TEXTS,
  moreActionsButtonLabel = 'More actions',
}: MassActionsComponentProps) {
  // Confirmation dialog state
  const [confirmation, setConfirmation] = useState<ConfirmationState>({
    isOpen: false,
    action: null,
    isLoading: false,
  })

  /**
   * Clear the confirmation dialog state.
   */
  const clearConfirmation = useCallback(() => {
    setConfirmation({
      isOpen: false,
      action: null,
      isLoading: false,
    })
  }, [])

  /**
   * Execute the mass action.
   */
  const executeMassAction = useCallback(
    async (action: MassActionItem) => {
      if (action.disabled) {
        return
      }

      // Set loading state if we have a dialog open
      if (confirmation.isOpen) {
        setConfirmation((prev) => ({ ...prev, isLoading: true }))
      }

      try {
        // Execute the action handler
        if (action.onExecute) {
          await action.onExecute(selectedRows)
        }

        // Clear dialog and notify parent
        clearConfirmation()
        onExecuted()
      } catch (error) {
        // Clear loading state on error
        setConfirmation((prev) => ({ ...prev, isLoading: false }))
        // Re-throw so consumers can handle it
        throw error
      }
    },
    [selectedRows, onExecuted, clearConfirmation, confirmation.isOpen]
  )

  /**
   * Handle action click - either show confirmation or execute directly.
   */
  const handleActionClick = useCallback(
    (action: MassActionItem) => {
      if (action.disabled) {
        return
      }

      if (action.requiresConfirmation) {
        // Show confirmation dialog
        setConfirmation({
          isOpen: true,
          action,
          isLoading: false,
        })
      } else {
        // Execute directly
        void executeMassAction(action)
      }
    },
    [executeMassAction]
  )

  /**
   * Handle confirmation dialog confirm.
   */
  const handleConfirm = useCallback(async () => {
    if (confirmation.action) {
      await executeMassAction(confirmation.action)
    }
  }, [confirmation.action, executeMassAction])

  /**
   * Handle confirmation dialog cancel.
   */
  const handleCancel = useCallback(() => {
    clearConfirmation()
  }, [clearConfirmation])

  /**
   * Convert MassActionItems to HorizontalActionMenuItems.
   */
  const actionItems = useMemo((): HorizontalActionMenuItem[] => {
    return massActions.map((action) => ({
      identifier: action.identifier,
      label: action.label,
      title: action.title,
      icon: action.icon,
      destructive: action.destructive,
      disabled: action.disabled,
      onClick: () => handleActionClick(action),
    }))
  }, [massActions, handleActionClick])

  /**
   * Generate the label showing selection count.
   */
  const menuLabel = useMemo(() => {
    const count = selectedRows.length

    if (count === 0) {
      // Show total count when nothing selected
      return texts.selectedCountFormat.replace('{count}', String(totalItemCount))
    }

    // Show selected count
    return texts.selectedCountFormat.replace('{count}', String(count))
  }, [selectedRows.length, totalItemCount, texts.selectedCountFormat])

  // Check if any items are selected
  const isAnyItemSelected = selectedRows.length > 0

  // Get confirmation dialog config from current action
  const dialogConfig = confirmation.action?.confirmationDialog

  return (
    <>
      <HorizontalActionMenu
        areActionsVisible={isAnyItemSelected}
        actionItems={actionItems}
        label={menuLabel}
        moreActionsButtonLabel={moreActionsButtonLabel}
      />

      {/* Confirmation Dialog */}
      {confirmation.isOpen && confirmation.action && (
        <ConfirmationDialog
          headline={dialogConfig?.title ?? 'Confirm action'}
          onConfirmation={handleConfirm}
          onCancellation={handleCancel}
          isConfirmationButtonDestructive={confirmation.action.destructive}
          actionInProgress={confirmation.isLoading}
          overlayClassName={confirmationDialogClassName}
          texts={{
            confirmLabel: dialogConfig?.confirmLabel ?? 'Confirm',
            cancelLabel: dialogConfig?.cancelLabel ?? 'Cancel',
          }}
        >
          {dialogConfig?.content ?? (
            <p>Are you sure you want to perform this action?</p>
          )}
        </ConfirmationDialog>
      )}
    </>
  )
}

MassActions.displayName = 'MassActions'
