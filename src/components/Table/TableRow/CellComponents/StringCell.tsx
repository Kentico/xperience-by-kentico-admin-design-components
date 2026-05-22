import * as React from 'react';
import type { StringCellProps } from './CellComponent.types'
import './StringCell.css'

/**
 * StringCell renders a plain text cell with ellipsis truncation.
 * The full value is shown in a native title tooltip.
 */
export const StringCell = ({ value, tooltipText }: StringCellProps) => (
  <div className={'StringCell'} title={tooltipText ?? value}>
    {value}
  </div>
)

StringCell.displayName = 'StringCell'
