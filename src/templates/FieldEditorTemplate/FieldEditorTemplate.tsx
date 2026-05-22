import * as React from 'react';
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type ReactElement,
} from 'react'
import type { DropResult, LeadingButtonProps, SidePanelCloseEvent } from '@/components'
import {
  BarItem,
  BarItemDraggable,
  BarItemGroup,
  BarItemHeaderColumnAlign,
  Button,
  ButtonColor,
  ButtonSize,
  Headline,
  HeadlineSize,
  Row,
  Cols,
  Column,
  Box,
  Spacing,
  StickyHeader,
  SidePanel,
  SidePanelSize,
  SidePanelCloseSource,
  Icon,
  Tag,
  Tooltip,
  SimpleStatusDefault,
  Dialog,
} from '@/components'
import { Colors } from '@/tokens/colors'
import type { ListingTemplateProps } from '../ListingWithSecondaryMenuTemplate'
import { LegacySortType as SortType } from '../ListingWithSecondaryMenuTemplate'
import type {
  FieldEditorTemplateProps,
  FieldData,
  SubForm,
  GetFieldsResult,
  GetFormFieldMetadataArguments,
  FieldChangeResult,
  CreateFieldResult,
  CreateFieldArguments,
  CreateSchemaFieldResult,
  CreateSchemaCommandArguments,
  MoveFieldParameters,
  DeleteFieldParameters,
  DeleteFieldResult,
  FormFieldChange,
  PromptDialogComponentProps,
  FieldEditorBarItemHeaderProps,
  FieldEditorFormProps,
  FieldEditorSidePanelProps,
  ValidatedFormChangeEvent,
  FormRef,
  FieldEditorCalloutConfiguration,
} from './FieldEditorTemplate.types'
import { FieldType } from './FieldEditorTemplate.types'
import './FieldEditorTemplate.css'

// Local translations (stub pattern used by other templates)
const translations = {
  newFieldButtonLabel: 'New field',
  newCategoryButtonLabel: 'New category',
  newSchemaButtonLabel: 'Add schema',
  newField: 'New field',
  newCategory: 'New category',
  newSchema: 'New schema',
  fieldsCollectionEmpty: 'No fields defined yet',
  deleteField: 'Delete field',
  removeSchema: 'Remove schema',
  editSchema: 'Edit schema',
  fieldVisible: 'Field is visible',
  fieldInvisible: 'Field is hidden',
  fieldRequired: 'Required',
  categoryIndicator: 'Category',
  reusableFieldSchemaIndicator: 'Reusable field schema',
  fundamentalField: 'This field is fundamental and cannot be deleted',
  openInNewTab: 'Open in new tab',
  cancel: 'Cancel',
  save: 'Save',
  promptDialogTitle: 'Unsaved changes',
  promptDialogConfirm: 'Discard',
  promptDialogMessage: 'You have unsaved changes. Do you want to discard them?',
  deleteConfirmation: 'Delete field?',
  deleteConfirmationButtonLabel: 'Delete',
  sidePanelCancelButtonLabel: 'Cancel',
  sidePanelSaveButtonLabel: 'Add selected',
  noAvailableSchemaTitle: 'No schemas available',
  noAvailableSchemaText: 'Create a reusable field schema first.',
}

/**
 * Defines supported commands.
 */
export const FieldEditorCommands = {
  CreateField: 'CreateField',
  GetFields: 'GetFields',
  GetFormFieldMetadata: 'GetFormFieldMetadata',
  GetEmptyFormFieldMetadata: 'GetEmptyFormFieldMetadata',
  GetEmptyFormCategoryMetadata: 'GetEmptyFormCategoryMetadata',
  GetSchemaPanelConfiguration: 'GetSchemaPanelConfiguration',
  MoveField: 'MoveField',
  SaveField: 'SaveField',
  DeleteField: 'DeleteField',
  CreateSchema: 'CreateSchema',
  LoadSchemas: 'LoadSchemas',
} as const

// === Stub Hooks ===

/**
 * Stub hook for page commands.
 */
function usePageCommand<TResult = unknown, _TArgs = unknown>(
  _commandName: string,
  options?: {
    executeOnMount?: boolean
    after?: (data: TResult | null) => void | Promise<void>
  }
): {
  execute: (args?: unknown) => Promise<TResult | null>
  isExecuting: boolean
} {
  const [isExecuting, setIsExecuting] = useState(false)
  const afterCallback = useRef(options?.after)
  afterCallback.current = options?.after
  const hasExecutedRef = useRef(false)

  useEffect(() => {
    if (options?.executeOnMount && !hasExecutedRef.current) {
      hasExecutedRef.current = true
      setIsExecuting(true)
      setTimeout(() => {
        if (afterCallback.current) {
          afterCallback.current(null)
        }
        setIsExecuting(false)
      }, 0)
    }
  }, [options?.executeOnMount])

  const execute = useCallback(async (_args?: unknown): Promise<TResult | null> => {
    setIsExecuting(true)
    try {
      const result = null
      if (afterCallback.current) {
        await afterCallback.current(result)
      }
      return result
    } finally {
      setIsExecuting(false)
    }
  }, [])

  return { execute, isExecuting }
}

