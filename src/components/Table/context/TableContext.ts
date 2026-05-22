import { createContext, useContext } from 'react'
import type { TableContextType } from './TableContext.types'
import { ScrollState } from '../Table.types'

/**
 * Context for sharing table state (scroll state, has actions) across table components.
 */
export const TableContext = createContext<TableContextType | null>(null)
TableContext.displayName = 'TableContext'

/**
 * Default context value when used outside of a TableContextProvider.
 */
const defaultContext: TableContextType = {
  scrollState: ScrollState.NoScroll,
  hasActions: false,
}

/**
 * Hook to access the Table context.
 * Returns the context value or defaults if used outside of a provider.
 */
export const useTableContext = (): TableContextType => {
  const context = useContext(TableContext)
  return context ?? defaultContext
}
