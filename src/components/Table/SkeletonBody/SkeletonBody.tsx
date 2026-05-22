import * as React from 'react';
import { useMemo } from 'react'
import { TableRow } from '../TableRow'
import { CellType, ColumnContentType } from '../Table.types'
import type { ComponentCell, TableCell } from '../Table.types'
import type { SkeletonBodyProps } from './SkeletonBody.types'
import './SkeletonBody.css'

/**
 * TextSkeleton renders a skeleton placeholder for text content.
 */
const TextSkeleton = () => (
  <div className={'SkeletonBody-skeletons'}>
    <span className={'SkeletonBody-text'} />
  </div>
)

/**
 * ActionSkeleton renders skeleton placeholder circles for action buttons.
 */
const ActionSkeleton = () => (
  <div className={'SkeletonBody-skeletons'}>
    <span className={'SkeletonBody-circle'} />
    <span className={'SkeletonBody-circle'} />
    <span className={'SkeletonBody-circle'} />
  </div>
)

/**
 * ComponentSkeleton renders a skeleton placeholder for component content.
 */
const ComponentSkeleton = () => (
  <div className={'SkeletonBody-skeletons'}>
    <span className={'SkeletonBody-component'} />
  </div>
)

/**
 * SkeletonBody displays animated loading placeholders while table data is loading.
 *
 * It renders a specified number of skeleton rows with appropriate skeleton cells
 * based on each column's content type (text, action, or component).
 */
export const SkeletonBody = ({
  rowCount,
  columns,
  selectable,
}: SkeletonBodyProps) => {
  const skeletonCells = useMemo<TableCell[]>(
    () =>
      columns.map((col): ComponentCell => {
        const skeletonElement =
          col.contentType === ColumnContentType.Text ? (
            <TextSkeleton />
          ) : col.contentType === ColumnContentType.Action ? (
            <ActionSkeleton />
          ) : (
            <ComponentSkeleton />
          )

        return {
          type: CellType.Component,
          component: skeletonElement,
        }
      }),
    [columns]
  )

  const rows = Array.from({ length: rowCount }, (_, i) => (
    <TableRow
      gridLayout
      selectable={selectable}
      columns={columns}
      disabled
      cells={skeletonCells}
      skeleton
      key={i}
    />
  ))

  return <div className={'SkeletonBody-bodyWrapper'}>{rows}</div>
}

SkeletonBody.displayName = 'SkeletonBody'
