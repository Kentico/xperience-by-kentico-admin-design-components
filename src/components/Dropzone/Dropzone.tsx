import * as React from 'react';
import { forwardRef, useCallback, type DragEvent } from 'react'
import { cn } from '@/lib/cn'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import type { DropzoneProps } from './Dropzone.types'
import './Dropzone.css'

/**
 * A drag-and-drop zone for file uploads.
 *
 * The Dropzone component provides a container that accepts file drops.
 * It handles drag events and notifies parent components about drag state
 * changes and file uploads.
 */
export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(
  (props, ref) => {
    const {
      onUpload,
      onActiveChange,
      onCurrentTransfer,
      disabled,
      children,
      className,
      ...rest
    } = props

    /**
     * Handle drag leave and drag end events.
     * Sets the dropzone to inactive state.
     */
    const handleDragLeave = useCallback(
      (event: DragEvent<HTMLDivElement>) => {
        event.stopPropagation()
        event.preventDefault()

        if (disabled) {
          return
        }

        onActiveChange(false)
      },
      [disabled, onActiveChange]
    )

    /**
     * Handle drag over and drag enter events.
     * Sets the dropzone to active state if the drag is permitted.
     */
    const handleDragEnter = useCallback(
      (event: DragEvent<HTMLDivElement>) => {
        event.stopPropagation()
        event.preventDefault()

        // Check if disabled or transfer is not permitted
        if (disabled || (onCurrentTransfer && !onCurrentTransfer(event.dataTransfer))) {
          event.dataTransfer.effectAllowed = 'none'
          event.dataTransfer.dropEffect = 'none'
          return
        }

        onActiveChange(true)
      },
      [disabled, onActiveChange, onCurrentTransfer]
    )

    /**
     * Handle the drop event.
     * Extracts files from the data transfer and calls onUpload.
     */
    const handleDrop = useCallback(
      (event: DragEvent<HTMLDivElement>) => {
        event.stopPropagation()
        event.preventDefault()

        if (disabled) {
          return
        }

        onActiveChange(false)

        const files = event.dataTransfer?.files
        if (files && files.length > 0) {
          onUpload(files)
        }
      },
      [disabled, onActiveChange, onUpload]
    )

    return (
      <div
        ref={ref}
        className={cn('Dropzone', className)}
        onDrop={handleDrop}
        onDragOver={handleDragEnter}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragLeave}
        {...getDataAndAccessibilityProps(rest as Record<string, unknown>)}
      >
        {children}
      </div>
    )
  }
)

Dropzone.displayName = 'Dropzone'
