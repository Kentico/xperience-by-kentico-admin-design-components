import { type FormItemWrapperProps } from '@/components/FormItemWrapper/FormItemWrapper.types'

export const RadioGroupSize = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
} as const

export type RadioGroupSize = (typeof RadioGroupSize)[keyof typeof RadioGroupSize]

export interface RadioGroupProps
  extends Omit<
    FormItemWrapperProps,
    'id' | 'inline' | 'labelClassnames' | 'footerClassnames' | 'subheadlineClassnames' | 'editMode' | 'disabled'
  > {
  readonly name: string
  readonly value?: string
  readonly onChange?: (value: string) => void
  readonly size?: RadioGroupSize
  readonly inline?: boolean
  /**
   * @deprecated Property is deprecated and will be removed in the next version. Use `aria-label` instead.
   */
  readonly ariaLabel?: string
  readonly disabled?: boolean
  readonly readOnly?: boolean
}
