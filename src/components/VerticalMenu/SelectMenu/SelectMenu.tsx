import * as React from 'react';
import { forwardRef } from 'react'
import { VerticalMenu } from '../Common/VerticalMenu'
import type { SelectMenuProps } from './SelectMenu.types'

/**
 * SelectMenu is a specialized vertical menu for selection-based interactions.
 * It wraps VerticalMenu with selection-specific defaults and styling.
 *
 * Use this component when users need to select from a list of options,
 * as opposed to ActionMenu which is used for triggering actions.
 *
 * @example
 * ```tsx
 * <SelectMenu>
 *   <SelectMenuHeadline>Choose an option</SelectMenuHeadline>
 *   <MenuItem primaryLabel="Option A" onClick={() => setSelected('a')} selected={selected === 'a'} />
 *   <MenuItem primaryLabel="Option B" onClick={() => setSelected('b')} selected={selected === 'b'} />
 *   <MenuItem primaryLabel="Option C" onClick={() => setSelected('c')} selected={selected === 'c'} />
 * </SelectMenu>
 * ```
 */
export const SelectMenu = forwardRef<HTMLDivElement, SelectMenuProps>(
  (
    {
      children,
      size,
      minWidth,
      maxWidth,
      maxHeight,
      bordered = false,
      elevated = true,
      header,
      footer,
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
        header={header}
        footer={footer}
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

SelectMenu.displayName = 'SelectMenu'
