import * as React from 'react';
import { forwardRef } from 'react'
import classNames from 'classnames'
import { useSnackbar } from './SnackbarContext'
import { SnackbarItem } from './SnackbarItem'
import {
  SnackbarPosition,
  SnackbarSpacing,
  type SnackbarContainerProps,
} from './Snackbar.types'
import './Snackbar.css'

/**
 * Snackbar container component that displays notification messages.
 * Must be used within a SnackbarProvider to access messages from context.
 *
 * The container is positioned fixed on the screen and renders all active
 * snackbar messages using SnackbarItem components.
 *
 * @example
 * ```tsx
 * // Wrap your app with SnackbarProvider
 * <SnackbarProvider>
 *   <App />
 *   <Snackbar position={SnackbarPosition.TopRight} />
 * </SnackbarProvider>
 *
 * // Then in any child component, use the hook to show messages
 * const { addMessage } = useSnackbar()
 * addMessage({ message: 'Saved!', variant: 'success' })
 * ```
 */
export const Snackbar = forwardRef<HTMLDivElement, SnackbarContainerProps>(
  (
    {
      position = SnackbarPosition.BottomLeft,
      verticalSpacing = SnackbarSpacing.M,
      horizontalSpacing = SnackbarSpacing.M,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { messages, removeMessage } = useSnackbar()

    const positionClasses = classNames(
      position === SnackbarPosition.TopLeft && 'Snackbar-topLeft',
      position === SnackbarPosition.Top && 'Snackbar-top',
      position === SnackbarPosition.TopRight && 'Snackbar-topRight',
      position === SnackbarPosition.BottomRight && 'Snackbar-bottomRight',
      position === SnackbarPosition.Bottom && 'Snackbar-bottom',
      position === SnackbarPosition.BottomLeft && 'Snackbar-bottomLeft'
    )

    const verticalSpacingClasses = classNames(
      verticalSpacing === SnackbarSpacing.M && 'Snackbar-verticalM',
      verticalSpacing === SnackbarSpacing.L && 'Snackbar-verticalL',
      verticalSpacing === SnackbarSpacing.XL && 'Snackbar-verticalXl'
    )

    const horizontalSpacingClasses = classNames(
      horizontalSpacing === SnackbarSpacing.M && 'Snackbar-horizontalM',
      horizontalSpacing === SnackbarSpacing.L && 'Snackbar-horizontalL',
      horizontalSpacing === SnackbarSpacing.XL && 'Snackbar-horizontalXl'
    )

    return (
      <div
        ref={ref}
        className={classNames(
          'Snackbar',
          positionClasses,
          verticalSpacingClasses,
          horizontalSpacingClasses,
          className
        )}
        data-testid="snackbar-container"
        data-ignored-by-clickoutside="true"
        {...props}
      >
        {messages.map(({ id, onClose: userOnClose, ...message }, index) => {
          // Wrap onClose to call both user's callback AND removeMessage
          const handleClose = (messageId: string | number) => {
            removeMessage(messageId)
            if (userOnClose) {
              userOnClose(messageId)
            }
          }
          return (
            <SnackbarItem
              key={id ?? index}
              id={id ?? index}
              position={position}
              onClose={handleClose}
              {...message}
            />
          )
        })}
        {children}
      </div>
    )
  }
)

Snackbar.displayName = 'Snackbar'
