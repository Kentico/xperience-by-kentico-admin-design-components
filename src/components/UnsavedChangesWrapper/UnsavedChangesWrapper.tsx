import * as React from 'react';
import { useCallback, useState } from 'react'
import { Dialog } from '@/components/Dialog'
import { Box } from '@/components/Box'
import { Spacing } from '@/components/Layout'
import type { UnsavedChangesWrapperProps } from './UnsavedChangesWrapper.types'

/**
 * Wrapper for unsaved changes dialog when the page does not navigate away
 * but only wants to display an unsaved changes dialog.
 *
 * This component provides a render function pattern where the child receives
 * a handleClose function. When called, it either:
 * - Shows a confirmation dialog if there are unsaved changes
 * - Immediately calls onCloseAction if there are no unsaved changes
 */
export const UnsavedChangesWrapper = ({
  children,
  unsavedChanges,
  onCloseAction,
  onConfirmAction,
  texts,
}: UnsavedChangesWrapperProps) => {
  const [showDialog, setShowDialog] = useState(false)

  const handleClose = useCallback(() => {
    // If dialog is already showing, don't do anything
    if (showDialog) {
      return
    }

    // If there are unsaved changes, show the dialog
    if (unsavedChanges) {
      setShowDialog(true)
    } else {
      // No unsaved changes, proceed with close
      onCloseAction()
    }
  }, [unsavedChanges, onCloseAction, showDialog])

  const handleDialogClose = useCallback(() => {
    setShowDialog(false)
  }, [])

  const handleConfirmation = useCallback(() => {
    setShowDialog(false)
    onConfirmAction()
  }, [onConfirmAction])

  return (
    <>
      {children(handleClose)}
      <Dialog
        isOpen={showDialog}
        headline={texts.headline}
        onClose={handleDialogClose}
        confirmAction={{
          label: texts.confirmLabel,
          onClick: handleConfirmation,
          destructive: true,
        }}
        cancelAction={{
          label: texts.cancelLabel ?? 'Cancel',
          onClick: handleDialogClose,
        }}
      >
        <Box spacing={Spacing.M}>
          {texts.message}
        </Box>
      </Dialog>
    </>
  )
}

UnsavedChangesWrapper.displayName = 'UnsavedChangesWrapper'
