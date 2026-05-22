/**
 * Types for EditTemplate
 *
 * The EditTemplate is a core template for editing forms with validation,
 * confirmation dialogs, callouts, and notification bar support.
 */

import type { EditTemplateActionComponent, EditPageSuccessFormSubmissionResult } from './TemplateActions'

/**
 * Form edit mode enumeration.
 * Controls how form fields behave in the edit template.
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
 * Form submission status values.
 */
export const FormSubmissionStatus = {
  /** Form submitted successfully */
  ValidationSuccess: 'ValidationSuccess',
  /** Form validation failed */
  ValidationFailure: 'ValidationFailure',
  /** Confirmation dialog validation failed */
  ConfirmationValidationFailure: 'ConfirmationValidationFailure',
} as const

export type FormSubmissionStatus =
  (typeof FormSubmissionStatus)[keyof typeof FormSubmissionStatus]

/**
 * Callout type for visual distinction.
 */
export const CalloutType = {
  QuickTip: 'quickTip',
  FriendlyWarning: 'friendlyWarning',
} as const

export type CalloutType = (typeof CalloutType)[keyof typeof CalloutType]

/**
 * Placement of callouts on the page.
 */
export const CalloutPlacementType = {
  OnDesk: 'onDesk',
  OnPaper: 'onPaper',
} as const

export type CalloutPlacementType =
  (typeof CalloutPlacementType)[keyof typeof CalloutPlacementType]

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
 * Validation result for a form field.
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
 * Callout button configuration for action buttons in callouts.
 */
export interface EditCalloutButtonConfiguration {
  readonly text: string
  readonly redirectUrl?: string
  readonly openInNewTab?: boolean
  readonly disabled?: boolean
  readonly inProgress?: boolean
}

/**
 * Configuration for displaying callouts in the edit template.
 */
export interface EditCalloutConfiguration {
  readonly type: CalloutType
  readonly placement?: CalloutPlacementType
  readonly headline: string
  readonly content: string
  readonly contentAsHtml?: boolean
  readonly actionButton?: EditCalloutButtonConfiguration
}

/**
 * Notification bar message types.
 */
export const NotificationBarType = {
  Alert: 'alert',
  Warning: 'warning',
  Info: 'info',
} as const

export type NotificationBarType =
  (typeof NotificationBarType)[keyof typeof NotificationBarType]

/**
 * Notification bar message with type.
 */
export interface NotificationBarMessageWithType {
  readonly type: NotificationBarType
  readonly message: string
  readonly headline?: string
  readonly actionButton?: EditCalloutButtonConfiguration
}

/**
 * Notification bar action handler for processing notification actions.
 */
export interface NotificationBarActionHandler {
  readonly disabled: boolean
  readonly getActionData: () => { data: FormValues | undefined }
  readonly onBeforeExecuteCommand: () => void
  readonly onAfterExecuteCommand: (
    result: EditPageSuccessFormSubmissionResult | undefined
  ) => void
}

/**
 * Configuration for confirmation dialogs.
 */
export interface ConfirmationConfiguration {
  readonly title?: string
  readonly detail?: string
  readonly button: string
  readonly formItems?: FormItems
  readonly dependentFieldNames?: string[]
}

/**
 * Discard changes dialog configuration.
 */
export interface PromptDialogTexts {
  readonly headline?: string
  readonly confirmLabel?: string
  readonly cancelLabel?: string
  readonly detail?: string
}

/**
 * Submit button configuration.
 */
export interface EditTemplateSubmitButtonProps {
  /** Indicates if the form submit button is visible */
  readonly visible: boolean
  /** Label of the form submit button */
  readonly label: string
  /** Tooltip text of the form submit button */
  readonly tooltipText: string
  /** Confirmation dialog configuration */
  readonly confirmationDialog?: ConfirmationConfiguration
}

/**
 * Main EditTemplate props.
 */
export interface EditTemplateProps {
  /** Link to navigate back from the edit page */
  readonly backLink?: string
  /**
   * @deprecated Property is deprecated. Use `editMode` set to `FormEditMode.Disabled` instead.
   * Indicates whether the entire template is disabled.
   */
  readonly disabled: boolean
  /** Edit mode of the template */
  readonly editMode: FormEditMode
  /** Additional action components */
  readonly additionalActions?: EditTemplateActionComponent[]
  /** Form items representing edited form fields */
  readonly items: FormItems
  /** Page headline */
  readonly headline: string
  /** Error message to be displayed instead of the editing form */
  readonly errorMessage?: string
  /** Callouts on this page */
  readonly callouts: EditCalloutConfiguration[]
  /** Function called after the submit result is returned */
  readonly onSubmitResult?: (result: EditPageSuccessFormSubmissionResult) => void
  /** Submit button configuration */
  readonly submitButton: EditTemplateSubmitButtonProps
  /** Configuration of the discard changes dialog */
  readonly discardChangesDialog: PromptDialogTexts
  /** ID of the element where actions should be rendered */
  readonly actionsPortalID: string
  /** Prevents update of display name in breadcrumbs and navigation items */
  readonly preventDisplayNameUpdate: boolean
  /** Full width stretches the form to full width minus callouts */
  readonly fullWidth: boolean
  /** Notification bar messages to be displayed on the edit page */
  readonly notificationBarMessages?: NotificationBarMessageWithType[]
}

/**
 * Result returned from the form change command.
 */
export interface FormChangeResult {
  /** Form items representing edited form fields */
  readonly items: FormItems
}

/**
 * Form submission result interface.
 */
export interface FormSubmissionResult {
  readonly status: FormSubmissionStatus
  readonly items?: FormItems
  readonly confirmationItems?: FormItems
}

/**
 * Re-export EditPageSuccessFormSubmissionResult for convenience
 */
export type { EditPageSuccessFormSubmissionResult }

/**
 * Form submit arguments.
 */
export interface EditSubmitArgs extends FormParameters {
  /** Confirmation dialog form values */
  readonly confirmationFormData: FormValues
}

/**
 * Form change arguments.
 */
export interface EditChangeArgs extends FormParameters {
  /** Name of the field that changed */
  readonly changedFieldName: string
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
  readonly submit: () => void
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
