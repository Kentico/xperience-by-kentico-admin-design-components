import * as React from 'react';
import type { FC } from 'react'
import { Dialog } from '@/components/Dialog'
import type { ConfirmationDialogProps } from './ConfirmationDialog.types'

/**
 * Default max width for the confirmation dialog.
 * Matches the source confirmationDialogMaxWidth constant.
 */
const CONFIRMATION_DIALOG_MAX_WIDTH = 600

/**
 * A simplified confirmation dialog component.
 *
 * Wraps the Dialog component with a streamlined API for confirm/cancel scenarios.
 * The dialog is always open when rendered - control visibility by conditionally
 * rendering the component.
 *
 * Note: This is a simplified version that removes the Kentico Forms integration
 * from the source. For form-based confirmation dialogs, use Dialog directly
 * with your own form implementation.
 *
 * @example
 * ```tsx
 * {showConfirmation && (
 *   <ConfirmationDialog
 *     headline="Delete item?"
 *     isConfirmationButtonDestructive
 *     actionInProgress={isDeleting}
 *     onConfirmation={handleDelete}
 *     onCancellation={() => setShowConfirmation(false)}
 *     texts={{
 *       confirmLabel: "Delete",
 *       cancelLabel: "Cancel",
 *       closeTooltip: "Close"
 *     }}
 *   >
 *     <p>This action cannot be undone.</p>
 *   </ConfirmationDialog>
 * )}
 * ```
 */
export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  headline,
  isConfirmationButtonDestructive,
  confirmationButtonIcon,
  actionInProgress = false,
  onConfirmation,
  onCancellation,
  children,
  className,
  overlayClassName,
  maxWidth = CONFIRMATION_DIALOG_MAX_WIDTH,
  texts,
}) => {
  return (
    <Dialog
      isOpen={true}
      headline={headline}
      onClose={onCancellation}
      isDismissable={true}
      actionInProgress={actionInProgress}
      maxWidth={maxWidth}
      className={className}
      overlayClassName={overlayClassName}
      headerCloseButton={{
        tooltipText: texts.closeTooltip ?? 'Close',
        shortcuts: 'Esc',
      }}
      confirmAction={{
        label: texts.confirmLabel,
        onClick: onConfirmation,
        destructive: isConfirmationButtonDestructive,
        icon: confirmationButtonIcon,
      }}
      cancelAction={{
        label: texts.cancelLabel,
        onClick: onCancellation,
      }}
    >
      {children}
    </Dialog>
  )
}

ConfirmationDialog.displayName = 'ConfirmationDialog'
