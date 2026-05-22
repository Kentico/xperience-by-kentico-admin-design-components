import { useMemo } from 'react'

import { FormEditMode } from '@/components/types/FormEditMode'
import { type ComponentEditStatus } from './useComponentEditStatus.types'

/**
 * Evaluates the actual edit mode of the component based on the provided edit mode and disabled flag.
 *
 * If `disabled` is `true`, the following rules apply:
 * - If `editMode` is not defined or is `FormEditMode.Default`, the actual edit mode is `FormEditMode.Disabled`
 *   to support the obsolete `disabled` flag.
 * - If `editMode` is `FormEditMode.ReadOnly`, the actual edit mode is `FormEditMode.ReadOnly`.
 */
export const useComponentEditStatus = (editMode?: FormEditMode, disabled?: boolean): ComponentEditStatus => {
  const editStatus = useMemo(() => {
    const isLegacyDisabled = disabled && (editMode === undefined || editMode === FormEditMode.Default)
    const currentEditMode = isLegacyDisabled ? FormEditMode.Disabled : (editMode ?? FormEditMode.Default)
    const isDisabled = currentEditMode === FormEditMode.Disabled
    const isReadOnly = currentEditMode === FormEditMode.ReadOnly

    return { currentEditMode, isDisabled, isReadOnly }
  }, [editMode, disabled])

  return editStatus
}
