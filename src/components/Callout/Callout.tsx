import * as React from 'react';
import { forwardRef, type ForwardedRef } from 'react'
import classNames from 'classnames'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { Icon } from '../Icon'
import { Stack, Spacing } from '../Layout'
import { CalloutPlacementType, CalloutType, type CalloutProps } from './Callout.types'
import './Callout.css'

const getIconName = (type: CalloutType): string => {
  switch (type) {
    case CalloutType.QuickTip:
      return 'xp-i-circle'
    case CalloutType.FriendlyWarning:
      return 'xp-exclamation-triangle-inverted'
    default:
      return 'xp-i-circle'
  }
}

export const calloutDefaultMaxWidth = '494px'
/** @deprecated Use calloutDefaultMaxWidth instead */
export const calloutMaxWidthOnDesk = calloutDefaultMaxWidth

export const Callout = forwardRef(
  (
    {
      type,
      headline,
      placement,
      children,
      actionButton,
      subheadline,
      maxWidth = calloutDefaultMaxWidth,
      className,
      ...props
    }: CalloutProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const typeClasses = classNames(
      type === CalloutType.FriendlyWarning && 'Callout-friendlyWarning',
      type === CalloutType.QuickTip && 'Callout-quickTip'
    )

    const placementClasses = classNames(
      placement === CalloutPlacementType.OnDesk && 'Callout-onDesk',
      placement === CalloutPlacementType.OnPaper && 'Callout-onPaper'
    )

    const subHeadlineClasses = classNames('Callout-subHeadline', typeClasses)

    const calloutClasses = classNames('Callout', placementClasses, typeClasses, className)

    return (
      <div
        ref={ref}
        {...getDataAndAccessibilityProps(props)}
        className={calloutClasses}
        style={{ maxWidth }}
      >
        <Stack spacing={Spacing.L}>
          <div className={subHeadlineClasses}>
            <div className={'Callout-subHeadlineIcon'}>
              <Icon name={getIconName(type)} size="s" />
            </div>
            {subheadline !== undefined && (
              <div className={'Callout-subHeadlineText'}>{subheadline}</div>
            )}
          </div>

          {headline && headline !== '' && (
            <div>
              <div className={'Callout-headline'}>{headline}</div>
            </div>
          )}

          <div className={'Callout-content'}>{children}</div>

          {actionButton && <div>{actionButton}</div>}
        </Stack>
      </div>
    )
  }
)

Callout.displayName = 'Callout'
