import * as React from 'react';
import { forwardRef, useCallback, useEffect, useRef, type FC } from 'react'
import { createPortal } from 'react-dom'
import { FocusScope } from '@react-aria/focus'
import { cn } from '@/lib/cn'
import { Button, ButtonColor, ButtonSize } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { Paper, PaperElevation } from '@/components/Paper'
import { Tooltip, TooltipPlacement } from '@/components/Tooltip'
import { useMediaBreakpoints } from '@/hooks/useMediaBreakpoints'
import { useScrollableDividers } from '@/hooks/useScrollableDividers'
import type { DialogProps, DialogAction } from './Dialog.types'
import './Dialog.css'

/**
 * Renders a dialog footer action button.
 */
const FooterAction: FC<{
  action: DialogAction
  color: (typeof ButtonColor)[keyof typeof ButtonColor]
  disabled?: boolean
  inProgress?: boolean
  fillContainer?: boolean
  buttonRef?: React.RefObject<HTMLButtonElement | null>
}> = ({ action, color, disabled, inProgress, fillContainer, buttonRef }) => {
  if (!action.label && !action.icon) return null

  return (
    <Button
      label={action.label}
      color={color}
      size={ButtonSize.M}
      disabled={disabled || action.disabled}
      inProgress={inProgress || action.inProgress}
      destructive={action.destructive}
      fillContainer={fillContainer}
      icon={action.icon}
      trailingIcon={action.trailingIcon}
      onClick={action.onClick}
      buttonRef={buttonRef}
      title={action.tooltipText}
    />
  )
}

