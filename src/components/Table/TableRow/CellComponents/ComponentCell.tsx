import * as React from 'react';
import type { ComponentCellProps } from './CellComponent.types'

/**
 * ComponentCell renders a React component within a table cell.
 * The component is passed as a ReactNode and rendered directly.
 */
export const ComponentCell = ({ component }: ComponentCellProps) => {
  return <>{component}</>
}

ComponentCell.displayName = 'ComponentCell'
