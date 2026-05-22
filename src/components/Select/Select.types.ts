import type { ReactNode, RefObject } from 'react'
import type { InputBaseProps } from '@/components/Input/InputBase.types'

export interface SelectProps
  extends Omit<InputBaseProps, 'type' | 'actionElement' | 'onChange' | 'clearButton' | 'isSelect'> {
  /** Select children (MenuItem components) */
  readonly children: ReactNode
  /** Change handler called with the selected value */
  readonly onChange?: (value?: string) => void
  /** Label text above the select */
  readonly label?: string
  /** Validation message when invalid */
  readonly validationMessage?: string
  /** Whether the field is required */
  readonly markAsRequired?: boolean
  /** Label icon */
  readonly labelIcon?: string
  /** Tooltip for label icon */
  readonly labelIconTooltip?: string
  /** Message shown when the component is inactive */
  readonly inactiveMessage?: string
  /** Explanation text below the select */
  readonly explanationText?: string
  /** Input ref */
  readonly inputRef?: RefObject<HTMLInputElement>
  /** Maximum content height for the dropdown (CSS value, e.g. '40vh') */
  readonly maxContentHeight?: string
  /** Tooltip for the clear button */
  readonly clearButtonTooltip?: string
  /** Whether the select can be cleared */
  readonly clearable?: boolean
  /** Label actions element */
  readonly labelActionsElement?: ReactNode
  /** Dangerously sets explanation text as inner HTML */
  readonly explanationTextAsHtml?: boolean
  /** Dangerously sets tooltip as inner HTML */
  readonly tooltipAsHtml?: boolean
}