/**
 * Stub hook for page command provider.
 */
function usePageCommandProvider() {
  const executeCommand = useCallback(
    async <TResult = unknown, TArgs = unknown>(
      _commandName: string,
      _args?: TArgs
    ): Promise<TResult | null> => {
      return null
    },
    []
  )

  return { executeCommand }
}

/**
 * Stub hook for editable object status.
 */
function useEditableObjectStatusObservee() {
  const dataChangedMap = useRef(new Map<number, boolean>())
  const nextId = useRef(0)

  const getDataChanged = useCallback((id: number): boolean => {
    return dataChangedMap.current.get(id) ?? false
  }, [])

  const setDataChanged = useCallback((id: number, changed: boolean): void => {
    dataChangedMap.current.set(id, changed)
  }, [])

  const getNewId = useCallback((): number => {
    return nextId.current++
  }, [])

  return { getDataChanged, setDataChanged, getNewId }
}

/**
 * Stub hook for table manager.
 */
function useTableManager(_commandName: string, _options: ListingTemplateProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [data] = useState<unknown[]>([])

  const reloadData = useCallback(async (_params?: { currentPage?: number; searchTerm?: string }) => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 100)
  }, [])

  return {
    reloadData,
    isLoading,
    data,
    error: null,
    parameters: {},
  }
}

// === Inline Components ===

/**
 * ContentWithSidebarLayoutWrapper - Simple layout wrapper for sidebar + content.
 */
function ContentWithSidebarLayoutWrapper({ children }: { children: ReactNode }) {
  return <div className={'FieldEditorTemplate-layoutWrapper'}>{children}</div>
}

/**
 * PageMessagePane - Displays a centered message when there's no content.
 */
function PageMessagePane({ title }: { title: string }) {
  return (
    <div className={'FieldEditorTemplate-pageMessagePane'}>
      <div className={'FieldEditorTemplate-pageMessageTitle'}>{title}</div>
    </div>
  )
}

/**
 * Configurable callout component for server-driven callouts.
 */
function ConfigurableCallout({
  calloutConfiguration,
}: {
  calloutConfiguration: FieldEditorCalloutConfiguration
}) {
  // Simple stub - in full implementation this renders a Callout
  return (
    <div className={'FieldEditorTemplate-configurableCallout'}>
      {calloutConfiguration.headline && (
        <strong>{calloutConfiguration.headline}</strong>
      )}
      <div>{calloutConfiguration.content}</div>
    </div>
  )
}

/**
 * Prompt dialog component for confirmation dialogs.
 */
function PromptDialogComponent({
  showDialog,
  texts,
  destructive,
  onCancellation,
  onConfirmation,
}: PromptDialogComponentProps) {
  if (!showDialog) return null

  return (
    <Dialog
      headline={texts.headline}
      isOpen={showDialog}
      onClose={onCancellation}
      cancelAction={{
        label: 'Cancel',
        onClick: onCancellation,
      }}
      confirmAction={{
        label: texts.confirmLabel,
        onClick: onConfirmation,
        destructive: destructive,
      }}
    >
      {texts.message && <p>{texts.message}</p>}
    </Dialog>
  )
}

/**
 * FieldEditorBarItemHeader - Header for field editor bar items.
 */
