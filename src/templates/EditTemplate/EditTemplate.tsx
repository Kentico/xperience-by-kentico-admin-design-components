import * as React from 'react';
/**
 * EditTemplate
 *
 * Core template for editing forms with validation, confirmation dialogs,
 * callouts, and notification bar support.
 *
 * Features:
 * - Form editing with validation
 * - Confirmation dialogs before submit
 * - Callouts (quick tips, friendly warnings)
 * - Notification bar messages
 * - Responsive layout with sidebar support
 * - Portal-based action rendering
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import {
  Box,
  BorderRadius,
  Button,
  ButtonColor,
  Callout,
  CalloutType as CalloutTypeComponent,
  CalloutPlacementType as CalloutPlacementTypeComponent,
  Cols,
  Column,
  Headline,
  HeadlineSize,
  Input,
  LinkButton,
  NotificationBarAlert,
  NotificationBarInfo,
  NotificationBarWarning,
  Paper,
  Row,
  Spacing,
  Stack,
  StickyHeader,
  RoutingContentPlaceholder,
} from '@/components'
import { useMediaBreakpoints } from '@/hooks'
import { EditTemplateActionComponentLoader } from './TemplateActions'
import type {
  EditTemplateProps,
  EditCalloutConfiguration,
  FormItems,
  FormValues,
  FormRef,
  FormChangeResult,
  SubmitEventHandler,
  ValidatedFormChangeEvent,
  ValidationResult,
  FormComponentProps,
  NotificationBarMessageWithType,
  NotificationBarActionHandler,
  NavigationItem,
  NavigationConfiguration,
  TemplatePropertiesContextType,
} from './EditTemplate.types'
import {
  FormEditMode,
  FormSubmissionStatus,
  CalloutType,
  NotificationBarType,
} from './EditTemplate.types'
import type { EditPageSuccessFormSubmissionResult } from './TemplateActions'
import './EditTemplate.css'

// ============================================================================
// Local Translations
// ============================================================================

const translations = {
  'admin.base.edit.noElementTitle': 'No form elements',
  'admin.base.edit.noElementText':
    'This page does not contain any editable elements.',
  'callout.quickTip': 'Quick tip',
  'callout.friendlyWarning': 'Friendly warning',
  'dialog.confirm': 'Confirm',
  'dialog.cancel': 'Cancel',
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
 * Hook to access template properties context.
 */
export function useTemplateProperties(): TemplatePropertiesContextType {
  return useContext(TemplatePropertiesContext)
}

// ============================================================================
// Stub Hooks
// ============================================================================

/**
 * Stub hook for page commands.
 * In the full implementation, this executes server commands.
 */
function usePageCommand<TResult = unknown, TData = unknown>(
  _commandName: string,
  options?: {
    before?: () => void
    after?: (result: TResult | undefined) => void
  }
): {
  execute: (data?: TData) => Promise<TResult | undefined>
} {
  const afterCallback = useRef(options?.after)
  const beforeCallback = useRef(options?.before)
  afterCallback.current = options?.after
  beforeCallback.current = options?.before

  const execute = useCallback(async (_data?: TData): Promise<TResult | undefined> => {
    beforeCallback.current?.()

    // Stub: In real implementation, this would call server
    // Return undefined to simulate no server response
    const result = undefined
    afterCallback.current?.(result)
    return result
  }, [])

  return { execute }
}

/**
 * Stub hook for navigation dialog blocker.
 * Prevents accidental navigation when form has unsaved changes.
 */
function useNavigationDialogBlocker() {
  return {
    setDialogSuppressed: (_id: string, _suppressed: boolean) => {
      // Stub: would suppress/show the navigation confirmation dialog
    },
    resetDialogTexts: () => {
      // Stub: would reset dialog texts to defaults
    },
    setDialogTexts: (_texts: unknown) => {
      // Stub: would set custom dialog texts
    },
  }
}

/**
 * Stub hook for refetch all context.
 * Triggers data refresh across all templates.
 */
