/**
 * EditTemplate
 *
 * Core template for editing forms with validation, confirmation dialogs,
 * callouts, and notification bar support.
 */

// Main template export
export {
  EditTemplate,
  FormEditMode,
  FormSubmissionStatus,
  CalloutType,
  NotificationBarType,
  useTemplateProperties,
} from './EditTemplate'

// Type exports
export type {
  EditTemplateProps,
  EditCalloutConfiguration,
  EditCalloutButtonConfiguration,
  FormItems,
  FormValues,
  FormRef,
  FormChangeResult,
  FormSubmissionResult,
  FormComponentProps,
  FormCategoryProps,
  FormParameters,
  ValidationResult,
  SubmitEventHandler,
  ValidatedFormChangeEvent,
  EditSubmitArgs,
  EditChangeArgs,
  ConfirmationConfiguration,
  PromptDialogTexts,
  EditTemplateSubmitButtonProps,
  NotificationBarMessageWithType,
  NotificationBarActionHandler,
  NavigationItem,
  NavigationConfiguration,
  TemplatePropertiesContextType,
} from './EditTemplate.types'

// CalloutPlacementType is also available from the types
export type { CalloutPlacementType } from './EditTemplate.types'

// TemplateActions sub-component exports
export {
  EditTemplateActionComponentLoader,
  BuilderButtonEditTemplateActionComponent,
  ButtonEditTemplateActionComponent,
  DropdownButtonEditTemplateActionComponent,
  PublishButtonEditTemplateActionComponent,
  ActionType,
} from './TemplateActions'

export type {
  EditTemplateActionComponent,
  BuilderButtonEditTemplateActionComponentProps,
  ButtonEditTemplateActionComponentProps,
  DropdownButtonEditTemplateActionComponentProps,
  PublishButtonEditTemplateActionComponentProps,
  PublishActionButtonAdditionalSubmitParams,
  ActionButtonProps,
  Action,
  EditPageSuccessFormSubmissionResult,
  ConfirmationSubmissionResult,
} from './TemplateActions'
