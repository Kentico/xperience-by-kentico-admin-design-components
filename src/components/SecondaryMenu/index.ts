// Components
export { SecondaryMenu } from './SecondaryMenu'
export { SecondaryMenuCell } from './SecondaryMenuCell'
export { SecondaryMenuWrapper } from './SecondaryMenuWrapper'
export { SecondaryMenuHeadline } from './SecondaryMenuHeadline'

// Context & Provider
export {
  SecondaryMenuNavigationContext,
  useSecondaryMenuNavigation,
} from './SecondaryMenuNavigationContext'
export { SecondaryMenuNavigationProvider } from './SecondaryMenuNavigationProvider'

// Hooks
export { useIsPathActive } from './hooks/useIsPathActive'
export { usePagePath } from './hooks/usePagePath'

// Utilities
export { trimLeadingPath, normalizePath } from './utils/pathUtils'
export { getPathWithoutBasePath, getBaseUri } from './utils/basePathUtils'

// Types
export type {
  NavigationItem,
  NavigationConfiguration,
  NavigationStackItem,
  SecondaryMenuNavigationContextType,
  SecondaryMenuProps,
  SecondaryMenuCellProps,
  SecondaryMenuWrapperProps,
  SecondaryMenuHeadlineProps,
} from './SecondaryMenu.types'
