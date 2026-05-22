import * as React from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useFocusRing } from '@react-aria/focus'
import { cn } from '@/lib/cn'
import { Paper } from '../Paper'
import { Icon } from '../Icon'
import { Spinner } from '../Spinner'
import { Tooltip } from '../Tooltip'
import type { ActionTileProps } from './ActionTile.types'
import { ActionTileState, ActionTileSize, ActionTileType } from './ActionTile.types'
import './ActionTile.css'

/**
 * Checks if a text element is overflowing vertically (multi-line truncation).
 */
function isTextElementVerticallyOverflowing(element: HTMLElement | null): boolean {
  if (!element) return false
  return element.scrollHeight > element.clientHeight
}

/**
 * Checks if a text element is overflowing horizontally (single-line truncation).
 */
function isTextElementHorizontallyOverflowing(element: HTMLElement | null): boolean {
  if (!element) return false
  return element.scrollWidth > element.clientWidth
}

/**
 * ActionTile component - an action tile with icon, label, and various states.
 * Supports navigation via href or click handling, with different sizes and visual types.
 */
export const ActionTile = forwardRef<HTMLButtonElement | HTMLAnchorElement, ActionTileProps>(
  (
    {
      label,
      icon,
      iconSet,
      iconName,
      state = ActionTileState.Default,
      size = ActionTileSize.L,
      type = ActionTileType.Default,
      tabIndex,
      buttonType = 'button',
      tooltip,
      tooltipPlacement,
      onClick,
      href,
    },
    ref
  ) => {
    // Support both `icon` and deprecated `iconName` props
    const resolvedIconName = icon ?? iconName ?? ''
    // iconSet is available for API compatibility but Icon component uses name-based lookup
    void iconSet
    const tileNameRef = useRef<HTMLDivElement>(null)
    const [localTooltipText, setLocalTooltipText] = useState('')
    const { isFocusVisible, focusProps } = useFocusRing()

    const isOverflowing =
      isTextElementVerticallyOverflowing(tileNameRef.current) ||
      isTextElementHorizontallyOverflowing(tileNameRef.current)

    const isDisabled = state === ActionTileState.Disabled
    const isInProgress = state === ActionTileState.InProgress

    // State classes for styling
    const stateClasses = cn(
      state === ActionTileState.Default && 'ActionTile-default',
      state === ActionTileState.Selected && 'ActionTile-selected',
      isDisabled && 'ActionTile-disabled',
      isInProgress && 'ActionTile-loading'
    )

    // Size classes for styling
    const sizeClasses = cn(
      size === ActionTileSize.XS && 'ActionTile-XS',
      size === ActionTileSize.S && 'ActionTile-S',
      size === ActionTileSize.L && 'ActionTile-L'
    )

    // ActionTile inner container classes
    const actionTileClasses = cn(
      'ActionTile',
      type === ActionTileType.Dashboard && 'ActionTile-dashboard',
      stateClasses,
      sizeClasses
    )

    // Icon wrapper classes
    const iconWrapperClasses = cn('ActionTile-iconWrapper', stateClasses)

    // Name wrapper classes
    const tileNameWrapperClasses = cn('ActionTile-nameWrapper', stateClasses, sizeClasses)

    // Tile name classes
    const tileNameClasses = cn('ActionTile-tileName', isOverflowing && 'ActionTile-overflowing')

    // Button/link wrapper classes
    const buttonClasses = cn(
      'ActionTile-actionTileWrapper',
      isFocusVisible && 'ActionTile-focused',
      sizeClasses
    )

    // Set local tooltip text when label is overflowing and no explicit tooltip provided
    useEffect(() => {
      setLocalTooltipText(isOverflowing && !tooltip ? label : '')
    }, [label, tooltip, isOverflowing])

    // Get the icon size based on tile size
    const getIconSize = () => {
      switch (size) {
        case ActionTileSize.XS:
          return 'm'
        case ActionTileSize.S:
          return 'l'
        case ActionTileSize.L:
          return 'xxl'
        default:
          return 'l'
      }
    }

    // Title with optional tooltip for overflow
    const titleWrapped = (
      <Tooltip tooltipText={localTooltipText} placement={tooltipPlacement}>
        <div className={tileNameWrapperClasses}>
          <div className={tileNameClasses} ref={tileNameRef}>
            {label}
          </div>
        </div>
      </Tooltip>
    )

    // Main tile content with Paper, icon, and optional label
    const tileContent = (
      <Paper className={'ActionTile-paper'}>
        <div className={actionTileClasses}>
          <div className={iconWrapperClasses}>
            {isInProgress ? <Spinner /> : <Icon name={resolvedIconName} size={getIconSize()} />}
          </div>
          {size !== ActionTileSize.XS && titleWrapped}
        </div>
      </Paper>
    )

    // Render as NavLink for navigation or button for actions
    const generateButton =
      href && typeof href === 'string' && !isDisabled && !isInProgress ? (
        <NavLink
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={href}
          className={cn(buttonClasses, 'ActionTile-navLink')}
          aria-label={label}
          tabIndex={tabIndex}
          {...focusProps}
        >
          {tileContent}
          {size === ActionTileSize.XS && titleWrapped}
        </NavLink>
      ) : (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={buttonClasses}
          onClick={onClick}
          type={buttonType}
          disabled={isDisabled || isInProgress}
          aria-label={label}
          tabIndex={tabIndex}
          {...focusProps}
        >
          {tileContent}
          {size === ActionTileSize.XS && titleWrapped}
        </button>
      )

    // Wrap in tooltip if explicit tooltip text is provided
    return (
      <Tooltip tooltipText={tooltip} placement={tooltipPlacement}>
        {isDisabled ? <span>{generateButton}</span> : generateButton}
      </Tooltip>
    )
  }
)

ActionTile.displayName = 'ActionTile'
