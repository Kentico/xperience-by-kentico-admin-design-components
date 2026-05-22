import * as React from 'react';
import { forwardRef, type ReactNode, type KeyboardEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/Icon'
import { OptionalTooltip, TooltipPlacement } from '@/components/Tooltip'
import './BreadcrumbItem.css'

export interface BreadcrumbItemProps {
  text?: string
  icon?: string
  path?: string
  current?: boolean
  showArrow?: boolean
  allowEllipsis?: boolean
  onClick?: () => void
  children?: ReactNode
  ariaLabel?: string
}

export const BreadcrumbItem = forwardRef<HTMLDivElement, BreadcrumbItemProps>(
  (
    { text, icon, path, current, allowEllipsis, showArrow, ariaLabel, onClick, children },
    ref
  ) => {
    const wrapperClasses = cn(
      'BreadcrumbItem',
      allowEllipsis && 'BreadcrumbItem-ellipsis',
      text && 'BreadcrumbItem-text',
      text && showArrow && 'BreadcrumbItem-textWithArrow'
    )

    const cellClasses = cn('BreadcrumbItem-cell', current && 'BreadcrumbItem-current')

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && onClick) {
        onClick()
      }
    }

    const renderContent = () => {
      if (path) {
        return (
          <NavLink to={path} className={cellClasses} aria-label={ariaLabel}>
            <span>{text || (icon && <Icon name={icon} size="s" />)}</span>
          </NavLink>
        )
      }

      return (
        <div
          className={cellClasses}
          {...(onClick
            ? {
                onClick,
                role: 'button',
                tabIndex: 0,
                onKeyDown: handleKeyDown,
                'aria-label': ariaLabel,
              }
            : {})}
        >
          {children || text}
        </div>
      )
    }

    return (
      <div ref={ref} className={wrapperClasses}>
        <OptionalTooltip text={text || ''} placement={TooltipPlacement.BottomStart}>
          {renderContent()}
        </OptionalTooltip>
        {showArrow && (
          <span className={'BreadcrumbItem-icon'}>
            <Icon name="chevron-right" size="xs" />
          </span>
        )}
      </div>
    )
  }
)

BreadcrumbItem.displayName = 'BreadcrumbItem'
