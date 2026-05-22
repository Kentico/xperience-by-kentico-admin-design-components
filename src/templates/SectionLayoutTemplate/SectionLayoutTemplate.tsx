import * as React from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import classNames from 'classnames'
import { RoutingContentPlaceholder } from '@/components'
import {
  SecondaryMenu,
  SecondaryMenuNavigationProvider,
  useSecondaryMenuNavigation,
  usePagePath,
} from '@/components/SecondaryMenu'
import type {
  SectionLayoutTemplateProps,
  SectionLayoutProps,
  TemplateProperties,
} from './SectionLayoutTemplate.types'
import './SectionLayoutTemplate.css'

// Menu element ID for portal targeting
const MENU_ID = 'vertical-menu-wrapper'

// Context to signal that a parent SectionLayout already provides a menu
const SectionLayoutMenuContext = createContext(false)

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
 * @internal - Currently unused but kept for future integration
 */
export const TemplatePropertiesContext = createContext<TemplateProperties>(
  defaultTemplateProperties
)

/**
 * Stub provider for custom right sidebar.
 * The full implementation allows template content to render in a right sidebar.
 */
function CustomRightSidebarProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

/**
 * SectionLayout - Layout component for sections with secondary navigation.
 *
 * Conditionally displays a secondary menu based on navigation configuration.
 * The menu is only shown when there are multiple navigation levels or items.
 */
export function SectionLayout({ children }: SectionLayoutProps) {
  const hasParentMenu = useContext(SectionLayoutMenuContext)

  const { navigation } = useSecondaryMenuNavigation()

  const displayMenu = useMemo(
    () =>
      navigation.length > 1 ||
      navigation.some((nav) => nav.navigation.items.length > 1),
    [navigation]
  )

  const templateClasses = classNames(
    'SectionLayoutTemplate-templateWrapper',
    displayMenu && 'SectionLayoutTemplate-templateWrapperWithMenu'
  )

  if (hasParentMenu) {
    return <RoutingContentPlaceholder>{children}</RoutingContentPlaceholder>
  }

  return (
    <SectionLayoutMenuContext.Provider value={true}>
      <div className={templateClasses}>
        <div id={MENU_ID} className={'SectionLayoutTemplate-menu'}>
          <SecondaryMenu level={0} />
        </div>
        <div className={'SectionLayoutTemplate-contentWrapperFlexible'}>
          <div className={'SectionLayoutTemplate-contentWrapper'}>
            <RoutingContentPlaceholder>{children}</RoutingContentPlaceholder>
          </div>
        </div>
      </div>
    </SectionLayoutMenuContext.Provider>
  )
}

/**
 * SectionLayoutTemplate - Template for section-level pages with secondary navigation.
 *
 * This template provides a layout with:
 * - Secondary menu navigation in a sidebar
 * - Nested section support via navigation stack
 * - Custom right sidebar placeholder
 * - Routing content placeholder for nested routes
 *
 * @example
 * ```tsx
 * <SectionLayoutTemplate
 *   templateProperties={{
 *     routes: [{ path: '/section' }],
 *     navigation: {
 *       items: [
 *         { id: '1', label: 'Overview', path: '/section/overview', icon: 'xp-overview' },
 *         { id: '2', label: 'Settings', path: '/section/settings', icon: 'xp-settings' },
 *       ],
 *     },
 *   }}
 * >
 *   <YourSectionContent />
 * </SectionLayoutTemplate>
 * ```
 */
export function SectionLayoutTemplate({
  templateProperties = defaultTemplateProperties,
  children,
  __initialNavPushed = false,
}: SectionLayoutTemplateProps & { __initialNavPushed?: boolean }) {
  const { push, pop } = useSecondaryMenuNavigation()
  const pagePath = usePagePath()
  const initialPushedRef = useRef(__initialNavPushed)

  useEffect(() => {
    const { items } = templateProperties.navigation

    // Skip the first push if initialNavigation was already provided to the provider
    if (initialPushedRef.current) {
      initialPushedRef.current = false
      return pop
    }

    if (items.length) {
      push(templateProperties.navigation, pagePath)
    }

    return pop
  }, [templateProperties.navigation, pagePath, push, pop])

  return (
    <CustomRightSidebarProvider>
      <SectionLayout>{children}</SectionLayout>
    </CustomRightSidebarProvider>
  )
}

/**
 * SectionLayoutTemplateWithProvider - Wrapper that includes the NavigationStackProvider.
 *
 * Use this at the app root level when you need full navigation stack functionality.
 */
export function SectionLayoutTemplateWithProvider(props: SectionLayoutTemplateProps) {
  const { templateProperties = defaultTemplateProperties } = props
  const pagePath = usePagePath()

  const initialNavigation = useMemo(() => {
    const { items } = templateProperties.navigation
    if (items.length) {
      return [{ navigation: templateProperties.navigation, pagePath }]
    }
    return []
  }, [templateProperties.navigation, pagePath])

  const hasInitialNav = initialNavigation.length > 0

  return (
    <SecondaryMenuNavigationProvider initialNavigation={initialNavigation}>
      <SectionLayoutTemplate {...props} __initialNavPushed={hasInitialNav} />
    </SecondaryMenuNavigationProvider>
  )
}

// Re-export sub-components for flexibility
export { SecondaryMenu, SecondaryMenuNavigationProvider as NavigationStackProvider }
