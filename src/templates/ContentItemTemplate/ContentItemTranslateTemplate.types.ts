/**
 * Types for ContentItemTranslateTemplate
 *
 * The ContentItemTranslateTemplate is used for cascade translation of content items,
 * allowing users to select linked content items to translate together.
 */

import type { ContentItemCommandResultStatus } from './ContentItemEditTemplate.types'

/**
 * Action type for table actions.
 */
export const ActionType = {
  Client: 'client',
  Server: 'server',
} as const

export type ActionType = (typeof ActionType)[keyof typeof ActionType]

/**
 * Table action definition.
 */
export interface TableAction {
  /** Unique identifier for the action */
  readonly identifier: string
  /** Action type - client or server */
  readonly type: ActionType
  /** Parameter passed to the action */
  readonly parameter?: string
  /** Display label */
  readonly label: string
  /** Click handler */
  readonly onClick?: () => void | Promise<void>
  /** Whether the action is destructive */
  readonly destructive?: boolean
  /** Whether the action is disabled */
  readonly disabled?: boolean
  /** Button color override */
  readonly buttonColor?: string
}

/**
 * Table column definition.
 */
export interface TableColumn {
  /** Unique column name */
  readonly name: string
  /** Display caption */
  readonly caption: string
  /** Whether column is sortable */
  readonly sortable?: boolean
  /** Column width */
  readonly width?: string | number
}

/**
 * Table row data.
 */
export interface TableRow {
  /** Unique row identifier */
  readonly identifier: unknown
  /** Whether row is disabled */
  readonly disabled?: boolean
  /** Cell values by column name */
  readonly cells: Record<string, unknown>
}

/**
 * Table row ID type.
 */
export type TableRowId = unknown

/**
 * Base props for table component.
 */
export interface TableComponentBaseProps {
  /** Table columns definition */
  readonly columns?: TableColumn[]
  /** Header actions */
  readonly headerActions?: TableAction[]
  /** Whether rows are selectable */
  readonly isRowsSelectable?: boolean
  /** Table caption/title */
  readonly caption?: string
  /** Empty state message */
  readonly emptyMessage?: string
}

/**
 * Props for ContentItemTranslateTemplate component.
 */
export interface ContentItemTranslateProps {
  /**
   * Identifier of the content item for which the translation was requested.
   */
  readonly contentItemId: number
  /**
   * Page headline.
   */
  readonly headline: string
  /**
   * Submit label.
   */
  readonly submitLabel: string
  /**
   * Table component properties.
   */
  readonly tableClientProperties: TableComponentBaseProps
}

/**
 * Cascade translate command arguments.
 */
export interface CascadeTranslateCommandArguments {
  /**
   * Selected content item identifiers.
   */
  readonly selectedIdentifiers: number[]
}

/**
 * Cascade translate command result.
 */
export interface CascadeTranslateCommandResult {
  /**
   * Command result status.
   */
  readonly status: ContentItemCommandResultStatus
  /**
   * Identifiers of content items that are invalid, were meanwhile deleted or the user doesn't have the necessary permissions for.
   */
  readonly invalidIdentifiers: number[]
  /**
   * If not empty, contains url to redirect to in case of successful translation task creation.
   */
  readonly redirectUrl?: string
}

/**
 * Table manager state and actions returned by useTableManager.
 */
export interface TableManager {
  /** Table rows data */
  readonly rows: TableRow[] | null
  /** Whether data is loading */
  readonly isLoading: boolean
  /** Error message if any */
  readonly error?: string
  /** Reload table data */
  readonly reloadData: () => Promise<void>
  /** Current page (0-indexed) */
  readonly currentPage: number
  /** Page size */
  readonly pageSize: number
  /** Total items count */
  readonly totalCount: number
}

/**
 * Side panel size constants.
 */
export const SidePanelSize = {
  Default: 'default',
  Large: 'large',
  Stackable: 'stackable',
} as const

export type SidePanelSize = (typeof SidePanelSize)[keyof typeof SidePanelSize]

/**
 * Submit action definition for nested pages.
 */
export interface SubmitAction {
  /** Action label */
  readonly label: string
  /** Click handler */
  readonly onClick: () => void | Promise<void>
}

/**
 * Actions for nested pages.
 */
export interface NestedPageActions {
  /** Submit action */
  readonly submitAction?: SubmitAction
  /** Cancel action */
  readonly cancelAction?: SubmitAction
}
