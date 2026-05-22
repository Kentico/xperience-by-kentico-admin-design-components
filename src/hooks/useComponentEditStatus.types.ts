import { type FormEditMode } from '@/components/types/FormEditMode'

export interface ComponentEditStatus {
  readonly currentEditMode: FormEditMode
  readonly isDisabled: boolean
  readonly isReadOnly: boolean
}
