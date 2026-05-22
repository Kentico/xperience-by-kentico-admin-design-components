import * as React from 'react';
import { forwardRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { BrowseButton } from '../BrowseButton'
import { Dropzone } from '../Dropzone'
import { Icon } from '../Icon'
import { Tooltip, TooltipPlacement } from '../Tooltip'
import type { UploadTileProps } from './UploadTile.types'
import { UploadTileSize } from './UploadTile.types'
import './UploadTile.css'

/**
 * Upload tile component.
 *
 * A drag-and-drop upload tile with an upload icon, instructional text,
 * and a browse button. Supports two sizes: Full and Compact.
 */
export const UploadTile = forwardRef<HTMLDivElement, UploadTileProps>(
  (
    {
      onUpload,
      firstLineLabel,
      secondLineLabel,
      buttonLabel,
      disabled,
      inactiveMessage,
      size = UploadTileSize.Full,
      acceptFiles,
      ...props
    },
    ref
  ) => {
    const [isActive, setIsActive] = useState(false)

    const containerClasses = cn(
      'UploadTile-container',
      isActive && 'UploadTile-containerDrag',
      size === UploadTileSize.Full && 'UploadTile-full',
      size === UploadTileSize.Compact && 'UploadTile-compact'
    )

    const browseButtonClasses = cn(!isActive && 'UploadTile-enabledClick')

    /**
     * Check if the current transfer contains files.
     */
    const onCurrentTransfer = (dataTransfer: DataTransfer) => {
      return dataTransfer.types.includes('Files')
    }

    return (
      <div
        ref={ref}
        className={containerClasses}
        {...getDataAndAccessibilityProps(props as Record<string, unknown>)}
      >
        <Tooltip
          tooltipText={inactiveMessage ?? ''}
          placement={TooltipPlacement.Top}
          disabled={!disabled}
        >
          <Dropzone
            onUpload={onUpload}
            onActiveChange={setIsActive}
            onCurrentTransfer={onCurrentTransfer}
            disabled={disabled}
          >
            <div className={'UploadTile-content'}>
              <div className={'UploadTile-iconCanvas'}>
                <Icon name="xp-arrow-up-line" />
              </div>
              <div>{firstLineLabel}</div>
              <div className={'UploadTile-textPadding'}>{secondLineLabel}</div>
              <div className={browseButtonClasses}>
                <BrowseButton
                  label={buttonLabel}
                  onUpload={onUpload}
                  disabled={disabled}
                  accept={acceptFiles}
                />
              </div>
            </div>
          </Dropzone>
        </Tooltip>
      </div>
    )
  }
)

UploadTile.displayName = 'UploadTile'
