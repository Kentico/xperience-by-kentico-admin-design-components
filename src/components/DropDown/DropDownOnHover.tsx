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
import type { DropDownOnHoverProps } from './DropDown.types'
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
 * A hover-triggered dropdown component that renders content in a portal.
 * Supports controlled and uncontrolled modes.
 *
 * Usage modes:
 * 1. Controlled: Pass isOpen, onOpenChange/onClose, and triggerRef
 * 2. Uncontrolled: Pass renderTrigger function
 */
export const DropDownOnHover: FC<DropDownOnHoverProps> = ({
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
  showDelay = 0,
  hideDelay = 0,
  interactive = true,
  closeOnContentClick = false,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const internalTriggerRef = useRef<HTMLElement>(null)
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [position, setPosition] = useState<CSSProperties>({})
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Determine controlled vs uncontrolled mode
  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen
  const triggerRef = isControlled ? controlledTriggerRef : internalTriggerRef

  // Clear all pending timeouts
  const clearTimeouts = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current)
      showTimeoutRef.current = null
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
  }, [])

  const handleOpen = useCallback(() => {
    if (disabled) return
    clearTimeouts()
    if (isControlled) {
      onOpen?.()
      onOpenChange?.(true)
    } else {
      setInternalIsOpen(true)
      onOpen?.()
      onOpenChange?.(true)
    }
  }, [disabled, isControlled, onOpen, onOpenChange, clearTimeouts])

  const handleClose = useCallback(() => {
    clearTimeouts()
    if (isControlled) {
      onClose?.()
      onOpenChange?.(false)
    } else {
      setInternalIsOpen(false)
      onClose?.()
      onOpenChange?.(false)
    }
  }, [isControlled, onClose, onOpenChange, clearTimeouts])

  const scheduleOpen = useCallback(() => {
    if (disabled) return
    clearTimeouts()
    if (showDelay > 0) {
      showTimeoutRef.current = setTimeout(handleOpen, showDelay)
    } else {
      handleOpen()
    }
  }, [disabled, showDelay, handleOpen, clearTimeouts])

  const scheduleClose = useCallback(() => {
    clearTimeouts()
    if (hideDelay > 0) {
      hideTimeoutRef.current = setTimeout(handleClose, hideDelay)
    } else {
      handleClose()
    }
  }, [hideDelay, handleClose, clearTimeouts])

  const handleTriggerMouseEnter = useCallback(() => {
    scheduleOpen()
  }, [scheduleOpen])

  const handleTriggerMouseLeave = useCallback(() => {
    scheduleClose()
  }, [scheduleClose])

  const handleContentMouseEnter = useCallback(() => {
    if (interactive) {
      clearTimeouts()
    }
  }, [interactive, clearTimeouts])

  const handleContentMouseLeave = useCallback(() => {
    if (interactive) {
      scheduleClose()
    }
  }, [interactive, scheduleClose])

  const handleContentClick = useCallback(() => {
    if (closeOnContentClick) {
      handleClose()
    }
  }, [closeOnContentClick, handleClose])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeouts()
    }
  }, [clearTimeouts])

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

  // Attach hover events to controlled trigger element
  useEffect(() => {
    if (!isControlled || !controlledTriggerRef?.current) return

    const trigger = controlledTriggerRef.current
    trigger.addEventListener('mouseenter', handleTriggerMouseEnter)
    trigger.addEventListener('mouseleave', handleTriggerMouseLeave)

    return () => {
      trigger.removeEventListener('mouseenter', handleTriggerMouseEnter)
      trigger.removeEventListener('mouseleave', handleTriggerMouseLeave)
    }
  }, [isControlled, controlledTriggerRef, handleTriggerMouseEnter, handleTriggerMouseLeave])

  const dropdownContent = (
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
      onMouseEnter={handleContentMouseEnter}
      onMouseLeave={handleContentMouseLeave}
      onClick={(e) => { e.stopPropagation(); handleContentClick(); }}
      onKeyDown={(e) => e.stopPropagation()}
      data-testid={testId}
    >
      {children}
    </div>
  )

  // For uncontrolled mode, wrap trigger with hover handlers
  const renderTriggerWithHover = () => {
    if (!renderTrigger) return null
    return (
      <div
        onMouseEnter={handleTriggerMouseEnter}
        onMouseLeave={handleTriggerMouseLeave}
      >
        {renderTrigger(internalTriggerRef as RefObject<HTMLElement>, () => {}, isOpen)}
      </div>
    )
  }

  return (
    <div className={className}>
      {renderTriggerWithHover()}
      {isOpen && (usePortal ? createPortal(dropdownContent, document.body) : dropdownContent)}
    </div>
  )
}

DropDownOnHover.displayName = 'DropDownOnHover'