function useRefetchAllContext(): { refetchDataInTemplates: () => void } {
  return {
    refetchDataInTemplates: () => {
      // Stub: would trigger data refresh
    },
  }
}

/**
 * Stub hook for nested page context.
 * Provides nested page actions and state.
 */
function useNestedPage(): {
  isNested: boolean
  setActions: (actions: unknown) => void
} {
  return {
    isNested: false,
    setActions: () => {
      // Stub: would set nested page actions
    },
  }
}

/**
 * Stub hook for template dialog context.
 * Controls dialog appearance when edit template is rendered in a dialog.
 */
function useTemplateDialog(): {
  setTitle: (title: string) => void
  isInDialog: boolean
  closeDialog: () => void
  setMinWidth: (width: number) => void
  setMaxWidth: (width: number) => void
  setActionInProgress: (inProgress: boolean) => void
} {
  return {
    setTitle: () => {},
    isInDialog: false,
    closeDialog: () => {},
    setMinWidth: () => {},
    setMaxWidth: () => {},
    setActionInProgress: () => {},
  }
}

/**
 * Stub hook for template side panel context.
 * Controls side panel appearance when edit template is rendered in a side panel.
 */
function useTemplateSidePanel(): {
  setTitle: (title: string) => void
  isInSidePanel: boolean
  closeSidePanel: () => void
  setWidth: (width: number) => void
  setActionInProgress: (inProgress: boolean) => void
} {
  return {
    setTitle: () => {},
    isInSidePanel: false,
    closeSidePanel: () => {},
    setWidth: () => {},
    setActionInProgress: () => {},
  }
}

/**
 * Stub hook for page path.
 * Returns current page path for navigation.
 */
function usePagePath(): string {
  return typeof window !== 'undefined' ? window.location.pathname : '/'
}

/**
 * Stub hook for breadcrumbs context.
 */
function useBreadcrumbs(): {
  breadcrumbs: NavigationItem[]
  refreshItem: (index: number, name: string) => void
} {
  return {
    breadcrumbs: [],
    refreshItem: () => {},
  }
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

// ============================================================================
// Stub Components
// ============================================================================

/**
 * ContentWithSidebarLayoutWrapper - Layout wrapper for content with optional sidebar.
 */
function ContentWithSidebarLayoutWrapper({
  children,
}: {
  children: ReactNode
}) {
  return <div className={'EditTemplate-layoutWrapper'}>{children}</div>
}

/**
 * PageMessagePane - Displays a message with title and optional text.
 */
function PageMessagePane({ title, text }: { title: string; text: string }) {
  return (
    <div className={'EditTemplate-pageMessagePane'}>
      <div className={'EditTemplate-pageMessageTitle'}>{title}</div>
      {text && <div className={'EditTemplate-pageMessageText'}>{text}</div>}
    </div>
  )
}

/**
 * Portal - Renders children into a DOM node outside the parent hierarchy.
 */
function Portal({
  children,
  container,
}: {
  children: ReactNode
  container: Element
}) {
  return createPortal(children, container)
}

/**
 * ConfirmationDialog - Dialog for confirming actions with optional form.
 */
const ConfirmationDialog: FC<{
  headline: string
  confirmationButtonLabel: string
  isConfirmationButtonDestructive: boolean
  formItems?: FormItems
  onCancellation: () => void
  onConfirmation: (e: SubmitEventHandler | undefined) => Promise<void>
  actionInProgress: boolean
  children?: ReactNode
}> = ({
  headline,
  confirmationButtonLabel,
  onCancellation,
  onConfirmation,
  actionInProgress,
  children,
  formItems,
}) => {
  const [formValues, setFormValues] = useState<FormValues>({})

  const handleConfirm = useCallback(async () => {
    await onConfirmation({ values: formValues })
  }, [formValues, onConfirmation])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      }}
    >
      <Paper borderRadius={BorderRadius.Large}>
        <Box spacing={Spacing.XL}>
          <Headline size={HeadlineSize.M} spacingBottom={Spacing.L}>
            {headline}
          </Headline>
          {children}
          {formItems && formItems.length > 0 && (
            <div className={'EditTemplate-formWrapper'}>
              {formItems.map((item) => {
                const field = item as FormComponentProps
                return (
                  <div key={field.name} className={'EditTemplate-formFieldWrapper'}>
                    {field.label && (
                      <div className={'EditTemplate-formFieldLabel'}>{field.label}</div>
                    )}
                    <Input
                      name={field.name}
                      value={String(formValues[field.name] ?? field.value ?? '')}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          [field.name]: e.target.value,
                        }))
                      }
                    />
                  </div>
                )
              })}
            </div>
          )}
          <Row spacing={Spacing.M}>
            <Button
              color={ButtonColor.Secondary}
              onClick={onCancellation}
              disabled={actionInProgress}
            >
              {t('dialog.cancel')}
            </Button>
            <Button
              color={ButtonColor.Primary}
              onClick={handleConfirm}
              disabled={actionInProgress}
            >
              {confirmationButtonLabel}
            </Button>
          </Row>
        </Box>
      </Paper>
    </div>
  )
}

