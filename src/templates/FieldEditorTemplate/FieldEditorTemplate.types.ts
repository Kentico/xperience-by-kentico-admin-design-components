import type { CalloutType, CalloutPlacementType, SidePanelCloseEvent } from '@/components'
import type { ListingTemplateProps } from '../ListingWithSecondaryMenuTemplate'
import type { Colors } from '@/tokens/colors'

/**
 * Represents supported field types.
 */
export const FieldType = {
  Field: 'field',
  Category: 'category',
  Schema: 'schema',
} as const

export type FieldType = (typeof FieldType)[keyof typeof FieldType]

/**
 * Callout configuration for server-driven callouts.
 */
export interface FieldEditorCalloutConfiguration {
  readonly headline?: string
  readonly content: string
  readonly actionButton?: FieldEditorCalloutButtonConfiguration
  readonly type: CalloutType
  readonly placement: CalloutPlacementType
  readonly contentAsHtml?: boolean
}

/**
 * Button configuration for callout actions.
 */
export interface FieldEditorCalloutButtonConfiguration {
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
 * Template properties for field editor template.
 */
export interface FieldEditorTemplateProps {
  /**
   * Caption of the field editor template.
   */
  readonly caption: string
  /**
   * Determines if categories are supported in field editor.
   */
  readonly supportsCategory: boolean
  /**
   * Determines if reusable schema fields are supported in field editor.
   */
  readonly supportsSchema: boolean
  /**
   * Callouts on this page.
   */
  readonly callouts?: FieldEditorCalloutConfiguration[]
}

/**
 * Represents a field, edited by the field editor.
 */
export interface FieldData {
  /**
   * Field name.
   */
  readonly name: string
  /**
   * Indicates whether the field is visible.
   */
  readonly visible: boolean
  /**
   * Indicates whether the field allows null values.
   */
  readonly required: boolean
  /**
   * Data type of the field.
   */
  readonly dataType: string
  /**
   * Indicates whether the field can be deleted
   */
  readonly deletable: boolean
  /**
   * Indicates type of the field.
   */
  readonly type: FieldType
  /**
   * Color representing the data type.
   */
  readonly color?: keyof typeof Colors
  /**
   * Reusable field schema field data.
   */
  readonly schemaProperties?: SchemaFieldData
}

/**
 * Represents reusable field schema field data.
 */
export interface SchemaFieldData {
  /**
   * Path to the management UI of the reusable schema if present in this field.
   */
  readonly navigateToPath?: string
  /**
   * Reusable field schema.
   */
  readonly schemaFields: FieldData[]
}

export interface FieldChangeResult {
  readonly fieldData: FieldData
  readonly subForms: SubForm[]
  readonly isValid: boolean
}

export interface GetFieldsResult {
  readonly fields: FieldData[]
}

export interface GetFormFieldMetadataArguments {
  readonly name: string
  readonly subForms: Record<string, Record<string, unknown>>
}

/**
 * Represents command result for creating field.
 */
export interface CreateFieldResult extends FieldChangeResult {}

/**
 * Represents command result for creating schema fields.
 */
export interface CreateSchemaFieldResult {
  readonly fieldData: FieldData[]
  readonly isValid: boolean
}

/**
 * Shared parameters for field change operation.
 */
interface FieldChangeArguments {
  readonly subForms: Record<string, Record<string, unknown>>
}

/**
 * Represents parameters for field update operation.
 */
export interface SaveFieldArguments extends FieldChangeArguments {
  readonly name: string
}

/**
 * Represents parameters for field create operation.
 */
export interface CreateFieldArguments extends FieldChangeArguments {}

/**
 * Set schema command arguments.
 */
export interface CreateSchemaCommandArguments {
  /**
   * List of selected identifiers to set.
   */
  identifiers: unknown[]
}

export interface FormFieldChange {
  readonly formName: string
  readonly fieldName: string
  readonly value: unknown
}

/**
 * Represents parameters for field move operation.
 */
export interface MoveFieldParameters {
  readonly sourceIndex: number
  readonly destinationIndex: number
}

/**
 * Represents parameters for field deletion operation.
 */
export interface DeleteFieldParameters {
  readonly deletedFieldName: string
}

/**
 * Represents command result for deleting field.
 */
export interface DeleteFieldResult extends FieldChangeResult {}

/**
 * Form component properties from backend.
 */
export interface FormComponentProps {
  readonly name: string
  readonly label?: string
  readonly value?: unknown
  readonly type?: string
  readonly disabled?: boolean
  readonly editMode?: string
  readonly options?: Array<{ label: string; value: unknown }>
}

/**
 * Properties for form used by BarItem.
 */
export interface SubForm {
  readonly id: string
  readonly timeStamp: string
  readonly title: string
  readonly components: FormComponentProps[]
}

/**
 * Properties for each displayed field form.
 */
export interface FieldEditorFormProps {
  readonly subForms: SubForm[]
  readonly onChange: (event: FormFieldChange) => void
  readonly name: string
  readonly onCancel: () => void
  readonly addingField: boolean
}

/**
 * Props for field editor bar item header.
 */
export interface FieldEditorBarItemHeaderProps {
  /**
   * Headline shown in header.
   */
  readonly headline: string
  /**
   * Representation of a field in editor. Can be undefined in case of new field adding.
   */
  readonly fieldData?: FieldData
}

/**
 * Validated form change event.
 */
export interface ValidatedFormChangeEvent {
  readonly changedFieldName: string
  readonly fields: Array<{
    readonly fieldName: string
    readonly value: unknown
    readonly hasDependencies: boolean
  }>
}

/**
 * Form reference interface.
 */
export interface FormRef {
  readonly getFormValues: () => Record<string, unknown>
}

/**
 * Properties of the field editor side panel component.
 */
export interface FieldEditorSidePanelProps {
  /**
   * Indicates if the side panel should be displayed.
   */
  readonly showSidePanel: boolean
  /**
   * Listing component properties.
   */
  readonly listingProps: ListingTemplateProps
  /**
   * Handler that is called when the selected items in the table change.
   */
  readonly onSelectionChange: (identifiers: unknown[]) => void
  /**
   * Handler that is called when the save button is clicked.
   */
  readonly onSaveButtonClicked: () => void
  /**
   * Handler that is called when the side panel is closed.
   */
  readonly onCloseSidePanel: (event: SidePanelCloseEvent) => void
}

/**
 * Prompt dialog texts configuration.
 */
export interface PromptDialogTexts {
  readonly headline: string
  readonly confirmLabel: string
  readonly message: string
}

/**
 * Prompt dialog component props.
 */
export interface PromptDialogComponentProps {
  readonly showDialog: boolean
  readonly texts: PromptDialogTexts
  readonly destructive?: boolean
  readonly onCancellation: () => void
  readonly onConfirmation: () => void | Promise<void>
}
