import * as React from 'react';
/**
 * ContentItemUsageTemplate
 *
 * Template for displaying content item usages in a structured listing.
 * Shows where a content item is referenced from, with expandable rows
 * for nested relationships.
 *
 * Features:
 * - Structured listing with expandable rows
 * - Header with info tooltip
 * - Empty state message
 * - White table header variant
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from 'react'
import {
  Box,
  Button,
  ButtonColor,
  ButtonSize,
  Headline,
  HeadlineSize,
  Spacing,
} from '@/components'
import './ContentItemUsageTemplate.css'

// ============================================================================
// Local Translations
// ============================================================================

const translations = {
  'admin.content.contentItems.usages.headline': 'Content Item Usages',
  'admin.content.contentItems.usages.tooltip':
    'View all places where this content item is used',
} as const

function t(key: keyof typeof translations): string {
  return translations[key] ?? key
}

// ============================================================================
// Types
// ============================================================================

/**
 * Table column configuration.
 */
export interface TableColumn {
  /** Column name/key */
  readonly name: string
  /** Display caption */
  readonly caption: string
  /** Column width */
  readonly width?: string
}

/**
 * Table cell types.
 */
export const CellType = {
  Text: 'text',
  Action: 'action',
  NamedComponent: 'namedComponent',
} as const

export type CellType = (typeof CellType)[keyof typeof CellType]

/**
 * Table cell interface.
 */
export interface TableCell {
  /** Cell type */
  readonly type: CellType
  /** Cell value */
  readonly value?: unknown
}

/**
 * Action cell interface.
 */
export interface ActionCell extends TableCell {
  readonly type: typeof CellType.Action
  readonly actions: Action[]
  readonly onInvokeAction?: (action: Action) => void
}

/**
 * Named component cell interface.
 */
export interface NamedComponentCell extends TableCell {
  readonly type: typeof CellType.NamedComponent
  readonly componentName: string
  readonly componentProps: RelatedItemsTableCellComponentProps
}

/**
 * Related items cell props.
 */
export interface RelatedItemsTableCellComponentProps {
  /** Number of related items */
  readonly itemsCount: number
  /** Click handler for expansion */
  onClick?: (expand: boolean) => void
}

/**
 * Action type.
 */
export const ActionType = {
  Link: 'link',
  Command: 'command',
} as const

export type ActionType = (typeof ActionType)[keyof typeof ActionType]

/**
 * Action interface.
 */
export interface Action {
  /** Action name */
  readonly name: string
  /** Action label */
  readonly label: string
  /** Action type */
  readonly type: ActionType
  /** Action parameter (URL for link, command name for command) */
  readonly parameter: string
  /** Whether action is disabled */
  readonly disabled?: boolean
  /** Link parameters */
  readonly linkParameters?: {
    readonly useWindowOpen?: boolean
    readonly target?: string
  }
}

/**
 * Table row interface.
 */
export interface TableRow {
  /** Row identifier */
  readonly identifier: unknown
  /** Cells data */
  readonly cells: TableCell[]
  /** Row level for indentation */
  readonly level?: number
  /** Whether row is disabled */
  readonly disabled?: boolean
}

/**
 * Structured table row with additional properties.
 */
export interface StructuredTableRow extends TableRow {
  /** Path from root to this item */
  path?: number[]
  /** Unique identifier for React keys */
  uniqueIdentifier: string
}

/**
 * Structured listing props.
 */
export interface StructuredListingProps {
  /** Table columns configuration */
  readonly columns: TableColumn[]
  /** Name of the column that handles expansion */
  readonly expandColumnName: string
  /** Use white background for table header */
  readonly useWhiteTableHeader: boolean
  /** Message shown when no data */
  readonly noDataMessage: string
  /** Title shown when no data */
  readonly noDataTitle: string
  /** Optional children to render above the table */
  readonly children?: ReactNode
}

/**
 * Load structured data result.
 */
export interface LoadStructuredDataResult {
  /** Loaded rows */
  readonly rows?: StructuredTableRow[]
}

/**
 * Load related items command args.
 */
export interface LoadRelatedItemsCommandArgs {
  /** Row identifier */
  readonly identifier: unknown
  /** Row level */
  readonly level: number
  /** Path from root */
  readonly path: number[]
}

/**
 * ContentItemUsageTemplate props.
 */
export interface ContentItemUsageTemplateProps {
  /** Message shown when no usages exist */
  readonly noDataMessage: string
  /** Title shown when no usages exist */
  readonly noDataTitle: string
  /** Table columns configuration */
  readonly columns: TableColumn[]
  /** Name of the column that handles expansion */
  readonly expandColumnName: string
  /** Use white background for table header */
  readonly useWhiteTableHeader: boolean
}

// ============================================================================
// Stub Hooks
// ============================================================================

/**
 * Stub hook for page command.
 */
