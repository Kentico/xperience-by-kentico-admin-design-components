import * as React from 'react';
/**
 * ContentItemEditTemplate
 *
 * Template for editing content items with form fields, menu actions,
 * and workflow state management.
 *
 * Features:
 * - Content item form editing with validation
 * - Menu actions for content operations (save, publish, etc.)
 * - Display name editing with validation
 * - Notification bar messages
 * - Responsive layout with sidebar support
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from 'react'
import {
  Box,
  Button,
  ButtonColor,
  Cols,
  Column,
  Headline,
  HeadlineSize,
  InlineSpacingXDirection,
  Input,
  NotificationBarInfo,
  Paper,
  RoutingContentPlaceholder,
  Spacing,
  Stack,
  StickyHeader,
  Tag,
} from '@/components'
import type {
  ContentItemEditTemplateProps,
  ContentItemState,
  ContentItemAction,
  ContentItemCommandResult,
  ContentItemCommandParameters,
  ContentItemSubmissionCommandParameters,
  ContentItemChangeCommandArguments,
  FormItems,
  FormValues,
  FormRef,
  SubmitEventHandler,
  ValidatedFormChangeEvent,
  FormChangeResult,
  EditableHeaderConfirmResult,
  NavigationItem,
  NavigationConfiguration,
  TemplatePropertiesContextType,
  FormComponentProps,
  ContentItemStatus,
} from './ContentItemEditTemplate.types'
import {
  ContentItemCommandResultStatus,
  FormEditMode,
} from './ContentItemEditTemplate.types'
import './ContentItemEditTemplate.css'

// ============================================================================
// Local Translations
// ============================================================================

const translations = {
  'admin.base.contentItems.editContentItem.noFieldsTitle':
    'No form fields available',
  'admin.base.contentItems.createLanguageVariant.infoMessage':
    'Creating language variant...',
} as const

function t(key: keyof typeof translations): string {
  return translations[key] ?? key
}

// ============================================================================
// Stub Contexts
// ============================================================================

const TemplatePropertiesContext = createContext<TemplatePropertiesContextType>({
  navigation: { items: [] },
})

/**
 * Content context for language-related state.
 */
interface ContentContextType {
  languageName: string
}

const ContentContext = createContext<ContentContextType>({
  languageName: 'en-US',
})

/**
 * Hook to access content context.
 */
function useContentContext(): ContentContextType {
  return useContext(ContentContext)
}

// ============================================================================
// Stub Hooks
// ============================================================================

/**
 * Stub hook for page command provider.
 */
function usePageCommandProvider(): {
  executeCommand: <TResult, TData>(
    commandName: string,
    data?: TData
  ) => Promise<TResult | undefined>
} {
  const executeCommand = useCallback(
    async <TResult, TData>(
      _commandName: string,
      _data?: TData
    ): Promise<TResult | undefined> => {
      // Stub: In real implementation, this would call server
      return undefined
    },
    []
  )

  return { executeCommand }
}

/**
 * Stub hook for page path.
 */
function usePagePath(): string {
  return typeof window !== 'undefined' ? window.location.pathname : '/'
}

/**
 * Stub hook for navigation dialog blocker.
 */
function useNavigationDialogBlocker(): {
  setDialogSuppressed: (id: string, suppressed: boolean) => void
} {
  return {
    setDialogSuppressed: (_id: string, _suppressed: boolean) => {
      // Stub: would suppress/show the navigation confirmation dialog
    },
  }
}

/**
 * Stub hook for notify if slow operations.
 */
function useNotifyIfSlow(): {
  notifyIfSlow: <T>(
    promise: Promise<T>,
    message: string
  ) => Promise<T | undefined>
} {
  const notifyIfSlow = useCallback(
    async <T,>(promise: Promise<T>, _message: string): Promise<T | undefined> => {
      try {
        return await promise
      } catch {
        return undefined
      }
    },
    []
  )

  return { notifyIfSlow }
}

/**
 * Stub hook for string with typed values formatting.
 */
function useStringWithTypedValues(): {
  formatStringWithValues: (message: { message: string } | undefined) => string
} {
  const formatStringWithValues = useCallback(
    (message: { message: string } | undefined): string => {
      return message?.message ?? ''
    },
    []
  )

  return { formatStringWithValues }
}

/**
 * Stub hook for content item menu actions.
 */
