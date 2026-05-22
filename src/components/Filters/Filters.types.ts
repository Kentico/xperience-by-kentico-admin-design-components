import type { ReactNode } from 'react'

/**
 * Represents an active filter item displayed in the FilterStatusIndicator.
 */
export interface FilterStatusItem {
  /**
   * Label displayed in the filter tag.
   */
  readonly label: string
  /**
   * Unique identifier for this filter.
   */
  readonly name: string
  /**
   * Optional tooltip text displayed on hover.
   */
  readonly tooltip?: string
}

/**
 * Represents a custom action button displayed in the FilterStatusIndicator.
 */
export interface FilterAction {
  /**
   * Unique identifier for this action.
   */
  readonly identifier: string
  /**
   * Icon name for the action button.
   */
  readonly icon?: string
  /**
   * Label text for the action button.
   */
  readonly label?: string
  /**
   * Tooltip text for the action button.
   */
  readonly title?: string
  /**
   * Click handler for the action.
   */
  readonly onClick?: () => void
  /**
   * Whether the action is disabled.
   */
  readonly disabled?: boolean
}

/**
 * Props for the FilterStatusIndicator component.
 * Displays a bar of active filter tags with clear all functionality.
 */
export interface FilterStatusIndicatorProps {
  /**
   * Active filter items to display as removable tags.
   */
  readonly filterItems: FilterStatusItem[]
  /**
   * Optional custom actions to display (additional buttons).
   */
  readonly actions?: FilterAction[]
  /**
   * Handler called when "Clear All" is clicked.
   */
  readonly onClearAll: () => void
  /**
   * Handler called when a specific filter tag is removed.
   */
  readonly onClear: (filterName: string) => void
  /**
   * Handler called when any filter tag is clicked.
   */
  readonly onTagClick?: () => void
  /**
   * Text labels for the component (replaces i18n).
   */
  readonly texts: FilterStatusIndicatorTexts
}

/**
 * Text labels for FilterStatusIndicator.
 */
export interface FilterStatusIndicatorTexts {
  /**
   * Label shown before the filter tags (e.g., "Applied filters:").
   */
  readonly appliedFiltersLabel: string
  /**
   * Label for the "Clear All" button.
   */
  readonly clearAllButtonLabel: string
}

/**
 * Props for the FilterPanel component.
 * A side panel for displaying filter controls.
 */
export interface FilterPanelProps {
  /**
   * Whether the panel is visible.
   */
  readonly isVisible: boolean
  /**
   * Handler called when the panel should close.
   */
  readonly onClose: () => void
  /**
   * Handler called when the "Apply" button is clicked.
   */
  readonly onApply: () => void
  /**
   * Handler called when the "Clear All" button is clicked.
   */
  readonly onClear: () => void
  /**
   * Content to render inside the panel (filter form/controls).
   * Unlike the source which required Form system, this accepts any ReactNode.
   */
  readonly children: ReactNode
  /**
   * Text labels for the component (replaces i18n).
   */
  readonly texts: FilterPanelTexts
}

/**
 * Text labels for FilterPanel.
 */
export interface FilterPanelTexts {
  /**
   * Headline text for the panel.
   */
  readonly headline: string
  /**
   * Label for the "Clear All" button.
   */
  readonly clearAllButtonLabel: string
  /**
   * Label for the "Cancel" button.
   */
  readonly cancelButtonLabel: string
  /**
   * Label for the "Apply" button.
   */
  readonly applyButtonLabel: string
}
