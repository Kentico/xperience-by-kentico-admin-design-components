import * as React from 'react';
import { createContext, useContext, type MouseEvent } from 'react'
import {
  ViewMenu,
  ApplicationTile,
  ApplicationTileState,
  RoutingContentPlaceholder,
} from '@/components'
import type {
  SideNavigationLayoutTemplateProps,
  SideNavigationLayoutComponentProps,
  TemplateProperties,
  ViewMenuItemProps,
} from './SideNavigationLayoutTemplate.types'
import './SideNavigationLayoutTemplate.css'

// Default template properties when none provided
const defaultTemplateProperties: TemplateProperties = {
  routes: [],
  navigation: {
    items: [],
  },
}

/**
 * Context for template properties.
 * In the full implementation, this comes from the routing system.
 */
const TemplatePropertiesContext = createContext<TemplateProperties>(
  defaultTemplateProperties
)

/**
 * Simple hook stub for path active state.
 * In the full implementation, this compares with React Router location.
 */
function useIsPathActive(path: string): { isActive: boolean } {
  // In showcase/demo mode, we can't know the actual route
  // Default to checking if the path matches current window location
  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : ''
  return { isActive: currentPath.includes(path) }
}

/**
 * ViewMenuItem - Navigation menu item that uses ApplicationTile.
 *
 * Automatically handles active state by comparing current location with provided path.
 */
function ViewMenuItem({
  onClick,
  path,
  disabled = false,
  label,
  iconName,
  tooltip,
}: ViewMenuItemProps) {
  const { isActive } = useIsPathActive(path)

  const getItemState = (): ApplicationTileState => {
    if (disabled) {
      return ApplicationTileState.Disabled
    }
    return isActive ? ApplicationTileState.Activated : ApplicationTileState.Default
  }

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <ApplicationTile
      label={label}
      iconName={iconName}
      tooltip={tooltip}
      state={getItemState()}
      link={path}
      onClick={handleClick}
    />
  )
}

/**
 * ContentWithSidebarLayoutWrapper - Simple layout wrapper for sidebar + content.
 *
 * This is a simplified stub. The full implementation includes:
 * - Resizable sidebar
 * - Custom right sidebar support
 * - Responsive behavior
 */
function ContentWithSidebarLayoutWrapper({
  sidebarContent,
  children,
}: {
  sidebarContent: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className={'SideNavigationLayoutTemplate-layoutWrapper'}>
      <div className={'SideNavigationLayoutTemplate-content'}>
        {sidebarContent ? (
          <div className={'SideNavigationLayoutTemplate-scrollable'}>{children}</div>
        ) : (
          children
        )}
      </div>
      {sidebarContent && <div className={'SideNavigationLayoutTemplate-sidebar'}>{sidebarContent}</div>}
    </div>
  )
}

/**
 * SideNavigationLayoutComponent - Layout component with side navigation menu.
 *
 * Displays a ViewMenu in the sidebar with navigation items from template properties.
 * The menu is only shown when there are multiple routes and navigation items.
 *
 * Features:
 * - Side navigation with ViewMenu
 * - Navigation items rendered as ApplicationTiles
 * - Active state detection based on current path
 * - Sidebar placeholder for additional custom content
 */
function SideNavigationLayoutComponent({
  children,
}: SideNavigationLayoutComponentProps) {
  const templateProperties = useContext(TemplatePropertiesContext)

  const displayMenu =
    templateProperties.routes.length > 1 &&
    templateProperties.navigation.items.length > 0

  return (
    <ContentWithSidebarLayoutWrapper
      sidebarContent={
        <>
          {displayMenu && (
            <div className={'SideNavigationLayoutTemplate-viewMenuWrapper'}>
              <ViewMenu>
                {templateProperties.navigation.items.map((navItem) => (
                  <ViewMenuItem
                    key={navItem.path}
                    label={navItem.label}
                    disabled={navItem.disabled}
                    iconName={navItem.icon ?? 'xp-placeholder'}
                    tooltip={navItem.inactiveMessage}
                    path={navItem.path}
                  />
                ))}
              </ViewMenu>
            </div>
          )}
          <div id="sideMenuPlaceholder"></div>
        </>
      }
    >
      {children}
    </ContentWithSidebarLayoutWrapper>
  )
}

/**
 * SideNavigationLayoutTemplate - Page template with side navigation.
 *
 * This template provides a layout with a side navigation menu that displays
 * ApplicationTile-based navigation items. It wraps content in a
 * ContentWithSidebarLayoutWrapper.
 *
 * Features:
 * - Side navigation menu with ViewMenu component
 * - Navigation items from templateProperties
 * - Routing content placeholder for nested routes
 * - Configurable via TemplatePropertiesContext
 *
 * @example
 * ```tsx
 * <SideNavigationLayoutTemplate
 *   templateProperties={{
 *     routes: [{ path: '/overview' }, { path: '/details' }],
 *     navigation: {
 *       items: [
 *         { label: 'Overview', path: '/overview', icon: 'xp-overview' },
 *         { label: 'Details', path: '/details', icon: 'xp-details' },
 *       ],
 *     },
 *   }}
 * >
 *   <YourContent />
 * </SideNavigationLayoutTemplate>
 * ```
 */
export function SideNavigationLayoutTemplate({
  templateProperties = defaultTemplateProperties,
  children,
}: SideNavigationLayoutTemplateProps) {
  return (
    <TemplatePropertiesContext.Provider value={templateProperties}>
      <SideNavigationLayoutComponent>
        <RoutingContentPlaceholder>{children}</RoutingContentPlaceholder>
      </SideNavigationLayoutComponent>
    </TemplatePropertiesContext.Provider>
  )
}

// Also export the sub-components for flexibility
export { SideNavigationLayoutComponent, ViewMenuItem }