function useContentItemMenuActions(): {
  actions: ContentItemAction[]
  setActions: (actions: ContentItemAction[]) => void
  onActionClick: (actionName: string) => void
} {
  const [actions, setActions] = useState<ContentItemAction[]>([])

  const onActionClick = useCallback((actionName: string) => {
    setActions((prev) =>
      prev.map((action) =>
        action.name === actionName ? { ...action, inProgress: true } : action
      )
    )
  }, [])

  return { actions, setActions, onActionClick }
}

/**
 * Stub hook for rename functionality.
 */
function useRename(onNameUpdate: (newName: string) => void): {
  updateDisplayName: (newName: string) => Promise<EditableHeaderConfirmResult>
  validateDisplayName: (newName: string) => Promise<EditableHeaderConfirmResult>
} {
  const updateDisplayName = useCallback(
    async (newName: string): Promise<EditableHeaderConfirmResult> => {
      onNameUpdate(newName)
      return { isValid: true }
    },
    [onNameUpdate]
  )

  const validateDisplayName = useCallback(
    async (_newName: string): Promise<EditableHeaderConfirmResult> => {
      // Stub: would validate the name on server
      return { isValid: true }
    },
    []
  )

  return { updateDisplayName, validateDisplayName }
}

/**
 * Stub hook for secondary menu navigation.
 */
function useSecondaryMenuNavigation(): {
  navigation: NavigationItem[]
  push: (nav: NavigationConfiguration, path: string) => void
  pop: () => void
  refreshItem: (index: number, name: string) => void
} {
  return {
    navigation: [],
    push: () => {},
    pop: () => {},
    refreshItem: () => {},
  }
}

/**
 * Stub hook for breadcrumbs.
 */
function useBreadcrumbs(): {
  breadcrumbs: NavigationItem[]
  setStatusNode: (node: ReactNode) => void
  refreshItem: (index: number, name: string) => void
} {
  return {
    breadcrumbs: [],
    setStatusNode: () => {},
    refreshItem: () => {},
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Find last index helper function.
 */
function findLastIndex<T>(
  array: T[],
  predicate: (item: T) => boolean
): number {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      return i
    }
  }
  return -1
}

/**
 * Get more restrictive edit mode.
 */
function getMoreRestrictiveEditMode(
  mode1: FormEditMode,
  mode2: FormEditMode
): FormEditMode {
  if (mode1 === FormEditMode.ReadOnly || mode2 === FormEditMode.ReadOnly) {
    return FormEditMode.ReadOnly
  }
  if (mode1 === FormEditMode.Disabled || mode2 === FormEditMode.Disabled) {
    return FormEditMode.Disabled
  }
  return FormEditMode.Default
}

/**
 * Handles form change with dependencies.
 */
async function handleChangeWithDependencies(
  e: ValidatedFormChangeEvent,
  change: (values: FormValues) => Promise<void>
): Promise<void> {
  const values: FormValues = {}
  e.fields.forEach((field) => {
    values[field.fieldName] = field.value
  })
  await change(values)
}

// ============================================================================
// Stub Components
// ============================================================================

/**
 * ContentWithSidebarLayoutWrapper - Layout wrapper for content with optional sidebar.
 */
const ContentWithSidebarLayoutWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <div className={'ContentItemEditTemplate-layoutWrapper'}>{children}</div>
}

/**
 * ContentVersionStatus - Displays content version status badge.
 */
const ContentVersionStatus: FC<{
  status: ContentItemStatus
  showLabel?: boolean
  showTooltip?: boolean
}> = ({ status, showLabel = false }) => {
  return (
    <div className={'ContentItemEditTemplate-statusWrapper'}>
      <Tag label={status.label} />
      {showLabel && <span>{status.label}</span>}
    </div>
  )
}

/**
 * ContentItemMenuActions - Renders content item action buttons.
 */
const ContentItemMenuActions: FC<{
  actions: ContentItemAction[]
  actionExecutor: (action: ContentItemAction) => Promise<void>
  actionsSpacingDirection?: InlineSpacingXDirection
}> = ({ actions, actionExecutor }) => {
  if (!actions || actions.length === 0) {
    return null
  }

  return (
    <Stack spacing={Spacing.S}>
      {actions.map((action) => (
        <Button
          key={action.name}
          color={action.isDestructive ? ButtonColor.Secondary : ButtonColor.Primary}
          onClick={() => actionExecutor(action)}
          disabled={action.disabled || action.inProgress}
          title={action.tooltipText}
          label={action.label}
        />
      ))}
    </Stack>
  )
}

/**
 * ContentItemEditForm - Form component for editing content items.
 */
