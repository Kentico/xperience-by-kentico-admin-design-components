import * as React from 'react';
import { useMemo } from 'react'
import type { TableContextProps, TableContextType } from './TableContext.types'
import { TableContext } from './TableContext'

/**
 * Provider component for Table context.
 * Provides scroll state and action availability to table sub-components.
 */
export const TableContextProvider = ({
  scrollState,
  hasActions,
  children,
}: TableContextProps) => {
  const contextValue = useMemo<TableContextType>(
    () => ({
      scrollState,
      hasActions,
    }),
    [scrollState, hasActions]
  )

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  )
}

TableContextProvider.displayName = 'TableContextProvider'
