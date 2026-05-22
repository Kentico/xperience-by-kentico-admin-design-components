/**
 * Edit Template Action Components
 *
 * Export action components for use in EditTemplate.
 */

export {
  EditTemplateActionComponentLoader,
  BuilderButtonEditTemplateActionComponent,
  ButtonEditTemplateActionComponent,
  DropdownButtonEditTemplateActionComponent,
  PublishButtonEditTemplateActionComponent,
} from './TemplateActions'

export type {
  FormValues,
  FormParameters,
  Action,
  EditPageSuccessFormSubmissionResult,
  ConfirmationSubmissionResult,
  EditTemplateActionComponent,
  BuilderButtonEditTemplateActionComponentProps,
  ButtonEditTemplateActionComponentProps,
  DropdownButtonEditTemplateActionComponentProps,
  PublishButtonEditTemplateActionComponentProps,
  PublishActionButtonAdditionalSubmitParams,
  ActionButtonProps,
} from './TemplateActions.types'

// ActionType is exported as both value and type (const object with companion type)
export { ActionType } from './TemplateActions.types'
