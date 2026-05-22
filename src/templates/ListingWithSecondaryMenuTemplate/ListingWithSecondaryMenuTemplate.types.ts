import type { ReactNode } from 'react'
import type {
  TableColumn,
  ActionTableRow,
  SortType,
} from '@/components/Table/Table.types'
import type { FilterStatusItem } from '@/components/Filters/Filters.types'
import type { CalloutType, CalloutPlacementType } from '@/components'

// Re-export imported types for convenience
export type { TableColumn, ActionTableRow, SortType, FilterStatusItem }

// ============================================================================
// Legacy ListingTemplate Types (migrated from ListingTemplate)
// ============================================================================

/**
 * Sort direction for table columns (legacy).
 * @deprecated Prefer SortType from @/components/Table/Table.types for new code.
 */
export const LegacySortType = {
  Ascending: 'ascending',
  Descending: 'descending',
  None: 'none',
} as const

export type LegacySortType = (typeof LegacySortType)[keyof typeof LegacySortType]

/**
 * Action type identifiers for listing operations.
 */
export const ActionType = {
  Client: 'client',
  Server: 'server',
  Navigate: 'navigate',
} as const

export type ActionType = (typeof ActionType)[keyof typeof ActionType]

/**
 * Action configuration for header and row actions.
 */
export interface Action {
  readonly type?: ActionType
  readonly label: string
  readonly title?: string
  readonly disabled?: boolean
  readonly destructive?: boolean
  readonly onClick?: () => void | Promise<void>
  readonly identifier?: string
  readonly parameter?: string
  readonly buttonColor?: string
  readonly icon?: string
}

/**
 * Legacy table column configuration (from ListingTemplate).
 */
export interface LegacyTableColumn {
  /**
   * Column name/identifier.
   */
  readonly name: string

  /**
   * Column caption/header text.
   */
  readonly caption: string

  /**
   * Whether the column is sortable.
   */
  readonly sortable?: boolean

  /**
   * Column width (CSS value).
   */
  readonly width?: string

  /**
   * Whether the column is visible.
   */
  readonly visible?: boolean

  /**
   * Custom render function for cell content.
   */
  readonly render?: (value: unknown, row: unknown) => ReactNode
}

/**
 * Callout configuration for server-driven callouts.
 */
export interface CalloutConfiguration {
  readonly headline?: string
  readonly subheadline?: string
  readonly content: string
  readonly actionButton?: CalloutButtonConfiguration
  readonly type: CalloutType
  readonly placement: CalloutPlacementType
  readonly contentAsHtml?: boolean
}

/**
 * Button configuration for callout actions.
 */
export interface CalloutButtonConfiguration {
  readonly text: string
  readonly clickCommandName?: string
  readonly statusCommandName?: string
  readonly redirectUrl?: string
  readonly openInNewTab?: boolean
  readonly icon?: string
  disabled: boolean
  inProgress: boolean
}

/**
 * Form component properties for filter forms.
 */
export interface FormComponentProps {
  readonly name: string
  readonly label?: string
  readonly value?: unknown
  readonly type?: string
  readonly options?: Array<{ label: string; value: unknown }>
}

/**
 * Metadata for a filter form component.
 */
export interface FilterFormComponentMetadata {
  /**
   * Indicates whether the form component is not used for filtering.
   */
  readonly ignored: boolean

  /**
   * Filter label.
   */
  readonly label: string

  /**
   * Filter description.
   */
  readonly description: string
}

/**
 * Result returned from filter form change command.
 */
export interface FilterFormChangeResult {
  /**
   * Form components representing edited filter form fields.
   */
  readonly components: FormComponentProps[]

  /**
   * Metadata of the form components.
   */
  readonly metadata: Record<string, FilterFormComponentMetadata>
}

/**
 * Subcaption component properties.
 */
export interface SubcaptionComponentProps {
  readonly componentName: string
  readonly props?: Record<string, unknown>
}

// TableManager is provided by @/components/Table — re-exported for convenience
export type { TableManager } from '@/components/Table'

