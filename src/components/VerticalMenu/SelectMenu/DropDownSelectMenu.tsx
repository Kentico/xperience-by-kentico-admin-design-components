import * as React from 'react';
import { forwardRef, useCallback, type ForwardedRef } from 'react'
import { DropDownOnClick, DropDownPlacement } from '@/components/DropDown'
import { SelectMenu } from './SelectMenu'
import type { DropDownSelectMenuProps } from './DropDownSelectMenu.types'

/**
 * DropDownSelectMenu combines a dropdown trigger with a SelectMenu.
 * It provides a convenient way to create dropdown selection menus with
 * consistent styling and behavior.
 *
 * Can be used in two modes:
 * 1. Controlled: Pass isOpen, onOpenChange/onClose, and triggerRef
 * 2. Uncontrolled: Pass renderTrigger function
 *
 * @example
 * ```tsx
 * // Uncontrolled mode with renderTrigger
 * <DropDownSelectMenu
 *   renderTrigger={(ref, toggle) => (
 *     <Button ref={ref} onClick={toggle}>Choose Option</Button>
 *   )}
 * >
 *   <MenuItem primaryLabel="Option A" onClick={() => handleSelect('a')} selected={value === 'a'} />
 *   <MenuItem primaryLabel="Option B" onClick={() => handleSelect('b')} selected={value === 'b'} />
 * </DropDownSelectMenu>
 *
 * // Controlled mode
 * <DropDownSelectMenu
 *   isOpen={isMenuOpen}
 *   onOpenChange={setIsMenuOpen}
 *   triggerRef={buttonRef}
 * >
 *   <MenuItem primaryLabel="Option 1" onClick={() => handleSelect('1')} />
 * </DropDownSelectMenu>
 * ```
 */
export const DropDownSelectMenu = forwardRef<
  HTMLDivElement,
  DropDownSelectMenuProps
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
      // SelectMenu props
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
    // Handle content click - close the dropdown after selection
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
        closeOnContentClick={false} // We handle this ourselves via SelectMenu
        closeOnEscape={closeOnEscape}
        closeOnOutsideClick={closeOnOutsideClick}
        testId={testId}
        usePortal={true}
      >
        <SelectMenu
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
        </SelectMenu>
      </DropDownOnClick>
    )
  }
)

DropDownSelectMenu.displayName = 'DropDownSelectMenu'
