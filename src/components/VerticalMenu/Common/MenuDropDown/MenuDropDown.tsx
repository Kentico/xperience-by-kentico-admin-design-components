import * as React from 'react';
import { forwardRef, useCallback, type ForwardedRef } from 'react'
import { DropDownOnClick, DropDownPlacement } from '@/components/DropDown'
import { VerticalMenu } from '../VerticalMenu'
import type { MenuDropDownProps } from './MenuDropDown.types'

/**
 * MenuDropDown combines a dropdown trigger with a VerticalMenu container.
 * It provides a convenient way to create dropdown menus with consistent styling
 * and behavior.
 *
 * Can be used in two modes:
 * 1. Controlled: Pass isOpen, onOpenChange/onClose, and triggerRef
 * 2. Uncontrolled: Pass renderTrigger function
 *
 * @example
 * ```tsx
 * // Uncontrolled mode with renderTrigger
 * <MenuDropDown
 *   renderTrigger={(ref, toggle) => (
 *     <Button ref={ref} onClick={toggle} label="Open Menu" />
 *   )}
 * >
 *   <MenuItem primaryLabel="Option 1" onClick={() => {}} />
 *   <MenuItem primaryLabel="Option 2" onClick={() => {}} />
 * </MenuDropDown>
 *
 * // Controlled mode
 * <MenuDropDown
 *   isOpen={isMenuOpen}
 *   onOpenChange={setIsMenuOpen}
 *   triggerRef={buttonRef}
 * >
 *   <MenuItem primaryLabel="Option 1" onClick={() => {}} />
 * </MenuDropDown>
 * ```
 */
export const MenuDropDown = forwardRef<HTMLDivElement, MenuDropDownProps>(
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
      // VerticalMenu props
      menuSize,
      minWidth,
      maxWidth,
      maxHeight,
      bordered = false,
      elevated = true,
      header,
      footer,
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
        closeOnContentClick={false} // We handle this ourselves via VerticalMenu
        closeOnEscape={closeOnEscape}
        closeOnOutsideClick={closeOnOutsideClick}
        testId={testId}
        usePortal={true}
      >
        <VerticalMenu
          ref={ref}
          size={menuSize}
          minWidth={minWidth}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          bordered={bordered}
          elevated={elevated}
          header={header}
          footer={footer}
          onClick={closeOnContentClick ? handleContentClick : undefined}
        >
          {children}
        </VerticalMenu>
      </DropDownOnClick>
    )
  }
)

MenuDropDown.displayName = 'MenuDropDown'
