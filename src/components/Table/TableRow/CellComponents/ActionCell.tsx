import * as React from 'react';
import { useCallback, type RefObject } from 'react'
import { Button, ButtonColor, ButtonSize } from '@/components/Button'
import { DropDownActionMenu } from '@/components/DropDownActionMenu'
import { DropDownPlacement } from '@/components/DropDownActionMenu/DropDownActionMenu.types'
import { MenuItem } from '@/components/MenuItem'
import { Icon } from '@/components/Icon'
import type { TableAction } from '../../Table.types'
import type { ActionCellProps } from './CellComponent.types'
import './ActionCell.css'

/**
 * ActionCell renders a row of action buttons within a table cell.
 * Actions beyond maxVisibleRowActions are available in an overflow menu.
 */
export const ActionCell = ({
  actions,
  maxVisibleRowActions,
  onInvokeAction,
}: ActionCellProps) => {
  const visibleActionsCount = maxVisibleRowActions ?? 3
  const visibleActions = actions.slice(0, visibleActionsCount)
  const menuActions = actions.slice(visibleActionsCount)

  const renderButton = useCallback(
    (action: TableAction, index: number) => {
      const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        void onInvokeAction?.(action)
      }

      return (
        <div className={'ActionCell-button'} key={action.identifier ?? index}>
          <Button
            icon={<Icon name={action.icon} size="s" />}
            title={action.title ?? action.label}
            color={ButtonColor.Quinary}
            disabled={action.disabled}
            destructive={action.destructive}
            size={ButtonSize.S}
            onClick={handleClick}
            aria-label={action.label}
          />
        </div>
      )
    },
    [onInvokeAction]
  )

  const handleMenuItemClick = useCallback(
    (action: TableAction) => (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation()
      void onInvokeAction?.(action)
    },
    [onInvokeAction]
  )

  const renderOverflowTrigger = useCallback(
    (ref: RefObject<HTMLElement>, onTriggerClick: () => void) => {
      const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        onTriggerClick()
      }

      return (
        <div className={'ActionCell-button'} ref={ref as RefObject<HTMLDivElement>}>
          <Button
            icon={<Icon name="xp-ellipsis" size="s" />}
            color={ButtonColor.Quinary}
            size={ButtonSize.S}
            onClick={handleClick}
            aria-label="More actions"
          />
        </div>
      )
    },
    []
  )

  return (
    <div className={'ActionCell'}>
      {visibleActions.map(renderButton)}
      {menuActions.length > 0 && (
        <DropDownActionMenu
          placement={DropDownPlacement.BottomEnd}
          renderTrigger={renderOverflowTrigger}
        >
          {menuActions.map((action, index) => (
            <MenuItem
              key={action.identifier ?? index}
              primaryLabel={action.label}
              icon={<Icon name={action.icon} />}
              destructive={action.destructive}
              disabled={action.disabled}
              onClick={handleMenuItemClick(action)}
            />
          ))}
        </DropDownActionMenu>
      )}
    </div>
  )
}

ActionCell.displayName = 'ActionCell'
