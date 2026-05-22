import * as React from 'react';
import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { Checkbox, CheckboxSize } from '../../Checkbox'
import { OptionalTooltip } from '../../Tooltip'
import { BaseTileType } from '../BaseTile.types'
import type { InfoBarProps } from '../BaseTile.types'
import { formatFileSize, getFileSizeObject } from '../BaseTileUtils'
import './InfoBar.css'

/**
 * Component for displaying tile InfoBar part.
 * Shows metadata (dimensions, file size), a checkbox for selection, and the file name.
 */
export const InfoBar = forwardRef<HTMLDivElement, InfoBarProps>(
  (
    {
      type,
      name,
      size,
      dimensions,
      errorState,
      uploadState,
      onCheckboxChange,
      isCheckboxVisible = true,
      isSelected,
      isHighlighted,
      nameLeadingNode,
      contentType,
      disabled,
      isMissingPermission,
      ...props
    },
    ref
  ) => {
    const baseTileSkeleton = type === BaseTileType.Skeleton
    const baseTileSelectable = type === BaseTileType.Selectable
    const isCheckboxDisplayed = isCheckboxVisible && !uploadState && !errorState

    const infobarClasses = cn(
      'InfoBar',
      baseTileSelectable && 'InfoBar-selectable',
      baseTileSkeleton && 'InfoBar-skeleton',
      isSelected && 'InfoBar-selected',
      isHighlighted && 'InfoBar-hover'
    )

    const metadataTextClasses = cn(
      'InfoBar-metadataText',
      baseTileSelectable && 'InfoBar-selectable',
      baseTileSkeleton && 'InfoBar-skeleton'
    )

    const checkboxWrapperClasses = cn(!isCheckboxDisplayed && 'InfoBar-hiddenCheckbox')

    const parsedFileSize = size ? formatFileSize(getFileSizeObject(size)) : null
    const metadata = {
      dimension: dimensions ? `${dimensions.width}x${dimensions.height}px, ` : '',
      fileSize: parsedFileSize,
    }

    const handleCheckboxChange = (_event: React.ChangeEvent<HTMLInputElement>, _checked: boolean) => {
      onCheckboxChange()
    }

    const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation()
    }

    return (
      <div className={infobarClasses} ref={ref} data-testid="info-bar" {...getDataAndAccessibilityProps(props)}>
        <div className={'InfoBar-metadata'}>
          {!isMissingPermission && (
            <div className={metadataTextClasses}>
              {contentType}
              {metadata.dimension}
              <span className={errorState ? 'InfoBar-fileSizeError' : undefined}>
                {metadata.fileSize}
              </span>
            </div>
          )}
          <div className={checkboxWrapperClasses}>
            <Checkbox
              size={CheckboxSize.M}
              onChange={handleCheckboxChange}
              onClick={handleCheckboxClick}
              checked={isSelected}
              highlighted={isHighlighted}
              disabled={!!uploadState || !!errorState || baseTileSkeleton || disabled}
            />
          </div>
        </div>
        <div className={'InfoBar-name'}>
          {nameLeadingNode ? (
            <span className={'InfoBar-nameLeadingNode'}>{nameLeadingNode}</span>
          ) : null}
          <OptionalTooltip
            text={name}
            customRenderText={(textRef) => (
              <div ref={textRef as React.RefObject<HTMLDivElement>} className={'InfoBar-fileName'} data-testid="file-name">
                {name}
              </div>
            )}
          />
        </div>
      </div>
    )
  }
)

InfoBar.displayName = 'InfoBar'
