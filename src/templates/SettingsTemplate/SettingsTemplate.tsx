import * as React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import { NavLink, useMatch, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  ButtonColor,
  ButtonSize,
  Callout,
  CalloutType,
  Column,
  Headline,
  HeadlineSize,
  Icon,
  Input,
  Paper,
  PaperElevation,
  BorderRadius,
  Row,
  Spacing,
  Stack,
  Spinner,
} from '@/components'
import { Colors } from '@/tokens/colors'
import type {
  SettingsContextType,
  SettingsContextProviderProps,
  SettingsLayoutTemplateProps,
  SettingsDetailsTemplateProps,
  SettingsNoResultPageProps,
  Category,
  TreeTemplateNode,
  TreeTemplateProps,
  ValidatedFormChangeEvent,
  ValidatedValue,
  ExtendedValidationResult,
  CategoryNamesDictionary,
  SaveKeysArguments,
  SaveKeysResult,
  FormComponentProps,
  CalloutConfiguration,
} from './SettingsTemplate.types'
import './SettingsTemplate.css'

// ============================================================================
// Local translations dictionary
// ============================================================================

const translations = {
  settings: 'Settings',
  save: 'Save',
  searchPlaceholder: 'Search settings...',
  noSearchPhrase: 'Please enter a search phrase',
  settingsFound: 'settings found',
  settingFound: 'setting found',
  noSettingsFoundTitle: 'No settings found',
  noSettingsFoundText: 'Try a different search phrase',
  clearSearchPhrase: 'Clear search',
  noSettingsTitle: 'No settings available',
  noSettingsText: 'This category has no configurable settings',
  loading: 'Loading...',
}

// ============================================================================
// Settings Context
// ============================================================================

const errorHandler = (): never => {
  throw new Error('SettingsContext is not used in the tree above')
}

const SettingsContext = createContext<SettingsContextType>({
  invokeOnSubmitHandler: errorHandler,
  registerOnSubmitHandler: errorHandler,
  registerClearSearchHandler: errorHandler,
  searchFilter: '',
  setSearchFilter: errorHandler,
  settingsCategoryNames: {},
})

SettingsContext.displayName = 'SettingsContext'

/**
 * Hook to access the settings context
 */
export function useSettingsContext(): SettingsContextType {
  return useContext(SettingsContext)
}

/**
 * Settings context provider - manages search, submit handlers, and category names
 */
export function SettingsContextProvider({
  children,
  categories,
}: SettingsContextProviderProps) {
  const onSubmitHandlerRef = useRef<() => Promise<void>>(() => {
    throw new Error('Handler was not initialized')
  })
  const clearSearchHandlerRef = useRef<() => void>(() => {
    throw new Error('Handler was not initialized')
  })
  const [filter, setFilter] = useState<string>('')

  const instance: SettingsContextType = useMemo(
    () => ({
      invokeOnSubmitHandler: () => {
        return onSubmitHandlerRef.current()
      },

      registerOnSubmitHandler: (handler: () => Promise<void>) => {
        onSubmitHandlerRef.current = handler
      },

      searchFilter: filter,

      setSearchFilter: (value: string) => {
        setFilter(value)
        if (value === '') {
          clearSearchHandlerRef.current()
        }
      },

      registerClearSearchHandler: (handler: () => void) => {
        clearSearchHandlerRef.current = handler
      },

      settingsCategoryNames: categories,
    }),
    [categories, filter]
  )

  return (
    <SettingsContext.Provider value={instance}>
      {children}
    </SettingsContext.Provider>
  )
}

SettingsContextProvider.displayName = 'SettingsContext'

// ============================================================================
// Stub Hooks
// ============================================================================

/**
 * Stub hook for page commands.
 * In the full implementation, this connects to server commands.
 */
