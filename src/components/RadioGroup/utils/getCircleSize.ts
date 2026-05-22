import { RadioGroupSize } from '../RadioGroup.types'

export const getCircleSize = (size: RadioGroupSize): number => {
  switch (size) {
    case RadioGroupSize.Small:
      return 12
    case RadioGroupSize.Medium:
      return 16
    case RadioGroupSize.Large:
      return 24
    default:
      return 16
  }
}
