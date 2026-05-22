import * as React from 'react';
import { forwardRef, type ForwardedRef } from 'react'
import { useFocusRing } from '@react-aria/focus'
import classNames from 'classnames'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { Tooltip, TooltipPlacement } from '@/components/Tooltip'
import { Column, Row, RowWrap, LayoutAlignment, Spacing } from '@/components/Layout'
import { Icon } from '@/components/Icon'
import type { SelectGroupCellProps } from './SelectGroup.types'
import './SelectGroupCell.css'

export const SelectGroupCell = forwardRef(
  (
    {
      open,
      label,
      tooltipText,
      onClick,
      icon,
      leadingElement,
      ellipsis,
      selectionDisabled,
      className,
      labelRef,
      ...props
    }: SelectGroupCellProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { isFocusVisible, focusProps } = useFocusRing()

    const buttonClasses = classNames(
      'SelectGroupCell-button',
      !selectionDisabled && isFocusVisible && 'SelectGroupCell-focused',
      !selectionDisabled && 'SelectGroupCell-activeSelection'
    )

    const iconClasses = classNames('SelectGroupCell-icon', ellipsis && 'SelectGroupCell-ellipsis')
    const containerClasses = classNames('SelectGroupCell-container', className)

    return (
      <div
        ref={ref}
        className={containerClasses}
        {...getDataAndAccessibilityProps(props)}
        role="button"
      >
        {/* Tooltip wrapper for accessibility */}
        <Tooltip placement={TooltipPlacement.BottomStart} tooltipText={tooltipText}>
          <button
            onClick={!selectionDisabled ? onClick : undefined}
            className={buttonClasses}
            {...focusProps}
            type="button"
          >
            <Row alignY={LayoutAlignment.Center} spacing={Spacing.S} wrap={RowWrap.NoWrap}>
              {icon && (
                <Column>
                  <span className={iconClasses}>
                    <Icon name={icon} />
                  </span>
                </Column>
              )}
              {leadingElement && !icon && (
                <Column>
                  <span className={'SelectGroupCell-leadingElement'}>{leadingElement.element}</span>
                </Column>
              )}
              {!ellipsis && (
                <>
                  <Column className={'SelectGroupCell-label'} ref={labelRef}>
                    {label}
                  </Column>
                  {!selectionDisabled && (
                    <Column>
                      <Icon name={open ? 'xp-chevron-up' : 'xp-chevron-down'} />
                    </Column>
                  )}
                </>
              )}
            </Row>
          </button>
        </Tooltip>
      </div>
    )
  }
)

SelectGroupCell.displayName = 'SelectGroupCell'
