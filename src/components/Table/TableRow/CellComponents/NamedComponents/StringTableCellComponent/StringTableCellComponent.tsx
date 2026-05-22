import * as React from 'react';
import { StringCell } from '../../StringCell'

export interface StringTableCellComponentProps {
  readonly value: string
  readonly tooltipText?: string
}

/**
 * StringTableCellComponent renders a plain text string within a table cell.
 * Wraps StringCell for use as a named component.
 */
export const StringTableCellComponent = ({ value, tooltipText }: StringTableCellComponentProps) => (
  <StringCell value={value} tooltipText={tooltipText} />
)

StringTableCellComponent.displayName = 'StringTableCellComponent'
