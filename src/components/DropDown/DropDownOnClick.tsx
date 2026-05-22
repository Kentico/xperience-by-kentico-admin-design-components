import * as React from 'react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type CSSProperties,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import type { DropDownOnClickProps } from './DropDown.types'
import { DropDownPlacement } from './DropDown.types'
import './DropDownOnClick.css'

/**
 * Resolve offset prop into distance (main axis) and skidding (cross axis).
 */
function resolveOffset(offset: number | { skidding: number; distance: number }): { distance: number; skidding: number } {
  if (typeof offset === 'number') {
    return { distance: offset, skidding: 0 }
  }
  return offset
}

/**
 * Calculate dropdown position based on trigger element and placement.
 */
function calculatePosition(
  triggerRect: DOMRect,
  dropdownRect: DOMRect,
  placement: DropDownPlacement,
  offset: number | { skidding: number; distance: number }
): CSSProperties {
  const { distance, skidding } = resolveOffset(offset)
  let top = 0
  let left = 0

  // Vertical positioning
  if (placement.startsWith('top')) {
    top = triggerRect.top - dropdownRect.height - distance
  } else if (placement.startsWith('bottom')) {
    top = triggerRect.bottom + distance
  } else if (placement.startsWith('left') || placement.startsWith('right')) {
    if (placement.endsWith('start')) {
      top = triggerRect.top
    } else if (placement.endsWith('end')) {
      top = triggerRect.bottom - dropdownRect.height
    } else {
      // center alignment for 'left' or 'right' without start/end
      top = triggerRect.top + (triggerRect.height - dropdownRect.height) / 2
    }
  }

  // Horizontal positioning
  if (placement.endsWith('start') && !placement.startsWith('left') && !placement.startsWith('right')) {
    left = triggerRect.left + skidding
  } else if (placement.endsWith('end') && !placement.startsWith('left') && !placement.startsWith('right')) {
    left = triggerRect.right - dropdownRect.width + skidding
  } else if (placement === DropDownPlacement.Top || placement === DropDownPlacement.Bottom) {
    // center alignment for 'top' or 'bottom' without start/end
    left = triggerRect.left + (triggerRect.width - dropdownRect.width) / 2 + skidding
  }

  if (placement.startsWith('left')) {
    left = triggerRect.left - dropdownRect.width - distance
  } else if (placement.startsWith('right')) {
    left = triggerRect.right + distance
  }

  // Ensure dropdown stays within viewport
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const margin = 8

  if (left < margin) left = margin
  if (left + dropdownRect.width > viewportWidth - margin) {
    left = viewportWidth - dropdownRect.width - margin
  }
  if (top < margin) top = margin
  if (top + dropdownRect.height > viewportHeight - margin) {
    top = viewportHeight - dropdownRect.height - margin
  }

  return { top: `${top}px`, left: `${left}px` }
}

/**
 * A click-triggered dropdown component that renders content in a portal.
 * Supports controlled and uncontrolled modes.
 *
 * Usage modes:
 * 1. Controlled: Pass isOpen, onOpenChange/onClose, and triggerRef
 * 2. Uncontrolled: Pass renderTrigger function
 */
export const DropDownOnClick: FC<DropDownOnClickProps> = ({
  children,
  placement = DropDownPlacement.Top,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  onOpenChange,
  triggerRef: controlledTriggerRef,
  renderTrigger,
  disabled = false,
  className,
  contentClassName,
  minWidth,
  maxHeight,
  offset: offsetProp = 0,
  usePortal = true,
  testId,
  closeOnContentClick = false,
  closeOnEscape = true,
  closeOnOutsideClick = true,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const internalTriggerRef = useRef<HTMLElement>(null)
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [position, setPosition] = useState<CSSProperties>({})

  // Determine controlled vs uncontrolled mode
  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen
  const triggerRef = isControlled ? controlledTriggerRef : internalTriggerRef

  const handleOpen = useCallback(() => {
    if (disabled) return
    if (isControlled) {
      onOpen?.()
      onOpenChange?.(true)
    } else {
      setInternalIsOpen(true)
      onOpen?.()
      onOpenChange?.(true)
    }
  }, [disabled, isControlled, onOpen, onOpenChange])

  const handleClose = useCallback(() => {
    if (isControlled) {
      onClose?.()
      onOpenChange?.(false)
    } else {
      setInternalIsOpen(false)
      onClose?.()
      onOpenChange?.(false)
    }
  }, [isControlled, onClose, onOpenChange])

  const handleToggle = useCallback(() => {
    if (disabled) return
    if (isOpen) {
      handleClose()
    } else {
      handleOpen()
    }
  }, [disabled, isOpen, handleClose, handleOpen])

  const handleContentClick = useCallback(() => {
    if (closeOnContentClick) {
      handleClose()
    }
  }, [closeOnContentClick, handleClose])

  // Calculate position when dropdown opens or window resizes
  useEffect(() => {
    if (!isOpen || !triggerRef?.current || !dropdownRef.current) return

    const updatePosition = () => {
      if (!triggerRef?.current || !dropdownRef.current) return
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const dropdownRect = dropdownRef.current.getBoundingClientRect()
      setPosition(calculatePosition(triggerRect, dropdownRect, placement, offsetProp))
    }

    // Initial position calculation
    updatePosition()

    // Update on resize/scroll
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen, triggerRef, placement, offsetProp])

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeOnEscape, handleClose])

  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(target)
      const isOutsideTrigger = triggerRef?.current && !triggerRef.current.contains(target)

      if (isOutsideDropdown && isOutsideTrigger) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, closeOnOutsideClick, triggerRef, handleClose])

  const dropdownContent = (
    <>
      {closeOnOutsideClick && (
        <div className={'DropDownOnClick-overlay'} onClick={handleClose} aria-hidden="true" />
      )}
      <div
        ref={dropdownRef}
        role="menu"
        className={cn('DropDownOnClick-dropdown', contentClassName)}
        style={{
          ...position,
          minWidth: minWidth ? `${minWidth}px` : undefined,
          maxHeight: maxHeight,
          overflowY: maxHeight ? 'auto' : undefined,
        }}
        onClick={(e) => { e.stopPropagation(); handleContentClick(); }}
        onKeyDown={(e) => e.stopPropagation()}
        data-testid={testId}
      >
        {children}
      </div>
    </>
  )

  return (
    <div className={className}>
      {renderTrigger &&
        renderTrigger(internalTriggerRef as RefObject<HTMLElement>, handleToggle, isOpen)}
      {isOpen && (usePortal ? createPortal(dropdownContent, document.body) : dropdownContent)}
    </div>
  )
}

DropDownOnClick.displayName = 'DropDownOnClick'
