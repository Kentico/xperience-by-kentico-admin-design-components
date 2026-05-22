import { type RadioGroupSize } from '../../RadioGroup.types'

export interface RadioCircleProps {
  readonly selected: boolean
  readonly hovered: boolean
  readonly alert: boolean
  readonly size: RadioGroupSize
  readonly disabled: boolean
  readonly readOnly: boolean
}
