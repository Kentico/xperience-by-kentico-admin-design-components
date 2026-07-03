import * as React from 'react';
import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { ActionButtonsProps } from './ActionButtons.types'
import { ActionButtonsAlign, ActionButtonsSpacing } from './ActionButtons.types'
import './ActionButtons.css'

/**
 * ActionButtons component - a container for grouping action buttons.
 * Provides consistent spacing and alignment for button groups.
 *
 * @example
 * ```tsx
 * <ActionButtons align="end" spacing="M">
 *   <Button color="secondary" label="Cancel" />
 *   <Button color="primary" label="Save" />
 * </ActionButtons>
 * ```
 */
export const ActionButtons = forwardRef<HTMLDivElement, ActionButtonsProps>(
  (
    {
      align = ActionButtonsAlign.Start,
      spacing = ActionButtonsSpacing.M,
      wrap,
      fillContainer,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'ActionButtons',
          `ActionButtons-${align}`,
          `ActionButtons-${spacing}`,
          wrap && 'ActionButtons-wrap',
          fillContainer && 'ActionButtons-fillContainer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ActionButtons.displayName = 'ActionButtons'
