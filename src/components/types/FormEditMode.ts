export const FormEditMode = {
  Default: 'default',
  Disabled: 'disabled',
  ReadOnly: 'readOnly',
} as const

export type FormEditMode = (typeof FormEditMode)[keyof typeof FormEditMode]
