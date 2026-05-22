import * as React from 'react';
import { useEffect, useRef, type ChangeEvent } from 'react'

import { type FileInputProps } from './FileInput.types'

/**
 * Wraps a hidden HTML file input and allows opening the file selection dialog
 * and handling uploaded files programmatically.
 */
export const FileInput = ({
  isOpen,
  accept,
  allowMultiple,
  onFileChange,
  onClose,
}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files = e.target.files
    if (files?.length) {
      onFileChange(files)
    }
  }

  useEffect(() => {
    if (isOpen && fileInputRef.current) {
      fileInputRef.current.value = ''
      fileInputRef.current.click()
    }
  }, [isOpen])

  return (
    <input
      style={{ display: 'none' }}
      type="file"
      multiple={allowMultiple}
      ref={fileInputRef}
      onChange={handleFileChange}
      accept={accept}
      onClick={() => onClose()}
    />
  )
}

FileInput.displayName = 'FileInput'
