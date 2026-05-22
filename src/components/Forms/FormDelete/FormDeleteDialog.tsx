import * as React from 'react';
import type { FC } from 'react'
import { Dialog } from '@/components/Dialog'
import type { FormDeleteDialogProps } from './FormDeleteDialog.types'

/**
 * Default max width for the form delete dialog.
 */
const FORM_DELETE_DIALOG_MAX_WIDTH = 600

/**
 * A dialog component for confirming form deletion.
 *
 * Wraps the Dialog component with a destructive confirm action.
 * The dialog is always open when rendered - control visibility by
 * conditionally rendering the component.
 *
 * @example
 * ```tsx
 * {showDeleteDialog && (
 *   <FormDeleteDialog
 *     onDelete={handleDelete}
 *     onClose={() => setShowDeleteDialog(false)}
 *     inProgress={isDeleting}
 *     texts={{
 *       headline: "Delete form?",
 *       confirmLabel: "Delete",
 *       cancelLabel: "Cancel",
 *       closeTooltip: "Close"
 *     }}
 *   >
 *     <FormDeleteDialogContent items={itemsToDelete} />
 *   </FormDeleteDialog>
 * )}
 * ```
 */
export const FormDeleteDialog: FC<FormDeleteDialogProps> = ({
  onClose,
  onDelete,
  inProgress = false,
  texts,
  children,
  maxWidth = FORM_DELETE_DIALOG_MAX_WIDTH,
  className,
}) => {
  return (
    <Dialog
      isOpen
      headline={texts.headline}
      onClose={onClose}
      isDismissable
      actionInProgress={inProgress}
      maxWidth={maxWidth}
      className={className}
      confirmAction={{
        destructive: true,
        label: texts.confirmLabel,
        onClick: onDelete,
      }}
      cancelAction={{
        label: texts.cancelLabel,
        onClick: onClose,
      }}
      headerCloseButton={{
        shortcuts: 'Esc',
        tooltipText: texts.closeTooltip ?? 'Close',
      }}
    >
      {children}
    </Dialog>
  )
}

FormDeleteDialog.displayName = 'FormDeleteDialog'
