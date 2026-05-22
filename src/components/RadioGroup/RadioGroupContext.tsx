import { createContext } from 'react'
import { type RadioGroupState } from '@react-stately/radio'
import { type RadioGroupSize } from './RadioGroup.types'

interface RadioGroupContextValue {
  readonly size: RadioGroupSize
  readonly radioGroupState: RadioGroupState
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)
RadioGroupContext.displayName = 'RadioGroupContext'
