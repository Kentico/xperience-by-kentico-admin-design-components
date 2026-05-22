import * as React from 'react';
import { useCallback } from 'react'
import { Box } from '@/components/Box'
import { Button } from '@/components/Button'
import { ButtonColor, ButtonSize } from '@/components/Button/Button.types'
import { Headline, HeadlineSize } from '@/components/Headline'
import type { FooterProps, TableFooterTexts } from './TableComponent.types'
import './TableComponent.css'

/**
 * Helper to check if a value is "empty" (null, undefined, empty string, or empty array).
 */
const hasValue = (value: unknown): boolean =>
  value !== null &&
  value !== undefined &&
  value !== '' &&
  (!Array.isArray(value) || value.length !== 0)

/**
 * Default text labels for the Footer component.
 */
const defaultTexts: TableFooterTexts = {
  noDataTitle: 'No data available',
  noResultTitle: 'No results found',
  searchNoResultText: 'No results match your search.',
  clearSearchButtonLabel: 'Clear search',
  filterNoResultText: 'No results match your filter criteria.',
  clearFilterButtonLabel: 'Clear filters',
  searchAndFilterNoResultText:
    'No results match your search and filter criteria.',
  clearAllButtonLabel: 'Clear all',
}

/**
 * Footer sub-component for the TableComponent.
 *
 * Displays an empty state message when:
 * - No data is available (empty table)
 * - All data is filtered out (search/filter returns no results)
 *
 * Provides a clear button to reset search/filter when data is filtered.
 *
 * This is a simplified version that removes:
 * - i18n (replaced with texts prop)
 * - PageMessagePane (uses simple inline layout)
 *
 * @example
 * ```tsx
 * <Footer
 *   tableManager={tableManager}
 *   messages={{
 *     emptyDataMessage: { title: 'No items', text: 'Add an item to get started.' }
 *   }}
 *   texts={{
 *     noDataTitle: 'No items found',
 *     clearSearchButtonLabel: 'Clear search'
 *   }}
 * />
 * ```
 */
export const Footer = ({ tableManager, messages, texts = defaultTexts }: FooterProps) => {
  const mergedTexts = { ...defaultTexts, ...texts }

  const areFiltersActive =
    tableManager.parameters.filterValues &&
    Object.values(tableManager.parameters.filterValues).some(hasValue)
  const areTableDataFiltered = areFiltersActive || tableManager.parameters.searchTerm

  const clearAll = useCallback(async () => {
    await tableManager.reloadData({
      searchTerm: '',
      filterValues: {},
    })
  }, [tableManager])

  /**
   * Get localization strings based on what type of filtering is active.
   */
  const getLocalization = () => {
    if (tableManager.parameters.searchTerm && areFiltersActive) {
      return {
        noResultText: mergedTexts.searchAndFilterNoResultText,
        clearButtonLabel: mergedTexts.clearAllButtonLabel,
      }
    }

    if (areFiltersActive) {
      return {
        noResultText: mergedTexts.filterNoResultText,
        clearButtonLabel: mergedTexts.clearFilterButtonLabel,
      }
    }

    if (tableManager.parameters.searchTerm) {
      return {
        noResultText: mergedTexts.searchNoResultText,
        clearButtonLabel: mergedTexts.clearSearchButtonLabel,
      }
    }

    return undefined
  }

  /**
   * Get the title to display based on state.
   */
  const getEmptyResultTitle = (isFiltered: boolean | string | undefined) => {
    if (isFiltered) {
      if (messages?.filteredDataMessage?.title) {
        return messages.filteredDataMessage.title
      }
      return mergedTexts.noResultTitle
    } else if (messages?.emptyDataMessage?.title) {
      return messages.emptyDataMessage.title
    }
    return mergedTexts.noDataTitle
  }

  /**
   * Get the description text to display based on state.
   */
  const getEmptyResultText = (isFiltered: boolean | string | undefined) => {
    if (isFiltered) {
      if (messages?.filteredDataMessage?.text) {
        return messages.filteredDataMessage.text
      }
    } else if (messages?.emptyDataMessage?.text) {
      return messages.emptyDataMessage.text
    }
    return getLocalization()?.noResultText
  }

  const title = getEmptyResultTitle(areTableDataFiltered)
  const text = getEmptyResultText(areTableDataFiltered)
  const localization = getLocalization()

  return (
    <Box className={'TableComponent-footer'}>
      <div className={'TableComponent-emptyState'}>
        <Headline size={HeadlineSize.M}>{title}</Headline>
        {text && (
          <p
            className={'TableComponent-emptyStateText'}
            dangerouslySetInnerHTML={
              messages?.messagesAsHtml ? { __html: text } : undefined
            }
          >
            {messages?.messagesAsHtml ? undefined : text}
          </p>
        )}
        {areTableDataFiltered && localization?.clearButtonLabel && (
          <Button
            color={ButtonColor.Primary}
            size={ButtonSize.L}
            onClick={clearAll}
          >
            {localization.clearButtonLabel}
          </Button>
        )}
      </div>
    </Box>
  )
}

Footer.displayName = 'Footer'
