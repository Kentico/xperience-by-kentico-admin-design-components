import * as React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { RoutingContentPlaceholder, Select, MenuItem } from '@/components'
import type {
  ContentLanguageProps,
  ContentContextValue,
  ContentNavigationConfiguration,
  SelectorGroupValues,
  LanguageSelectorProps,
} from './ContentLanguageTemplate.types'
import './ContentLanguageTemplate.css'

/**
 * ContentContext provides content language state to child components.
 */
export const ContentContext = createContext<ContentContextValue>({
  languageName: '',
  isMultilingual: false,
})

/**
 * Hook to access the content context.
 */
export function useContentContext(): ContentContextValue {
  return useContext(ContentContext)
}

/**
 * Template properties context type.
 */
interface TemplatePropertiesContextType {
  navigation: ContentNavigationConfiguration
}

/**
 * TemplatePropertiesContext provides template navigation configuration.
 */
const TemplatePropertiesContext = createContext<TemplatePropertiesContextType>({
  navigation: { items: [] },
})

/**
 * Hook to access template properties.
 */
export function useTemplateProperties(): TemplatePropertiesContextType {
  return useContext(TemplatePropertiesContext)
}

/**
 * Secondary menu navigation context type.
 */
interface SecondaryMenuNavigationContextType {
  push: (navigation: ContentNavigationConfiguration, path: string) => void
  pop: () => void
}

/**
 * Stub hook for secondary menu navigation.
 * In a real application, this manages the navigation stack.
 */
function useSecondaryMenuNavigation(): SecondaryMenuNavigationContextType {
  const push = useCallback(
    (_navigation: ContentNavigationConfiguration, _path: string) => {
      // Stub: In production, this would push to navigation stack
    },
    []
  )

  const pop = useCallback(() => {
    // Stub: In production, this would pop from navigation stack
  }, [])

  return { push, pop }
}

/**
 * Status bar navigation context type.
 */
interface StatusBarNavigationContextType {
  setSelectorGroupValues: (values: SelectorGroupValues) => void
  workspaces: Array<{ id: string; name: string }>
}

/**
 * Stub hook for status bar navigation context.
 * In a real application, this communicates with the status bar.
 */
function useStatusBarNavigationContext(): StatusBarNavigationContextType {
  const setSelectorGroupValues = useCallback((_values: SelectorGroupValues) => {
    // Stub: In production, this would update status bar selectors
  }, [])

  const workspaces = useMemo<Array<{ id: string; name: string }>>(() => [], [])

  return { setSelectorGroupValues, workspaces }
}

/**
 * Stub hook for page path.
 * Returns the current page path for routing.
 */
function usePagePath(): string {
  // In production, this would return the current router path
  // For stub, use window.location.pathname
  const [path, setPath] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.pathname)
    }
  }, [])

  return path
}

/**
 * Stub hook for route matching.
 * Simulates react-router-dom's useMatch.
 */
function useMatch(pattern: string): { params: Record<string, string | undefined> } | null {
  const path = usePagePath()

  return useMemo(() => {
    if (!path) return null

    // Simple pattern matching for :param and * wildcards
    const patternParts = pattern.split('/')
    const pathParts = path.split('/')

    const params: Record<string, string | undefined> = {}
    let restCapture = ''
    let matched = true

    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i]
      const pathPart = pathParts[i]

      if (patternPart === '*') {
        // Capture rest of path
        restCapture = pathParts.slice(i).join('/')
        params['*'] = restCapture
        break
      } else if (patternPart?.startsWith(':')) {
        // Parameter capture
        const paramName = patternPart.slice(1)
        params[paramName] = pathPart
      } else if (patternPart !== pathPart) {
        matched = false
        break
      }
    }

    if (!matched) return null

    return { params }
  }, [path, pattern])
}

/**
 * LanguageSelector component for choosing content language.
 *
 * Displays a dropdown selector for switching between available languages.
 */