function usePageCommand<TResult>(
  _commandName: string,
  options: {
    executeOnMount?: boolean
    after?: (result: TResult | undefined) => void
  }
): void {
  useEffect(() => {
    if (options.executeOnMount) {
      // Stub: In real implementation, would execute command on mount
      // and call options.after with result
      options.after?.(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/**
 * Stub hook for page command provider.
 */
function usePageCommandProvider(): {
  executeCommand: <TResult, TData>(
    commandName: string,
    data?: TData
  ) => Promise<TResult | undefined>
} {
  const executeCommand = useCallback(
    async <TResult, TData>(
      _commandName: string,
      _data?: TData
    ): Promise<TResult | undefined> => {
      // Stub: In real implementation, would call server command
      return undefined
    },
    []
  )

  return { executeCommand }
}

/**
 * Stub hook for navigation.
 */
function useNavigate(): (path: string) => void {
  return (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path
    }
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get base URI trimmed of trailing slash.
 */
function getBaseUriTrimmed(): string {
  if (typeof window === 'undefined') {
    return ''
  }
  return window.location.origin
}

// ============================================================================
// Stub Components
// ============================================================================

/**
 * PageMessagePane - Empty state message.
 */
const PageMessagePane: FC<{
  title: string
  text: string
}> = ({ title, text }) => {
  return (
    <div className={'ContentItemUsageTemplate-pageMessagePane'}>
      <div className={'ContentItemUsageTemplate-pageMessageTitle'}>{title}</div>
      <div className={'ContentItemUsageTemplate-pageMessageText'}>{text}</div>
    </div>
  )
}

/**
 * Table - Simple table component.
 */
const Table: FC<{
  columns: TableColumn[]
  rows?: StructuredTableRow[]
  isHeaderVisible: boolean
  selectable: boolean
  headerClassName?: string
}> = ({ columns, rows, isHeaderVisible, headerClassName }) => {
  if (!rows || rows.length === 0) {
    return null
  }

  return (
    <table className={'ContentItemUsageTemplate-table'}>
      {isHeaderVisible && (
        <thead className={headerClassName}>
          <tr>
            {columns.map((col) => (
              <th key={col.name} style={{ width: col.width }}>
                {col.caption}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.uniqueIdentifier}
            className={`${'ContentItemUsageTemplate-tableRow'} ${row.level ? `ContentItemUsageTemplate-${`rowLevel${row.level}`}` : ''}`}
          >
            {row.cells.map((cell, index) => (
              <td key={columns[index]?.name ?? index} className={'ContentItemUsageTemplate-tableCell'}>
                {String(cell.value ?? '')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ============================================================================
// StructuredListing Component
// ============================================================================

const StructuredListingCommands = {
  LoadStructuredData: 'LoadStructuredData',
  LoadRelatedItems: 'LoadRelatedItems',
} as const

/**
 * StructuredListing - Inline stub component for structured listing.
 *
 * Displays a table with expandable rows for nested relationships.
 */
const StructuredListing: FC<StructuredListingProps> = ({
  columns: tableColumns,
  expandColumnName,
  useWhiteTableHeader,
  children,
  noDataMessage,
  noDataTitle,
}) => {
  const [tableRows, setTableRows] = useState<StructuredTableRow[]>()
  const [hasUsages, setHasUsages] = useState<boolean>(true)
  const rowIdentifiers = useRef<unknown[]>([])
  const { executeCommand } = usePageCommandProvider()
  const navigate = useNavigate()

  const relatedItemsColumnIndex = useMemo(() => {
    return tableColumns.findIndex((column) => column.name === expandColumnName)
  }, [tableColumns, expandColumnName])

  useEffect(() => {
    rowIdentifiers.current = tableRows?.map((row) => row.uniqueIdentifier) ?? []
  }, [tableRows])

  const invokeAction = useCallback(
    (action: Action) => {
      if (action.disabled || action.type !== ActionType.Link) {
        return
      }

      function navigateToLink() {
        if (action.linkParameters?.useWindowOpen) {
          let path = action.parameter

          if (!path.startsWith('http')) {
            const pathTrimmed = action.parameter.replace(/^\//, '')
            path = `${getBaseUriTrimmed()}/${pathTrimmed}`
          }

          return window.open(path, action.linkParameters.target, 'noreferrer')
        } else {
          navigate(action.parameter)
          return
        }
      }

      void navigateToLink()
    },
    [navigate]
  )

  const addRowHandlers = useCallback(
    (row: StructuredTableRow) => {
      const expandCell = row.cells[relatedItemsColumnIndex] as NamedComponentCell
      if (expandCell?.type === CellType.NamedComponent) {
        const componentProps = expandCell.componentProps as RelatedItemsTableCellComponentProps
        const rowLevel = row.level ?? 0
        const path = row.path ?? []

        if (componentProps.itemsCount > 0) {
          componentProps.onClick = (expand) =>
            onRowExpandHandler(
              row.identifier,
              row.uniqueIdentifier,
              rowLevel,
              path,
              expand
            )
        }
      }

      row.cells.forEach((cell, index) => {
        if (cell.type === CellType.Action) {
          const actionCell = cell as ActionCell
          if (actionCell.actions.length > 0) {
            row.cells[index] = {
              ...row.cells[index],
              onInvokeAction: (action: Action) => {
                invokeAction(action)
              },
            } as ActionCell
          }
        }
      })

      return row
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [relatedItemsColumnIndex, invokeAction]
  )

  const ensureRowHandlers = useCallback(
    (result: LoadStructuredDataResult | undefined) => {
      return result?.rows?.map(addRowHandlers) ?? []
    },
    [addRowHandlers]
  )

  const onRowExpandHandler = useCallback(
    async (
      identifier: unknown,
      uniqueIdentifier: string,
      level: number,
      path: number[],
      expand: boolean
    ) => {
      const rowIndex = rowIdentifiers.current.findIndex(
        (rowId) => rowId === uniqueIdentifier
      )
      if (rowIndex === -1) {
        return
      }
      if (expand) {
        const result = await executeCommand<
          LoadStructuredDataResult,
          LoadRelatedItemsCommandArgs
        >(StructuredListingCommands.LoadRelatedItems, {
          identifier,
          level,
          path,
        })
        const loadedRows = ensureRowHandlers(result)
        setTableRows((prevRows) => {
          return insertNewRows(rowIndex, prevRows, loadedRows)
        })
      } else {
        setTableRows((prevRows) => {
          return collapseRows(rowIndex, level, prevRows)
        })
      }
    },
    [executeCommand, ensureRowHandlers]
  )

  const insertNewRows = (
    rowIndex: number,
    rows: StructuredTableRow[] | undefined,
    newRows: StructuredTableRow[]
  ) => {
    if (rows === undefined) {
      return rows
    }

    return [
      ...rows.slice(0, rowIndex + 1),
      ...newRows,
      ...rows.slice(rowIndex + 1),
    ]
  }

  const collapseRows = (
    rowIndex: number,
    rowLevel: number,
    rows: StructuredTableRow[] | undefined
  ) => {
    if (rows === undefined) {
      return rows
    }

    const rowsCollapseStart = rows.slice(rowIndex + 1)

    let rowsToCollapseCount = 0
    for (const row of rowsCollapseStart) {
      if ((row.level ?? 0) <= rowLevel) {
        break
      }

      rowsToCollapseCount++
    }

    return [
      ...rows.slice(0, rowIndex + 1),
      ...rows.slice(rowIndex + 1 + rowsToCollapseCount),
    ]
  }

  usePageCommand<LoadStructuredDataResult>(
    StructuredListingCommands.LoadStructuredData,
    {
      executeOnMount: true,
      after: (result) => {
        if (!result) {
          return
        }

        if (!result.rows || result.rows.length === 0) {
          setHasUsages(false)
        }
        setTableRows(ensureRowHandlers(result))
      },
    }
  )

  return (
    <Box className={'ContentItemUsageTemplate-templateWrapper'}>
      {children}
      {!hasUsages ? (
        <PageMessagePane title={noDataTitle} text={noDataMessage} />
      ) : (
        <div className={'ContentItemUsageTemplate-table'}>
          <Table
            columns={tableColumns}
            rows={tableRows}
            isHeaderVisible
            selectable={false}
            headerClassName={
              useWhiteTableHeader ? 'ContentItemUsageTemplate-tableHeaderWhite' : undefined
            }
          />
        </div>
      )}
    </Box>
  )
}

// ============================================================================
// ContentItemUsageTemplate Component
// ============================================================================

/**
 * ContentItemUsageTemplate - Template for displaying content item usages.
 *
 * Shows a structured listing of all places where a content item is used,
 * with expandable rows for nested relationships.
 *
 * @example
 * ```tsx
 * <ContentItemUsageTemplate
 *   noDataTitle="No Usages Found"
 *   noDataMessage="This content item is not used anywhere."
 *   columns={[
 *     { name: 'name', caption: 'Name' },
 *     { name: 'type', caption: 'Type' },
 *     { name: 'relatedItems', caption: 'Related Items' }
 *   ]}
 *   expandColumnName="relatedItems"
 *   useWhiteTableHeader
 * />
 * ```
 */
export const ContentItemUsageTemplate: FC<ContentItemUsageTemplateProps> = ({
  noDataMessage,
  noDataTitle,
  columns,
  expandColumnName,
  useWhiteTableHeader,
}) => {
  const header = (
    <Box spacingBottom={Spacing.XL}>
      <Headline size={HeadlineSize.M}>
        <Box className={'ContentItemUsageTemplate-headerContainer'}>
          <span className={'ContentItemUsageTemplate-headerSpacing'}>
            {t('admin.content.contentItems.usages.headline')}
          </span>
          <Button
            icon="xp-i-circle"
            size={ButtonSize.XS}
            color={ButtonColor.Quinary}
            title={t('admin.content.contentItems.usages.tooltip')}
          />
        </Box>
      </Headline>
    </Box>
  )

  return (
    <StructuredListing
      columns={columns}
      expandColumnName={expandColumnName}
      useWhiteTableHeader={useWhiteTableHeader}
      noDataMessage={noDataMessage}
      noDataTitle={noDataTitle}
    >
      {header}
    </StructuredListing>
  )
}

// Types CellType and ActionType are already exported with their definitions above
