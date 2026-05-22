import type { ReactNode, MouseEvent } from 'react'

/**
 * Navigation item configuration for side navigation menu
 */
export interface NavigationItem {
  /** Display label for the navigation item */
  readonly label: string
  /** Path to navigate to when clicked */
  readonly path: string
  /** Icon name for the navigation item */
  readonly icon?: string
  /** Whether the navigation item is disabled */
  readonly disabled?: boolean
  /** Message to display when the item is inactive/disabled */
  readonly inactiveMessage?: string
}

/**
 * Navigation configuration containing items
 */
export interface NavigationConfig {
  /** Array of navigation items to display */
  readonly items: NavigationItem[]
}

/**
 * Route configuration for determining navigation visibility
 */
export interface RouteConfig {
  /** Path of the route */
  readonly path: string
}

/**
 * Template properties context shape
 */
export interface TemplateProperties {
  /** Routes configured for this template */
  readonly routes: RouteConfig[]
  /** Navigation configuration */
  readonly navigation: NavigationConfig
}

/**
 * Props for ViewMenuItem component
 */
export interface ViewMenuItemProps {
  /** Display label */
  readonly label: string
  /** Icon name */
  readonly iconName: string
  /** Tooltip text */
  readonly tooltip?: string
  /** Whether the item is disabled */
  readonly disabled?: boolean
  /** Navigation path */
  readonly path: string
  /** Click handler */
  readonly onClick?: (event: MouseEvent<HTMLElement>) => void
}

/**
 * Props for SideNavigationLayoutComponent
 */
export interface SideNavigationLayoutComponentProps {
  /** Children to render in the main content area */
  readonly children: ReactNode
}

/**
 * Props for SideNavigationLayoutTemplate
 */
export interface SideNavigationLayoutTemplateProps {
  /**
   * Template properties containing routes and navigation configuration.
   * If not provided, defaults to showing no navigation menu.
   */
  readonly templateProperties?: TemplateProperties
  /**
   * Children to render in the content placeholder area.
   */
  readonly children?: ReactNode
}
