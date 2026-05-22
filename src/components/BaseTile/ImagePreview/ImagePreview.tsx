import * as React from 'react';
import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { ProgressBar } from '../../ProgressBar'
import { Icon } from '../../Icon'
import { BaseTileType, BaseTilePreviewIconSize } from '../BaseTile.types'
import type { ImagePreviewProps } from '../BaseTile.types'
import './ImagePreview.css'

const FILE_ICON = 'xp-file'
const ERROR_ICON = 'xp-doc-torn'
const LOCK_ICON = 'xp-lock'

/**
 * Component for displaying tile Image preview part.
 * Supports skeleton loading state, upload progress, error states, and missing permission states.
 */
export const ImagePreview = forwardRef<HTMLDivElement, ImagePreviewProps>(
  (
    {
      type,
      errorState,
      isMissingPermission,
      url,
      uploadState,
      hasPreview,
      previewIcon = FILE_ICON,
      previewIconSize = BaseTilePreviewIconSize.L,
      ...props
    },
    ref
  ) => {
    const baseTileSkeleton = type === BaseTileType.Skeleton

    const imgWrapperClasses = cn(
      'ImagePreview-imgWrapper',
      errorState && 'ImagePreview-errorImg',
      uploadState && 'ImagePreview-uploadInProgress'
    )

    const imgClasses = cn(
      'ImagePreview-img',
      baseTileSkeleton && 'ImagePreview-skeleton',
      !hasPreview && 'ImagePreview-noPreview'
    )

    const previewIconClasses = cn(
      'ImagePreview-previewIcon',
      previewIconSize === BaseTilePreviewIconSize.L && 'ImagePreview-sizeS',
      previewIconSize === BaseTilePreviewIconSize.XXL && 'ImagePreview-sizeXxl'
    )

    const getIcon = () => {
      if (errorState) {
        return ERROR_ICON
      }

      if (isMissingPermission) {
        return LOCK_ICON
      }

      return previewIcon
    }

    return (
      <div className={imgWrapperClasses} ref={ref} {...getDataAndAccessibilityProps(props)}>
        <div
          className={imgClasses}
          style={
            hasPreview && !uploadState && !errorState
              ? {
                  backgroundImage: `url('${url}')`,
                }
              : undefined
          }
          data-testid="image-preview"
        >
          {!baseTileSkeleton && (!hasPreview || errorState) && (
            <div className={previewIconClasses}>
              <Icon name={getIcon()} />
            </div>
          )}
        </div>
        {uploadState && !errorState && (
          <div className={'ImagePreview-progressBar'}>
            <ProgressBar completed={uploadState?.uploadProgress} />
          </div>
        )}
      </div>
    )
  }
)

ImagePreview.displayName = 'ImagePreview'
