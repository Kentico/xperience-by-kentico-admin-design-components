import * as React from 'react';
import { type ForwardedRef, forwardRef } from 'react'
import { ToggleButtonsBase } from '../Shared/ToggleButtonsBase'
import type { NameToggleButtonsProps } from './NameToggleButtons.types'
import { NameButton } from './NameButton'

export const NameToggleButtons = forwardRef(
  (
    { items, selectedItemId, onChange, ...props }: NameToggleButtonsProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <ToggleButtonsBase ref={ref} {...props}>
        {items.map((item) => (
          <NameButton
            key={item.id}
            label={item.label}
            onClick={() => onChange(item.id)}
            isSelected={selectedItemId === item.id}
          />
        ))}
      </ToggleButtonsBase>
    )
  },
)

NameToggleButtons.displayName = 'NameToggleButtons'
