/**
 * Types for ContentItemEditTemplate
 *
 * The ContentItemEditTemplate is used for editing content items with
 * form fields, menu actions, and workflow state management.
 */

// No external imports needed - all types are self-contained

/**
 * Command result status - converted from enum to const pattern.
 */
export const ContentItemCommandResultStatus = {
  /** Error result status. */
  Error: 'error',
  /** Invalid result status. */
  Invalid: 'invalid',
  /** Success result status. */
  Success: 'success',
} as const

export type ContentItemCommandResultStatus =
  (typeof ContentItemCommandResultStatus)[keyof typeof ContentItemCommandResultStatus]

/**
 * Form edit mode - converted from enum to const pattern.
 */
export const FormEditMode = {
  /** Normal editing mode - all fields are editable */
  Default: 'default',
  /** All fields are disabled but visible */
  Disabled: 'disabled',
  /** All fields are read-only - no editing allowed */
  ReadOnly: 'readOnly',
} as const

export type FormEditMode = (typeof FormEditMode)[keyof typeof FormEditMode]

/**
 * Content version status enum values.
 */
export const ContentVersionStatusEnum = {
  Draft: 'draft',
  Published: 'published',
  Scheduled: 'scheduled',
  Archived: 'archived',
} as const

export type ContentVersionStatusEnum =
  (typeof ContentVersionStatusEnum)[keyof typeof ContentVersionStatusEnum]

/**
 * Content item status representation.
 */
export interface ContentItemStatus {
  /** Status label text */
  readonly label: string
  /** Status color/variant */
  readonly variant?: string
  /** Status icon */
  readonly icon?: string
  /** Whether this is a workflow status */
  readonly isWorkflowStatus?: boolean
}

/**
 * Notification bar message type.
 */
export interface NotificationBarMessage {
  /** Message text */
  readonly message: string
  /** Optional headline */
  readonly headline?: string
  /** Optional typed values for string interpolation */
  readonly typedValues?: Record<string, string>
}

/**
 * Content folder ID type (can be string or number).
 */
export type ContentFolderId = string | number | null

/**
 * Validation result for form fields.
 */
export interface ValidationResult {
  readonly isValid: boolean
  readonly errorMessage?: string
}

/**
 * Form component props - represents a single form field.
 */
export interface FormComponentProps {
  readonly name: string
  readonly componentName?: string
  readonly label?: string
  readonly value?: unknown
  readonly validationResults?: ValidationResult[]
  readonly properties?: Record<string, unknown>
}

/**
 * Form category props - represents a group of form components.
 */
export interface FormCategoryProps {
  readonly categoryName: string
  readonly components: FormComponentProps[]
}

/**
 * Form items can be either components or categories.
 */
export type FormItems = Array<FormComponentProps | FormCategoryProps>

/**
 * Form values type - key-value pairs of form field data.
 */
export type FormValues = Record<string, unknown>

/**
 * Form parameters for submission operations.
 */
export interface FormParameters {
  readonly data: FormValues
}

/**
 * Content item action configuration.
 */
export interface ContentItemAction {
  /** Unique action name/identifier */
  readonly name: string
  /** Display label for the action */
  readonly label: string
  /** Optional icon for the action */
  readonly icon?: string
  /** Whether the action is disabled */
  readonly disabled?: boolean
  /** Whether the action is destructive */
  readonly isDestructive?: boolean
  /** Whether action is currently in progress (loading) */
  readonly inProgress?: boolean
  /** Whether this action uses form submit */
  readonly useFormSubmit?: boolean
  /** Whether to show confirmation dialog before action */
  readonly confirmation?: boolean
  /** Tooltip text */
  readonly tooltipText?: string
}

/**
 * Form headings for create new language variant.
 */
export interface FormHeadings {
  /** Form heading */
  readonly heading: string
  /** Form subheading */
  readonly subheading: string
}

/**
 * Base implementation of content item state.
 */
