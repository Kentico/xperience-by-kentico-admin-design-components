import * as React from 'react';
import { forwardRef, useCallback, type KeyboardEvent, type MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { useHover } from '@react-aria/interactions'
import { useFocusRing } from '@react-aria/focus'
import { cn } from '@/lib/cn'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { Tooltip } from '../Tooltip'
import { ToolBar } from './ToolBar'
import { ImagePreview } from './ImagePreview'
import { InfoBar } from './InfoBar'
import { BaseTileType } from './BaseTile.types'
import type { BaseTileProps } from './BaseTile.types'
import './BaseTile.css'

/**
 * BaseTile component for displaying selectable, preview, or skeleton tile states.
 * Composes ToolBar, ImagePreview, and InfoBar sub-components.
 */
export const BaseTile = forwardRef<HTMLDivElement, BaseTileProps>(
  (
    {
      type,
      name,
      size,
      dimensions,
      errorState,
      url,
      uploadState,
      onChange = () => {},
      onClick,
      href,
      actions,
      isCheckboxVisible = true,
      selectOnClick = true,
      isSelected,
      isDragging,
      disabled,
      contentType,
      previewIcon,
      previewIconSize,
      nameLeadingNode,
      inactiveMessage,
      dragElement,
      isMissingPermission,
      ...props
    },
    ref
  ) => {
    const { isFocusVisible, focusProps } = useFocusRing()
    const baseTileHover = useHover({})

    const baseTypeClasses = cn(
      type === BaseTileType.Preview && 'BaseTile-preview',
      type === BaseTileType.Selectable && 'BaseTile-selectable',
      type === BaseTileType.Skeleton && 'BaseTile-skeleton'
    )

    const baseTileClasses = cn(
      'BaseTile',
      baseTypeClasses,
      errorState && 'BaseTile-errorTile',
      isFocusVisible && 'BaseTile-focused',
      disabled && 'BaseTile-disabled',
      isDragging && 'BaseTile-dragged',
      type === BaseTileType.Preview && !onClick && 'BaseTile-unclickable'
    )

    const isTilePreview = (previewUrl: string | undefined): boolean => !!previewUrl

    const handleCheckboxChange = useCallback(() => {
      if (!errorState && !uploadState && type !== BaseTileType.Skeleton && !disabled) {
        if (isCheckboxVisible) {
          const newSelected = !isSelected
          onChange(newSelected)
        }
      }
    }, [disabled, errorState, isCheckboxVisible, isSelected, onChange, type, uploadState])

    const handleTileClick = useCallback(() => {
      if (!errorState && !uploadState && type !== BaseTileType.Skeleton && !disabled) {
        if (selectOnClick && isCheckboxVisible) {
          const newSelected = !isSelected
          onChange(newSelected)
        }

        onClick?.()
      }
    }, [disabled, errorState, isCheckboxVisible, isSelected, onChange, onClick, selectOnClick, type, uploadState])

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement | HTMLAnchorElement>) => {
        if (e.code === 'Space') {
          e.preventDefault()
          e.stopPropagation()
          handleTileClick()
        }
      },
      [handleTileClick]
    )

    const handleNavLinkClickCapture = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
      // Prevent navigation if click was on interactive elements (buttons, checkboxes, etc.)
      // Using capture phase to intercept before child stopPropagation
      const target = e.target as HTMLElement
      const clickedButton = target.closest('button')
      const clickedInput = target.closest('input[type="checkbox"]')
      const clickedCheckbox = target.closest('[data-testid="checkbox"]')

      if (clickedButton || clickedInput || clickedCheckbox) {
        e.preventDefault()
      }
    }, [])

    const tileContent = (
      <>
        <ToolBar
          type={type}
          errorState={errorState}
          uploadState={uploadState}
          actions={actions}
          hasPreview={isTilePreview(url)}
          disabled={disabled}
          dragElement={dragElement}
        />
        <ImagePreview
          url={url}
          type={type}
          errorState={errorState}
          uploadState={uploadState}
          hasPreview={isTilePreview(url)}
          previewIcon={previewIcon}
          previewIconSize={previewIconSize}
          isMissingPermission={isMissingPermission}
        />
        <InfoBar
          type={type}
          name={name}
          size={size}
          dimensions={dimensions}
          onCheckboxChange={handleCheckboxChange}
          disabled={disabled}
          isCheckboxVisible={isCheckboxVisible}
          isSelected={isSelected}
          errorState={errorState}
          uploadState={uploadState}
          isHighlighted={baseTileHover.isHovered}
          contentType={contentType}
          nameLeadingNode={nameLeadingNode}
          isMissingPermission={isMissingPermission}
        />
      </>
    )

    return (
      <Tooltip tooltipText={disabled && inactiveMessage ? inactiveMessage : ''}>
        {href ? (
          <NavLink
            to={href}
            className={baseTileClasses}
            onClickCapture={handleNavLinkClickCapture}
          >
            {tileContent}
          </NavLink>
        ) : (
          <div
            ref={ref}
            className={baseTileClasses}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onClick={handleTileClick}
            {...getDataAndAccessibilityProps(props)}
            {...baseTileHover.hoverProps}
            {...focusProps}
          >
            {tileContent}
          </div>
        )}
      </Tooltip>
    )
  }
)

BaseTile.displayName = 'BaseTile'
