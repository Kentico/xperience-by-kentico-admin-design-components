import * as React from 'react';
import { useRef, useCallback, useState, useEffect, type MouseEvent, type CSSProperties } from 'react'
import classNames from 'classnames'
import type { ResizableBoxProps, HandleDirection } from './ResizableBox.types'
import './ResizableBox.css'

export const ResizableBox = ({
  id,
  children,
  directions,
  width: controlledWidth,
  height: controlledHeight,
  minWidth = 100,
  maxWidth = 800,
  minHeight = 100,
  maxHeight = 800,
  onResize,
  styleMode = 'inline',
  className,
  style,
  ...rest
}: ResizableBoxProps) => {
  const [isResizing, setIsResizing] = useState(false)
  const [internalWidth, setInternalWidth] = useState(controlledWidth ?? 300)
  const [internalHeight, setInternalHeight] = useState(controlledHeight ?? 300)
  const containerRef = useRef<HTMLDivElement>(null)
  const startPosRef = useRef({ x: 0, y: 0 })
  const startSizeRef = useRef({ width: 0, height: 0 })
  const activeDirectionRef = useRef<HandleDirection | null>(null)

  // Use controlled values if provided
  const width = controlledWidth ?? internalWidth
  const height = controlledHeight ?? internalHeight

  const handleMouseDown = useCallback(
    (direction: HandleDirection) => (e: MouseEvent) => {
      e.preventDefault()
      setIsResizing(true)
      activeDirectionRef.current = direction
      startPosRef.current = { x: e.clientX, y: e.clientY }
      startSizeRef.current = { width, height }
    },
    [width, height]
  )

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!isResizing || !activeDirectionRef.current) return

      const direction = activeDirectionRef.current
      const deltaX = e.clientX - startPosRef.current.x
      const deltaY = e.clientY - startPosRef.current.y

      let newWidth = startSizeRef.current.width
      let newHeight = startSizeRef.current.height

      if (direction === 'right') {
        newWidth = Math.max(minWidth, Math.min(maxWidth, startSizeRef.current.width + deltaX))
      } else if (direction === 'left') {
        newWidth = Math.max(minWidth, Math.min(maxWidth, startSizeRef.current.width - deltaX))
      }

      if (direction === 'bottom') {
        newHeight = Math.max(minHeight, Math.min(maxHeight, startSizeRef.current.height + deltaY))
      } else if (direction === 'top') {
        newHeight = Math.max(minHeight, Math.min(maxHeight, startSizeRef.current.height - deltaY))
      }

      if (controlledWidth === undefined) {
        setInternalWidth(newWidth)
      }
      if (controlledHeight === undefined) {
        setInternalHeight(newHeight)
      }
      onResize?.(newWidth, newHeight)
    },
    [isResizing, minWidth, maxWidth, minHeight, maxHeight, onResize, controlledWidth, controlledHeight]
  )

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
    activeDirectionRef.current = null
  }, [])

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = 'none'
      document.body.style.cursor = activeDirectionRef.current === 'left' || activeDirectionRef.current === 'right'
        ? 'ew-resize'
        : 'ns-resize'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  const containerStyle: CSSProperties = {
    ...style,
    ...(styleMode === 'inline'
      ? { width: `${width}px`, height: directions?.includes('top') || directions?.includes('bottom') ? `${height}px` : undefined }
      : {
          '--width': `${width}px`,
          '--height': `${height}px`,
          '--is-resizing': isResizing ? '1' : '0',
        } as CSSProperties),
  }

  const hasDirections = directions && directions.length > 0

  return (
    <div
      id={id}
      ref={containerRef}
      className={classNames('ResizableBox', isResizing && 'ResizableBox-resizing', className)}
      style={containerStyle}
      {...rest}
    >
      {children}
      {hasDirections && directions.includes('left') && (
        <div
          className={classNames('ResizableBox-handle', 'ResizableBox-left')}
          onMouseDown={handleMouseDown('left')}
        />
      )}
      {hasDirections && directions.includes('right') && (
        <div
          className={classNames('ResizableBox-handle', 'ResizableBox-right')}
          onMouseDown={handleMouseDown('right')}
        />
      )}
      {hasDirections && directions.includes('top') && (
        <div
          className={classNames('ResizableBox-handle', 'ResizableBox-top')}
          onMouseDown={handleMouseDown('top')}
        />
      )}
      {hasDirections && directions.includes('bottom') && (
        <div
          className={classNames('ResizableBox-handle', 'ResizableBox-bottom')}
          onMouseDown={handleMouseDown('bottom')}
        />
      )}
    </div>
  )
}
