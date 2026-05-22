import * as React from 'react';
import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from 'react'
import { createPortal } from 'react-dom'
import DOMPurify from 'dompurify'
import { TooltipPlacement, type TooltipProps, type OptionalTooltipProps } from './Tooltip.types'
import { Shortcuts } from './Shortcuts'
import { getArrowIcon } from './utils'
import './Tooltip.css'

/** Delay in ms once a trigger event is fired before a tooltip is shown */
const TOOLTIP_DELAY = 300
const HIDE_DELAY = 20

export const Tooltip = ({
  children,
  tooltipText,
  placement = TooltipPlacement.Top,
  shortcuts,
  maxGridUnitWidth = 50,
  withoutShowDelay,
  visible,
  disabled,
  appendTo,
  tooltipTextAsHtml,
}: TooltipProps) => {
  const [internalVisible, setInternalVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const effectiveVisible = visible !== undefined ? visible : internalVisible

  const show = useCallback(() => {
    clearTimeout(hideTimeoutRef.current)
    if (withoutShowDelay) {
      setInternalVisible(true)
    } else {
      showTimeoutRef.current = setTimeout(() => setInternalVisible(true), TOOLTIP_DELAY)
    }
  }, [withoutShowDelay])

  const hide = useCallback(() => {
    clearTimeout(showTimeoutRef.current)
    hideTimeoutRef.current = setTimeout(() => setInternalVisible(false), HIDE_DELAY)
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(showTimeoutRef.current)
      clearTimeout(hideTimeoutRef.current)
    }
  }, [])

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const offset = 8

    let top = 0
    let left = 0

    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        top = triggerRect.top - tooltipRect.height - offset
        break
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        top = triggerRect.bottom + offset
        break
      case 'left':
      case 'left-start':
      case 'left-end':
        left = triggerRect.left - tooltipRect.width - offset
        if (placement === 'left') {
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        } else if (placement === 'left-start') {
          top = triggerRect.top
        } else {
          top = triggerRect.bottom - tooltipRect.height
        }
        break
      case 'right':
      case 'right-start':
      case 'right-end':
        left = triggerRect.right + offset
        if (placement === 'right') {
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        } else if (placement === 'right-start') {
          top = triggerRect.top
        } else {
          top = triggerRect.bottom - tooltipRect.height
        }
        break
    }

    if (placement.includes('start')) {
      left = triggerRect.left
    } else if (placement.includes('end')) {
      left = triggerRect.right - tooltipRect.width
    } else if (placement === 'top' || placement === 'bottom') {
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
    }

    // Keep tooltip within viewport
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipRect.width - 8))
    top = Math.max(8, Math.min(top, window.innerHeight - tooltipRect.height - 8))

    setPosition({ top, left })
  }, [placement])

  useEffect(() => {
    if (effectiveVisible) {
      updatePosition()
    }
  }, [effectiveVisible, updatePosition])

  if ((!tooltipText && !shortcuts) || disabled) {
    return children
  }

  const childWithRef = isValidElement(children)
    ? cloneElement(children as ReactElement, {
        ref: triggerRef,
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
      } as Record<string, unknown>)
    : children

  const ArrowIcon = getArrowIcon(placement)
  const portalTarget = appendTo || document.body

  return (
    <>
      {childWithRef}
      {effectiveVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={'Tooltip'}
            style={{ top: position.top, left: position.left }}
            role="tooltip"
            data-placement={placement}
          >
            <div
              className={'Tooltip-tooltipContent'}
              style={{ maxWidth: `calc(${maxGridUnitWidth} * var(--grid-unit))` }}
            >
              {tooltipText &&
                (tooltipTextAsHtml ? (
                  <span
                    className={'Tooltip-tooltipText'}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tooltipText) }}
                  />
                ) : (
                  <span className={'Tooltip-tooltipText'}>{tooltipText}</span>
                ))}
              {shortcuts && <Shortcuts shortcuts={shortcuts} />}
            </div>
            <div className={'Tooltip-arrow'}>
              <ArrowIcon />
            </div>
          </div>,
          portalTarget,
        )}
    </>
  )
}

Tooltip.displayName = 'Tooltip'

// OptionalTooltip - shows tooltip only when text is truncated (ellipsis)
export const OptionalTooltip = ({
  text,
  tooltipText,
  placement = TooltipPlacement.BottomStart,
  customRenderText,
  children,
  ...tooltipProps
}: OptionalTooltipProps) => {
  const textRef = useRef<HTMLElement>(null)
  const [isTruncated, setIsTruncated] = useState(false)

  const checkTruncation = useCallback(() => {
    if (textRef.current) {
      const isOverflowing = textRef.current.scrollWidth > textRef.current.clientWidth
      setIsTruncated(isOverflowing)
    }
  }, [])

  useEffect(() => {
    checkTruncation()
    window.addEventListener('resize', checkTruncation)
    return () => window.removeEventListener('resize', checkTruncation)
  }, [checkTruncation])

  const combinedText = isTruncated
    ? tooltipText
      ? `${tooltipText}\n${text}`
      : text
    : tooltipText || ''

  const content = customRenderText ? (
    customRenderText(textRef)
  ) : (
    <span ref={textRef} className={'Tooltip-truncate'}>
      {children}
    </span>
  )

  return (
    <Tooltip tooltipText={combinedText} placement={placement} {...tooltipProps}>
      {content as ReactElement}
    </Tooltip>
  )
}

OptionalTooltip.displayName = 'OptionalTooltip'
