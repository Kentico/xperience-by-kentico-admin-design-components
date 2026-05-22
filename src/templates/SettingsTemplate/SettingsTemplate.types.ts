import type { ReactNode } from 'react'
import type { CalloutType, CalloutPlacementType } from '@/components'

// Type definitions for SettingsTemplate

/**
 * Category names dictionary - maps category IDs to display names
 */
export type CategoryNamesDictionary = { [key: string]: string }

/**
 * Context type for settings state management
 */
export interface SettingsContextType {
  invokeOnSubmitHandler: () => Promise<void>
  registerOnSubmitHandler: (handler: () => Promise<void>) => void
  registerClearSearchHandler: (handler: () => void) => void
  searchFilter: string
  setSearchFilter: (value: string) => void
  settingsCategoryNames: CategoryNamesDictionary
}

/**
 * Provider props for SettingsContext
 */
export interface SettingsContextProviderProps {
  readonly categories: { [key: number]: string }
  readonly children: ReactNode
}

/**
 * Callout configuration for server-driven callouts
 */
export interface CalloutConfiguration {
  readonly headline?: string
  readonly content: string
  readonly actionButton?: CalloutButtonConfiguration
  readonly type: CalloutType
  readonly placement: CalloutPlacementType
  readonly contentAsHtml?: boolean
}

/**
 * Button configuration for callout actions
 */
export interface CalloutButtonConfiguration {
  readonly text: string
  readonly clickCommandName?: string
  readonly statusCommandName?: string
  readonly redirectUrl?: string
  readonly openInNewTab?: boolean
  readonly icon?: string
  disabled: boolean
  inProgress: boolean
}

/**
 * Form component props stub - represents a form field configuration
 */
export interface FormComponentProps {
  readonly name: string
  readonly label?: string
  readonly value?: unknown
  readonly componentName?: string
  readonly properties?: Record<string, unknown>
  readonly validationResults?: ValidationResult[]
}

/**
 * Validation result type
 */
export interface ValidationResult {
  readonly isValid: boolean
  readonly errorMessage?: string
}

/**
 * Extended validation result with additional metadata
 */
export interface ExtendedValidationResult extends ValidationResult {
  readonly ruleName?: string
}

/**
 * Validated value type
 */
export type ValidatedValue = unknown

/**
 * Validated form change event
 */
export interface ValidatedFormChangeEvent {
  readonly changedFieldName: string
  readonly fields: Array<{
    readonly fieldName: string
    readonly value: ValidatedValue
    readonly validationResults: ExtendedValidationResult[]
  }>
}

/**
 * Category data for settings groups
 */
export interface Category {
  readonly categoryId: number
  readonly categoryParentId: number
  readonly categoryIdPath: string
  readonly displayName: string
  readonly components: FormComponentProps[]
  readonly callouts?: CalloutConfiguration[]
}

/**
 * Props for SettingsDetailsTemplate
 */
export interface SettingsDetailsTemplateProps {
  readonly title: string
  readonly categories: Category[]
}

/**
 * Props for no result page
 */
export interface SettingsNoResultPageProps {
  readonly filter: string
  readonly clearSearchHandler: () => void
}

/**
 * Arguments for saving settings keys
 */
export interface SaveKeysArguments {
  readonly keyValues: Record<string, unknown>
  readonly filter: string
}

/**
 * Result of saving settings keys
 */
export interface SaveKeysResult {
  readonly isValid: boolean
  readonly categories: Category[]
  readonly refetchAll: boolean
}

/**
 * Tree node for tree template
 */
export interface TreeTemplateNode {
  readonly id: string
  readonly name: string
  readonly children: TreeTemplateNode[]
  readonly path?: string
  readonly icon?: string
}

/**
 * Props for TreeTemplate (stub)
 */
export interface TreeTemplateProps {
  readonly root: TreeTemplateNode
  readonly expandedByDefault?: boolean
  readonly selectable?: boolean
}

/**
 * Props for SettingsLayoutTemplate
 */
export interface SettingsLayoutTemplateProps extends TreeTemplateProps {}