/**
 * Form - Stub form component for rendering form fields.
 */
const Form = ({
  items,
  onSubmit,
  onChange,
  formRef,
}: {
  items: FormItems
  onSubmit: (e: SubmitEventHandler) => Promise<void>
  onChange?: (e: ValidatedFormChangeEvent) => Promise<void>
  editMode?: FormEditMode
  formRef?: React.RefObject<FormRef | null>
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

  // Expose form methods via ref
  useEffect(() => {
    if (formRef?.current === null && formRef) {
      const formMethods: FormRef = {
        submit: async () => {
          await onSubmit({ values })
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

      if (onChange) {
        const fields = items.map((item) => {
          const field = item as FormComponentProps
          return {
            fieldName: field.name,
            value: field.name === fieldName ? value : values[field.name],
            validationResults: [] as ValidationResult[],
          }
        })
        await onChange({ changedFieldName: fieldName, fields })
      }
    },
    [items, onChange, values]
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      await onSubmit({ values })
    },
    [onSubmit, values]
  )

  return (
    <form onSubmit={handleSubmit}>
      {items.map((item) => {
        const field = item as FormComponentProps
        return (
          <div key={field.name} className={'EditTemplate-formFieldWrapper'}>
            {field.label && (
              <div className={'EditTemplate-formFieldLabel'}>{field.label}</div>
            )}
            <Input
              name={field.name}
              value={String(values[field.name] ?? '')}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
            />
            {field.validationResults?.map(
              (result, idx) =>
                !result.isValid && (
                  <div key={idx} className={'EditTemplate-formFieldError'}>
                    {result.errorMessage}
                  </div>
                )
            )}
          </div>
        )
      })}
    </form>
  )
}

/**
 * NotificationList - Renders notification bar messages.
 */
const NotificationList: FC<{
  notificationBarMessages?: NotificationBarMessageWithType[]
  notificationBarActionHandler: NotificationBarActionHandler
}> = ({ notificationBarMessages, notificationBarActionHandler }) => {
  if (!notificationBarMessages || notificationBarMessages.length === 0) {
    return null
  }

  return (
    <div className={'EditTemplate-notificationList'}>
      {notificationBarMessages.map((message, index) => {
        const actionButton = message.actionButton && (
          <Button
            color={ButtonColor.Primary}
            onClick={() => {
              notificationBarActionHandler.onBeforeExecuteCommand()
              // Stub: would execute action
              notificationBarActionHandler.onAfterExecuteCommand(undefined)
            }}
            disabled={notificationBarActionHandler.disabled}
          >
            {message.actionButton.text}
          </Button>
        )

        switch (message.type) {
          case NotificationBarType.Alert:
            return (
              <NotificationBarAlert
                key={index}
                actions={actionButton}
              >
                {message.headline ? <strong>{message.headline}</strong> : null}
                {message.message}
              </NotificationBarAlert>
            )
          case NotificationBarType.Warning:
            return (
              <NotificationBarWarning
                key={index}
                actions={actionButton}
              >
                {message.headline ? <strong>{message.headline}</strong> : null}
                {message.message}
              </NotificationBarWarning>
            )
          case NotificationBarType.Info:
          default:
            return (
              <NotificationBarInfo
                key={index}
                actions={actionButton}
              >
                {message.headline ? <strong>{message.headline}</strong> : null}
                {message.message}
              </NotificationBarInfo>
            )
        }
      })}
    </div>
  )
}

/**
 * NotificationContainer - Container wrapper for notifications with column layout.
 */
const NotificationContainer: FC<{
  notificationBarMessages?: NotificationBarMessageWithType[]
  notificationBarActionHandler: NotificationBarActionHandler
  cols: Cols
  colsMd: Cols
  colsLg: Cols
}> = ({
  notificationBarMessages,
  notificationBarActionHandler,
  cols,
  colsMd,
  colsLg,
}) => {
  if (!notificationBarMessages || notificationBarMessages.length === 0) {
    return null
  }

  return (
    <Column cols={cols} colsMd={colsMd} colsLg={colsLg}>
      <NotificationList
        notificationBarMessages={notificationBarMessages}
        notificationBarActionHandler={notificationBarActionHandler}
      />
    </Column>
  )
}

// ============================================================================
// EditTemplate Commands
// ============================================================================

const EditTemplateCommands = {
  Change: 'Change',
  Submit: 'Submit',
} as const

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Renders callouts from configuration array.
 */
function renderCallouts(calloutsConfiguration: EditCalloutConfiguration[]) {
  return calloutsConfiguration.map((callout, index) => {
    const handleActionClick = () => {
      if (callout.actionButton?.redirectUrl) {
        if (callout.actionButton.openInNewTab) {
          window.open(callout.actionButton.redirectUrl, '_blank')
        } else {
          window.location.href = callout.actionButton.redirectUrl
        }
      }
    }

    const actionButtonElement = callout.actionButton && (
      <Button
        color={ButtonColor.Primary}
        onClick={handleActionClick}
        disabled={callout.actionButton.disabled || callout.actionButton.inProgress}
      >
        {callout.actionButton.text}
      </Button>
    )

    const calloutType =
      callout.type === CalloutType.QuickTip
        ? CalloutTypeComponent.QuickTip
        : CalloutTypeComponent.FriendlyWarning

    const subheadlineText =
      callout.type === CalloutType.QuickTip
        ? t('callout.quickTip')
        : t('callout.friendlyWarning')

    return (
      <Callout
        key={index}
        type={calloutType}
        placement={
          callout.placement === 'onPaper'
            ? CalloutPlacementTypeComponent.OnPaper
            : CalloutPlacementTypeComponent.OnDesk
        }
        headline={callout.headline}
        actionButton={actionButtonElement}
        subheadline={subheadlineText}
      >
        {callout.contentAsHtml ? (
          <div dangerouslySetInnerHTML={{ __html: callout.content }} />
        ) : (
          callout.content
        )}
      </Callout>
    )
  })
}

/**
 * Handles form change with dependencies.
 * Processes field changes and triggers server-side dependency resolution.
 */
async function handleChangeWithDependencies(
  e: ValidatedFormChangeEvent,
  change: (data: { data: FormValues; changedFieldName: string }) => Promise<unknown>
) {
  const data: FormValues = {}
  e.fields.forEach((field) => {
    data[field.fieldName] = field.value
  })
  await change({ data, changedFieldName: e.changedFieldName })
}

// ============================================================================
// EditTemplate Component
// ============================================================================

/**
 * EditTemplate - Core template for editing forms.
 *
 * Provides a complete form editing experience with:
 * - Form fields with validation
 * - Submit button with optional confirmation dialog
 * - Additional action buttons (save and close, etc.)
 * - Callouts for tips and warnings
 * - Notification bar messages
 * - Responsive layout with sidebar support
 * - Portal-based action rendering
 *
 * @example
 * ```tsx
 * <EditTemplate
 *   headline="Edit User"
 *   items={[
 *     { name: 'firstName', label: 'First Name', value: 'John' },
 *     { name: 'lastName', label: 'Last Name', value: 'Doe' },
 *   ]}
 *   submitButton={{
 *     visible: true,
 *     label: 'Save',
 *     tooltipText: 'Save changes',
 *   }}
 *   callouts={[
 *     {
 *       type: 'quickTip',
 *       headline: 'Tip',
 *       content: 'Fill in all required fields.',
 *     },
 *   ]}
 *   disabled={false}
 *   editMode={FormEditMode.Default}
 *   discardChangesDialog={{
 *     headline: 'Discard changes?',
 *     confirmLabel: 'Discard',
 *     cancelLabel: 'Cancel',
 *   }}
 *   actionsPortalID=""
 *   preventDisplayNameUpdate={false}
 *   fullWidth={false}
 * />
 * ```
 */
export function EditTemplate({
  items,
  additionalActions,
  errorMessage,
  disabled,
  editMode,
  headline,
  backLink,
  callouts,
  onSubmitResult,
  submitButton,
  discardChangesDialog,
  actionsPortalID,
  preventDisplayNameUpdate,
  fullWidth,
  notificationBarMessages,
}: EditTemplateProps) {
  const { setDialogSuppressed, resetDialogTexts, setDialogTexts } =
    useNavigationDialogBlocker()
  const { refetchDataInTemplates } = useRefetchAllContext()
  const promptSuppressionId = useId()
  const [formItems, setFormItems] = useState<FormItems>([])
  const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false)
  const [confirmationDialogItems, setConfirmationDialogItems] = useState<
    FormItems | undefined
  >(undefined)
  const submitEventHandlerRef = useRef<SubmitEventHandler | null>(null)
  const [actionInProgress, setActionInProgress] = useState<boolean>(false)

  const formRef = useRef<FormRef | null>(null)

  const breakpoints = useMediaBreakpoints()

  const isDisabled = useMemo(
    () =>
      disabled ||
      editMode === FormEditMode.Disabled ||
      editMode === FormEditMode.ReadOnly,
    [disabled, editMode]
  )

  const { execute: change } = usePageCommand<FormChangeResult, { data: FormValues; changedFieldName: string }>(
    EditTemplateCommands.Change,
    {
      after: (result) => {
        if (result) {
          setFormItems(result.items)
        }
      },
    }
  )

  const {
    isInDialog,
    closeDialog,
    setMinWidth,
    setMaxWidth,
    setTitle,
    setActionInProgress: setDialogActionInProgress,
  } = useTemplateDialog()

  const {
    isInSidePanel,
    closeSidePanel,
    setWidth,
    setTitle: setSidePanelTitle,
    setActionInProgress: setSidePanelActionInProgress,
  } = useTemplateSidePanel()

  const processResult = useCallback(
    (result: EditPageSuccessFormSubmissionResult | undefined) => {
      if (isInDialog) {
        setDialogActionInProgress(false)
      }

      if (isInSidePanel) {
        setSidePanelActionInProgress(false)
      }

      setActionInProgress(false)

      if (result) {
        result.items && setFormItems(result.items as FormItems)
        result.confirmationItems && setConfirmationDialogItems(result.confirmationItems as FormItems)
        onSubmitResult?.(result)

        if (result.status === FormSubmissionStatus.ValidationSuccess) {
          formRef.current?.resetDataChanged()

          if (
            !preventDisplayNameUpdate &&
            result.objectDisplayName !== undefined &&
            result.objectDisplayName !== null
          ) {
            updateObjectDisplayName(result.objectDisplayName)
          }

          if (isInDialog) {
            closeDialog()
          } else if (isInSidePanel) {
            closeSidePanel()
          }

          if (result.refetchAll) {
            refetchDataInTemplates()
          }
        }

        if (result.status !== FormSubmissionStatus.ConfirmationValidationFailure) {
          setConfirmationDialogItems(submitButton.confirmationDialog?.formItems)
          setShowConfirmationDialog(false)
        }
      }

      setDialogSuppressed(promptSuppressionId, false)
    },
    [
      isInDialog,
      isInSidePanel,
      onSubmitResult,
      preventDisplayNameUpdate,
      closeDialog,
      closeSidePanel,
      refetchDataInTemplates,
      submitButton.confirmationDialog?.formItems,
      setDialogSuppressed,
      promptSuppressionId,
      setDialogActionInProgress,
      setSidePanelActionInProgress,
    ]
  )

  const { execute: submit } = usePageCommand<
    EditPageSuccessFormSubmissionResult,
    { data: FormValues; confirmationFormData: FormValues }
  >(EditTemplateCommands.Submit, {
    before: () => {
      setDialogSuppressed(promptSuppressionId, true)

      if (isInSidePanel) {
        setSidePanelActionInProgress(true)
      }

      if (isInDialog) {
        setDialogActionInProgress(true)
      }
    },
    after: processResult,
  })

  // Update navigation item display name
  const { breadcrumbs: breadcrumbContextEntries, refreshItem: refreshBreadcrumb } =
    useBreadcrumbs()
  const {
    navigation: navigationContextEntries,
    push,
    pop,
    refreshItem: refreshNavigation,
  } = useSecondaryMenuNavigation()
  const pagePath = usePagePath()
  const { navigation } = useContext(TemplatePropertiesContext)

  const updateObjectDisplayName = useCallback(
    (value: string) => {
      refreshBreadcrumb(
        findLastIndex(breadcrumbContextEntries, (b) => b.isSignificant === true),
        value
      )
      refreshNavigation(
        findLastIndex(navigationContextEntries, (n) => n.isSignificant === true),
        value
      )
    },
    [
      breadcrumbContextEntries,
      navigationContextEntries,
      refreshBreadcrumb,
      refreshNavigation,
    ]
  )

  // Dialog/SidePanel setup
  useEffect(() => {
    if (isInDialog) {
      setTitle(headline)
      setMinWidth(400)
      const containsObjectSelector = formItems.some((item) => {
        const field = item as FormComponentProps
        return field.componentName === '@kentico/xperience-admin-base/ObjectSelector'
      })
      if (containsObjectSelector) {
        setMaxWidth(800)
      }
    }
  }, [isInDialog, setMinWidth, setMaxWidth, setTitle, headline, formItems])

  useEffect(() => {
    if (isInSidePanel) {
      setSidePanelTitle(headline)
      setWidth(480)
    }
  }, [isInSidePanel, setSidePanelTitle, setWidth, headline])

  // Discard changes dialog setup
  useEffect(() => {
    setDialogTexts(discardChangesDialog)
    return () => {
      resetDialogTexts()
    }
  }, [discardChangesDialog, resetDialogTexts, setDialogTexts])

  useEffect(() => {
    return () => {
      setDialogSuppressed(promptSuppressionId, false)
    }
  }, [promptSuppressionId, setDialogSuppressed])

  // Nested page actions
  const [isSubmitInProgress, setIsSubmitInProgress] = useState(false)
  const { isNested, setActions } = useNestedPage()

  useEffect(() => {
    if (isNested) {
      setActions(
        submitButton.visible
          ? {
              submitAction: {
                label: submitButton.label,
                onClick: () => formRef.current?.submit(),
                inProgress: isSubmitInProgress,
                disabled: isDisabled,
                tooltipText: submitButton.tooltipText,
              },
              additionalActions,
            }
          : undefined
      )
    }
  }, [
    isNested,
    isDisabled,
    submitButton,
    additionalActions,
    setActions,
    isSubmitInProgress,
  ])

  // Navigation setup
  useEffect(() => {
    if (navigation.items.length) {
      push(navigation, pagePath)
      return navigation.isTemporary ? pop : () => {}
    }
    return () => {}
  }, [navigation, pagePath, push, pop])

  // Initialize form items
  useEffect(() => {
    setFormItems(items)
  }, [items])

  useEffect(() => {
    setConfirmationDialogItems(submitButton.confirmationDialog?.formItems)
  }, [submitButton.confirmationDialog?.formItems])

  const beforeExecuteCommand = useCallback(() => {
    setActionInProgress(true)
  }, [])

  const handleSubmit = useCallback(
    async (data: FormValues, confirmationData: FormValues) => {
      try {
        setIsSubmitInProgress(true)
        setActionInProgress(true)
        await submit({ data, confirmationFormData: confirmationData })
      } finally {
        setIsSubmitInProgress(false)
        setActionInProgress(false)
      }
    },
    [submit]
  )

  const onConfirmation = useCallback(
    async (e: SubmitEventHandler | undefined) => {
      if (submitEventHandlerRef.current && e) {
        await handleSubmit(submitEventHandlerRef.current.values, e.values)
      }
    },
    [handleSubmit]
  )

  // Error state
  if (errorMessage) {
    return <div className={'EditTemplate-errorMessage'}>{errorMessage}</div>
  }

  // No form items
  if (!formItems || formItems.length === 0) {
    return (
      <PageMessagePane
        title={t('admin.base.edit.noElementTitle')}
        text={t('admin.base.edit.noElementText')}
      />
    )
  }

  const handleValidatedChange = async (e: ValidatedFormChangeEvent) => {
    await handleChangeWithDependencies(e, (data) =>
      change({ data: data.data, changedFieldName: e.changedFieldName })
    )
  }

  const shouldShowDialog = (e: SubmitEventHandler) => {
    return (
      (submitButton.confirmationDialog?.dependentFieldNames?.length ?? 0) === 0 ||
      formItems.some((formItem) => {
        const item = formItem as FormComponentProps
        return (
          item &&
          item.value !== e.values[item.name] &&
          (submitButton.confirmationDialog?.dependentFieldNames?.includes(item.name) ??
            false)
        )
      })
    )
  }

  const proceedToSubmit = async (e: SubmitEventHandler) => {
    if (submitButton.confirmationDialog && shouldShowDialog(e)) {
      submitEventHandlerRef.current = e
      setShowConfirmationDialog(true)
    } else {
      await handleSubmit(e.values, {})
    }
  }

  const notificationBarActionHandler: NotificationBarActionHandler = {
    disabled: actionInProgress,
    getActionData: () => {
      return { data: formRef.current?.getFormValues() }
    },
    onBeforeExecuteCommand: beforeExecuteCommand,
    onAfterExecuteCommand: processResult,
  }

  const renderNotificationList = () => {
    return (
      <NotificationList
        notificationBarMessages={notificationBarMessages}
        notificationBarActionHandler={notificationBarActionHandler}
      />
    )
  }

  const renderForm = () => {
    return (
      <Form
        items={formItems}
        onSubmit={proceedToSubmit}
        onChange={handleValidatedChange}
        editMode={editMode}
        formRef={formRef}
      />
    )
  }

  const renderConfirmationDialog = () => {
    if (submitButton.confirmationDialog && showConfirmationDialog) {
      return (
        <ConfirmationDialog
          headline={submitButton.confirmationDialog.title ?? ''}
          confirmationButtonLabel={submitButton.confirmationDialog.button}
          isConfirmationButtonDestructive={false}
          formItems={confirmationDialogItems}
          onCancellation={() => {
            setShowConfirmationDialog(false)
          }}
          onConfirmation={onConfirmation}
          actionInProgress={false}
        >
          {submitButton.confirmationDialog.detail ? (
            <Box spacingBottom={Spacing.L}>
              {submitButton.confirmationDialog.detail}
            </Box>
          ) : null}
        </ConfirmationDialog>
      )
    }
    return null
  }

  const renderActionsCore = () => {
    return (
      <>
        {backLink ? (
          <LinkButton
            color={ButtonColor.Secondary}
            href={backLink}
            icon="xp-arrow-left"
            label=""
          />
        ) : null}
        {submitButton.visible ? (
          <Button
            type="submit"
            color={ButtonColor.Primary}
            onClick={() => formRef.current?.submit()}
            disabled={isDisabled || actionInProgress}
            title={submitButton.tooltipText}
          >
            {submitButton.label}
          </Button>
        ) : null}
        {renderAdditionalActions()}
      </>
    )
  }

  const renderActions = () => {
    return (
      <>
        {headline ? <Headline size={HeadlineSize.M}>{headline}</Headline> : null}
        {backLink || additionalActions || submitButton.visible ? (
          <StickyHeader>
            <div className={'EditTemplate-actionsWrapper'}>{renderActionsCore()}</div>
          </StickyHeader>
        ) : null}
      </>
    )
  }

  const renderAdditionalActions = () => {
    return (
      <>
        {additionalActions?.map((action, index) => (
          <EditTemplateActionComponentLoader
            {...action}
            disabled={action.disabled || actionInProgress}
            getDataChanged={() => formRef.current?.dataChanged}
            getFormValues={() => formRef.current?.getFormValues()}
            onBeforeExecuteCommand={beforeExecuteCommand}
            onAfterExecuteCommand={processResult}
            key={index}
          />
        ))}
      </>
    )
  }

  const warningCallouts = callouts.filter(
    (c) => c.type === CalloutType.FriendlyWarning
  )
  const infoCallouts = callouts.filter((c) => c.type === CalloutType.QuickTip)
  const shouldRenderCallouts = warningCallouts.length > 0 || infoCallouts.length > 0

  // Nested page rendering (simplified)
  if (isNested) {
    return (
      <div className={'EditTemplate-templateWrapper'}>
        {renderNotificationList()}
        {renderCallouts(warningCallouts)}
        {renderForm()}
        {renderCallouts(infoCallouts)}
        {renderConfirmationDialog()}
      </div>
    )
  }

  // Portal rendering
  let portalElement: Element | null = null
  if (actionsPortalID) {
    portalElement = document.getElementById(actionsPortalID)
  }

  return (
    <div className={'EditTemplate-templateWrapper'}>
      {portalElement ? (
        <Portal container={portalElement}>{renderActionsCore()}</Portal>
      ) : (
        renderActions()
      )}
      <ContentWithSidebarLayoutWrapper>
        <NotificationContainer
          notificationBarMessages={notificationBarMessages}
          notificationBarActionHandler={notificationBarActionHandler}
          cols={Cols.Col12}
          colsMd={fullWidth ? Cols.Col12 : Cols.Col10}
          colsLg={shouldRenderCallouts ? Cols.Col12 : Cols.Col8}
        />
        <Row spacing={Spacing.XL}>
          {(breakpoints.isSmall || breakpoints.isMedium) && shouldRenderCallouts ? (
            <Column cols={Cols.Col12} colsMd={fullWidth ? Cols.Col12 : Cols.Col10}>
              <Stack spacing={Spacing.M}>
                {renderCallouts(warningCallouts)}
                {renderCallouts(infoCallouts)}
              </Stack>
            </Column>
          ) : null}
          <Column
            cols={Cols.Col12}
            colsMd={fullWidth ? Cols.Col12 : Cols.Col10}
            colsLg={fullWidth && !shouldRenderCallouts ? Cols.Col12 : Cols.Col8}
          >
            <Paper borderRadius={BorderRadius.Large}>
              <Box spacing={Spacing.XXL} className={'EditTemplate-editTemplateContent'}>
                {renderForm()}
              </Box>
            </Paper>
          </Column>
          {breakpoints.isLarge && shouldRenderCallouts ? (
            <Column colsLg={Cols.Col4}>
              <Stack spacing={Spacing.XL}>
                {renderCallouts(warningCallouts)}
                {renderCallouts(infoCallouts)}
              </Stack>
            </Column>
          ) : null}
        </Row>
        {renderConfirmationDialog()}
      </ContentWithSidebarLayoutWrapper>

      {/* This can be used only for SidePanel & Dialog child UI pages. */}
      <RoutingContentPlaceholder />
    </div>
  )
}

// Re-export types and constants for convenience
export { FormEditMode, FormSubmissionStatus, CalloutType, NotificationBarType }
