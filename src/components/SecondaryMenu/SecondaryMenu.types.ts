import type { ReactNode } from 'react'

/**
 * Navigation item configuration for the secondary menu.
 */
export interface NavigationItem {
  /** Unique identifier for the navigation item */
  id: string
  /** Display label for the menu item */
  label: string
  /** Path/URL for navigation */
  path: string
  /** Whether this item is disabled */
  disabled?: boolean
  /** Message to show when item is inactive/disabled */
  inactiveMessage?: string
  /** Nested navigation items for sub-menus */
  children?: NavigationItem[]
  /** Headline to display above children when expanded */
  childrenHeadline?: string
}

/**
 * Navigation configuration for a menu level.
 */
export interface NavigationConfiguration {
  /** Navigation items to display in the menu */
  items: NavigationItem[]
  /** Section headline text for this navigation level */
  headline?: string
  /** Whether to display the section headline */
  showHeadline?: boolean
}

/**
 * A single entry in the navigation stack.
 */
export interface NavigationStackItem {
  navigation: NavigationConfiguration
  pagePath: string
}

/**
 * Context value for the secondary menu navigation stack.
 */
export interface SecondaryMenuNavigationContextType {
  navigation: NavigationStackItem[]
  push: (nav: NavigationConfiguration, path: string) => void
  pop: () => void
}

/**
 * Props for the SecondaryMenu component.
 */
export interface SecondaryMenuProps {
  /** The nesting level of the menu (0 = top level) */
  level: number
  /** Controlled active path — overrides window.location when provided */
  activePath?: string
  /** Callback when a menu item is clicked — overrides default window.location navigation */
  onNavigate?: (path: string) => void
}

/**
 * Props for the SecondaryMenuCell component.
 */
export interface SecondaryMenuCellProps {
  /** The navigation item to render */
  item: NavigationItem
  /** Whether this item is currently active */
  isActive: boolean
  /** Click handler */
  onClick?: () => void
}

/**
 * Props for the SecondaryMenuWrapper component.
 */
export interface SecondaryMenuWrapperProps {
  /** Content to render inside the wrapper */
  children: ReactNode
}

/**
 * Props for the SecondaryMenuHeadline component.
 */
export interface SecondaryMenuHeadlineProps {
  /** Headline text */
  children: ReactNode
  /** Nesting level for width styling (0 = main, 1 = submenu-1, 2 = submenu-2) */
  level?: number
}
