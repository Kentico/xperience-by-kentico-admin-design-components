import * as React from 'react';
import { forwardRef, useState, type RefObject } from 'react'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { Button, ButtonColor, ButtonSize } from '../Button'
import { FileInput } from '../FileInput'
import type { BrowseButtonProps } from './BrowseButton.types'

/**
 * A button that opens a file selection dialog.
 * Wraps a hidden FileInput and the existing Button component.
 */
export const BrowseButton = forwardRef<HTMLButtonElement, BrowseButtonProps>(
  (
    { accept, label, disabled, onUpload, allowMultipleFiles, ...props },
    ref
  ) => {
    const [openFileDialog, setOpenFileDialog] = useState(false)

    return (
      <>
        <FileInput
          isOpen={openFileDialog}
          onClose={() => setOpenFileDialog(false)}
          accept={accept}
          allowMultiple={allowMultipleFiles ?? true}
          onFileChange={onUpload}
        />
        <Button
          color={ButtonColor.Secondary}
          disabled={disabled}
          onClick={() => setOpenFileDialog(true)}
          size={ButtonSize.S}
          buttonRef={ref as RefObject<HTMLButtonElement>}
          {...getDataAndAccessibilityProps(props)}
        >
          {label}
        </Button>
      </>
    )
  }
)

BrowseButton.displayName = 'BrowseButton'
