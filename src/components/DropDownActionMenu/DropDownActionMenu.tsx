import * as React from 'react';
import {
  useEffect,
  useRef,
  useState,
  type FC,
  type CSSProperties,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import type { DropDownActionMenuProps } from './DropDownActionMenu.types'
import { DropDownPlacement } from './DropDownActionMenu.types'
import './DropDownActionMenu.css'

/**
 * Calculate menu position based on trigger element and placement.
 */
function calculatePosition(
  triggerRect: DOMRect,
  menuRect: DOMRect,
  placement: DropDownPlacement
): CSSProperties {
  const gap = 4 // spacing-popup-distance
  let top = 0
  let left = 0

  // Vertical positioning
  if (placement.startsWith('top')) {
    top = triggerRect.top - menuRect.height - gap
  } else if (placement.startsWith('bottom')) {
    top = triggerRect.bottom + gap
  } else if (placement.startsWith('left') || placement.startsWith('right')) {
    if (placement.endsWith('start')) {
      top = triggerRect.top
    } else {
      top = triggerRect.bottom - menuRect.height
    }
  }

  // Horizontal positioning
  if (placement.endsWith('start')) {
    left = triggerRect.left
  } else if (placement.endsWith('end')) {
    left = triggerRect.right - menuRect.width
  }

  if (placement.startsWith('left')) {
    left = triggerRect.left - menuRect.width - gap
  } else if (placement.startsWith('right')) {
    left = triggerRect.right + gap
  }

  // Ensure menu stays within viewport
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  if (left < 8) left = 8
  if (left + menuRect.width > viewportWidth - 8) {
    left = viewportWidth - menuRect.width - 8
  }
  if (top < 8) top = 8
  if (top + menuRect.height > viewportHeight - 8) {
    top = viewportHeight - menuRect.height - 8
  }

  return { top: `${top}px`, left: `${left}px` }
}

/**
 * A dropdown action menu component that displays a list of menu items.
 * Renders in a portal for proper z-index stacking.
 *
 * Can be used in two modes:
 * 1. Controlled: Pass isOpen, onClose, and triggerRef
 * 2. Uncontrolled with renderTrigger: Pass renderTrigger function
 */
export const DropDownActionMenu: FC<DropDownActionMenuProps> = ({
  isOpen: controlledIsOpen,
  open: controlledOpen,
  onClose: controlledOnClose,
  onToggle: controlledOnToggle,
  triggerRef: controlledTriggerRef,
  placement = DropDownPlacement.BottomEnd,
  children,
  className,
  minWidth,
  matchTriggerWidth,
  maxContentHeight,
  renderTrigger,
}) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const internalTriggerRef = useRef<HTMLElement>(null)
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [position, setPosition] = useState<CSSProperties>({})

  // Determine which mode we're in (isOpen takes precedence over open)
  const isControlled =
    controlledIsOpen !== undefined || controlledOpen !== undefined
  const isOpen = isControlled
    ? (controlledIsOpen ?? controlledOpen ?? false)
    : internalIsOpen
  // When renderTrigger is used, the trigger element always gets internalTriggerRef,
  // so we must use it for positioning regardless of controlled mode.
  const triggerRef = renderTrigger
    ? internalTriggerRef
    : isControlled
      ? controlledTriggerRef
      : internalTriggerRef

  const handleClose = () => {
    if (isControlled) {
      controlledOnClose?.()
      controlledOnToggle?.(false)
    } else {
      setInternalIsOpen(false)
    }
  }

  const handleTriggerClick = () => {
    if (isControlled) {
      controlledOnToggle?.(!isOpen)
    } else {
      setInternalIsOpen((prev) => !prev)
    }
  }

  // Calculate position when menu opens or window resizes
  useEffect(() => {
    if (!isOpen || !triggerRef?.current || !menuRef.current) return

    const updatePosition = () => {
      if (!triggerRef?.current || !menuRef.current) return
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const menuRect = menuRef.current.getBoundingClientRect()
      const pos = calculatePosition(triggerRect, menuRect, placement)
      if (matchTriggerWidth) {
        pos.width = `${triggerRect.width}px`
      }
      setPosition(pos)
    }

    // Initial position calculation
    updatePosition()

    // Update on resize and scroll
    window.addEventListener('resize', updatePosition)
    document.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      document.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen, triggerRef, placement])

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef?.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, triggerRef])

  return (
    <>
      {renderTrigger &&
        renderTrigger(internalTriggerRef as RefObject<HTMLElement>, handleTriggerClick)}
      {isOpen &&
        createPortal(
          <>
            <div className={'DropDownActionMenu-overlay'} onClick={handleClose} aria-hidden="true" />
            <div
              ref={menuRef}
              role="menu"
              className={cn('DropDownActionMenu-menu', className)}
              style={{
                ...position,
                minWidth: minWidth ? `${minWidth}px` : undefined,
                maxHeight: maxContentHeight,
                overflowY: maxContentHeight ? 'auto' : undefined,
              }}
            >
              {children}
            </div>
          </>,
          document.body
        )}
    </>
  )
}

DropDownActionMenu.displayName = 'DropDownActionMenu'
