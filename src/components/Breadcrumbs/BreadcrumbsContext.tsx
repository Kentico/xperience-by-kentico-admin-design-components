import * as React from 'react';
import { createContext, useContext, useCallback, useState, useMemo, type ReactNode } from 'react'
import type {
  BreadcrumbsContextType,
  BreadcrumbsProviderProps,
  AppBreadcrumbProps,
} from './Breadcrumbs.types'

const defaultContextValue: BreadcrumbsContextType = {
  breadcrumbs: [],
  pop: () => {},
  push: () => {},
  refreshItem: () => {},
  setStatusNode: () => {},
  statusNode: null,
}

export const BreadcrumbsContext = createContext<BreadcrumbsContextType>(defaultContextValue)
BreadcrumbsContext.displayName = 'BreadcrumbsContext'

export const useBreadcrumbs = () => useContext(BreadcrumbsContext)

export const BreadcrumbsProvider = ({ children }: BreadcrumbsProviderProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<AppBreadcrumbProps[]>([])
  const [statusNodes, setStatusNodes] = useState<ReactNode[]>([])

  const setStatusNode = useCallback((statusNode: ReactNode) => {
    setStatusNodes((nodes) =>
      nodes.length === 0 ? [...nodes, statusNode] : [...nodes.slice(0, -1), statusNode]
    )
  }, [])

  const push = useCallback((path: string, isSignificant: boolean, text: string) => {
    setBreadcrumbs((prev) => [...prev, { path, isSignificant, text }])
    if (isSignificant) {
      setStatusNodes((nodes) => [...nodes, null])
    }
  }, [])

  const pop = useCallback(() => {
    setBreadcrumbs((prev) => {
      if (prev[prev.length - 1]?.isSignificant) {
        setStatusNodes((nodes) => nodes.slice(0, -1))
      }
      // If removing the last breadcrumb remove the status regardless if the breadcrumb is significant.
      if (prev.length === 1) {
        setStatusNodes([])
      }
      return prev.slice(0, -1)
    })
  }, [])

  const refreshItem = useCallback((level: number, text: string) => {
    setBreadcrumbs((prev) => {
      const copy = [...prev]
      if (copy[level]) {
        copy[level] = { ...copy[level], text }
      }
      return copy
    })
  }, [])

  const contextValue = useMemo(
    () => ({
      breadcrumbs,
      push,
      pop,
      refreshItem,
      statusNode: statusNodes[statusNodes.length - 1],
      setStatusNode,
    }),
    [breadcrumbs, push, pop, refreshItem, statusNodes, setStatusNode]
  )

  return (
    <BreadcrumbsContext.Provider value={contextValue}>{children}</BreadcrumbsContext.Provider>
  )
}

BreadcrumbsProvider.displayName = 'BreadcrumbsProvider'
