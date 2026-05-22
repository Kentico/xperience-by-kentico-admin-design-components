import * as React from 'react';
import { useCallback, useState, type FC } from 'react'
import { FormDeleteDialog } from './FormDeleteDialog'
import { FormDeleteDialogContent } from './FormDeleteDialogContent'
import type { FormDeleteComponentProps } from './FormDeleteComponent.types'

/**
 * A controller component for the form delete dialog.
 *
 * Manages the delete operation state (in progress, error handling) and
 * coordinates between the dialog and content components.
 *
 * This simplified version removes server dependencies from the source
 * (`usePageCommandProvider`, `useRefetchAllContext`, `useTableManager`)
 * and uses local callbacks instead.
 *
 * @example
 * ```tsx
 * {showDeleteComponent && (
 *   <FormDeleteComponent
 *     items={[
 *       { id: 1, name: "Contact Form" },
 *       { id: 2, name: "Survey Form" }
 *     ]}
 *     onDelete={async (ids) => {
 *       await api.deleteForms(ids)
 *     }}
 *     onClose={() => setShowDeleteComponent(false)}
 *     onComplete={() => {
 *       setShowDeleteComponent(false)
 *       refreshList()
 *     }}
 *     texts={{
 *       headline: "Delete forms?",
 *       confirmLabel: "Delete",
 *       cancelLabel: "Cancel"
 *     }}
 *     callout={{
 *       type: CalloutType.FriendlyWarning,
 *       placement: CalloutPlacementType.OnPaper,
 *       content: "This action cannot be undone."
 *     }}
 *   />
 * )}
 * ```
 */
export const FormDeleteComponent: FC<FormDeleteComponentProps> = ({
  items,
  onDelete,
  onClose,
  onComplete,
  callout,
  texts,
  maxWidth,
  className,
}) => {
  const [inProgress, setInProgress] = useState(false)

  const itemsList = Array.isArray(items) ? items : [items]
  const ids = itemsList.map((item) => item.id)

  const handleDelete = useCallback(async () => {
    setInProgress(true)

    try {
      await onDelete(ids)
      onComplete?.()
    } catch (error) {
      // Error handling - in production you might want to show an error message
      console.error('Delete operation failed:', error)
    } finally {
      setInProgress(false)
    }
  }, [onDelete, onComplete, ids])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <FormDeleteDialog
      onDelete={handleDelete}
      onClose={handleClose}
      inProgress={inProgress}
      texts={texts}
      maxWidth={maxWidth}
      className={className}
    >
      <FormDeleteDialogContent callout={callout} items={items} />
    </FormDeleteDialog>
  )
}

FormDeleteComponent.displayName = 'FormDeleteComponent'
