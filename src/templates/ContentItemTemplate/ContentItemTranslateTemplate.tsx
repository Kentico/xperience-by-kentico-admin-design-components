import * as React from 'react';
/**
 * ContentItemTranslateTemplate
 *
 * Template for cascade translation of content items, allowing users to
 * select linked content items to translate together.
 *
 * Features:
 * - Cascade translation of linked content items
 * - Table view with selectable rows
 * - Validation of selected items
 * - Side panel integration
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
} from 'react'
import {
  Button,
  ButtonColor,
  Checkbox,
} from '@/components'
import { ContentItemCommandResultStatus } from './ContentItemEditTemplate.types'
import type {
  ContentItemTranslateProps,
  CascadeTranslateCommandArguments,
  CascadeTranslateCommandResult,
  TableComponentBaseProps,
  TableRow,
  TableRowId,
  TableManager,
  SidePanelSize,
  NestedPageActions,
  TableAction,
} from './ContentItemTranslateTemplate.types'
import { SidePanelSize as SidePanelSizeConst } from './ContentItemTranslateTemplate.types'
import './ContentItemTranslateTemplate.css'

// ============================================================================
// Local Translations
// ============================================================================

const translations = {
  'admin.contentHub.createLanguageVariant.cascadeTranslate.refresh.label':
    'Refresh',
} as const

function t(key: keyof typeof translations): string {
  return translations[key] ?? key
}

// ============================================================================
// Stub Hooks
// ============================================================================

/**
 * Stub hook for template side panel.
 */
function useTemplateSidePanel(): {
  setTitle: (title: string) => void
  setSize: (size: SidePanelSize) => void
  setActionInProgress: (inProgress: boolean) => void
} {
  return {
    setTitle: (_title: string) => {
      // Stub: would set side panel title
    },
    setSize: (_size: SidePanelSize) => {
      // Stub: would set side panel size
    },
    setActionInProgress: (_inProgress: boolean) => {
      // Stub: would set action in progress state
    },
  }
}

/**
 * Stub hook for nested page actions.
 */
function useNestedPage(): {
  setActions: (actions: NestedPageActions) => void
} {
  return {
    setActions: (_actions: NestedPageActions) => {
      // Stub: would set nested page actions
    },
  }
}

/**
 * Stub hook for notifications.
 */
function useNotifications(): {
  clearMessages: () => void
  showSuccess: (message: string) => void
  showError: (message: string) => void
} {
  return {
    clearMessages: () => {
      // Stub: would clear notification messages
    },
    showSuccess: (_message: string) => {
      // Stub: would show success notification
    },
    showError: (_message: string) => {
      // Stub: would show error notification
    },
  }
}

/**
 * Stub hook for navigation.
 */
function useNavigate(): (url: string) => void {
  return (url: string) => {
    // Stub: would navigate to URL
    if (typeof window !== 'undefined') {
      window.location.href = url
    }
  }
}

/**
 * Stub hook for editable object status observer.
 */
function useEditableObjectStatusObserver(): {
  resetAllDataChanged: () => void
} {
  return {
    resetAllDataChanged: () => {
      // Stub: would reset all data changed flags
    },
  }
}

/**
 * Stub hook for editable object status observee.
 */
function useEditableObjectStatusObservee(): {
  setDataChanged: (id: string, changed: boolean) => void
  getNewId: () => string
} {
  let idCounter = 0
  return {
    setDataChanged: (_id: string, _changed: boolean) => {
      // Stub: would set data changed state
    },
    getNewId: () => {
      return `data-changed-${++idCounter}`
    },
  }
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
      // Stub: In real implementation, this would call server
      return undefined
    },
    []
  )

  return { executeCommand }
}

/**
 * Stub hook for table manager.
 */
function useTableManager(
  _commandName: string,
  _tableProps: TableComponentBaseProps
): TableManager {
  const [rows] = useState<TableRow[] | null>([])
  const [isLoading] = useState(false)

  const reloadData = useCallback(async () => {
    // Stub: would reload table data from server
  }, [])

  return {
    rows,
    isLoading,
    reloadData,
    currentPage: 0,
    pageSize: 25,
    totalCount: rows?.length ?? 0,
  }
}

// ============================================================================
// Stub Components
// ============================================================================

/**
 * TableComponent - Stub table component for displaying selectable rows.
 */