/**
 * A modal dialog component matching the Kentico source architecture.
 * Features structured footer actions: [Secondary] ... [Cancel] [Confirm]
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(({
  isOpen,
  onClose,
  onAfterOpen,
  onAfterClose,
  headline,
  children,
  isDismissable = true,
  actionInProgress = false,
  confirmAction,
  cancelAction,
  secondaryAction,
  notificationBar,
  headerContent,
  headerCloseButton,
  className,
  overlayClassName,
  maxWidth,
  minWidth,
  width,
  height,
  minHeight,
  maxHeight,
  isFullScreen,
  shouldReturnFocusAfterClose = true,
  onOverlayClick,
  shouldCloseOnOverlayClick = true,
}, ref) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const primaryButtonRef = useRef<HTMLButtonElement>(null)
  const scrollableContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const { isTopDividerShown, isBottomDividerShown, onScroll } =
    useScrollableDividers(scrollableContainerRef, contentRef, isOpen)

  const { width: screenWidth } = useMediaBreakpoints()
  const fillContainer = screenWidth <= 320

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return
    if (!isDismissable || actionInProgress) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isDismissable, actionInProgress, onClose])

  // Prevent body scroll, fire lifecycle callbacks, handle focus restore
  useEffect(() => {
    if (isOpen) {
      // Save currently focused element for focus restore
      if (shouldReturnFocusAfterClose) {
        previousFocusRef.current = document.activeElement as HTMLElement | null
      }

      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      onAfterOpen?.()

      return () => {
        document.body.style.overflow = originalOverflow
        onAfterClose?.()

        // Restore focus to previous element
        if (shouldReturnFocusAfterClose && previousFocusRef.current) {
          previousFocusRef.current.focus()
          previousFocusRef.current = null
        }
      }
    }
  }, [isOpen, onAfterOpen, onAfterClose, shouldReturnFocusAfterClose])

  // Auto-focus primary button or cancel button on mount
  useEffect(() => {
    if (!isOpen) return
    // Delay focus to allow animation to complete
    const timer = setTimeout(() => {
      if (primaryButtonRef.current) {
        primaryButtonRef.current.focus()
      } else if (cancelButtonRef.current) {
        cancelButtonRef.current.focus()
      }
    }, 50)
    return () => clearTimeout(timer)
  }, [isOpen])

  const handleOverlayMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onOverlayClick?.(e)
      if (shouldCloseOnOverlayClick && isDismissable && !actionInProgress && e.target === e.currentTarget) {
        onClose()
      }
    },
    [shouldCloseOnOverlayClick, isDismissable, actionInProgress, onClose, onOverlayClick]
  )

  if (!isOpen) return null

  const wrapperStyle: React.CSSProperties = isFullScreen
    ? {}
    : {
        ...(maxWidth !== undefined && { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
        ...(minWidth !== undefined && { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
        ...(width !== undefined && { width: typeof width === 'number' ? `${width}px` : width }),
        ...(height !== undefined && { height: typeof height === 'number' ? `${height}px` : height }),
        ...(minHeight !== undefined && { minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
        ...(maxHeight !== undefined && { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
      }

  const dialogContainer = document.getElementById('dialog-container')
  const portalTarget = dialogContainer || document.body

  const closeButton = (
    <Button
      icon={<Icon name="xp-cancel" size="s" />}
      color={ButtonColor.Quinary}
      size={ButtonSize.S}
      disabled={actionInProgress}
      onClick={onClose}
      aria-label="Close dialog"
    />
  )

  return createPortal(
    <div
      className={cn('Dialog-overlay', overlayClassName, dialogContainer && 'Dialog-overlayContained')}
      onMouseDown={handleOverlayMouseDown}
    >
      <div
        ref={ref}
        className={cn('Dialog-wrapper', isFullScreen && 'Dialog-fullscreen', className)}
        style={Object.keys(wrapperStyle).length > 0 ? wrapperStyle : undefined}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-headline"
      >
        <FocusScope contain restoreFocus={shouldReturnFocusAfterClose} autoFocus>
        <Paper
          elevation={PaperElevation.Large}
          borderRadius="l"
          className={'Dialog-dialogContainer'}
        >
          <div className={'Dialog'}>
            {/* Header */}
            <div>
              <div className={'Dialog-header'}>
                <h2 id="dialog-headline" className={'Dialog-headline'}>
                  {headline}
                </h2>
                {isDismissable && (
                  headerCloseButton ? (
                    <Tooltip
                      tooltipText={headerCloseButton.tooltipText}
                      shortcuts={headerCloseButton.shortcuts}
                      placement={TooltipPlacement.Left}
                      withoutShowDelay
                    >
                      {closeButton}
                    </Tooltip>
                  ) : (
                    closeButton
                  )
                )}
              </div>
              {headerContent}
            </div>

            {/* Scrollable content with dividers */}
            <div className={'Dialog-contentContainer'}>
              <div className={cn('Dialog-divider', isTopDividerShown ? 'Dialog-dividerVisible' : 'Dialog-dividerHidden')} />
              <div
                className={'Dialog-content'}
                ref={scrollableContainerRef}
                onScroll={onScroll}
              >
                <div className={'Dialog-contentOfContent'} ref={contentRef}>{children}</div>
              </div>
              <div className={cn('Dialog-divider', isBottomDividerShown ? 'Dialog-dividerVisible' : 'Dialog-dividerHidden')} />
            </div>

            {/* Footer */}
            {notificationBar && (
              <div className={'Dialog-notification'}>{notificationBar}</div>
            )}
            <div className={'Dialog-footer'}>
              {secondaryAction && (
                <FooterAction
                  action={secondaryAction}
                  color={ButtonColor.Secondary}
                  disabled={actionInProgress}
                  fillContainer={fillContainer}
                />
              )}

              <div className={'Dialog-rightActions'}>
                {isDismissable && cancelAction && (
                  <FooterAction
                    action={cancelAction}
                    color={ButtonColor.Secondary}
                    disabled={actionInProgress}
                    fillContainer={fillContainer}
                    buttonRef={cancelButtonRef}
                  />
                )}

                {confirmAction && (
                  <FooterAction
                    action={confirmAction}
                    color={ButtonColor.Primary}
                    inProgress={actionInProgress}
                    fillContainer={fillContainer}
                    buttonRef={primaryButtonRef}
                  />
                )}
              </div>
            </div>
          </div>
        </Paper>
        </FocusScope>
      </div>
    </div>,
    portalTarget
  )
})

Dialog.displayName = 'Dialog'
