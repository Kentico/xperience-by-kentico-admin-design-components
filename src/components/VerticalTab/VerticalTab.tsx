import * as React from 'react';
import { forwardRef } from 'react'
import { useFocusRing } from '@react-aria/focus'
import classNames from 'classnames'
import type { VerticalTabProps } from './VerticalTab.types'
import './VerticalTab.css'

export const VerticalTab = forwardRef<HTMLDivElement, VerticalTabProps>(
  (
    {
      label,
      selected,
      disabled,
      icon,
      onClick,
      testId,
      className,
    },
    ref
  ) => {
    const { isFocusVisible, focusProps } = useFocusRing()

    const containerClassNames = classNames(
      'VerticalTab',
      selected && 'VerticalTab-selected',
      disabled && 'VerticalTab-disabled',
      isFocusVisible && 'VerticalTab-focused',
      className
    )

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!disabled && e.key === 'Enter' && onClick) {
        onClick(e)
      }
    }

    return (
      <div
        ref={ref}
        className={containerClassNames}
        tabIndex={disabled ? undefined : 0}
        onClick={disabled ? undefined : onClick}
        onKeyDown={onKeyDown}
        role="tab"
        aria-selected={selected}
        aria-disabled={disabled}
        {...focusProps}
        data-testid={testId}
      >
        {icon && <div className={'VerticalTab-icon'}>{icon}</div>}
        <span className={'VerticalTab-label'}>{label}</span>
      </div>
    )
  }
)

VerticalTab.displayName = 'VerticalTab'
