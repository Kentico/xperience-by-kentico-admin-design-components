import * as React from 'react';
import { forwardRef, type ReactNode, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'
import './Cell.css'

export interface CellProps {
  /** Whether the cell is in active state */
  readonly active?: boolean
  /** Route path - if provided, renders as NavLink instead of button */
  readonly link?: string
  /** Accessibility label */
  readonly ariaLabel?: string
  /** Cell content */
  readonly children: ReactNode
  /** Click handler (for button mode) */
  readonly onClick?: () => void
}

/**
 * A flexible cell component for the small status bar.
 * Renders as NavLink when link is provided, otherwise as button.
 * Supports focus ring styling and active states.
 */
export const Cell = forwardRef<HTMLButtonElement, CellProps>(
  ({ active, link, children, ariaLabel, onClick }, ref) => {
    const [isFocusVisible, setIsFocusVisible] = useState(false)

    const handleFocus = (e: React.FocusEvent) => {
      // Check if focus was triggered by keyboard (Tab key)
      if (e.target.matches(':focus-visible')) {
        setIsFocusVisible(true)
      }
    }

    const handleBlur = () => {
      setIsFocusVisible(false)
    }

    const cellClasses = cn(
      'Cell',
      active && 'Cell-active',
      isFocusVisible && 'Cell-focused'
    )

    const focusProps = {
      onFocus: handleFocus,
      onBlur: handleBlur,
    }

    if (link) {
      return (
        <NavLink
          to={link}
          className={cellClasses}
          aria-label={ariaLabel}
          {...focusProps}
        >
          {children}
        </NavLink>
      )
    }

    return (
      <button
        className={cellClasses}
        onClick={onClick}
        ref={ref}
        aria-label={ariaLabel}
        {...focusProps}
      >
        {children}
      </button>
    )
  }
)

Cell.displayName = 'Cell'
