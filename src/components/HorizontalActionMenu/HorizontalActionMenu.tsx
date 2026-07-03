import * as React from 'react';
import { forwardRef, useMemo, useRef, type RefObject } from 'react'
import { cn } from '@/lib/cn'
import { useSliceOverflowingItems } from '@/hooks/useSliceOverflowingItems'
import { Button, ButtonColor, ButtonSize } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { DropDownActionMenu } from '@/components/DropDownActionMenu'
import { MenuItem } from '@/components/MenuItem'
import { ActionMenuDivider } from '@/components/ActionMenuDivider'
import { DividerOrientation } from '@/components/Divider'
import { SimpleStatusDefault } from '@/components/SimpleStatus'
import type {
  HorizontalActionMenuProps,
  HorizontalActionMenuItem,
} from './HorizontalActionMenu.types'
import './HorizontalActionMenu.css'

/**
 * A horizontal action menu component with overflow handling.
 * Actions are provided as data items and rendered as Buttons internally.
 * Items that don't fit are moved to a "more" dropdown menu.
 */
export const HorizontalActionMenu = forwardRef<HTMLDivElement, HorizontalActionMenuProps>(
  (
    {
      actionItems,
      label,
      areActionsVisible,
      moreActionsButtonLabel,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)

    // Wrap items for the overflow hook — memoized to maintain stable object
    // references and prevent infinite re-render loops in useSliceOverflowingItems
    const wrappedItems = useMemo(
      () => actionItems.map((item) => ({ id: item.identifier })),
      [actionItems]
    )

    const { attachVisibleItemRef, visibleItems, hiddenItems } =
      useSliceOverflowingItems(wrappedItems, containerRef as RefObject<HTMLElement | null>, 'End')

    const hasHiddenItems = hiddenItems.length > 0

    // Map visible/hidden indices back to action items
    const visibleActions = visibleItems.map((wrapped) =>
      actionItems.find((a) => a.identifier === wrapped.id)!
    )
    const hiddenActions = hiddenItems.map((wrapped) =>
      actionItems.find((a) => a.identifier === wrapped.id)!
    )

    const renderActionButton = (action: HorizontalActionMenuItem) => (
      <Button
        key={action.identifier}
        label={action.label}
        color={action.destructive ? ButtonColor.Alert : ButtonColor.Tertiary}
        size={ButtonSize.S}
        icon={action.icon ? <Icon name={action.icon} /> : undefined}
        disabled={action.disabled}
        onClick={action.onClick}
        title={action.title}
      />
    )

    return (
      <div
        ref={ref}
        className={cn(
          'HorizontalActionMenu-container',
          areActionsVisible ? 'HorizontalActionMenu-expanded' : 'HorizontalActionMenu-nonExpanded',
        )}
      >
        {areActionsVisible && (
          <>
            <div
              ref={containerRef}
              className={'HorizontalActionMenu-actions'}
            >
              {visibleActions.map((action, index) => (
                <div
                  key={action.identifier}
                  ref={attachVisibleItemRef(index)}
                >
                  {renderActionButton(action)}
                </div>
              ))}
            </div>

            {/* More button with dropdown for hidden items */}
            {hasHiddenItems && (
              <DropDownActionMenu
                renderTrigger={(triggerRef, onTriggerClick) => (
                  <Button
                    ref={triggerRef as React.RefObject<HTMLButtonElement>}
                    color={ButtonColor.Tertiary}
                    size={ButtonSize.S}
                    icon={<Icon name="xp-ellipsis" />}
                    onClick={onTriggerClick}
                    aria-label={moreActionsButtonLabel}
                  />
                )}
              >
                {hiddenActions.map((action) => (
                  <MenuItem
                    key={action.identifier}
                    primaryLabel={action.label}
                    leadingElement={
                      action.icon
                        ? { type: 'icon' as const, element: <Icon name={action.icon} /> }
                        : undefined
                    }
                    onClick={action.onClick}
                    disabled={action.disabled}
                  />
                ))}
              </DropDownActionMenu>
            )}

            {/* Divider between actions and label */}
            {label !== null && (
              <div className={'HorizontalActionMenu-dividerContainer'}>
                <ActionMenuDivider orientation={DividerOrientation.Vertical} />
              </div>
            )}
          </>
        )}

        {/* Label */}
        {label !== null && (
          <SimpleStatusDefault
            content={{ label }}
            size="S"
          />
        )}
      </div>
    )
  }
)

HorizontalActionMenu.displayName = 'HorizontalActionMenu'