const ContentItemEditForm: FC<{
  formName: string
  formEditMode: FormEditMode
  disabledHeader: boolean
  displayName: string
  items: FormItems
  formRef: React.RefObject<FormRef | null>
  onSubmit: (e: SubmitEventHandler, actionName?: string) => Promise<void>
  onDisplayNameUpdate: (newName: string) => Promise<EditableHeaderConfirmResult>
  onChange: (e: ValidatedFormChangeEvent) => Promise<void>
}> = ({
  formEditMode,
  disabledHeader,
  displayName,
  items,
  formRef,
  onSubmit,
  onDisplayNameUpdate,
  onChange,
}) => {
  const [values, setValues] = useState<FormValues>(() => {
    const initial: FormValues = {}
    items.forEach((item) => {
      const field = item as FormComponentProps
      if (field.name) {
        initial[field.name] = field.value
      }
    })
    return initial
  })
  const [dataChanged, setDataChanged] = useState(false)
  const [editingName, setEditingName] = useState(displayName)
  const pendingActionRef = useRef<string | undefined>(undefined)

  // Update editingName when displayName prop changes
  useEffect(() => {
    setEditingName(displayName)
  }, [displayName])

  // Expose form methods via ref
  useEffect(() => {
    if (formRef) {
      const formMethods: FormRef = {
        submit: async (actionName?: string) => {
          pendingActionRef.current = actionName
          await onSubmit({ values }, actionName)
        },
        resetDataChanged: () => setDataChanged(false),
        getFormValues: () => values,
        dataChanged,
      }
      ;(formRef as React.MutableRefObject<FormRef | null>).current = formMethods
    }
  }, [formRef, values, dataChanged, onSubmit])

  const handleFieldChange = useCallback(
    async (fieldName: string, value: unknown) => {
      setValues((prev) => ({ ...prev, [fieldName]: value }))
      setDataChanged(true)

      const fields = items.map((item) => {
        const field = item as FormComponentProps
        return {
          fieldName: field.name,
          value: field.name === fieldName ? value : values[field.name],
          validationResults: [],
        }
      })
      await onChange({ changedFieldName: fieldName, fields })
    },
    [items, onChange, values]
  )

  const handleNameBlur = useCallback(async () => {
    if (editingName !== displayName) {
      await onDisplayNameUpdate(editingName)
    }
  }, [editingName, displayName, onDisplayNameUpdate])

  const isDisabled =
    formEditMode === FormEditMode.Disabled ||
    formEditMode === FormEditMode.ReadOnly

  return (
    <div>
      {/* Display name field (editable header) */}
      {displayName !== undefined && (
        <div className={'ContentItemEditTemplate-formFieldWrapper'}>
          <div className={'ContentItemEditTemplate-formFieldLabel'}>Display Name</div>
          <Input
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
            onBlur={handleNameBlur}
            disabled={isDisabled || disabledHeader}
            name="displayName"
          />
        </div>
      )}

      {/* Form fields */}
      {items.map((item) => {
        const field = item as FormComponentProps
        return (
          <div key={field.name} className={'ContentItemEditTemplate-formFieldWrapper'}>
            {field.label && (
              <div className={'ContentItemEditTemplate-formFieldLabel'}>{field.label}</div>
            )}
            <Input
              name={field.name}
              value={String(values[field.name] ?? '')}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              disabled={isDisabled}
            />
            {field.validationResults?.map(
              (result, idx) =>
                !result.isValid && (
                  <div key={idx} className={'ContentItemEditTemplate-formFieldError'}>
                    {result.errorMessage}
                  </div>
                )
            )}
          </div>
        )
      })}
    </div>
  )
}

/**
 * PageMessagePane - Displays a message for empty states.
 */
const PageMessagePane: FC<{ title: string }> = ({ title }) => {
  return (
    <div className={'ContentItemEditTemplate-pageMessagePane'}>
      <div className={'ContentItemEditTemplate-pageMessageTitle'}>{title}</div>
    </div>
  )
}

// ============================================================================
// Edit Template Commands
// ============================================================================

const ContentItemEditTemplateCommands = {
  ConfirmSelection: 'ConfirmSelection',
  ValidateName: 'ValidateName',
  Change: 'Change',
} as const

// ============================================================================
// ContentItemEditTemplate Component
// ============================================================================

/**
 * ContentItemEditTemplate - Main template for editing content items.
 *
 * Provides content item editing with:
 * - Form fields with validation
 * - Menu actions for content operations
 * - Display name editing with validation
 * - Notification bar messages
 * - Responsive layout with sidebar support
 *
 * @example
 * ```tsx
 * <ContentItemEditTemplate
 *   headline="Edit Article"
 *   items={formItems}
 *   state={contentItemState}
 *   createFormNamePrefix="Article"
 *   editMode={FormEditMode.Default}
 *   formHeadings={{
 *     heading: 'Create New Article',
 *     subheading: 'Fill in the article details below.',
 *   }}
 * />
 * ```
 */
