import * as React from 'react';
import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { Row, Column, RowWrap, Spacing } from '../../Layout'
import { Button, ButtonColor, ButtonSize } from '../../Button'
import { OptionalTooltip } from '../../Tooltip'
import { BaseTileType } from '../BaseTile.types'
import type { ToolBarProps } from '../BaseTile.types'
import './ToolBar.css'

/**
 * Component for displaying tile ToolBar part.
 * Shows actions, error messages, and upload cancel functionality.
 */
export const ToolBar = forwardRef<HTMLDivElement, ToolBarProps>(
  (
    { type, errorState, uploadState, actions, hasPreview, disabled, dragElement, ...props },
    ref
  ) => {
    const selectableTile = type === BaseTileType.Selectable
    const previewTile = type === BaseTileType.Preview
    const skeletonTile = type === BaseTileType.Skeleton

    const previewTileToolBar = previewTile && (uploadState?.onUploadCancel || !uploadState || errorState)
    const selectableTileToolBar = selectableTile && (uploadState?.onUploadCancel || errorState)
    const isToolBarVisible = !skeletonTile && (previewTileToolBar || selectableTileToolBar)

    const toolbarClasses = cn(
      'ToolBar-toolbar',
      !hasPreview && 'ToolBar-noPreview',
      errorState && 'ToolBar-withError'
    )

    const errorLabelClasses = cn(
      'ToolBar-errorLabel',
      selectableTile && 'ToolBar-selectableLabel',
      previewTile && 'ToolBar-previewLabel'
    )

    const handleCancelClick = () => {
      if (errorState) {
        errorState.onErrorClose?.()
      } else if (uploadState?.onUploadCancel) {
        uploadState.onUploadCancel()
      }
    }

    const handleToolbarClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
    }

    if (!isToolBarVisible) {
      return null
    }

    return (
      <div
        className={toolbarClasses}
        onClick={handleToolbarClick}
        ref={ref}
        {...getDataAndAccessibilityProps(props)}
        data-testid="toolbar"
      >
        {errorState || uploadState?.onUploadCancel ? (
          <>
            <OptionalTooltip
              text={errorState ? errorState.errorMessage : ''}
              placement={errorState?.tooltipPlacement}
              customRenderText={(textRef) => (
                <div ref={textRef as React.RefObject<HTMLDivElement>} className={errorLabelClasses}>
                  {errorState?.errorMessage}
                </div>
              )}
            />
            {!disabled && (errorState?.onErrorClose || uploadState?.onUploadCancel) && (
              <Button
                size={ButtonSize.S}
                color={ButtonColor.Quinary}
                icon="xp-modal-close"
                type="button"
                onClick={handleCancelClick}
                aria-label="Close"
              />
            )}
          </>
        ) : (
          <>
            <Row>
              <Column>{dragElement}</Column>
            </Row>
            <Row wrap={RowWrap.NoWrap} spacing={Spacing.S}>
              {actions?.map((action, index) => (
                <Column key={index}>
                  <Button size={ButtonSize.S} color={ButtonColor.Quinary} {...action} />
                </Column>
              ))}
            </Row>
          </>
        )}
      </div>
    )
  }
)

ToolBar.displayName = 'ToolBar'