function FieldEditorBarItemHeader({
  headline,
  fieldData,
}: FieldEditorBarItemHeaderProps) {
  const visibilityIcon = fieldData?.visible ? 'xp-eye' : 'xp-eye-slash'
  const visibilityTooltip = fieldData?.visible
    ? translations.fieldVisible
    : translations.fieldInvisible

  const getHeader = (type: FieldType | undefined): ReactElement => {
    switch (type) {
      case FieldType.Category:
        return (
          <div className={'FieldEditorTemplate-fieldName'}>
            {headline} ({translations.categoryIndicator})
          </div>
        )
      case FieldType.Schema:
        return (
          <div className={'FieldEditorTemplate-schemaName'}>
            {headline}
            <span className={'FieldEditorTemplate-typeIndicator'}>
              {translations.reusableFieldSchemaIndicator}
            </span>
          </div>
        )
      default:
        return <div className={'FieldEditorTemplate-fieldName'}>{headline}</div>
    }
  }

  return (
    <div className={'FieldEditorTemplate-main'}>
      <span title={headline}>{getHeader(fieldData?.type)}</span>
      {fieldData && (
        <div className={'FieldEditorTemplate-right'}>
          {fieldData.type !== FieldType.Schema && (
            <span className={'FieldEditorTemplate-eyeIcon'}>
              <Tooltip tooltipText={visibilityTooltip}>
                <Icon name={visibilityIcon} />
              </Tooltip>
            </span>
          )}
          {fieldData.dataType && (
            <Tag
              label={fieldData.dataType}
              background={{
                color: fieldData.color
                  ? Colors[fieldData.color as keyof typeof Colors]
                  : Colors.BackgroundTagDefault,
              }}
            />
          )}

          <div className={'FieldEditorTemplate-requiredSpacer'}>
            {fieldData.required && (
              <SimpleStatusDefault
                content={{
                  label: translations.fieldRequired,
                  iconName: 'xp-small-dot-centered',
                }}
                iconColor={Colors.WarningIcon}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * FormStub - Simple form stub for field editing.
 */
function FormStub({
  subForm,
  onChange,
}: {
  subForm: SubForm
  onChange: (event: ValidatedFormChangeEvent) => void
}) {
  const handleChange = (fieldName: string, value: unknown) => {
    onChange({
      changedFieldName: fieldName,
      fields: subForm.components.map((comp) => ({
        fieldName: comp.name,
        value: comp.name === fieldName ? value : comp.value,
        hasDependencies: false,
      })),
    })
  }

  return (
    <div>
      {subForm.components.map((component) => (
        <div key={component.name} className={'FieldEditorTemplate-formGroup'}>
          {component.label && (
            <label className={'FieldEditorTemplate-formLabel'}>{component.label}</label>
          )}
          <input
            className={'FieldEditorTemplate-formInput'}
            name={component.name}
            type="text"
            value={String(component.value ?? '')}
            disabled={component.disabled}
            onChange={(e) => handleChange(component.name, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}

/**
 * FieldEditorForm - Form used in Field Editor for each displayed field.
 */
function FieldEditorForm({
  name,
  subForms,
  onChange,
  onCancel,
  addingField,
}: FieldEditorFormProps) {
  const { executeCommand } = usePageCommandProvider()
  const [disabled, setDisabled] = useState<boolean>(false)
  const [inProgress, setInProgress] = useState<boolean>(false)

  const formRefs = useRef<Record<string, FormRef | null>>({})

  useEffect(() => {
    subFormsDisabled(subForms)
  }, [subForms])

  const reloadEditor = async (subFormName: string, event: ValidatedFormChangeEvent) => {
    const changedField = event.fields.find(
      (field) => field.fieldName === event.changedFieldName
    )
    if (changedField === undefined) {
      return
    }

    onChange({
      formName: subFormName,
      fieldName: changedField.fieldName,
      value: changedField.value,
    })

    if (!changedField.hasDependencies) {
      return
    }

    // In full implementation, this would call server to get updated form metadata
  }

  const saveField = async () => {
    const updatedData = Object.fromEntries(
      Object.entries(formRefs.current).map(([id, ref]) => [
        id,
        ref?.getFormValues() ?? {},
      ])
    )

    setInProgress(true)

    if (addingField) {
      await executeCommand<CreateFieldResult, CreateFieldArguments>(
        FieldEditorCommands.CreateField,
        { subForms: updatedData }
      )
    } else {
      await executeCommand<FieldChangeResult, GetFormFieldMetadataArguments>(
        FieldEditorCommands.SaveField,
        { name, subForms: updatedData }
      )
    }

    setInProgress(false)
  }

  const subFormsDisabled = (subForms: SubForm[]) => {
    const allComponents = subForms.flatMap((i) => i.components)
    const allDisabled = allComponents.map(
      (i) => i.disabled || i.editMode === 'Disabled'
    )
    const isDisabled = !allDisabled.some((i) => i === false)
    setDisabled(isDisabled)
  }

  return (
    <Box>
      {subForms.map((subForm, index) => (
        <Box key={subForm.id}>
          <Box className={index > 0 ? 'FieldEditorTemplate-headline' : 'FieldEditorTemplate-firstHeadline'}>
            {subForm.title}
          </Box>
          <Box className={'FieldEditorTemplate-formContainer'}>
            <FormStub
              subForm={subForm}
              onChange={(e) => reloadEditor(subForm.id, e)}
            />
          </Box>
        </Box>
      ))}
      <Box className={'FieldEditorTemplate-footer'}>
        <Button
          color={ButtonColor.Secondary}
          size={ButtonSize.M}
          disabled={disabled || inProgress}
          onClick={onCancel}
        >
          {translations.cancel}
        </Button>
        <Button
          color={ButtonColor.Primary}
          onClick={saveField}
          disabled={disabled}
          inProgress={inProgress}
        >
          {translations.save}
        </Button>
      </Box>
    </Box>
  )
}

/**
 * SchemaBarItemDraggable - Draggable bar item for schema fields.
 * Renders nested field items within a collapsible container.
 */
function SchemaBarItemDraggable({
  draggableId,
  index,
  leadingButtons,
  headerColumns,
  children,
}: {
  draggableId: string
  index: number
  expanded?: boolean
  leadingButtons: LeadingButtonProps[]
  headerColumns: Array<{ content: ReactNode; align: typeof BarItemHeaderColumnAlign[keyof typeof BarItemHeaderColumnAlign] }>
  children?: ReactNode
}) {
  return (
    <BarItemDraggable
      draggableId={draggableId}
      index={index}
      expanded={true}
      leadingButtons={leadingButtons}
      headerColumns={headerColumns}
    >
      <Box spacingLeft={Spacing.XL}>{children}</Box>
    </BarItemDraggable>
  )
}

/**
 * TableComponent stub for side panel listing.
 */
function TableComponentStub({
  listingProps: _listingProps,
  selectedRows: _selectedRows,
  onSelectedRowChange: _onSelectedRowChange,
}: {
  listingProps: ListingTemplateProps
  selectedRows: unknown[]
  onSelectedRowChange: (identifiers: unknown[]) => void
}) {
  return (
    <div className={'FieldEditorTemplate-tableComponentStub'}>
      <div className={'FieldEditorTemplate-pageMessagePane'}>
        <div className={'FieldEditorTemplate-pageMessageTitle'}>
          {translations.noAvailableSchemaTitle}
        </div>
        <div className={'FieldEditorTemplate-noAvailableSchemaText'}>
          {translations.noAvailableSchemaText}
        </div>
      </div>
    </div>
  )
}

/**
 * FieldEditorSidePanel - Side panel for selecting schemas.
 */
function FieldEditorSidePanel({
  showSidePanel,
  onSelectionChange,
  listingProps,
  onSaveButtonClicked,
  onCloseSidePanel,
}: FieldEditorSidePanelProps) {
  const [identifiers, setIdentifiers] = useState<unknown[]>([])
  const [saveInProgress, setSaveInProgress] = useState(false)

  const tableData = useTableManager(FieldEditorCommands.LoadSchemas, {
    ...listingProps,
  })

  useEffect(() => {
    const reloadTableData = async () => {
      await tableData.reloadData({
        currentPage: 1,
        searchTerm: '',
      })
    }

    if (showSidePanel) {
      setSaveInProgress(false)
      void reloadTableData()
    }
  }, [listingProps.pageSize, listingProps.sortBy, listingProps.sortType, showSidePanel])

  const onSelectedItemsChange = useCallback(
    (ids: unknown[]) => {
      setIdentifiers(ids)
      onSelectionChange(ids)
    },
    [onSelectionChange]
  )

  const onSaveButtonClick = useCallback(() => {
    onSaveButtonClicked?.()
    setIdentifiers([])
    setSaveInProgress(true)
  }, [onSaveButtonClicked])

  const footerComponent = (
    <>
      <Button
        color={ButtonColor.Secondary}
        onClick={(event) =>
          onCloseSidePanel({
            source: SidePanelCloseSource.UserClosed,
            eventPath: event.nativeEvent.composedPath(),
          })
        }
        disabled={false}
        inProgress={saveInProgress}
      >
        {translations.sidePanelCancelButtonLabel}
      </Button>
      <Button
        color={ButtonColor.Primary}
        onClick={onSaveButtonClick}
        disabled={identifiers.length === 0}
        inProgress={saveInProgress}
      >
        {translations.sidePanelSaveButtonLabel}
      </Button>
    </>
  )

  return (
    <SidePanel
      onClose={onCloseSidePanel}
      headline={listingProps.caption}
      footer={footerComponent}
      size={SidePanelSize.Stackable}
      isVisible={showSidePanel}
    >
      <Box className={'FieldEditorTemplate-tableContainer'}>
        <TableComponentStub
          listingProps={listingProps}
          selectedRows={identifiers}
          onSelectedRowChange={onSelectedItemsChange}
        />
      </Box>
    </SidePanel>
  )
}

/**
 * Helper to get base URI trimmed.
 */
function getBaseUriTrimmed(): string {
  const baseUri = window.location.origin
  return baseUri.endsWith('/') ? baseUri.slice(0, -1) : baseUri
}

/**
 * Field editor template.
 *
 * Provides a layout for managing form fields with drag-and-drop reordering,
 * expandable edit forms, and support for categories and reusable field schemas.
 *
 * Features:
 * - Add, edit, and delete fields
 * - Drag-and-drop reordering
 * - Support for categories and schema fields
 * - Validation and unsaved changes tracking
 * - Side panel for schema selection
 *
 * @example
 * ```tsx
 * <FieldEditorTemplate
 *   caption="Content Type Fields"
 *   supportsCategory={true}
 *   supportsSchema={true}
 *   callouts={[]}
 * />
 * ```
 */
export function FieldEditorTemplate({
  caption,
  supportsCategory,
  supportsSchema,
  callouts,
}: FieldEditorTemplateProps) {
  const { getDataChanged, setDataChanged, getNewId } = useEditableObjectStatusObservee()
  const dataChangedId = useRef(getNewId())
  const [activeFieldIndex, setActiveFieldIndex] = useState<number | null>(null)
  const [fields, setFields] = useState<FieldData[]>([])
  const [subForms, setSubForms] = useState<SubForm[]>([])
  const [newFieldType, setNewFieldType] = useState<FieldType | null>(null)
  const newFieldRef = useRef<HTMLDivElement>(null)
  const [sidePanelOpened, setSidePanelOpened] = useState<boolean>(false)
  const [schemaIdentifiers, setSchemaIdentifiers] = useState<unknown[]>([])
  const [sidePanelProps, setSidePanelProps] = useState<ListingTemplateProps>({
    caption: '',
    columns: [],
    pageSize: 0,
    pageSizes: [],
    pageSizesLabel: '',
    sortBy: '',
    uniqueIdentifier: '',
    sortType: SortType.Ascending,
  })
  const [promptDialogData, setPromptDialogData] = useState<PromptDialogComponentProps>({
    showDialog: false,
    texts: {
      headline: translations.promptDialogTitle,
      confirmLabel: translations.promptDialogConfirm,
      message: translations.promptDialogMessage,
    },
    onCancellation: () => {
      setPromptDialogData((prev) => ({ ...prev, showDialog: false }))
    },
    onConfirmation: () => {},
  })

  useEffect(() => {
    if (supportsSchema) {
      void getSchemaPanelConfiguration()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const dataChangedIdValue = dataChangedId.current
    return () => {
      setDataChanged(dataChangedIdValue, false)
    }
  }, [setDataChanged])

  const { executeCommand } = usePageCommandProvider()

  const { execute: getFields } = usePageCommand<GetFieldsResult>(
    FieldEditorCommands.GetFields,
    {
      executeOnMount: true,
      after: (result) => {
        if (result) {
          setFields(result.fields)
        }
      },
    }
  )

  usePageCommand<FieldChangeResult>(FieldEditorCommands.SaveField, {
    after: (result) => {
      if (!result) {
        return
      }

      if (result.isValid && activeFieldIndex !== null) {
        const updatedFields = [...fields]
        updatedFields[activeFieldIndex] = result.fieldData

        setFields(updatedFields)
        setNewFieldType(null)
        setActiveFieldIndex(null)
        setDataChanged(dataChangedId.current, false)
      } else if (result.subForms) {
        setSubForms(result.subForms)
      }
    },
  })

  const { execute: getFormFieldMetadata } = usePageCommand<
    SubForm[],
    GetFormFieldMetadataArguments
  >(FieldEditorCommands.GetFormFieldMetadata, {
    after: (result) => {
      if (result) {
        setSubForms(result)
      }
    },
  })

  const { execute: getEmptyFormFieldMetadata } = usePageCommand<SubForm[]>(
    FieldEditorCommands.GetEmptyFormFieldMetadata,
    {
      after: (emptySubForms) => {
        if (!emptySubForms) {
          return
        }

        setNewFieldType(FieldType.Field)
        setActiveFieldIndex(null)
        setDataChanged(dataChangedId.current, true)
        setSubForms(emptySubForms)

        newFieldRef.current?.scrollIntoView({ behavior: 'smooth' })
      },
    }
  )

  const { execute: getEmptyFormCategoryMetadata } = usePageCommand<SubForm[]>(
    FieldEditorCommands.GetEmptyFormCategoryMetadata,
    {
      after: (emptySubForms) => {
        if (!emptySubForms) {
          return
        }

        setNewFieldType(FieldType.Category)
        setActiveFieldIndex(null)
        setDataChanged(dataChangedId.current, true)
        setSubForms(emptySubForms)

        newFieldRef.current?.scrollIntoView({ behavior: 'smooth' })
      },
    }
  )

  const { execute: getSchemaPanelConfiguration } = usePageCommand<ListingTemplateProps>(
    FieldEditorCommands.GetSchemaPanelConfiguration,
    {
      after: (data) => {
        if (supportsSchema && data) {
          setSidePanelProps(data)
        }
      },
    }
  )

  const { execute: setSchemas } = usePageCommand<
    CreateSchemaFieldResult,
    CreateSchemaCommandArguments
  >(FieldEditorCommands.CreateSchema, {
    after: async (result) => {
      if (!result) {
        return
      }

      setNewFieldType(null)
      setSidePanelOpened(false)

      if (result.isValid) {
        await getFields()
        setDataChanged(dataChangedId.current, false)
      }
    },
  })

  usePageCommand<CreateFieldResult, CreateFieldArguments>(
    FieldEditorCommands.CreateField,
    {
      after: async (result) => {
        if (!result) {
          return
        }

        if (result.isValid) {
          await getFields()
          setDataChanged(dataChangedId.current, false)
          setNewFieldType(null)
        } else {
          setSubForms(result.subForms)
        }
      },
    }
  )

  const onAddNewClick = async () => {
    if (!getDataChanged(dataChangedId.current)) {
      if (newFieldType === null) {
        await getEmptyFormFieldMetadata()
      }
      return
    }

    setPromptDialogData({
      ...promptDialogData,
      showDialog: true,
      onConfirmation: async () => {
        if (newFieldType === null) {
          await getEmptyFormFieldMetadata()
        }
        setPromptDialogData((prev) => ({ ...prev, showDialog: false }))
      },
    })
  }

  const onAddNewCategoryClick = async () => {
    if (!getDataChanged(dataChangedId.current)) {
      if (newFieldType === null) {
        await getEmptyFormCategoryMetadata()
      }
      return
    }

    setPromptDialogData({
      ...promptDialogData,
      showDialog: true,
      onConfirmation: async () => {
        if (newFieldType === null) {
          await getEmptyFormCategoryMetadata()
        }
        setPromptDialogData((prev) => ({ ...prev, showDialog: false }))
      },
    })
  }

  const onAddNewSchemaClick = () => {
    if (!getDataChanged(dataChangedId.current)) {
      if (newFieldType === null) {
        setActiveFieldIndex(null)
        setNewFieldType(FieldType.Schema)
        setSidePanelOpened(true)
      }
      return
    }

    setPromptDialogData({
      ...promptDialogData,
      showDialog: true,
      onConfirmation: () => {
        setActiveFieldIndex(null)
        setNewFieldType(FieldType.Schema)
        setSidePanelOpened(true)
        setDataChanged(dataChangedId.current, false)
        setPromptDialogData((prev) => ({ ...prev, showDialog: false }))
      },
    })
  }

  const cancelEditationWithPrompt = () => {
    if (!getDataChanged(dataChangedId.current)) {
      cancelEditation()
      return
    }

    setPromptDialogData({
      ...promptDialogData,
      showDialog: true,
      onConfirmation: () => {
        cancelEditation()
        setPromptDialogData((prev) => ({ ...prev, showDialog: false }))
      },
    })
  }

  const cancelEditation = () => {
    setActiveFieldIndex(null)
    setNewFieldType(null)
    setDataChanged(dataChangedId.current, false)
  }

  const onDeleteClick = (name: string) => {
    setPromptDialogData({
      ...promptDialogData,
      showDialog: true,
      destructive: true,
      texts: {
        headline: translations.deleteConfirmation,
        message: '',
        confirmLabel: translations.deleteConfirmationButtonLabel,
      },
      onConfirmation: async () => {
        await executeCommand<DeleteFieldResult, DeleteFieldParameters>(
          FieldEditorCommands.DeleteField,
          { deletedFieldName: name }
        )
        await getFields()

        setNewFieldType(null)
        setDataChanged(dataChangedId.current, false)
        setActiveFieldIndex(null)

        setPromptDialogData((prev) => ({ ...prev, showDialog: false }))
      },
    })
  }

  const onFieldClick = async (fieldIndex: number) => {
    if (!getDataChanged(dataChangedId.current)) {
      await fieldClick(fieldIndex)
      return
    }

    setPromptDialogData({
      ...promptDialogData,
      showDialog: true,
      onConfirmation: async () => {
        await fieldClick(fieldIndex)
        setPromptDialogData((prev) => ({ ...prev, showDialog: false }))
      },
    })
  }

  const fieldClick = async (fieldIndex: number) => {
    const isFieldActive = activeFieldIndex === fieldIndex

    if (fields && !isFieldActive) {
      await getFormFieldMetadata({
        name: fields[fieldIndex].name,
        subForms: {},
      })
    }

    cancelEditation()
    setActiveFieldIndex(isFieldActive ? null : fieldIndex)
  }

  const changeActiveIndexAfterDrag = (
    destinationIndex: number,
    sourceIndex: number
  ) => {
    if (activeFieldIndex !== null) {
      let newActiveIndex = null

      if (
        (activeFieldIndex < destinationIndex && activeFieldIndex < sourceIndex) ||
        (activeFieldIndex > destinationIndex && activeFieldIndex > sourceIndex)
      ) {
        newActiveIndex = activeFieldIndex
      } else {
        if (destinationIndex === activeFieldIndex) {
          newActiveIndex =
            sourceIndex < activeFieldIndex
              ? activeFieldIndex - 1
              : activeFieldIndex + 1
        } else {
          newActiveIndex =
            destinationIndex > activeFieldIndex
              ? activeFieldIndex - 1
              : activeFieldIndex + 1
        }
      }

      setActiveFieldIndex(newActiveIndex)
    }
  }

  const onDragEnd = async (dropResult: DropResult) => {
    if (dropResult.source.index === dropResult.destination?.index) {
      return
    }

    const sourceIndex = dropResult.source.index
    const destinationIndex = dropResult.destination?.index || 0

    const newFields = moveField(fields, sourceIndex, destinationIndex)

    changeActiveIndexAfterDrag(destinationIndex, sourceIndex)
    const moveSuccessful = await executeCommand<boolean, MoveFieldParameters>(
      FieldEditorCommands.MoveField,
      {
        sourceIndex,
        destinationIndex,
      }
    )

    if (!moveSuccessful) {
      moveField(newFields, destinationIndex, sourceIndex)
      changeActiveIndexAfterDrag(sourceIndex, destinationIndex)
    }
  }

  const moveField = (
    oldFields: FieldData[],
    sourceIndex: number,
    destinationIndex: number
  ) => {
    const newFields = [...oldFields]
    const [sourceField] = newFields.splice(sourceIndex, 1)
    newFields.splice(destinationIndex, 0, sourceField)
    setFields(newFields)
    return newFields
  }

  const getHeaderColumns = (headline: string, field?: FieldData) => {
    return [
      {
        content: <FieldEditorBarItemHeader headline={headline} fieldData={field} />,
        align: BarItemHeaderColumnAlign.Left,
      },
    ]
  }

  const getNewItemLabel = () => {
    switch (newFieldType) {
      case FieldType.Field:
        return translations.newField

      case FieldType.Category:
        return translations.newCategory

      case FieldType.Schema:
        return translations.newSchema

      default:
        return ''
    }
  }

  const fieldChanged = (e: FormFieldChange) => {
    setDataChanged(dataChangedId.current, true)

    setSubForms(
      subForms.map((subForm) =>
        subForm.id === e.formName
          ? {
              ...subForm,
              components: subForm.components.map((component) =>
                component.name === e.fieldName
                  ? {
                      ...component,
                      value: e.value,
                    }
                  : component
              ),
            }
          : subForm
      )
    )
  }

  const onSidePanelClosed = useCallback(
    (event: SidePanelCloseEvent) => {
      // Dialog was confirmed
      if (event.source === SidePanelCloseSource.ParentPanelClosed) {
        setSidePanelOpened(false)
        setNewFieldType(null)
        return
      }

      // Dialog was cancelled with changed data
      if (schemaIdentifiers.length > 0) {
        setPromptDialogData({
          ...promptDialogData,
          showDialog: true,
          destructive: true,
          onConfirmation: () => {
            setSchemaIdentifiers([])
            setPromptDialogData((prev) => ({ ...prev, showDialog: false }))
            setSidePanelOpened(false)
            setNewFieldType(null)
          },
        })
        return
      }

      setSidePanelOpened(false)
      setNewFieldType(null)
    },
    [promptDialogData, schemaIdentifiers.length]
  )

  const isFieldExpandable = (field: FieldData): boolean =>
    field.type !== FieldType.Schema

  const getLeadingButtons = (field: FieldData): LeadingButtonProps[] => {
    const deleteButton: LeadingButtonProps = {
      icon: 'xp-bin',
      label: translations.deleteField,
      tooltip: !field.deletable ? translations.fundamentalField : '',
      disabled: !field.deletable,
      destructive: true,
      onClick: () => {
        onDeleteClick(field.name)
      },
    }
    const removeButton: LeadingButtonProps = {
      icon: 'xp-cancel',
      label: translations.removeSchema,
      destructive: false,
      onClick: () => {
        onDeleteClick(field.name)
      },
    }
    const editButton: LeadingButtonProps = {
      icon: 'xp-arrow-right-top-square',
      tooltip: translations.openInNewTab,
      label: translations.editSchema,
      destructive: false,
      onClick: () =>
        window.open(
          getBaseUriTrimmed() + field.schemaProperties?.navigateToPath,
          '_blank',
          'noreferrer'
        ),
    }

    return field.type === FieldType.Schema ? [removeButton, editButton] : [deleteButton]
  }

  const getFieldBarItem = (field: FieldData, index: number) => {
    return (
      <BarItemDraggable
        key={field.name}
        onHeaderClick={() => onFieldClick(index)}
        expanded={isFieldExpandable(field) && activeFieldIndex === index}
        draggableId={field.name}
        index={index}
        leadingButtons={getLeadingButtons(field)}
        headerColumns={getHeaderColumns(field.name, field)}
        ref={newFieldRef}
      >
        {isFieldExpandable(field) && (
          <FieldEditorForm
            name={field.name}
            subForms={subForms}
            onChange={fieldChanged}
            onCancel={cancelEditationWithPrompt}
            addingField={newFieldType !== null}
          />
        )}
      </BarItemDraggable>
    )
  }

  const getSchemaBarItem = (field: FieldData, index: number) => {
    return (
      <SchemaBarItemDraggable
        key={field.name}
        expanded
        draggableId={field.name}
        index={index}
        leadingButtons={getLeadingButtons(field)}
        headerColumns={getHeaderColumns(field.name, field)}
      >
        {field.schemaProperties?.schemaFields.map((schemaField) => (
          <BarItem
            key={schemaField.name}
            expanded={false}
            headerColumns={getHeaderColumns(schemaField.name, schemaField)}
          />
        ))}
      </SchemaBarItemDraggable>
    )
  }

  const saveButtonClicked = useCallback(async () => {
    await setSchemas({ identifiers: schemaIdentifiers })
    setSchemaIdentifiers([])
  }, [schemaIdentifiers, setSchemas])

  return (
    <>
      <ContentWithSidebarLayoutWrapper>
        <Row>
          <Column cols={Cols.Col12} colsLg={Cols.Col8} colsMd={Cols.Col10} colsSm={Cols.Col12}>
            <Headline size={HeadlineSize.M} spacingBottom={Spacing.M}>
              {caption}
            </Headline>
            <StickyHeader>
              <Row>
                <Box spacingBottom={Spacing.XL}>
                  <Button
                    onClick={onAddNewClick}
                    color={ButtonColor.Primary}
                    disabled={newFieldType !== null}
                  >
                    {translations.newFieldButtonLabel}
                  </Button>
                </Box>
                {supportsCategory ? (
                  <Box spacingBottom={Spacing.XL} spacingLeft={Spacing.L}>
                    <Button
                      onClick={onAddNewCategoryClick}
                      color={ButtonColor.Secondary}
                      disabled={newFieldType !== null}
                    >
                      {translations.newCategoryButtonLabel}
                    </Button>
                  </Box>
                ) : null}
                {supportsSchema ? (
                  <Box spacingBottom={Spacing.XL} spacingLeft={Spacing.L}>
                    <Button
                      onClick={onAddNewSchemaClick}
                      color={ButtonColor.Secondary}
                      disabled={newFieldType !== null}
                    >
                      {translations.newSchemaButtonLabel}
                    </Button>
                  </Box>
                ) : null}
              </Row>
            </StickyHeader>

            {callouts
              ? callouts.map((callout, index) => (
                  <Box key={index} spacingBottom={Spacing.XL}>
                    <ConfigurableCallout calloutConfiguration={callout} />
                  </Box>
                ))
              : null}

            <Box spacingBottom={Spacing.L}>
              {(!!fields.length || newFieldType !== null) && (
                <BarItemGroup onDragEnd={onDragEnd} droppableId="droppableId">
                  {fields.map((field, index) =>
                    field.type === FieldType.Schema
                      ? getSchemaBarItem(field, index)
                      : getFieldBarItem(field, index)
                  )}
                  {newFieldType !== null && newFieldType !== FieldType.Schema && (
                    <BarItem
                      onHeaderClick={() => {
                        cancelEditationWithPrompt()
                      }}
                      expanded
                      leadingButtons={[]}
                      headerColumns={getHeaderColumns(getNewItemLabel())}
                      ref={newFieldRef}
                    >
                      <FieldEditorForm
                        name={getNewItemLabel()}
                        subForms={subForms}
                        onChange={fieldChanged}
                        onCancel={cancelEditationWithPrompt}
                        addingField
                      />
                    </BarItem>
                  )}
                </BarItemGroup>
              )}
              {!fields.length && newFieldType === null && (
                <PageMessagePane title={translations.fieldsCollectionEmpty} />
              )}
            </Box>
          </Column>
        </Row>
      </ContentWithSidebarLayoutWrapper>

      {supportsSchema ? (
        <FieldEditorSidePanel
          showSidePanel={sidePanelOpened}
          listingProps={sidePanelProps}
          onSelectionChange={setSchemaIdentifiers}
          onSaveButtonClicked={saveButtonClicked}
          onCloseSidePanel={onSidePanelClosed}
        />
      ) : null}

      <PromptDialogComponent {...promptDialogData} />
    </>
  )
}
