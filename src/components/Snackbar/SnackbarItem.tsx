import * as React from 'react';
import { useEffect, type ReactNode } from 'react'
import classNames from 'classnames'
import dompurify from 'dompurify'
import { Paper, PaperElevation } from '../Paper'
import { Icon } from '../Icon'
import { Button, ButtonSize, ButtonColor } from '../Button'
import { Divider, DividerOrientation } from '../Divider'
import {
  SnackbarVariant,
  SnackbarPosition,
  type SnackbarMessage,
} from './Snackbar.types'
import './SnackbarItem.css'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SnackbarItemProps extends SnackbarMessage {
  /** Callback when close button is clicked */
  readonly onClose?: (id: string | number) => void
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

/** Variants that persist and don't auto-dismiss */
const persistentVariants: SnackbarVariant[] = [
  SnackbarVariant.Error,
  SnackbarVariant.Warning,
]

/** Icon names for each variant */
const variantIconNames: Record<SnackbarVariant, string> = {
  [SnackbarVariant.Success]: 'xp-check-circle',
  [SnackbarVariant.Warning]: 'xp-exclamation-triangle',
  [SnackbarVariant.Error]: 'xp-times-circle',
  [SnackbarVariant.Info]: 'xp-i-circle',
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * A single snackbar notification item.
 * Displays a message with an icon, content, and close button.
 *
 * @example
 * ```tsx
 * <SnackbarItem
 *   id="1"
 *   message="Changes saved successfully"
 *   variant={SnackbarVariant.Success}
 *   onClose={(id) => console.log('Closed', id)}
 * />
 * ```
 */
export const SnackbarItem = ({
  onClose,
  message,
  id,
  duration = 4000,
  variant,
  position = SnackbarPosition.TopRight,
  messageAsHtml,
  autoHide = true,
}: SnackbarItemProps): ReactNode => {
  const sanitizer = dompurify.sanitize

  useEffect(() => {
    // Don't auto-hide for error and warning variants
    if (persistentVariants.includes(variant)) {
      return
    }

    const timerId = autoHide
      ? setTimeout(() => {
          if (onClose && id !== undefined) {
            onClose(id)
          }
        }, duration)
      : undefined

    if (timerId) {
      return () => {
        clearTimeout(timerId)
      }
    }
    return () => {
      // Cleanup placeholder
    }
  }, [autoHide, duration, id, onClose, variant])

  const positionClasses = classNames(
    position === SnackbarPosition.TopLeft && 'SnackbarItem-itemTopLeft',
    position === SnackbarPosition.Top && 'SnackbarItem-itemTop',
    position === SnackbarPosition.TopRight && 'SnackbarItem-itemTopRight',
    position === SnackbarPosition.BottomRight && 'SnackbarItem-itemBottomRight',
    position === SnackbarPosition.Bottom && 'SnackbarItem-itemBottom',
    position === SnackbarPosition.BottomLeft && 'SnackbarItem-itemBottomLeft'
  )

  const variantClasses = classNames(
    variant === SnackbarVariant.Success && 'SnackbarItem-iconSuccess',
    variant === SnackbarVariant.Error && 'SnackbarItem-iconError',
    variant === SnackbarVariant.Warning && 'SnackbarItem-iconWarning',
    variant === SnackbarVariant.Info && 'SnackbarItem-iconInfo'
  )

  return (
    <div
      className={classNames('SnackbarItem', positionClasses)}
      data-testid={`snackbar-item-${variant}`}
      role="alert"
      aria-live="polite"
    >
      <Paper elevation={PaperElevation.Large}>
        <div className={'SnackbarItem-contentWrapper'}>
          <div className={classNames('SnackbarItem-icon', variantClasses)}>
            <Icon name={variantIconNames[variant]} size="l" />
          </div>
          {messageAsHtml ? (
            <div
              className={'SnackbarItem-content'}
              data-testid="snackbar-item-message"
              dangerouslySetInnerHTML={{ __html: sanitizer(String(message)) }}
            />
          ) : (
            <div className={'SnackbarItem-content'} data-testid="snackbar-item-message">
              {message}
            </div>
          )}
          <div className={'SnackbarItem-divider'}>
            <Divider orientation={DividerOrientation.Vertical} />
          </div>
          <div className={'SnackbarItem-close'}>
            <Button
              icon={<Icon name="xp-cancel" size="s" />}
              size={ButtonSize.S}
              color={ButtonColor.Quinary}
              onClick={(e) => {
                e.stopPropagation()
                if (onClose && id !== undefined) {
                  onClose(id)
                }
              }}
              aria-label="Dismiss notification"
            />
          </div>
        </div>
      </Paper>
    </div>
  )
}

SnackbarItem.displayName = 'SnackbarItem'
