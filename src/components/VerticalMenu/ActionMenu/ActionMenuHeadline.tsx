import * as React from 'react';
import { forwardRef } from 'react'
import classNames from 'classnames'
import type { ActionMenuHeadlineProps } from './ActionMenu.types'
import './ActionMenuHeadline.css'

/**
 * ActionMenuHeadline is a section header within an ActionMenu.
 * Used to group related menu items under a common heading.
 *
 * @example
 * ```tsx
 * <ActionMenu>
 *   <ActionMenuHeadline>File Actions</ActionMenuHeadline>
 *   <MenuItem primaryLabel="New" />
 *   <MenuItem primaryLabel="Open" />
 * </ActionMenu>
 * ```
 */
export const ActionMenuHeadline = forwardRef<
  HTMLDivElement,
  ActionMenuHeadlineProps
>(({ children, className, testId }, ref) => {
  return (
    <div
      ref={ref}
      className={classNames('ActionMenuHeadline-headline', className)}
      data-testid={testId}
      role="heading"
      aria-level={3}
    >
      {children}
    </div>
  )
})

ActionMenuHeadline.displayName = 'ActionMenuHeadline'
