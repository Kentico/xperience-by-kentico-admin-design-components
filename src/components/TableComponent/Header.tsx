import * as React from 'react';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { Button } from '@/components/Button'
import { ButtonColor, ButtonSize } from '@/components/Button/Button.types'
import { SearchInput } from '@/components/SearchInput'
import type { TableAction, TableHeaderRef } from '../Table/Table.types'
import type { HeaderProps, TableHeaderTexts } from './TableComponent.types'
import './TableComponent.css'

/**
 * Default text labels for the Header component.
 */
const defaultTexts: TableHeaderTexts = {
  searchPlaceholder: 'Search...',
  filterButtonLabel: 'Filter',
}

/**
 * Renders header action buttons.
 */
const ActionList = ({
  actions,
}: {
  readonly actions?: TableAction[]
}) => {
  if (!actions?.length) return null

  return (
    <>
      {actions.map((action, index) => (
        <Button
          key={action.identifier ?? index}
          label={action.label}
          color={ButtonColor.Secondary}
          size={ButtonSize.M}
          icon={action.icon}
          disabled={action.disabled}
          destructive={action.destructive}
          onClick={action.onClick}
          title={action.title}
        />
      ))}
    </>
  )
}

/**
 * Header sub-component for the TableComponent.
 *
 * Renders the table header area containing:
 * - Action buttons (from headerActions prop)
 * - Search input (if table has searchable columns)
 *
 * This is a simplified version that removes:
 * - Form system dependencies (FormFieldContext, FormComponentProps)
 * - Command system (useCommandProvider, executeCommand)
 * - Filter panel integration (consumers can add their own filter UI via children)
 * - i18n (replaced with texts prop)
 *
 * @example
 * ```tsx
 * <Header
 *   tableManager={tableManager}
 *   headerActions={[{ label: 'Add', icon: 'xp-plus', onClick: handleAdd }]}
 *   searchAndActionsVisible
 *   texts={{ searchPlaceholder: 'Search items...' }}
 * />
 * ```
 */
export const Header = forwardRef<TableHeaderRef, HeaderProps>(
  (
    {
      tableManager,
      headerActions,
      searchAndActionsVisible = true,
      showSearchAndActionsWhenEmpty = false,
      texts = defaultTexts,
      children,
    },
    ref
  ) => {
    const [searchInputValue, setSearchInputValue] = useState<string>(
      tableManager.parameters.searchTerm
    )
    // Filter panel state - used via ref.openFilterPanel()
    const [, setIsFilterPanelOpen] = useState(false)

    // Expose openFilterPanel method via ref
    useImperativeHandle(
      ref,
      () => ({
        openFilterPanel: () => {
          setIsFilterPanelOpen(true)
        },
      }),
      []
    )

    const hasAnyRow = tableManager.rows && tableManager.rows.length > 0
    const hasAnySearchableColumn =
      tableManager.columns.filter((c) => c.searchable).length > 0
    const areTableDataFiltered = !!tableManager.parameters.searchTerm

    const isSearchVisible =
      searchAndActionsVisible &&
      hasAnySearchableColumn &&
      (hasAnyRow || areTableDataFiltered || showSearchAndActionsWhenEmpty)

    const handleSearchCleared = useCallback(async () => {
      setSearchInputValue('')
      await tableManager.reloadData({
        searchTerm: '',
      })
    }, [tableManager])

    const searchHandler = useCallback(async () => {
      await tableManager.reloadData({
        searchTerm: searchInputValue,
      })
    }, [searchInputValue, tableManager])

    const handleSearchChange = useCallback((value: string) => {
      setSearchInputValue(value)
    }, [])

    if (!searchAndActionsVisible) {
      return children ? <div className={'TableComponent-header'}>{children}</div> : null
    }

    const mergedTexts = { ...defaultTexts, ...texts }

    return (
      <div className={'TableComponent-header'}>
        <div className={'TableComponent-actions'}>
          <div className={'TableComponent-actionsRow'}>
            <ActionList actions={headerActions} />
            {isSearchVisible && (
              <SearchInput
                value={searchInputValue}
                placeholder={mergedTexts.searchPlaceholder}
                onChange={handleSearchChange}
                onSubmit={searchHandler}
                clearable
                onClear={handleSearchCleared}
                name="table-search"
              />
            )}
          </div>
          {children}
        </div>
      </div>
    )
  }
)

Header.displayName = 'Header'
