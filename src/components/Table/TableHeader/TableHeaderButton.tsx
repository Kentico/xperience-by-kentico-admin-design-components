import * as React from 'react';
import { useFocusRing } from '@react-aria/focus'
import { cn } from '@/lib/cn'
import { useTableContext } from '../context/TableContext'
import { ColumnContentType, ScrollState, SortType } from '../Table.types'
import { Tooltip, TooltipPlacement } from '@/components/Tooltip'
import { Icon } from '@/components/Icon'
import type { TableHeaderButtonProps } from './TableHeaderButton.types'
import './TableHeaderButton.css'

/**
 * TableHeaderButton - renders a single column header cell.
 * Supports sorting, tooltips, and scroll shadows for sticky columns.
 */
export const TableHeaderButton = ({
  column,
  onClick,
  onKeyPress,
  sortDirection,
}: TableHeaderButtonProps) => {
  const { scrollState } = useTableContext()

  const isSortable = column.sortable

  const { isFocusVisible, focusProps } = useFocusRing()

  const isActionHeader = column.contentType === ColumnContentType.Action

  const displayShadow = scrollState === ScrollState.Start || scrollState === ScrollState.Scroll

  const getSortIcon = () => {
    switch (sortDirection) {
      case SortType.Asc:
        return <Icon name="xp-caret-up" size="xs" />
      case SortType.Desc:
        return <Icon name="xp-caret-down" size="xs" />
      default:
        return undefined
    }
  }

  return (
    <div
      role="columnheader"
      className={cn(
        'TableHeaderButton-tableHeaderCol',
        isSortable && 'TableHeaderButton-sortable',
        sortDirection && 'TableHeaderButton-sorted',
        isFocusVisible && 'TableHeaderButton-focused',
        isActionHeader && 'TableHeaderButton-tableHeaderActionCol',
        isActionHeader && displayShadow && 'TableHeaderButton-shadowVisible'
      )}
      onClick={isSortable ? onClick : undefined}
      onKeyDown={isSortable ? onKeyPress : undefined}
      tabIndex={isSortable ? 0 : undefined}
      {...focusProps}
    >
      <div className={'TableHeaderButton-text'} title={column.caption || column.name}>
        {column.caption || column.name}
      </div>
      {column.tooltip ? (
        <Tooltip
          tooltipText={column.tooltip}
          placement={TooltipPlacement.Top}
          tooltipTextAsHtml={column.tooltipAsHtml}
        >
          <div className={'TableHeaderButton-tooltip'}>
            <Icon name="xp-i-circle" />
          </div>
        </Tooltip>
      ) : null}
      {column.sortable && sortDirection ? (
        <div className={'TableHeaderButton-sortIcon'}>{getSortIcon()}</div>
      ) : null}
    </div>
  )
}

TableHeaderButton.displayName = 'TableHeaderButton'
