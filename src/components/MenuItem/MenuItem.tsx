import * as React from 'react';
import { forwardRef } from 'react'
import { useFocusRing } from '@react-aria/focus'
import classNames from 'classnames'
import { Icon } from '@/components/Icon'
import { OptionalTooltip } from '@/components/Tooltip'
import type { MenuItemProps } from './MenuItem.types'
import './MenuItem.css'

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      primaryLabel,
      secondaryLabel,
      tooltipText,
      tooltipPlacement,
      destructive,
      disabled,
      selected,
      leadingElement,
      trailingElement,
      isNested,
      isSubmenuOpened,
      isMultiSelect,
      testId,
      onClick,
      large,
      noHoverCss,
      // Backward-compatible target-only props
      icon,
      label,
      className,
    },
    ref
  ) => {
    const { isFocusVisible, focusProps } = useFocusRing()

    // Backward compatibility: label fallback to primaryLabel
    const displayLabel = primaryLabel || label || ''

    const containerClassNames = classNames(
      'MenuItem',
      destructive ? 'MenuItem-destructive' : 'MenuItem-default',
      selected && 'MenuItem-selected',
      disabled && 'MenuItem-disabled',
      isFocusVisible && 'MenuItem-focused',
      isSubmenuOpened && 'MenuItem-openedSubmenu',
      noHoverCss && 'MenuItem-noHover',
      className
    )

    const primaryLabelClassNames = classNames(
      'MenuItem-primaryLabel',
      Boolean(secondaryLabel) && 'MenuItem-bottomSpacing'
    )

    const secondaryLabelClassNames = classNames(
      'MenuItem-secondaryLabel',
      destructive && 'MenuItem-destructive',
      disabled && 'MenuItem-disabled',
      isSubmenuOpened && 'MenuItem-openedSubmenu'
    )

    const leadingElementType = classNames(
      leadingElement?.type === 'icon' && 'MenuItem-icon'
    )

    const leadingElementClassNames = classNames(
      'MenuItem-leadingElement',
      leadingElementType
    )

    const trailingElementType = classNames(
      trailingElement?.type === 'icon' && 'MenuItem-icon',
      trailingElement?.type === 'label' && 'MenuItem-label'
    )

    const trailingElementClassNames = classNames(
      'MenuItem-trailingElement',
      trailingElementType
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
        role={disabled ? undefined : 'button'}
        {...focusProps}
        data-testid={testId}
      >
        {isNested && <div className={'MenuItem-nestedPlaceholder'} />}
        {large && <div className={'MenuItem-heightHelper'} />}
        {isMultiSelect &&
          (selected ? (
            <div
              className={classNames(
                leadingElementClassNames,
                'MenuItem-icon',
                'MenuItem-multiSelect'
              )}
            >
              <Icon name="xp-cb-check-sign" />
            </div>
          ) : (
            <div className={'MenuItem-multiSelectPlaceholder'} />
          ))}
        {/* Backward compat: icon prop */}
        {!leadingElement && icon && (
          <div className={classNames('MenuItem-leadingElement', 'MenuItem-icon')}>
            {icon}
          </div>
        )}
        {leadingElement && (
          <div className={classNames(leadingElementClassNames)}>
            {leadingElement.element}
          </div>
        )}
        <OptionalTooltip
          text={`${displayLabel} ${secondaryLabel ? secondaryLabel : ''}`}
          tooltipText={tooltipText}
          placement={tooltipPlacement}
          customRenderText={(tooltipRef) => (
            <div className={'MenuItem-body'}>
              <span className={primaryLabelClassNames} ref={tooltipRef as React.RefObject<HTMLSpanElement>}>
                {displayLabel}
              </span>
              {secondaryLabel && (
                <div className={secondaryLabelClassNames}>{secondaryLabel}</div>
              )}
            </div>
          )}
        />
        {trailingElement && (
          <div className={trailingElementClassNames}>
            {trailingElement.element}
          </div>
        )}
      </div>
    )
  }
)

MenuItem.displayName = 'MenuItem'
