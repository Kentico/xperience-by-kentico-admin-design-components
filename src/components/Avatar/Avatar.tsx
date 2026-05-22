import * as React from 'react';
import { forwardRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { Tooltip } from '@/components/Tooltip'
import type { AvatarProps } from './Avatar.types'
import { AvatarStaticSize } from './Avatar.types'
import './Avatar.css'

/**
 * Static avatar component — circle with initials or image, wrapped in Tooltip.
 * Does not include any menu or interactive behavior.
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      size,
      tooltipText,
      tooltipPlacement,
      initials,
      img,
      shadow,
      background,
      customContent,
      className,
    },
    ref
  ) => {
    const [imgError, setImgError] = useState(false)

    const showImage = Boolean(img) && !imgError
    // XS shows 1 initial, other sizes show 2
    const displayInitials =
      size === AvatarStaticSize.XS
        ? initials.charAt(0)
        : initials.substring(0, 2)

    const isDark = background.isDark !== false

    const circle = (
      <div
        ref={ref}
        className={cn(
          'Avatar',
          `Avatar-${size}`,
          shadow && 'Avatar-shadow',
          !isDark && 'Avatar-light',
          className,
        )}
        style={!showImage ? { background: background.gradient } : undefined}
      >
        {customContent ? (
          <span className={'Avatar-customContent'}>{customContent}</span>
        ) : showImage ? (
          <img
            src={img}
            alt={tooltipText}
            className={'Avatar-img'}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={'Avatar-content'}>{displayInitials}</span>
        )}
      </div>
    )

    return (
      <Tooltip tooltipText={tooltipText} placement={tooltipPlacement}>
        {circle}
      </Tooltip>
    )
  }
)

Avatar.displayName = 'Avatar'
