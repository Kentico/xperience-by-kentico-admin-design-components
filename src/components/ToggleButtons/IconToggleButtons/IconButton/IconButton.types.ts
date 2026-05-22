import type { ToggleButtonBaseProps } from '../../Shared/ToggleButtonBase'

export interface IconButtonProps extends Pick<ToggleButtonBaseProps, 'onClick' | 'ariaLabel' | 'isSelected'> {
  readonly icon: string
}
