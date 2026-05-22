import * as React from 'react';
import { forwardRef, useRef, useImperativeHandle, type ForwardedRef } from 'react'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { Button, ButtonColor } from '@/components/Button'
import { Icon } from '@/components/Icon'
import type { PaginationProps } from './Pagination.types'
import { useVariablePageButtons } from './useVariablePageButtons'
import './Pagination.css'

/**
 * `Pagination` provides page navigation with page numbers and prev/next buttons.
 * Automatically adjusts the number of visible page buttons based on container width.
 */
export const Pagination = forwardRef(
  (
    { selectedPage, totalPages, onPageChange, ...props }: PaginationProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    // Ensure selectedPage doesn't exceed totalPages
    const currentPage = selectedPage > totalPages ? totalPages : selectedPage

    const paginationContainer = useRef<HTMLDivElement>(null)
    const [addRefToVisibleItems, pageButtons] = useVariablePageButtons(
      currentPage,
      totalPages,
      paginationContainer
    )

    useImperativeHandle(ref, () => paginationContainer.current as HTMLDivElement)

    return (
      <div
        ref={paginationContainer}
        className={'Pagination-container'}
        {...getDataAndAccessibilityProps(props)}
      >
        <div className={'Pagination-pagePrevious'} ref={addRefToVisibleItems(-1)}>
          <Button
            color={ButtonColor.Quinary}
            icon={<Icon name="xp-chevron-left" size="s" />}
            disabled={currentPage === 1}
            onClick={() => onPageChange?.(currentPage - 1)}
          />
        </div>
        {pageButtons.map(({ label, number, disabled }, index) => (
          <div
            key={index}
            ref={addRefToVisibleItems(index)}
            className={'Pagination-pageButton'}
          >
            <Button
              color={ButtonColor.Quinary}
              disabled={disabled}
              onClick={() => onPageChange?.(number)}
              active={number === currentPage}
            >
              {label}
            </Button>
          </div>
        ))}
        <div className={'Pagination-pageNext'} ref={addRefToVisibleItems(-2)}>
          <Button
            color={ButtonColor.Quinary}
            icon={<Icon name="xp-chevron-right" size="s" />}
            disabled={currentPage === totalPages}
            onClick={() => onPageChange?.(currentPage + 1)}
          />
        </div>
      </div>
    )
  }
)

Pagination.displayName = 'Pagination'