function usePageCommand<TResult = unknown, TData = unknown>(
  _commandName: string,
  options?: {
    executeOnMount?: boolean
    data?: TData
    before?: () => boolean
    after?: (data: TResult | null) => void | Promise<void>
  },
  _deps?: unknown[]
): {
  execute: (data?: TData) => Promise<TResult | null>
  isExecuting: boolean
} {
  const [isExecuting, setIsExecuting] = useState(false)
  const afterCallback = useRef(options?.after)
  const beforeCallback = useRef(options?.before)
  afterCallback.current = options?.after
  beforeCallback.current = options?.before
  const executeOnMount = options?.executeOnMount ?? false

  const execute = useCallback(async (): Promise<TResult | null> => {
    // Check 'before' condition
    if (beforeCallback.current && !beforeCallback.current()) {
      return null
    }

    setIsExecuting(true)
    try {
      // In stub mode, return null - actual implementation would call server
      const result = null
      if (afterCallback.current) {
        await afterCallback.current(result)
      }
      return result
    } finally {
      setIsExecuting(false)
    }
  }, [])

  // Execute on mount if requested
  useEffect(() => {
    if (executeOnMount) {
      execute()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { execute, isExecuting }
}

/**
 * Stub hook for page path.
 * In the full implementation, this returns the current page path for routing.
 */
function usePagePath(): string {
  return '/settings'
}

/**
 * Stub for refetch all context.
 */
function useRefetchAllContext(): { refetchDataInTemplates: () => void } {
  return {
    refetchDataInTemplates: () => {
      // Stub - would trigger data refresh across templates
    },
  }
}

// ============================================================================
// Stub Components
// ============================================================================

/**
 * ContentWithSidebarLayoutWrapper - Simple layout wrapper for sidebar + content.
 */
function ContentWithSidebarLayoutWrapper({
  children,
}: {
  children: ReactNode
  sidebarContent?: ReactNode
}) {
  return <div className={'SettingsTemplate-layoutWrapper'}>{children}</div>
}

/**
 * PageLoader - Displays a loading spinner with optional title.
 */
function PageLoader({ title }: { title?: string }) {
  return (
    <div className={'SettingsTemplate-pageLoader'}>
      <Spinner />
      {title && <div className={'SettingsTemplate-pageLoaderTitle'}>{title}</div>}
    </div>
  )
}

/**
 * PageMessagePane - Displays a message with optional children (actions).
 */
function PageMessagePane({
  title,
  text,
  children,
}: {
  title: string
  text?: string
  children?: ReactNode
}) {
  return (
    <div className={'SettingsTemplate-pageMessagePane'}>
      <div className={'SettingsTemplate-pageMessageTitle'}>{title}</div>
      {text && <div className={'SettingsTemplate-pageMessageText'}>{text}</div>}
      {children}
    </div>
  )
}

/**
 * Form - Stub form component that renders form fields.
 * In the full implementation, this connects to form component registry.
 */
function Form({
  name,
  items,
  onChange,
  fieldCssClass,
}: {
  name: string
  items: FormComponentProps[]
  onChange?: (event: ValidatedFormChangeEvent) => void
  fieldCssClass?: string
}) {
  const handleFieldChange = useCallback(
    (fieldName: string, value: ValidatedValue) => {
      if (onChange) {
        onChange({
          changedFieldName: fieldName,
          fields: items.map((item) => ({
            fieldName: item.name,
            value: item.name === fieldName ? value : item.value,
            validationResults: [],
          })),
        })
      }
    },
    [onChange, items]
  )

  return (
    <div data-form-name={name}>
      {items.map((item) => (
        <div
          key={item.name}
          className={`${'SettingsTemplate-formFieldWrapper'} ${fieldCssClass || ''}`}
        >
          {item.label && (
            <div className={'SettingsTemplate-formFieldLabel'}>{item.label}</div>
          )}
          <Input
            name={item.name}
            value={String(item.value ?? '')}
            onChange={(e) => handleFieldChange(item.name, e.target.value)}
          />
          {item.validationResults?.map(
            (result, idx) =>
              !result.isValid && (
                <div key={idx} className={'SettingsTemplate-formFieldError'}>
                  {result.errorMessage}
                </div>
              )
          )}
        </div>
      ))}
    </div>
  )
}

/**
 * EditableObjectStatusProvider - Stub for editable object status tracking.
 */
function EditableObjectStatusProvider({
  children,
}: {
  ref?: React.Ref<{ resetAllDataChanged: () => void }>
  children: ReactNode
}) {
  return <>{children}</>
}

/**
 * TreeTemplate - Stub tree template for settings navigation.
 * In the full implementation, this would be the actual TreeTemplate component.
 */
function TreeTemplate({ root }: TreeTemplateProps) {
  const renderNode = (node: TreeTemplateNode, depth: number = 0) => (
    <div key={node.id}>
      <NavLink
        to={node.path || node.id}
        className={({ isActive }) =>
          `${'SettingsTemplate-treeNode'} ${isActive ? 'SettingsTemplate-treeNodeActive' : ''}`
        }
        style={{ paddingLeft: `calc(${depth} * var(--spacing-xl) + var(--spacing-m))` }}
      >
        {node.icon && (
          <span className={'SettingsTemplate-treeNodeIcon'}>
            <Icon name={node.icon} />
          </span>
        )}
        <span className={'SettingsTemplate-treeNodeName'}>{node.name}</span>
      </NavLink>
      {node.children.length > 0 && (
        <div className={'SettingsTemplate-treeNodeChildren'}>
          {node.children.map((child) => renderNode(child, depth + 1))}
        </div>
      )}
    </div>
  )

  return (
    <div className={'SettingsTemplate-treeContainer'}>
      {root.children.map((child) => renderNode(child, 0))}
    </div>
  )
}

// ============================================================================
// Settings Sub-Components
// ============================================================================

/**
 * SettingsSearchRowComponent - Search input and save button for settings.
 */
function SettingsSearchRowComponent() {
  const navigate = useNavigate()
  const path = usePagePath()
  const match = useMatch(`${path}/:param`)

  const [filter, setFilter] = useState<string>('')
  const context = useSettingsContext()

  context.registerClearSearchHandler(() => setFilter(''))

  const onInputKeyPress = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      context.setSearchFilter(filter)
      navigate('search')
    }
  }

  useEffect(() => {
    if (match?.params.param !== 'search') {
      setFilter('')
    }
  }, [match?.params.param])

  return (
    <Box spacingBottom={Spacing.XL}>
      <Row>
        <div className={'SettingsTemplate-save'}>
          <Button
            color={ButtonColor.Primary}
            onClick={context.invokeOnSubmitHandler}
            label={translations.save}
          />
        </div>
        <div className={'SettingsTemplate-filter'}>
          <Input
            name="settings-search"
            onKeyDown={onInputKeyPress}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={translations.searchPlaceholder}
          />
        </div>
      </Row>
    </Box>
  )
}

/**
 * SettingsBreadcrumbs - Displays breadcrumb navigation for settings categories.
 */
function SettingsBreadcrumbs({
  categoryId,
  categoryIdPath,
  displayName,
}: Pick<Category, 'categoryId' | 'categoryIdPath' | 'displayName'>) {
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([])
  const context = useSettingsContext()

  useEffect(() => {
    const stringIds = categoryIdPath.split('/').filter((i) => i)
    const ids = stringIds.map((i) => parseInt(i))

    const categoriesDictionary = { ...context.settingsCategoryNames }

    // Add the display name of the category
    categoriesDictionary[categoryId] = displayName

    const result = ids.map((id) => categoriesDictionary[id])

    setBreadcrumbs(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={'SettingsTemplate-breadcrumbsContainer'}>
      {breadcrumbs.map((name, nameIndex) => (
        <div className={'SettingsTemplate-breadcrumbItem'} key={nameIndex}>
          <span className={'SettingsTemplate-breadcrumbCell'}>{name}</span>
          {breadcrumbs.length - 1 !== nameIndex && (
            <span className={'SettingsTemplate-breadcrumbIcon'}>
              <Icon name="xp-chevron-right" />
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

/**
 * SettingsNoResultPage - Displays when no settings are found.
 */
function SettingsNoResultPage({
  filter,
  clearSearchHandler,
}: SettingsNoResultPageProps) {
  return (
    <>
      {filter ? (
        <PageMessagePane
          title={translations.noSettingsFoundTitle}
          text={translations.noSettingsFoundText}
        >
          <Button
            color={ButtonColor.Primary}
            size={ButtonSize.L}
            onClick={clearSearchHandler}
            label={translations.clearSearchPhrase}
          />
        </PageMessagePane>
      ) : (
        <PageMessagePane
          title={translations.noSettingsTitle}
          text={translations.noSettingsText}
        />
      )}
    </>
  )
}

/**
 * ConfigurableCallout - Renders a callout from server-driven configuration.
 */
function ConfigurableCallout({ config }: { config: CalloutConfiguration }) {
  const handleButtonClick = useCallback(() => {
    if (config.actionButton?.redirectUrl) {
      if (config.actionButton.openInNewTab) {
        window.open(config.actionButton.redirectUrl, '_blank')
      } else {
        window.location.href = config.actionButton.redirectUrl
      }
    }
  }, [config.actionButton])

  const actionButtonElement = config.actionButton ? (
    <Button
      color={ButtonColor.Primary}
      onClick={handleButtonClick}
      disabled={config.actionButton.disabled || config.actionButton.inProgress}
      label={config.actionButton.text}
    />
  ) : undefined

  return (
    <Callout
      type={config.type}
      placement={config.placement}
      headline={config.headline}
      actionButton={actionButtonElement}
      subheadline={
        config.type === CalloutType.QuickTip ? 'Quick tip' : 'Friendly warning'
      }
    >
      {config.contentAsHtml ? (
        <span dangerouslySetInnerHTML={{ __html: config.content }} />
      ) : (
        config.content
      )}
    </Callout>
  )
}

// ============================================================================
// Main Templates
// ============================================================================

/**
 * SettingsLayoutTemplate - Main layout template for settings pages.
 *
 * Provides a tree navigation on the left with search and save functionality.
 * Settings categories are displayed as a tree structure.
 *
 * @example
 * ```tsx
 * <SettingsLayoutTemplate
 *   root={{
 *     id: 'root',
 *     name: 'Settings',
 *     children: [
 *       { id: 'general', name: 'General', children: [] },
 *       { id: 'security', name: 'Security', children: [] },
 *     ],
 *   }}
 * />
 * ```
 */
export function SettingsLayoutTemplate(props: SettingsLayoutTemplateProps) {
  const categories = useMemo(
    () => buildCategoryNameDictionary(props.root),
    [props.root]
  )

  return (
    <ContentWithSidebarLayoutWrapper sidebarContent={<></>}>
      <SettingsContextProvider categories={categories}>
        <div className={'SettingsTemplate-templateWrapper'}>
          <Headline size={HeadlineSize.M} spacingBottom={Spacing.XL}>
            {translations.settings}
          </Headline>
          <Row spacingX={Spacing.L} spacingY={Spacing.XL}>
            <Column>
              <SettingsSearchRowComponent />
            </Column>
          </Row>
          <Box className={'SettingsTemplate-treeWrapper'}>
            <TreeTemplate {...props} />
          </Box>
        </div>
      </SettingsContextProvider>
    </ContentWithSidebarLayoutWrapper>
  )
}

function buildCategoryNameDictionary(
  root: TreeTemplateNode
): CategoryNamesDictionary {
  const dictionary: CategoryNamesDictionary = {}
  const fillNames = (node: TreeTemplateNode) => {
    dictionary[node.id] = node.name
    node.children.forEach((ch) => fillNames(ch))
  }

  fillNames(root)
  return dictionary
}

/**
 * SettingsDetailsTemplate - Displays settings details with forms.
 *
 * Shows category settings with editable form fields.
 * Supports search filtering and form validation.
 *
 * @example
 * ```tsx
 * <SettingsDetailsTemplate
 *   title="General Settings"
 *   categories={[
 *     {
 *       categoryId: 1,
 *       categoryParentId: 0,
 *       categoryIdPath: '/1',
 *       displayName: 'General',
 *       components: [
 *         { name: 'siteName', label: 'Site Name', value: 'My Site' },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 */
export function SettingsDetailsTemplate(props: SettingsDetailsTemplateProps) {
  const match = useMatch('settings/:categoryId')
  const [categories, setCategories] = useState(props.categories)
  const [resultsCount, setResultsCount] = useState(0)
  const [validationResults, setValidationResults] = useState<
    Record<number, Record<string, ExtendedValidationResult[]>>
  >({})
  const { refetchDataInTemplates } = useRefetchAllContext()
  const context = useSettingsContext()
  const editableObjectStatusProviderRef = useRef<{
    resetAllDataChanged: () => void
  }>(null)

  const hasAnySetting = categories && categories.length > 0

  const areValidationResultsValid = useCallback(
    (
      validationResults: Record<
        number,
        Record<string, ExtendedValidationResult[]>
      >
    ) =>
      Object.values(validationResults)
        .flatMap((categoryResults) => Object.values(categoryResults))
        .flatMap((results) => results)
        .every((result) => result.isValid),
    []
  )

  const fieldChanged = useCallback(
    (categoryId: number, fieldName: string, fieldValue: ValidatedValue) => {
      setCategories((prev) =>
        prev.map((category) =>
          category.categoryId === categoryId
            ? {
                ...category,
                components: category.components.map((component) =>
                  component.name === fieldName
                    ? {
                        ...component,
                        value: fieldValue,
                      }
                    : component
                ),
              }
            : category
        )
      )
    },
    []
  )

  const formUpdated = useCallback(
    (categoryId: number, e: ValidatedFormChangeEvent) => {
      const categoryValidationResults: Record<
        string,
        ExtendedValidationResult[]
      > = {}
      e.fields.forEach((field) => {
        categoryValidationResults[field.fieldName] = field.validationResults
      })

      setValidationResults((prev) => ({
        ...prev,
        [categoryId]: categoryValidationResults,
      }))

      const changedField = e.fields.find(
        (field) => field.fieldName === e.changedFieldName
      )
      if (changedField !== undefined) {
        fieldChanged(categoryId, changedField.fieldName, changedField.value)
      }
    },
    [fieldChanged]
  )

  usePageCommand<Category[], string>(
    'Filter',
    {
      executeOnMount: context.searchFilter !== '',
      data: context.searchFilter,
      before: () => match?.params.categoryId === 'search',
      after: (result) => {
        setCategories(result ?? [])
      },
    },
    [context.searchFilter]
  )

  const { execute: saveSettings } = usePageCommand<
    SaveKeysResult,
    SaveKeysArguments
  >('Save', {
    after: (result) => {
      if (!result) {
        return
      }

      if (result.refetchAll) {
        refetchDataInTemplates()
      }

      setCategories(result.categories ?? [])
      editableObjectStatusProviderRef.current?.resetAllDataChanged()
    },
  })

  const save = useCallback(async () => {
    if (!areValidationResultsValid(validationResults)) {
      return
    }

    const results: Record<string, unknown> = {}
    categories.forEach((category) => {
      category.components.forEach((component) => {
        results[component.name] = component.value
      })
    })

    await saveSettings({
      keyValues: results,
      filter: context.searchFilter,
    })
  }, [
    areValidationResultsValid,
    validationResults,
    categories,
    saveSettings,
    context.searchFilter,
  ])

  useEffect(() => {
    if (categories) {
      let counter = 0
      categories.forEach((c) => (counter += c.components.length))

      setResultsCount(counter)
    }
  }, [categories])

  const handleSearchClear = useCallback(() => {
    context.setSearchFilter('')
  }, [context])

  useEffect(() => {
    if (match?.params.categoryId !== 'search' && context.searchFilter !== '') {
      handleSearchClear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match?.params.categoryId])

  const getSettingsGroupHeader = (category: Category) => {
    return (
      <>
        {context.searchFilter ? (
          <Box spacingBottom={Spacing.XL}>
            <NavLink
              to={'../' + category.categoryParentId}
              className={'SettingsTemplate-searchHeadline'}
              replace
            >
              <Headline size={HeadlineSize.L} labelColor={Colors.Product}>
                {category.displayName}
              </Headline>
            </NavLink>
            <SettingsBreadcrumbs {...category} />
          </Box>
        ) : (
          <Headline size={HeadlineSize.L} spacingBottom={Spacing.XL}>
            {category.displayName}
          </Headline>
        )}
      </>
    )
  }

  const getSettingsGroupCallouts = (category: Category) => {
    return (
      <>
        {category.callouts?.map((calloutConfig, index) => (
          <Box key={index} spacingBottom={Spacing.XL}>
            <ConfigurableCallout config={calloutConfig} />
          </Box>
        ))}
      </>
    )
  }

  context.registerOnSubmitHandler(save)

  if (!categories) {
    return <PageLoader title={translations.loading} />
  }

  return (
    <>
      <Box spacingBottom={Spacing.L}>
        <Headline size={HeadlineSize.M}>
          {context.searchFilter
            ? `${resultsCount} ${
                resultsCount !== 1
                  ? translations.settingsFound
                  : translations.settingFound
              }`
            : props.title}
        </Headline>
      </Box>
      <Stack spacing={Spacing.XL}>
        <EditableObjectStatusProvider ref={editableObjectStatusProviderRef}>
          {hasAnySetting ? (
            categories?.map((category) => (
              <Paper
                key={category.categoryId}
                borderRadius={BorderRadius.Large}
                elevation={PaperElevation.Subtle}
              >
                <Box spacing={Spacing.XL}>
                  {getSettingsGroupHeader(category)}
                  {getSettingsGroupCallouts(category)}
                  <Form
                    name={`Form_${category.categoryId}`}
                    items={category.components}
                    onChange={(e) => {
                      formUpdated(category.categoryId, e)
                    }}
                    fieldCssClass={'SettingsTemplate-formComponent'}
                  />
                </Box>
              </Paper>
            ))
          ) : (
            <SettingsNoResultPage
              filter={context.searchFilter}
              clearSearchHandler={handleSearchClear}
            />
          )}
        </EditableObjectStatusProvider>
      </Stack>
    </>
  )
}

/**
 * SettingsSearchTemplate - Displays settings search results.
 *
 * Shows a message if no search phrase is entered, otherwise displays
 * the SettingsDetailsTemplate with filtered results.
 *
 * @example
 * ```tsx
 * <SettingsSearchTemplate
 *   title="Search Results"
 *   categories={filteredCategories}
 * />
 * ```
 */
export function SettingsSearchTemplate(props: SettingsDetailsTemplateProps) {
  const settingsContext = useSettingsContext()

  if (settingsContext.searchFilter === '') {
    return <PageMessagePane title={translations.noSearchPhrase} />
  }

  return <SettingsDetailsTemplate {...props} />
}
