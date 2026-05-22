import * as React from 'react';
import { Box } from '@/components/Box'
import { Button, ButtonColor, ButtonSize } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { Spacing } from '@/components/Layout'
import { SidePanel, SidePanelSize } from '@/components/SidePanel'
import { Tag } from '@/components/Tag'
import { Tooltip } from '@/components/Tooltip'
import type {
  FilterStatusIndicatorProps,
  FilterPanelProps,
  FilterAction,
} from './Filters.types'
import './Filters.css'

/**
 * FilterStatusIndicator - displays a bar of active filter tags with "Clear All" functionality.
 *
 * Shows currently applied filters as removable tags. Users can:
 * - Click "Clear All" to remove all filters
 * - Click the remove button on individual tags to clear specific filters
 * - Click a tag to trigger the onTagClick handler (e.g., to open filter panel)
 *
 * @example
 * ```tsx
 * <FilterStatusIndicator
 *   filterItems={[
 *     { name: 'status', label: 'Status: Active' },
 *     { name: 'category', label: 'Category: News', tooltip: 'Filtering by category' },
 *   ]}
 *   onClearAll={() => clearAllFilters()}
 *   onClear={(name) => clearFilter(name)}
 *   onTagClick={() => openFilterPanel()}
 *   texts={{
 *     appliedFiltersLabel: 'Applied filters:',
 *     clearAllButtonLabel: 'Clear all',
 *   }}
 * />
 * ```
 */
export const FilterStatusIndicator = ({
  filterItems,
  onClearAll,
  onClear,
  onTagClick,
  actions,
  texts,
}: FilterStatusIndicatorProps) => {
  const renderAction = (action: FilterAction) => {
    const button = (
      <Button
        key={action.identifier}
        icon={action.icon ? <Icon name={action.icon} /> : undefined}
        size={ButtonSize.S}
        color={ButtonColor.Tertiary}
        onClick={action.onClick}
        disabled={action.disabled}
      >
        {action.label}
      </Button>
    )

    return action.title ? (
      <Tooltip key={action.identifier} tooltipText={action.title}>
        {button}
      </Tooltip>
    ) : (
      button
    )
  }

  return (
    <Box className={'Filters-activeFilterWrapper'}>
      <Box className={'Filters-label'}>{texts.appliedFiltersLabel}</Box>
      <Box spacingLeft={Spacing.M} spacingRight={Spacing.S}>
        <Button
          icon={<Icon name="xp-times-circle" size="xs" />}
          size={ButtonSize.S}
          color={ButtonColor.Tertiary}
          onClick={onClearAll}
        >
          {texts.clearAllButtonLabel}
        </Button>
        {actions?.map(renderAction)}
      </Box>

      {filterItems?.map((activeFilterItem) => (
        <Box key={activeFilterItem.name} spacingLeft={Spacing.XS}>
          <Tag
            label={activeFilterItem.label}
            tooltipText={activeFilterItem.tooltip}
            tooltipTextAsHtml
            removable
            onRemoveClick={() => onClear(activeFilterItem.name)}
            onClick={onTagClick}
          />
        </Box>
      ))}
    </Box>
  )
}

FilterStatusIndicator.displayName = 'FilterStatusIndicator'

/**
 * FilterPanel - a side panel for displaying filter controls.
 *
 * Unlike the source component which required the Kentico Forms system,
 * this simplified version accepts any ReactNode as children. This allows
 * consumers to use any form library or custom controls they prefer.
 *
 * Features:
 * - Side panel with headline
 * - Footer with Clear All, Cancel, and Apply buttons
 * - Close on outside click
 *
 * @example
 * ```tsx
 * <FilterPanel
 *   isVisible={isPanelOpen}
 *   onClose={() => setIsPanelOpen(false)}
 *   onApply={handleApplyFilters}
 *   onClear={handleClearFilters}
 *   texts={{
 *     headline: 'Filters',
 *     clearAllButtonLabel: 'Clear all',
 *     cancelButtonLabel: 'Cancel',
 *     applyButtonLabel: 'Apply',
 *   }}
 * >
 *   <Select label="Status" value={status} onChange={setStatus}>
 *     <MenuItem value="active">Active</MenuItem>
 *     <MenuItem value="inactive">Inactive</MenuItem>
 *   </Select>
 * </FilterPanel>
 * ```
 */
export const FilterPanel = ({
  isVisible,
  onClose,
  onApply,
  onClear,
  children,
  texts,
}: FilterPanelProps) => {
  const handleClose = async () => {
    onClose()
  }

  return (
    <SidePanel
      headline={texts.headline}
      isVisible={isVisible}
      onClose={handleClose}
      size={SidePanelSize.Stackable}
      footer={
        <div className={'Filters-footerContainer'}>
          <Button
            destructive
            icon={<Icon name="xp-times-circle" />}
            size={ButtonSize.M}
            color={ButtonColor.Secondary}
            onClick={onClear}
          >
            {texts.clearAllButtonLabel}
          </Button>
          <div className={'Filters-buttonGroupWrapper'}>
            <Button
              size={ButtonSize.M}
              color={ButtonColor.Secondary}
              onClick={onClose}
            >
              {texts.cancelButtonLabel}
            </Button>
            <Button
              size={ButtonSize.M}
              color={ButtonColor.Primary}
              onClick={onApply}
            >
              {texts.applyButtonLabel}
            </Button>
          </div>
        </div>
      }
    >
      {children}
    </SidePanel>
  )
}

FilterPanel.displayName = 'FilterPanel'
