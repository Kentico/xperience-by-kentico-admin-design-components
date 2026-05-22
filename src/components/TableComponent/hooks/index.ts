/**
 * TableComponent Hooks
 *
 * This module exports hook types and utilities for implementing table state management.
 *
 * Note: The original source hooks (useTableManager, useTableData) had heavy dependencies
 * on Kentico admin-base systems (Forms, Commands, Templates). These types are provided
 * so consumers can implement their own hooks using the TableManager interface.
 *
 * @example Creating a custom useTableManager hook
 * ```tsx
 * import type {
 *   TableManager,
 *   TableDataLoadParameters,
 *   TableColumn,
 *   InitialTableConfiguration,
 * } from '@/components/TableComponent'
 *
 * function useTableManager(config: InitialTableConfiguration): TableManager {
 *   const [parameters, setParameters] = useState<TableDataLoadParameters>({
 *     currentPage: 1,
 *     pageSize: config.defaultPageSize,
 *     sortBy: config.defaultSortBy,
 *     sortType: config.defaultSortType,
 *     searchTerm: '',
 *   })
 *   const [rows, setRows] = useState<ActionTableRow[]>([])
 *   const [totalRowCount, setTotalRowCount] = useState(0)
 *
 *   const reloadData = async (patch?: Partial<TableDataLoadParameters>) => {
 *     const newParams = { ...parameters, ...patch }
 *     setParameters(newParams)
 *     // Fetch data with newParams...
 *   }
 *
 *   return {
 *     parameters,
 *     columns: config.columns,
 *     rows,
 *     totalRowCount,
 *     reloadData,
 *   }
 * }
 * ```
 */

// Re-export hook-related types from Table.types
export type {
  // Configuration types for hooks
  InitialTableConfiguration,
  SetParametersAction,
  // Core types needed by hooks
  TableManager,
  TableDataLoadParameters,
  TableDataLoadResult,
  TableColumn,
  ActionTableRow,
  TableRowId,
  SortType,
} from '../../Table/Table.types'
