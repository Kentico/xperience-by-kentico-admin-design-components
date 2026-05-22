import * as React from 'react';
/**
 * BaseSimpleStatus Component
 * A minimal status indicator with icon and text, supporting various semantic states.
 */

import { forwardRef, type ForwardedRef, type RefObject } from 'react'
import classNames from 'classnames'
import { OptionalTooltip, Tooltip } from '../Tooltip'
import { Icon } from '../Icon'
import {
  type BaseSimpleStatusProps,
  SimpleStatusAlign,
  SimpleStatusSize,
  SimpleStatusType,
} from './SimpleStatus.types'
import './SimpleStatus.css'

/**
 * Maps SimpleStatusSize to Icon size prop.
 */
const getIconSize = (size: SimpleStatusSize): 's' | 'xs' => {
  switch (size) {
    case SimpleStatusSize.S:
      return 's'
    case SimpleStatusSize.XS:
      return 'xs'
    default:
      return 's'
  }
}

export const BaseSimpleStatus = forwardRef<HTMLDivElement, BaseSimpleStatusProps>(
  (
    {
      spread,
      labelColor,
      iconColor,
      type,
      content,
      size = SimpleStatusSize.S,
      className,
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const {
      label,
      iconName,
      iconAlign = SimpleStatusAlign.Left,
      tooltipText,
      tooltipPlacement,
      tooltipAppendTo,
    } = content

    // Status type class for color styling
    const statusTypeClass = classNames(
      type === SimpleStatusType.Default && 'SimpleStatus-default',
      type === SimpleStatusType.Error && 'SimpleStatus-error',
      type === SimpleStatusType.Success && 'SimpleStatus-success',
      type === SimpleStatusType.Warning && 'SimpleStatus-warning'
    )

    // Container classes
    const statusClasses = classNames(
      'SimpleStatus',
      spread && 'SimpleStatus-spread',
      size === SimpleStatusSize.S && 'SimpleStatus-sizeS',
      size === SimpleStatusSize.XS && 'SimpleStatus-sizeXs',
      className
    )

    // Icon classes
    const iconClasses = classNames(
      'SimpleStatus-icon',
      statusTypeClass,
      label && iconAlign === SimpleStatusAlign.Left && 'SimpleStatus-spacingRight',
      label && iconAlign === SimpleStatusAlign.Right && 'SimpleStatus-spacingLeft',
      size === SimpleStatusSize.S && 'SimpleStatus-sizeS',
      size === SimpleStatusSize.XS && 'SimpleStatus-sizeXs'
    )

    // Label classes
    const labelClasses = classNames('SimpleStatus-label', statusTypeClass)

    // Render icon element
    const renderIcon = () =>
      iconName ? (
        <div className={iconClasses} style={iconColor ? { color: iconColor } : undefined}>
          <Icon name={iconName} size={getIconSize(size)} />
        </div>
      ) : null

    // Render content with optional ref for truncation detection
    const renderContent = (labelRef?: RefObject<HTMLSpanElement | null>) => (
      <div ref={ref} className={statusClasses}>
        <div className={'SimpleStatus-content'}>
          {iconAlign === SimpleStatusAlign.Left && renderIcon()}
          <div
            className={labelClasses}
            ref={labelRef as RefObject<HTMLDivElement> | undefined}
            style={labelColor ? { color: labelColor } : undefined}
          >
            {label}
          </div>
          {iconAlign === SimpleStatusAlign.Right && renderIcon()}
        </div>
      </div>
    )

    // Shared tooltip props
    const sharedTooltipProps = {
      tooltipText,
      placement: tooltipPlacement,
      appendTo: tooltipAppendTo,
    }

    // When there's a label, use OptionalTooltip for truncation detection
    // When there's no label (icon-only), use regular Tooltip
    return label ? (
      <OptionalTooltip
        text={label}
        customRenderText={(labelRef) => renderContent(labelRef)}
        {...sharedTooltipProps}
      />
    ) : (
      <Tooltip {...sharedTooltipProps}>{renderContent()}</Tooltip>
    )
  }
)

BaseSimpleStatus.displayName = 'SimpleStatus'