function LanguageSelector({
  selectedLanguage,
  languages,
  selectionDisabled,
  pathResolver,
}: LanguageSelectorProps) {
  const handleLanguageChange = useCallback(
    (value: string | undefined) => {
      if (!value || selectionDisabled) return

      const newPath = pathResolver(value)
      if (newPath && typeof window !== 'undefined') {
        // Navigate to new language path
        window.location.href = newPath
      }
    },
    [pathResolver, selectionDisabled]
  )

  if (languages.length <= 1) {
    return null
  }

  return (
    <div className={'ContentLanguageTemplate-languageSelector'}>
      <Select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        disabled={selectionDisabled}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.id}
            value={lang.id}
            primaryLabel={lang.displayName}
          />
        ))}
      </Select>
    </div>
  )
}

/**
 * ContentLanguageTemplateProvider wraps children with required context providers.
 */
interface ContentLanguageTemplateProviderProps {
  navigation: ContentNavigationConfiguration
  children: ReactNode
}

export function ContentLanguageTemplateProvider({
  navigation,
  children,
}: ContentLanguageTemplateProviderProps) {
  const contextValue = useMemo(() => ({ navigation }), [navigation])

  return (
    <TemplatePropertiesContext.Provider value={contextValue}>
      {children}
    </TemplatePropertiesContext.Provider>
  )
}

/**
 * ContentLanguageTemplate - Template for content language selection and routing.
 *
 * This template provides:
 * - Language selector for switching between content languages
 * - Integration with status bar navigation
 * - Secondary menu navigation support
 * - Content context for child components
 *
 * @example
 * ```tsx
 * <ContentLanguageTemplate
 *   languageName="en-US"
 *   languages={[
 *     { id: 'en-US', displayName: 'English (US)', isDefault: true },
 *     { id: 'de-DE', displayName: 'German' },
 *   ]}
 *   selectionDisabled={false}
 * />
 * ```
 */
export function ContentLanguageTemplate({
  languageName,
  languages,
  selectionDisabled,
}: ContentLanguageProps) {
  const { navigation } = useContext(TemplatePropertiesContext)
  const { push, pop } = useSecondaryMenuNavigation()
  const pagePath = usePagePath()
  const pathPrefix = pagePath.substring(0, pagePath.lastIndexOf('/'))
  const match = useMatch(`${pathPrefix}/:currentLanguage/*`)
  const rest = match?.params['*'] ?? ''

  const { setSelectorGroupValues, workspaces } = useStatusBarNavigationContext()

  // Update status bar selector values when language or path changes
  useEffect(() => {
    setSelectorGroupValues({
      languagePathResolver: (languageId: string) => `/${pathPrefix}/${languageId}/${rest}`,
      selectedLanguageName: languageName,
      languages,
    })

    return () => {
      setSelectorGroupValues({
        languagePathResolver: () => '',
        selectedLanguageName: '',
        languages: [],
      })
    }
  }, [pagePath, pathPrefix, rest, setSelectorGroupValues, languageName, languages])

  // Manage secondary menu navigation stack
  useEffect(() => {
    const { items } = navigation

    if (items.length) {
      push(navigation, pagePath)
    }

    return pop
  }, [navigation, pagePath, push, pop])

  // Memoize content context value
  const contextValue = useMemo<ContentContextValue>(
    () => ({
      languageName,
      isMultilingual: languages.length > 1,
    }),
    [languageName, languages]
  )

  return (
    <ContentContext.Provider value={contextValue}>
      {workspaces.length <= 1 && (
        <LanguageSelector
          selectedLanguage={languageName}
          languages={languages}
          selectionDisabled={selectionDisabled}
          pathResolver={(languageId: string) => `/${pathPrefix}/${languageId}/${rest}`}
        />
      )}
      <RoutingContentPlaceholder />
    </ContentContext.Provider>
  )
}

ContentLanguageTemplate.displayName = 'ContentLanguageTemplate'
