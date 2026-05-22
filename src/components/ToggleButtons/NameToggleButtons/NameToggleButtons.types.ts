import type { ToggleButtonsItem, ToggleButtonsProps } from '../Shared/ToggleButtonsBase'
import type { NameButtonProps } from './NameButton'

export interface NameToggleButton extends Pick<NameButtonProps, 'label' | 'ariaLabel'>, ToggleButtonsItem {}

export interface NameToggleButtonsProps extends ToggleButtonsProps<NameToggleButton> {}
