import * as React from 'react';
import { useCallback } from 'react'
import { cn } from '@/lib/cn'
import { Pagination as PaginationBase } from '@/components/Pagination'
import type { PaginationWrapperProps } from './TableComponent.types'
import './TableComponent.css'

/**
 * Pagination sub-component for the TableComponent.
 *
 * Wraps the core Pagination component and connects it to the TableManager
 * for automatic page navigation and state management.
 *
 * Only renders when there are multiple pages (totalPages > 1).
 *
 * @example
 * ```tsx
 * <TablePagination
 *   tableManager={tableManager}
 *   onPageChange={() => console.log('Page changed')}
 * />
 * ```
 */
export const TablePagination = ({
  tableManager,
  onPageChange,
  className,
}: PaginationWrapperProps) => {
  // Calculate total pages
  const totalPages =
    tableManager.parameters.pageSize > 0
      ? Math.ceil(tableManager.totalRowCount / tableManager.parameters.pageSize)
      : 0

  const handlePageChange = useCallback(
    (page: number) => {
      void tableManager.reloadData({ currentPage: page })
      onPageChange?.()
    },
    [tableManager, onPageChange]
  )

  // Only render if there are multiple pages
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className={cn('TableComponent-pagination', className)}>
      <PaginationBase
        selectedPage={tableManager.parameters.currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

TablePagination.displayName = 'TablePagination'
