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
  /** Icon name to display */
  icon?: string
  /** Whether this item is disabled */
  disabled?: boolean
  /** Message to show when item is inactive */
  inactiveMessage?: string
  /** Nested navigation items for sub-menus */
  children?: NavigationItem[]
  /** Headline to display above children when expanded */
  childrenHeadline?: string
}

/**
 * Navigation configuration for the template.
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
 * Template properties provided via context.
 */
export interface TemplateProperties {
  /** Available routes in this section */
  routes: { path: string }[]
  /** Navigation configuration for the secondary menu */
  navigation: NavigationConfiguration
}

/**
 * Props for the SecondaryMenu component.
 */
export interface SecondaryMenuProps {
  /** The nesting level of the menu (0 = top level) */
  level: number
}

/**
 * Props for the SectionLayout component.
 */
export interface SectionLayoutProps {
  /** Child content to render in the main area */
  children?: ReactNode
}

/**
 * Props for the SectionLayoutTemplate component.
 */
export interface SectionLayoutTemplateProps {
  /** Template properties for navigation configuration */
  templateProperties?: TemplateProperties
  /** Child content to render */
  children?: ReactNode
}
