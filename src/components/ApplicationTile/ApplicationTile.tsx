import * as React from 'react';
import { forwardRef, useId, useRef, useState, useEffect } from 'react'
import { useFocusRing } from '@react-aria/focus'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { Icon } from '../Icon'
import { Tooltip, TooltipPlacement } from '../Tooltip'
import type { ApplicationTileProps } from './ApplicationTile.types'
import { ApplicationTileState } from './ApplicationTile.types'
import './ApplicationTile.css'

/**
 * Filters props to only data-* and aria-* attributes.
 */
function getDataAndAccessibilityProps(props: Record<string, unknown>) {
  const filtered: Record<string, unknown> = {}
  for (const key of Object.keys(props)) {
    if (key.startsWith('data-') || key.startsWith('aria-')) {
      filtered[key] = props[key]
    }
  }
  return filtered
}

export const ApplicationTile = forwardRef<HTMLDivElement, ApplicationTileProps>(
  (allProps, ref) => {
    const {
      iconName,
      label,
      state = ApplicationTileState.Default,
      tooltip,
      tooltipPlacement = TooltipPlacement.Left,
      favouriteTile,
      onClick = () => {},
      link,
    } = allProps

    const { isFocusVisible, focusProps } = useFocusRing()
    const labelRef = useRef<HTMLDivElement>(null)
    const [localTooltipText, setLocalTooltipText] = useState('')
    const buttonId = `button-${useId()}`

    const isOverflowing =
      (labelRef.current && labelRef.current.scrollHeight > labelRef.current.clientHeight) ||
      (labelRef.current && labelRef.current.scrollWidth > labelRef.current.clientWidth)

    useEffect(() => {
      setLocalTooltipText(isOverflowing ? tooltip || label : '')
    }, [label, tooltip, isOverflowing])

    const stateClass = cn(
      state === ApplicationTileState.Default && 'ApplicationTile-default',
      state === ApplicationTileState.Activated && 'ApplicationTile-activated',
      state === ApplicationTileState.Disabled && 'ApplicationTile-disabled'
    )

    const buttonClasses = cn('ApplicationTile-buttonContent', stateClass, isFocusVisible && 'ApplicationTile-focused')
    const iconWrapperClasses = cn('ApplicationTile-iconWrapper', favouriteTile?.withStar && 'ApplicationTile-favourite', stateClass)
    const labelClasses = cn('ApplicationTile-label', stateClass)
    const containerClasses = cn('ApplicationTile-container', isFocusVisible && 'ApplicationTile-focused')

    const content = (
      <>
        <div className={iconWrapperClasses}>
          <div className={'ApplicationTile-mainIcon'}>
            <Icon name={iconName} size="l" />
          </div>
          {favouriteTile?.withStar ? (
            <div className={'ApplicationTile-favouriteIcon'}>
              <Tooltip
                tooltipText={favouriteTile.starTooltip || 'Added to favourites'}
                placement={favouriteTile.starTooltipPlacement}
              >
                <Icon name="xp-star-full" size="xs" />
              </Tooltip>
            </div>
          ) : null}
        </div>
        <div className={labelClasses} ref={labelRef}>
          <span>{label}</span>
        </div>
      </>
    )

    return (
      <Tooltip tooltipText={localTooltipText} placement={tooltipPlacement}>
        <div
          ref={ref}
          className={containerClasses}
          {...getDataAndAccessibilityProps(allProps as unknown as Record<string, unknown>)}
        >
          {link && state !== ApplicationTileState.Disabled ? (
            <NavLink to={link} onClick={onClick} className={buttonClasses} {...focusProps}>
              {content}
            </NavLink>
          ) : (
            <button
              id={buttonId}
              aria-label={label}
              onClick={onClick}
              disabled={state === ApplicationTileState.Disabled}
              className={buttonClasses}
              {...focusProps}
            >
              {content}
            </button>
          )}
        </div>
      </Tooltip>
    )
  }
)

ApplicationTile.displayName = 'ApplicationTile'
