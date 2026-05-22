import * as React from 'react';
import { forwardRef, useEffect, useState, type RefObject } from 'react'
import { useFocusRing } from '@react-aria/focus'
import { cn } from '@/lib/cn'
import { Paper } from '../Paper'
import { Icon } from '../Icon'
import { Button } from '../Button'
import { ButtonColor, ButtonSize } from '../Button/Button.types'
import { DropDownActionMenu } from '../DropDownActionMenu'
import { MenuItem } from '../MenuItem'
import { BarItemHeaderColumnAlign, type BarItemProps } from './BarItem.types'
import './BarItem.css'

/**
 * BarItem is an expandable item component typically used in lists or forms.
 * It displays a header with configurable columns and optional action buttons,
 * with expandable content below.
 *
 * @example
 * ```tsx
 * <BarItem
 *   headerColumns={[
 *     { content: 'Item Name', width: 200 },
 *     { content: 'Description', align: BarItemHeaderColumnAlign.Right }
 *   ]}
 *   leadingButtons={[
 *     { label: 'Edit', icon: 'xp-edit', onClick: handleEdit }
 *   ]}
 * >
 *   <div>Expandable content goes here</div>
 * </BarItem>
 * ```
 */
export const BarItem = forwardRef<HTMLDivElement, BarItemProps>(
  (
    {
      children,
      leadingButtons = [],
      expanded: expandedControlled = false,
      onHeaderClick,
      dragElement,
      isDragging,
      headerColumns,
      disabled,
    },
    ref
  ) => {
    const [expanded, setExpanded] = useState(expandedControlled)
    const [expandable] = useState(Boolean(children))

    useEffect(() => {
      setExpanded(expandedControlled)
    }, [expandedControlled])

    const { isFocusVisible, focusProps } = useFocusRing()

    const headerClasses = cn(
      'BarItem-barItemHeader',
      expandable && 'BarItem-expandable',
      expanded && 'BarItem-expanded',
      isDragging && 'BarItem-drag',
      disabled && 'BarItem-disabled'
    )

    const wrapperClasses = cn('BarItem-wrapper', isFocusVisible && 'BarItem-focused')

    const handleHeaderClick = () => {
      if (onHeaderClick) {
        onHeaderClick()
      } else if (expandable) {
        setExpanded(!expanded)
      }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        handleHeaderClick()
      }
    }

    // Calculate visible buttons limit based on whether drag element is present
    const visibleButtonsLimit = dragElement ? 2 : 3
    const visibleButtonsLimitTrimmed =
      visibleButtonsLimit < leadingButtons.length
        ? visibleButtonsLimit - 1
        : leadingButtons.length
    const visibleLeadingButtons = leadingButtons.slice(
      0,
      visibleButtonsLimitTrimmed
    )
    const hiddenLeadingButtons = leadingButtons.slice(visibleButtonsLimitTrimmed)

    return (
      <div ref={ref} className={wrapperClasses}>
        <Paper>
          <div
            className={headerClasses}
            role="button"
            tabIndex={disabled ? -1 : 0}
            onClick={disabled ? undefined : handleHeaderClick}
            onKeyDown={disabled ? undefined : onKeyDown}
            {...focusProps}
          >
            {/* Leading actions area - stop event propagation */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
            >
              {dragElement}
              {visibleLeadingButtons.map((action, index) => (
                <Button
                  key={index}
                  color={ButtonColor.Quinary}
                  size={ButtonSize.S}
                  disabled={action.disabled || disabled}
                  onClick={action.onClick}
                  icon={action.icon}
                  title={action.tooltip}
                  destructive={action.destructive}
                />
              ))}
              {hiddenLeadingButtons.length > 0 && (
                <DropDownActionMenu
                  renderTrigger={(triggerRef, onTriggerClick) => (
                    <Button
                      buttonRef={triggerRef as RefObject<HTMLButtonElement>}
                      onClick={onTriggerClick}
                      icon="xp-three-dots-vertical"
                      color={ButtonColor.Quinary}
                      disabled={disabled}
                    />
                  )}
                >
                  {hiddenLeadingButtons.map((action, index) => (
                    <MenuItem
                      key={index}
                      primaryLabel={action.label}
                      leadingElement={{
                        type: 'icon',
                        element: <Icon name={action.icon} />,
                      }}
                      disabled={action.disabled || disabled}
                      onClick={action.onClick}
                    />
                  ))}
                </DropDownActionMenu>
              )}
            </div>

            {/* Header columns */}
            {headerColumns?.map((column, index) => (
              <span
                key={index}
                style={{
                  width: column.width,
                  flex: index + 1,
                  justifyContent:
                    column.align === BarItemHeaderColumnAlign.Right
                      ? 'flex-end'
                      : 'flex-start',
                }}
                className={'BarItem-barItemColumn'}
              >
                {column.content}
              </span>
            ))}

            {/* Expand/collapse button */}
            {expandable && (
              <span className={'BarItem-trailingActions'}>
                <Button
                  icon={expanded ? 'xp-chevron-up' : 'xp-chevron-down'}
                  size={ButtonSize.S}
                  color={ButtonColor.Quinary}
                  disabled={disabled}
                />
              </span>
            )}
          </div>

          {/* Expandable body */}
          {expanded && <div className={'BarItem-barItemBody'}>{children}</div>}
        </Paper>
      </div>
    )
  }
)

BarItem.displayName = 'BarItem'
