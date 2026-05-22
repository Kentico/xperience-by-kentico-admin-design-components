import * as React from 'react';
/**
 * SimpleStatus Variant Components
 * Pre-configured variants of BaseSimpleStatus for common use cases.
 */

import { forwardRef, type ForwardedRef } from 'react'
import { BaseSimpleStatus } from './BaseSimpleStatus'
import {
  type SimpleStatusDefaultProps,
  type SimpleStatusErrorProps,
  type SimpleStatusSuccessProps,
  type SimpleStatusWarningProps,
  SimpleStatusType,
} from './SimpleStatus.types'

/**
 * Default status indicator - configurable with custom colors.
 * Use for neutral or informational status messages.
 */
export const SimpleStatusDefault = forwardRef<HTMLDivElement, SimpleStatusDefaultProps>(
  (props: SimpleStatusDefaultProps, ref: ForwardedRef<HTMLDivElement>) => {
    return <BaseSimpleStatus ref={ref} type={SimpleStatusType.Default} {...props} />
  }
)
SimpleStatusDefault.displayName = 'SimpleStatusDefault'

/**
 * Error status indicator with preset error icon.
 * Icon is automatically set to 'xp-exclamation-triangle-inverted'.
 */
export const SimpleStatusError = forwardRef<HTMLDivElement, SimpleStatusErrorProps>(
  ({ content, ...restProps }: SimpleStatusErrorProps, ref: ForwardedRef<HTMLDivElement>) => {
    const iconName = 'xp-exclamation-triangle-inverted'
    return (
      <BaseSimpleStatus
        ref={ref}
        {...restProps}
        type={SimpleStatusType.Error}
        content={{
          ...content,
          iconName,
        }}
      />
    )
  }
)
SimpleStatusError.displayName = 'SimpleStatusError'

/**
 * Success status indicator.
 * Use for indicating successful operations or positive states.
 */
export const SimpleStatusSuccess = forwardRef<HTMLDivElement, SimpleStatusSuccessProps>(
  (props: SimpleStatusSuccessProps, ref: ForwardedRef<HTMLDivElement>) => {
    return <BaseSimpleStatus ref={ref} {...props} type={SimpleStatusType.Success} />
  }
)
SimpleStatusSuccess.displayName = 'SimpleStatusSuccess'

/**
 * Warning status indicator with default warning icon.
 * Icon defaults to 'xp-exclamation-triangle' if not specified.
 */
export const SimpleStatusWarning = forwardRef<HTMLDivElement, SimpleStatusWarningProps>(
  ({ content, ...restProps }: SimpleStatusWarningProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { iconName = 'xp-exclamation-triangle' } = content
    return (
      <BaseSimpleStatus
        ref={ref}
        {...restProps}
        content={{
          ...content,
          iconName,
        }}
        type={SimpleStatusType.Warning}
      />
    )
  }
)
SimpleStatusWarning.displayName = 'SimpleStatusWarning'
