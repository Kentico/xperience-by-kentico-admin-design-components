import * as React from 'react';
import { useCallback, useRef, type ReactElement, type ChangeEvent, type MouseEvent } from 'react'
import classNames from 'classnames'
import { useFocusRing } from '@react-aria/focus'
import { NavLink } from 'react-router-dom'
import { Checkbox } from '@/components/Checkbox'
import { Tooltip, TooltipPlacement } from '@/components/Tooltip'
import { useTableContext } from '../context/TableContext'
import { CellType, ScrollState } from '../Table.types'
import type {
  ActionCellProps,
  ComponentCellProps,
  NamedComponentCellProps,
  StringCellProps,
} from './CellComponents/CellComponent.types'
import { NamedComponentCell } from './CellComponents/NamedComponentCell'
import { ComponentCell as ComponentCellComponent } from './CellComponents/ComponentCell'
import { ActionCell as ActionCellComponent } from './CellComponents/ActionCell'
import { StringCell as StringCellComponent } from './CellComponents/StringCell'
import type { TableRowProps } from './TableRow.types'
import './TableRow.css'

/**
 * TableRow renders a single row within a Table component.
 *
 * It handles:
 * - Row selection with checkbox (supports shift-click for range selection)
 * - Row click/navigation handlers
 * - Disabled/skeleton/invalid states
 * - Scroll shadow indicators for sticky cells
 * - Grid or flex layout modes
 * - Proper cell rendering based on cell type
 */
export const TableRow = ({
  cells,
  columns,
  disabled,
  selectable,
  selected,
  level = 0,
  skeleton,
  selectLabel,
  maxVisibleRowActions,
  inactiveMessage,
  onRowSelect,
  onRowClick,
  href,
  isInvalid,
  dragElement,
  gridLayout,
}: TableRowProps) => {
  const { scrollState } = useTableContext()
  const { isFocusVisible, focusProps } = useFocusRing()

  const gridUnit = 8 // Matches --grid-unit token

  const rowClasses = classNames(
    'TableRow',
    gridLayout ? 'TableRow-grid' : 'TableRow-flex',
    disabled && 'TableRow-disabled',
    selected && 'TableRow-selected',
    skeleton && 'TableRow-skeleton',
    isInvalid && 'TableRow-invalid',
    !disabled && (onRowClick || href) && 'TableRow-clickable',
    isFocusVisible && 'TableRow-focused',
    scrollState !== ScrollState.NoScroll && 'TableRow-scrollable'
  )

  const getCellClasses = useCallback(
    (cellType: CellType, cellIndex: number) => {
      const isActionCell = cellType === CellType.Action
      const displayShadow =
        scrollState === ScrollState.Start || scrollState === ScrollState.Scroll

      return classNames(
        'TableRow-tableRowCell',
        level > 0 && cellIndex === 0 && 'TableRow-tableRowExpandableCell',
        isActionCell && 'TableRow-tableRowActionCell',
        isActionCell && displayShadow && 'TableRow-shadowVisible'
      )
    },
    [scrollState, level]
  )

  const checkboxClasses = classNames(
    'TableRow-tableRowCell',
    'TableRow-tableRowSelect',
    (scrollState === ScrollState.Scroll || scrollState === ScrollState.End) &&
      'TableRow-shadowVisible'
  )

  // Track shift key state for range selection
  const shiftKeyRef = useRef<boolean>(false)

  const captureShiftKey = useCallback((e: MouseEvent) => {
    shiftKeyRef.current = e.shiftKey
  }, [])

  const onCheckboxWrapperClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onRowSelect?.(!selected, shiftKeyRef.current)
      shiftKeyRef.current = false
    },
    [onRowSelect, selected]
  )

  const onCheckboxChange = useCallback(
    (_e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const wasShiftClick = shiftKeyRef.current
      shiftKeyRef.current = false
      onRowSelect?.(checked, wasShiftClick)
    },
    [onRowSelect]
  )

  const handleRowClick = useCallback(() => {
    if (!disabled && onRowClick) {
      onRowClick()
    }
  }, [disabled, onRowClick])

  const renderRowContent = () => {
    const contentCells: ReactElement[] = []
    const actionCells: ReactElement[] = []

    // Separate content cells from action cells
    cells.forEach((cell, index) => {
      const column = columns[index]
      // Action cells don't require a column definition
      if (!column && cell.type !== CellType.Action) return

      // Action cells don't use column width constraints — they fill their grid column
      const cellStyle = column && cell.type !== CellType.Action
        ? {
            minWidth: (column.minWidth ?? 0) * gridUnit + 'px',
            maxWidth: (column.maxWidth ?? 0) * gridUnit + 'px',
          }
        : {}

      const cellElement = (
        <div
          role="cell"
          className={getCellClasses(cell.type, index)}
          style={cellStyle}
          key={index}
        >
          {/* Render indentation for expandable rows */}
          {level > 0 &&
            index === 0 &&
            Array.from({ length: level }, (_, i) => (
              <span key={i} className={'TableRow-tableRowIndent'} />
            ))}

          {/* Render cell content based on type */}
          {cell.type === CellType.NamedComponent && (
            <NamedComponentCell {...(cell as unknown as NamedComponentCellProps)} />
          )}
          {cell.type === CellType.Component && (
            <ComponentCellComponent {...(cell as unknown as ComponentCellProps)} />
          )}
          {cell.type === CellType.Action && (
            <ActionCellComponent
              {...(cell as unknown as ActionCellProps)}
              maxVisibleRowActions={maxVisibleRowActions}
            />
          )}
          {cell.type === CellType.String && (
            <StringCellComponent {...(cell as unknown as StringCellProps)} />
          )}
        </div>
      )

      if (cell.type === CellType.Action) {
        actionCells.push(cellElement)
      } else {
        contentCells.push(cellElement)
      }
    })

    return (
      <>
        {/* Drag handle element (if provided) */}
        {dragElement}

        {/* Selection checkbox */}
        {selectable ? (
          <button
            className={checkboxClasses}
            onMouseDown={!disabled ? captureShiftKey : undefined}
            onClick={!disabled ? onCheckboxWrapperClick : undefined}
            disabled={disabled}
            type="button"
          >
            {/* Capture shift key on mouse down (fires before click) */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <span onMouseDown={captureShiftKey}>
              <Checkbox
                checked={selected}
                inactiveMessage={selectLabel}
                disabled={disabled}
                onChange={onCheckboxChange}
                invalid={isInvalid || false}
                name="tableRowSelect"
              />
            </span>
          </button>
        ) : null}

        {/* Navigable content area */}
        {href ? (
          <NavLink to={href} className={'TableRow-tableRowNavigableArea'}>
            {contentCells}
          </NavLink>
        ) : onRowClick ? (
          <button
            className={'TableRow-tableRowNavigableArea'}
            onClick={!disabled ? handleRowClick : undefined}
            disabled={disabled}
            type="button"
          >
            {contentCells}
          </button>
        ) : (
          contentCells
        )}

        {/* Non-navigable action area */}
        {actionCells}
      </>
    )
  }

  return (
    <Tooltip
      tooltipText={disabled && inactiveMessage ? inactiveMessage : undefined}
      placement={TooltipPlacement.Bottom}
    >
      <div className={rowClasses} role="row" {...focusProps}>
        {renderRowContent()}
      </div>
    </Tooltip>
  )
}

TableRow.displayName = 'TableRow'
