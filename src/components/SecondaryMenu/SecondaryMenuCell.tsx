import * as React from 'react';
import { type KeyboardEvent, useRef, useState } from 'react'
import classNames from 'classnames'
import { Tooltip } from '@/components/Tooltip'
import { useResizeObserver } from '@/hooks'
import type { SecondaryMenuCellProps } from './SecondaryMenu.types'
import './SecondaryMenuCell.css'

/**
 * A single cell/item in the secondary menu.
 * Renders a navigation item with overflow tooltip
 * and keyboard navigation support (Enter/Space).
 */
export function SecondaryMenuCell({
  item,
  isActive,
  onClick,
}: SecondaryMenuCellProps) {
  const labelRef = useRef<HTMLSpanElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useResizeObserver({
    ref: labelRef,
    onResize: () => {
      const el = labelRef.current
      if (el) {
        setIsOverflowing(el.offsetHeight < el.scrollHeight)
      }
    },
  })

  const handleClick = () => {
    if (!item.disabled && onClick) {
      onClick()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const tooltipText = item.disabled
    ? item.inactiveMessage
    : isOverflowing
      ? item.label
      : undefined

  const cellContent = (
    <div
      className={classNames('SecondaryMenuCell-cell', {
        ['SecondaryMenuCell-cellActive']: isActive,
        ['SecondaryMenuCell-cellDisabled']: item.disabled,
      })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="menuitem"
      tabIndex={item.disabled ? -1 : 0}
      aria-disabled={item.disabled}
    >
      <span className={'SecondaryMenuCell-cellLabel'}>
        <span ref={labelRef} className={'SecondaryMenuCell-cellLabelContent'}>{item.label}</span>
      </span>
    </div>
  )

  if (tooltipText) {
    return <Tooltip tooltipText={tooltipText}>{cellContent}</Tooltip>
  }

  return cellContent
}
