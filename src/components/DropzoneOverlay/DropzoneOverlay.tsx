import * as React from 'react';
import { forwardRef, useState, useRef, useImperativeHandle, useCallback, type DragEvent } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/Icon'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import type { DropzoneOverlayProps } from './DropzoneOverlay.types'
import './DropzoneOverlay.css'

/**
 * DropzoneOverlay component provides drag-and-drop file upload with visual overlay feedback.
 * Shows a backdrop blur overlay with icon and title when files are dragged over the component.
 *
 * @example
 * <DropzoneOverlay
 *   title="Drop files here"
 *   onUpload={(files) => console.log('Uploaded:', files)}
 *   onActiveChange={(isActive) => console.log('Active:', isActive)}
 * >
 *   <YourContent />
 * </DropzoneOverlay>
 */
export const DropzoneOverlay = forwardRef<HTMLDivElement, DropzoneOverlayProps>(
  (
    { onUpload, onActiveChange, onCurrentTransfer, disabled, children, title, className, overlayClassName, ...props },
    ref
  ) => {
    const [isActive, setIsActive] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

    const setActiveOff = useCallback(
      (event: DragEvent<HTMLDivElement>) => {
        if (disabled || event.target !== containerRef.current) {
          return
        }

        event.stopPropagation()
        event.preventDefault()

        onActiveChange(false)
        setIsActive(false)
      },
      [disabled, onActiveChange]
    )

    const setActiveOn = useCallback(
      (event: DragEvent<HTMLDivElement>) => {
        if (event.target !== containerRef.current && !containerRef.current?.contains(event.target as Node)) {
          return
        }

        if (disabled || (onCurrentTransfer && !onCurrentTransfer(event.dataTransfer))) {
          event.dataTransfer.effectAllowed = 'none'
          event.dataTransfer.dropEffect = 'none'
          return
        }

        event.stopPropagation()
        event.preventDefault()

        onActiveChange(true)
        setIsActive(true)
      },
      [disabled, onActiveChange, onCurrentTransfer]
    )

    const drop = useCallback(
      (event: DragEvent<HTMLDivElement>) => {
        if (disabled || (event.target !== containerRef.current && !containerRef.current?.contains(event.target as Node))) {
          return
        }

        event.stopPropagation()
        event.preventDefault()

        onActiveChange(false)
        setIsActive(false)
        const files = event.dataTransfer?.files
        if (files) {
          onUpload(files)
        }
      },
      [disabled, onActiveChange, onUpload]
    )

    const dropzoneClasses = cn('DropzoneOverlay-dropzone', isActive && 'DropzoneOverlay-disableEvents', className)
    const overlayClasses = cn('DropzoneOverlay-overlay', overlayClassName)

    return (
      <div
        ref={containerRef}
        {...getDataAndAccessibilityProps(props)}
        className={dropzoneClasses}
        onDrop={drop}
        onDragOver={setActiveOn}
        onDragEnter={setActiveOn}
        onDragLeave={setActiveOff}
        onDragEnd={setActiveOff}
      >
        {children}
        {!disabled && isActive ? (
          <div className={overlayClasses}>
            <div className={'DropzoneOverlay-title'}>
              <div className={'DropzoneOverlay-icon'}>
                <Icon name="xp-arrow-up-line" size="xxl" />
              </div>
              {title}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
)

DropzoneOverlay.displayName = 'DropzoneOverlay'
