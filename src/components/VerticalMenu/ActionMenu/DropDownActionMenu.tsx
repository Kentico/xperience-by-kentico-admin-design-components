import * as React from 'react';
import { forwardRef, useCallback, type ForwardedRef } from 'react'
import { DropDownOnClick, DropDownPlacement } from '@/components/DropDown'
import { ActionMenu } from './ActionMenu'
import type { DropDownActionMenuProps } from './DropDownActionMenu.types'

/**
 * DropDownActionMenu combines a dropdown trigger with an ActionMenu.
 * It provides a convenient way to create dropdown action menus with
 * consistent styling and behavior.
 *
 * Can be used in two modes:
 * 1. Controlled: Pass isOpen, onOpenChange/onClose, and triggerRef
 * 2. Uncontrolled: Pass renderTrigger function
 *
 * @example
 * ```tsx
 * // Uncontrolled mode with renderTrigger
 * <DropDownActionMenu
 *   renderTrigger={(ref, toggle) => (
 *     <Button ref={ref} onClick={toggle} label="Actions" />
 *   )}
 * >
 *   <MenuItem primaryLabel="Edit" onClick={() => {}} />
 *   <MenuItem primaryLabel="Delete" onClick={() => {}} destructive />
 * </DropDownActionMenu>
 *
 * // Controlled mode
 * <DropDownActionMenu
 *   isOpen={isMenuOpen}
 *   onOpenChange={setIsMenuOpen}
 *   triggerRef={buttonRef}
 * >
 *   <MenuItem primaryLabel="Option 1" onClick={() => {}} />
 * </DropDownActionMenu>
 * ```
 */
export const DropDownActionMenu = forwardRef<
  HTMLDivElement,
  DropDownActionMenuProps
>(
  (
    {
      children,
      placement = DropDownPlacement.BottomStart,
      isOpen,
      onOpen,
      onClose,
      onOpenChange,
      triggerRef,
      renderTrigger,
      disabled = false,
      className,
      contentClassName,
      testId,
      closeOnContentClick = true,
      closeOnEscape = true,
      closeOnOutsideClick = true,
      // ActionMenu props
      menuSize,
      minWidth,
      maxWidth,
      maxHeight,
      bordered = false,
      elevated = true,
      offset = 4,
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    // Handle content click - close the dropdown after menu item interaction
    const handleContentClick = useCallback(() => {
      if (closeOnContentClick) {
        onClose?.()
        onOpenChange?.(false)
      }
    }, [closeOnContentClick, onClose, onOpenChange])

    return (
      <DropDownOnClick
        placement={placement}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        triggerRef={triggerRef}
        renderTrigger={renderTrigger}
        disabled={disabled}
        className={className}
        contentClassName={contentClassName}
        offset={offset}
        closeOnContentClick={false} // We handle this ourselves via ActionMenu
        closeOnEscape={closeOnEscape}
        closeOnOutsideClick={closeOnOutsideClick}
        testId={testId}
        usePortal={true}
      >
        <ActionMenu
          ref={ref}
          size={menuSize}
          minWidth={minWidth}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          bordered={bordered}
          elevated={elevated}
          onClick={closeOnContentClick ? handleContentClick : undefined}
        >
          {children}
        </ActionMenu>
      </DropDownOnClick>
    )
  }
)

DropDownActionMenu.displayName = 'DropDownActionMenu'