interface TableComponentProps {
  readonly headerActions?: TableAction[]
  readonly isHeaderVisible?: boolean
  readonly isSearchAndActionsVisible?: boolean
  readonly usePagination?: boolean
  readonly tableManager: TableManager
  readonly isRowsSelectable?: boolean
  readonly selectedRows?: unknown[]
  readonly invalidRows?: unknown[]
  readonly onSelectedRowChange?: (identifiers: TableRowId[]) => void
  readonly headerClassName?: string
  readonly selectOnRowClick?: boolean
}

const TableComponent: FC<TableComponentProps> = ({
  headerActions,
  isHeaderVisible = true,
  tableManager,
  isRowsSelectable,
  selectedRows = [],
  invalidRows = [],
  onSelectedRowChange,
}) => {
  const { rows, isLoading } = tableManager

  const handleRowSelect = useCallback(
    (identifier: unknown, checked: boolean) => {
      if (!onSelectedRowChange) return

      const currentSelected = selectedRows as unknown[]
      if (checked) {
        onSelectedRowChange([...currentSelected, identifier])
      } else {
        onSelectedRowChange(currentSelected.filter((id) => id !== identifier))
      }
    },
    [selectedRows, onSelectedRowChange]
  )

  const isRowSelected = useCallback(
    (identifier: unknown) => {
      return (selectedRows as unknown[]).includes(identifier)
    },
    [selectedRows]
  )

  const isRowInvalid = useCallback(
    (identifier: unknown) => {
      return (invalidRows as unknown[]).includes(identifier)
    },
    [invalidRows]
  )

  if (isLoading) {
    return (
      <div className={'ContentItemTranslateTemplate-tableLoading'}>
        <span>Loading...</span>
      </div>
    )
  }

  if (!rows || rows.length === 0) {
    return (
      <div className={'ContentItemTranslateTemplate-tableEmpty'}>
        <span>No items found</span>
      </div>
    )
  }

  return (
    <div className={'ContentItemTranslateTemplate-tableWrapper'}>
      {isHeaderVisible && headerActions && headerActions.length > 0 && (
        <div className={'ContentItemTranslateTemplate-tableHeaderActions'}>
          {headerActions.map((action) => (
            <Button
              key={action.identifier}
              color={ButtonColor.Secondary}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
      <div className={'ContentItemTranslateTemplate-tableContent'}>
        {rows.map((row) => (
          <div
            key={String(row.identifier)}
            className={`${'ContentItemTranslateTemplate-tableRow'} ${isRowInvalid(row.identifier) ? 'ContentItemTranslateTemplate-tableRowInvalid' : ''}`}
          >
            {isRowsSelectable && (
              <div className={'ContentItemTranslateTemplate-tableRowCheckbox'}>
                <Checkbox
                  checked={isRowSelected(row.identifier)}
                  onChange={(_event, checked) =>
                    handleRowSelect(row.identifier, checked)
                  }
                  disabled={row.disabled}
                  name={`row-${row.identifier}`}
                />
              </div>
            )}
            <div className={'ContentItemTranslateTemplate-tableRowContent'}>
              {Object.entries(row.cells).map(([key, value]) => (
                <div key={key} className={'ContentItemTranslateTemplate-tableCell'}>
                  {String(value)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// Page Commands
// ============================================================================

const PageCommands = {
  LoadNotTranslatedLinkedContentItems: 'LoadNotTranslatedLinkedContentItems',
  CascadeTranslate: 'CascadeTranslate',
} as const

// ============================================================================
// ContentItemTranslateTemplate Component
// ============================================================================

/**
 * ContentItemTranslateTemplate - Template for cascade translation of content items.
 *
 * Provides functionality to:
 * - View linked content items that need translation
 * - Select items to include in cascade translation
 * - Execute cascade translation command
 * - Handle validation errors for invalid items
 *
 * @example
 * ```tsx
 * <ContentItemTranslateTemplate
 *   contentItemId={123}
 *   headline="Translate Article"
 *   submitLabel="Translate Selected"
 *   tableClientProperties={{
 *     columns: [
 *       { name: 'name', caption: 'Name' },
 *       { name: 'type', caption: 'Content Type' }
 *     ]
 *   }}
 * />
 * ```
 */
export const ContentItemTranslateTemplate: FC<ContentItemTranslateProps> = ({
  contentItemId,
  headline,
  submitLabel,
  tableClientProperties,
}) => {
  const { setTitle, setSize, setActionInProgress } = useTemplateSidePanel()
  const { setActions } = useNestedPage()
  const { clearMessages } = useNotifications()
  const navigate = useNavigate()

  const [selectedIdentifiers, setSelectedIdentifiers] = useState<unknown[]>([])
  const [invalidIdentifiers, setInvalidIdentifiers] = useState<unknown[]>([])

  const { resetAllDataChanged } = useEditableObjectStatusObserver()
  const { setDataChanged, getNewId } = useEditableObjectStatusObservee()
  const dataChangedId = useRef(getNewId())

  const { executeCommand } = usePageCommandProvider()

  const tableManager = useTableManager(
    PageCommands.LoadNotTranslatedLinkedContentItems,
    tableClientProperties
  )

  useEffect(() => {
    const dataChangedIdValue = dataChangedId.current
    setTitle(headline)
    setSize(SidePanelSizeConst.Stackable)

    return () => {
      setDataChanged(dataChangedIdValue, false)
    }

    // empty dependencies for first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCascadeTranslate = useCallback(async () => {
    setActionInProgress(true)
    clearMessages()

    const cascadeTranslateArgs = {
      selectedIdentifiers: selectedIdentifiers,
    } as CascadeTranslateCommandArguments

    const result = await executeCommand<
      CascadeTranslateCommandResult,
      CascadeTranslateCommandArguments
    >(PageCommands.CascadeTranslate, cascadeTranslateArgs)

    setActionInProgress(false)

    if (!result) {
      return
    }

    if (result.invalidIdentifiers.length) {
      setInvalidIdentifiers(result.invalidIdentifiers)
      return
    }

    setInvalidIdentifiers([])

    if (result.status === ContentItemCommandResultStatus.Success) {
      resetAllDataChanged()

      if (result.redirectUrl) {
        navigate(result.redirectUrl)
      }
    }
  }, [
    clearMessages,
    executeCommand,
    navigate,
    resetAllDataChanged,
    selectedIdentifiers,
    setActionInProgress,
  ])

  useEffect(() => {
    const submitAction = {
      label: submitLabel,
      onClick: async () => {
        await handleCascadeTranslate()
      },
    }
    setActions({ submitAction })
  }, [handleCascadeTranslate, setActions, submitLabel])

  useEffect(() => {
    const identifiers =
      tableManager.rows
        ?.filter(
          (row) => !row.disabled || row.identifier === contentItemId
        )
        .map((row) => row.identifier) ?? []
    setSelectedIdentifiers(identifiers)
  }, [contentItemId, tableManager.rows])

  const handleSelectedItemsChange = useCallback(
    (identifiers: TableRowId[]) => {
      setDataChanged(dataChangedId.current, true)

      // Ensures that the main content item is always selected
      if (!identifiers.includes(contentItemId)) {
        identifiers.push(contentItemId)
      }

      setSelectedIdentifiers(identifiers)
    },
    [contentItemId, setDataChanged]
  )

  const handleReloadActionClick = async () => {
    setInvalidIdentifiers([])
    clearMessages()

    await tableManager.reloadData()
  }

  const contentItemsReloadAction: TableAction = {
    identifier: 'refresh',
    type: 'client',
    parameter: 'publish-table-reload-action',
    label: t(
      'admin.contentHub.createLanguageVariant.cascadeTranslate.refresh.label'
    ),
    onClick: handleReloadActionClick,
    destructive: false,
    disabled: false,
    buttonColor: 'secondary',
  }

  return (
    <div className={'ContentItemTranslateTemplate-cascadeTranslatePanel'}>
      <TableComponent
        headerActions={[
          ...(tableClientProperties.headerActions ?? []),
          contentItemsReloadAction,
        ]}
        isHeaderVisible
        isSearchAndActionsVisible
        usePagination={false}
        tableManager={tableManager}
        isRowsSelectable
        selectedRows={selectedIdentifiers}
        invalidRows={invalidIdentifiers}
        onSelectedRowChange={handleSelectedItemsChange}
        headerClassName={'ContentItemTranslateTemplate-tableHeader'}
        selectOnRowClick
      />
    </div>
  )
}

// Re-export types and constants for convenience
export { SidePanelSizeConst as SidePanelSize }
