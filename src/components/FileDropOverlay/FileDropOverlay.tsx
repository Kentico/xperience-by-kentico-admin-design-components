import * as React from 'react';
import { forwardRef, useCallback, type ForwardedRef } from 'react'
import { DropzoneOverlay } from '../DropzoneOverlay'
import type { FileDropOverlayProps } from './FileDropOverlay.types'

/**
 * FileDropOverlay component provides a simplified drag-and-drop file upload
 * with optional file count restrictions on top of DropzoneOverlay.
 *
 * @example
 * <FileDropOverlay
 *   title="Drop files here"
 *   maxFiles={5}
 *   onDrop={(files) => console.log('Dropped:', files)}
 *   onActiveChange={(isActive) => console.log('Active:', isActive)}
 * >
 *   <YourContent />
 * </FileDropOverlay>
 */
export const FileDropOverlay = forwardRef(
  (
    {
      maxFiles,
      onDrop,
      onActiveChange,
      children,
      disabled,
      className,
      overlayClassName,
      title,
    }: FileDropOverlayProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const onCurrentTransfer = useCallback(
      (dataTransfer: DataTransfer) => {
        // Check if items are available during dragover (Safari won't populate this due to privacy reasons)
        const hasItemsSupport = dataTransfer.items.length > 0
        const isFilesInDataTransfer = dataTransfer.types.includes('Files')

        // If maxFiles is specified, check the number of items being transferred
        if (maxFiles !== undefined) {
          return hasItemsSupport
            ? dataTransfer.items.length <= maxFiles && isFilesInDataTransfer
            : isFilesInDataTransfer
        }

        return isFilesInDataTransfer
      },
      [maxFiles]
    )

    const handleUpload = useCallback(
      (files: FileList) => {
        // For Safari, check the file count in onUpload (ondrop event) since dataTransfer.items is empty during dragover
        if (maxFiles !== undefined && files.length > maxFiles) {
          return
        }

        onDrop(files)
      },
      [maxFiles, onDrop]
    )

    return (
      <DropzoneOverlay
        ref={ref}
        onUpload={handleUpload}
        onActiveChange={onActiveChange}
        onCurrentTransfer={onCurrentTransfer}
        disabled={disabled}
        className={className}
        overlayClassName={overlayClassName}
        title={title}
      >
        {children}
      </DropzoneOverlay>
    )
  }
)

FileDropOverlay.displayName = 'FileDropOverlay'
