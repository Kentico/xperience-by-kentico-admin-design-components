import * as React from 'react';
import { useState, useMemo, useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/lib/cn'
import { ActionTile, ActionTileState } from '../ActionTile'
import { Button, ButtonColor, ButtonSize } from '../Button'
import { Input } from '../Input'
import { Stack, Spacing } from '../Layout'
import { Headline, HeadlineSize } from '../Headline'
import { Box } from '../Box'
import type { TileSelectorProps, TileSelectorItem } from './TileSelector.types'
import './TileSelector.css'

/**
 * Case-insensitive search helper.
 */
const searchCaseInsensitive = (text: string, searchPhrase: string): boolean => {
  return !searchPhrase || text.toUpperCase().indexOf(searchPhrase.toUpperCase()) >= 0
}

/**
 * TileSelector component for tile-based selection with search filtering.
 * Displays a grid of ActionTiles with search functionality and empty state handling.
 */
export const TileSelector = ({
  items,
  value,
  onItemSelect,
  fieldName,
  noItemsHeading,
  noItemsMessage,
  texts,
  debounceMs = 250,
  className,
  emptyStateChildren,
}: TileSelectorProps) => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [filterPhrase, setFilterPhrase] = useState('')

  // Debounced filter update
  const handleSearch = useDebouncedCallback((phrase: string) => {
    setFilterPhrase(phrase)
  }, debounceMs)

  // Compute filtered items based on the debounced filter phrase
  const filteredItems = useMemo(() => {
    return items.filter((item) => searchCaseInsensitive(item.label, filterPhrase))
  }, [items, filterPhrase])

  // Handle search input change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setSearchPhrase(newValue)
      handleSearch(newValue)
    },
    [handleSearch]
  )

  // Handle clear search
  const handleClearSearch = useCallback(() => {
    setSearchPhrase('')
    setFilterPhrase('')
  }, [])

  // Get tile state based on selection and disabled status
  const getState = useCallback(
    (item: TileSelectorItem): ActionTileState => {
      if (value && item.identifier === value.identifier) {
        return ActionTileState.Selected
      } else if (item.disabled) {
        return ActionTileState.Disabled
      }
      return ActionTileState.Default
    },
    [value]
  )

  // Handle tile click
  const handleTileClick = useCallback(
    (item: TileSelectorItem) => {
      if (!item.disabled) {
        onItemSelect(item)
      }
    },
    [onItemSelect]
  )

  // Check if we have any items to display
  const hasNoItems = items.length === 0
  const hasNoSearchResults = filteredItems.length === 0 && searchPhrase.length > 0

  return (
    <div className={cn('TileSelector', className)}>
      <Stack spacing={Spacing.XL}>
        {/* Search Input */}
        <Input
          value={searchPhrase}
          placeholder={texts.searchPlaceholder}
          onChange={handleSearchChange}
          name={fieldName || 'tile-selector-search'}
        />

        {/* Tile Grid */}
        {filteredItems.length > 0 && (
          <div className={'TileSelector-items'}>
            {filteredItems.map((item) => (
              <ActionTile
                key={String(item.identifier)}
                label={item.label}
                icon={item.icon || 'xp-placeholder'}
                state={getState(item)}
                tooltip={item.tooltip}
                onClick={() => handleTileClick(item)}
              />
            ))}
          </div>
        )}

        {/* No Search Results State */}
        {hasNoSearchResults && !hasNoItems && (
          <div className={'TileSelector-messagePaneWrapper'}>
            <div className={'TileSelector-messagePane'}>
              <Headline size={HeadlineSize.L} spacingBottom={Spacing.L}>
                {texts.noSearchResultTitle}
              </Headline>
              <Box spacingBottom={Spacing.XL}>
                <div className={'TileSelector-subheadline'}>{texts.noSearchResultText}</div>
              </Box>
              <Button
                color={ButtonColor.Primary}
                size={ButtonSize.L}
                onClick={handleClearSearch}
              >
                {texts.clearButtonLabel}
              </Button>
            </div>
          </div>
        )}

        {/* No Items State */}
        {hasNoItems && (
          <div className={'TileSelector-messagePaneWrapper'}>
            <div className={'TileSelector-messagePane'}>
              <Headline size={HeadlineSize.L} spacingBottom={Spacing.L}>
                {noItemsHeading}
              </Headline>
              <div className={'TileSelector-subheadline'}>{noItemsMessage}</div>
              {emptyStateChildren && (
                <Box spacingTop={Spacing.XL}>{emptyStateChildren}</Box>
              )}
            </div>
          </div>
        )}
      </Stack>
    </div>
  )
}

TileSelector.displayName = 'TileSelector'
