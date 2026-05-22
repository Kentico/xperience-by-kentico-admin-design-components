import * as React from 'react';
import { useState, useCallback, type ReactNode } from 'react'
import type {
  NavigationConfiguration,
  NavigationStackItem,
} from './SecondaryMenu.types'
import { SecondaryMenuNavigationContext } from './SecondaryMenuNavigationContext'

/**
 * Navigation stack provider for the secondary menu.
 * Manages the hierarchy of navigation configurations for nested section layouts.
 *
 * Each section that has secondary navigation pushes its configuration onto the stack.
 * When the section unmounts, it pops its configuration off the stack.
 */
export function SecondaryMenuNavigationProvider({
  children,
  initialNavigation,
}: {
  children: ReactNode
  initialNavigation?: NavigationStackItem[]
}) {
  const [navigationStack, setNavigationStack] = useState<NavigationStackItem[]>(
    initialNavigation ?? []
  )

  const push = useCallback((nav: NavigationConfiguration, path: string) => {
    setNavigationStack((prev) => [...prev, { navigation: nav, pagePath: path }])
  }, [])

  const pop = useCallback(() => {
    setNavigationStack((prev) => prev.slice(0, -1))
  }, [])

  return (
    <SecondaryMenuNavigationContext.Provider
      value={{ navigation: navigationStack, push, pop }}
    >
      {children}
    </SecondaryMenuNavigationContext.Provider>
  )
}
