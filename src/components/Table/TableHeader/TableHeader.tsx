import * as React from 'react';
import { forwardRef, useState, type ForwardedRef, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'
import { useTableContext } from '../context/TableContext'
import { ScrollState, SortType, type SortModel } from '../Table.types'
import { Checkbox } from '@/components/Checkbox'
import { HeaderSelection, type TableHeaderProps } from './TableHeader.types'
import { TableHeaderButton } from './TableHeaderButton'
import './TableHeader.css'

/**
 * TableHeader - Renders the table header row with column headers,
 * optional select-all checkbox, and sorting functionality.
 */
const TableHeader = forwardRef(
  (
    {
      style,
      className,
      selectable,
      columns,
      selection,
      selectLabel,
      sortModel: initialSortModel,
      onSortChange,
      onSelectAll,
    }: TableHeaderProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { scrollState } = useTableContext()

    const defaultSortModel: SortModel = { sortBy: '', sortType: SortType.Asc }
    const [sortModel, setSortModel] = useState<SortModel>(initialSortModel ?? defaultSortModel)

    const headerClicked = (sortColumn: string) => {
      const newSortModel: SortModel = {
        sortBy: sortColumn,
        sortType: sortModel.sortType === SortType.Asc ? SortType.Desc : SortType.Asc,
      }

      setSortModel(newSortModel)
      onSortChange?.(newSortModel)
    }

    const onHeaderKeyPress = (event: KeyboardEvent<HTMLDivElement>, sortColumn: string) => {
      if (event.key === 'Enter') {
        headerClicked(sortColumn)
      }
    }

    const headerClasses = cn(className, 'TableHeader-tableHeaderContainer')

    const selectColumnClasses = cn(
      'TableHeader-tableHeaderColSelect',
      (scrollState === ScrollState.Scroll || scrollState === ScrollState.End) && 'TableHeader-shadowVisible'
    )

    return (
      <div className={headerClasses} role="row" ref={ref} style={style}>
        {selectable && (
          <div className={selectColumnClasses} role="columnheader">
            <div className={'TableHeader-checkbox'}>
              {onSelectAll ? (
                <Checkbox
                  name="table-select-all"
                  checked={selection === HeaderSelection.All}
                  indetermined={selection === HeaderSelection.Some}
                  inactiveMessage={selectLabel}
                  onChange={(_, checked) => onSelectAll(checked)}
                />
              ) : (
                <div className={'TableHeader-empty'} />
              )}
            </div>
          </div>
        )}
        {columns.map((column, index) => (
          <TableHeaderButton
            key={index}
            column={column}
            onClick={() => headerClicked(column.name)}
            onKeyPress={(e) => onHeaderKeyPress(e, column.name)}
            sortDirection={column.name === sortModel.sortBy ? sortModel.sortType : undefined}
          />
        ))}
      </div>
    )
  }
)

TableHeader.displayName = 'TableHeader'

export { TableHeader }
