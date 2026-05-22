import { type ReactNode, type MouseEvent } from 'react'
import { type FormEditMode } from '@/components/types/FormEditMode'
export interface FormItemWrapperProps {
  readonly id?: string
  readonly inline?: boolean
  readonly label?: string
  readonly markAsRequired?: boolean
  /** @deprecated Use `editMode` set to `FormEditMode.Disabled` instead. */
  readonly disabled?: boolean
  readonly editMode?: FormEditMode
  readonly inactiveMessage?: string
  readonly labelIcon?: string
  readonly labelIconTooltip?: string
  readonly labelClassnames?: string
  readonly footerClassnames?: string
  readonly subheadlineClassnames?: string
  readonly childrenWrapperClassnames?: string
  readonly inlineWrapperClassnames?: string
  readonly invalid?: boolean
  readonly validationMessage?: string
  readonly statusText?: string
  readonly explanationText?: string
  readonly children: ReactNode
  /** Dangerously sets explanation text as inner HTML. */
  readonly explanationTextAsHtml?: boolean
  /** Dangerously sets tooltip as inner HTML. */
  readonly tooltipAsHtml?: boolean
  readonly onInlineWrapperClick?: (e: MouseEvent<HTMLDivElement>) => void
  readonly labelActionsElement?: ReactNode
}