/**
 * Properties of the ListingTemplate.
 */
export interface ListingTemplateProps {
  /**
   * Columns of the listing.
   */
  readonly columns: LegacyTableColumn[]

  /**
   * List of header actions.
   */
  readonly headerActions?: Action[]

  /**
   * List of available page sizes.
   */
  readonly pageSizes: number[]

  /**
   * Selected page size.
   */
  readonly pageSize: number

  /**
   * Listing caption/headline.
   */
  readonly caption: string

  /**
   * Column data are sorted by.
   */
  readonly sortBy: string

  /**
   * Direction data are sorted by.
   */
  readonly sortType: LegacySortType

  /**
   * Localized label of listing page size selection.
   */
  readonly pageSizesLabel: string

  /**
   * Listing callouts configuration.
   */
  readonly callouts?: CalloutConfiguration[]

  /**
   * Maximum number of visible row actions.
   * If row has more actions they are grouped under a select menu.
   */
  readonly maxVisibleRowActions?: number

  /**
   * Collection of form components used in the filter form.
   */
  readonly filterFormComponents?: FormComponentProps[]

  /**
   * Mapping of filter form components to their metadata.
   */
  readonly filterFormComponentsMetadata?: Record<string, FilterFormComponentMetadata>

  /**
   * Unique name of the page for identifying listing state in memory.
   */
  readonly uniqueIdentifier: string

  /**
   * Collection of mass actions displayed in the horizontal action menu.
   */
  readonly massActions?: Action[]

  /**
   * Subcaption component definition.
   */
  readonly subcaptionComponent?: SubcaptionComponentProps

  /**
   * Optional children to render within the listing.
   */
  readonly children?: ReactNode
}

// ============================================================================
// ListingWithSecondaryMenuTemplate Types
// ============================================================================

/**
 * Mass action configuration for bulk operations on selected rows.
 */
export interface MassAction {
  /** Unique identifier for the action */
  readonly identifier?: string
  /** Display label for the action button */
  readonly label: string
  /** Tooltip text for the action */
  readonly title?: string
  /** Icon name for the action */
  readonly icon?: string
  /** Whether the action is disabled */
  readonly disabled?: boolean
  /** Whether the action is destructive (e.g., delete) */
  readonly destructive?: boolean
  /** Click handler for the action */
  readonly onClick?: () => void | Promise<void>
}

/**
 * Properties for the ListingWithSecondaryMenuTemplate.
 */
export interface ListingWithSecondaryMenuTemplateProps {
  /** Main heading text above the callout */
  readonly heading: string

  /** Callout configurations (displayed between heading and action bar) */
  readonly callouts?: CalloutConfiguration[]

  /** Label for the primary action button */
  readonly primaryActionLabel?: string

  /** Handler for primary action button click */
  readonly onPrimaryAction?: () => void

  /** Table column definitions */
  readonly columns: TableColumn[]

  /** Table row data */
  readonly rows: ActionTableRow[]

  /** Total number of items */
  readonly totalItems: number

  /** Current page number */
  readonly currentPage: number

  /** Total number of pages */
  readonly totalPages: number

  /** Selected page size */
  readonly pageSize: number

  /** Available page sizes */
  readonly pageSizes: number[]

  /** Applied filter items shown as removable tags */
  readonly filterItems?: FilterStatusItem[]

  /** Column to sort by */
  readonly sortBy: string

  /** Sort direction */
  readonly sortType: SortType

  /** Items per page label */
  readonly pageSizesLabel: string

  /** Mass actions for bulk operations on selected rows */
  readonly massActions?: MassAction[]

  /** Handler called when a row is clicked */
  readonly onRowClick?: (identifier: unknown) => void

  /** Maximum number of visible row actions before overflow menu */
  readonly maxVisibleRowActions?: number

  /** Custom filter panel content (form controls, etc.) */
  readonly filterPanelChildren?: ReactNode

  /** Callback when filters are applied */
  readonly onFilterApply?: () => void

  /** Callback when all filters are cleared */
  readonly onFilterClear?: () => void
}
