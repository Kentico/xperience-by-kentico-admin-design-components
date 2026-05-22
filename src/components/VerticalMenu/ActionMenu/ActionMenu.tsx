import * as React from 'react';
import { forwardRef } from 'react'
import { VerticalMenu } from '../Common/VerticalMenu'
import type { ActionMenuProps } from './ActionMenu.types'

/**
 * ActionMenu is a specialized vertical menu for action items.
 * It wraps VerticalMenu with action-specific defaults and styling.
 *
 * @example
 * ```tsx
 * <ActionMenu>
 *   <ActionMenuHeadline>File</ActionMenuHeadline>
 *   <MenuItem primaryLabel="New" onClick={() => {}} />
 *   <MenuItem primaryLabel="Open" onClick={() => {}} />
 *   <ActionMenuDivider />
 *   <MenuItem primaryLabel="Save" onClick={() => {}} />
 * </ActionMenu>
 * ```
 */
export const ActionMenu = forwardRef<HTMLDivElement, ActionMenuProps>(
  (
    {
      children,
      size,
      minWidth,
      maxWidth,
      maxHeight,
      bordered = false,
      elevated = true,
      testId,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    return (
      <VerticalMenu
        ref={ref}
        size={size}
        minWidth={minWidth}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        bordered={bordered}
        elevated={elevated}
        testId={testId}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </VerticalMenu>
    )
  }
)

ActionMenu.displayName = 'ActionMenu'
