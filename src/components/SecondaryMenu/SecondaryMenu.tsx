import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import type { NavigationItem, SecondaryMenuProps } from './SecondaryMenu.types'
import { useSecondaryMenuNavigation } from './SecondaryMenuNavigationContext'
import { usePagePath } from './hooks/usePagePath'
import { useIsPathActive } from './hooks/useIsPathActive'
import { SecondaryMenuCell } from './SecondaryMenuCell'
import { SecondaryMenuHeadline } from './SecondaryMenuHeadline'
import { SecondaryMenuWrapper } from './SecondaryMenuWrapper'
import './SecondaryMenu.css'

/**
 * Recursive renderer for menu items.
 * Renders items with support for nested children at depth levels 0, 1, and 2.
 *
 * An item with children is never shown as "active" (purple highlight) — it is
 * only "expanded" (children visible). Only leaf items can be active.
 */
function RecursiveMenuItems({
  items,
  currentPath,
  depth,
  onNavigate,
}: {
  items: NavigationItem[]
  currentPath: string
  depth: number
  onNavigate?: (path: string) => void
}) {
  const navigate = useNavigate()

  return (
    <>
      {items.map((item) => {
        const isPathMatch = useIsPathActive(currentPath, item.path)
        const hasChildren = Boolean(item.children?.length)

        // Items with children expand but don't show the active highlight.
        // Only leaf items (no children) show the purple active state.
        const isExpanded = isPathMatch && hasChildren
        const isActive = isPathMatch && !hasChildren

        return (
          <div key={item.id || item.path}>
            <SecondaryMenuCell
              item={item}
              isActive={isActive}
              onClick={() => {
                if (!item.disabled) {
                  if (onNavigate) {
                    onNavigate(item.path)
                  } else {
                    navigate(item.path)
                  }
                }
              }}
            />
            {isExpanded && (
              <div
                className={
                  depth === 0 ? 'SecondaryMenu-submenuWrapper1' : 'SecondaryMenu-submenuWrapper2'
                }
              >
                <div className={'SecondaryMenu-submenu'} role="menu">
                  <SecondaryMenuHeadline level={depth + 1}>
                    {item.childrenHeadline ?? item.label}
                  </SecondaryMenuHeadline>
                  <RecursiveMenuItems
                    items={item.children!}
                    currentPath={currentPath}
                    depth={depth + 1}
                    onNavigate={onNavigate}
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

/**
 * SecondaryMenu — Recursive navigation menu for section layouts.
 *
 * Displays navigation items from the navigation stack at the specified level.
 * Level 0 gets a paper-style wrapper. Sub-menus are rendered recursively
 * when the parent item is active and has children.
 *
 * Supports a controlled mode via `activePath` and `onNavigate` props,
 * which override the default window.location-based navigation.
 *
 * @example
 * ```tsx
 * <SecondaryMenuNavigationProvider>
 *   <SecondaryMenu level={0} />
 * </SecondaryMenuNavigationProvider>
 * ```
 */
export function SecondaryMenu({ level, activePath, onNavigate }: SecondaryMenuProps) {
  const { navigation } = useSecondaryMenuNavigation()
  const windowPath = usePagePath()
  const currentPath = activePath ?? windowPath

  const navAtLevel = navigation[level]

  if (!navAtLevel || !navAtLevel.navigation.items.length) {
    return null
  }

  const menuContent = (
    <nav className={'SecondaryMenu-menu'} role="menu">
      {navAtLevel.navigation.showHeadline && navAtLevel.navigation.headline && (
        <SecondaryMenuHeadline level={level}>
          {navAtLevel.navigation.headline}
        </SecondaryMenuHeadline>
      )}
      <RecursiveMenuItems
        items={navAtLevel.navigation.items}
        currentPath={currentPath}
        depth={0}
        onNavigate={onNavigate}
      />
    </nav>
  )

  if (level === 0) {
    return <SecondaryMenuWrapper>{menuContent}</SecondaryMenuWrapper>
  }

  return menuContent
}
