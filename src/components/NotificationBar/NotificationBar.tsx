import * as React from 'react';
import { forwardRef, useState, useEffect, useRef, type ForwardedRef, type ReactNode } from 'react'
import classNames from 'classnames'
import DOMPurify from 'dompurify'
import { Icon } from '../Icon'
import { Button, ButtonColor, ButtonSize } from '../Button'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import './NotificationBar.css'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export const NotificationBarType = {
  Alert: 'alert',
  Warning: 'warning',
  Info: 'info',
} as const

export type NotificationBarType = (typeof NotificationBarType)[keyof typeof NotificationBarType]

export type NotificationBarVariant = 'alert' | 'warning' | 'info'

export interface BaseNotificationBarProps {
  /** Notification type */
  readonly type: NotificationBarType
  /** Callback when dismiss button is clicked */
  readonly onDismiss?: () => void
  /** Disables the auto-increase alignment when notification bar grows taller */
  readonly noAutoIncrease?: boolean
  /** Disables the bold (medium) weight of the text */
  readonly noBoldWeight?: boolean
  /** When true, children (string) is rendered as sanitized HTML */
  readonly childrenAsHtml?: boolean
  /** Additional CSS class */
  readonly className?: string
  /** Notification content */
  readonly children: string | ReactNode
  /** Actions rendered between content and dismiss button */
  readonly actions?: ReactNode
}

export interface NotificationBarAlertProps {
  readonly children: string | ReactNode
  readonly onDismiss?: () => void
  readonly noAutoIncrease?: boolean
  readonly noBoldWeight?: boolean
  readonly childrenAsHtml?: boolean
  readonly className?: string
  readonly actions?: ReactNode
}

export type NotificationBarInfoProps = NotificationBarAlertProps
export type NotificationBarWarningProps = NotificationBarAlertProps

/* ------------------------------------------------------------------ */
/*  Utilities                                                          */
/* ------------------------------------------------------------------ */

const getIcon = (type: NotificationBarType): string | undefined => {
  switch (type) {
    case NotificationBarType.Alert:
    case NotificationBarType.Warning:
      return 'xp-exclamation-triangle-inverted'
    case NotificationBarType.Info:
      return 'xp-i-circle'
    default:
      return undefined
  }
}

const getRole = (type: NotificationBarType): string => {
  switch (type) {
    case NotificationBarType.Alert:
      return 'alert'
    case NotificationBarType.Info:
      return 'note'
    case NotificationBarType.Warning:
      return 'warning'
    default:
      return ''
  }
}

/* Default min-height matches source Spacing.XXXXL = 48px */
const DEFAULT_HEIGHT = 48

/* ------------------------------------------------------------------ */
/*  BaseNotificationBar (core)                                         */
/* ------------------------------------------------------------------ */

export const BaseNotificationBar = forwardRef<HTMLDivElement, BaseNotificationBarProps>(
  (
    {
      type,
      children,
      onDismiss,
      noAutoIncrease = false,
      noBoldWeight,
      childrenAsHtml = false,
      className,
      actions,
      ...restProps
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const localRef = useRef<HTMLDivElement>(null)
    const containerRef = (ref || localRef) as React.RefObject<HTMLDivElement>

    const [isIncreased, setIsIncreased] = useState(false)

    useEffect(() => {
      const el = containerRef.current
      if (!el || noAutoIncrease) return

      const observer = new ResizeObserver(([entry]) => {
        if (entry) {
          setIsIncreased(entry.borderBoxSize[0].blockSize > DEFAULT_HEIGHT)
        }
      })
      observer.observe(el, { box: 'border-box' })
      return () => observer.disconnect()
    }, [containerRef, noAutoIncrease])

    const typeClass =
      type === NotificationBarType.Alert
        ? 'NotificationBar-alertType'
        : type === NotificationBarType.Info
          ? 'NotificationBar-infoType'
          : type === NotificationBarType.Warning
            ? 'NotificationBar-warningType'
            : undefined

    const containerClasses = classNames(
      'NotificationBar',
      typeClass,
      !noAutoIncrease && isIncreased && 'NotificationBar-increased'
    )

    const textClasses = classNames(
      'NotificationBar-text',
      typeClass,
      noBoldWeight && 'NotificationBar-normalFontWeight',
      className
    )

    const contentClasses = classNames(
      'NotificationBar-text',
      'NotificationBar-content',
      typeClass,
      noBoldWeight && 'NotificationBar-normalFontWeight',
      className
    )

    const iconClasses = classNames('NotificationBar-icon', typeClass)
    const dismissClasses = classNames('NotificationBar-dismissButton', typeClass)

    const iconName = getIcon(type)
    const role = getRole(type)

    return (
      <div
        ref={containerRef}
        {...getDataAndAccessibilityProps(restProps as Record<string, unknown>)}
        className={containerClasses}
        style={{ minHeight: DEFAULT_HEIGHT }}
        role={role}
        aria-atomic="true"
      >
        {iconName ? (
          <div className={iconClasses}>
            <Icon name={iconName} />
          </div>
        ) : null}

        {typeof children === 'string' ? (
          childrenAsHtml ? (
            <div
              className={textClasses}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(children) }}
            />
          ) : (
            <div className={textClasses}>{children}</div>
          )
        ) : (
          <div className={contentClasses}>{children}</div>
        )}

        {actions}

        {onDismiss ? (
          <div className={dismissClasses}>
            <Button
              color={ButtonColor.Quinary}
              size={ButtonSize.S}
              icon={<Icon name="xp-cancel" size="s" />}
              onClick={onDismiss}
              aria-label="Dismiss"
            />
          </div>
        ) : null}
      </div>
    )
  }
)

BaseNotificationBar.displayName = 'BaseNotificationBar'

/* ------------------------------------------------------------------ */
/*  Variant components                                                 */
/* ------------------------------------------------------------------ */

export const NotificationBarAlert = forwardRef<HTMLDivElement, NotificationBarAlertProps>(
  (props, ref) => <BaseNotificationBar type={NotificationBarType.Alert} ref={ref} {...props} />
)
NotificationBarAlert.displayName = 'NotificationBarAlert'

export const NotificationBarWarning = forwardRef<HTMLDivElement, NotificationBarWarningProps>(
  (props, ref) => <BaseNotificationBar type={NotificationBarType.Warning} ref={ref} {...props} />
)
NotificationBarWarning.displayName = 'NotificationBarWarning'

export const NotificationBarInfo = forwardRef<HTMLDivElement, NotificationBarInfoProps>(
  (props, ref) => <BaseNotificationBar type={NotificationBarType.Info} ref={ref} {...props} />
)
NotificationBarInfo.displayName = 'NotificationBarInfo'
