/**
 * Language information for content language selection.
 */
export interface Language {
  /**
   * Language identifier/code (e.g., 'en-US', 'de-DE').
   */
  readonly id: string

  /**
   * Display name for the language.
   */
  readonly displayName: string

  /**
   * Whether this language is the default language.
   */
  readonly isDefault?: boolean

  /**
   * Icon or flag identifier for the language.
   */
  readonly icon?: string
}

/**
 * Props for the ContentLanguageTemplate component.
 */
export interface ContentLanguageProps {
  /**
   * Current content language code.
   */
  readonly languageName: string

  /**
   * Available languages for content.
   */
  readonly languages: Language[]

  /**
   * Indicates whether the language selection is disabled.
   */
  readonly selectionDisabled: boolean
}

/**
 * Context value for content language state.
 */
export interface ContentContextValue {
  /**
   * Current language name/code.
   */
  readonly languageName: string

  /**
   * Whether content is multilingual.
   */
  readonly isMultilingual: boolean
}

/**
 * Navigation item for secondary menu.
 */
export interface ContentNavigationItem {
  /**
   * Unique identifier for the navigation item.
   */
  readonly id: string

  /**
   * Display label for the navigation item.
   */
  readonly label: string

  /**
   * Route path for the navigation item.
   */
  readonly path?: string

  /**
   * Icon name for the navigation item.
   */
  readonly icon?: string

  /**
   * Whether the item is active.
   */
  readonly isActive?: boolean
}

/**
 * Navigation configuration for the template.
 */
export interface ContentNavigationConfiguration {
  /**
   * Navigation items to display.
   */
  readonly items: ContentNavigationItem[]
}

/**
 * Language selector props.
 */
export interface LanguageSelectorProps {
  /**
   * Currently selected language code.
   */
  readonly selectedLanguage: string

  /**
   * Available languages.
   */
  readonly languages: Language[]

  /**
   * Whether language selection is disabled.
   */
  readonly selectionDisabled: boolean

  /**
   * Function to resolve path for a given language.
   */
  readonly pathResolver: (languageId: string) => string
}

/**
 * Selector group values for status bar navigation.
 */
export interface SelectorGroupValues {
  /**
   * Function to resolve path for a given language.
   */
  readonly languagePathResolver: (languageId: string) => string

  /**
   * Selected language name.
   */
  readonly selectedLanguageName: string

  /**
   * Available languages.
   */
  readonly languages: Language[]
}
