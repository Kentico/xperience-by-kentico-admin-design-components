import * as React from 'react';
import { forwardRef, useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import { getRandomDarkGradient } from '@/lib/gradients'
import { Tooltip } from '../Tooltip'
import type { AvatarButtonProps } from './AvatarButton.types'
import { AvatarSize } from './AvatarButton.types'
import './AvatarButton.css'

/**
 * Get user initials from name or username.
 */
function getInitials(
  firstName?: string,
  lastName?: string,
  username?: string
): string {
  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }
  if (firstName) {
    return firstName.charAt(0)
  }
  if (username) {
    return username.substring(0, 2)
  }
  return '?'
}

/**
 * A circular avatar button displaying user initials or profile image.
 * Uses a gradient background when no image is provided.
 */
export const AvatarButton = forwardRef<HTMLButtonElement, AvatarButtonProps>(
  (
    {
      firstName,
      lastName,
      username,
      initials: initialsProp,
      imageUrl,
      size = AvatarSize.M,
      onClick,
      isActive,
      ariaLabel,
      className,
      tooltipText,
      tooltipPlacement,
      background,
      shadow,
      disabled,
    },
    ref
  ) => {
    const [imgError, setImgError] = useState(false)

    const computedInitials = useMemo(
      () => getInitials(firstName, lastName, username),
      [firstName, lastName, username]
    )

    const initials = initialsProp ?? computedInitials
    // XS size shows only first initial
    const displayInitials = size === AvatarSize.XS ? initials.charAt(0) : initials.substring(0, 2)

    // Determine gradient background
    const gradient = useMemo(() => {
      if (background) return background.gradient
      const key = username || `${firstName}${lastName}`
      return getRandomDarkGradient(key)
    }, [firstName, lastName, username, background])

    const isDark = background?.isDark !== false
    const showImage = Boolean(imageUrl) && !imgError

    const button = (
      <button
        ref={ref}
        type="button"
        className={cn(
          'AvatarButton',
          `AvatarButton-${size}`,
          isActive && 'AvatarButton-activated',
          shadow && 'AvatarButton-shadow',
          disabled && 'AvatarButton-disabled',
          !isDark && 'AvatarButton-light',
          className
        )}
        style={!showImage ? { background: gradient } : undefined}
        onClick={disabled ? undefined : onClick}
        aria-label={ariaLabel || `${firstName || username}'s profile`}
        aria-pressed={isActive}
        disabled={disabled}
      >
        {showImage ? (
          <img
            src={imageUrl}
            alt={`${firstName || username}'s avatar`}
            className={'AvatarButton-image'}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={'AvatarButton-initials'}>{displayInitials}</span>
        )}
      </button>
    )

    if (tooltipText) {
      return (
        <Tooltip tooltipText={tooltipText} placement={tooltipPlacement}>
          {button}
        </Tooltip>
      )
    }

    return button
  }
)

AvatarButton.displayName = 'AvatarButton'