export interface ContentItemStateBase {
  /** Content item Id */
  readonly id: number
  /** Content item name */
  readonly displayName: string
  /** Content item menu actions */
  readonly menuActions: ContentItemAction[]
  /** Content item edit mode */
  readonly editMode: FormEditMode
  /** Content item version status */
  readonly versionStatus?: ContentVersionStatusEnum
  /** Notification bar message */
  readonly notificationBarMessage?: NotificationBarMessage
  /** Content item status */
  readonly status?: ContentItemStatus
}

/**
 * Content item state.
 */
export interface ContentItemState extends ContentItemStateBase {
  /** Content type Id */
  readonly contentTypeId: number
  /** Content folder Id */
  readonly contentFolderId: ContentFolderId
  /** Workspace Id */
  readonly workspaceId: number
  /** Content item side panel actions */
  readonly sidePanelActions: ContentItemAction[]
}

/**
 * Content item command result.
 */
export interface ContentItemCommandResult {
  /** Contains form items */
  readonly items?: FormItems
  /** Command result status */
  readonly status: ContentItemCommandResultStatus
  /** State of the content item */
  readonly state: ContentItemState
  /** If not empty, contains url to redirect to in case of successful validation */
  readonly redirectUrl?: string
}

/**
 * Content item form submission parameters.
 */
export interface ContentItemSubmissionCommandParameters extends FormParameters {
  /** Content type class ID */
  readonly contentTypeId: number
  /** Content folder ID */
  readonly contentFolderId: ContentFolderId
  /** Workspace ID */
  readonly workspaceId: number
  /** Display name of the content item */
  readonly contentItemName: string
  /** Flag if the content item should be updated before further processing */
  readonly updateBeforeProcessing: boolean
  /**
   * @deprecated Property is deprecated and will be removed in the next version.
   * Flag if the content item should be updated before publishing.
   */
  readonly updateBeforePublish: boolean
  /** Content language codename */
  readonly languageName: string
}

/**
 * Content item command parameters.
 */
export interface ContentItemCommandParameters {
  /** Content language codename */
  readonly languageName: string
}

/**
 * Content item change command arguments.
 */
export interface ContentItemChangeCommandArguments extends FormParameters {
  /** Id of the content item type */
  readonly contentTypeId: number
}

/**
 * Form change result returned from change command.
 */
export interface FormChangeResult {
  /** Updated form items */
  readonly items: FormItems
}

/**
 * Props for ContentItemEditTemplate component.
 */
export interface ContentItemEditTemplateProps {
  /** Prefix of the content item form name */
  readonly createFormNamePrefix: string
  /** Form items to display on the page */
  readonly items: FormItems
  /** State of the content item */
  readonly state: ContentItemState
  /** Page headline */
  readonly headline: string
  /** Edit mode of the page */
  readonly editMode: FormEditMode
  /** Headings used inside form for create new language variant */
  readonly formHeadings: FormHeadings
}

/**
 * Editable header confirm result.
 */
export interface EditableHeaderConfirmResult {
  /** Whether the validation was successful */
  readonly isValid: boolean
  /** Error message if validation failed */
  readonly errorMessage?: string
}

/**
 * Submit event handler data.
 */
export interface SubmitEventHandler {
  readonly values: FormValues
}

/**
 * Validated form change event.
 */
export interface ValidatedFormChangeEvent {
  readonly changedFieldName: string
  readonly fields: Array<{
    fieldName: string
    value: unknown
    validationResults: ValidationResult[]
  }>
}

/**
 * Form ref interface for controlling form imperatively.
 */
export interface FormRef {
  readonly submit: (actionName?: string) => void
  readonly resetDataChanged: () => void
  readonly getFormValues: () => FormValues | undefined
  readonly dataChanged: boolean
}

/**
 * Navigation item for breadcrumbs and secondary menu.
 */
export interface NavigationItem {
  readonly name: string
  readonly path: string
  readonly isSignificant?: boolean
}

/**
 * Navigation configuration for templates.
 */
export interface NavigationConfiguration {
  readonly items: NavigationItem[]
  readonly isTemporary?: boolean
}

/**
 * Template properties context value.
 */
export interface TemplatePropertiesContextType {
  readonly navigation: NavigationConfiguration
}
