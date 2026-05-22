import type { ToggleButtonBaseProps } from '../../Shared/ToggleButtonBase'

export interface NameButtonProps extends Pick<ToggleButtonBaseProps, 'onClick' | 'ariaLabel' | 'isSelected'> {
  readonly label: string
}