export const ContentItemEditTemplate: FC<ContentItemEditTemplateProps> = ({
  headline,
  items,
  state,
  createFormNamePrefix,
  editMode,
  formHeadings,
}) => {
  const { formatStringWithValues } = useStringWithTypedValues()
  const { languageName } = useContentContext()
  const { setDialogSuppressed } = useNavigationDialogBlocker()
  const { notifyIfSlow } = useNotifyIfSlow()

  const formRef = useRef<FormRef>(null)
  const promptSuppressionId = useId()

  const { actions, setActions, onActionClick } = useContentItemMenuActions()
  const { executeCommand } = usePageCommandProvider()

  const [currentState, setCurrentState] = useState<ContentItemState>(state)
  const [renderedItems, setRenderedItems] = useState<FormItems>(items)

  const pagePath = usePagePath()
  const { navigation } = useContext(TemplatePropertiesContext)
  const {
    navigation: secondaryNavigation,
    refreshItem: refreshNavigation,
    push,
    pop,
  } = useSecondaryMenuNavigation()
  const {
    breadcrumbs,
    setStatusNode,
    refreshItem: refreshBreadcrumb,
  } = useBreadcrumbs()

  useEffect(() => {
    if (navigation.items.length) {
      push(navigation, pagePath)
      return navigation.isTemporary ? pop : () => {}
    }
    return () => {}
  }, [navigation, pagePath, push, pop])

  useEffect(() => {
    return () => {
      setDialogSuppressed(promptSuppressionId, false)
    }
  }, [promptSuppressionId, setDialogSuppressed])

  useEffect(() => {
    if (currentState) {
      setActions(currentState.menuActions)

      if (
        currentState.contentTypeId > 0 &&
        currentState.displayName !== null &&
        currentState.status
      ) {
        setStatusNode(
          <ContentVersionStatus
            status={currentState.status}
            showLabel
            showTooltip
          />
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState])

  const propagateDisplayNameUpdate = useCallback(
    (newName: string) => {
      setCurrentState((prev) => ({ ...prev, displayName: newName }))
      refreshBreadcrumb(
        findLastIndex(breadcrumbs, (breadcrumb) => !!breadcrumb.isSignificant),
        newName
      )
      refreshNavigation(
        findLastIndex(
          secondaryNavigation,
          (navigationItem) => !!navigationItem.isSignificant
        ),
        newName
      )
    },
    [breadcrumbs, secondaryNavigation, refreshBreadcrumb, refreshNavigation]
  )

  const { updateDisplayName, validateDisplayName } = useRename(
    propagateDisplayNameUpdate
  )

  const handleChange = useCallback(
    async (e: ValidatedFormChangeEvent) => {
      await handleChangeWithDependencies(e, async (values) => {
        const result = await executeCommand<
          FormChangeResult,
          ContentItemChangeCommandArguments
        >(ContentItemEditTemplateCommands.Change, {
          data: values,
          contentTypeId: currentState.contentTypeId,
        })
        if (result?.items) {
          setRenderedItems(result.items)
        }
      })
    },
    [currentState.contentTypeId, executeCommand]
  )

  // Props don't have to be correctly initialized in case when RedirectUrl is set.
  // We can skip render completely to avoid unexpected usages of uninitialized props.
  if (!state || !items) {
    return null
  }

  const resetActionsLoadingState = () => {
    setActions(currentState.menuActions)
  }

  const executeAction = async (action: ContentItemAction) => {
    if (action.useFormSubmit) {
      formRef.current?.submit(action.name)
    } else {
      await executeActionCommand(action)
    }
  }

  const executeActionCommand = async (action: ContentItemAction) => {
    onActionClick(action.name)

    if (action.confirmation) {
      setDialogSuppressed(promptSuppressionId, true)
    }

    const data = { languageName } as ContentItemCommandParameters
    const result = await executeCommand<
      ContentItemCommandResult,
      ContentItemCommandParameters
    >(action.name, data)

    setDialogSuppressed(promptSuppressionId, false)
    resetActionsLoadingState()

    if (!result || result.status === ContentItemCommandResultStatus.Error) {
      return
    }

    if (result.items) {
      // There are actions where the value of form fields is changed on the server.
      // If items are not cleared the refreshed value is not applied due to the merging logic in a form.
      setRenderedItems([])
      setRenderedItems(result.items)
    }

    formRef.current?.resetDataChanged()

    if (result.state) {
      setCurrentState(result.state)
    }
  }

  const handleSubmit = async (e: SubmitEventHandler, actionName?: string) => {
    if (!actionName) {
      return
    }

    onActionClick(actionName)
    setDialogSuppressed(promptSuppressionId, true)

    const updateBeforeProcessing = formRef.current?.dataChanged ?? false
    const data = {
      data: e.values,
      updateBeforeProcessing,
      updateBeforePublish: updateBeforeProcessing,
      contentItemName: currentState.displayName,
      contentTypeId: currentState.contentTypeId,
      contentFolderId: currentState.contentFolderId,
      workspaceId: currentState.workspaceId,
      languageName,
    } as ContentItemSubmissionCommandParameters

    const result = await notifyIfSlow<ContentItemCommandResult | undefined>(
      executeCommand<
        ContentItemCommandResult,
        ContentItemSubmissionCommandParameters
      >(actionName, data),
      t('admin.base.contentItems.createLanguageVariant.infoMessage')
    )

    setDialogSuppressed(promptSuppressionId, false)
    setActions(currentState.menuActions)

    if (!result || result.status === ContentItemCommandResultStatus.Error) {
      return
    }

    if (result.items) {
      setRenderedItems(result.items)
    }

    if (result.status === ContentItemCommandResultStatus.Success) {
      setCurrentState(result.state)

      if (actionName !== ContentItemEditTemplateCommands.ConfirmSelection) {
        formRef.current?.resetDataChanged()
      }

      if (result.redirectUrl) {
        // Navigate to redirect URL - in real implementation would use router
        window.location.href = result.redirectUrl
      }
    }
  }

  const updateContentItemName = async (
    newName: string
  ): Promise<EditableHeaderConfirmResult> => {
    const result = await validateDisplayName(newName)

    if (result.isValid) {
      if (currentState.id > 0) {
        return updateDisplayName(newName)
      }

      setCurrentState((prev) => ({ ...prev, displayName: newName }))
    }

    return result
  }

  return (
    <>
      <ContentWithSidebarLayoutWrapper>
        <Column cols={Cols.Col12} colsMd={Cols.Col10} colsLg={Cols.Col8}>
          <Stack spacing={Spacing.XL}>
            <Headline size={HeadlineSize.M}>{headline}</Headline>
            <StickyHeader>
              <Box spacingBottom={Spacing.S}>
                <ContentItemMenuActions
                  actions={actions}
                  actionExecutor={executeAction}
                  actionsSpacingDirection={InlineSpacingXDirection.Right}
                />
              </Box>
              {currentState?.notificationBarMessage ? (
                <Box>
                  <NotificationBarInfo>
                    {formatStringWithValues(currentState.notificationBarMessage)}
                  </NotificationBarInfo>
                </Box>
              ) : null}
            </StickyHeader>
            <Paper>
              <Box
                spacing={Spacing.XXL}
                className={'ContentItemEditTemplate-editTemplateContent'}
              >
                {currentState &&
                !currentState.id &&
                !currentState.displayName &&
                formHeadings ? (
                  <>
                    <Headline size={HeadlineSize.L} spacingBottom={Spacing.XL}>
                      {formHeadings.heading}
                    </Headline>
                    <Box spacingBottom={Spacing.XL} className={'ContentItemEditTemplate-subheading'}>
                      {formHeadings.subheading}
                    </Box>
                  </>
                ) : null}
                <ContentItemEditForm
                  formName={
                    currentState.id > 0
                      ? 'DefaultForm'
                      : `${createFormNamePrefix}:${currentState.contentTypeId}`
                  }
                  formEditMode={getMoreRestrictiveEditMode(
                    currentState.editMode,
                    editMode
                  )}
                  disabledHeader={editMode !== FormEditMode.Default}
                  displayName={currentState.displayName}
                  items={renderedItems}
                  formRef={formRef}
                  onSubmit={handleSubmit}
                  onDisplayNameUpdate={updateContentItemName}
                  onChange={handleChange}
                />
                {renderedItems.length === 0 && (
                  <PageMessagePane
                    title={t('admin.base.contentItems.editContentItem.noFieldsTitle')}
                  />
                )}
              </Box>
            </Paper>
          </Stack>
        </Column>
      </ContentWithSidebarLayoutWrapper>
      <RoutingContentPlaceholder />
    </>
  )
}

// Re-export types and constants for convenience
export {
  ContentItemCommandResultStatus,
  FormEditMode,
  ContentContext,
  useContentContext,
}
