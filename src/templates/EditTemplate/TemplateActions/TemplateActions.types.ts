/**
 * Types for Edit Template Action Components
 *
 * These action components are used within the EditTemplate to provide
 * various action buttons and dropdown menus for form operations.
 */

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
 * Action type identifiers.
 */
export const ActionType = {
  Client: 'client',
  Server: 'server',
  Navigate: 'navigate',
} as const

export type ActionType = (typeof ActionType)[keyof typeof ActionType]

/**
 * Base action configuration interface.
 */
export interface Action {
  readonly type?: ActionType
  readonly label: string
  readonly title?: string
  readonly disabled?: boolean
  readonly destructive?: boolean
  readonly onClick?: () => void | Promise<void>
  readonly identifier?: string
  readonly parameter?: string
  readonly buttonColor?: string
  readonly icon?: string
}

/**
 * Represents a successful result from the edit page submit command.
 */
export interface EditPageSuccessFormSubmissionResult {
  /**
   * Updated object display name or undefined/null if unchanged.
   */
  readonly objectDisplayName?: string | null
  /**
   * Updated object identifier.
   */
  readonly objectId: number
  /**
   * Indicates whether to refetch data of all templates.
   */
  readonly refetchAll: boolean
  /**
   * Status of the submission.
   */
  readonly status: string
  /**
   * Updated form items (optional).
   * Uses a generic array that is compatible with FormItems.
   */
  readonly items?: Array<{ name: string; [key: string]: unknown }>
  /**
   * Confirmation dialog items (optional).
   * Uses a generic array that is compatible with FormItems.
   */
  readonly confirmationItems?: Array<{ name: string; [key: string]: unknown }>
}

/**
 * Confirmation submission result type.
 */
export interface ConfirmationSubmissionResult {
  readonly status: string
  readonly errors?: string[]
}

/**
 * Properties for a component that can be used as an edit template action.
 */
export interface EditTemplateActionComponent {
  /**
   * Name of the client component of the edit template action component.
   */
  readonly clientComponentName: string
  /**
   * Returns the values of edit template form.
   */
  readonly getFormValues?: () => FormValues | undefined
  /**
   * Returns if the values inside of edit template form were changed.
   */
  readonly getDataChanged?: () => boolean | undefined
  /**
   * Flag if the button is disabled.
   */
  readonly disabled: boolean
  /**
   * Handler to allow pre-process of the command.
   */
  readonly onBeforeExecuteCommand?: () => void
  /**
   * Handler to allow postprocess of the command result.
   */
  readonly onAfterExecuteCommand?: (
    result: EditPageSuccessFormSubmissionResult
  ) => void
}

/**
 * @deprecated Interface is deprecated and will be removed in the next version.
 *
 * Props for the BuilderButtonEditTemplateActionComponent.
 */
export interface BuilderButtonEditTemplateActionComponentProps extends Action {
  /**
   * Whether the current form should be submitted before button command.
   */
  readonly submitFormBeforeAction?: boolean
  /**
   * Whether this button is primary.
   */
  readonly isPrimary?: boolean
  /**
   * Function executed when the action is clicked.
   */
  readonly onActionClick: (command: string, submitBeforeCommand: boolean) => void
  /**
   * Whether submit is currently in process.
   */
  readonly isSubmitInProgress: boolean
}

/**
 * Props for the ButtonEditTemplateActionComponent.
 */
export interface ButtonEditTemplateActionComponentProps extends Action {
  /**
   * Reset all form data changes.
   */
  readonly resetAllDataChanges: boolean
  /**
   * Indicates if the form data should be submitted.
   */
  readonly submitFormData: boolean
  /**
   * Gets the values of edit form.
   */
  readonly getFormValues?: () => FormValues
  /**
   * Handler to allow pre-process of the command.
   */
  readonly onBeforeExecuteCommand?: () => void
  /**
   * Handler to allow postprocess of the command result.
   */
  readonly onAfterExecuteCommand?: (
    result: EditPageSuccessFormSubmissionResult | undefined
  ) => void
}

/**
 * Props for the DropdownButtonEditTemplateActionComponent.
 */
export interface DropdownButtonEditTemplateActionComponentProps {
  /**
   * Label of the dropdown button.
   */
  readonly label: string
  /**
   * Actions displayed in the dropdown.
   */
  readonly actions: Action[]
  /**
   * Flag if the button is disabled.
   */
  readonly disabled: boolean
  /**
   * Tooltip of the button.
   */
  readonly title?: string
  /**
   * Handler to allow pre-process of the command.
   */
  readonly onBeforeExecuteCommand?: () => void
  /**
   * Handler to allow postprocess of the command result.
   */
  readonly onAfterExecuteCommand?: (
    result: EditPageSuccessFormSubmissionResult | undefined
  ) => void
}

/**
 * Props for the PublishButtonEditTemplateActionComponent.
 */
export interface PublishButtonEditTemplateActionComponentProps extends Action {
  /**
   * Gets flag if the data in edit form were changed.
   */
  readonly getDataChanged?: () => boolean
  /**
   * Gets the values of edit form.
   */
  readonly getFormValues?: () => FormValues
  /**
   * Handler to allow pre-process of the command.
   */
  readonly onBeforeExecuteCommand?: () => void
  /**
   * Handler to allow postprocess of the command result.
   */
  readonly onAfterExecuteCommand?: (
    result: EditPageSuccessFormSubmissionResult | undefined
  ) => void
}

/**
 * Additional submit parameters for publish action.
 */
export interface PublishActionButtonAdditionalSubmitParams {
  /**
   * Values of the edit form.
   */
  formValues: FormValues | undefined
  /**
   * Flag if the data should be saved before publish.
   */
  updateBeforePublish: boolean | undefined
}

/**
 * Props for ActionButton component (stub).
 */
export interface ActionButtonProps {
  /**
   * The action configuration.
   */
  readonly action: Action
  /**
   * Function to get action data before execution.
   */
  readonly getActionData?: () => unknown
  /**
   * Handler called before command execution.
   */
  readonly onBeforeExecuteCommand?: () => void
  /**
   * Handler called after command execution.
   */
  readonly onAfterExecuteCommand?: (
    result: ConfirmationSubmissionResult | undefined
  ) => void
}
