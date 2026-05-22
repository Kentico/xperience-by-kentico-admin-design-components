import * as React from 'react';
import { forwardRef } from 'react'
import classNames from 'classnames'
import type { VerticalMenuProps } from './VerticalMenu.types'
import { VerticalMenuSize } from './VerticalMenu.types'
import './VerticalMenu.css'

/**
 * VerticalMenu is a base container component for rendering vertical lists of menu items.
 * It provides consistent styling, scrolling behavior, and accessibility features.
 *
 * @example
 * ```tsx
 * <VerticalMenu>
 *   <MenuItem primaryLabel="Option 1" />
 *   <MenuItem primaryLabel="Option 2" />
 *   <ActionMenuDivider />
 *   <MenuItem primaryLabel="Option 3" />
 * </VerticalMenu>
 * ```
 */
export const VerticalMenu = forwardRef<HTMLDivElement, VerticalMenuProps>(
  (
    {
      children,
      size = VerticalMenuSize.Default,
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
    const containerClassNames = classNames(
      'VerticalMenu',
      `VerticalMenu-${size}`,
      bordered && 'VerticalMenu-bordered',
      elevated && 'VerticalMenu-elevated',
      className
    )

    const computedStyle = {
      ...style,
      minWidth: minWidth ? `${minWidth}px` : undefined,
      maxWidth: maxWidth ? `${maxWidth}px` : undefined,
    }

    return (
      <div
        ref={ref}
        role="menu"
        className={containerClassNames}
        style={computedStyle}
        data-testid={testId}
        {...rest}
      >
        {header && <div className={'VerticalMenu-header'}>{header}</div>}
        <div
          className={'VerticalMenu-content'}
          style={{
            maxHeight: maxHeight,
            overflowY: maxHeight ? 'auto' : undefined,
          }}
        >
          {children}
        </div>
        {footer && <div className={'VerticalMenu-footer'}>{footer}</div>}
      </div>
    )
  }
)

VerticalMenu.displayName = 'VerticalMenu'
