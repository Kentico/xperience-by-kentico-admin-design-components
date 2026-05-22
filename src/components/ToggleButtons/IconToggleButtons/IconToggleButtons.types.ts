import type { TooltipPlacement } from '@/components/Tooltip'
import type { ToggleButtonsItem, ToggleButtonsProps } from '../Shared/ToggleButtonsBase'
import type { IconButtonProps } from './IconButton'

export interface IconToggleButton extends Pick<IconButtonProps, 'icon' | 'ariaLabel'>, ToggleButtonsItem {
  readonly tooltip?: string
  readonly tooltipPlacement?: TooltipPlacement
}

export interface IconToggleButtonsProps extends ToggleButtonsProps<IconToggleButton> {}
