import * as React from 'react';
import { type ForwardedRef, forwardRef } from 'react'
import { Tooltip } from '@/components/Tooltip'
import { ToggleButtonsBase } from '../Shared/ToggleButtonsBase'
import type { IconToggleButtonsProps } from './IconToggleButtons.types'
import { IconButton } from './IconButton'

export const IconToggleButtons = forwardRef(
  (
    { items, selectedItemId, onChange, ...props }: IconToggleButtonsProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <ToggleButtonsBase ref={ref} {...props}>
        {items.map((item) => (
          <Tooltip key={item.id} tooltipText={item.tooltip} placement={item.tooltipPlacement}>
            <IconButton
              icon={item.icon}
              onClick={() => onChange(item.id)}
              isSelected={selectedItemId === item.id}
              aria-label={`toggle-button-${item.id}`}
            />
          </Tooltip>
        ))}
      </ToggleButtonsBase>
    )
  },
)

IconToggleButtons.displayName = 'IconToggleButtons'
